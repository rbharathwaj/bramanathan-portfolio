import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import GridBg from "./components/GridBg";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Travel from "./pages/Travel";
import TravelDetail from "./pages/TravelDetail";
import Hobbies from "./pages/Hobbies";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
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
        style={{ position: 'absolute', width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg)' }}
      >
        <Routes location={location}>
          <Route path="/"               element={<Home />} />
          <Route path="/experience"     element={<Experience />} />
          <Route path="/projects"       element={<Projects />} />
          <Route path="/projects/:id"   element={<ProjectDetail />} />
          <Route path="/about"          element={<About />} />
          <Route path="/about/travel"         element={<Travel />} />
          <Route path="/about/travel/:slug"   element={<TravelDetail />} />
          <Route path="/about/hobbies"        element={<Hobbies />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', position: 'relative' }}>
        <GridBg />
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <div style={{ position: 'relative' }}>
            <AnimatedRoutes />
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
