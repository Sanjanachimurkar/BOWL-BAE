import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AdminUser from '../models/AdminUser.js';
import Order from '../models/Order.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import { isMongoConnected, memoryStore } from '../config/db.js';
import { requireAdminAuth } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { escapeRegex } from '../utils/security.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'bowl_bae_secure_jwt_fallback_secret_key_32chars!';

// In-memory fallback admin user
const FALLBACK_ADMIN = {
  username: process.env.ADMIN_USERNAME || 'admin',
  passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'BowlBae@Nagpur2026!Secure', 10),
  role: 'superadmin'
};

/**
 * POST /api/admin/login
 * Authenticates admin users with rate limiting, lockout protection, and timing attack resistance.
 */
router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required strings.'
      });
    }

    const cleanUsername = username.trim().toLowerCase();

    // 1. In-memory mode fallback
    if (!isMongoConnected) {
      const isMatch =
        cleanUsername === FALLBACK_ADMIN.username &&
        bcrypt.compareSync(password, FALLBACK_ADMIN.passwordHash);

      if (!isMatch) {
        // Uniform generic message to prevent user enumeration
        return res.status(401).json({
          success: false,
          message: 'Invalid administrative credentials.'
        });
      }

      const token = jwt.sign(
        {
          id: 'mem_admin_1',
          username: FALLBACK_ADMIN.username,
          role: FALLBACK_ADMIN.role
        },
        JWT_SECRET,
        { expiresIn: '4h' }
      );

      return res.json({
        success: true,
        message: 'Admin authentication successful.',
        token,
        admin: {
          username: FALLBACK_ADMIN.username,
          role: FALLBACK_ADMIN.role
        }
      });
    }

    // 2. MongoDB mode
    let admin = await AdminUser.findOne({ username: cleanUsername });

    // Seed default admin if none exists
    if (!admin && cleanUsername === (process.env.ADMIN_USERNAME || 'admin').toLowerCase()) {
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'BowlBae@Nagpur2026!Secure', 12);
      admin = await AdminUser.create({
        username: cleanUsername,
        passwordHash: hash,
        role: 'superadmin'
      });
    }

    // Check account lockout
    if (admin && admin.lockUntil && admin.lockUntil > Date.now()) {
      const waitMins = Math.ceil((admin.lockUntil - Date.now()) / (60 * 1000));
      return res.status(429).json({
        success: false,
        message: `Account is temporarily locked due to repeated failed attempts. Please retry in ${waitMins} minute(s).`
      });
    }

    // Verify password with bcrypt (constant-time evaluation)
    const dummyHash = '$2a$12$e8Y4M9l8/0bN5nO7iE1mEOGfVqB6L9C7w4Q0J1K2L3M4N5O6P7Q8R';
    const isPasswordValid = admin
      ? await bcrypt.compare(password, admin.passwordHash)
      : await bcrypt.compare(password, dummyHash);

    if (!admin || !isPasswordValid) {
      if (admin) {
        admin.failedLoginAttempts = (admin.failedLoginAttempts || 0) + 1;
        // Lock account for 15 minutes after 5 failed attempts
        if (admin.failedLoginAttempts >= 5) {
          admin.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
          console.warn(`🔒 [Security] Admin account '${admin.username}' locked for 15 minutes.`);
        }
        await admin.save();
      }

      // Consistent message to prevent username enumeration
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative credentials.'
      });
    }

    // Reset failed attempts on successful login
    admin.failedLoginAttempts = 0;
    admin.lockUntil = null;
    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role
      },
      JWT_SECRET,
      { expiresIn: '4h' }
    );

    return res.json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      admin: {
        username: admin.username,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/admin/me
 * Returns the currently authenticated admin user
 */
router.get('/me', requireAdminAuth, (req, res) => {
  res.json({
    success: true,
    admin: req.admin
  });
});

/**
 * GET /api/admin/orders
 * Returns all orders for kitchen dispatch operations (guarded by admin token)
 */
router.get('/orders', requireAdminAuth, async (req, res, next) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const cleanLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 100);
    const cleanPage = Math.max(parseInt(page, 10) || 1, 1);
    const skip = (cleanPage - 1) * cleanLimit;

    if (isMongoConnected) {
      const filter = {};
      if (status && typeof status === 'string') {
        filter.status = status.trim().toLowerCase();
      }

      const total = await Order.countDocuments(filter);
      const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(cleanLimit);

      return res.json({
        success: true,
        source: 'mongodb',
        total,
        page: cleanPage,
        limit: cleanLimit,
        data: orders
      });
    }

    // In-memory fallback
    let orders = [...memoryStore.orders];
    if (status) {
      orders = orders.filter((o) => o.status === status.trim().toLowerCase());
    }
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const paginated = orders.slice(skip, skip + cleanLimit);

    return res.json({
      success: true,
      source: 'memory',
      total: orders.length,
      page: cleanPage,
      limit: cleanLimit,
      data: paginated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/admin/orders/:id/status
 * Updates the dispatch stage of an order (guarded by admin token)
 */
router.patch('/orders/:id/status', requireAdminAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['received', 'prepped', 'dispatched', 'delivered', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    if (isMongoConnected) {
      let order = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        order = await Order.findById(id);
      }
      if (!order) {
        order = await Order.findOne({ orderNumber: id.toUpperCase() });
      }

      if (!order) {
        return res.status(404).json({
          success: false,
          message: `Order '${id}' not found.`
        });
      }

      order.status = status;
      await order.save();

      return res.json({
        success: true,
        message: `Order status updated to '${status}'.`,
        data: order
      });
    }

    // In-memory fallback
    const memOrder = memoryStore.orders.find(
      (o) => o._id === id || o.orderNumber.toUpperCase() === id.toUpperCase()
    );

    if (!memOrder) {
      return res.status(404).json({
        success: false,
        message: `Order '${id}' not found.`
      });
    }

    memOrder.status = status;
    memOrder.updatedAt = new Date();

    return res.json({
      success: true,
      message: `Order status updated to '${status}'.`,
      data: memOrder
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/admin/subscribers
 * Returns all newsletter subscribers (guarded by admin token)
 */
router.get('/subscribers', requireAdminAuth, async (req, res, next) => {
  try {
    if (isMongoConnected) {
      const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: subscribers.length,
        data: subscribers
      });
    }

    return res.json({
      success: true,
      count: memoryStore.subscribers.length,
      data: memoryStore.subscribers
    });
  } catch (err) {
    next(err);
  }
});

export default router;
