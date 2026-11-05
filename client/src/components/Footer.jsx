import React from 'react';
import { SvgArrowUp, SvgArrowRight, SvgAlertWarning } from './TopicIllustrations';

export default function Footer({ onOpenTrackOrder, onOpenRecipes }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-jb-beige jb-texture pt-14 pb-10 text-jb-dark">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Giant Wordmark in Blamo-Bold */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b-2 border-jb-dark">
          <div>
            <span className="font-display font-normal text-6xl sm:text-8xl md:text-9xl tracking-tighter uppercase text-jb-dark block leading-none">
              BOWL BAE
            </span>
            <p className="text-sm sm:text-base font-display uppercase tracking-wider text-jb-dark mt-3">
              Garden Meets Tadka • Indian Salad Bowls Reimagined
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="self-start md:self-end flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-jb-dark bg-transparent text-xs uppercase font-display tracking-wider hover:bg-jb-dark hover:text-white transition-colors"
          >
            <span>Top of Page</span>
            <SvgArrowUp className="w-3.5 h-3.5 flex-shrink-0" />
          </button>
        </div>

        {/* 4 Column Minimal Link Grid in JuiceBot Style */}
        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          
          <div>
            <h4 className="font-display uppercase tracking-widest text-jb-dark mb-4 text-xs">
              The Menu
            </h4>
            <ul className="space-y-2 font-medium">
              <li><a href="#menu" className="jb-link">Tandoori Chickpea Crunch</a></li>
              <li><a href="#menu" className="jb-link">Mumbai Chaat Bowl</a></li>
              <li><a href="#menu" className="jb-link">Punjabi Power Bowl</a></li>
              <li><a href="#menu" className="jb-link">South Indian Protein Bowl</a></li>
              <li><a href="#menu" className="jb-link">Build Your Own Bowl</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-jb-dark mb-4 text-xs">
              Philosophy & Recipes
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  onClick={onOpenRecipes}
                  className="jb-link bg-transparent border-none p-0 cursor-pointer font-bold text-left text-jb-dark inline-flex items-center gap-1.5"
                >
                  <span>Salad Recipes Vault</span>
                  <SvgArrowRight className="w-3 h-3 flex-shrink-0" />
                </button>
              </li>
              <li><a href="#story" className="jb-link">Fresh, Not Boring</a></li>
              <li><a href="#freshness" className="jb-link">4 Hours vs. 40 Days</a></li>
              <li><a href="#process" className="jb-link">The Salad Journey</a></li>
              <li><a href="#sourcing" className="jb-link">Organic Satara Dairy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-jb-dark mb-4 text-xs">
              Delivery & Tracking
            </h4>
            <ul className="space-y-2 font-medium">
              <li>Fresh Nagpur Kitchen Dispatch</li>
              <li>Eco-Friendly Electric Fleet</li>
              <li>Tempered Live on Arrival</li>
              <li>Zero Preservative Seal</li>
              <li className="pt-2">
                <button
                  onClick={onOpenTrackOrder}
                  className="font-display underline uppercase tracking-wider text-xs inline-flex items-center gap-1.5"
                >
                  <span>Order History & Tracking</span>
                  <SvgArrowRight className="w-3 h-3 flex-shrink-0" />
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-widest text-jb-dark mb-3 text-xs">
              Kitchen Operations
            </h4>
            <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jb-dark text-white text-[10px] font-display uppercase tracking-wider">
              <span>●</span> Available Only in Nagpur
            </div>
            <p className="font-medium text-xs leading-relaxed mt-1">
              Serving All Across Nagpur, Maharashtra <br />
              Monday – Sunday <br />
              <strong className="text-sm font-display text-jb-dark">10:30 AM — 10:30 PM</strong>
            </p>
            <div className="mt-3 p-3 bg-jb-green rounded-2xl border-2 border-jb-dark text-[11px] font-display text-jb-dark">
              100% Bagasse Packaging • Decomposes in 90 days. Zero plastic lining.
            </div>
          </div>

        </div>

        {/* Allergen Notice */}
        <div className="pt-6 pb-8 border-t-2 border-jb-dark text-xs font-medium text-jb-muted flex items-start gap-2">
          <SvgAlertWarning className="w-4 h-4 text-jb-dark flex-shrink-0 mt-0.5" />
          <p>
            <strong>Allergen Notice:</strong> Our kitchens handle peanuts, sesame, mustard seeds, and A2 dairy. Vegan and gluten-free bowls are assembled with dedicated sanitized tools.
          </p>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t-2 border-jb-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-display text-jb-dark uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Bowl Bae. The modern way to salad.</p>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="jb-link">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="jb-link">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="jb-link">Facebook</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
