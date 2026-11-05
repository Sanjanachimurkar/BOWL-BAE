import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SvgArrowLeft,
  SvgArrowRight,
  SvgCloseCross,
  SvgTadkaPan,
  SvgChefNote,
  SvgSparkleStar
} from './TopicIllustrations';

export default function RecipesPage({ onBackHome, onOrderClick }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeRecipeModal, setActiveRecipeModal] = useState(null);

  const categories = [
    { id: 'all', label: 'All Recipes' },
    { id: 'protein', label: 'High Protein' },
    { id: 'quick', label: 'Under 10 Mins' },
    { id: 'chaat', label: 'Street-Food Chaats' },
    { id: 'tadka', label: 'Tadka Secrets' },
  ];

  const recipes = [
    {
      id: 'tandoori-chickpea',
      num: '01',
      category: 'protein',
      title: 'Smoky Tandoori Chickpea Crunch',
      storyline: 'Wood-fired chickpeas tossed in clay-oven spices over baby spinach and cold-pressed mustard mint vinaigrette.',
      prepTime: '12 Mins',
      calories: '420 kcal',
      protein: '21g',
      difficulty: 'Easy',
      badge: 'Best Seller',
      image: '/cutouts/chickpea.webp',
      ingredients: [
        '1.5 cups boiled kabuli chickpeas (dried thoroughly with a towel)',
        '2 cups fresh baby spinach leaves, ozone washed',
        '1 English cucumber, mandoline ribboned',
        '8 cherry tomatoes, halved',
        '1/4 cup red onion rings, soaked in iced water',
        '1 tbsp cold-pressed mustard oil',
        '1 tsp roasted cumin powder & 1/2 tsp smoked paprika',
        '1/2 tsp black rock salt (kala namak)',
        'Juice of 1 fresh green lime',
      ],
      tadka: '1 tbsp mustard oil + 1 tsp brown mustard seeds + 8 fresh curry leaves crackled in cast iron for 20 seconds.',
      steps: [
        'Toss boiled dry chickpeas with 1 tsp mustard oil, smoked paprika, and roasted cumin. Air fry or pan-roast on high heat for 6-8 minutes until blistered and crispy.',
        'In a wide serving bowl, create a generous bed of fresh baby spinach and chilled English cucumber ribbons.',
        'Spoon the warm crispy spiced chickpeas across the center, framing with halved cherry tomatoes and drained crisp onion rings.',
        'Heat the tempering oil in a small ladle. When mustard seeds crackle and curry leaves turn crisp (about 20 seconds), immediately pour sizzling hot over the greens and chickpeas.',
        'Sprinkle black rock salt and fresh lime juice right before digging in for maximum crunch.',
      ],
      chefTip: 'Never salt greens in advance. Salt draws out cellular moisture within 3 minutes; always sprinkle salt and pour tadka right at the table.',
    },
    {
      id: 'chowpatty-moong-chaat',
      num: '02',
      category: 'chaat',
      title: 'Chowpatty Sprouted Moong Chaat',
      storyline: 'Living raw green moong shoots layered with steamed sweet potato, tart green mango ribbons, and date reduction.',
      prepTime: '8 Mins',
      calories: '340 kcal',
      protein: '16g',
      difficulty: 'Beginner',
      badge: 'Raw Living Food',
      image: '/cutouts/cucumber.webp',
      ingredients: [
        '1.5 cups 2-day sprouted whole green moong (living shoots)',
        '1/2 cup steamed purple or orange sweet potato cubes',
        '1/4 cup raw green mango, finely julienned',
        '1/3 cup fresh pomegranate ruby pearls',
        '2 tbsp fresh mint & coriander puree (no water added)',
        '1 tsp unrefined jaggery & tamarind reduction',
        '1/2 tsp chaat masala & pinch of roasted hing',
        '1 tbsp roasted flaxseed sev for topping',
      ],
      tadka: '1 tsp cold-pressed sesame oil + 1/2 tsp cumin seeds + 1 dry whole red chilli tempered until fragrant.',
      steps: [
        'Steam the sprouted moong lightly for 90 seconds (or leave raw if you prefer maximum live enzymes). Shock in cold water to keep bright green.',
        'In your ceramic bowl, combine sprouted moong, steamed sweet potato cubes, and raw mango ribbons.',
        'Drizzle the fresh coriander-mint coulis and date-tamarind reduction gently across the top.',
        'Flash the sesame-cumin tadka over the sweet potatoes to unlock earthy aromas.',
        'Garnish with ruby pomegranate pearls, roasted flaxseed sev, and a light dusting of chaat masala.',
      ],
      chefTip: 'Raw mango juliennes provide natural tartness that replaces synthetic citric acids, giving a vibrant, toothsome crunch.',
    },
    {
      id: 'south-indian-sundal',
      num: '03',
      category: 'protein',
      title: 'Coastal Sundal Power Bowl',
      storyline: 'Tempered black chana and foxtail millets with fresh wet coconut, curry leaves, and crunchy roasted urad dal.',
      prepTime: '10 Mins',
      calories: '380 kcal',
      protein: '18g',
      difficulty: 'Easy',
      badge: 'Ayurvedic Classic',
      image: '/cutouts/minthoney.webp',
      ingredients: [
        '1 cup boiled brown black chickpeas (kala chana)',
        '1/2 cup cooked fluffy foxtail millet (chilled)',
        '3 tbsp freshly grated wet coconut (narikol)',
        '1 green chilli, finely slit lengthwise',
        '1 inch ginger, sliced into micro matchsticks',
        '1/2 cup micro-greens or shredded baby chard',
        'Pink Himalayan salt to taste',
      ],
      tadka: '1.5 tbsp cold-pressed coconut oil + 1 tsp black mustard seeds + 1 tsp split urad dal (fried golden) + 10 fresh curry leaves + generous pinch of asafoetida (hing).',
      steps: [
        'Cook foxtail millets in 2x water until grains separate cleanly, then let cool to room temperature.',
        'Layer millets and boiled black chana in a rustic earthenware bowl with fresh greens.',
        'In an iron ladle, heat coconut oil until shimmering. Add mustard seeds and urad dal; fry until dal turns nutty golden brown.',
        'Drop in the slit green chilli, ginger matchsticks, and curry leaves. When curry leaves crackle, pour entire hot tadka directly over the chana.',
        'Fold in freshly grated coconut gently and serve warm or at room temperature.',
      ],
      chefTip: 'Frying urad dal in the tadka until golden adds an irreplaceable crunchy bite that mimics croutons with zero gluten or refined flour.',
    },
    {
      id: 'paneer-beet-harvest',
      num: '04',
      category: 'quick',
      title: 'Warm A2 Paneer & Roasted Beet Bowl',
      storyline: 'Pan-seared Satara Gir cow paneer layered over roasted beet discs, wild arugula, and Tellicherry black pepper.',
      prepTime: '15 Mins',
      calories: '450 kcal',
      protein: '24g',
      difficulty: 'Intermediate',
      badge: 'Farm Direct',
      image: '/cutouts/chard.webp',
      ingredients: [
        '150g fresh A2 Gir cow paneer, cubed',
        '1 medium beetroot, roasted and knife-sliced into thin rounds',
        '2 cups mixed wild rocket greens & baby spinach',
        '2 tbsp toasted pumpkin and sunflower seeds',
        '1 tbsp cold-pressed walnut or unrefined mustard oil',
        '1 tsp freshly crushed Tellicherry black peppercorns',
        '1 tbsp raw honey or date reduction',
      ],
      tadka: '1 tbsp A2 Gir cow ghee + 1/2 tsp cumin seeds + 1/4 tsp crushed coriander seeds flash-heated until aromatic.',
      steps: [
        'Sear paneer cubes in a dry cast-iron skillet for 2 minutes on each side until golden crust forms on the outside while staying pillow-soft inside.',
        'Arrange thin roasted beetroot slices and mixed living greens across the base of your salad bowl.',
        'Nestle warm seared paneer cubes over the greens and scatter toasted seeds.',
        'Flash the ghee-cumin tadka across the warm paneer, allowing the hot fat to wilt the arugula leaves gently.',
        'Finish with freshly cracked Tellicherry peppercorns and a light drizzle of raw honey.',
      ],
      chefTip: 'Soaking paneer in warm salted water for 5 minutes before searing prevents it from ever turning chewy or rubbery.',
    },
    {
      id: 'masterclass-tadka',
      num: '05',
      category: 'tadka',
      title: 'The 60-Second Sizzling Tadka',
      storyline: 'The foundational fat-soluble spice tempering method that elevates cold living greens into deep Ayurvedic aromatics.',
      prepTime: '2 Mins',
      calories: '90 kcal',
      protein: '1g',
      difficulty: 'Essential Technique',
      badge: 'Masterclass',
      image: '/cutouts/carrot.webp',
      ingredients: [
        '1.5 tbsp unrefined cold-pressed oil (Mustard, Coconut, or Sesame)',
        '1 tsp whole black or brown mustard seeds (rai)',
        '1 tsp whole cumin seeds (jeera)',
        '8-10 fresh small-leaf curry leaves (karivepila), washed and patted dry',
        '1 whole dry Byadgi or Kashmiri chilli, halved',
        '1 pinch raw compounding asafoetida (hing)',
      ],
      tadka: 'The entire dressing IS the flash-tempered fat. Zero emulsifiers, zero mayonnaise.',
      steps: [
        'Use a small heavy-bottomed cast iron or brass tempering ladle (tadka pan). Never use non-stick for tempering.',
        'Heat cold-pressed oil over medium heat until faint shimmer appears (do not allow unrefined oils to smoke heavily).',
        'Add mustard seeds first. Wait 5-8 seconds until they pop and sputter vigorously like tiny fireworks.',
        'Immediately add cumin seeds, dry red chilli, and the pinch of hing. They will darken and bloom in 5 seconds.',
        'Turn off the flame and drop in fresh curry leaves. They will sizzle instantly. Pour sizzling ladle contents immediately over your bowl.',
      ],
      chefTip: 'Dry the curry leaves thoroughly with a clean cloth before dropping into oil to avoid splashing and ensure maximum crispness.',
    },
  ];

  const filtered = recipes.filter(
    (r) => selectedCategory === 'all' || r.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-jb-beige jb-texture text-jb-dark selection:bg-jb-dark selection:text-white pt-20 sm:pt-24 pb-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* ── Top Bar: Back to Home ── */}
        <div className="flex items-center justify-between pb-4 border-b border-jb-dark/20 mb-6">
          <button
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-wider text-jb-dark hover:opacity-75 transition-opacity"
          >
            <SvgArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Back to Home</span>
          </button>

          <span className="text-xs font-display uppercase tracking-widest text-jb-muted hidden sm:block">
            Culinary Archives • Nagpur Kitchen
          </span>
        </div>

        {/* ── Compact Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-display uppercase tracking-widest text-jb-dark block mb-1">
              Micro-Kitchen Stories & Ratios
            </span>
            <h1 className="font-display font-normal text-3xl sm:text-5xl uppercase tracking-tight text-jb-dark leading-[0.95]">
              Salad Recipes & Stories
            </h1>
          </div>

          <p className="jb-body-text text-jb-dark text-xs sm:text-sm max-w-md leading-relaxed">
            Click any story card below to open the complete kitchen ratios, pantry measurements, and step-by-step tempering instructions.
          </p>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-display uppercase tracking-wider border border-jb-dark transition-all ${
                selectedCategory === cat.id
                  ? 'bg-jb-dark text-white shadow-sm'
                  : 'bg-transparent text-jb-dark hover:bg-jb-dark/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Compact Storytelling Recipe Cards Grid (4 Columns, Small & Elegant) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {filtered.map((recipe, idx) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              whileHover={{ y: -5 }}
              onClick={() => setActiveRecipeModal(recipe)}
              className="group cursor-pointer bg-white rounded-2xl border-2 border-jb-dark p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div>
                {/* Story Top Bar */}
                <div className="flex items-center justify-between pb-2.5 border-b border-jb-dark/15 text-xs font-display uppercase">
                  <span className="px-2 py-0.5 rounded-full bg-jb-dark text-white text-[10px] tracking-wider">
                    STORY #{recipe.num}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-jb-muted font-mono">
                    <span>⏱️</span>
                    {recipe.prepTime}
                  </span>
                </div>

                {/* Floating Mini Cutout */}
                <div className="py-3 flex items-center justify-center">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    loading="lazy"
                    decoding="async"
                    width="80"
                    height="80"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Title */}
                <h3 className="font-display uppercase text-base sm:text-lg text-jb-dark tracking-tight leading-tight group-hover:text-jb-dark/80 transition-colors mb-1.5">
                  {recipe.title}
                </h3>

                {/* Micro Storyline */}
                <p className="jb-body-text text-jb-dark text-xs line-clamp-3 leading-relaxed opacity-90 mb-3">
                  {recipe.storyline}
                </p>

                {/* Quick Stats Pill */}
                <div className="flex items-center gap-2 text-[10px] font-display uppercase tracking-wider text-jb-dark/75 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-jb-green/60 border border-jb-dark/20">
                    {recipe.protein} Protein
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-jb-beige border border-jb-dark/20">
                    {recipe.calories}
                  </span>
                </div>
              </div>

              {/* Card Footer: Read Story link */}
              <div className="pt-3 mt-2 border-t border-jb-dark/15 flex items-center justify-between text-[11px] font-display uppercase text-jb-dark">
                <span className="text-[10px] text-jb-muted">
                  {recipe.badge}
                </span>
                <span className="font-bold inline-flex items-center gap-1.5 text-jb-dark group-hover:translate-x-1 transition-transform">
                  <span>Recipe Story</span>
                  <SvgArrowRight className="w-3 h-3 flex-shrink-0" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Compact 3 Golden Rules Bar ── */}
        <div className="bg-jb-gray p-6 sm:p-8 rounded-2xl border-2 border-jb-dark shadow-sm">
          <div className="max-w-4xl space-y-2">
            <span className="text-xs font-display uppercase tracking-widest text-jb-dark block">
              The Philosophy
            </span>
            <h2 className="jb-small-title text-jb-dark uppercase leading-tight">
              The 3 Golden Rules of an Indian Salad Bowl
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs jb-body-text text-jb-dark leading-relaxed">
              <div className="p-3.5 rounded-xl bg-white/70 border border-jb-dark/20">
                <strong className="font-display uppercase text-xs block mb-1">1. Salt at the Table</strong>
                <p>Never salt raw greens in advance. Salt draws out cell moisture in 180 seconds, turning crisp ribbons soggy.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/70 border border-jb-dark/20">
                <strong className="font-display uppercase text-xs block mb-1">2. Hot Sizzle on Cold Greens</strong>
                <p>Pouring a sizzling 20-second tadka over cold raw leaves wilts the edges gently while leaving core minerals crisp.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/70 border border-jb-dark/20">
                <strong className="font-display uppercase text-xs block mb-1">3. Zero Refined Oils</strong>
                <p>Use only wooden expeller-pressed unrefined oils (kachi ghani). They carry natural polyphenols and rich aromatics.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Full Recipe Detail Storytelling Modal ── */}
      <AnimatePresence>
        {activeRecipeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-jb-dark/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="bg-jb-beige jb-texture border-3 border-jb-dark rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto"
            >
              {/* Close */}
              <button
                onClick={() => setActiveRecipeModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full border-2 border-jb-dark bg-white text-jb-dark hover:bg-jb-dark hover:text-white transition-colors"
                aria-label="Close recipe"
              >
                <SvgCloseCross className="w-3.5 h-3.5 text-current" />
              </button>

              <div className="space-y-5">
                
                {/* Header */}
                <div className="pr-10">
                  <div className="flex items-center gap-2 text-xs font-display uppercase tracking-widest text-jb-muted mb-1">
                    <span>Story #{activeRecipeModal.num}</span>
                    <span>•</span>
                    <span>{activeRecipeModal.prepTime} Prep</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl uppercase text-jb-dark tracking-tight leading-tight">
                    {activeRecipeModal.title}
                  </h2>
                  <p className="text-xs font-display uppercase text-jb-muted tracking-wider mt-1">
                    {activeRecipeModal.storyline}
                  </p>
                </div>

                {/* Macro summary */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-jb-green/40 border border-jb-dark/30 text-center text-xs font-display uppercase">
                  <div>
                    <span className="text-[10px] text-jb-muted block">Protein</span>
                    <span className="text-jb-dark font-bold">{activeRecipeModal.protein}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-jb-muted block">Calories</span>
                    <span className="text-jb-dark font-bold">{activeRecipeModal.calories}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-jb-muted block">Difficulty</span>
                    <span className="text-jb-dark font-bold">{activeRecipeModal.difficulty}</span>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="space-y-1.5">
                  <h4 className="font-display uppercase text-xs tracking-widest text-jb-dark flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Pantry Ingredients & Ratios</span>
                  </h4>
                  <ul className="space-y-1 text-xs sm:text-sm jb-body-text text-jb-dark bg-white/70 p-3.5 rounded-xl border border-jb-dark/20">
                    {activeRecipeModal.ingredients.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-jb-dark">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sizzling Tadka Formula */}
                <div className="p-3.5 rounded-xl bg-jb-red/40 border-2 border-jb-dark space-y-1">
                  <h4 className="font-display uppercase text-xs tracking-widest text-jb-dark flex items-center gap-1.5">
                    <SvgTadkaPan className="w-4 h-4 text-spice-chilli flex-shrink-0" />
                    <span>The Sizzling Tadka Dressing</span>
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-jb-dark leading-relaxed">
                    {activeRecipeModal.tadka}
                  </p>
                </div>

                {/* Preparation Steps */}
                <div className="space-y-1.5">
                  <h4 className="font-display uppercase text-xs tracking-widest text-jb-dark flex items-center gap-1.5">
                    <SvgChefNote className="w-4 h-4 text-jb-dark flex-shrink-0" />
                    <span>Step-by-Step Preparation</span>
                  </h4>
                  <ol className="space-y-1.5 text-xs sm:text-sm jb-body-text text-jb-dark">
                    {activeRecipeModal.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/50 border border-jb-dark/15">
                        <span className="font-display text-xs text-jb-dark w-4 flex-shrink-0">
                          {idx + 1}.
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Chef Tip */}
                <div className="p-3 rounded-xl bg-jb-green border border-jb-dark text-xs text-jb-dark">
                  <strong className="font-display uppercase text-[10px] flex items-center gap-1 mb-0.5">
                    <SvgSparkleStar className="w-3 h-3 text-jb-dark flex-shrink-0" />
                    <span>Chef's Secret Rule:</span>
                  </strong>
                  <p className="leading-relaxed">{activeRecipeModal.chefTip}</p>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setActiveRecipeModal(null)}
                    className="px-4 py-2 rounded-full border border-jb-dark text-xs font-display uppercase tracking-wider text-jb-dark hover:bg-jb-dark hover:text-white transition-colors"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      setActiveRecipeModal(null);
                      onBackHome();
                      setTimeout(onOrderClick, 300);
                    }}
                    className="px-5 py-2 rounded-full bg-jb-dark text-white text-xs font-display uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <span>Order In Nagpur</span>
                    <SvgSparkleStar className="w-3 h-3 text-yellow-300 flex-shrink-0" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
