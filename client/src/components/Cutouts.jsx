import React from 'react';

// JuiceBot-style minimal line & solid vector cutouts

export function FarmCutout({ className = "w-64 h-64" }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Sun */}
      <circle cx="150" cy="50" r="22" fill="#292929" />
      <line x1="150" y1="18" x2="150" y2="10" stroke="#292929" strokeWidth="4" strokeLinecap="round" />
      <line x1="150" y1="82" x2="150" y2="90" stroke="#292929" strokeWidth="4" strokeLinecap="round" />
      <line x1="118" y1="50" x2="110" y2="50" stroke="#292929" strokeWidth="4" strokeLinecap="round" />
      <line x1="182" y1="50" x2="190" y2="50" stroke="#292929" strokeWidth="4" strokeLinecap="round" />
      {/* Rolling Hills Cutout */}
      <path d="M10 160 Q 60 110, 110 150 T 200 130 L 200 190 L 10 190 Z" fill="#292929" />
      <path d="M0 180 Q 70 140, 130 170 T 200 160 L 200 200 L 0 200 Z" fill="#292929" opacity="0.6" />
      {/* Sprouting Grain Plant */}
      <path d="M70 140 C 70 100, 60 80, 50 70 C 65 75, 75 90, 75 140" fill="#292929" />
      <path d="M72 110 C 85 95, 105 95, 115 100 C 105 112, 90 115, 72 110" fill="#292929" />
      <path d="M70 95 C 55 80, 40 85, 30 92 C 40 102, 55 102, 70 95" fill="#292929" />
      <circle cx="50" cy="65" r="4" fill="#292929" />
    </svg>
  );
}

export function KnifeKitchenCutout({ className = "w-64 h-64" }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Chef Knife Blade */}
      <path d="M30 60 L 150 60 C 150 60, 150 110, 90 110 L 30 110 Z" fill="#292929" />
      {/* Knife Handle */}
      <rect x="150" y="70" width="40" height="20" rx="4" fill="#292929" />
      <circle cx="160" cy="80" r="2.5" fill="#e1dcd6" />
      <circle cx="175" cy="80" r="2.5" fill="#e1dcd6" />
      {/* Blade Tip Point */}
      <path d="M30 60 L 10 105 L 30 110 Z" fill="#292929" />
      {/* Chopped Cucumber Ribbons / Rounds Falling */}
      <circle cx="50" cy="140" r="14" stroke="#292929" strokeWidth="4" fill="none" strokeDasharray="3 3" />
      <circle cx="50" cy="140" r="8" fill="#292929" opacity="0.3" />
      
      <circle cx="95" cy="155" r="18" stroke="#292929" strokeWidth="4" fill="none" />
      <circle cx="95" cy="155" r="10" fill="#292929" opacity="0.4" />

      <circle cx="145" cy="145" r="12" stroke="#292929" strokeWidth="4" fill="none" />
      {/* Motion Cut Lines */}
      <line x1="85" y1="40" x2="85" y2="52" stroke="#292929" strokeWidth="3" strokeLinecap="round" />
      <line x1="105" y1="36" x2="105" y2="50" stroke="#292929" strokeWidth="3" strokeLinecap="round" />
      <line x1="125" y1="42" x2="125" y2="52" stroke="#292929" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function DeliveryTruckCutout({ className = "w-64 h-64" }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="25" y="60" width="95" height="70" rx="4" fill="#292929" />
      <path d="M60 85 C 60 70, 85 70, 85 85 C 85 100, 60 100, 60 85 Z" fill="#e1dcd6" />
      <line x1="60" y1="100" x2="72" y2="85" stroke="#292929" strokeWidth="2" />
      <path d="M120 80 L 150 80 L 170 105 L 170 130 L 120 130 Z" fill="#292929" />
      <path d="M125 86 L 146 86 L 160 104 L 125 104 Z" fill="#e1dcd6" />
      <rect x="170" y="120" width="8" height="10" rx="2" fill="#292929" />
      <circle cx="55" cy="135" r="18" fill="#292929" />
      <circle cx="55" cy="135" r="8" fill="#e1dcd6" />
      <circle cx="145" cy="135" r="18" fill="#292929" />
      <circle cx="145" cy="135" r="8" fill="#e1dcd6" />
      <line x1="10" y1="155" x2="35" y2="155" stroke="#292929" strokeWidth="4" strokeLinecap="round" />
      <line x1="45" y1="155" x2="80" y2="155" stroke="#292929" strokeWidth="4" strokeLinecap="round" />
      <line x1="95" y1="155" x2="190" y2="155" stroke="#292929" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function TadkaLadleCutout({ className = "w-64 h-64" }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M185 45 L 95 105" stroke="#292929" strokeWidth="12" strokeLinecap="round" />
      <line x1="145" y1="72" x2="185" y2="45" stroke="#292929" strokeWidth="18" strokeLinecap="round" />
      <ellipse cx="65" cy="125" rx="42" ry="26" fill="#292929" />
      <ellipse cx="65" cy="120" rx="36" ry="18" fill="#daad9d" />
      <circle cx="55" cy="116" r="3" fill="#292929" />
      <circle cx="68" cy="118" r="2.5" fill="#292929" />
      <circle cx="78" cy="114" r="3" fill="#292929" />
      <circle cx="60" cy="124" r="2.5" fill="#292929" />
      <circle cx="45" cy="90" r="3" fill="#292929" />
      <circle cx="70" cy="80" r="3.5" fill="#292929" />
      <circle cx="85" cy="95" r="2.5" fill="#292929" />
      <circle cx="30" cy="110" r="3" fill="#292929" />
      <path d="M60 120 C 50 100, 30 100, 25 105 C 35 118, 50 125, 60 120 Z" fill="#292929" />
      <line x1="30" y1="105" x2="55" y2="120" stroke="#daad9d" strokeWidth="1.5" />
      <path d="M40 70 Q 50 55, 45 40" stroke="#292929" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M65 65 Q 75 50, 70 35" stroke="#292929" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function LetterFCutout({ className = "w-64 h-64" }) {
  return (
    <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M35 25 H 170 V 75 H 95 V 105 H 155 V 155 H 95 V 220 H 35 Z"
        fill="#292929"
      />
      <path
        d="M140 35 C 175 10, 195 25, 190 60 C 160 55, 145 45, 140 35 Z"
        fill="#b2bea5"
        stroke="#292929"
        strokeWidth="3"
      />
      <circle cx="165" cy="125" r="10" fill="#daad9d" stroke="#292929" strokeWidth="3" />
      <circle cx="180" cy="150" r="7" fill="#daad9d" stroke="#292929" strokeWidth="2.5" />
    </svg>
  );
}

export function SataraDairyCutout({ className = "w-40 h-40" }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Traditional Clay / Brass Milk Matka Pot */}
      <ellipse cx="80" cy="120" rx="42" ry="26" fill="#292929" />
      <path d="M45 110 C 45 80, 60 70, 65 60 L 95 60 C 100 70, 115 80, 115 110 Z" fill="#292929" />
      <ellipse cx="80" cy="60" rx="18" ry="6" fill="#e3cba5" stroke="#292929" strokeWidth="3" />
      {/* Fresh milk droplet and butter cube (paneer) */}
      <rect x="68" y="25" width="24" height="24" rx="3" fill="#292929" transform="rotate(15 68 25)" />
      <circle cx="80" cy="100" r="12" fill="#e3cba5" stroke="#292929" strokeWidth="2" />
    </svg>
  );
}

export function MilletCutout({ className = "w-40 h-40" }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Stalk of Rainfed Millet Grains */}
      <path d="M80 150 C 80 110, 75 70, 65 30" stroke="#292929" strokeWidth="4" strokeLinecap="round" />
      {/* Millet grain kernels */}
      <ellipse cx="65" cy="40" rx="8" ry="5" fill="#292929" transform="rotate(-30 65 40)" />
      <ellipse cx="78" cy="45" rx="8" ry="5" fill="#292929" transform="rotate(30 78 45)" />
      <ellipse cx="68" cy="60" rx="8" ry="5" fill="#292929" transform="rotate(-30 68 60)" />
      <ellipse cx="82" cy="65" rx="8" ry="5" fill="#292929" transform="rotate(30 82 65)" />
      <ellipse cx="70" cy="80" rx="8" ry="5" fill="#292929" transform="rotate(-30 70 80)" />
      <ellipse cx="84" cy="85" rx="8" ry="5" fill="#292929" transform="rotate(30 84 85)" />
      {/* Leaf blade */}
      <path d="M78 110 C 105 100, 125 115, 135 130 C 115 125, 95 120, 78 110 Z" fill="#292929" />
    </svg>
  );
}

export function ColdPressOilCutout({ className = "w-40 h-40" }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Kachi Ghani Wooden Pestle & Mortar */}
      <path d="M40 90 L 120 90 L 105 140 L 55 140 Z" fill="#292929" />
      <rect x="70" y="30" width="20" height="70" rx="4" fill="#292929" transform="rotate(-15 70 30)" />
      {/* Pure golden oil drop */}
      <path d="M80 100 C 70 120, 90 120, 80 100 Z" fill="#e3cba5" stroke="#292929" strokeWidth="2" />
      <circle cx="80" cy="118" r="4" fill="#e3cba5" />
    </svg>
  );
}

export function SpicesCutout({ className = "w-40 h-40" }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Curry Leaf Sprig */}
      <path d="M40 130 Q 80 80, 130 40" stroke="#292929" strokeWidth="3" strokeLinecap="round" />
      <path d="M80 80 C 70 65, 85 55, 95 65 C 95 75, 85 85, 80 80 Z" fill="#292929" />
      <path d="M60 100 C 45 90, 55 75, 65 85 C 68 95, 62 102, 60 100 Z" fill="#292929" />
      <path d="M105 55 C 100 40, 115 35, 122 45 C 120 55, 110 60, 105 55 Z" fill="#292929" />
      {/* Black Tellicherry Peppercorns */}
      <circle cx="120" cy="110" r="8" fill="#292929" />
      <circle cx="135" cy="125" r="7" fill="#292929" />
      <circle cx="108" cy="128" r="6" fill="#292929" />
    </svg>
  );
}

export function BowlCutout({ className = "w-80 h-80" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Subtle organic drop shadow */}
      <div className="absolute inset-4 rounded-full bg-jb-dark/25 blur-xl -bottom-4 pointer-events-none" />
      
      {/* Clean Cutout Bowl */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-jb-dark shadow-2xl transition-transform duration-500 hover:scale-105">
        <img
          src="/bowls/bowl-1.webp"
          alt="Bowl Bae Cutout"
          width="400"
          height="400"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating Freshness Tag */}
      <div className="absolute -bottom-3 bg-jb-dark text-white px-5 py-2 rounded-full text-xs font-display uppercase tracking-widest whitespace-nowrap shadow-xl">
        Tempered Fresh On Order
      </div>
    </div>
  );
}
