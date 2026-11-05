import mongoose from 'mongoose';

const bowlSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    name: {
      type: String,
      required: [true, 'Bowl name is required'],
      trim: true
    },
    tagline: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive']
    },
    category: {
      type: String,
      default: 'Signature Bowls'
    },
    calories: {
      type: Number
    },
    protein: {
      type: String
    },
    carbs: {
      type: String
    },
    fat: {
      type: String
    },
    fiber: {
      type: String
    },
    dietary: {
      type: [String],
      default: []
    },
    prepTime: {
      type: String,
      default: '8 mins'
    },
    spiceLevel: {
      type: String,
      default: 'Medium'
    },
    base: {
      type: String,
      required: true
    },
    proteinItem: {
      type: String,
      required: true
    },
    toppings: {
      type: [String],
      default: []
    },
    tadkaDressing: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    badge: {
      type: String
    },
    isCustomizable: {
      type: Boolean,
      default: true
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Bowl = mongoose.models.Bowl || mongoose.model('Bowl', bowlSchema);
export default Bowl;
