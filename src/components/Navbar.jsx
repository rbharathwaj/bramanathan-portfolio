import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const [displayText, setDisplayText] = useState(isDark ? 'DARK' : 'LIGHT');
  const animating = useRef(false);

  const handleToggle = () => {
    if (animating.current) return;
    animating.current = true;

    const currentText = isDark ? 'DARK' : 'LIGHT';
    const nextText    = isDark ? 'LIGHT' : 'DARK';
    let step = currentText.length;

    const deleteChar = () => {
      if (step >= 0) {
        setDisplayText(currentText.slice(0, step));
        step--;
        setTimeout(deleteChar, 35);
      } else {
        toggleTheme();
        let typeStep = 0;
        const typeChar = () => {
          if (typeStep <= nextText.length) {
            setDisplayText(nextText.slice(0, typeStep));
            typeStep++;
            setTimeout(typeChar, 55);
          } else {
            animating.current = false;
          }
        };
        setTimeout(typeChar, 80);
      }
    };

    deleteChar();
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-1 font-mono text-sm focus:outline-none select-none"
      style={{
        padding: '5px 10px',
        borderRadius: '3px',
        border: '1px solid var(--border)',
        backgroundColor: 'var(--toggle-track)',
        cursor: 'pointer',
        minWidth: '96px',
        letterSpacing: '0.03em',
      }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Comment prefix */}
      <span style={{ color: 'var(--text-muted)', userSelect: 'none' }}>//</span>
      {/* Typed label */}
      <span style={{ color: 'var(--accent)', minWidth: '38px', textAlign: 'left' }}>
        {displayText}
      </span>
      {/* Blinking block cursor */}
      <span
        style={{
          display: 'inline-block',
          width: '7px',
          height: '13px',
          backgroundColor: 'var(--accent)',
          animation: 'blink 1s step-end infinite',
          verticalAlign: 'middle',
          marginLeft: '1px',
          opacity: 0.85,
        }}
      />
    </button>
  );
};

const AboutDropdown = ({ pathname, isDark }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isActive = pathname.startsWith('/about');

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const items = [
    { label: 'Travel',  path: '/about/travel' },
    { label: 'Hobbies', path: '/about/hobbies' },
  ];

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="group flex items-center space-x-1.5 font-mono text-sm">
        <Link
          to="/about"
          className="flex items-center space-x-1.5 transition-colors duration-200"
          style={{ color: isActive ? 'var(--accent)' : 'var(--text-body)' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--text-body)'; }}
        >
          <span className="font-mono text-sm" style={{ color: 'var(--accent)' }}>01.</span>
          <span className="group-hover:-translate-y-0.5 transition-transform duration-300">About</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center transition-colors duration-200 p-0.5"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)' }}
        >
          <svg
            width="10" height="6" viewBox="0 0 10 6" fill="none"
            className="transition-transform duration-200"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 mt-2 min-w-[140px] rounded-lg py-1 z-50"
            style={{
              backgroundColor: isDark ? 'rgba(10,25,47,0.98)' : 'rgba(240,244,248,0.98)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }}
          >
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 px-4 py-2.5 font-mono text-sm transition-colors duration-150"
                style={{ color: pathname === item.path ? 'var(--accent)' : 'var(--text-body)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => { if (pathname !== item.path) e.currentTarget.style.color = 'var(--text-body)'; }}
                onClick={() => setOpen(false)}
              >
                <span style={{ color: 'var(--accent)', opacity: 0.6 }}>▹</span>
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const { pathname } = useLocation();
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Projects",   path: "/projects",   number: "02" },
    { label: "Experience", path: "/experience", number: "03" },
  ];

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? isDark
            ? 'rgba(10, 25, 47, 0.95)'
            : 'rgba(240, 244, 248, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid var(--border)'
          : '1px solid transparent',
        boxShadow: scrolled
          ? isDark
            ? '0 1px 20px rgba(0,0,0,0.3)'
            : '0 1px 20px rgba(29,78,216,0.08)'
          : 'none',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="flex justify-between items-center py-5">

          {/* Left: Logo + Toggle */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              to="/"
              className="w-11 h-11 flex items-center justify-center font-mono text-xl font-bold transition-all duration-300"
              style={{
                border: '2px solid var(--accent)',
                color: 'var(--accent)',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark
                  ? 'rgba(100, 255, 218, 0.1)'
                  : 'rgba(29, 78, 216, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              B
            </Link>

            <ThemeToggle />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AboutDropdown pathname={pathname} isDark={isDark} />

            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="group flex items-center space-x-1.5 transition duration-300"
                style={{ color: (pathname === link.path || (link.path === '/projects' && pathname.startsWith('/projects'))) ? 'var(--accent)' : 'var(--text-body)' }}
                onMouseEnter={(e) => {
                  const active = pathname === link.path || (link.path === '/projects' && pathname.startsWith('/projects'));
                  if (!active) e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  const active = pathname === link.path || (link.path === '/projects' && pathname.startsWith('/projects'));
                  if (!active) e.currentTarget.style.color = 'var(--text-body)';
                }}
              >
                <span className="font-mono text-sm" style={{ color: 'var(--accent)' }}>{link.number}.</span>
                <span className="font-mono text-sm group-hover:-translate-y-0.5 transition-transform duration-300">{link.label}</span>
              </Link>
            ))}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 font-mono text-sm rounded transition-all duration-300 hover:-translate-y-0.5"
              style={{
                border: '1.5px solid var(--accent)',
                color: 'var(--accent)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark
                  ? 'rgba(100, 255, 218, 0.08)'
                  : 'rgba(29, 78, 216, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Resume
            </a>
          </motion.div>

          {/* Mobile Hamburger */}
          <motion.button
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center space-y-1.5"
            style={{ color: 'var(--accent)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            aria-label="Toggle menu"
          >
            <motion.div
              className="w-6 h-0.5 bg-current origin-center"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-current"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-current origin-center"
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: isDark ? 'rgba(10, 25, 47, 0.98)' : 'rgba(240, 244, 248, 0.98)',
              borderTop: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col space-y-4">
              {/* About with sub-links */}
              <div className="space-y-2">
                <Link
                  to="/about"
                  className="flex items-center space-x-2 py-2 font-mono text-base transition-colors duration-200"
                  style={{ color: pathname.startsWith('/about') ? 'var(--accent)' : 'var(--text-body)' }}
                >
                  <span style={{ color: 'var(--accent)' }}>01.</span>
                  <span>About</span>
                </Link>
                {[{ label: 'Travel', path: '/about/travel' }, { label: 'Hobbies', path: '/about/hobbies' }].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-2 py-1 pl-6 font-mono text-sm transition-colors duration-200"
                    style={{ color: pathname === item.path ? 'var(--accent)' : 'var(--text-body)' }}
                  >
                    <span style={{ color: 'var(--accent)', opacity: 0.5 }}>▹</span>
                    {item.label}
                  </Link>
                ))}
              </div>
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="flex items-center space-x-2 py-2 font-mono text-base transition-colors duration-200"
                  style={{ color: pathname === link.path ? 'var(--accent)' : 'var(--text-body)' }}
                >
                  <span style={{ color: 'var(--accent)' }}>{link.number}.</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-3 font-mono text-sm text-center rounded transition-all duration-300"
                style={{
                  border: '1.5px solid var(--accent)',
                  color: 'var(--accent)',
                  backgroundColor: isDark ? 'rgba(100, 255, 218, 0.05)' : 'rgba(29, 78, 216, 0.05)',
                }}
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
