import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [otherProjects, setOtherProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        const projectPaths = [
          '/projects/project 1 - prenac tools/project-info.json',
          '/projects/project 2 - lattice coldplate/project-info.json', 
          '/projects/project 3 - ev battery/project-info.json'
        ];

        const projectPromises = projectPaths.map(async (path) => {
          const response = await fetch(path);
          return response.json();
        });

        const projects = await Promise.all(projectPromises);
        
        const featured = projects.filter(project => project.featured).sort((a, b) => a.order - b.order);
        const others = projects.filter(project => !project.featured).sort((a, b) => a.order - b.order);
        
        setFeaturedProjects(featured);
        setOtherProjects(others);
        setLoading(false);
      } catch (error) {
        console.error('Error loading project data:', error);
        setLoading(false);
      }
    };

    loadProjectData();
  }, []);

  const ImageGallery = ({ images, projectId, title }) => {
    const currentIndex = currentImageIndex[projectId] || 0;
    
    const nextImage = () => {
      setCurrentImageIndex(prev => ({
        ...prev,
        [projectId]: (currentIndex + 1) % images.length
      }));
    };
    
    const prevImage = () => {
      setCurrentImageIndex(prev => ({
        ...prev,
        [projectId]: currentIndex === 0 ? images.length - 1 : currentIndex - 1
      }));
    };

    return (
      <div className="relative group">
        <div className="bg-[#64ffda]/20 rounded-lg overflow-hidden aspect-video border border-[#64ffda]/30">
          <img
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#0a192f]/80 text-[#64ffda] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#0a192f]"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#0a192f]/80 text-[#64ffda] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#0a192f]"
              >
                →
              </button>
              
              {/* Image counter */}
              <div className="absolute bottom-2 right-2 bg-[#0a192f]/80 text-[#64ffda] px-2 py-1 rounded text-sm font-mono">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-[#64ffda]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    );
  };

  if (loading) {
    return (
      <motion.div
        className="min-h-screen w-full overflow-hidden flex items-center justify-center"
        style={{
          backgroundColor: '#0a192f',
          color: '#8892b0',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <div className="text-[#64ffda] text-6xl mb-4">⚙️</div>
          <p className="font-mono text-[#64ffda]">Loading Projects...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen w-full overflow-hidden"
      style={{
        backgroundColor: '#0a192f',
        color: '#8892b0',
      }}
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 60, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Mouse Follow Gradient Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-24 lg:py-32">
        
        {/* Section Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center mb-8">
            <span className="text-[#64ffda] font-mono text-xl mr-4">02.</span>
            <h1 className="text-[#ccd6f6] text-3xl sm:text-4xl lg:text-5xl font-bold">Things I've Built</h1>
            <div className="ml-8 h-px bg-[#64ffda]/30 flex-1 max-w-xs"></div>
          </div>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24 mb-32">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`grid lg:grid-cols-12 gap-8 items-center ${
                index % 2 === 1 ? 'lg:text-right' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              
              {/* Project Image Gallery */}
              <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-6' : ''}`}>
                <ImageGallery 
                  images={project.images} 
                  projectId={project.id} 
                  title={project.title} 
                />
              </div>

              {/* Project Info */}
              <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div>
                  <p className="text-[#64ffda] font-mono text-sm mb-2">Featured Project</p>
                  <h3 className="text-[#ccd6f6] text-2xl lg:text-3xl font-bold mb-2">{project.title}</h3>
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-mono ${
                      project.type === 'corporate' 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                        : project.type === 'academic' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {project.company} • {project.role}
                    </span>
                  </div>
                  
                  {/* Description Box */}
                  <div className="bg-[#112240] p-6 rounded-lg shadow-lg mb-6 border border-[#64ffda]/10">
                    <p className="text-[#8892b0] leading-relaxed">{project.description}</p>
                  </div>

                  {/* Technologies */}
                  <div className={`flex flex-wrap gap-3 mb-6 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-sm text-[#8892b0] bg-[#64ffda]/10 px-3 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Other Notable Projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#ccd6f6] text-2xl lg:text-3xl font-bold text-center mb-12">
              Other Noteworthy Projects
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-[#112240] p-6 rounded-lg border border-[#64ffda]/20 hover:border-[#64ffda]/40 transition-all duration-300 hover:-translate-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Content */}
                  <h3 className="text-[#ccd6f6] text-xl font-semibold mb-2">{project.title}</h3>
                  <div className="mb-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-mono ${
                      project.type === 'corporate' 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : project.type === 'academic' 
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {project.company} • {project.role}
                    </span>
                  </div>
                  <p className="text-[#8892b0] text-sm mb-6 leading-relaxed">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs text-[#8892b0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>

      {/* Grid Background Patterns */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.12) 2px, transparent 2px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.12) 2px, transparent 2px)
          `,
          backgroundSize: '120px 120px',
        }}
      />

    </motion.div>
  );
};

export default Projects;