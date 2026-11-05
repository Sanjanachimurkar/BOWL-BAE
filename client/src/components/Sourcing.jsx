import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SataraDairyCutout, MilletCutout, ColdPressOilCutout, SpicesCutout } from './Cutouts';
import {
  SvgZeroMilePin,
  SvgFarmSprout,
  SvgArrowRight,
  SvgCloseCross,
  SvgSparkleStar,
  SvgStampCheck
} from './TopicIllustrations';

export default function Sourcing() {
  const [activeStory, setActiveStory] = useState(null);

  const stories = [
    {
      id: 'paneer',
      num: '01',
      region: 'Satara, Maharashtra',
      item: 'A2 Malai Paneer',
      farmer: 'Gowardhan Dairy Collective',
      headline: 'Fresh Gir Cow Curdled Daily',
      shortStory: 'Grass-fed indigenous Gir cows, curdled fresh daily with organic lemon juice. Zero artificial starches or milk powders.',
      fullStory: 'In the lush foothills of the Western Ghats, the Gowardhan collective nurtures indigenous Gir cows on open wild pastures. Milk is drawn at dawn and curdled within 90 minutes using fresh organic lemon juice. No synthetic vinegar, zero bleaching agents, and absolutely no starch fillers.',
      Cutout: SataraDairyCutout,
      badge: 'A2 Grass-Fed',
      elevation: '740m Western Ghats',
    },
    {
      id: 'millet',
      num: '02',
      region: 'Haveri, Karnataka',
      item: 'Heirloom Foxtail Millet',
      farmer: 'Sahaja Samrudha Seed Savers',
      headline: 'Rainfed Native Ancient Grains',
      shortStory: 'Rainfed native grains grown without synthetic fertilizers. Naturally high in zinc, gut prebiotic fibers, and gluten-free.',
      fullStory: 'Preserved by third-generation seed keepers in north Karnataka, these heirloom foxtail millets (Navane) drink only seasonal monsoon rain. They are naturally pest-resistant and require zero chemical sprays, yielding a nutty, nutrient-dense grain that supports gut flora and metabolic balance.',
      Cutout: MilletCutout,
      badge: 'Heritage Millets',
      elevation: '600m Rainfed Plains',
    },
    {
      id: 'oil',
      num: '03',
      region: 'Bharatpur, Rajasthan',
      item: 'Kachi Ghani Mustard Oil',
      farmer: 'Kisan Cold-Press Cooperative',
      headline: 'Slow Wooden Expeller Pressed',
      shortStory: 'Wooden expeller pressed below 40°C. Pungent, golden, retains natural allylisothiocyanate for digestion.',
      fullStory: 'Sun-dried small black mustard seeds are crushed in slow wooden kolhus (ghani) at under 40°C. Never refined, winterized, or chemically deodorized. It retains its deep golden clarity and pungent digestive essence that activates when crackled in our cast-iron ladles.',
      Cutout: ColdPressOilCutout,
      badge: 'Unrefined Wood-Pressed',
      elevation: '180m Arid Plains',
    },
    {
      id: 'spice',
      num: '04',
      region: 'Wayanad, Kerala',
      item: 'Tellicherry Pepper & Curry Leaf',
      farmer: 'Malabar Spices Collective',
      headline: 'Mist-Harvested Whole Spices',
      shortStory: 'Sun-dried black peppercorns and heirloom small-leaf karivepila harvested in early mist for deep aromatic oils.',
      fullStory: 'Harvested on misty biodiverse slopes shaded by wild jackfruit trees. Tellicherry extra bold black peppercorns are slow sun-dried on bamboo mats, while small-leaf native karivepila is plucked at first dawn when essential aromatic oils are at their daily peak.',
      Cutout: SpicesCutout,
      badge: 'Small Batch Spices',
      elevation: '920m Mist Forest',
    },
  ];

  return (
    <section id="sourcing" className="py-14 sm:py-16 bg-jb-green jb-texture relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-display uppercase tracking-widest text-jb-dark block mb-1">
              Soil Integrity & Origin
            </span>
            <h2 className="jb-section-title text-jb-dark uppercase leading-[0.95]">
              Rooted In Soil.<br />Elevated With Spice.
            </h2>
          </div>

          <p className="jb-body-text text-jb-dark text-sm sm:text-base max-w-md leading-relaxed">
            We don’t buy bulk commodities from anonymous brokers. Click any story chapter below to trace the farmers and fields behind your bowl.
          </p>
        </div>

        {/* ── Compact Storytelling Grid: 4 Sleek Small Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stories.map((src, idx) => {
            const CutoutComponent = src.Cutout;
            return (
              <motion.div
                key={src.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                onClick={() => setActiveStory(src)}
                className="group cursor-pointer bg-jb-beige p-3.5 sm:p-4 rounded-xl border-2 border-jb-dark flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 relative"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-2 border-b border-jb-dark/15 text-xs font-display uppercase">
                    <span className="px-2 py-0.5 rounded-full bg-jb-dark text-white text-[9px] tracking-wider">
                      CH. {src.num}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-jb-muted font-mono">
                      <SvgZeroMilePin className="w-2.5 h-2.5 text-jb-dark" />
                      {src.region.split(',')[0]}
                    </span>
                  </div>

                  {/* Compact Animated Vector Cutout */}
                  <div className="py-2.5 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.2 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center drop-shadow-sm"
                    >
                      <CutoutComponent className="w-full h-full" />
                    </motion.div>
                  </div>

                  {/* Ingredient Title & Farm Partner */}
                  <h3 className="font-display uppercase text-base text-jb-dark tracking-tight leading-tight group-hover:text-jb-dark/80 transition-colors">
                    {src.item}
                  </h3>
                  
                  <p className="text-[10px] font-display uppercase tracking-wider text-spice-chilli mt-0.5 mb-1.5">
                    {src.farmer}
                  </p>

                  {/* Story Snippet */}
                  <p className="jb-body-text text-jb-dark text-[11px] line-clamp-2 leading-relaxed opacity-85">
                    {src.shortStory}
                  </p>
                </div>

                {/* Footer link to read full story */}
                <div className="pt-2 mt-3 border-t border-jb-dark/15 flex items-center justify-between text-[10px] font-display uppercase text-jb-dark">
                  <span className="flex items-center gap-1 text-[9px] text-jb-muted font-mono">
                    <SvgFarmSprout className="w-2.5 h-2.5 text-jb-dark" />
                    <span>100% Traceable</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-jb-dark group-hover:translate-x-1 transition-transform font-bold font-mono">
                    <span>Story</span>
                    <SvgArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Interactive Storytelling Modal / Deep Dive ── */}
        <AnimatePresence>
          {activeStory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jb-dark/60 backdrop-blur-sm animate-fade-in">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className="bg-jb-beige jb-texture border-3 border-jb-dark rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveStory(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full border border-jb-dark bg-transparent text-jb-dark hover:bg-jb-dark hover:text-white transition-colors z-20 flex items-center justify-center"
                  aria-label="Close story"
                >
                  <SvgCloseCross className="w-3.5 h-3.5 text-current" />
                </button>

                <div className="space-y-4">
                  {/* Chapter header */}
                  <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-jb-muted">
                    <span>Chapter {activeStory.num}</span>
                    <span>•</span>
                    <span className="text-jb-dark flex items-center gap-1 font-mono">
                      <SvgZeroMilePin className="w-3 h-3 text-jb-dark" />
                      {activeStory.region} ({activeStory.elevation})
                    </span>
                  </div>

                  {/* Cutout + Title Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                      <activeStory.Cutout className="w-full h-full" />
                    </div>
                    <div>
                      <h3 className="jb-small-title text-jb-dark uppercase leading-tight">
                        {activeStory.item}
                      </h3>
                      <p className="text-xs font-display uppercase tracking-wider text-spice-chilli mt-0.5">
                        Partner: {activeStory.farmer}
                      </p>
                    </div>
                  </div>

                  {/* Full Story text */}
                  <div className="p-4 bg-white/70 rounded-2xl border border-jb-dark/20 text-xs sm:text-sm jb-body-text text-jb-dark leading-relaxed space-y-2">
                    <p className="font-display uppercase text-xs tracking-wider text-jb-dark">
                      "{activeStory.headline}"
                    </p>
                    <p>{activeStory.fullStory}</p>
                  </div>

                  {/* Origin Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-jb-dark/20 text-xs font-display text-jb-dark uppercase">
                    <span className="flex items-center gap-1.5 font-mono">
                      <SvgSparkleStar className="w-3.5 h-3.5 text-yellow-600" />
                      {activeStory.badge}
                    </span>
                    <button
                      onClick={() => setActiveStory(null)}
                      className="px-4 py-2 rounded-full bg-jb-dark text-white text-[11px] font-display uppercase tracking-wider hover:opacity-90 transition-opacity"
                    >
                      Done Reading
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── Compact Clean Standard Bar ── */}
        <div className="mt-8 bg-jb-gray p-5 sm:p-6 rounded-2xl border-2 border-jb-dark flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-0.5">
            <h4 className="font-display text-base sm:text-lg text-jb-dark uppercase tracking-tight">
              The Bowl Bae Clean Standard
            </h4>
            <p className="jb-body-text text-jb-dark text-xs sm:text-sm">
              Zero refined white sugar, zero palm oil, zero chemical food colorings, and zero MSG.
            </p>
          </div>

          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-jb-dark text-xs font-display uppercase tracking-wider bg-transparent text-jb-dark">
              <SvgStampCheck className="w-3.5 h-3.5 text-jb-dark" />
              <span>Certified Clean</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
