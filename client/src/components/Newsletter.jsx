import React, { useState } from 'react';
import { SvgStampCheck, SvgAlertWarning, SvgArrowRight } from './TopicIllustrations';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          source: 'website_juicebot_newsletter',
          website_trap: honeypot
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Subscription failed.');
      }

      setStatus({
        type: 'success',
        message: data.message || 'Welcome to The Tadka Dispatch!'
      });
      setEmail('');
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Could not connect. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="dispatch" className="py-14 sm:py-16 bg-jb-red jb-texture text-center">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
        
        <span className="text-xs font-display uppercase tracking-widest text-jb-dark block mb-3">
          The Tadka Dispatch
        </span>

        <h2 className="jb-section-title text-jb-dark uppercase">
          Stay Crisp.<br />
          No Spam, Only Spice Drops.
        </h2>

        <p className="mt-6 jb-body-text text-jb-dark max-w-xl mx-auto leading-relaxed">
          Sign up to receive our weekly seasonal harvest drops, unannounced secret bowl specials, and clean spice stories.
        </p>

        {/* Subscribe Form */}
        <form onSubmit={handleSubscribe} className="mt-10 max-w-md mx-auto relative">
          {/* Honeypot field for bot protection */}
          <input
            id="newsletter-honeypot"
            type="text"
            name="website_trap"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: 'none', position: 'absolute', left: '-9999px' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 px-5 py-3.5 rounded-full border-2 border-jb-dark bg-white text-sm text-jb-dark placeholder:text-jb-muted focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-full bg-jb-dark text-white text-xs font-display uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2 flex-shrink-0"
            >
              <span>{loading ? 'Subscribing...' : 'Join'}</span>
              <SvgArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </button>
          </div>

          {status && (
            <div className={`mt-4 p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border-2 border-jb-dark ${
              status.type === 'success' ? 'bg-jb-green text-jb-dark' : 'bg-white text-spice-chilli'
            }`}>
              {status.type === 'success' ? (
                <SvgStampCheck className="w-4 h-4 flex-shrink-0" />
              ) : (
                <SvgAlertWarning className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          <p className="text-xs text-jb-dark/80 font-medium mt-3">
            Strictly 1 email per week. Zero ads. Unsubscribe anytime.
          </p>
        </form>

      </div>
    </section>
  );
}
