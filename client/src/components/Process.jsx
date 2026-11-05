import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DeliveryTruckCutout } from './Cutouts';
import { SvgFarmSprout, SvgKnifeChop, SvgNagpurEV, SvgTadkaPan } from './TopicIllustrations';

export default function Process() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Global parallax floating elements across the Journey
  const driftY1 = useTransform(scrollYProgress, [0, 1], [-60, 140]);
  const driftY2 = useTransform(scrollYProgress, [0, 1], [100, -120]);
  const driftRotate1 = useTransform(scrollYProgress, [0, 1], [-25, 30]);
  const driftRotate2 = useTransform(scrollYProgress, [0, 1], [35, -20]);

  const journeySteps = [
    {
      num: '01',
      title: '100% Organic Farms',
      tagline: 'Native Soil & Seed Savers',
      desc: 'We make sure that everything from the soil regeneration to harvest keeps the vegetables, millets, and pulses in their truest form. From Satara’s grass-fed Gir cow dairies to Haveri’s native rainfed grains.',
      image: '/cutouts/avokale.webp',
      floatingCutout: '/cutouts/spinach.webp',
      floatingPosition: 'top-2 -left-8 sm:-left-12',
      SvgComponent: SvgFarmSprout,
    },
    {
      num: '02',
      title: 'Knife-Cut Kitchen',
      tagline: 'Hand Sliced, Never Shredded',
      desc: 'Once organic produce arrives at our central kitchen, we wash in ozone-filtered water, inspect, and slice using hand knife-cuts. Industrial shredders tear cell walls and create soggy water-pools; our Japanese steel keeps every ribbon crisp.',
      image: '/cutouts/cucumber.webp',
      floatingCutout: '/cutouts/carrot.webp',
      floatingPosition: '-bottom-6 -right-6 sm:-right-10',
      SvgComponent: SvgKnifeChop,
    },
    {
      num: '03',
      title: 'Cold Micro-Dispatch',
      tagline: 'Chilled Electric Delivery Fleet',
      desc: 'Every 3 to 4 hours fresh micro-batches travel in temperature-regulated electric dispatch vans so the crispest greens are immediately ready when you order.',
      isSvg: true,
      floatingCutout: '/cutouts/chickpea.webp',
      floatingPosition: '-top-6 -right-6 sm:-right-8',
      SvgComponent: SvgNagpurEV,
    },
    {
      num: '04',
      title: 'The Sizzling Tadka',
      tagline: 'Cast-Iron Ladle Tempering',
      desc: 'The finale is live. When your order dings, cold greens meet warm grains, and we flash a sizzling cast-iron ladle of crackled mustard seeds, curry leaves, and unrefined oil over the top.',
      image: '/cutouts/minthoney.webp',
      floatingCutout: '/cutouts/tomato.webp',
      floatingPosition: '-bottom-8 -left-8 sm:-left-12',
      SvgComponent: SvgTadkaPan,
    },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-jb-gray jb-texture overflow-hidden"
    >
      {/* ── Background Parallax Floating Veggies (Drift gently as you scroll, JuiceBot style) ── */}
      <motion.img
        src="/cutouts/carrot.webp"
        alt="Floating Carrot"
        loading="lazy"
        decoding="async"
        width="128"
        height="128"
        style={{ y: driftY1, rotate: driftRotate1 }}
        className="absolute top-24 right-8 sm:right-16 w-24 sm:w-32 opacity-75 pointer-events-none drop-shadow-xl z-10"
      />
      <motion.img
        src="/cutouts/cucumber.webp"
        alt="Floating Cucumber"
        loading="lazy"
        decoding="async"
        width="144"
        height="144"
        style={{ y: driftY2, rotate: driftRotate2 }}
        className="absolute top-[48%] -left-8 sm:left-4 w-28 sm:w-36 opacity-70 pointer-events-none drop-shadow-xl z-10"
      />
      <motion.img
        src="/cutouts/tomato.webp"
        alt="Floating Tomato"
        loading="lazy"
        decoding="async"
        width="144"
        height="144"
        style={{ y: driftY1, rotate: driftRotate2 }}
        className="absolute bottom-40 right-4 sm:right-12 w-28 sm:w-36 opacity-75 pointer-events-none drop-shadow-xl z-10"
      />

      {/* ── Section Header ── */}
      <div className="pt-14 sm:pt-16 pb-8 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-20">
        
        {/* Floating Carrot Cutout Header Anchor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-4 sm:mb-6"
        >
          <img
            src="/cutouts/carrot.webp"
            alt="Fresh Sliced Farm Carrot"
            loading="lazy"
            decoding="async"
            width="96"
            height="96"
            className="w-20 sm:w-24 drop-shadow-[0_14px_22px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-6">
            <h2 className="jb-section-title text-jb-dark leading-[0.95]">
              The Salad<br />Journey
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="jb-body-text text-jb-dark text-lg sm:text-2xl leading-relaxed">
              We believe organic is a need-to-have not a nice-to-have-sometimes sort of thing.
            </p>
          </div>
        </div>

      </div>

      {/* ── Alternating Journey Steps with Scroll-Triggered Parallax Floating Cutouts ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-20">
        {journeySteps.map((step, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Text column */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl sm:text-4xl text-jb-dark">
                    {step.num}
                  </span>
                  <div className="w-8 h-[2px] bg-jb-dark"></div>
                  {step.SvgComponent && (
                    <step.SvgComponent className="w-5 h-5 text-jb-dark flex-shrink-0" />
                  )}
                  <span className="text-xs uppercase font-display tracking-widest text-jb-muted ml-1">
                    {step.tagline}
                  </span>
                </div>

                <h3 className="jb-medium-title text-jb-dark uppercase tracking-tight">
                  {step.title}
                </h3>

                <p className="jb-body-text text-jb-dark max-w-xl text-base sm:text-lg leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Cutout Visual column with floating companions (Exactly like JuiceBot video!) */}
              <div className={`lg:col-span-6 flex justify-center items-center relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                
                <div className="relative flex items-center justify-center">

                  {/* Main Product/Ingredient Cutout */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    {step.isSvg ? (
                      <DeliveryTruckCutout className="w-60 h-60 sm:w-72 sm:h-72 mx-auto drop-shadow-xl" />
                    ) : (
                      <img
                        src={step.image}
                        alt={step.title}
                        loading="lazy"
                        decoding="async"
                        width="320"
                        height="320"
                        className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain drop-shadow-[0_22px_38px_rgba(0,0,0,0.24)] mx-auto"
                      />
                    )}
                  </motion.div>

                  {/* Floating Companion Cutout that glides into position on scroll */}
                  {step.floatingCutout && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute z-20 pointer-events-none ${step.floatingPosition}`}
                    >
                      <motion.img
                        src={step.floatingCutout}
                        alt="Floating Ingredient"
                        loading="lazy"
                        decoding="async"
                        width="112"
                        height="112"
                        className="w-20 sm:w-28 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.26)]"
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, 4, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: idx * 0.5,
                        }}
                      />
                    </motion.div>
                  )}

                </div>

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Bottom Corner Cucumber Slice Anchor ── */}
      <img
        src="/cutouts/cucumber.webp"
        alt="Fresh Cucumber Cutout"
        loading="lazy"
        decoding="async"
        width="192"
        height="192"
        className="absolute -bottom-10 -left-10 w-36 sm:w-48 opacity-80 pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)] -rotate-12"
      />

      {/* ── Section 5 Punchline: "Farm. Chop. Tadka. Bowl." ── */}
      <div className="py-14 sm:py-18 text-center bg-jb-gray jb-texture relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto px-6"
        >
          <span className="text-xs uppercase font-display tracking-widest text-jb-dark block mb-4">
            The Bowl Bae Promise
          </span>
          <h2 className="jb-hero-title text-jb-dark uppercase leading-[0.92]">
            Farm. Chop.<br />
            Tadka. Bowl.
          </h2>
        </motion.div>
      </div>

    </section>
  );
}
