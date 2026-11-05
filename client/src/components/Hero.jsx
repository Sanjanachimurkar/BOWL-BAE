import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { SvgSaladBowl, SvgSparkleStar, SvgArrowRight, SvgRefresh } from './TopicIllustrations';

/*
  ══════════════════════════════════════════════════════════════════════════
  MEET OUR SALAD — TOP-DOWN ARTISANAL BOWL ANIMATION
  Inspired by CooQ / Pinterest Motion Graphics (https://pin.it/5iniSbk6u)
  
  Sequence:
  1. Header & Organic backdrop blob appear
  2. Empty Top-Down Artisanal Bowl drops into center with realistic shadow
  3. 6 Fresh Salad Ingredients fly in simultaneously from all outer directions
     into their exact bowl quadrants:
       • Baby Spinach (top-left)
       • Living Greens (top-right)
       • English Cucumber (bottom-left)
       • Cherry Tomatoes (center-left)
       • Spiced Chickpeas (center)
       • Pickled Red Onion (bottom-right)
  4. Sizzle & Tadka Flash on landing — transition to rich assembled meal
  5. Playful curved pointer arrows animate out to ingredient annotations:
       • ↖ Cherry Tomatoes
       • ↗ Baby Spinach
       • ↘ Living Greens
       • ↙ English Cucumber
       • ↓ Spiced Chickpeas
  6. Bowl does a smooth 360° rotation presenting the finished dish
  7. "YOUR SUPER HEALTHY BOWL IS READY" celebration badge shines!
  ══════════════════════════════════════════════════════════════════════════
*/

// Distinct flying ingredient cutouts
const FLYING_VEGS = [
  {
    id: 'spinach',
    src: '/cutouts/spinach.webp',
    alt: 'Baby Spinach',
    startX: -850, startY: -450, startR: -190,
    targetX: -65, targetY: -75, targetR: -12, targetS: 0.95,
  },
  {
    id: 'cucumber',
    src: '/cutouts/cucumber.webp',
    alt: 'Cucumber',
    startX: -850, startY: 450, startR: 160,
    targetX: -80, targetY: 55, targetR: 18, targetS: 0.88,
  },
  {
    id: 'tomato',
    src: '/cutouts/tomato.webp',
    alt: 'Cherry Tomatoes',
    startX: 0, startY: -800, startR: -120,
    targetX: -60, targetY: 0, targetR: -8, targetS: 0.92,
  },
  {
    id: 'chickpea',
    src: '/cutouts/chickpea.webp',
    alt: 'Spiced Chickpeas',
    startX: 850, startY: -450, startR: 180,
    targetX: 5, targetY: 10, targetR: 12, targetS: 0.85,
  },
  {
    id: 'redonion',
    src: '/cutouts/redonion.webp',
    alt: 'Red Onion',
    startX: 850, startY: 450, startR: -170,
    targetX: 65, targetY: 60, targetR: 26, targetS: 0.82,
  },
  {
    id: 'greens',
    src: '/cutouts/chard.webp',
    alt: 'Living Greens',
    startX: 0, startY: 800, startR: 140,
    targetX: 65, targetY: -65, targetR: -22, targetS: 0.75,
  },
];

