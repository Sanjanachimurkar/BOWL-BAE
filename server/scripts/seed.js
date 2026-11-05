import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Bowl from '../models/Bowl.js';
import { initialBowls } from '../data/seedBowls.js';

dotenv.config();

const seed = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bowl_bae';
  
  try {
    console.log(`🥗 Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB.');

    console.log('🧹 Clearing existing bowls...');
    await Bowl.deleteMany({});

    console.log(`🌱 Inserting ${initialBowls.length} bowls...`);
    const inserted = await Bowl.insertMany(initialBowls);
    console.log(`✨ Successfully seeded ${inserted.length} signature bowls into Bowl Bae database!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during database seeding:', error.message);
    process.exit(1);
  }
};

seed();
