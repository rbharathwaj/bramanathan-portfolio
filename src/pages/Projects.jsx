import React from 'react';
// import ModelViewer from '../components/ModelViewer';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const Projects = () => {
  return (
    <motion.section
  className="min-h-screen p-10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white"
  variants={pageVariants}
  initial="initial"
  animate="animate"
  exit="exit"
>
      <h2 className="text-4xl font-bold mb-6">Projects</h2>
      <p className="mb-4 text-lg text-gray-300">Here's a real-time 3D model viewer.</p>
      <ModelViewer modelPath="/models/suzanne.glb" />
    </motion.section>
  );
};

export default Projects;
