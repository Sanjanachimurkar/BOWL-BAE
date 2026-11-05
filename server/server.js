import express from 'express';
import dotenv from 'dotenv';
import connectDB, { isMongoConnected } from './config/db.js';
import bowlRoutes from './routes/bowls.js';
import orderRoutes from './routes/orders.js';
import newsletterRoutes from './routes/newsletter.js';
import adminRoutes from './routes/admin.js';
import {
  helmetMiddleware,
  corsMiddleware,
  timeoutMiddleware,
  methodFilterMiddleware,
  mongoSanitizeMiddleware,
  secureLogger
} from './middleware/security.js';
import { apiLimiter } from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

// 1. Trust proxy in production if behind reverse proxy (Nginx, Cloudflare, Heroku, Render)
if (isProd) {
  app.set('trust proxy', 1);
}

// 2. Strict Security Headers via Helmet
app.use(helmetMiddleware);

// 3. Strict CORS Origin Whitelist
app.use(corsMiddleware);

// 4. Request Timeout & Method Filter
app.use(timeoutMiddleware);
app.use(methodFilterMiddleware);

// 5. Request Body Size Limit (10kb maximum to block buffer overflow & DoS attacks)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// 6. Deep NoSQL Injection & Query Sanitization
app.use(mongoSanitizeMiddleware);

// 7. Redacted Security Logger
app.use(secureLogger);

// 8. General API Rate Limiter
app.use('/api', apiLimiter);

// 9. Health check (minimal, non-leaking diagnostic)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Bowl Bae',
    environment: isProd ? 'production' : 'development',
    timestamp: new Date().toISOString(),
    database: isMongoConnected ? 'connected' : 'memory_fallback'
  });
});

// 10. API Routes
app.use('/api/bowls', bowlRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/admin', adminRoutes);

// 11. 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.path} not found.`
  });
});

// 12. Centralized Production Error Handler (Zero stack-trace or internal detail leak)
app.use((err, req, res, next) => {
  // CORS error handling
  if (err.message && err.message.includes('CORS blocked')) {
    return res.status(403).json({
      success: false,
      message: err.message
    });
  }

  // Request body parsing error (e.g. malformed JSON or payload too large)
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Request payload exceeds the 10kb maximum limit.'
    });
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Malformed JSON payload in request.'
    });
  }

  // Log error securely without sensitive variables
  console.error('🔥 [Server Error]:', isProd ? err.message : err);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: isProd && statusCode === 500 ? 'An internal server error occurred.' : err.message || 'Internal Server Error',
    ...(isProd ? {} : { stack: err.stack })
  });
});

// Initialize server
export const startServer = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║     🥣  BOWL BAE SECURE API SERVER RUNNING            ║
║     📍  http://localhost:${PORT}                         ║
║     🛡️  Helmet CSP & HSTS: ENABLED                    ║
║     🔒  NoSQL Injection Sanitizer: ACTIVE             ║
║     ⚡  Rate Limiting & Admin Auth: ACTIVE            ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);
  });
  return server;
};

// Start server when run directly or when booted by Vercel services
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
