import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [pos, setPos]         = useState({ x: -200, y: -200 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible]   = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select');
      setHovering(!!interactive);
    };
    const onLeave = () => setVisible(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: visible && !hovering ? 1 : 0,
        transform: 'translate(-4px, -10px)',
        transition: 'opacity 0.15s',
      }}
    >
      {/* Terminal box cursor — outlined rectangle with blinking dash inside */}
      <div
        style={{
          width: '16px',
          height: '28px',
          border: '1.5px solid var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '3px',
        }}
      >
        <div
          style={{
            width: '2px',
            height: '18px',
            backgroundColor: 'var(--accent)',
            animation: 'blink 1s step-end infinite',
          }}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
