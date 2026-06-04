import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { BUCKET_LIST } from '../data/travelPlaces';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

const VISITED_IDS = new Set([826, 702, 704, 840, 356]);

const COUNTRY_PLACES = {
  826: { name: 'United Kingdom', places: ['Leeds', 'Liverpool', 'London', 'Manchester', 'York'] },
  840: { name: 'United States',  places: ['Atlanta, GA', 'Chicago, IL', 'Las Vegas, NV', 'Nashville, TN', 'New York City, NY', 'Orlando, FL', 'Seattle, WA'] },
  704: { name: 'Vietnam',        places: ['Da Nang', 'Hanoi', 'Ho Chi Minh City'] },
  702: { name: 'Singapore',      places: [] },
};

// Singapore is ~2px at this map scale — needs an explicit marker for hover
const SMALL_COUNTRIES = [
  { id: 702, coords: [103.82, 1.35] },
];

// ── Typed section title ───────────────────────────────────────────────────────
const TypedTitle = ({ text, delay = 0 }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const tick = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(tick);
      }, 55);
      return () => clearInterval(tick);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay]);
  const typing = displayed.length < text.length;
  return (
    <p className="font-mono text-base uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
      {displayed}
      {typing && (
        <span style={{
          display: 'inline-block', width: '7px', height: '13px',
          backgroundColor: 'var(--accent)', marginLeft: '2px',
          verticalAlign: 'middle', animation: 'blink 1s step-end infinite',
        }} />
      )}
    </p>
  );
};

// ── Bucket list typed on one line ─────────────────────────────────────────────
const BucketListTyped = ({ items, startDelay = 0 }) => {
  const fullText = items.join('   ·   ');
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const tick = setInterval(() => {
        i++;
        setDisplayed(fullText.slice(0, i));
        if (i >= fullText.length) { clearInterval(tick); setDone(true); }
      }, 42);
      return () => clearInterval(tick);
    }, startDelay);
    return () => clearTimeout(start);
  }, [fullText, startDelay]);
  return (
    <div className="font-mono text-sm flex items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
      <span style={{ color: 'var(--accent)' }}>{'>'}</span>
      <span>{displayed}</span>
      {!done && (
        <span style={{
          display: 'inline-block', width: '6px', height: '11px',
          backgroundColor: 'var(--accent)',
          verticalAlign: 'middle', animation: 'blink 1s step-end infinite',
        }} />
      )}
    </div>
  );
};

// ── Postcard — auto-detects portrait vs landscape, hover pop ─────────────────
const EXTS_RAW = ['.jpg', '.jpeg', '.JPG', '.JPEG'];

const Postcard = ({ src, location, index }) => {
  const [extIdx, setExtIdx]   = useState(0);
  const [portrait, setPortrait] = useState(false);
  const tryNext = useCallback(() => setExtIdx(p => p + 1), []);
  const onLoad  = useCallback((e) => {
    setPortrait(e.target.naturalHeight > e.target.naturalWidth);
  }, []);

  const base = src || null;
  const failed = !base || extIdx >= EXTS_RAW.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.025, y: -8, boxShadow: '0 28px 56px rgba(0,0,0,0.22)' }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '10px',
        aspectRatio: portrait ? '3/4' : '16/9',
        boxShadow: '0 6px 20px rgba(0,0,0,0.10)',
        backgroundColor: 'var(--bg-card)',
        cursor: 'default',
      }}
    >
      {!failed && (
        <img
          src={`${base}${EXTS_RAW[extIdx]}`}
          alt=""
          onError={tryNext}
          onLoad={onLoad}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
      {location && !failed && (
        <div
          className="absolute bottom-0 left-0 right-0 p-5"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
        >
          <p className="font-mono text-sm text-white">{location}</p>
        </div>
      )}
    </motion.div>
  );
};

const POSTCARDS = [
  { src: '/travel/chi1',  location: 'Chicago, IL' },
  { src: '/travel/chi2',  location: 'Chicago, IL' },
  { src: '/travel/sg1',   location: 'Singapore' },
  { src: '/travel/sg2',   location: 'Singapore' },
  { src: '/travel/vt1',   location: 'Vietnam' },
  { src: '/travel/vt2',   location: 'Vietnam' },
  { src: '/travel/alt1',  location: 'Atlanta, GA' },
];

// ── World map ─────────────────────────────────────────────────────────────────
const WorldMap = ({ hoveredId, onEnter, onLeave }) => (
  <ComposableMap
    projection="geoMercator"
    projectionConfig={{ scale: 130, center: [0, 20] }}
    width={800}
    height={500}
    style={{ width: '100%', height: 'auto', display: 'block' }}
  >
    <Geographies geography={GEO_URL}>
      {({ geographies }) =>
        geographies
          .filter(geo => Number(geo.id) !== 10)
          .map((geo) => {
            const id = Number(geo.id);
            const visited = VISITED_IDS.has(id);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => visited && onEnter(id)}
                onMouseLeave={() => visited && onLeave()}
                style={{
                  default: {
                    fill: visited ? 'var(--accent)' : 'var(--map-land)',
                    fillOpacity: visited ? 0.72 : 1,
                    stroke: 'var(--bg)',
                    strokeWidth: 0.5,
                    outline: 'none',
                    cursor: visited ? 'pointer' : 'default',
                  },
                  hover: {
                    fill: visited ? 'var(--accent)' : 'var(--map-land)',
                    fillOpacity: 1,
                    stroke: 'var(--bg)',
                    strokeWidth: 0.5,
                    outline: 'none',
                    cursor: visited ? 'pointer' : 'default',
                  },
                  pressed: { outline: 'none' },
                }}
              />
            );
          })
      }
    </Geographies>

    {/* Explicit dots for city-states too small to hover reliably */}
    {SMALL_COUNTRIES.map(({ id, coords }) => (
      <Marker key={id} coordinates={coords}>
        <circle
          r={5}
          style={{
            fill: 'var(--accent)',
            fillOpacity: hoveredId === id ? 1 : 0.75,
            stroke: 'var(--bg)',
            strokeWidth: 0.8,
            cursor: 'pointer',
          }}
          onMouseEnter={() => onEnter(id)}
          onMouseLeave={() => onLeave()}
        />
      </Marker>
    ))}
  </ComposableMap>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const Travel = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const timerRef = useRef(null);

  const onEnter = (id) => {
    clearTimeout(timerRef.current);
    setHoveredId(id);
  };
  const onLeave = () => {
    timerRef.current = setTimeout(() => setHoveredId(null), 220);
  };

  const hoveredData = hoveredId !== null ? COUNTRY_PLACES[hoveredId] : null;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-body)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-24 lg:py-32">

        {/* Header */}
        <motion.div className="mb-16" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center mb-3">
            <span className="font-mono text-xl mr-4" style={{ color: 'var(--accent)' }}>02.</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: 'var(--text-heading)' }}>
              Travel & Photography
            </h1>
            <div className="ml-8 h-px flex-1" style={{ backgroundColor: 'var(--border-hover)' }} />
          </div>
          <p className="ml-12 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
            Places I've been, things I've seen
          </p>
        </motion.div>

        {/* Why I travel — centred */}
        <motion.div className="mb-10 text-center mx-auto max-w-6xl px-2 sm:px-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <p className="font-mono text-base uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>// why I travel</p>
          <div className="space-y-5 text-xl leading-relaxed" style={{ color: 'var(--text-body)' }}>
            <p>
              Traveling, for me, has always been driven by curiosity. There is something exciting about stepping
              into a place you have never been before, navigating unfamiliar streets, trying food you have never
              heard of, or simply observing how differently people live their everyday lives. It has a way of
              making the world feel both larger and more connected at the same time.
            </p>
            <p>
              Every destination leaves me with something new. London gave me an appreciation for how history and
              modern life can coexist. Vietnam changed the way I think about cities and culture. The Andaman
              Islands reminded me that some places still exist largely on their own terms. I travel to collect
              those experiences, not just the landmarks, but the moments and perspectives that stay with you long
              after the trip ends.
            </p>
            <p>
              What I enjoy most, though, is traveling with friends. Over time, I have realized that the
              destination is only part of the experience. The company often matters even more. Whether it is
              getting lost in a new city, taking the wrong train, discovering an unexpected place, or laughing
              over something that made absolutely no sense at the time, those moments become the stories we keep
              telling years later. Every trip leaves us with a collection of great memories, questionable
              decisions, inside jokes, and unforgettable experiences that stay with us far longer than any
              itinerary ever could.
            </p>
            <p>
              For me, travel is not just about seeing new places. It is about the people you share those
              experiences with and the memories you create together along the way.
            </p>
          </div>
        </motion.div>

        {/* Bucket list — typed single line */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="font-mono text-base uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>// bucket list</p>
          <BucketListTyped items={BUCKET_LIST} startDelay={400} />
        </motion.div>

        {/* World map */}
        <motion.div
          className="mb-20 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <WorldMap hoveredId={hoveredId} onEnter={onEnter} onLeave={onLeave} />

          {/* Floating popup — desktop only, hidden on mobile (no hover on touch) */}
          <div className="hidden sm:block">
          <AnimatePresence>
            {hoveredData && (
              <motion.div
                key={hoveredId}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  top: '8%',
                  right: '2%',
                  minWidth: '200px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '18px 20px',
                  pointerEvents: 'none',
                }}
              >
                <p className={`font-mono text-xs uppercase tracking-widest ${hoveredData.places.length ? 'mb-3' : ''}`} style={{ color: 'var(--accent)' }}>
                  // {hoveredData.name.toLowerCase()}
                </p>
                {hoveredData.places.length > 0 && (
                  <div className="space-y-1.5">
                    {hoveredData.places.map((place) => (
                      <div key={place} className="flex items-start gap-2">
                        <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--accent)', flexShrink: 0 }}>{'>'}</span>
                        <span className="font-mono text-sm leading-snug" style={{ color: 'var(--text-body)' }}>{place}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </motion.div>

        {/* Photography */}
        <motion.div
          className="mb-16 text-center mx-auto max-w-6xl px-2 sm:px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-base uppercase tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
            // photography
          </p>
          <div className="space-y-5 text-xl leading-relaxed" style={{ color: 'var(--text-body)' }}>
            <p>
              Photography has been a part of my life since childhood, when my aunt gifted my family our first
              camera. Since then, it has become one of my favorite ways to experience the world. It forces you
              to slow down, pay attention, and truly observe what is around you instead of simply passing
              through it.
            </p>
            <p>
              What fascinates me most about photography is how much there is to learn beyond simply pressing a
              shutter button. Many people only experience photography in automatic mode, but the real magic
              begins when you take control yourself. Aperture, shutter speed, ISO, focal length, composition,
              and light all become variables you can manipulate to create entirely different results from the
              same scene.
            </p>
            <p>
              In many ways, photography feels like a science experiment. You can change a single setting and
              completely transform the outcome. No two moments are ever truly the same, and even a scene
              photographed seconds apart can produce a different image. That constant balance between technical
              understanding and creative expression is what keeps me coming back to it.
            </p>
            <p>
              Photography has also shaped the way I travel and explore the world. It encourages me to notice
              details, anticipate moments, and appreciate places in a way I otherwise might not. Whether I am
              walking through a city, watching wildlife, or looking up at a night sky full of stars, a camera
              gives me a reason to slow down and observe.
            </p>
            <p>
              One day, I hope to pursue this passion more seriously and explore wildlife, travel, astrophotography,
              and sports photography. Until then, it remains one of the most rewarding ways I learn, create,
              and connect with the world around me.
            </p>
          </div>
        </motion.div>

        {/* Postcards */}
        <div className="max-w-2xl mx-auto space-y-8">
          {POSTCARDS.map((card, i) => (
            <Postcard key={i} src={card.src} location={card.location} index={i} />
          ))}
        </div>


      </div>
    </div>
  );
};

export default Travel;
