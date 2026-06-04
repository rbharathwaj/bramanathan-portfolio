import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PLACES } from '../data/travelPlaces';
import FlagStamp from '../components/FlagStamp';

const MAX_PHOTOS = 30;

// ── Photo gallery (sequential auto-load, supports .jpg and .jpeg) ────────────
const PhotoGallery = ({ slug }) => {
  const [photos, setPhotos] = useState([]); // [{ idx, ext }]

  useEffect(() => {
    let cancelled = false;
    setPhotos([]);

    const tryNext = (idx) => {
      if (idx > MAX_PHOTOS || cancelled) return;
      const tryExt = (ext) => {
        const img = new Image();
        img.onload = () => {
          if (cancelled) return;
          setPhotos((prev) => [...prev, { idx, ext }]);
          tryNext(idx + 1);
        };
        img.onerror = () => {
          if (ext === '.jpg')   tryExt('.jpeg');
          else if (ext === '.jpeg') tryExt('.JPG');
          else if (ext === '.JPG')  tryExt('.JPEG');
          // else: no more photos at this index
        };
        img.src = `/travel/${slug}/${idx}${ext}`;
      };
      tryExt('.jpg');
    };

    tryNext(1);
    return () => { cancelled = true; };
  }, [slug]);

  if (photos.length === 0) return null;

  return (
    <section>
      <h2 className="text-xs font-mono uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
        // photos
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        {photos.map(({ idx, ext }) => (
          <motion.div
            key={idx}
            className="rounded-lg overflow-hidden"
            style={{ aspectRatio: '3/2', position: 'relative' }}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <img
              src={`/travel/${slug}/${idx}${ext}`}
              alt={`Photo ${idx}`}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// ── Placeholder-aware content block ──────────────────────────────────────────
const ContentBlock = ({ label, text }) => {
  if (!text) return null;
  const isPlaceholder = text.startsWith('[');
  return (
    <section>
      <h2 className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
        // {label}
      </h2>
      {isPlaceholder ? (
        <p className="font-mono text-sm px-3 py-2 rounded"
          style={{ backgroundColor: 'rgba(245,158,11,0.08)', color: '#d97706', border: '1px dashed rgba(245,158,11,0.35)' }}>
          {text}
        </p>
      ) : (
        <p className="text-base leading-relaxed" style={{ color: 'var(--text-body)', textAlign: 'justify' }}>
          {text}
        </p>
      )}
    </section>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const TravelDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const place = PLACES.find((p) => p.slug === slug);

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <p className="font-mono" style={{ color: 'var(--text-muted)' }}>Place not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-body)' }}>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-12 space-y-14" style={{ paddingTop: '96px' }}>

        {/* Back */}
        <motion.button
          onClick={() => navigate('/about/travel')}
          className="flex items-center gap-2 font-mono text-sm"
          style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ x: -4 }}
        >
          ← back to travel
        </motion.button>

        {/* Large postcard card */}
        <motion.div
          className="mx-auto"
          style={{ maxWidth: '640px' }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: '0 12px 48px rgba(0,0,0,0.13), 0 4px 12px rgba(0,0,0,0.08)',
          }}>
            {/* Photo — 4/3 ratio, no crop issues */}
            <CoverPhoto slug={place.slug} tint={place.tint} />

            {/* Info strip */}
            <div style={{
              display: 'flex',
              alignItems: 'stretch',
              borderTop: '1px solid var(--border)',
              minHeight: '84px',
            }}>
              <div style={{
                flex: 1, padding: '14px 20px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px',
                minWidth: 0,
              }}>
                <p style={{
                  fontWeight: 700, fontSize: '18px', lineHeight: 1.2,
                  color: 'var(--text-heading)',
                }}>
                  {place.name}
                </p>
                <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)' }}>
                  {place.region}
                </p>
              </div>

              <div style={{ width: '1px', backgroundColor: 'var(--border)', margin: '12px 0', flexShrink: 0 }} />

              <div style={{ width: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FlagStamp flagCode={place.flagCode} region={place.region} size={50} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Written sections */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContentBlock label="memories"          text={place.content?.memories} />
          <ContentBlock label="recommendations"   text={place.content?.recommendations} />
          <ContentBlock label="tips for visitors" text={place.content?.tips} />
        </motion.div>

        {/* Photo gallery */}
        <PhotoGallery slug={place.slug} />
      </div>
    </div>
  );
};

// ── Cover photo (4/3, tries .jpg then .jpeg) ──────────────────────────────────
const CoverPhoto = ({ slug, tint }) => {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(`/travel/${slug}/cover.jpg`);
  return (
    <div style={{
      width: '100%', aspectRatio: '4/3',
      overflow: 'hidden', backgroundColor: tint || 'var(--bg-card)',
      position: 'relative',
    }}>
      <img
        src={src}
        alt="Cover"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (src.endsWith('.jpg'))        setSrc(`/travel/${slug}/cover.jpeg`);
          else if (src.endsWith('.jpeg'))  setSrc(`/travel/${slug}/cover.JPG`);
          else if (src.endsWith('.JPG'))   setSrc(`/travel/${slug}/cover.JPEG`);
        }}
      />
    </div>
  );
};

export default TravelDetail;
