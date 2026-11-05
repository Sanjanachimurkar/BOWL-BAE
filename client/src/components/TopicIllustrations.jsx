import React from 'react';

/**
 * Bespoke Topic-Related SVG Illustrations for BOWL BAE
 * Crafted in the JuiceBot / artisanal organic visual language.
 * Clean strokes (currentColor / #1a1a1a), balanced proportions, crisp hairlines.
 */

// 1. Artisanal Ceramic Salad Bowl with fresh greens & seeds
export function SvgSaladBowl({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Bowl Rim & Body */}
      <path
        d="M2.5 10C2.5 16 6.75 19.5 12 19.5C17.25 19.5 21.5 16 21.5 10C21.5 9.5 20.5 9 12 9C3.5 9 2.5 9.5 2.5 10Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Bowl Base foot */}
      <path
        d="M8.5 19.5L9 21.5H15L15.5 19.5"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Fresh Salad Leaves peaking over rim */}
      <path
        d="M7 9C6.5 6.5 8 4.5 10.5 4.5C11.5 6 11 8 10 9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 9C12 6 13.5 4 16 4.5C16.5 6 15.5 8 14.5 9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Micro-seed / chickpea dot */}
      <circle cx="12" cy="7" r="1" fill={color} />
    </svg>
  );
}

// 2. Authentic Indian Tadka Pan (small iron ladle with crackling spices)
export function SvgTadkaPan({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Long Handle */}
      <path
        d="M3 5L8.5 10.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Brass Ladle Bowl */}
      <ellipse
        cx="14"
        cy="15"
        rx="6.5"
        ry="5"
        stroke={color}
        strokeWidth="1.75"
      />
      {/* Crackling Mustard Seed dots */}
      <circle cx="12" cy="14" r="0.9" fill={color} />
      <circle cx="15.5" cy="13.5" r="0.9" fill={color} />
      <circle cx="14" cy="16.5" r="0.9" fill={color} />
      {/* Sizzle Steam Wisps */}
      <path
        d="M13 8.5C13.5 7.5 14.5 7.5 15 6.5"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M16.5 9C17 8 18 8 18.5 7"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 3. Electric Ather Delivery Scooter (Nagpur Green Dispatch)
export function SvgNagpurEV({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Wheels */}
      <circle cx="5.5" cy="17.5" r="2.5" stroke={color} strokeWidth="1.75" />
      <circle cx="18.5" cy="17.5" r="2.5" stroke={color} strokeWidth="1.75" />
      {/* Scooter Chassis & Floorboard */}
      <path
        d="M7.5 17.5H13L16 11H19"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Front Handlebar & Headlight stem */}
      <path
        d="M16 11L14 6H11"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Rear Insulated Thermal Salad Vault */}
      <rect
        x="6"
        y="9.5"
        width="5"
        height="5.5"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Electric Bolt Accent on Vault */}
      <path
        d="M8.8 11L7.8 12.5H9.2L8.2 14"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 4. 4-Hour Harvest Stopwatch (Hydroponic Freshness Gauge)
export function SvgHarvestClock({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Watch Crown button */}
      <path d="M10 2.5H14" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 2.5V5" stroke={color} strokeWidth="1.75" />
      {/* Stopwatch Circular Case */}
      <circle cx="12" cy="13.5" r="8" stroke={color} strokeWidth="1.75" />
      {/* Precise Hands (Pointing to 4 o'clock) */}
      <path d="M12 13.5L12 9.5" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 13.5L15 15.5" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      {/* Small tick markers */}
      <circle cx="12" cy="7" r="0.8" fill={color} />
      <circle cx="18.5" cy="13.5" r="0.8" fill={color} />
      <circle cx="12" cy="20" r="0.8" fill={color} />
      <circle cx="5.5" cy="13.5" r="0.8" fill={color} />
    </svg>
  );
}

// 5. Chef Santoku Knife & Salad Ribbon Slice
export function SvgKnifeChop({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Knife Blade */}
      <path
        d="M3 13.5C7.5 13.5 13 13 16 10L16 6L5 6C3.5 6 3 10 3 13.5Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Handle */}
      <path
        d="M16 7.5H21.5C21.8 7.5 22 7.8 22 8.5V9.5C22 10.2 21.8 10.5 21.5 10.5H16"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Sliced Ribbon / Crisp Veggie Strip */}
      <path
        d="M7 17C9 15.5 12 18.5 14 17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="17.5" cy="17" r="1" fill={color} />
    </svg>
  );
}

