import app from '../server/server.js';
import connectDB, { isMongoConnected } from '../server/config/db.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected && process.env.MONGODB_URI) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.warn('Vercel serverless DB connection fallback:', err.message);
    }
  }
  return app(req, res);
}
