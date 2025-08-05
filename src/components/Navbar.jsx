import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", path: "/about", number: "01" },
    { label: "Projects", path: "/projects", number: "02" },
    { label: "Contact", path: "/contact", number: "03" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a192f]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              to="/"
              className="w-12 h-12 border-2 border-[#64ffda] text-[#64ffda] flex items-center justify-center font-mono text-xl font-bold hover:bg-[#64ffda]/10 transition-all duration-300"
            >
              B
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`group flex items-center space-x-2 transition duration-300 ${
                  pathname === link.path
                    ? "text-[#64ffda]"
                    : "text-[#ccd6f6] hover:text-[#64ffda]"
                }`}
              >
                <span className="text-[#64ffda] font-mono text-sm">
                  {link.number}.
                </span>
                <span className="font-mono text-sm group-hover:-translate-y-0.5 transition-transform duration-300">
                  {link.label}
                </span>
              </Link>
            ))}
            
            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 border border-[#64ffda] text-[#64ffda] font-mono text-sm rounded hover:bg-[#64ffda]/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              Resume
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden w-10 h-10 text-[#64ffda] flex flex-col justify-center items-center space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-6 h-0.5 bg-current"></div>
            <div className="w-6 h-0.5 bg-current"></div>
            <div className="w-6 h-0.5 bg-current"></div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;