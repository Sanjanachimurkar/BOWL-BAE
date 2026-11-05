import rateLimit from 'express-rate-limit';

/**
 * Rate Limiting Middleware for BOWL BAE
 * Protects public endpoints, order placement, and authentication from abuse.
 */

// General API Rate Limiter: 150 requests per 15 minutes per IP
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
  }
});

// Order Placement Limiter: 10 orders per 15 minutes per IP (prevents spam orders)
export const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Order creation rate limit reached. Please wait a few minutes before placing another order.'
  }
});

// Newsletter Subscription Limiter: 5 subscriptions per 15 minutes per IP
export const newsletterLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many subscription attempts from this IP. Please try again later.'
  }
});

// Admin Auth Limiter: 5 login attempts per 15 minutes per IP (prevents brute-force)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Account temporarily locked for 15 minutes.'
  }
});
