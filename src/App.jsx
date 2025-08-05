import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    x: 60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    },
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: 'absolute',
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#0a192f', // Ensure dark background during transition
        }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div 
      style={{ 
        backgroundColor: '#0a192f', // Dark background for entire app
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <BrowserRouter>
        <Navbar />
        <div style={{ position: 'relative' }}>
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </div>
  );
}