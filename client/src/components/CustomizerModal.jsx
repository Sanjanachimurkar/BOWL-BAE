import React, { useState, useEffect } from 'react';
import { SvgCloseCross, SvgStampCheck, SvgTadkaPan } from './TopicIllustrations';

export default function CustomizerModal({ isOpen, onClose, onAddToCart }) {
  const [selectedBases, setSelectedBases] = useState(['Foxtail Millet']);
  const [selectedProtein, setSelectedProtein] = useState('Tandoori Chickpeas');
  const [selectedToppings, setSelectedToppings] = useState(['Ruby Pomegranate', 'English Cucumber Ribbons']);
  const [selectedTadka, setSelectedTadka] = useState('Sputtered Black Mustard & Gingelly Oil');
  const [spiceLevel, setSpiceLevel] = useState('Classic Balanced');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const basesList = [
    { name: 'Foxtail Millet', desc: 'Rainfed grains, ancient & gut-nourishing' },
    { name: 'Heirloom Red Rice', desc: 'Coastal Kerala rice with nutty mineral bite' },
    { name: 'Baby Spinach & Kale', desc: 'Tender baby leaves, zero bitter stem' },
    { name: 'Wild Peppery Rocket', desc: 'Aromatic peppery bite that pairs with chaat' },
    { name: 'Steamed Quinoa', desc: 'Fluffy whole-seed protein base' },
  ];

  const proteinsList = [
    { name: 'Tandoori Chickpeas', desc: 'Slow-roasted with clay-oven spices' },
    { name: 'A2 Malai Paneer', desc: 'Grass-fed Satara dairy, char-grilled' },
    { name: 'Slow-Sprouted Moong', desc: '48-hour muslin germinated living pulses' },
    { name: 'Steamed Edamame & Sundal', desc: 'Coastal style with grated coconut' },
    { name: 'Charred Spiced Tofu', desc: '100% organic plant-based curd' },
  ];

  const toppingsList = [
    'Ruby Pomegranate',
    'English Cucumber Ribbons',
    'Candy Beetroot Cubes',
    'Raw Mango Ribbons',
    'Blistered Cherry Tomatoes',
    'Shaved Pink Radish',
    'Popped Amaranth & Peanuts',
    'Crisp Flaxseed Sev',
    'Pickled Pink Shallots',
    'Fresh Shaved Coconut'
  ];

  const tadkaList = [
    {
      name: 'Sputtered Black Mustard & Gingelly Oil',
      desc: 'Crackling Rai, fresh green curry leaves, cold-pressed sesame oil'
    },
    {
      name: 'Mint Coulis & Tempered Cumin Vinaigrette',
      desc: 'Fresh pudina, lime juice, roasted jeera, and cold-pressed mustard oil'
    },
    {
      name: 'Zero-Sugar Date & Tamarind Reduction',
      desc: 'Tangy, sweet, complex with rock salt & roasted hing'
    },
    {
      name: 'Hing-Jeera Warm Infused Ghee & Lemon',
      desc: 'Ancient Ayurvedic digestive tempering, comforting aroma'
    }
  ];

  const toggleBase = (baseName) => {
    if (selectedBases.includes(baseName)) {
      if (selectedBases.length > 1) {
        setSelectedBases(selectedBases.filter((b) => b !== baseName));
      }
    } else {
      if (selectedBases.length < 2) {
        setSelectedBases([...selectedBases, baseName]);
      } else {
        setSelectedBases([selectedBases[1], baseName]);
      }
    }
  };

  const toggleTopping = (topName) => {
    if (selectedToppings.includes(topName)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== topName));
    } else {
      if (selectedToppings.length < 4) {
        setSelectedToppings([...selectedToppings, topName]);
      }
    }
  };

  const handleBuildAndAdd = () => {
    const customBowl = {
      _id: `custom_${Date.now()}`,
      slug: 'build-your-own-bowl',
      name: 'Bespoke Bowl Bae',
      tagline: 'Your harvest. Your spices. Your signature tadka.',
      price: 410,
      quantity: 1,
      image: '/bowls/bowl-5.webp',
      customizations: {
        bases: selectedBases,
        proteins: [selectedProtein],
        toppings: selectedToppings,
        tadkaDressing: selectedTadka,
        spiceLevel,
        specialNotes: instructions
      }
    };

    onAddToCart(customBowl);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-jb-dark/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-jb-beige jb-texture rounded-3xl max-w-3xl w-full overflow-hidden border-3 border-jb-dark shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Customizer Top Header */}
        <div className="p-6 sm:p-8 bg-jb-green border-b-2 border-jb-dark flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-jb-dark block">
              Bespoke Craft Studio
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-jb-dark uppercase tracking-tight">
              Build Your Own Bowl
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border-2 border-jb-dark bg-white text-jb-dark hover:bg-jb-dark hover:text-white transition-colors flex items-center justify-center font-bold"
            aria-label="Close customizer"
          >
            <SvgCloseCross className="w-3.5 h-3.5 text-current" />
          </button>
        </div>

        {/* Scrollable Customization Steps */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* Step 1: Base */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-jb-dark">
                1. Choose Your Base (Pick up to 2)
              </h4>
              <span className="text-xs text-jb-dark font-bold">
                {selectedBases.length}/2 selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {basesList.map((b) => {
                const isSelected = selectedBases.includes(b.name);
                return (
                  <button
                    key={b.name}
                    type="button"
                    onClick={() => toggleBase(b.name)}
                    className={`p-3.5 rounded-2xl text-left border-2 border-jb-dark transition-all flex items-start justify-between ${
                      isSelected
                        ? 'bg-jb-dark text-white shadow-md'
                        : 'bg-white text-jb-dark hover:bg-jb-dark/10'
                    }`}
                  >
                    <div>
                      <span className="font-display font-black text-sm block uppercase tracking-tight">
                        {b.name}
                      </span>
                      <span className="text-xs font-medium mt-0.5 block opacity-90">
                        {b.desc}
                      </span>
                    </div>
                    {isSelected && <SvgStampCheck className="w-4 h-4 text-white mt-1 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Protein */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-jb-dark">
                2. Prime Protein
              </h4>
              <span className="text-xs text-jb-dark font-bold">1 selected</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {proteinsList.map((p) => {
                const isSelected = selectedProtein === p.name;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setSelectedProtein(p.name)}
                    className={`p-3.5 rounded-2xl text-left border-2 border-jb-dark transition-all flex items-start justify-between ${
                      isSelected
                        ? 'bg-jb-dark text-white shadow-md'
                        : 'bg-white text-jb-dark hover:bg-jb-dark/10'
                    }`}
                  >
                    <div>
                      <span className="font-display font-black text-sm block uppercase tracking-tight">
                        {p.name}
                      </span>
                      <span className="text-xs font-medium mt-0.5 block opacity-90">
                        {p.desc}
                      </span>
                    </div>
                    {isSelected && <SvgStampCheck className="w-4 h-4 text-white mt-1 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Farm Toppings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-jb-dark">
                3. Fresh Farm Toppings & Crunch (Pick up to 4)
              </h4>
              <span className="text-xs text-jb-dark font-bold">
                {selectedToppings.length}/4 selected
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {toppingsList.map((top) => {
                const isSelected = selectedToppings.includes(top);
                return (
                  <button
                    key={top}
                    type="button"
                    onClick={() => toggleTopping(top)}
                    className={`px-3.5 py-2 rounded-full text-xs font-black uppercase tracking-wider border-2 border-jb-dark transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-jb-dark text-white shadow-sm'
                        : 'bg-white text-jb-dark hover:bg-jb-dark/10'
                    }`}
                  >
                    <span>{top}</span>
                    {isSelected ? (
                      <SvgStampCheck className="w-3.5 h-3.5 text-current flex-shrink-0" />
                    ) : (
                      <span className="font-mono font-bold text-sm leading-none">+</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: The Sizzling Tadka */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-black uppercase tracking-wider text-jb-dark flex items-center gap-2">
                <SvgTadkaPan className="w-4 h-4 text-spice-chilli flex-shrink-0" />
                <span>4. The Sizzling Tempered Tadka</span>
              </h4>
              <span className="text-xs text-jb-dark font-bold">1 Required</span>
            </div>

            <div className="space-y-2.5">
              {tadkaList.map((t) => {
                const isSelected = selectedTadka === t.name;
                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setSelectedTadka(t.name)}
                    className={`w-full p-4 rounded-2xl text-left border-2 border-jb-dark transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-jb-red text-jb-dark shadow-md font-bold'
                        : 'bg-white text-jb-dark hover:bg-jb-dark/10'
                    }`}
                  >
                    <div>
                      <span className="font-display font-black text-sm block uppercase tracking-tight">
                        {t.name}
                      </span>
                      <span className="text-xs text-jb-muted font-medium mt-0.5 block">
                        {t.desc}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-jb-dark text-white flex items-center justify-center flex-shrink-0">
                        <SvgStampCheck className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 5: Spice Level & Special Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-jb-dark block mb-2">
                Spice Intensity
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['Mild & Herbaceous', 'Classic Balanced', 'Fiery Tadka Heat'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSpiceLevel(lvl)}
                    className={`p-2 rounded-xl text-[11px] font-bold border-2 border-jb-dark text-center transition-all ${
                      spiceLevel === lvl
                        ? 'bg-jb-dark text-white'
                        : 'bg-white border-jb-dark text-jb-dark'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label 
                htmlFor="custom-notes"
                className="text-xs font-black uppercase tracking-wider text-jb-dark block mb-2"
              >
                Special Requests
              </label>
              <input
                id="custom-notes"
                name="custom_notes"
                type="text"
                placeholder="e.g. Light oil, extra lemon..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border-2 border-jb-dark bg-white text-xs text-jb-dark focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Customizer Footer */}
        <div className="p-6 bg-jb-gray border-t-2 border-jb-dark flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-jb-muted block font-black">
              Custom Bowl Total
            </span>
            <span className="font-display font-black text-2xl text-jb-dark">
              ₹410
            </span>
          </div>

          <button
            onClick={handleBuildAndAdd}
            className="px-8 py-3.5 rounded-full bg-jb-dark hover:opacity-90 text-white font-black text-xs uppercase tracking-widest transition-opacity flex items-center gap-2 shadow-md"
          >
            <span>Add Custom Bowl To Bag</span>
            <SvgStampCheck className="w-4 h-4 text-white flex-shrink-0" />
          </button>
        </div>

      </div>
    </div>
  );
}
