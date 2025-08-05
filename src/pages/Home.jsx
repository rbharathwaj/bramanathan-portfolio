// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
// import ModelViewer from '../components/ModelViewer'; // ❌ Fully disabled

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <ModelViewer modelPath="/models/lattice.obj" /> */}
    </div>
  );
};

export default Home;
