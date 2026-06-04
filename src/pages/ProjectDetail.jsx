import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PROJECT_PATHS = {
  'collapsible-storage-pallet':  '/projects/project 1 - prenac tools/project-info.json',
  'lattice-coldplate-rbdo':      '/projects/project 2 - lattice coldplate/project-info.json',
  'ev-battery-immersion-cooling':'/projects/project 3 - ev battery/project-info.json',
  'easyblot':                    '/projects/project 4 - easyblot/project-info.json',
};

const PROJECT_ORDER = [
  'easyblot',
  'collapsible-storage-pallet',
  'lattice-coldplate-rbdo',
  'ev-battery-immersion-cooling',
];

const isPlaceholder = (str) => typeof str === 'string' && str.startsWith('[') && str.endsWith(']');

const Placeholder = ({ children }) => (
  <span
    className="font-mono text-xs px-1.5 py-0.5 rounded"
    style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: '#d97706', border: '1px dashed rgba(245,158,11,0.4)' }}
  >
    {children}
  </span>
);

// ── Section with // label ─────────────────────────────────────────────────────
const Section = ({ label, children, delay = 0 }) => (
  <motion.div
    className="mb-12"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
      // {label}
    </p>
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
      {children}
    </div>
  </motion.div>
);

const BulletList = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-base leading-relaxed">
        <span className="mt-1 flex-shrink-0" style={{ color: 'var(--accent)' }}>▹</span>
        {isPlaceholder(item)
          ? <Placeholder>{item}</Placeholder>
          : <span style={{ color: 'var(--text-body)' }}>{item}</span>}
      </li>
    ))}
  </ul>
);

const ProjectDetail = () => {
  const { id: slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const path = PROJECT_PATHS[slug];
    if (!path) { setNotFound(true); setLoading(false); return; }
    fetch(path)
      .then((r) => r.json())
      .then((data) => { setProject(data); setLoading(false); })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <p className="font-mono" style={{ color: 'var(--accent)' }}>Loading...</p>
    </div>
  );

  if (notFound || !project) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: 'var(--bg)' }}>
      <p className="font-mono text-lg" style={{ color: 'var(--text-heading)' }}>Project not found.</p>
      <Link to="/projects" className="font-mono text-sm" style={{ color: 'var(--accent)' }}>← Back to Projects</Link>
    </div>
  );

  const idx  = PROJECT_ORDER.indexOf(slug);
  const prev = idx > 0 ? PROJECT_ORDER[idx - 1] : null;
  const next = idx < PROJECT_ORDER.length - 1 ? PROJECT_ORDER[idx + 1] : null;
  const isCurrent = project.period?.includes('Present');

  return (
    <motion.div
      className="min-h-screen w-full"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text-body)' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45 }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 lg:px-16 py-24 lg:py-32">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-sm mb-14 block"
            style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            ← back to projects
          </Link>
        </motion.div>

        {/* Title & meta */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            borderLeft: '3px solid var(--accent)',
            paddingLeft: '24px',
            marginLeft: '-27px',
          }}
        >
          {isCurrent && (
            <div className="flex items-center gap-2 mb-3">
              <span style={{
                display: 'inline-block', width: '8px', height: '8px',
                borderRadius: '50%', backgroundColor: '#22c55e',
                animation: 'ping 2s ease-in-out infinite',
              }} />
              <span className="font-mono text-xs" style={{ color: '#22c55e' }}>currently working on</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-snug" style={{ color: 'var(--text-heading)' }}>
            {project.title}
          </h1>

          <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            {project.company}&nbsp;·&nbsp;{project.role}&nbsp;·&nbsp;{project.period}
          </p>
        </motion.div>

        {/* Overview */}
        <Section label="overview" delay={0.12}>
          <div className="space-y-4">
            {isPlaceholder(project.overview)
              ? <p className="text-lg leading-relaxed"><Placeholder>{project.overview}</Placeholder></p>
              : project.overview.split('\n\n').map((para, i) => (
                  <p key={i} className="text-lg leading-relaxed" style={{ color: 'var(--text-body)' }}>{para}</p>
                ))}
          </div>
        </Section>

        {/* Contributions */}
        <Section label="key contributions" delay={0.18}>
          <BulletList items={project.contributions} />
        </Section>

        {/* Outcomes */}
        <Section label="outcomes & results" delay={0.24}>
          <BulletList items={project.outcomes} />
        </Section>

        {/* Challenges */}
        <Section label="challenges" delay={0.30}>
          <BulletList items={project.challenges} />
        </Section>

        {/* Engineering Insights */}
        {project.insights && (
          <Section label="engineering insights" delay={0.33}>
            <div className="space-y-4">
              {project.insights.split('\n\n').map((para, i) => (
                <p key={i} className="text-lg leading-relaxed" style={{ color: 'var(--text-body)' }}>{para}</p>
              ))}
            </div>
          </Section>
        )}

        {/* Technologies */}
        <Section label="tools & technologies" delay={0.36}>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-2.5 py-1 rounded"
                style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>

        {/* Links */}
        {(project.links?.github || project.links?.external || project.links?.report) && (
          <Section label="links" delay={0.42}>
            <div className="flex flex-wrap gap-6">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-sm" style={{ color: 'var(--accent)', transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                  GitHub →
                </a>
              )}
              {project.links.external && (
                <a href={project.links.external} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-sm" style={{ color: 'var(--accent)', transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                  Live Demo →
                </a>
              )}
              {project.links.report && (
                <a href={project.links.report} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-sm" style={{ color: 'var(--accent)', transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                  Report / Paper →
                </a>
              )}
            </div>
          </Section>
        )}

        {/* Prev / Next */}
        <motion.div
          className="flex justify-between pt-8 mt-4"
          style={{ borderTop: '1px solid var(--border)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {prev ? (
            <Link to={`/projects/${prev}`} className="font-mono text-sm"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              ← Previous
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/projects/${next}`} className="font-mono text-sm"
              style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              Next →
            </Link>
          ) : <span />}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProjectDetail;
