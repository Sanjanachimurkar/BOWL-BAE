import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  bowlId: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  name: {
    type: String,
    required: [true, 'Item name is required']
  },
  price: {
    type: Number,
    required: [true, 'Item price is required'],
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  customizations: {
    bases: [String],
    proteins: [String],
    toppings: [String],
    tadkaDressing: String,
    spiceLevel: String,
    specialNotes: String
  }
});

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Delivery address is required'],
    trim: true
  },
  landmark: {
    type: String,
    trim: true
  },
  instructions: {
    type: String,
    trim: true
  }
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true
    },
    customer: {
      type: customerSchema,
      required: true
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'Order must contain at least one bowl'
      }
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['received', 'chopping', 'tempering_tadka', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'received'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'cash_on_delivery'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      default: 'pay_on_delivery'
    },
    estimatedDeliveryTime: {
      type: String,
      default: '25-35 mins'
    }
  },
  {
    timestamps: true
  }
);

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
