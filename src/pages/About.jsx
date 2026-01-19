import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
    <motion.div
      className="min-h-screen w-full overflow-hidden"
      style={{
        backgroundColor: '#0a192f',
        color: '#8892b0',
      }}
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 60, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Mouse Follow Gradient Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-24 lg:py-32">
        
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center mb-8">
            <span className="text-[#64ffda] font-mono text-xl mr-4">01.</span>
            <h1 className="text-[#ccd6f6] text-3xl sm:text-4xl lg:text-5xl font-bold">About Me</h1>
            <div className="ml-8 h-px bg-[#64ffda]/30 flex-1 max-w-xs"></div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* Left Column - Text Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Hello! I'm Bharathwaj, a Mechanical Engineering graduate with a strong interest in how
                <span className="text-[#64ffda]"> thoughtful design</span>,
                <span className="text-[#64ffda]"> simulation</span>, and
                <span className="text-[#64ffda]"> computation</span> come together to solve real
                engineering problems. My journey began with a curiosity about how things work and has
                grown into a drive to design and analyze systems with both rigor and creativity.
              </p>

              <p>
                My background is rooted in <span className="text-[#64ffda]">product design</span>,
                <span className="text-[#64ffda]"> finite element analysis (FEA)</span>, and
                <span className="text-[#64ffda]"> advanced manufacturing</span>. I enjoy working at
                the intersection of CAD, simulation, and manufacturability, with hands-on experience
                exploring implicit lattice structures, additive manufacturing, and simulation-driven
                design workflows.
              </p>

              <p>
                Lately, I've been especially interested in learning how
                <span className="text-[#64ffda]"> data-driven</span> and
                <span className="text-[#64ffda]"> machine-learning-based methods</span> can augment
                traditional mechanical engineering tools. I'm actively exploring how optimization,
                surrogate models, and computational techniques can accelerate design iteration while
                staying grounded in physics and engineering fundamentals.
              </p>

              <p>
                Beyond equations and meshes, I care deeply about building solutions that are practical,
                scalable, and well-reasoned. I enjoy the process of learning through projects, testing
                ideas, finding what breaks, and refining designs until they work better than before.
              </p>

              <p className="text-[#64ffda] font-mono">
                Here are some technologies and tools I work with:
              </p>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-2 mt-6">
                {[
                  'SolidWorks', 'ANSYS', 'Abaqus', 'nTopology',
                  'Python', 'MATLAB', 'CAD/CAM', 'FEA Simulation'
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="flex items-center text-sm font-mono"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  >
                    <span className="text-[#64ffda] mr-2">▹</span>
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image/Visual Element */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative">
              {/* Profile Image */}
              <div className="relative group">
                <div className="w-full aspect-square rounded border-2 border-[#64ffda] overflow-hidden transition-all duration-300 group-hover:border-[#64ffda]/50">
                  <img
                    src="/about.jpg"
                    alt="Bharathwaj"
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#64ffda]/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#64ffda]/30 rounded -z-10"></div>
            </div>
          </motion.div>

        </div>

        {/* Additional Info Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-[#112240] p-6 rounded border border-[#64ffda]/20 hover:border-[#64ffda]/40 transition-all duration-300">
              <h3 className="text-[#ccd6f6] text-xl font-semibold mb-3">Education</h3>
              <p className="text-sm">
                <span className="text-[#64ffda]">MEng Mechanical Engineering</span><br />
                University of Illinois at Urbana-Champaign
              </p>
            </div>

            <div className="bg-[#112240] p-6 rounded border border-[#64ffda]/20 hover:border-[#64ffda]/40 transition-all duration-300">
              <h3 className="text-[#ccd6f6] text-xl font-semibold mb-3">Research Focus</h3>
              <p className="text-sm">
                <span className="text-[#64ffda]">Mechanical Design</span><br />
                Lattice Design & Optimization
              </p>
            </div>

            <div className="bg-[#112240] p-6 rounded border border-[#64ffda]/20 hover:border-[#64ffda]/40 transition-all duration-300">
              <h3 className="text-[#ccd6f6] text-xl font-semibold mb-3">Current Interests</h3>
              <p className="text-sm">
                <span className="text-[#64ffda]">Data-Driven Design</span><br />
                Simulation-Driven Workflows
              </p>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Grid Background Patterns */}
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

    </motion.div>
  );
};

export default About;