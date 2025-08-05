import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="relative h-screen w-full overflow-hidden flex items-center"
      style={{
        backgroundColor: '#0a192f', // Dark navy blue (same as your screenshot)
        color: '#8892b0',
      }}
    >
      {/* Mouse Follow Gradient Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(450px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      {/* Main content - centered */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 w-full relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Small intro text */}
          <motion.p 
            className="text-[#64ffda] font-mono text-base sm:text-lg mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hi, my name is
          </motion.p>

          {/* Main heading */}
          <motion.h1 
            className="text-[#ccd6f6] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Bharathwaj Ramanathan
          </motion.h1>

          {/* Secondary heading */}
          <motion.h2 
            className="text-[#8892b0] font-mono text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I build engineered solutions.
          </motion.h2>

          {/* Description paragraph */}
          <motion.p 
            className="text-[#8892b0] text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Mechanical Engineering grad student at UIUC specializing in product design, 
            FEA simulation, and advanced manufacturing. Currently focused on implicit lattice design, 
            additive manufacturing, and hydrogen storage solutions.
          </motion.p>
        </motion.div>
      </div>

      {/* Primary Grid Pattern - Main teal grid */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Secondary Grid Pattern - Finer grid for detail */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Accent Grid Pattern - Larger spaced lines for structure */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.12) 2px, transparent 2px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.12) 2px, transparent 2px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Subtle Diagonal Pattern for texture */}
      <div 
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(100, 255, 218, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};

export default Hero;