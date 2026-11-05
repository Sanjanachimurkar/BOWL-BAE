import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import Menu from './components/Menu';
import Footer from './components/Footer';
import { fallbackBowls } from './data/fallbackBowls';

// Lazy-load below-the-fold content to cut initial bundle & main-thread execution
const Freshness = lazy(() => import('./components/Freshness'));
const Process = lazy(() => import('./components/Process'));
const Sourcing = lazy(() => import('./components/Sourcing'));
const Newsletter = lazy(() => import('./components/Newsletter'));

// Code-split heavy interactive modals and subpages
const RecipesPage = lazy(() => import('./components/RecipesPage'));
const BowlModal = lazy(() => import('./components/BowlModal'));
const CustomizerModal = lazy(() => import('./components/CustomizerModal'));
const CartDrawer = lazy(() => import('./components/CartDrawer'));
const OrderSuccessModal = lazy(() => import('./components/OrderSuccessModal'));
const OrderLookupModal = lazy(() => import('./components/OrderLookupModal'));

export default function App() {
  const [bowls, setBowls] = useState(fallbackBowls);
  const [loadingBowls, setLoadingBowls] = useState(true);
  
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('bowl_bae_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Customer order history persisted in localStorage
  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('bowl_bae_order_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBowl, setSelectedBowl] = useState(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    return typeof window !== 'undefined' && window.location.hash === '#recipes' ? 'recipes' : 'home';
  });

  // Listen to hash changes (e.g. #recipes, #story, #menu)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#recipes') {
        setCurrentPage('recipes');
      } else if (!window.location.hash || window.location.hash === '#') {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToRecipes = () => {
    setCurrentPage('recipes');
    window.location.hash = 'recipes';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    if (window.location.hash === '#recipes') {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bowl_bae_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  // Fetch bowls from REST API
  useEffect(() => {
    const fetchBowls = async () => {
      try {
        const res = await fetch('/api/bowls');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data && data.data.length > 0) {
            setBowls(data.data);
          }
        }
      } catch (err) {
        console.warn('API fetch fell back to static data:', err.message);
      } finally {
        setLoadingBowls(false);
      }
    };

    fetchBowls();
  }, []);

  // Cart operations
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (c) =>
          c.slug === item.slug &&
          JSON.stringify(c.customizations || {}) === JSON.stringify(item.customizations || {})
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += item.quantity || 1;
        return updated;
      }

      return [...prevCart, { ...item, quantity: item.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCart((prevCart) => prevCart.filter((_, idx) => idx !== index));
  };

  const saveOrderToHistory = (order) => {
    setOrderHistory((prev) => {
      const filtered = prev.filter(
        (o) => o.orderNumber !== order.orderNumber && (!o._id || o._id !== order._id)
      );
      const updated = [order, ...filtered];
      try {
        localStorage.setItem('bowl_bae_order_history', JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save order history to localStorage', e);
      }
      return updated;
    });
  };

  const handleSyncHistory = (fetchedOrders) => {
    setOrderHistory((prev) => {
      const existingIds = new Set(prev.map((o) => o.orderNumber || o._id));
      const newOrders = (fetchedOrders || []).filter(
        (o) => !existingIds.has(o.orderNumber || o._id)
      );
      const merged = [...prev, ...newOrders].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
      try {
        localStorage.setItem('bowl_bae_order_history', JSON.stringify(merged));
      } catch (e) {
        console.warn('Could not save merged history to localStorage', e);
      }
      return merged;
    });
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('bowl_bae_order_history');
    } catch (e) {
      console.warn('Could not clear order history', e);
    }
    setOrderHistory([]);
  };

  const handleReorder = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return;
    setCart((prevCart) => {
      let updatedCart = [...prevCart];
      orderItems.forEach((item) => {
        const existingIndex = updatedCart.findIndex(
          (c) =>
            c.slug === item.slug &&
            JSON.stringify(c.customizations || {}) === JSON.stringify(item.customizations || {})
        );
        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity += item.quantity || 1;
        } else {
          updatedCart.push({ ...item, quantity: item.quantity || 1 });
        }
      });
      return updatedCart;
    });
    setIsTrackModalOpen(false);
    setIsCartOpen(true);
  };

  const handleOrderSuccess = (order) => {
    setLastOrder(order);
    saveOrderToHistory(order);
    setCart([]); // Clear cart
  };

  const totalCartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-jb-green text-jb-dark font-sans selection:bg-jb-dark selection:text-white">
      
      {/* 1. Global Navigation */}
      <Navbar
        onOpenTrackOrder={() => setIsTrackModalOpen(true)}
        onOpenRecipes={navigateToRecipes}
        onGoHome={navigateToHome}
        isRecipesPage={currentPage === 'recipes'}
      />

      <main className="flex-1">
        {currentPage === 'recipes' ? (
          <Suspense fallback={<div className="min-h-screen py-24 flex items-center justify-center font-display uppercase text-jb-dark">Loading Recipes...</div>}>
            <RecipesPage
              onBackHome={navigateToHome}
              onOrderClick={() => {
                navigateToHome();
                setTimeout(scrollToMenu, 150);
              }}
            />
          </Suspense>
        ) : (
          <>
            {/* Section 1: Hero (bg-jb-green #b2bea5) */}
            <Hero
              onOrderClick={scrollToMenu}
              onExploreClick={() => {
                const storyEl = document.getElementById('story');
                if (storyEl) storyEl.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Section 2: Story "Fresh, Not Boring" (bg-jb-beige #e3cba5) */}
            <Story />

            {/* Below-the-fold content lazy-loaded */}
            <Suspense fallback={null}>
              {/* Section 3: Freshness "4 Hours vs. 40 Days" (bg-jb-red #daad9d) */}
              <Freshness />

              {/* Section 4 & 5: The Salad Journey & "Farm. Chop. Tadka. Bowl." (bg-jb-gray #e1dcd6) */}
              <Process />
            </Suspense>

            {/* Section 6: Menu & BYOB (bg-jb-beige #e3cba5) */}
            <Menu
              bowls={bowls}
              onSelectBowl={(bowl) => setSelectedBowl(bowl)}
              onQuickAdd={(bowl) => handleAddToCart(bowl)}
              onOpenCustomizer={() => setIsCustomizerOpen(true)}
            />

            <Suspense fallback={null}>
              {/* Section 7: Organic Sourcing (bg-jb-green #b2bea5) */}
              <Sourcing />

              {/* Section 8: The Tadka Dispatch (bg-jb-red #daad9d) */}
              <Newsletter />
            </Suspense>
          </>
        )}
      </main>

      {/* Section 9: Minimal Editorial Footer (bg-jb-beige #e3cba5) */}
      <Footer
        onOpenTrackOrder={() => setIsTrackModalOpen(true)}
        onOpenRecipes={navigateToRecipes}
      />

      {/* Modals & Drawers */}
      <Suspense fallback={null}>
        {selectedBowl && (
          <BowlModal
            bowl={selectedBowl}
            onClose={() => setSelectedBowl(null)}
            onAddToCart={handleAddToCart}
          />
        )}

        {isCustomizerOpen && (
          <CustomizerModal
            isOpen={isCustomizerOpen}
            onClose={() => setIsCustomizerOpen(false)}
            onAddToCart={handleAddToCart}
          />
        )}

        {isCartOpen && (
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onOrderSuccess={handleOrderSuccess}
            onOpenCustomizer={() => {
              setIsCartOpen(false);
              setIsCustomizerOpen(true);
            }}
          />
        )}

        {lastOrder && (
          <OrderSuccessModal
            order={lastOrder}
            onClose={() => setLastOrder(null)}
            onViewTracking={() => {
              setLastOrder(null);
              setIsTrackModalOpen(true);
            }}
          />
        )}

        {isTrackModalOpen && (
          <OrderLookupModal
            isOpen={isTrackModalOpen}
            onClose={() => setIsTrackModalOpen(false)}
            orderHistory={orderHistory}
            onReorder={handleReorder}
            onClearHistory={handleClearHistory}
            onSyncHistory={handleSyncHistory}
          />
        )}
      </Suspense>

    </div>
  );
}
