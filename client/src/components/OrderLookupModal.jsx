import React, { useState, useEffect } from 'react';
import LiveOrderTrackerCreative from './LiveOrderTrackerCreative';
import {
  SvgSaladBowl,
  SvgNagpurEV,
  SvgCloseCross,
  SvgZeroMilePin,
  SvgCopyStamp,
  SvgStampCheck
} from './TopicIllustrations';

const STATUS_CONFIG = {
  received: {
    label: 'Order Placed',
    color: 'bg-amber-100 text-amber-900 border-amber-300',
    dot: 'bg-amber-500'
  },
  chopping: {
    label: 'Cold Prep',
    color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    dot: 'bg-emerald-500'
  },
  tempering_tadka: {
    label: 'Live Tadka',
    color: 'bg-orange-100 text-orange-900 border-orange-300',
    dot: 'bg-orange-500'
  },
  out_for_delivery: {
    label: 'In Transit',
    color: 'bg-blue-100 text-blue-900 border-blue-300',
    dot: 'bg-blue-600'
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-100 text-green-900 border-green-300',
    dot: 'bg-green-600'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-900 border-red-300',
    dot: 'bg-red-600'
  }
};

export default function OrderLookupModal({
  isOpen,
  onClose,
  orderHistory = [],
  onReorder,
  onClearHistory,
  onSyncHistory
}) {
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'lookup'
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('phone'); // 'phone' | 'orderNumber'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [searchedOrders, setSearchedOrders] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      if (orderHistory && orderHistory.length > 0) {
        setActiveTab('history');
      } else {
        setActiveTab('lookup');
      }
      setError(null);
      setSuccessMsg(null);
    }
  }, [isOpen, orderHistory.length]);

  if (!isOpen) return null;

  const handleCopy = (orderNum) => {
    navigator.clipboard.writeText(orderNum);
    setCopiedId(orderNum);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    setSearchedOrders(null);

    try {
      let endpoint = '';
      if (searchType === 'orderNumber' || cleanQuery.toUpperCase().startsWith('BAE-')) {
        endpoint = `/api/orders/${cleanQuery.toUpperCase()}`;
      } else {
        endpoint = `/api/orders?phone=${encodeURIComponent(cleanQuery)}`;
      }

      let res = await fetch(endpoint);
      if (!res.ok && res.status === 404 && endpoint.includes('?phone=')) {
        res = await fetch(`/api/orders/?phone=${encodeURIComponent(cleanQuery)}`);
      }
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'No matching orders found.');
      }

      let foundList = [];
      if (Array.isArray(data.data)) {
        foundList = data.data;
      } else if (data.data) {
        foundList = [data.data];
      }

      if (foundList.length === 0) {
        setError(`No orders found matching "${cleanQuery}". Please verify your 10-digit number.`);
      } else {
        setSearchedOrders(foundList);
        setSuccessMsg(`Found ${foundList.length} order${foundList.length > 1 ? 's' : ''}.`);
        setExpandedOrderId(foundList[0].orderNumber || foundList[0]._id);
        if (onSyncHistory) {
          onSyncHistory(foundList);
        }
      }
    } catch (err) {
      setError(err.message || 'Could not fetch order information.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  const currentDisplayList = activeTab === 'history' ? orderHistory : (searchedOrders || []);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-jb-dark/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      {/* Sleek, compact modal container (max-w-lg) */}
      <div className="relative bg-jb-beige jb-texture rounded-3xl max-w-lg w-full max-h-[88vh] flex flex-col overflow-hidden border-3 border-jb-dark shadow-2xl">
        
        {/* Compact Editorial Header */}
        <div className="px-5 py-3.5 bg-jb-green border-b-2 border-jb-dark flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <SvgNagpurEV className="w-3.5 h-3.5 text-jb-dark inline" />
              <span className="text-[9px] font-mono font-black uppercase tracking-widest text-jb-dark">
                Nagpur Kitchen Dispatch
              </span>
            </div>
            <h3 className="font-display font-black text-base sm:text-lg text-jb-dark uppercase tracking-tight leading-none mt-0.5">
              Order History & Tracking
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full border-2 border-jb-dark bg-white text-jb-dark hover:bg-jb-dark hover:text-white transition-colors flex items-center justify-center font-bold"
            aria-label="Close modal"
          >
            <SvgCloseCross className="w-3 h-3 text-current" />
          </button>
        </div>

        {/* Minimalist Tab Switcher */}
        <div className="px-5 py-2.5 bg-jb-beige/60 border-b border-jb-dark/15 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border transition-all ${
                activeTab === 'history'
                  ? 'bg-jb-dark text-white border-jb-dark shadow-xs'
                  : 'bg-white text-jb-dark border-jb-dark/30 hover:border-jb-dark'
              }`}
            >
              Past Orders ({orderHistory.length})
            </button>

            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border transition-all ${
                activeTab === 'lookup'
                  ? 'bg-jb-dark text-white border-jb-dark shadow-xs'
                  : 'bg-white text-jb-dark border-jb-dark/30 hover:border-jb-dark'
              }`}
            >
              Search by Phone
            </button>
          </div>

          {activeTab === 'history' && orderHistory.length > 0 && onClearHistory && (
            <button
              onClick={onClearHistory}
              className="text-[10px] font-mono font-bold uppercase text-jb-muted hover:text-red-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">

          {/* Search by Phone Form */}
          {activeTab === 'lookup' && (
            <div className="bg-white p-3.5 rounded-2xl border-2 border-jb-dark space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-jb-dark">
                <span className="uppercase">Look up orders by:</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setSearchType('phone'); setQuery(''); }}
                    className={`px-2 py-0.5 rounded text-[9px] uppercase font-mono ${
                      searchType === 'phone'
                        ? 'bg-jb-dark text-white font-black'
                        : 'text-jb-muted border border-jb-dark/20'
                    }`}
                  >
                    Mobile #
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSearchType('orderNumber'); setQuery(''); }}
                    className={`px-2 py-0.5 rounded text-[9px] uppercase font-mono ${
                      searchType === 'orderNumber'
                        ? 'bg-jb-dark text-white font-black'
                        : 'text-jb-muted border border-jb-dark/20'
                    }`}
                  >
                    Order Ref
                  </button>
                </div>
              </div>

              <form onSubmit={handleLookup} className="flex gap-2">
                <input
                  id="order-search-query"
                  name="order_search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchType === 'phone' ? '10-digit mobile number' : 'e.g. BAE-1066'}
                  className="flex-1 px-3.5 py-2 rounded-full border-2 border-jb-dark bg-white text-xs font-mono tracking-wider text-jb-dark focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="px-4 py-2 rounded-full bg-jb-dark text-white text-[11px] font-mono font-black uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {loading ? '...' : 'Find'}
                </button>
              </form>

              {error && (
                <div className="p-2 bg-red-50 border border-red-300 rounded-xl text-[11px] text-red-800 font-medium">
                  {error}
                </div>
              )}

              {successMsg && (
                <div className="p-2 bg-emerald-50 border border-emerald-300 rounded-xl text-[11px] text-emerald-800 font-medium flex items-center gap-1.5">
                  <SvgStampCheck className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}
            </div>
          )}

          {/* Empty History State */}
          {activeTab === 'history' && orderHistory.length === 0 && (
            <div className="bg-white/90 p-6 rounded-2xl border-2 border-dashed border-jb-dark/30 text-center space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-jb-beige border-2 border-jb-dark flex items-center justify-center mx-auto text-jb-dark">
                <SvgSaladBowl className="w-5 h-5 text-jb-dark" />
              </div>
              <h4 className="font-display font-black text-sm text-jb-dark uppercase">
                No orders saved on this device
              </h4>
              <p className="text-[11px] text-jb-muted font-medium max-w-xs mx-auto">
                Orders you place on BOWL BAE will appear here. If you ordered previously, search using your mobile number.
              </p>
              <div className="pt-2 flex gap-2 justify-center">
                <button
                  onClick={() => setActiveTab('lookup')}
                  className="px-3.5 py-1.5 rounded-full bg-jb-dark text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:opacity-90"
                >
                  Search by Mobile #
                </button>
                <button
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('menu');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-jb-dark text-jb-dark text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-jb-beige"
                >
                  Explore Menu
                </button>
              </div>
            </div>
          )}

          {/* Order Cards */}
          {currentDisplayList.length > 0 && (
            <div className="space-y-2.5">
              {currentDisplayList.map((order, idx) => {
                const statusKey = order.status || 'received';
                const statusMeta = STATUS_CONFIG[statusKey] || STATUS_CONFIG.received;
                const orderKey = order.orderNumber || order._id || idx;
                const isExpanded = expandedOrderId === orderKey;

                return (
                  <div
                    key={orderKey}
                    className="bg-white rounded-2xl border-2 border-jb-dark shadow-xs overflow-hidden"
                  >
                    {/* Header Row */}
                    <div className="p-3 sm:p-3.5 border-b border-jb-dark/15 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(order.orderNumber)}
                          className="font-mono font-black text-xs text-jb-dark hover:underline flex items-center gap-1.5"
                          title="Click to copy"
                        >
                          <span>{order.orderNumber}</span>
                          {copiedId === order.orderNumber ? (
                            <SvgStampCheck className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <SvgCopyStamp className="w-3 h-3 text-jb-muted" />
                          )}
                        </button>
                        <span className="text-[10px] font-mono text-jb-muted">
                          • {formatDate(order.createdAt)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${statusMeta.color}`}>
                          ● {statusMeta.label}
                        </span>
                        <span className="font-mono font-black text-xs text-jb-dark">
                          ₹{order.total}
                        </span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="p-3 sm:p-3.5 space-y-1 bg-jb-beige/10 text-xs">
                      {order.items?.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex justify-between font-medium">
                          <span className="text-jb-dark font-medium truncate pr-2">
                            <strong className="font-mono font-bold">{item.quantity}x</strong> {item.name}
                          </span>
                          <span className="font-mono font-bold text-jb-dark flex-shrink-0">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}

                      {order.customer?.address && (
                        <div className="pt-1.5 border-t border-jb-dark/10 text-[10px] text-jb-muted truncate font-mono flex items-center gap-1">
                          <SvgZeroMilePin className="w-3 h-3 text-jb-dark flex-shrink-0" />
                          <span className="truncate">{order.customer.address}</span>
                        </div>
                      )}
                    </div>

                    {/* Inline Telemetric Live Tracker */}
                    {isExpanded && (
                      <div className="p-2.5 sm:p-3 border-t-2 border-jb-dark bg-white animate-fade-in">
                        <LiveOrderTrackerCreative order={order} />
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="px-3 py-2 bg-jb-beige/30 border-t border-jb-dark/15 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => setExpandedOrderId(isExpanded ? null : orderKey)}
                        className="text-[11px] font-mono font-bold uppercase text-jb-dark hover:underline flex items-center gap-1"
                      >
                        <span>{isExpanded ? '▲ Hide Tracking' : '▼ Live Telemetry'}</span>
                      </button>

                      {onReorder && order.items && order.items.length > 0 && (
                        <button
                          type="button"
                          onClick={() => onReorder(order.items)}
                          className="px-3 py-1 rounded-full bg-jb-dark text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-jb-green hover:text-jb-dark transition-all"
                        >
                          Re-order Bowl
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Compact Footer */}
        <div className="px-5 py-2.5 bg-white border-t-2 border-jb-dark flex items-center justify-between text-[11px] font-mono">
          <span className="text-jb-muted">
            Nagpur Cloud Dispatch (10:30 AM — 10:30 PM)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-jb-dark text-white font-mono font-bold uppercase tracking-wider hover:opacity-90"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
