import React, { useState } from 'react';
import { SvgToteBag, SvgCloseCross, SvgTadkaPan, SvgSparkleStar, SvgAlertWarning, SvgArrowRight } from './TopicIllustrations';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOrderSuccess,
  onOpenCustomizer
}) {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    instructions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [honeypot, setHoneypot] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 500 || items.length === 0 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;
  const freeDeliveryDelta = 500 - subtotal;

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      setErrorMessage('Your bowl bag is empty. Please add a bowl to continue.');
      return;
    }

    if (!customer.name.trim() || !customer.email.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setErrorMessage('Please fill in all required delivery fields (Name, Email, Phone, Address).');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        customer,
        items: items.map((item) => ({
          bowlId: item._id || item.slug || 'custom',
          slug: item.slug,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          customizations: item.customizations || {}
        })),
        paymentMethod: 'pay_on_delivery',
        website_trap: honeypot
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || (data.errors && data.errors.join(', ')) || 'Could not place order.');
      }

      onOrderSuccess(data.data);
      onClose();
    } catch (err) {
      console.error('Order error:', err);
      setErrorMessage(err.message || 'Something went wrong while placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-jb-dark/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-jb-beige jb-texture shadow-2xl flex flex-col justify-between border-l-3 border-jb-dark">
          
          {/* Drawer Header */}
          <div className="p-6 bg-jb-green border-b-2 border-jb-dark flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SvgToteBag className="w-5 h-5 text-jb-dark" />
              <h3 className="font-display font-black text-xl text-jb-dark uppercase tracking-tight">
                Your Bowl Bag
              </h3>
              <span className="text-xs bg-jb-dark text-white font-black px-2 py-0.5 rounded-full">
                {items.reduce((c, i) => c + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border-2 border-jb-dark bg-white text-jb-dark hover:bg-jb-dark hover:text-white transition-colors flex items-center justify-center font-bold"
              aria-label="Close bag"
            >
              <SvgCloseCross className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            
            {/* Free Delivery Bar */}
            {items.length > 0 && (
              <div className="p-3 bg-jb-gray rounded-2xl border-2 border-jb-dark text-xs font-bold text-jb-dark">
                {subtotal >= 500 ? (
                  <span className="flex items-center gap-1.5">
                    <SvgSparkleStar className="w-3.5 h-3.5 text-jb-dark flex-shrink-0" />
                    <span>Free Express Delivery Unlocked!</span>
                  </span>
                ) : (
                  <span>Add ₹{freeDeliveryDelta} more for <strong>Free Delivery</strong>.</span>
                )}
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 bg-jb-red border-2 border-jb-dark rounded-2xl text-xs text-jb-dark font-bold flex items-start gap-2">
                <SvgAlertWarning className="w-4 h-4 text-jb-dark flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Items List */}
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-jb-dark flex items-center justify-center mx-auto text-jb-dark">
                  <SvgToteBag className="w-8 h-8 text-jb-dark" />
                </div>
                <div>
                  <h4 className="font-display font-black text-lg text-jb-dark uppercase">
                    Your bag is empty
                  </h4>
                  <p className="text-xs text-jb-muted font-medium mt-1 max-w-xs mx-auto">
                    Select one of our 5 signature bowls or craft your own harvest.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenCustomizer();
                  }}
                  className="px-6 py-2.5 rounded-full bg-jb-dark text-white text-xs font-black uppercase tracking-wider hover:opacity-90"
                >
                  Craft a Bowl
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={`${item.slug}-${index}`}
                    className="p-4 bg-white rounded-2xl border-2 border-jb-dark flex gap-3.5 items-start justify-between shadow-sm"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        width="56"
                        height="56"
                        className="w-14 h-14 rounded-xl object-cover border border-jb-dark flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-display font-black text-sm text-jb-dark uppercase">
                          {item.name}
                        </h4>
                        
                        {item.customizations && (
                          <div className="text-[11px] text-jb-muted font-medium space-y-0.5 mt-0.5">
                            {item.customizations.tadkaDressing && (
                              <p className="text-spice-chilli font-bold flex items-center gap-1.5">
                                <SvgTadkaPan className="w-3.5 h-3.5 text-spice-chilli" /> {item.customizations.tadkaDressing}
                              </p>
                            )}
                            {item.customizations.bases && (
                              <p>Base: {item.customizations.bases.join(', ')}</p>
                            )}
                          </div>
                        )}

                        <span className="font-display font-black text-sm text-jb-dark mt-1 block">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-jb-muted hover:text-spice-chilli p-1 flex items-center justify-center"
                        aria-label="Remove item"
                      >
                        <SvgCloseCross className="w-3.5 h-3.5 text-current" />
                      </button>

                      <div className="flex items-center gap-2 bg-jb-beige px-2 py-0.5 rounded-full border border-jb-dark">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="text-jb-dark hover:opacity-70 font-black font-mono text-xs"
                        >
                          −
                        </button>
                        <span className="text-xs font-black text-jb-dark w-3 text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="text-jb-dark hover:opacity-70 font-black font-mono text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Checkout Form */}
                <form id="checkout-form" onSubmit={handleCheckout} className="pt-4 space-y-3">
                  {/* Invisible Honeypot to Catch Spam Bots */}
                  <input
                    id="cart-honeypot"
                    type="text"
                    name="website_trap"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <h4 className="text-xs font-black uppercase tracking-wider text-jb-dark border-b border-jb-dark pb-2">
                    Delivery Coordinates
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label htmlFor="cart-customer-name" className="text-[11px] text-jb-dark block font-black uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        id="cart-customer-name"
                        type="text"
                        name="name"
                        required
                        value={customer.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Priyanshu Mehta"
                        className="w-full px-3 py-2 rounded-xl border-2 border-jb-dark bg-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="cart-customer-phone" className="text-[11px] text-jb-dark block font-black uppercase mb-1">
                          Phone *
                        </label>
                        <input
                          id="cart-customer-phone"
                          type="tel"
                          name="phone"
                          required
                          value={customer.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 rounded-xl border-2 border-jb-dark bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="cart-customer-email" className="text-[11px] text-jb-dark block font-black uppercase mb-1">
                          Email *
                        </label>
                        <input
                          id="cart-customer-email"
                          type="email"
                          name="email"
                          required
                          value={customer.email}
                          onChange={handleInputChange}
                          placeholder="name@domain.com"
                          className="w-full px-3 py-2 rounded-xl border-2 border-jb-dark bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cart-customer-address" className="text-[11px] text-jb-dark block font-black uppercase mb-1">
                        Address *
                      </label>
                      <textarea
                        id="cart-customer-address"
                        name="address"
                        required
                        rows="2"
                        value={customer.address}
                        onChange={handleInputChange}
                        placeholder="House/Flat number, building name, street..."
                        className="w-full px-3 py-2 rounded-xl border-2 border-jb-dark bg-white focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="cart-customer-landmark" className="text-[11px] text-jb-dark block font-black uppercase mb-1">
                        Landmark / Instructions
                      </label>
                      <input
                        id="cart-customer-landmark"
                        type="text"
                        name="landmark"
                        value={customer.landmark}
                        onChange={handleInputChange}
                        placeholder="Near Carter Rd promenade, ring bell..."
                        className="w-full px-3 py-2 rounded-xl border-2 border-jb-dark bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </form>

              </div>
            )}

          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-jb-gray border-t-2 border-jb-dark space-y-4">
              <div className="space-y-1.5 text-xs text-jb-dark font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (5%)</span>
                  <span className="font-bold">₹{tax}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-jb-dark text-sm font-black text-jb-dark">
                  <span>Total Amount</span>
                  <span className="font-display font-black text-xl">
                    ₹{total}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-jb-dark hover:opacity-90 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest transition-opacity flex items-center justify-center gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <span>Dispatching Order...</span>
                ) : (
                  <>
                    <span>Confirm Order (₹{total})</span>
                    <SvgArrowRight className="w-4 h-4 flex-shrink-0" />
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
