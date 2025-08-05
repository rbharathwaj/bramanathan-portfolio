import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-6 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md shadow-md border border-white/20">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`text-sm md:text-base transition duration-200 ${
              pathname === link.path
                ? "text-cyan-400 font-semibold"
                : "text-white hover:text-cyan-400"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
