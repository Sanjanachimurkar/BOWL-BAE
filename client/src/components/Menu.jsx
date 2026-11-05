import React, { useState } from 'react';
import { SvgTadkaPan, SvgSparkleStar, SvgArrowRight } from './TopicIllustrations';

export default function Menu({ bowls, onSelectBowl, onQuickAdd, onOpenCustomizer }) {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Bowls' },
    { id: 'protein', label: 'High Protein' },
    { id: 'vegan', label: '100% Vegan' },
    { id: 'gf', label: 'Gluten-Free' },
  ];

  const filteredBowls = bowls.filter((bowl) => {
    if (filter === 'all') return true;
    if (filter === 'protein') {
      const p = parseInt(bowl.protein);
      return (p && p >= 20) || bowl.dietary.some((d) => d.toLowerCase().includes('protein'));
    }
    if (filter === 'vegan') {
      return bowl.dietary.some((d) => d.toLowerCase().includes('vegan'));
    }
    if (filter === 'gf') {
      return bowl.dietary.some((d) => d.toLowerCase().includes('gluten-free'));
    }
    return true;
  });

  return (
    <section id="menu" className="py-12 sm:py-16 bg-jb-beige jb-texture">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-display uppercase tracking-widest text-jb-dark block mb-1">
              Micro-Kitchen Menu
            </span>
            <h2 className="jb-section-title text-jb-dark uppercase leading-[0.95]">
              The Bowls
            </h2>
          </div>

          <p className="jb-body-text text-jb-dark text-xs sm:text-sm max-w-md leading-relaxed">
            Tempered fresh in Nagpur upon order. Cold-pressed oils, native grains, sprouted pulses, and living farm greens.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-display uppercase tracking-wider border border-jb-dark transition-all ${
                filter === cat.id
                  ? 'bg-jb-dark text-white shadow-sm'
                  : 'bg-transparent text-jb-dark hover:bg-jb-dark/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Compact Bowls Grid (4-Column Layout, Sleek & Small) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBowls.map((bowl) => {
            const isBYOB = bowl.slug === 'build-your-own-bowl';

            return (
              <div
                key={bowl._id || bowl.slug}
                className="group bg-white rounded-2xl border-2 border-jb-dark overflow-hidden p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-200"
              >
                <div>
                  {/* Compact Circular Cutout Bowl */}
                  <div
                    className="relative flex justify-center items-center py-2 cursor-pointer"
                    onClick={() => onSelectBowl(bowl)}
                  >
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-jb-dark shadow-md transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={bowl.image}
                        alt={bowl.name}
                        width="128"
                        height="128"
                        decoding="async"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {bowl.badge && (
                      <span className="absolute top-1 left-0 px-2 py-0.5 rounded-full bg-jb-dark text-white text-[9px] font-display uppercase tracking-wider shadow-sm">
                        {bowl.badge}
                      </span>
                    )}

                    <div className="absolute bottom-1 right-0 bg-jb-dark text-white px-2 py-0.5 rounded-full text-[10px] font-display tracking-wider shadow-sm">
                      {bowl.calories} kcal
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2 pt-2">
                    
                    <div className="flex flex-wrap gap-1">
                      {bowl.dietary.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full border border-jb-dark/30 bg-transparent text-jb-dark text-[9px] font-display uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3
                      onClick={() => onSelectBowl(bowl)}
                      className="font-display text-base sm:text-lg text-jb-dark hover:opacity-80 transition-opacity cursor-pointer tracking-tight leading-tight uppercase"
                    >
                      {bowl.name}
                    </h3>

                    <p className="text-[11px] font-display text-jb-muted uppercase tracking-wider">
                      {bowl.tagline}
                    </p>

                    <p className="text-xs jb-body-text text-jb-dark line-clamp-2 leading-relaxed opacity-90">
                      {bowl.description}
                    </p>

                    {/* Compact Macro Strip */}
                    <div className="flex items-center gap-1.5 text-[10px] font-display uppercase tracking-wider text-jb-dark/80 pt-1">
                      <span className="px-2 py-0.5 rounded-md bg-jb-green/40 border border-jb-dark/20">
                        {bowl.protein} P
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-jb-green/40 border border-jb-dark/20">
                        {bowl.fiber} F
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-jb-green/40 border border-jb-dark/20">
                        {bowl.carbs} C
                      </span>
                    </div>

                    {/* Sizzling Tadka Note */}
                    <div className="p-2 rounded-xl bg-jb-red/30 border border-jb-dark/30 text-[11px] flex items-center gap-1.5 text-jb-dark">
                      <SvgTadkaPan className="w-3.5 h-3.5 text-spice-chilli flex-shrink-0" />
                      <span className="truncate">
                        <strong className="font-display font-normal">Tadka:</strong> {bowl.tadkaDressing}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Footer Strip */}
                <div className="pt-3 border-t border-jb-dark/15 mt-3 flex items-center justify-between">
                  <div>
                    <span className="font-display text-xl text-jb-dark">
                      ₹{bowl.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectBowl(bowl)}
                      className="px-2.5 py-1.5 rounded-full border border-jb-dark text-jb-dark text-[11px] font-display uppercase tracking-wider hover:bg-jb-dark hover:text-white transition-colors"
                    >
                      Details
                    </button>

                    {isBYOB ? (
                      <button
                        onClick={onOpenCustomizer}
                        className="px-3 py-1.5 rounded-full bg-jb-dark text-white text-[11px] font-display uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-1.5"
                      >
                        <SvgSparkleStar className="w-3 h-3 text-yellow-300" />
                        <span>Build</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onQuickAdd(bowl)}
                        className="px-3 py-1.5 rounded-full bg-jb-dark text-white text-[11px] font-display uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-1"
                      >
                        <span className="font-mono text-xs font-bold">+</span>
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Compact Build Your Own Bowl Strip */}
        <div className="mt-8 bg-jb-green p-5 sm:p-7 rounded-2xl border-2 border-jb-dark flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] font-display uppercase tracking-widest text-jb-dark block">
              Bespoke Bowl Studio
            </span>
            <h3 className="font-display uppercase text-lg sm:text-xl text-jb-dark tracking-tight">
              Design Your Signature Indian Harvest
            </h3>
            <p className="jb-body-text text-jb-dark text-xs sm:text-sm">
              Pick 2 grains or greens, select your protein (A2 paneer, tandoori chana, sprouted moong), add 4 toppings, and choose your freshly tempered tadka.
            </p>
          </div>

          <button
            onClick={onOpenCustomizer}
            className="px-6 py-3 rounded-full bg-jb-dark text-white font-display text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2 flex-shrink-0 shadow-sm"
          >
            <span>Launch Bowl Builder</span>
            <SvgArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
          </button>
        </div>

      </div>
    </section>
  );
}
