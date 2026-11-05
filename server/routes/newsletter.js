import express from 'express';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';
import { isMongoConnected, memoryStore } from '../config/db.js';
import { newsletterLimiter } from '../middleware/rateLimiter.js';
import { honeypotCheck } from '../middleware/security.js';
import { sanitizeEmail, escapeHtml } from '../utils/security.js';

const router = express.Router();

// POST /api/newsletter - subscribe to newsletter with rate limiting & honeypot spam protection
router.post('/', newsletterLimiter, honeypotCheck('website_trap'), async (req, res, next) => {
  try {
    const { email, source = 'website' } = req.body;

    const normalizedEmail = sanitizeEmail(email);
    if (!normalizedEmail) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address (max 100 characters).'
      });
    }

    const safeSource = typeof source === 'string' ? escapeHtml(source.slice(0, 30)) : 'website';

    if (isMongoConnected) {
      const existing = await NewsletterSubscriber.findOne({ email: normalizedEmail });
      if (existing) {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed to The Tadka Dispatch! Stay tuned for seasonal harvests.',
          alreadySubscribed: true
        });
      }

      const subscriber = await NewsletterSubscriber.create({
        email: normalizedEmail,
        source: safeSource
      });

      return res.status(201).json({
        success: true,
        message: 'Welcome to Bowl Bae! You will receive our weekly spice stories & secret seasonal bowls.',
        data: {
          email: subscriber.email,
          subscribedAt: subscriber.createdAt
        }
      });
    }

    // In-memory fallback
    const memExisting = memoryStore.subscribers.find((s) => s.email === normalizedEmail);
    if (memExisting) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to The Tadka Dispatch! Stay tuned for seasonal harvests.',
        alreadySubscribed: true
      });
    }

    const memSubscriber = {
      _id: `mem_sub_${Date.now()}`,
      email: normalizedEmail,
      source: safeSource,
      status: 'active',
      subscribedAt: new Date()
    };
    memoryStore.subscribers.push(memSubscriber);

    return res.status(201).json({
      success: true,
      message: 'Welcome to Bowl Bae! You will receive our weekly spice stories & secret seasonal bowls.',
      data: {
        email: memSubscriber.email,
        subscribedAt: memSubscriber.subscribedAt
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
