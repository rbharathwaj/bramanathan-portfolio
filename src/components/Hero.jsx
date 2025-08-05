import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      style={{
        backgroundColor: '#1e293b',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom right, #1e293b, #334155)
        `,
        backgroundSize: '40px 40px',
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* 🧠 Hero Text Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
          Bharathwaj Ramanathan
        </h1>
        <p className="text-lg md:text-xl text-slate-200 max-w-2xl">
          Mechanical Engineering grad student at UIUC with a passion for product design,
          FEA, simulation, and manufacturing. Currently exploring implicit lattice design,
          additive manufacturing, and hydrogen storage.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.a
            href="/#projects"
            className="px-6 py-3 border border-slate-500 text-white bg-slate-700/70 backdrop-blur-sm rounded-full shadow-md hover:bg-sky-500 hover:border-sky-500 hover:text-white hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.03 }}
          >
            View Projects
          </motion.a>

          <motion.a
            href="/resume.pdf"
            download
            className="px-6 py-3 border border-slate-500 text-white bg-slate-700/70 backdrop-blur-sm rounded-full shadow-md hover:bg-sky-500 hover:border-sky-500 hover:text-white hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.03 }}
          >
            Download Resume
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
