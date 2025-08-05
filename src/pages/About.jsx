import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      className="min-h-screen w-full px-6 py-24 overflow-x-hidden text-white transition-colors duration-500"
      style={{
        backgroundColor: '#1e293b', // slate-800
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom right, #1e293b, #334155)
        `,
        backgroundSize: '40px 40px',
        backgroundBlendMode: 'overlay',
      }}
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 60, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-white">About Me</h1>
        <p className="text-lg leading-relaxed text-slate-300">
          I'm a Mechanical Engineering grad student at UIUC passionate about product design,
          simulation, and manufacturing. This portfolio showcases my engineering projects,
          skills in CAD/FEA, and my passion for building things that matter.
        </p>

        {/* Section Grid */}
        <div className="mt-16 grid gap-10">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-2">My Skills</h2>
            <p className="text-slate-300">SolidWorks, ANSYS, Abaqus, nTopology, Python, MATLAB</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-2">Areas of Interest</h2>
            <p className="text-slate-300">Thermal systems, additive manufacturing, hydrogen storage, lattice design</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-2">Vision</h2>
            <p className="text-slate-300">To innovate practical engineering solutions that blend design, performance, and sustainability.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
