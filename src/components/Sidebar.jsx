// src/components/Sidebar.jsx
import React from 'react';
import { Home, User, Folder, FileText, Mail } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { href: "#", icon: <Home size={20} />, label: "Home" },
    { href: "#about", icon: <User size={20} />, label: "About" },
    { href: "#projects", icon: <Folder size={20} />, label: "Projects" },
    { href: "/resume.pdf", icon: <FileText size={20} />, label: "Resume", external: true },
    { href: "#contact", icon: <Mail size={20} />, label: "Contact" },
  ];

  return (
    <div className="hidden md:flex fixed top-1/2 left-6 -translate-y-1/2 z-50 flex-col gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          target={link.external ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="group flex items-center justify-center text-white hover:text-cyan-400 transition"
          title={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default Sidebar;
