import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

// ── Typewriter education block ────────────────────────────────────────────────
const EDU_LINES = [
  { label: 'grad',      value: 'MEng, Mechanical Engineering  ·  University of Illinois Urbana-Champaign  ·  Urbana-Champaign, IL  ·  2024–2025' },
  { label: 'undergrad', value: 'BE, Mechanical Engineering  ·  PSG College of Technology  ·  India  ·  2020–2024' },
];

const UIUC_TARGET = 'University of Illinois Urbana-Champaign';
const UIUC_START = EDU_LINES[0].value.indexOf(UIUC_TARGET);
const UIUC_END   = UIUC_START + UIUC_TARGET.length;

const highlightUIUC = (text) => {
  if (text.length <= UIUC_START) return text;
  return (
    <>
      {text.slice(0, UIUC_START)}
      <span style={{ color: '#E84A27' }}>{text.slice(UIUC_START, Math.min(text.length, UIUC_END))}</span>
      {text.length > UIUC_END ? text.slice(UIUC_END) : ''}
    </>
  );
};

const TypewriterBlock = () => {
  const [display, setDisplay]     = useState(EDU_LINES.map(() => ''));
  const [activeLine, setActiveLine] = useState(0);
  const state = useRef({ lineIdx: 0, charIdx: 0 });

  useEffect(() => {
    let timer;

    const tick = () => {
      const { lineIdx, charIdx } = state.current;
      if (lineIdx >= EDU_LINES.length) return;

      const value = EDU_LINES[lineIdx].value;

      if (charIdx < value.length) {
        state.current.charIdx++;
        const next = state.current.charIdx;
        setDisplay(prev => {
          const d = [...prev];
          d[lineIdx] = value.slice(0, next);
          return d;
        });
        timer = setTimeout(tick, 28);
      } else {
        // line done — pause then advance
        timer = setTimeout(() => {
          state.current.lineIdx++;
          state.current.charIdx = 0;
          setActiveLine(state.current.lineIdx);
          tick();
        }, 420);
      }
    };

    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="font-mono text-xs sm:text-sm lg:text-base mb-14 space-y-5 overflow-x-auto"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      {EDU_LINES.map((line, i) => (
        <div key={line.label} className="space-y-1">
          {/* Label row */}
          <div className="flex items-center gap-1.5">
            <span style={{ color: 'var(--accent)', userSelect: 'none' }}>{'>'}</span>
            <span style={{ color: 'var(--accent)' }}>{line.label}</span>
          </div>
          {/* Value row — indented */}
          <div className="flex items-center" style={{ paddingLeft: '16px' }}>
            <span style={{ color: 'var(--text-body)' }}>{i === 0 ? highlightUIUC(display[i]) : display[i]}</span>
            {activeLine === i && (
              <span style={{
                display: 'inline-block',
                width: '7px', height: '14px',
                backgroundColor: 'var(--accent)',
                marginLeft: '2px',
                verticalAlign: 'middle',
                animation: 'blink 1s step-end infinite',
                opacity: 0.85,
              }} />
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

const ABOUT_EXTS = ['/about.jpg', '/about.jpeg', '/about.JPG', '/about.JPEG'];

const AboutPhoto = () => {
  const [src, setSrc] = useState(ABOUT_EXTS[0]);
  const idxRef = useRef(0);

  const tryNext = useCallback(() => {
    idxRef.current += 1;
    if (idxRef.current < ABOUT_EXTS.length) setSrc(ABOUT_EXTS[idxRef.current]);
  }, []);

  return (
    <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
      <img
        src={src}
        alt="Bharathwaj Ramanathan"
        onError={tryNext}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
      />
    </div>
  );
};

const About = () => (
  <div className="min-h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-body)' }}>


    <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-24 lg:py-32">

      {/* Header */}
      <motion.div className="mb-10" {...fadeUp(0)}>
        <div className="flex items-center mb-3">
          <span className="font-mono text-xl mr-4" style={{ color: 'var(--accent)' }}>01.</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: 'var(--text-heading)' }}>About Me</h1>
          <div className="ml-8 h-px flex-1" style={{ backgroundColor: 'var(--border-hover)' }} />
        </div>
      </motion.div>

      <TypewriterBlock />

      {/* Bio + Photo */}
      <motion.div
        className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16"
        {...fadeUp(0.1)}
      >
        {/* Photo — polaroid print style */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start">
          <motion.div
            className="select-none"
            style={{
              backgroundColor: '#fff',
              padding: '10px 10px 36px 10px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)',
              rotate: '2deg',
              maxWidth: '400px',
              width: '100%',
            }}
            whileHover={{
              rotate: 0,
              scale: 1.02,
              boxShadow: '0 20px 56px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.09)',
              transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <AboutPhoto />
          </motion.div>
        </div>

        {/* Bio text */}
        <div className="lg:col-span-7 space-y-5">
          <p className="font-mono text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
            // bio
          </p>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Hi, I'm Bharathwaj, a <span style={{ color: 'var(--accent)' }}>Mechanical Engineer</span> and
              recent graduate of the <span style={{ color: 'var(--accent)' }}>University of Illinois Urbana-Champaign</span>.
            </p>
            <p>
              My curiosity for how things work started at a pretty young age through an unlikely combination of{' '}
              <span style={{ color: 'var(--accent)' }}>Iron Man</span> and{' '}
              <span style={{ color: 'var(--accent)' }}>The Big Bang Theory</span>. One made engineering look
              impossibly cool, while the other convinced me that physics was far more interesting than I probably
              should have found it. Somewhere along the way, that curiosity turned into a career path.
            </p>
            <p>
              Growing up, I was fascinated by <span style={{ color: 'var(--accent)' }}>cars and computers</span>.
              I was always more interested in understanding what was happening behind the scenes than simply using
              them. That mindset has stuck with me ever since. Whether it is engineering, technology, science, or
              some completely random topic I stumbled across at 2 AM, I genuinely enjoy learning how things work
              and why they work the way they do.
            </p>

            <p>
              Lately, I have also fallen down the rabbit hole of what people call{' '}
              <span style={{ color: 'var(--accent)' }}>vibe coding</span>. What started as curiosity quickly
              became one of my favorite ways to build things, learn new technologies, and bring ideas to life
              without getting stuck on where to begin. I am not saying I am an expert, but I think I am getting
              pretty good at it.
            </p>
            <p>
              At the end of the day, I am someone who enjoys building, learning, exploring new ideas, and
              occasionally spending way too much time chasing an interesting problem simply because I want to
              understand it better.
            </p>
          </div>
        </div>
      </motion.div>


    </div>
  </div>
);

export default About;
