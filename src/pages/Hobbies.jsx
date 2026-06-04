import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Multi-format image (tries all case/extension variants automatically) ───────
const EXTS = ['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG', '.webp', '.WEBP'];

const toBase = (src) => src ? src.replace(/\.(jpg|jpeg|JPG|JPEG|png|PNG|webp|WEBP)$/, '') : null;

const HobbyImage = ({ src, style = {} }) => {
  const base = toBase(src);
  const [idx, setIdx] = useState(0);
  const tryNext = useCallback(() => setIdx((i) => i + 1), []);

  if (!base) return <div style={{ width: '100%', height: '100%', ...style }} />;
  if (idx >= EXTS.length) return <div style={{ width: '100%', height: '100%', ...style }} />;

  return (
    <img
      src={`${base}${EXTS[idx]}`}
      alt=""
      onError={tryNext}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  );
};

// ── Tilted image card (no border) ─────────────────────────────────────────────
const ImageCard = ({ src, rotate, onClick }) => (
  <motion.div
    className="w-32 sm:w-[185px]"
    style={{
      rotate,
      cursor: 'pointer',
      borderRadius: '6px',
      overflow: 'hidden',
      aspectRatio: '2/3',
      boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
      flexShrink: 0,
      backgroundColor: 'var(--bg-card)',
    }}
    whileHover={{
      rotate: '0deg',
      scale: 1.07,
      y: -10,
      boxShadow: '0 24px 52px rgba(0,0,0,0.28)',
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    }}
    onClick={onClick}
  >
    <HobbyImage src={src} />
  </motion.div>
);

