import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const ContactPage = () => {


  const cards = [
    { href: 'mailto:rbharathwaj2003@gmail.com', icon: '✉️', title: 'Personal Email', sub: 'rbharathwaj2003@gmail.com' },
    { href: 'mailto:brama@illinois.edu', icon: '🎓', title: 'University Email', sub: 'brama@illinois.edu' },
    { href: 'https://linkedin.com/in/rbharathwaj', icon: '💼', title: 'LinkedIn', sub: 'Connect professionally', external: true },
  ];

  return (
    <motion.div
      className="min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text-body)' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >



      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 lg:px-20 py-24 lg:py-32">

        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="flex items-center justify-center mb-8">
            <span className="font-mono text-xl mr-4" style={{ color: 'var(--accent)' }}>04.</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: 'var(--text-heading)' }}>Get In Touch</h1>
          </div>

          <motion.p
            className="text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            I'm always open to discussing new opportunities, research collaborations,
            or just having a conversation about engineering innovation. Let's connect!
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="p-8 rounded transition-all duration-300 hover:-translate-y-2 block"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.border = '1px solid var(--border-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.border = '1px solid var(--border)'}
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>{card.title}</h3>
              <p className="text-sm transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{card.sub}</p>
            </a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <p className="mb-8 text-lg" style={{ color: 'var(--text-muted)' }}>
            Whether you want to discuss research opportunities, potential collaborations,
            or just chat about the future of mechanical engineering, I'd love to hear from you.
          </p>

          <a
            href="mailto:rbharathwaj2003@gmail.com"
            className="inline-block px-8 py-4 rounded font-mono text-lg transition-all duration-300 hover:-translate-y-1"
            style={{ border: '2px solid var(--accent)', color: 'var(--accent)', backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--mouse-glow)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Say Hello!
          </a>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ContactPage;