// 6. 100% Bagasse Eco Box (Zero Plastic Takeaway Container)
export function SvgBagasseBox({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Clamshell Top Lid */}
      <path
        d="M4 8.5L5.5 4.5H18.5L20 8.5H4Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Deep Base Tray */}
      <path
        d="M4.5 8.5L6 19H18L19.5 8.5"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Eco Leaf Stamp in Center */}
      <path
        d="M12 11.5C10 11.5 9.5 13.5 12 15.5C14.5 13.5 14 11.5 12 11.5Z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 13V16.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// 7. Nagpur Zero Mile Location Marker
export function SvgZeroMilePin({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Marker teardrop */}
      <path
        d="M12 2.5C7.8 2.5 4.5 5.8 4.5 10C4.5 15.5 11 21 12 21.5C13 21 19.5 15.5 19.5 10C19.5 5.8 16.2 2.5 12 2.5Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Zero Mile Center Target */}
      <circle cx="12" cy="10" r="2.8" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="10" r="1" fill={color} />
    </svg>
  );
}

// 8. Kitchen Order Dispatch Ticket
export function SvgOrderTicket({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M5 3.5H19V20.5L16.5 19L14 20.5L12 19L9.5 20.5L7 19L5 20.5V3.5Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Ticket lines */}
      <line x1="8" y1="7.5" x2="16" y2="7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="11" x2="14" y2="11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="14.5" x2="12" y2="14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 9. Tote Bag / Takeaway Bowl Bag
export function SvgToteBag({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Handles */}
      <path
        d="M8.5 8V5C8.5 3.5 10 2.5 12 2.5C14 2.5 15.5 3.5 15.5 5V8"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Bag Body */}
      <path
        d="M4.5 8.5H19.5L18 21H6L4.5 8.5Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Fold lines */}
      <line x1="9.5" y1="12" x2="9.5" y2="17" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14.5" y1="12" x2="14.5" y2="17" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// 10. Handcrafted Checkmark Seal
export function SvgStampCheck({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.75" />
      <path
        d="M8 12.5L10.8 15.2L16 9.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 11. Minimalist Editorial Cross
export function SvgCloseCross({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 12. Editorial Copy Stamp
export function SvgCopyStamp({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="8" width="11" height="11" rx="1.5" stroke={color} strokeWidth="1.75" />
      <path
        d="M5 15H4.5C3.95 15 3.5 14.55 3.5 14V4.5C3.5 3.95 3.95 3.5 4.5 3.5H14C14.55 3.5 15 3.95 15 4.5V5"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 13. Organic Seedling Sprout
export function SvgFarmSprout({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ground Mound */}
      <path d="M4 20C7 18.5 17 18.5 20 20" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      {/* Stem */}
      <path d="M12 20V10" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      {/* Left Leaf */}
      <path
        d="M12 13C8 13 6 9.5 6 7C8.5 7 12 9 12 13Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Right Leaf */}
      <path
        d="M12 10C15 10 18 7 18 4.5C15.5 4.5 12 6.5 12 10Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 14. 4-Point Organic Star Sparkle
export function SvgSparkleStar({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
        fill={color}
      />
    </svg>
  );
}

// 15. Minimalist Alert Warning
export function SvgAlertWarning({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 3.5L21.5 20H2.5L12 3.5Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <line x1="12" y1="9.5" x2="12" y2="14" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill={color} />
    </svg>
  );
}

// 16. Directional Arrow Right
export function SvgArrowRight({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 17. Directional Arrow Up
export function SvgArrowUp({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 19V5M12 5L6 11M12 5L18 11"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 18. Motion Refresh / Toss Arrow
export function SvgRefresh({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M20 11C19.5 6.5 15.5 3 11 3.5C6.5 4 3 8 3.5 12.5C4 17 8 20.5 12.5 20C15.8 19.6 18.5 17.5 19.5 14.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M20 5V11H14"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 19. Directional Arrow Left
export function SvgArrowLeft({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M19 12H5M5 12L11 6M5 12L11 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 20. Artisanal Chef Hat Toque (Chef Note)
export function SvgChefNote({ className = "w-4 h-4", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M6 17H18V19.5C18 20.05 17.55 20.5 17 20.5H7C6.45 20.5 6 20.05 6 19.5V17Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M6 17C4.5 16.5 3.5 14.5 4 12.5C4.5 10.5 6.5 10 7.5 10.5C7.2 8.5 8.5 6 11 5.5C13.5 5 15 6.5 15.5 8C16.5 7 18.5 7.5 19.5 9.5C20.5 11.5 19.5 14.5 18 17"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="8" y1="17" x2="8" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12" y2="13" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="17" x2="16" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
