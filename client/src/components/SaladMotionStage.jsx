import React, { useState, useEffect } from 'react';
import { SvgRefresh, SvgSparkleStar } from './TopicIllustrations';

export default function SaladMotionStage({ onOrderClick }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isTossing, setIsTossing] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const steps = [
    {
      num: '01',
      tag: 'The Living Base',
      title: 'Tender Baby Spinach & Crisp Cucumbers',
      desc: 'Morning-picked living greens and thin mandoline English cucumber ribbons, crisp and cold.',
      vegetables: [
        {
          name: 'Baby Spinach',
          src: '/cutouts/spinach.webp',
          alt: 'Crisp baby spinach leaf',
          // Position when inside the bowl
          bowlStyle: 'top-[22%] left-[28%] w-24 sm:w-32 rotate-[-12deg]',
          dropDelay: '0ms',
        },
        {
          name: 'English Cucumber',
          src: '/cutouts/cucumber.webp',
          alt: 'Sliced cucumber round',
          bowlStyle: 'top-[35%] right-[26%] w-20 sm:w-28 rotate-[18deg]',
          dropDelay: '150ms',
        },
      ],
    },
    {
      num: '02',
      tag: 'The Farm Crunch',
      title: 'Heirloom Tomato & Sweet Carrot Ribbons',
      desc: 'Juicy ripe vine tomatoes with natural sweetness and thin sweet winter carrots sliced by hand.',
      vegetables: [
        {
          name: 'Ripe Tomato',
          src: '/cutouts/tomato.webp',
          alt: 'Sliced red tomato',
          bowlStyle: 'top-[28%] left-[42%] w-24 sm:w-32 rotate-[-6deg]',
          dropDelay: '0ms',
        },
        {
          name: 'Sweet Carrot',
          src: '/cutouts/carrot.webp',
          alt: 'Sliced farm carrot',
          bowlStyle: 'top-[42%] left-[22%] w-20 sm:w-28 rotate-[-25deg]',
          dropDelay: '150ms',
        },
      ],
    },
    {
      num: '03',
      tag: 'The Native Protein',
      title: 'Pickled Red Onions & Roasted Chickpeas',
      desc: 'Crunchy golden tandoori-roasted chickpeas and quick-pickled purple shallots with cumin.',
      vegetables: [
        {
          name: 'Red Onion Rings',
          src: '/cutouts/redonion.webp',
          alt: 'Sliced red onion rings',
          bowlStyle: 'top-[20%] right-[32%] w-24 sm:w-32 rotate-[22deg]',
          dropDelay: '0ms',
        },
        {
          name: 'Spiced Chickpeas',
          src: '/cutouts/chickpea.webp',
          alt: 'Golden roasted chickpeas',
          bowlStyle: 'top-[46%] right-[36%] w-22 sm:w-30 rotate-[8deg]',
          dropDelay: '150ms',
        },
      ],
    },
    {
      num: '04',
      tag: 'The Crackling Tadka',
      title: 'Farm Beetroot, Herbs & Sizzling Tadka',
      desc: 'Deep purple roasted beet greens and fresh mint, tempered with sputtering black mustard and curry leaves in warm cold-pressed oil.',
      vegetables: [
        {
          name: 'Roasted Beet Greens',
          src: '/cutouts/chard.webp',
          alt: 'Beetroot stalks and leaves',
          bowlStyle: 'top-[10%] right-[18%] w-28 sm:w-40 rotate-[15deg]',
          dropDelay: '0ms',
        },
        {
          name: 'Fresh Mint & Herbs',
          src: '/cutouts/minthoney.webp',
          alt: 'Fresh aromatic mint sprig',
          bowlStyle: 'top-[36%] left-[36%] w-20 sm:w-26 rotate-[-14deg]',
          dropDelay: '150ms',
        },
      ],
    },
  ];

  // Auto progression that cycles the steps
  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [autoPlay, steps.length]);

  const handleToss = () => {
    setIsTossing(true);
    setAutoPlay(false);
    setTimeout(() => {
      setIsTossing(false);
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 600);
  };

  const current = steps[activeStep];

  // All vegetables accumulated up to current step
  const accumulatedVegetables = steps
    .slice(0, activeStep + 1)
    .flatMap((s, sIdx) =>
      s.vegetables.map((v) => ({ ...v, isCurrent: sIdx === activeStep }))
    );

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Kinetic Text that Slides UP */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Step indicator pills */}
          <div className="flex items-center gap-2">
            {steps.map((s, idx) => (
              <button
                key={s.num}
                onClick={() => {
                  setActiveStep(idx);
                  setAutoPlay(false);
                }}
                className={`text-[11px] font-display uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                  activeStep === idx
                    ? 'bg-jb-dark text-white border-jb-dark shadow-sm'
                    : 'bg-transparent text-jb-dark border-jb-dark/30 hover:border-jb-dark'
                }`}
              >
                {s.num} {s.tag.replace('The ', '')}
              </button>
            ))}
          </div>

          {/* Kinetic Text container with upward sliding keyframe animation */}
          <div key={activeStep} className="animate-text-up space-y-4 min-h-[170px] sm:min-h-[190px]">
            <div className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-jb-dark/70">
              <span className="w-6 h-[1.5px] bg-jb-dark/60 inline-block"></span>
              <span>Step {current.num} • {current.tag}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-jb-dark uppercase leading-tight">
              {current.title}
            </h3>

            <p className="jb-body-text text-jb-dark text-base sm:text-lg max-w-md leading-relaxed">
              {current.desc}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleToss}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-jb-dark bg-transparent hover:bg-jb-dark hover:text-white transition-colors text-xs font-display uppercase tracking-wider text-jb-dark"
              title="Toss next salad ingredients into bowl"
            >
              <SvgRefresh className={`w-3.5 h-3.5 flex-shrink-0 ${isTossing ? 'animate-spin' : ''}`} />
              <span>Toss Next Layer ({activeStep + 1}/4)</span>
            </button>

            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="text-xs font-display uppercase tracking-wider text-jb-dark/70 hover:text-jb-dark jb-link"
            >
              {autoPlay ? 'Pause Auto-Toss' : 'Resume Motion'}
            </button>
          </div>

        </div>

        {/* Right Column: Artisanal Salad Bowl with Falling Vegetable Cutouts */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          
          <div className={`relative w-[340px] sm:w-[460px] md:w-[520px] h-[340px] sm:h-[460px] md:h-[500px] flex items-center justify-center transition-transform duration-300 ${isTossing ? 'scale-95 rotate-3' : 'scale-100'}`}>
            
            {/* The Artisanal Ceramic Salad Bowl */}
            <img
              src="/cutouts/salad-bowl.webp"
              alt="Artisanal Handcrafted Ceramic Salad Bowl"
              loading="lazy"
              decoding="async"
              width="480"
              height="480"
              className="absolute bottom-4 w-[92%] max-w-[480px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.22)] select-none pointer-events-none"
            />

            {/* Cutouts Dropping and Settling Inside the Bowl */}
            <div className="absolute inset-0 pointer-events-none">
              {accumulatedVegetables.map((veg) => (
                <img
                  key={veg.name}
                  src={veg.src}
                  alt={veg.alt}
                  loading="lazy"
                  decoding="async"
                  width="160"
                  height="160"
                  style={{ animationDelay: veg.isCurrent ? veg.dropDelay : '0ms' }}
                  className={`absolute object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.25)] select-none transition-all duration-500 ${veg.bowlStyle} ${
                    veg.isCurrent ? 'animate-drop-bowl' : 'animate-float-slow'
                  } ${isTossing ? 'scale-110 -translate-y-4' : ''}`}
                />
              ))}
            </div>

            {/* Sizzle Steam / Sparkle Indicator for Step 4 */}
            {activeStep === 3 && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-jb-dark text-white text-[11px] font-display uppercase tracking-wider animate-bounce shadow-md">
                <SvgSparkleStar className="w-3 h-3 text-yellow-300 flex-shrink-0" />
                <span>Tadka Crackling Live</span>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
