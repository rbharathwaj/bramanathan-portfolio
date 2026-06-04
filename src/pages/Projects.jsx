import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paths = [
      '/projects/project 1 - prenac tools/project-info.json',
      '/projects/project 2 - lattice coldplate/project-info.json',
      '/projects/project 3 - ev battery/project-info.json',
      '/projects/project 4 - easyblot/project-info.json',
    ];
    Promise.all(paths.map((p) => fetch(p).then((r) => r.json())))
      .then((data) => { setProjects(data.sort((a, b) => a.order - b.order)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <motion.p
          className="font-mono"
          style={{ color: 'var(--accent)' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading projects...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-body)' }}>


      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-24 lg:py-32">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center mb-3">
            <span className="font-mono text-xl mr-4" style={{ color: 'var(--accent)' }}>02.</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: 'var(--text-heading)' }}>Projects</h1>
            <div className="ml-8 h-px flex-1" style={{ backgroundColor: 'var(--border-hover)' }} />
          </div>
          <p className="ml-12 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
            Things I've designed, simulated, and built
          </p>
        </motion.div>

        {/* ── All projects — easyblot first, then rest ─────────────────── */}
        {(() => {
          const current = projects.find(p => p.slug === 'easyblot');
          const rest    = projects.filter(p => p.slug !== 'easyblot');
          const ordered = [current, ...rest].filter(Boolean);
          return (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
            >
              <p className="font-mono text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
                // projects
              </p>

              <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />

              {ordered.map((project, index) => {
                const isCurrent = project.slug === 'easyblot';
                return (
                  <motion.div key={project.id} variants={rowVariants}>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group block py-8"
                      style={{
                        textDecoration: 'none',
                        borderLeft: isCurrent ? '3px solid var(--accent)' : '3px solid transparent',
                        paddingLeft: '20px',
                        marginLeft: '-23px',
                        transition: 'border-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderLeftColor = 'var(--accent)'; }}
                      onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.borderLeftColor = 'transparent'; }}
                    >
                      <div className="flex items-start gap-6">
                        <span className="font-mono text-sm flex-shrink-0 mt-1" style={{ color: 'var(--accent)', opacity: 0.6, minWidth: '24px' }}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <div className="flex items-center gap-3">
                              {isCurrent && (
                                <span style={{
                                  display: 'inline-block', width: '8px', height: '8px',
                                  borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0,
                                  animation: 'ping 2s ease-in-out infinite',
                                }} />
                              )}
                              <h2 className="text-2xl font-bold leading-snug" style={{ color: 'var(--text-heading)' }}>
                                {project.title}
                              </h2>
                            </div>
                            <span
                              className="font-mono text-xs flex-shrink-0 mt-2 opacity-0 group-hover:opacity-100"
                              style={{ color: 'var(--accent)', transition: 'opacity 0.2s' }}
                            >
                              Explore →
                            </span>
                          </div>
                          <p className="font-mono text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                            {project.company}&nbsp;·&nbsp;{project.role}&nbsp;·&nbsp;{project.period}
                          </p>
                          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-body)' }}>
                            {project.brief}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="font-mono text-xs px-2 py-0.5 rounded"
                                style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div style={{ height: '1px', backgroundColor: 'var(--border)' }} />
                  </motion.div>
                );
              })}
            </motion.div>
          );
        })()}

      </div>
    </div>
  );
};

export default Projects;
