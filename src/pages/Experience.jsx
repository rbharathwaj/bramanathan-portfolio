import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const BulletItem = ({ text }) => (
  <li className="flex items-start gap-3 text-base leading-relaxed" style={{ color: 'var(--text-body)' }}>
    <span className="mt-1 flex-shrink-0" style={{ color: 'var(--accent)' }}>▹</span>
    <span>{text}</span>
  </li>
);

const ExperienceRow = ({ exp }) => {
  const isCurrent = exp.period?.includes('Present');
  return (
    <motion.div variants={rowVariants}>
      <div
        className="py-10"
        style={{
          borderLeft: '3px solid transparent',
          paddingLeft: '20px',
          marginLeft: '-23px',
          transition: 'border-color 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = 'var(--accent)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderLeftColor = 'transparent'; }}
      >
        <div className="flex items-start gap-3 mb-1">
          {isCurrent && (
            <span style={{
              display: 'inline-block', width: '8px', height: '8px',
              borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0,
              marginTop: '8px', animation: 'ping 2s ease-in-out infinite',
            }} />
          )}
          <h2 className="text-2xl font-bold leading-snug" style={{ color: 'var(--text-heading)' }}>
            {exp.company}
          </h2>
        </div>
        <p className="font-mono text-sm mb-4" style={{ color: 'var(--text-muted)', paddingLeft: isCurrent ? '20px' : '0' }}>
          <span style={{ color: 'var(--accent)' }}>{exp.role}</span>
          &nbsp;·&nbsp;{exp.location}&nbsp;·&nbsp;{exp.period}
        </p>
        <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-body)', paddingLeft: isCurrent ? '20px' : '0' }}>
          {exp.overview}
        </p>
        <ul className="space-y-3 mb-6" style={{ paddingLeft: isCurrent ? '20px' : '0' }}>
          {exp.bullets.map((b, i) => <BulletItem key={i} text={b} />)}
        </ul>
        <div className="flex flex-wrap gap-2" style={{ paddingLeft: isCurrent ? '20px' : '0' }}>
          {exp.technologies.map((tech) => (
            <span key={tech} className="font-mono text-xs px-2.5 py-1 rounded"
              style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
    </motion.div>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/experience.json')
      .then((r) => r.json())
      .then((data) => { setExperiences(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-body)' }}>
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 lg:px-20 py-24 lg:py-32">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center mb-3">
            <span className="font-mono text-xl mr-4" style={{ color: 'var(--accent)' }}>03.</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: 'var(--text-heading)' }}>Experience</h1>
            <div className="ml-8 h-px flex-1" style={{ backgroundColor: 'var(--border-hover)' }} />
          </div>
          <p className="ml-12 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
            Where I've worked and what I've built
          </p>
        </motion.div>

        {loading ? (
          <motion.p className="font-mono" style={{ color: 'var(--accent)' }}
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}>
            Loading...
          </motion.p>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          >
            {/* Main experience entries */}
            <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
            {experiences.filter(e => !e.additional).map((exp) => <ExperienceRow key={exp.id} exp={exp} />)}

            {/* Additional technical experiences */}
            {experiences.some(e => e.additional) && (
              <motion.div variants={rowVariants} className="mt-16">
                <p className="font-mono text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
                  // additional technical experiences
                </p>
                <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
                {experiences.filter(e => e.additional).map((exp) => <ExperienceRow key={exp.id} exp={exp} />)}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Experience;
