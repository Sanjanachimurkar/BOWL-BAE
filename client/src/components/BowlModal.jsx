import React, { useState, useEffect } from 'react';
import { SvgCloseCross } from './TopicIllustrations';

export default function BowlModal({ bowl, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [spicePreference, setSpicePreference] = useState(bowl?.spiceLevel || 'Balanced Indian');
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!bowl) return null;

  const handleAdd = () => {
    onAddToCart({
      ...bowl,
      quantity,
      customizations: {
        spiceLevel: spicePreference,
        specialNotes: specialInstructions
      }
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-jb-dark/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-jb-beige jb-texture rounded-3xl max-w-2xl w-full overflow-hidden border-3 border-jb-dark shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white border-2 border-jb-dark text-jb-dark hover:bg-jb-dark hover:text-white transition-colors flex items-center justify-center font-bold"
          aria-label="Close modal"
        >
          <SvgCloseCross className="w-3.5 h-3.5 text-current" />
        </button>

        {/* Modal Header Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-jb-green border-b-2 border-jb-dark">
          <img
            src={bowl.image}
            alt={bowl.name}
            loading="lazy"
            decoding="async"
            width="640"
            height="360"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-1.5">
            {bowl.dietary.map((d) => (
              <span
                key={d}
                className="px-2.5 py-1 rounded-full bg-jb-dark text-white text-[10px] font-black uppercase tracking-wider"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          <div>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-jb-dark uppercase tracking-tight">
              {bowl.name}
            </h3>
            <p className="text-xs font-black uppercase tracking-wider text-jb-muted mt-1">
              {bowl.tagline}
            </p>
          </div>

          <p className="text-base text-jb-dark font-medium leading-relaxed">
            {bowl.description}
          </p>

          {/* Macro Profile */}
          <div className="p-4 rounded-2xl bg-jb-gray border-2 border-jb-dark">
            <span className="text-[11px] font-black uppercase tracking-wider text-jb-dark block mb-3">
              Nutritional Breakdown (Per Serving)
            </span>
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              <div className="bg-white p-2 rounded-xl border border-jb-dark">
                <span className="text-[10px] text-jb-muted uppercase font-bold block">Calories</span>
                <span className="font-black text-jb-dark text-sm">{bowl.calories}</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-jb-dark">
                <span className="text-[10px] text-jb-muted uppercase font-bold block">Protein</span>
                <span className="font-black text-jb-dark text-sm">{bowl.protein}</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-jb-dark">
                <span className="text-[10px] text-jb-muted uppercase font-bold block">Carbs</span>
                <span className="font-black text-jb-dark text-sm">{bowl.carbs}</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-jb-dark">
                <span className="text-[10px] text-jb-muted uppercase font-bold block">Fat</span>
                <span className="font-black text-jb-dark text-sm">{bowl.fat}</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-jb-dark">
                <span className="text-[10px] text-jb-muted uppercase font-bold block">Fiber</span>
                <span className="font-black text-jb-dark text-sm">{bowl.fiber}</span>
              </div>
            </div>
          </div>

          {/* Sizzling Tadka Dressing */}
          <div className="p-3.5 bg-jb-red rounded-2xl border-2 border-jb-dark text-xs flex items-start gap-2.5">
            <Flame className="w-4 h-4 text-jb-dark mt-0.5 flex-shrink-0" />
            <div>
              <span className="uppercase font-black text-[10px] block text-jb-dark">
                Tempered Tadka Dressing
              </span>
              <span className="font-bold text-jb-dark mt-0.5 block">
                {bowl.tadkaDressing}
              </span>
            </div>
          </div>

          {/* Spice Preference Options */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-jb-dark block mb-2">
              Adjust Spice Intensity
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Mild & Fragrant', 'Classic Balanced', 'Fiery Indian Heat'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSpicePreference(lvl)}
                  className={`p-2.5 rounded-xl text-xs font-bold border-2 border-jb-dark transition-all text-center ${
                    spicePreference === lvl
                      ? 'bg-jb-dark text-white shadow-sm'
                      : 'bg-white text-jb-dark hover:bg-jb-dark/10'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label 
              htmlFor="special-req"
              className="text-xs font-black uppercase tracking-wider text-jb-dark block mb-2"
            >
              Chef's Notes (Optional)
            </label>
            <input
              id="special-req"
              name="special_instructions"
              type="text"
              placeholder="e.g. Extra pomegranate pearls, light oil..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-jb-dark bg-white text-xs text-jb-dark focus:outline-none"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-jb-gray border-t-2 border-jb-dark flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border-2 border-jb-dark">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1 hover:opacity-70 disabled:opacity-30 text-jb-dark font-black font-mono text-sm"
            >
              −
            </button>
            <span className="font-black text-sm text-jb-dark w-4 text-center font-mono">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 hover:opacity-70 text-jb-dark font-black font-mono text-sm"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3.5 px-6 rounded-full bg-jb-dark hover:opacity-90 text-white font-black text-xs uppercase tracking-widest transition-opacity flex items-center justify-between shadow-md"
          >
            <span>Add To Bowl Bag</span>
            <span className="font-mono text-sm">₹{bowl.price * quantity}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