// Ingredient callouts with curved arrow vectors matching the Pinterest pin
const ANNOTATIONS = [
  {
    id: 'spinach',
    label: 'Baby Spinach',
    desc: 'Ozone-washed living leaves',
    // Top-left
    labelPosition: 'top-[8%] left-[2%] sm:left-[8%]',
    arrowPath: 'M 140 70 Q 70 30 15 20',
    arrowSvg: (
      <svg className="absolute -top-12 -left-16 w-32 h-24 pointer-events-none overflow-visible" viewBox="0 0 100 80">
        <motion.path
          d="M 85 75 Q 40 50 15 20"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.path
          d="M 85 75 L 72 70 M 85 75 L 80 62"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
      </svg>
    ),
  },
  {
    id: 'greens',
    label: 'Living Greens',
    desc: 'Crisp micro-greens & shoots',
    // Top-right
    labelPosition: 'top-[8%] right-[2%] sm:right-[8%]',
    arrowSvg: (
      <svg className="absolute -top-12 -right-16 w-32 h-24 pointer-events-none overflow-visible" viewBox="0 0 100 80">
        <motion.path
          d="M 15 75 Q 60 50 85 20"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.path
          d="M 15 75 L 28 70 M 15 75 L 20 62"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
      </svg>
    ),
  },
  {
    id: 'tomatoes',
    label: 'Cherry Tomatoes',
    desc: 'Sweet Solapur vine-ripened',
    // Center-left
    labelPosition: 'top-[42%] -left-[4%] sm:left-[3%]',
    arrowSvg: (
      <svg className="absolute top-2 -right-14 w-28 h-16 pointer-events-none overflow-visible" viewBox="0 0 80 40">
        <motion.path
          d="M 80 20 Q 40 10 0 20"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.path
          d="M 80 20 L 68 14 M 80 20 L 68 26"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
      </svg>
    ),
  },
  {
    id: 'sprouts',
    label: 'Spiced Chickpeas',
    desc: 'Wood-fired & sprouted grains',
    // Center-right
    labelPosition: 'top-[42%] -right-[4%] sm:right-[3%]',
    arrowSvg: (
      <svg className="absolute top-2 -left-14 w-28 h-16 pointer-events-none overflow-visible" viewBox="0 0 80 40">
        <motion.path
          d="M 0 20 Q 40 10 80 20"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.path
          d="M 0 20 L 12 14 M 0 20 L 12 26"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
      </svg>
    ),
  },
  {
    id: 'cucumber',
    label: 'English Cucumber',
    desc: 'Mandoline ribboned crisp',
    // Bottom-left
    labelPosition: 'bottom-[12%] left-[2%] sm:left-[8%]',
    arrowSvg: (
      <svg className="absolute -bottom-10 -left-14 w-32 h-24 pointer-events-none overflow-visible" viewBox="0 0 100 80">
        <motion.path
          d="M 85 10 Q 40 40 15 65"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.path
          d="M 85 10 L 72 14 M 85 10 L 80 22"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
      </svg>
    ),
  },
  {
    id: 'tadka',
    label: 'Crackling Tadka',
    desc: 'Mustard seeds, curry leaves & unrefined oil',
    // Bottom-right
    labelPosition: 'bottom-[12%] right-[2%] sm:right-[8%]',
    arrowSvg: (
      <svg className="absolute -bottom-10 -right-14 w-32 h-24 pointer-events-none overflow-visible" viewBox="0 0 100 80">
        <motion.path
          d="M 15 10 Q 60 40 85 65"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
        <motion.path
          d="M 15 10 L 28 14 M 15 10 L 20 22"
          fill="none"
          stroke="#292929"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
      </svg>
    ),
  },
];

