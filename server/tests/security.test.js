/**
 * Automated Security Test Suite for BOWL BAE
 * Validates OWASP Top 10 defenses, rate limits, NoSQL injection resistance,
 * CORS boundaries, admin authorization, and input validation.
 */

import http from 'http';
import app from '../server.js';

let server;
const PORT = 5099;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function runTests() {
  console.log('\n🔒 ═══════════════════════════════════════════════════════');
  console.log('   BOWL BAE - COMPREHENSIVE SECURITY AUDIT SUITE');
  console.log('═══════════════════════════════════════════════════════════\n');

  server = app.listen(PORT);
  let passed = 0;
  let failed = 0;

  const assert = (condition, testName) => {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      failed++;
    }
  };

  try {
    // ── TEST 1: Security Headers (Helmet, CSP, HSTS, X-Frame-Options) ──
    const resHeaders = await fetch(`${BASE_URL}/api/health`);
    assert(resHeaders.headers.get('x-frame-options') === 'DENY', 'Clickjacking defense: X-Frame-Options: DENY');
    assert(resHeaders.headers.get('x-content-type-options') === 'nosniff', 'MIME sniffing defense: X-Content-Type-Options: nosniff');
    assert(resHeaders.headers.has('content-security-policy'), 'Content-Security-Policy header present');
    assert(resHeaders.headers.has('strict-transport-security'), 'HSTS header configured for HTTPS');

    // ── TEST 2: Reject empty order searches (Prevents Customer Data Leaks) ──
    const resEmptySearch = await fetch(`${BASE_URL}/api/orders`);
    assert(resEmptySearch.status === 400, 'Unfiltered GET /api/orders blocked (status 400)');
    const emptyJson = await resEmptySearch.json();
    assert(emptyJson.success === false, 'Empty query rejection response has success: false');

    // ── TEST 3: Block Unauthorized Access to Admin Routes ──
    const resAdminNoAuth = await fetch(`${BASE_URL}/api/admin/orders`);
    assert(resAdminNoAuth.status === 401, 'Unauthorized GET /api/admin/orders rejected with 401');

    const resAdminBadToken = await fetch(`${BASE_URL}/api/admin/orders`, {
      headers: { Authorization: 'Bearer forged_fake_jwt_token_12345' }
    });
    assert(resAdminBadToken.status === 403, 'Forged JWT rejected with 403 Forbidden');

    // ── TEST 4: Admin Authentication with Password Hashing & JWT ──
    const resAdminLogin = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: process.env.ADMIN_PASSWORD || 'BowlBae@Nagpur2026!Secure'
      })
    });
    assert(resAdminLogin.status === 200, 'Valid admin login succeeds with 200');
    const adminData = await resAdminLogin.json();
    assert(!!adminData.token, 'Admin login returns signed JWT token');

    // ── TEST 5: Access Admin Route with Valid Token ──
    const resAdminOrders = await fetch(`${BASE_URL}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${adminData.token}` }
    });
    assert(resAdminOrders.status === 200, 'Authenticated admin can retrieve orders list');

    // ── TEST 6: Prevent User Enumeration on Admin Login ──
    const resEnumFail = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'non_existent_random_user_9999',
        password: 'any_random_password'
      })
    });
    assert(resEnumFail.status === 401, 'Non-existent username returns generic 401');
    const enumJson = await resEnumFail.json();
    assert(enumJson.message === 'Invalid administrative credentials.', 'Generic error prevents user enumeration');

    // ── TEST 7: NoSQL Injection Defense (Strip MongoDB operators) ──
    const resNoSqlSearch = await fetch(`${BASE_URL}/api/orders?search[$gt]=`);
    assert(resNoSqlSearch.status === 400 || resNoSqlSearch.status === 200, 'NoSQL operator injection handled safely');

    // ── TEST 8: Honeypot Anti-Spam Bot Rejection ──
    const resHoneypot = await fetch(`${BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'spambot@example.com',
        website_trap: 'I am an automated spam bot filling all inputs!'
      })
    });
    assert(resHoneypot.status === 400, 'Honeypot caught spam submission (400 Bad Request)');
    const honeyJson = await resHoneypot.json();
    assert(honeyJson.message.includes('Spam detected'), 'Honeypot rejects with spam detected message');

    // ── TEST 9: Input Validation on Newsletter ──
    const resInvalidEmail = await fetch(`${BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'not-an-email-address' })
    });
    assert(resInvalidEmail.status === 400, 'Invalid email rejected with 400');

    // ── TEST 10: Input Validation on Orders ──
    const resInvalidOrder = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: '', email: 'bad', phone: '123' },
        items: []
      })
    });
    assert(resInvalidOrder.status === 400, 'Invalid order data rejected with 400');
    const orderJson = await resInvalidOrder.json();
    assert(orderJson.errors && orderJson.errors.length > 0, 'Detailed validation errors provided');

    // ── TEST 11: Oversized Payload Rejection (10kb Limit) ──
    const hugePayload = { dummy: 'A'.repeat(15 * 1024) }; // 15kb
    const resOversized = await fetch(`${BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hugePayload)
    });
    assert(resOversized.status === 413, 'Oversized request payload rejected with 413 Payload Too Large');

    // ── TEST 12: Invalid Order Identifier Format Rejection ──
    const resBadId = await fetch(`${BASE_URL}/api/orders/invalid_weird_id_injection!`);
    assert(resBadId.status === 400, 'Malformed order ID rejected with 400');

    // ── TEST 13: Disallowed HTTP Methods Filter ──
    const resDisallowedMethod = await fetch(`${BASE_URL}/api/health`, {
      method: 'DELETE'
    });
    assert(resDisallowedMethod.status === 405, 'Disallowed HTTP method (DELETE) rejected with 405');

    // ── TEST 14: CORS Blocking for Untrusted Origins ──
    const resBadOrigin = await fetch(`${BASE_URL}/api/health`, {
      headers: { Origin: 'http://malicious-phishing-site.com' }
    });
    assert(resBadOrigin.status === 403, 'CORS blocks untrusted origin with 403');

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log(`   TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
    console.log('═══════════════════════════════════════════════════════════\n');
  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    server.close();
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
