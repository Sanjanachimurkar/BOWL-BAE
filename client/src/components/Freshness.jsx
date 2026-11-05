import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SvgSparkleStar, SvgStampCheck } from './TopicIllustrations';

/*
  ══════════════════════════════════════════════════════════════════════════
  STICKY SCROLL-GATHERING ANIMATION (Exact Match to JuiceBot Video)
  
  As user scrolls through this section:
  1. The central bowl & stopwatch are pinned sticky in view.
  2. The text on the left smoothly transitions from:
     "4 Hours vs. 40 Days" -> "Enter: The Modern Indian Bowl"
  3. Cutout ingredients physically fly across the screen and gather
     around the bowl from all directions:
       • Sliced heirloom tomato flies in from the left
       • Crisp cucumber round floats in from the right
       • Baby spinach leaf rises from bottom-left
       • Golden roasted chickpeas rise from bottom-center
       • Purple onion ring floats from bottom-right
  4. Moving the scroll wheel moves the vegetables in direct real-time!
  ══════════════════════════════════════════════════════════════════════════
*/

export default function Freshness() {
  const [selectedIngredient, setSelectedIngredient] = useState(0);
  const scrollSectionRef = useRef(null);

  // Track scroll through the sticky container (200vh height)
  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ['start start', 'end end'],
  });

  // ── Cutouts Gathering Parallax Transforms (Exact JuiceBot Video 00:00 - 00:07) ──
  // 1. Tomato (flies in from far left, like the strawberry in the video)
  const tomatoX = useTransform(scrollYProgress, [0.05, 0.65], [-420, -110]);
  const tomatoY = useTransform(scrollYProgress, [0.05, 0.65], [120, -10]);
  const tomatoRotate = useTransform(scrollYProgress, [0.05, 0.65], [-60, -12]);
  const tomatoOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);

  // 2. Cucumber (flies in from far right, like the almond in the video)
  const cucumberX = useTransform(scrollYProgress, [0.08, 0.68], [420, 120]);
  const cucumberY = useTransform(scrollYProgress, [0.08, 0.68], [140, 20]);
  const cucumberRotate = useTransform(scrollYProgress, [0.08, 0.68], [55, 18]);
  const cucumberOpacity = useTransform(scrollYProgress, [0.08, 0.28], [0, 1]);

  // 3. Spinach (flies up from bottom-left, like the cashew in the video)
  const spinachX = useTransform(scrollYProgress, [0.12, 0.72], [-280, -75]);
  const spinachY = useTransform(scrollYProgress, [0.12, 0.72], [380, 105]);
  const spinachRotate = useTransform(scrollYProgress, [0.12, 0.72], [-45, 10]);
  const spinachOpacity = useTransform(scrollYProgress, [0.12, 0.32], [0, 1]);

  // 4. Chickpeas (flies up from bottom-right, like the coconut in the video)
  const chickpeaX = useTransform(scrollYProgress, [0.15, 0.75], [260, 65]);
  const chickpeaY = useTransform(scrollYProgress, [0.15, 0.75], [380, 110]);
  const chickpeaRotate = useTransform(scrollYProgress, [0.15, 0.75], [40, -15]);
  const chickpeaOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);

  // 5. Carrot ribbon (floats in from top-right)
  const carrotX = useTransform(scrollYProgress, [0.1, 0.7], [320, 85]);
  const carrotY = useTransform(scrollYProgress, [0.1, 0.7], [-220, -80]);
  const carrotRotate = useTransform(scrollYProgress, [0.1, 0.7], [35, -22]);
  const carrotOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // Text transitions on scroll: Phase 1 fades out, Phase 2 fades in
  const textPhase1Opacity = useTransform(scrollYProgress, [0.35, 0.55], [1, 0]);
  const textPhase1Y = useTransform(scrollYProgress, [0.35, 0.55], [0, -30]);

  const textPhase2Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const textPhase2Y = useTransform(scrollYProgress, [0.45, 0.65], [30, 0]);

  // Bowl subtle 3D scale on gathering completion
  const bowlScale = useTransform(scrollYProgress, [0.55, 0.75], [0.94, 1.03]);

  // Ingredients for the inspector below
  const ingredients = [
    {
      name: 'English Cucumber',
      origin: 'Talegaon Hydroponic Farm',
      prep: 'Mandoline ribboned every 2 hours to avoid cell leakage and preserve mineral crispness.',
      cutout: '/cutouts/cucumber.webp',
    },
    {
      name: 'Farm Beetroot & Greens',
      origin: 'Ooty Organic Terraces',
      prep: 'Slow-roasted with cracked cumin and cold-pressed mustard oil. Naturally sweet, zero sugar.',
      cutout: '/cutouts/chard.webp',
    },
    {
      name: 'Fresh Baby Spinach',
      origin: 'Nashik Valley Living Greens',
      prep: 'Morning harvested, washed in ozone-filtered water, crisp and rich in iron and folates.',
      cutout: '/cutouts/spinach.webp',
    },
    {
      name: 'Farm Carrots',
      origin: 'Manchar Organic Belt',
      prep: 'Knife-peeled and cut into crisp ribbons every morning to preserve natural sweetness and crunch.',
      cutout: '/cutouts/carrot.webp',
    },
    {
      name: 'Vine-Ripened Tomato',
      origin: 'Solapur Organic Farms',
      prep: 'Thick hand-sliced heirloom tomatoes salted lightly with pink Himalayan crystal salt.',
      cutout: '/cutouts/tomato.webp',
    },
  ];

  return (
    <section id="freshness" className="bg-jb-red jb-texture relative">
      
      {/* ── STICKY PINNED SCROLL CONTAINER (Exact JuiceBot Video 00:00 - 00:07) ── */}
      <div ref={scrollSectionRef} className="relative h-[220vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-12">
          
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Column: Crossfading Story Manifesto */}
            <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[320px] flex items-center">
              
              {/* Phase 1 Text: "4 Hours vs. 40 Days" */}
              <motion.div
                style={{ opacity: textPhase1Opacity, y: textPhase1Y }}
                className="absolute inset-0 flex flex-col justify-center space-y-4 pointer-events-none"
              >
                <span className="text-xs font-display uppercase tracking-widest text-jb-dark/70 block">
                  The Freshness Rule
                </span>
                <h2 className="jb-section-title text-jb-dark uppercase leading-[0.95]">
                  4 Hours vs.<br />40 Days
                </h2>
                <div className="space-y-3 jb-body-text text-jb-dark text-sm sm:text-base leading-relaxed max-w-lg">
                  <p className="font-display text-lg uppercase text-jb-dark">
                    Chopped today. Devoured today.
                  </p>
                  <p>
                    The second fresh vegetables are sliced, natural oxidation begins. You have a tight 4-hour window to enjoy living vitamins, active enzymes, and crunch.
                  </p>
                  <p className="text-xs text-jb-dark/75">
                    Supermarket salads use preservative gases stretching shelf life to 40+ days. Scroll down to see our fresh gathering micro-batch. ↓
                  </p>
                </div>
              </motion.div>

              {/* Phase 2 Text: "Enter: The Modern Indian Bowl" */}
              <motion.div
                style={{ opacity: textPhase2Opacity, y: textPhase2Y }}
                className="absolute inset-0 flex flex-col justify-center space-y-4 pointer-events-auto"
              >
                <span className="text-xs font-display uppercase tracking-widest text-jb-dark/70 block">
                  Our Micro-Batch Standard
                </span>
                <h2 className="jb-section-title text-jb-dark uppercase leading-[0.95]">
                  Enter:<br />The Modern<br />Indian Bowl
                </h2>
                <div className="space-y-3 jb-body-text text-jb-dark text-sm sm:text-base leading-relaxed max-w-lg">
                  <p>
                    Every bowl from Bowl Bae is prepped within 4 hours of your order.
                  </p>
                  <p>
                    <strong className="font-display font-normal">The Secret:</strong> We never mass-shred. Knife-sliced in micro-cycles, living produce chilled, and tempered with sizzling unrefined oil right when ordered.
                  </p>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-jb-dark text-white text-[11px] font-display uppercase tracking-wider shadow-sm">
                      <SvgSparkleStar className="w-3.5 h-3.5 text-yellow-300" />
                      Freshness Gathered Live
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Centered Bowl with Stopwatch Outline & CUTOUTS GATHERING ON SCROLL */}
            <div className="lg:col-span-6 flex justify-center items-center relative">
              
              <div className="relative w-[300px] sm:w-[380px] md:w-[420px] aspect-square flex items-center justify-center">

                {/* Minimal Stopwatch Outline Ring (JuiceBot Motif) */}
                <div className="absolute inset-0 rounded-full border-2 border-jb-dark/30 flex items-center justify-center pointer-events-none">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-3.5 border-2 border-jb-dark/40 rounded-t-sm" />
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-2.5 h-2 bg-jb-dark/40 rounded-t-full" />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-display uppercase tracking-widest text-jb-dark/60">
                    4h Timer
                  </div>
                </div>

                {/* Central Salad Bowl */}
                <motion.div
                  style={{ scale: bowlScale }}
                  className="relative w-[76%] aspect-square flex items-center justify-center z-10"
                >
                  <img
                    src="/cutouts/topdown-salad-assembled.webp"
                    alt="Fresh 4-Hour Salad Bowl"
                    loading="lazy"
                    decoding="async"
                    width="480"
                    height="480"
                    className="w-full h-full object-contain drop-shadow-[0_25px_45px_rgba(41,41,41,0.32)] select-none pointer-events-none"
                  />
                </motion.div>

                {/* ── SCROLL-DRIVEN GATHERING CUTOUTS (Direct Real-time Scroll Response) ── */}
                
                {/* 1. Tomato (Flies from Left like Strawberry in video) */}
                <motion.img
                  src="/cutouts/tomato.webp"
                  alt="Heirloom Tomato"
                  loading="lazy"
                  decoding="async"
                  width="104"
                  height="104"
                  style={{
                    x: tomatoX,
                    y: tomatoY,
                    rotate: tomatoRotate,
                    opacity: tomatoOpacity,
                  }}
                  className="absolute w-20 sm:w-26 object-contain drop-shadow-xl z-20 pointer-events-none select-none"
                />

                {/* 2. Cucumber (Flies from Right like Almond in video) */}
                <motion.img
                  src="/cutouts/cucumber.webp"
                  alt="Crisp Cucumber"
                  loading="lazy"
                  decoding="async"
                  width="112"
                  height="112"
                  style={{
                    x: cucumberX,
                    y: cucumberY,
                    rotate: cucumberRotate,
                    opacity: cucumberOpacity,
                  }}
                  className="absolute w-22 sm:w-28 object-contain drop-shadow-xl z-20 pointer-events-none select-none"
                />

                {/* 3. Baby Spinach (Rises from Bottom-Left like Cashew in video) */}
                <motion.img
                  src="/cutouts/spinach.webp"
                  alt="Baby Spinach"
                  loading="lazy"
                  decoding="async"
                  width="112"
                  height="112"
                  style={{
                    x: spinachX,
                    y: spinachY,
                    rotate: spinachRotate,
                    opacity: spinachOpacity,
                  }}
                  className="absolute w-22 sm:w-28 object-contain drop-shadow-xl z-20 pointer-events-none select-none"
                />

                {/* 4. Spiced Chickpeas (Rises from Bottom-Right like Coconut in video) */}
                <motion.img
                  src="/cutouts/chickpea.webp"
                  alt="Roasted Chickpeas"
                  loading="lazy"
                  decoding="async"
                  width="96"
                  height="96"
                  style={{
                    x: chickpeaX,
                    y: chickpeaY,
                    rotate: chickpeaRotate,
                    opacity: chickpeaOpacity,
                  }}
                  className="absolute w-20 sm:w-24 object-contain drop-shadow-xl z-20 pointer-events-none select-none"
                />

                {/* 5. Carrot Ribbon (Floats in from Top-Right) */}
                <motion.img
                  src="/cutouts/carrot.webp"
                  alt="Farm Carrot Ribbon"
                  loading="lazy"
                  decoding="async"
                  width="88"
                  height="88"
                  style={{
                    x: carrotX,
                    y: carrotY,
                    rotate: carrotRotate,
                    opacity: carrotOpacity,
                  }}
                  className="absolute w-18 sm:w-22 object-contain drop-shadow-xl z-20 pointer-events-none select-none"
                />

                {/* Live Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-jb-dark text-white text-[10px] font-display uppercase tracking-widest shadow-md z-30 whitespace-nowrap">
                  <span className="text-yellow-300">⏱️</span>
                  <span>Scroll Gathers Fresh Veggies</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ── PRODUCE INSPECTOR (Positioned after the scroll gathering experience) ── */}
      <div className="py-10 sm:py-12 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 border-t border-jb-dark/15">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-display uppercase tracking-widest text-jb-dark block">
              Field Traceability
            </span>
            <h3 className="font-display uppercase text-xl text-jb-dark tracking-tight">
              Inspect Fresh Produce
            </h3>
          </div>
          <span className="text-[11px] font-display text-jb-dark uppercase tracking-wider flex items-center gap-1.5 bg-white/70 px-2.5 py-1 rounded-full border border-jb-dark/20">
            <SvgStampCheck className="w-3.5 h-3.5 text-jb-dark" />
            100% Traceable
          </span>
        </div>

        {/* Selector pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {ingredients.map((ing, idx) => (
            <button
              key={ing.name}
              onClick={() => setSelectedIngredient(idx)}
              className={`px-3 py-1 rounded-full text-[11px] font-display uppercase tracking-wider border border-jb-dark transition-all ${
                selectedIngredient === idx
                  ? 'bg-jb-dark text-white shadow-sm'
                  : 'bg-transparent text-jb-dark hover:bg-jb-dark/10'
              }`}
            >
              {ing.name}
            </button>
          ))}
        </div>

        {/* Selected produce card (Compact & Small) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white/70 p-4 sm:p-5 rounded-2xl border-2 border-jb-dark">
          <div className="md:col-span-4 flex justify-center items-center">
            <motion.div
              key={ingredients[selectedIngredient].name}
              initial={{ opacity: 0, scale: 0.88, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <img
                src={ingredients[selectedIngredient].cutout}
                alt={ingredients[selectedIngredient].name}
                loading="lazy"
                decoding="async"
                width="144"
                height="144"
                className="w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-md hover:scale-105 transition-transform duration-200"
              />
            </motion.div>
          </div>

          <div className="md:col-span-8 space-y-1.5">
            <span className="text-[10px] font-display uppercase tracking-widest text-jb-dark block">
              Harvest Origin: {ingredients[selectedIngredient].origin}
            </span>
            <h4 className="font-display uppercase text-xl sm:text-2xl text-jb-dark tracking-tight">
              {ingredients[selectedIngredient].name}
            </h4>
            <p className="jb-body-text text-jb-dark text-xs sm:text-sm leading-relaxed max-w-lg opacity-90">
              {ingredients[selectedIngredient].prep}
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
