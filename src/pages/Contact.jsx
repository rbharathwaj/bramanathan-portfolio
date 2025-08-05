// OPTION 1: FULL CONTACT PAGE
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#0a192f', color: '#8892b0' }}
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 60, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Mouse Follow Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 lg:px-20 py-24 lg:py-32">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-center mb-8">
            <span className="text-[#64ffda] font-mono text-xl mr-4">03.</span>
            <h1 className="text-[#ccd6f6] text-3xl sm:text-4xl lg:text-5xl font-bold">Get In Touch</h1>
          </div>
          
          <motion.p
            className="text-xl text-[#8892b0] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I'm always open to discussing new opportunities, research collaborations, 
            or just having a conversation about engineering innovation. Let's connect!
          </motion.p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          
          {/* Email */}
          <a
            href="mailto:bharathwaj@example.com"
            className="group bg-[#112240] p-8 rounded border border-[#64ffda]/20 hover:border-[#64ffda]/60 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="text-[#64ffda] text-3xl mb-4">✉️</div>
            <h3 className="text-[#ccd6f6] text-xl font-semibold mb-2">Email</h3>
            <p className="text-sm text-[#8892b0] group-hover:text-[#64ffda] transition-colors duration-300">
              bharathwaj@illinois.edu
            </p>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#112240] p-8 rounded border border-[#64ffda]/20 hover:border-[#64ffda]/60 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="text-[#64ffda] text-3xl mb-4">💼</div>
            <h3 className="text-[#ccd6f6] text-xl font-semibold mb-2">LinkedIn</h3>
            <p className="text-sm text-[#8892b0] group-hover:text-[#64ffda] transition-colors duration-300">
              Connect professionally
            </p>
          </a>

          {/* Research Gate / ORCID */}
          <a
            href="https://researchgate.net/profile/your-profile"
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-[#112240] p-8 rounded border border-[#64ffda]/20 hover:border-[#64ffda]/60 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="text-[#64ffda] text-3xl mb-4">🔬</div>
            <h3 className="text-[#ccd6f6] text-xl font-semibold mb-2">Research</h3>
            <p className="text-sm text-[#8892b0] group-hover:text-[#64ffda] transition-colors duration-300">
              Academic collaboration
            </p>
          </a>

        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-[#8892b0] mb-8 text-lg">
            Whether you want to discuss research opportunities, potential collaborations, 
            or just chat about the future of mechanical engineering, I'd love to hear from you.
          </p>
          
          <a
            href="mailto:bharathwaj@illinois.edu"
            className="inline-block px-8 py-4 border-2 border-[#64ffda] text-[#64ffda] bg-transparent rounded font-mono text-lg hover:bg-[#64ffda]/10 transition-all duration-300 hover:-translate-y-1"
          >
            Say Hello!
          </a>
        </motion.div>

      </div>

      {/* Grid Backgrounds */}
      <div className="absolute inset-0 opacity-15" style={{
        backgroundImage: `linear-gradient(rgba(100, 255, 218, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 255, 218, 0.15) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute inset-0 opacity-8" style={{
        backgroundImage: `linear-gradient(rgba(100, 255, 218, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 255, 218, 0.06) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }} />
    </motion.div>
  );
};

// OPTION 2: CONTACT SECTION (to embed in other pages)
const ContactSection = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto text-center px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[#64ffda] font-mono text-base mb-4">What's Next?</h2>
          <h3 className="text-[#ccd6f6] text-4xl lg:text-5xl font-bold mb-8">Get In Touch</h3>
          
          <p className="text-[#8892b0] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            I'm currently looking for new opportunities and collaborations. Whether you have 
            a question about my research or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <a
            href="mailto:bharathwaj@illinois.edu"
            className="inline-block px-7 py-4 border-2 border-[#64ffda] text-[#64ffda] bg-transparent rounded font-mono text-sm hover:bg-[#64ffda]/10 transition-all duration-300 hover:-translate-y-1"
          >
            Say Hello
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactPage;