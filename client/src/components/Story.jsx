import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SvgArrowRight } from './TopicIllustrations';

export default function Story() {
  const storyRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start end', 'end start'],
  });

  const cucumberY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -50]);
  const cucumberRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-25, 0, 20]);
  const spinachFloat = useTransform(scrollYProgress, [0, 1], [-40, 50]);

  return (
    <section
      id="story"
      ref={storyRef}
      className="relative py-16 sm:py-20 bg-jb-beige jb-texture overflow-hidden"
    >
      {/* Top Left Baby Spinach Leaf with Parallax Float */}
      <motion.img
        src="/cutouts/spinach.webp"
        alt="Fresh Baby Spinach"
        loading="lazy"
        decoding="async"
        width="160"
        height="160"
        style={{ y: spinachFloat }}
        className="absolute -top-6 -left-6 w-32 sm:w-40 opacity-90 pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)] -rotate-12 select-none"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Concentric Circle Line Art with Animated Perched Cucumber Slice */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative flex items-center justify-center">
              
              {/* Outer circle with thin 1.5px border */}
              <motion.div
                initial={{ scale: 0.88, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-56 h-56 sm:w-72 sm:h-72 md:w-[320px] md:h-[320px] rounded-full border-[1.5px] border-jb-dark flex items-center justify-center relative shadow-sm"
              >
                {/* Inner concentric circle */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="w-36 h-36 sm:w-48 sm:h-48 md:w-[210px] md:h-[210px] rounded-full border-[1.5px] border-jb-dark"
                />

                {/* Crisp English Cucumber Slice Cutout perched on lower-left circle quadrant with Scroll-Driven Parallax Float */}
                <motion.img
                  src="/cutouts/cucumber.webp"
                  alt="Organic English Cucumber Slice"
                  loading="lazy"
                  decoding="async"
                  width="176"
                  height="176"
                  style={{ y: cucumberY, rotate: cucumberRotate }}
                  className="absolute -left-6 sm:-left-8 bottom-6 sm:bottom-8 w-32 sm:w-40 md:w-44 drop-shadow-[15px_15px_25px_rgba(0,0,0,0.28)] select-none hover:scale-105 transition-transform duration-300 pointer-events-auto cursor-pointer"
                />
              </motion.div>

            </div>
          </div>

          {/* Right Column: Editorial Headline & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4 max-w-xl"
          >
            <div>
              <span className="text-xs font-display uppercase tracking-widest text-jb-dark/65 block mb-1">
                The Narrative
              </span>
              <h2 className="jb-section-title text-jb-dark">
                The S Word
              </h2>
            </div>

            <div className="space-y-3.5 jb-body-text text-jb-dark text-base sm:text-lg leading-relaxed">
              <p>
                Salad: A word that gets a lot of flack and sometimes a confusing reputation.
              </p>

              <p>
                At Bowl Bae our goal is to make freshly made, truly vibrant Indian salad bowls and chaats as accessible and easy to find as street food.
              </p>

              <p>
                No cold iceberg leaves drenched in industrial mayonnaise. We temper crackling mustard, fresh curry leaves, and cold-pressed oils in cast-iron ladles right over fresh living produce to unlock deep Ayurvedic aromatics and crisp texture.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <a
                href="#freshness"
                className="jb-link text-sm sm:text-base text-jb-dark flex items-center gap-2"
              >
                <span>Read The 4-Hour Freshness Rule</span>
                <SvgArrowRight className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
