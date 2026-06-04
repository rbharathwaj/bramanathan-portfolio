import React from 'react';

// Single fixed grain overlay — rendered once from App.jsx
// zIndex 9999 keeps it above page backgrounds; pointer-events none passes all clicks through
const GridBg = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      pointerEvents: 'none',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-grain)" opacity="0.07" />
    </svg>
  </div>
);

export default GridBg;
