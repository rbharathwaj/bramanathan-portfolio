import React from 'react';

// Renders a postage-stamp with perforated edges, flag photo, and country label.
// The tooth circles are filled with --bg-card so they "punch through" the stamp
// and blend with the card background behind it.
const FlagStamp = ({ flagCode, region, size = 50 }) => {
  const W = size;
  const H = Math.round(size * 1.18); // ~portrait stamp ratio
  const toothR = Math.round(size * 0.067);   // hole radius
  const toothGap = Math.round(size * 0.165); // spacing between holes
  const inset = toothR + 1;                  // stamp body inset from outer edge

  const teeth = [];
  for (let x = toothGap / 2; x <= W; x += toothGap) {
    teeth.push([x, 0]);
    teeth.push([x, H]);
  }
  for (let y = toothGap / 2; y <= H; y += toothGap) {
    teeth.push([0, y]);
    teeth.push([W, y]);
  }

  const label = region.split(',')[0].toUpperCase();

  return (
    <div style={{ position: 'relative', width: W, height: H, flexShrink: 0 }}>

      {/* Stamp body (white, inset from perforated edge) */}
      <div style={{
        position: 'absolute',
        top: inset, left: inset, right: inset, bottom: inset,
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Flag image */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <img
            src={`https://flagcdn.com/w80/${flagCode}.png`}
            alt={region}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Country label strip */}
        <div style={{
          padding: '2px 2px 3px',
          backgroundColor: '#fff',
          textAlign: 'center',
          fontSize: Math.round(size * 0.13) + 'px',
          fontFamily: 'monospace',
          color: '#222',
          letterSpacing: '0.04em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {label}
        </div>
      </div>

      {/* SVG perforations — circles filled with card bg to simulate punched holes */}
      <svg
        width={W} height={H}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        {teeth.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={toothR} fill="var(--bg-card)" />
        ))}
      </svg>
    </div>
  );
};

export default FlagStamp;
