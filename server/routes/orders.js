import express from 'express';
import Order from '../models/Order.js';
import { isMongoConnected, memoryStore } from '../config/db.js';
import { orderLimiter } from '../middleware/rateLimiter.js';
import { honeypotCheck } from '../middleware/security.js';
import { escapeRegex, escapeHtml, sanitizePhone, sanitizeEmail } from '../utils/security.js';

const router = express.Router();

// Helper to generate a memorable order number
const generateOrderNumber = () => {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `BAE-${randomSuffix}`;
};

/**
 * GET /api/orders and GET /api/orders/search
 * Privacy-fortified order tracking:
 * REQUIRES either 'phone' (10 digits) or 'orderNumber' / 'search'.
 * Prevents unauthorized enumeration of customer orders.
 */
const handleGetOrders = async (req, res, next) => {
  try {
    const { phone, email, search, limit = 10 } = req.query;

    const cleanPhone = phone ? sanitizePhone(String(phone)) : null;
    const cleanEmail = email ? sanitizeEmail(String(email)) : null;
    const rawSearch = search ? String(search).trim() : null;

    // Reject empty queries to prevent dumping all customer records
    if (!cleanPhone && !cleanEmail && !rawSearch) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a 10-digit phone number or order number to look up your order.'
      });
    }

    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 30);

    if (isMongoConnected) {
      const query = {};

      if (cleanPhone) {
        query['customer.phone'] = { $regex: escapeRegex(cleanPhone), $options: 'i' };
      } else if (cleanEmail) {
        query['customer.email'] = cleanEmail;
      } else if (rawSearch) {
        const safeSearch = escapeRegex(rawSearch);
        query.$or = [
          { orderNumber: { $regex: safeSearch, $options: 'i' } },
          { 'customer.phone': { $regex: safeSearch, $options: 'i' } }
        ];
      }

      const orders = await Order.find(query)
        .select('-__v')
        .sort({ createdAt: -1 })
        .limit(safeLimit);

      return res.json({
        success: true,
        source: 'mongodb',
        count: orders.length,
        data: orders
      });
    }

    // In-memory fallback
    let orders = [...memoryStore.orders];

    if (cleanPhone) {
      orders = orders.filter((o) => {
        const p = (o.customer?.phone || '').replace(/\D/g, '');
        return p.includes(cleanPhone);
      });
    } else if (cleanEmail) {
      orders = orders.filter((o) => (o.customer?.email || '').toLowerCase() === cleanEmail);
    } else if (rawSearch) {
      const upperSearch = rawSearch.toUpperCase();
      orders = orders.filter((o) => {
        const num = (o.orderNumber || '').toUpperCase();
        const p = (o.customer?.phone || '');
        return num.includes(upperSearch) || p.includes(rawSearch);
      });
    }

    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    orders = orders.slice(0, safeLimit);

    return res.json({
      success: true,
      source: 'memory',
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

router.get('/', handleGetOrders);
router.get('/search', handleGetOrders);

/**
 * POST /api/orders
 * Place a new order with validation, sanitization, honeypot protection, and rate limiting.
 */
router.post('/', orderLimiter, honeypotCheck('website_trap'), async (req, res, next) => {
  try {
    const { customer, items, paymentMethod = 'pay_on_delivery' } = req.body;

    const errors = [];

    // 1. Customer field validation
    if (!customer || typeof customer !== 'object') {
      errors.push('Customer details are required.');
    } else {
      if (!customer.name || typeof customer.name !== 'string' || customer.name.trim().length < 2) {
        errors.push('Customer name must be at least 2 characters.');
      } else if (customer.name.trim().length > 80) {
        errors.push('Customer name cannot exceed 80 characters.');
      }

      const cleanEmail = sanitizeEmail(customer.email);
      if (!cleanEmail) {
        errors.push('A valid customer email address is required (max 100 characters).');
      }

      const cleanPhone = sanitizePhone(customer.phone);
      if (!cleanPhone) {
        errors.push('A valid 10-digit Indian phone number is required.');
      }

      if (!customer.address || typeof customer.address !== 'string' || customer.address.trim().length < 5) {
        errors.push('A delivery address with at least 5 characters is required.');
      } else if (customer.address.trim().length > 250) {
        errors.push('Delivery address cannot exceed 250 characters.');
      }

      if (customer.landmark && (typeof customer.landmark !== 'string' || customer.landmark.length > 100)) {
        errors.push('Landmark cannot exceed 100 characters.');
      }

      if (customer.instructions && (typeof customer.instructions !== 'string' || customer.instructions.length > 300)) {
        errors.push('Delivery instructions cannot exceed 300 characters.');
      }
    }

    // 2. Items validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      errors.push('Order must contain at least 1 bowl.');
    } else if (items.length > 20) {
      errors.push('Maximum 20 items allowed per order.');
    } else {
      items.forEach((item, index) => {
        if (!item.name || typeof item.name !== 'string' || item.name.length > 80) {
          errors.push(`Item #${index + 1} must have a valid name.`);
        }
        if (typeof item.price !== 'number' || item.price <= 0 || item.price > 10000) {
          errors.push(`Item #${index + 1} has an invalid price.`);
        }
        if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > 50) {
          errors.push(`Item #${index + 1} quantity must be between 1 and 50.`);
        }
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Order validation failed.',
        errors
      });
    }

    // 3. Calculation & Sanitization
    const sanitizedItems = items.map((it) => ({
      name: escapeHtml(it.name.trim()),
      slug: it.slug ? String(it.slug).slice(0, 50) : 'bowl',
      price: Math.round(it.price),
      quantity: Math.floor(it.quantity),
      image: typeof it.image === 'string' && it.image.startsWith('http') ? it.image : '/cutouts/salad-bowl.png',
      customizations: it.customizations && typeof it.customizations === 'object' ? it.customizations : {}
    }));

    const subtotal = sanitizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal >= 500 ? 0 : 40; // Free express delivery over ₹500
    const tax = Math.round(subtotal * 0.05); // 5% GST
    const total = subtotal + deliveryFee + tax;
    const orderNumber = generateOrderNumber();

    const orderPayload = {
      orderNumber,
      customer: {
        name: escapeHtml(customer.name.trim()),
        email: sanitizeEmail(customer.email),
        phone: sanitizePhone(customer.phone),
        address: escapeHtml(customer.address.trim()),
        landmark: customer.landmark ? escapeHtml(customer.landmark.trim()) : '',
        instructions: customer.instructions ? escapeHtml(customer.instructions.trim()) : ''
      },
      items: sanitizedItems,
      subtotal,
      deliveryFee,
      tax,
      total,
      status: 'received',
      paymentStatus: 'pending',
      paymentMethod: paymentMethod === 'online' ? 'online' : 'pay_on_delivery',
      estimatedDeliveryTime: '25-35 mins'
    };

    if (isMongoConnected) {
      const newOrder = await Order.create(orderPayload);
      return res.status(201).json({
        success: true,
        message: 'Order placed successfully! Fresh greens are being prepped.',
        source: 'mongodb',
        data: newOrder
      });
    }

    // In-memory fallback
    const memOrder = {
      _id: `mem_order_${Date.now()}`,
      ...orderPayload,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryStore.orders.push(memOrder);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully! Fresh greens are being prepped.',
      source: 'memory',
      data: memOrder
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/orders/:id
 * Retrieve order tracking details with identifier format verification.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Strict identifier format check: must be MongoDB ObjectId or BAE-XXXX format
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const isOrderNumber = /^BAE-[0-9]{3,6}$/i.test(id);

    if (!isObjectId && !isOrderNumber) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order identifier format. Must be an order number (e.g. BAE-1066).'
      });
    }

    if (isMongoConnected) {
      let order = null;
      if (isObjectId) {
        order = await Order.findById(id).select('-__v');
      }
      if (!order && isOrderNumber) {
        order = await Order.findOne({ orderNumber: id.toUpperCase() }).select('-__v');
      }

      if (!order) {
        return res.status(404).json({
          success: false,
          message: `Order '${id}' was not found.`
        });
      }

      return res.json({
        success: true,
        source: 'mongodb',
        data: order
      });
    }

    // In-memory lookup
    const order = memoryStore.orders.find(
      (o) => o._id === id || o.orderNumber.toUpperCase() === id.toUpperCase()
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order '${id}' was not found.`
      });
    }

    return res.json({
      success: true,
      source: 'memory',
      data: order
    });
  } catch (err) {
    next(err);
  }
});

export default router;
