/* import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useLoader } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const Model = () => {
  const obj = useLoader(OBJLoader, '/models/lattice.obj'); // Path to your .obj file
  return <primitive object={obj} scale={1.5} position={[0, -1, 0]} />;
};

const HeroModel = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 30 }}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <Model />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.6}
        />
      </Suspense>
    </Canvas>
  );
};

export default HeroModel;
*/