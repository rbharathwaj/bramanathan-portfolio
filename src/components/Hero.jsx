import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

const PHRASES = [
  "I build engineered solutions.",
  "I follow my curiosity.",
];

// ── Update these with your actual profile URLs ────────────────────────────────
const SOCIALS = [
  { Icon: Github,   href: 'https://github.com/rbharathwaj',             label: 'GitHub' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/rbharathwaj/', label: 'LinkedIn' },
  { Icon: Mail,     href: 'mailto:rbharathwaj2003@gmail.com', label: 'Email' },
];

const useTypewriter = (phrases) => {
  const [display, setDisplay] = useState('');
  const state = useRef({ phraseIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timer;

    const tick = () => {
      const { phraseIdx, charIdx, deleting } = state.current;
      const current = phrases[phraseIdx];

      if (!deleting) {
        if (charIdx < current.length) {
          state.current.charIdx = charIdx + 1;
          setDisplay(current.slice(0, charIdx + 1));
          timer = setTimeout(tick, 75);
        } else {
          // Finished typing — pause then delete
          timer = setTimeout(() => {
            state.current.deleting = true;
            tick();
          }, 2200);
        }
      } else {
        if (charIdx > 0) {
          state.current.charIdx = charIdx - 1;
          setDisplay(current.slice(0, charIdx - 1));
          timer = setTimeout(tick, 38);
        } else {
          // Finished deleting — move to next phrase
          state.current.deleting = false;
          state.current.phraseIdx = (phraseIdx + 1) % phrases.length;
          timer = setTimeout(tick, 300);
        }
      }
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []); // runs once — state lives in ref

  return display;
};

const Hero = () => {
  const typedText = useTypewriter(PHRASES);

  return (
    <div
      className="relative h-screen w-full overflow-hidden flex items-center"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text-body)' }}
    >
      {/* Grid background */}


      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 w-full relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <motion.p
            className="font-mono text-base sm:text-lg mb-5"
            style={{ color: 'var(--accent)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            style={{ color: 'var(--text-heading)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Bharathwaj Ramanathan
          </motion.h1>

          <motion.h2
            className="font-mono text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 leading-tight"
            style={{ color: 'var(--text-body)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span>{typedText}</span>
            <span
              className="inline-block w-0.5 h-8 ml-1 align-middle"
              style={{ backgroundColor: 'var(--cursor)', animation: 'blink 1s step-end infinite' }}
            />
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-10"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Curious by nature, engineer by training, and always eager to learn something new.
          </motion.p>

          {/* Social icons */}
          <motion.div
            className="flex items-center justify-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: 'var(--text-muted)',
                  transition: 'color 0.2s, transform 0.2s',
                  display: 'flex',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon size={22} strokeWidth={1.6} />
              </a>
            ))}
          </motion.div>

          <motion.p
            className="font-mono text-base mt-5 flex items-center justify-center gap-1.5"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <MapPin size={14} strokeWidth={1.8} style={{ color: 'var(--accent)', opacity: 0.8, flexShrink: 0 }} />
            Champaign, IL
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