export default function Hero({ onOrderClick }) {
  // animation phases: 'intro' -> 'flying' -> 'impact' -> 'assembled' -> 'spinning' -> 'ready'
  const [phase, setPhase] = useState('intro');
  const [animKey, setAnimKey] = useState(0);
  const bowlControls = useAnimation();

  const runAnimation = useCallback(async () => {
    // 0. Reset state
    setPhase('intro');
    await bowlControls.set({ rotate: 0, scale: 0.95, opacity: 1 });

    // 1. Bowl drops into center with spring bounce
    await bowlControls.start({
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    });

    // 2. Pause briefly so user sees empty artisanal bowl
    await new Promise((r) => setTimeout(r, 250));

    // 3. Vegetables fly in simultaneously from all sides
    setPhase('flying');
    await new Promise((r) => setTimeout(r, 750));

    // 4. Impact / Tadka sizzle flash
    setPhase('impact');
    await bowlControls.start({
      scale: [1, 1.06, 0.97, 1],
      transition: { duration: 0.35, ease: 'easeOut' },
    });

    // 5. Assembled state: switch to rich finished bowl, trigger curved arrows
    setPhase('assembled');
    await new Promise((r) => setTimeout(r, 800));

    // 6. Bowl does a smooth 360° presentation spin
    setPhase('spinning');
    await bowlControls.start({
      rotate: 360,
      transition: { duration: 1.1, ease: [0.34, 1.2, 0.64, 1] },
    });

    // 7. Ready celebration banner pops up!
    setPhase('ready');
  }, [bowlControls]);

  useEffect(() => {
    const timer = setTimeout(runAnimation, 80);
    return () => clearTimeout(timer);
  }, [animKey, runAnimation]);

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen bg-jb-green jb-texture overflow-hidden flex flex-col items-center justify-between pt-16 sm:pt-20 pb-6">
      
      {/* ── TOP HEADLINE: Matches Pinterest Reference ("Healthy & Easy! / MEET OUR SALAD") ── */}
      <div className="text-center z-10 px-6 max-w-3xl mx-auto space-y-1">
        <motion.span
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-display uppercase tracking-[0.25em] text-jb-dark/75 block"
        >
          Fresh • 100% Traceable • Tempered Live
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight text-jb-dark uppercase leading-[0.95]"
        >
          Meet Our Salad
        </motion.h1>
      </div>

      {/* ── CENTER STAGE: Organic Backdrop Shape + Top-Down Artisanal Bowl + Fly-in Vegetables + Curved Arrows ── */}
      <div className="relative w-full max-w-5xl mx-auto px-4 my-2 flex items-center justify-center min-h-[380px] sm:min-h-[440px] md:min-h-[480px]">
        
        {/* 1. Organic Fluid Backdrop Plate (Exact white organic blob shape from Pinterest pin) */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            className="w-[92%] sm:w-[85%] md:w-[78%] h-[92%] sm:h-[88%] bg-[#f8f6f0] border-2 border-jb-dark/20 shadow-[0_24px_60px_rgba(41,41,41,0.14)]"
            style={{
              borderRadius: '62% 48% 68% 42% / 46% 62% 48% 64%',
            }}
          />
        </motion.div>

        {/* 2. Central Bowl Container */}
        <div className="relative w-[280px] sm:w-[350px] md:w-[410px] aspect-square flex items-center justify-center z-10">
          
          {/* Sizzle/Impact Glow & Shockwave */}
          <AnimatePresence>
            {phase === 'impact' && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0.9 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full border-4 border-yellow-400 bg-yellow-200/40 pointer-events-none z-30"
              />
            )}
          </AnimatePresence>

          {/* TOP-DOWN BOWL (Clean 90° Overhead View) */}
          <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={bowlControls}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Show assembled bowl once impact lands; empty bowl during intro/flying */}
            {phase === 'intro' || phase === 'flying' ? (
              <img
                src="/cutouts/topdown-bowl-empty.webp"
                alt="Artisanal Earthenware Salad Bowl"
                width="480"
                height="480"
                fetchPriority="high"
                decoding="sync"
                className="w-full h-full object-contain drop-shadow-[0_25px_40px_rgba(41,41,41,0.32)] select-none pointer-events-none"
              />
            ) : (
              <motion.img
                key="assembled-bowl"
                src="/cutouts/topdown-salad-assembled.webp"
                alt="Fresh Assembled Bowl Bae Salad"
                width="480"
                height="480"
                fetchPriority="high"
                decoding="sync"
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-contain drop-shadow-[0_30px_50px_rgba(41,41,41,0.35)] select-none pointer-events-none"
              />
            )}
          </motion.div>

          {/* Flying Vegetables Layer (Visible during flight, converging into bowl) */}
          <AnimatePresence>
            {phase === 'flying' && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {FLYING_VEGS.map((veg) => (
                  <motion.img
                    key={veg.id}
                    src={veg.src}
                    alt={veg.alt}
                    width="80"
                    height="80"
                    decoding="async"
                    initial={{
                      x: veg.startX,
                      y: veg.startY,
                      rotate: veg.startR,
                      scale: 0.4,
                      opacity: 0,
                    }}
                    animate={{
                      x: veg.targetX,
                      y: veg.targetY,
                      rotate: veg.targetR,
                      scale: veg.targetS,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.95,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 sm:w-28 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)]"
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

        </div>

        {/* 3. Pinterest-Style Curved Arrows & Ingredient Callouts (Spring in after assembly) */}
        <AnimatePresence>
          {(phase === 'assembled' || phase === 'spinning' || phase === 'ready') && (
            <>
              {ANNOTATIONS.map((anno) => (
                <motion.div
                  key={anno.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className={`absolute z-20 pointer-events-auto flex flex-col ${anno.labelPosition}`}
                >
                  <div className="relative">
                    {/* Hand-drawn style animated arrow pointing to ingredient */}
                    {anno.arrowSvg}
                    
                    <span className="font-display text-xs sm:text-sm uppercase tracking-wider text-jb-dark block leading-none">
                      {anno.label}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-jb-muted font-medium hidden sm:block mt-0.5">
                      {anno.desc}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Bottom Dressing Callout (Exact match to Pinterest bottom tagline) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-center z-20 whitespace-nowrap"
              >
                <p className="text-xs sm:text-sm font-display text-jb-dark uppercase tracking-wider bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-jb-dark/15 shadow-sm">
                  with cold-pressed mustard oil, rock salt & sizzling crackled tadka.
                </p>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>

      {/* ── CELEBRATION BANNER & ACTION ROW ── */}
      <div className="z-10 text-center px-6 w-full max-w-xl mx-auto space-y-4">
        
        {/* "YOUR SUPER HEALTHY BOWL IS READY" */}
        <div className="h-10 flex items-center justify-center">
          <AnimatePresence>
            {phase === 'ready' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-jb-dark text-white shadow-xl"
              >
                <SvgSparkleStar className="w-4 h-4 text-yellow-300" />
                <span className="font-display text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <span>Your Super Healthy Bowl Is Ready</span>
                  <SvgSaladBowl className="w-4 h-4 text-white inline-block" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOrderClick}
            className="px-8 py-3.5 rounded-full bg-jb-dark text-white hover:bg-jb-dark/90 font-display text-xs uppercase tracking-widest transition-transform hover:scale-[1.03] shadow-md flex items-center gap-2"
          >
            <span>Order This Bowl</span>
            <SvgArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setAnimKey((k) => k + 1)}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-jb-dark bg-transparent hover:bg-jb-dark hover:text-white transition-colors text-xs font-display uppercase tracking-wider text-jb-dark"
          >
            <SvgRefresh className="w-3.5 h-3.5" />
            <span>Toss Again</span>
          </button>

          <a
            href="#story"
            className="jb-link text-xs sm:text-sm text-jb-dark py-1"
          >
            Our Story ↓
          </a>
        </div>

      </div>

    </section>
  );
}
