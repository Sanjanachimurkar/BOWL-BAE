/**
 * Security Utility Functions for BOWL BAE
 * Input sanitization, regex escaping, and security validators.
 */

// Escape characters that have special meaning in regular expressions
export function escapeRegex(string) {
  if (typeof string !== 'string') return '';
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Basic HTML escaping to prevent stored XSS
export function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Strip MongoDB query operators ($gt, $ne, $where, etc.) recursively from any object
export function sanitizeMongoInput(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeMongoInput);
  }

  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    // Drop keys starting with '$' or containing '.' (MongoDB operators and subdocument injection)
    if (key.startsWith('$') || key.includes('.')) {
      continue;
    }
    sanitized[key] = sanitizeMongoInput(value);
  }
  return sanitized;
}

// Validate clean 10-digit Indian mobile number
export function sanitizePhone(phone) {
  if (!phone || typeof phone !== 'string') return null;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 ? digits.slice(-10) : null;
}

// Validate clean email address
export function sanitizeEmail(email) {
  if (!email || typeof email !== 'string') return null;
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (trimmed.length > 100 || !emailRegex.test(trimmed)) {
    return null;
  }
  return trimmed;
}

// Scrub sensitive fields from logs (passwords, tokens, credentials)
export function scrubSensitiveFields(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const sensitiveKeys = ['password', 'token', 'authorization', 'secret', 'key', 'cookie'];
  const scrubbed = Array.isArray(obj) ? [] : {};
  for (const [k, v] of Object.entries(obj)) {
    if (sensitiveKeys.some(s => k.toLowerCase().includes(s))) {
      scrubbed[k] = '[REDACTED]';
    } else if (v && typeof v === 'object') {
      scrubbed[k] = scrubSensitiveFields(v);
    } else {
      scrubbed[k] = v;
    }
  }
  return scrubbed;
}
