import helmet from 'helmet';
import cors from 'cors';
import { sanitizeMongoInput, scrubSensitiveFields } from '../utils/security.js';

/**
 * Security Middleware Suite for BOWL BAE
 */

// 1. Helmet security headers
export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      fontSrc: ["'self'", 'data:'],
      connectSrc: [
        "'self'",
        'http://localhost:5000',
        'http://127.0.0.1:5000',
        'http://localhost:3000',
        'http://127.0.0.1:3000'
      ],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});

// 2. Strict CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173'
    ];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. curl, tests, mobile native) with no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked request from untrusted origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
});

// 3. Request timeout middleware (15 seconds)
export const timeoutMiddleware = (req, res, next) => {
  const timeoutMs = 15000;
  res.setTimeout(timeoutMs, () => {
    if (!res.headersSent) {
      res.status(504).json({
        success: false,
        message: 'Request timed out on server.'
      });
    }
  });
  next();
};

// 4. Safe HTTP Method Filter
export const methodFilterMiddleware = (req, res, next) => {
  const allowedMethods = ['GET', 'POST', 'PATCH', 'OPTIONS'];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({
      success: false,
      message: `HTTP method ${req.method} is not allowed.`
    });
  }
  next();
};

// 5. NoSQL Injection & MongoDB Operator Sanitizer
export const mongoSanitizeMiddleware = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeMongoInput(req.body);
  }
  if (req.query) {
    req.query = sanitizeMongoInput(req.query);
  }
  if (req.params) {
    req.params = sanitizeMongoInput(req.params);
  }
  next();
};

// 6. Spam Bot Honeypot Checker
export const honeypotCheck = (honeypotField = 'website_trap') => {
  return (req, res, next) => {
    if (req.body && req.body[honeypotField]) {
      console.warn(`🚨 [Security] Honeypot triggered by IP ${req.ip} with value:`, req.body[honeypotField]);
      // Silently discard or reject spam bots
      return res.status(400).json({
        success: false,
        message: 'Spam detected. Submission rejected.'
      });
    }
    next();
  };
};

// 7. Secure Logger Middleware (redacts passwords and tokens)
export const secureLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const safeQuery = scrubSensitiveFields(req.query);
  const queryString = Object.keys(safeQuery).length > 0 ? `?${JSON.stringify(safeQuery)}` : '';
  console.log(`[${timestamp}] [${req.method}] ${req.path}${queryString} (IP: ${req.ip || 'local'})`);
  next();
};
