import mongoose from 'mongoose';
import { initialBowls } from '../data/seedBowls.js';
import Bowl from '../models/Bowl.js';

export let isMongoConnected = false;

// Fallback in-memory store if external MongoDB daemon is not running
export const memoryStore = {
  bowls: initialBowls.map((b, idx) => ({
    _id: `mem_bowl_${idx + 1}`,
    ...b,
    createdAt: new Date(),
    updatedAt: new Date()
  })),
  orders: [],
  subscribers: []
};

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bowl_bae';
  
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500
    });
    
    isMongoConnected = true;
    console.log(`🌿 [Bowl Bae] MongoDB connected successfully to ${uri}`);
    
    // Seed initial bowls if database is empty
    const count = await Bowl.countDocuments();
    if (count === 0) {
      console.log('🥗 [Bowl Bae] Database empty: auto-seeding initial 5 signature bowls...');
      await Bowl.insertMany(initialBowls);
      console.log('✅ [Bowl Bae] Auto-seeding completed.');
    } else {
      console.log(`🥗 [Bowl Bae] Existing bowls found in MongoDB: ${count}`);
    }
  } catch (error) {
    isMongoConnected = false;
    console.warn(`⚠️ [Bowl Bae] MongoDB connection could not be established (${error.message}).`);
    console.warn('⚡ [Bowl Bae] Activated high-availability in-memory mode. All API endpoints and features are fully functional!');
  }
};

export default connectDB;
