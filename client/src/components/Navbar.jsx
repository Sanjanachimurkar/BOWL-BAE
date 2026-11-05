import React from 'react';

export default function Navbar({ onOpenTrackOrder, onOpenRecipes, onGoHome, isRecipesPage }) {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 bg-transparent py-5 sm:py-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">

        {/* Wordmark */}
        <button
          onClick={onGoHome}
          className="focus:outline-none bg-transparent border-none p-0 cursor-pointer text-left"
          aria-label="Bowl Bae Home"
        >
          <span className="font-display font-normal text-xl sm:text-2xl tracking-tight text-jb-dark uppercase">
            BOWL BAE
          </span>
        </button>

        {/* Navigation links: Our Story + Recipes + My Orders */}
        <nav className="flex items-center gap-5 sm:gap-8">
          <button
            onClick={() => {
              if (isRecipesPage) {
                onGoHome();
                setTimeout(() => {
                  const el = document.getElementById('story');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                const el = document.getElementById('story');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="jb-link text-xs sm:text-sm font-display uppercase tracking-wider text-jb-dark bg-transparent border-none cursor-pointer p-0"
          >
            Our Story
          </button>

          <button
            onClick={onOpenRecipes}
            className={`jb-link text-xs sm:text-sm font-display uppercase tracking-wider text-jb-dark bg-transparent border-none cursor-pointer p-0 ${
              isRecipesPage ? 'font-bold underline' : ''
            }`}
          >
            Recipes
          </button>

          <button
            onClick={onOpenTrackOrder}
            className="jb-link text-xs sm:text-sm font-display uppercase tracking-wider text-jb-dark bg-transparent border-none cursor-pointer p-0"
          >
            My Orders
          </button>
        </nav>

      </div>
    </header>
  );
}