// ── Collection modal ──────────────────────────────────────────────────────────
const CollectionModal = ({ hobby, onClose }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        backgroundColor: 'rgba(0,0,0,0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '32px',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '760px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
              // {hobby.title.toLowerCase()} collection
            </p>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>{hobby.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-sm px-3 py-1.5 rounded"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', backgroundColor: 'transparent', cursor: 'pointer', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            esc
          </button>
        </div>

        {/* Collection grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {hobby.collection.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div style={{ borderRadius: '6px', overflow: 'hidden', aspectRatio: '2/3', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', marginBottom: '8px' }}>
                <HobbyImage src={item.src} />
              </div>
              {item.title && (
                <p className="font-mono text-xs leading-snug" style={{ color: 'var(--text-muted)' }}>{item.title}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Terminal block ────────────────────────────────────────────────────────────
const TerminalBlock = ({ sections }) => (
  <div className="font-mono mt-8 space-y-4">
    {sections.map((section, i) => (
      <div key={i}>
        <p className="text-sm uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
          // {section.label}
        </p>
        {section.items.map((item, j) => (
          <div key={j} className="flex items-start gap-2 mb-1 text-base">
            <span style={{ color: 'var(--accent)', flexShrink: 0 }}>{'>'}</span>
            <span style={{ color: 'var(--text-body)' }}>{item}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const HOBBIES = [
  {
    title: 'Gaming',
    tagline: 'A good game is a story you get to live in.',
    preview: [
      { src: '/hobbies/gaming/1', rotate: '-5deg' },
      { src: '/hobbies/gaming/2', rotate: '3deg' },
    ],
    collection: [
      { src: '/hobbies/gaming/1', title: 'Ghost of Yotei' },
      { src: '/hobbies/gaming/2', title: 'James Bond 007: First Light' },
      { src: '/hobbies/gaming/3', title: 'Ghost of Tsushima' },
      { src: '/hobbies/gaming/4', title: 'Elden Ring' },
      { src: '/hobbies/gaming/5', title: 'Overwatch' },
      { src: '/hobbies/gaming/6', title: 'Age of Empires' },
      { src: '/hobbies/gaming/7', title: 'Fortnite' },
      { src: '/hobbies/gaming/8', title: 'Cyberpunk 2077' },
    ],
    body: [
      "Gaming has been one of my favorite ways to relax for as long as I can remember. From spending hours playing classics like DX Ball and Road Rash as a kid to exploring massive open worlds and competitive multiplayer games today, it has remained a constant part of my life.",
      "What keeps me coming back is the incredible variety of experiences it offers. Some games tell unforgettable stories, some challenge your reflexes and decision making, and others simply let you explore worlds that feel alive. Over the years, I have enjoyed everything from fast paced FPS titles to expansive RPGs that can easily consume hundreds of hours.",
      "Ironically, gaming is also where I find relaxation, even when it does not always feel relaxing in the moment. Anyone who has spent hours fighting the same Elden Ring boss knows exactly what I mean. There is something strangely satisfying about overcoming a challenge that seemed impossible just a few attempts earlier.",
      "One thing I have come to appreciate is how much games can teach you. Many of my earliest introductions to history, mythology, geography, and different cultures came through RPGs and story driven games. They have a unique ability to make learning feel natural because you are experiencing the world rather than simply reading about it.",
      "For me, gaming is more than entertainment. It is a combination of storytelling, art, technology, problem solving, and shared experiences that continues to inspire curiosity and creativity in ways few other mediums can.",
    ],
    terminal: [
      { label: 'currently playing', items: ['James Bond 007: First Light'] },
      { label: 'recommend', items: ['Ghost of Yotei', 'Exit 8 — a small indie game that does a lot with very little'] },
    ],
    tags: ['Action RPG', 'Open World', 'Story-Driven'],
  },
  {
    title: 'Movies & Television',
    tagline: 'Great storytelling is an engineering problem too.',
    preview: [
      { src: '/hobbies/movies/1', rotate: '-3deg' },
      { src: '/hobbies/movies/2', rotate: '4deg' },
    ],
    collection: [
      { src: '/hobbies/movies/1', title: 'Interstellar' },
      { src: '/hobbies/movies/2', title: 'Game of Thrones' },
      { src: '/hobbies/movies/3', title: 'The Dark Knight' },
      { src: '/hobbies/movies/4', title: 'Inception' },
      { src: '/hobbies/movies/5', title: 'Ok Kanmani' },
      { src: '/hobbies/movies/6', title: 'Grown Ups' },
      { src: '/hobbies/movies/7', title: 'Avengers: Endgame' },
      { src: '/hobbies/movies/8', title: 'Avatar' },
      { src: '/hobbies/movies/9', title: 'Back to the Future' },
      { src: '/hobbies/movies/10', title: 'The Big Bang Theory' },
      { src: '/hobbies/movies/11', title: 'The Hangover' },
    ],
    body: [
      "Stories have always fascinated me, whether they are told through books, games, movies, or television. When it comes to films and shows, I am usually drawn to strong world building, memorable characters, and stories that make you think long after they are over.",
      "Science fiction has always been my favorite genre. I love the way it combines imagination, technology, and big questions about humanity and the future. Interstellar remains my all time favorite movie because it brings together everything I enjoy: science, emotion, incredible visuals, and a story that stays with you long after the credits roll. I am also a huge fan of Christopher Nolan and Steven Spielberg, whose films constantly push the boundaries of storytelling and cinematic experience.",
      "On the visual side, the Avatar films are some of the most breathtaking movies I have ever watched. The level of detail, world building, and visual immersion is something I find genuinely inspiring.",
      "While science fiction is usually my first choice, my watchlist is all over the place. I enjoy comedies, romantic comedies, action films, and pretty much anything with a compelling story. When I am looking to unwind, I often find myself watching sitcoms, and The Big Bang Theory will always have a special place for me. Beyond being entertaining, it was one of the first things that sparked my interest in physics, science, and engineering when I was younger.",
      "I recently finished Game of Thrones, and yes, I know I am very late to the party. What impressed me most was the sheer scale of the world, the political complexity, and how interconnected every character and storyline felt across multiple seasons. It was one of the most immersive television experiences I have had. That said, I still have not fully recovered from the last few episodes, and I am not sure I ever will.",
      "For me, movies and television are more than just entertainment. They are a way to explore new worlds, experience different perspectives, and occasionally find inspiration in places you least expect.",
    ],
    terminal: [
      { label: 'all time favorite', items: ['Interstellar'] },
      { label: 'recently finished', items: ['Game of Thrones (Seasons 1–8) — just pretend it ends at season 7'] },
    ],
    tags: ['Sci-Fi', 'Drama', 'Fantasy', 'Film', 'Sitcom'],
  },
  {
    title: 'Reading',
    tagline: 'The best way to think bigger is to learn from people who already do.',
    preview: [
      { src: '/hobbies/reading/1', rotate: '3deg' },
      { src: '/hobbies/reading/4', rotate: '-4deg' },
    ],
    collection: [
      { src: '/hobbies/reading/1', title: 'The Theory of Everything — Stephen Hawking' },
      { src: '/hobbies/reading/2', title: 'The Science of Interstellar — Kip Thorne' },
      { src: '/hobbies/reading/3', title: 'The Great Gatsby — F. Scott Fitzgerald' },
      { src: '/hobbies/reading/4', title: 'Percy Jackson Saga — Rick Riordan' },
      { src: '/hobbies/reading/5', title: 'The Subtle Art of Not Giving a F*ck — Mark Manson' },
    ],
    body: [
      "Reading was a big part of my childhood. Every week, my mom would take me to the local library, and I would come home with a new book to read. It was one of the things I looked forward to most growing up and played a huge role in shaping my curiosity about the world.",
      "While I do not read as much as I would like to these days, it is a habit I have been trying to rediscover. I am naturally drawn to books about science, physics, technology, and big ideas, especially those that challenge the way we think about the universe and our place in it.",
      "At the same time, some of my earliest memories of reading come from fiction series like Percy Jackson, which made reading feel like an adventure rather than a task.",
      "One book that has been on my list for a long time is The Science of Interstellar by Kip Thorne. Since Interstellar is my favorite movie, I have always wanted to explore the science behind one of the stories that inspired my interest in physics and engineering.",
      "Right now, I am reading The Theory of Everything by Stephen Hawking and slowly rebuilding the habit that first started with those weekly trips to the library.",
    ],
    terminal: [
      { label: 'currently reading', items: ['The Theory of Everything — Stephen Hawking'] },
    ],
    tags: ['Science', 'Physics', 'Cosmology', 'Non-fiction', 'Fiction'],
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
const Hobbies = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <motion.div
      className="min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text-body)' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-24 py-24 lg:py-32">

        {/* Header */}
        <motion.div className="mb-16" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center mb-3">
            <span className="font-mono text-xl mr-4" style={{ color: 'var(--accent)' }}>01.</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{ color: 'var(--text-heading)' }}>Hobbies & Interests</h1>
            <div className="ml-8 h-px flex-1" style={{ backgroundColor: 'var(--border-hover)' }} />
          </div>
          <p className="ml-12 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
            What I do when I'm not designing or simulating
          </p>
        </motion.div>

        {/* Hobby sections */}
        <div className="space-y-28">
          {HOBBIES.map((hobby, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
            >
              <p className="font-mono text-sm uppercase tracking-widest mb-10" style={{ color: 'var(--accent)' }}>
                // {hobby.title.toLowerCase()}
              </p>

              <div style={{ overflow: 'hidden' }}>
                {/* Preview images — float on desktop, stack on mobile */}
                <div
                  className={`flex gap-4 items-start mb-6 ${index % 2 === 1 ? 'lg:float-right lg:ml-14' : 'lg:float-left lg:mr-14'}`}
                >
                  {hobby.preview.map((item, i) => (
                    <ImageCard
                      key={i}
                      src={item.src}
                      rotate={item.rotate}
                      onClick={() => setOpenIdx(index)}
                    />
                  ))}
                </div>

                {/* Text flows around and beneath the images */}
                <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
                  {hobby.title}
                </h2>
                <p className="font-mono text-sm mb-6" style={{ color: 'var(--accent)' }}>
                  {hobby.tagline}
                </p>
                <div className="space-y-4 text-lg leading-relaxed" style={{ color: 'var(--text-body)' }}>
                  {hobby.body.map((para, pi) => <p key={pi}>{para}</p>)}
                </div>
                <TerminalBlock sections={hobby.terminal} />
                <div className="flex flex-wrap gap-2 mt-6">
                  {hobby.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs px-2.5 py-1 rounded"
                      style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setOpenIdx(index)}
                  className="font-mono text-xs mt-6 flex items-center gap-2"
                  style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  view full collection →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Collection modal */}
      <AnimatePresence>
        {openIdx !== null && (
          <CollectionModal
            hobby={HOBBIES[openIdx]}
            onClose={() => setOpenIdx(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Hobbies;
