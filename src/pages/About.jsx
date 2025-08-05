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
                Hello! I'm Bharathwaj, a passionate Mechanical Engineering graduate student at the 
                <span className="text-[#64ffda]"> University of Illinois at Urbana-Champaign</span>. 
                My journey in engineering began with a fascination for how things work and evolved 
                into a deep passion for creating innovative solutions to complex problems.
              </p>

              <p>
                I specialize in <span className="text-[#64ffda]">product design</span>, 
                <span className="text-[#64ffda]"> finite element analysis (FEA)</span>, and 
                <span className="text-[#64ffda]"> advanced manufacturing</span>. My current research 
                focuses on cutting-edge areas including implicit lattice design, additive manufacturing 
                optimization, and hydrogen storage solutions.
              </p>

              <p>
                When I'm not diving deep into simulations or designing the next breakthrough product, 
                you can find me exploring the intersection of traditional engineering principles with 
                modern computational methods. I believe in building solutions that are not only 
                technically sound but also sustainable and impactful.
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
              {/* Placeholder for image */}
              <div className="relative group">
                <div 
                  className="w-full aspect-square bg-[#64ffda]/10 rounded border-2 border-[#64ffda] flex items-center justify-center transition-all duration-300 group-hover:border-[#64ffda]/50"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚙️</div>
                    <p className="font-mono text-sm text-[#64ffda]">Engineering Focus</p>
                  </div>
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
                <span className="text-[#64ffda]">MS Mechanical Engineering</span><br />
                University of Illinois at Urbana-Champaign
              </p>
            </div>

            <div className="bg-[#112240] p-6 rounded border border-[#64ffda]/20 hover:border-[#64ffda]/40 transition-all duration-300">
              <h3 className="text-[#ccd6f6] text-xl font-semibold mb-3">Research Focus</h3>
              <p className="text-sm">
                <span className="text-[#64ffda]">Additive Manufacturing</span><br />
                Lattice Design & Optimization
              </p>
            </div>

            <div className="bg-[#112240] p-6 rounded border border-[#64ffda]/20 hover:border-[#64ffda]/40 transition-all duration-300">
              <h3 className="text-[#ccd6f6] text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-sm">
                <span className="text-[#64ffda]">Hydrogen Storage</span><br />
                Sustainable Engineering Solutions
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