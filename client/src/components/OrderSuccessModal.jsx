import React, { useState } from 'react';
import {
  SvgStampCheck,
  SvgHarvestClock,
  SvgZeroMilePin,
  SvgCloseCross,
  SvgCopyStamp,
  SvgArrowRight
} from './TopicIllustrations';

export default function OrderSuccessModal({ order, onClose, onViewTracking }) {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const steps = [
    { label: 'Received', done: true },
    { label: 'Chopping', done: true },
    { label: 'Live Tadka', done: order.status !== 'received' },
    { label: 'Dispatched', done: order.status === 'out_for_delivery' || order.status === 'delivered' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-jb-dark/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-jb-beige jb-texture rounded-3xl max-w-md w-full overflow-hidden border-3 border-jb-dark shadow-2xl p-6 sm:p-7">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full border-2 border-jb-dark bg-white text-jb-dark hover:bg-jb-dark hover:text-white transition-colors flex items-center justify-center font-bold"
          aria-label="Close modal"
        >
          <SvgCloseCross className="w-3 h-3 text-current" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-jb-green border-2 border-jb-dark text-jb-dark flex items-center justify-center mx-auto shadow-xs">
            <SvgStampCheck className="w-6 h-6 text-jb-dark" />
          </div>

          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-jb-dark block">
            Order Dispatched To Kitchen
          </span>

          <h3 className="font-display font-black text-2xl text-jb-dark uppercase tracking-tight">
            The Tadka Is Sizzling!
          </h3>

          <p className="text-xs text-jb-dark font-medium max-w-xs mx-auto">
            Thank you, {order.customer?.name}. Your fresh Indian salad bowl is being prepped in our kitchen.
          </p>
        </div>

        {/* Order Reference Box */}
        <div className="mt-5 p-3.5 bg-white rounded-2xl border-2 border-jb-dark flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase font-mono font-bold text-jb-muted block">
              Order Reference
            </span>
            <span className="font-mono font-black text-base text-jb-dark">
              {order.orderNumber}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-jb-dark bg-jb-beige text-[11px] font-mono font-bold text-jb-dark hover:bg-jb-dark hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <SvgStampCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <SvgCopyStamp className="w-3 h-3 text-jb-dark" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="mt-5 space-y-2">
          <h4 className="text-[10px] font-mono font-black uppercase tracking-wider text-jb-dark">
            Kitchen Phase
          </h4>
          <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
            {steps.map((st, i) => (
              <div
                key={st.label}
                className={`p-2 rounded-xl border-2 border-jb-dark text-[10px] font-mono font-bold ${
                  st.done
                    ? 'bg-jb-green text-jb-dark'
                    : 'bg-white text-jb-muted opacity-50'
                }`}
              >
                <span className="block text-[9px]">0{i + 1}</span>
                <span className="block mt-0.5">{st.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-5 pt-3 border-t-2 border-jb-dark/15 text-xs space-y-1.5 text-jb-dark font-medium">
          <div className="flex items-start gap-1.5 text-[11px]">
            <SvgHarvestClock className="w-3.5 h-3.5 text-jb-dark flex-shrink-0 mt-0.5" />
            <span>Estimated Delivery: <strong>{order.estimatedDeliveryTime || '25-35 mins'}</strong></span>
          </div>
          <div className="flex items-start gap-1.5 text-[11px]">
            <SvgZeroMilePin className="w-3.5 h-3.5 text-jb-dark flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">Destination: {order.customer?.address}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-jb-dark font-black text-xs text-jb-dark font-mono">
            <span>DUE ON DELIVERY:</span>
            <span className="text-sm">₹{order.total}</span>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {onViewTracking && (
            <button
              onClick={onViewTracking}
              className="w-full py-2.5 rounded-full bg-jb-dark text-white text-xs font-mono font-black uppercase tracking-wider hover:bg-jb-green hover:text-jb-dark border-2 border-jb-dark transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>View in Order History & Track Live</span>
              <SvgArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full py-2 rounded-full bg-transparent text-jb-dark text-[11px] font-mono font-bold uppercase tracking-wider hover:bg-white/60 border border-jb-dark/30 transition-colors"
          >
            Done & Return to Menu
          </button>
        </div>

      </div>
    </div>
  );
}
