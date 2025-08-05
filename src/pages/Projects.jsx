import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // TEMPLATE DATA - Replace with your actual projects
  const featuredProjects = [
    {
      id: 1,
      title: "Your Amazing Project #1",
      description: "Brief description of your project. Talk about the engineering challenge, your approach, and the impact. Keep it concise but compelling.",
      technologies: ["SolidWorks", "ANSYS", "Python", "FEA"],
      image: "placeholder", // Replace with actual image path
      github: "https://github.com/your-username/project",
      external: "https://your-project-demo.com",
      featured: true
    },
    {
      id: 2,
      title: "Your Amazing Project #2", 
      description: "Another cool engineering project description. Highlight the technical skills, innovation, and results achieved.",
      technologies: ["MATLAB", "Abaqus", "CAD", "Simulation"],
      image: "placeholder",
      github: "https://github.com/your-username/project2",
      external: "https://your-project-demo2.com",
      featured: true
    },
    {
      id: 3,
      title: "Your Amazing Project #3",
      description: "Third project description focusing on your problem-solving approach and technical achievements.",
      technologies: ["nTopology", "Additive Manufacturing", "Optimization"],
      image: "placeholder", 
      github: "https://github.com/your-username/project3",
      external: null,
      featured: true
    }
  ];

  const otherProjects = [
    {
      title: "Side Project A",
      description: "Quick description of a smaller project or academic work.",
      technologies: ["Python", "Data Analysis"],
      github: "https://github.com/your-username/side-project-a",
      external: null
    },
    {
      title: "Side Project B", 
      description: "Another interesting project or research work worth mentioning.",
      technologies: ["MATLAB", "Signal Processing"],
      github: "https://github.com/your-username/side-project-b",
      external: null
    },
    {
      title: "Side Project C",
      description: "Academic or personal project that demonstrates your skills.",
      technologies: ["CAD", "3D Printing"],
      github: null,
      external: "https://example.com"
    }
  ];

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
              
              {/* Project Image */}
              <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-6' : ''}`}>
                <div className="relative group">
                  <div className="bg-[#64ffda]/20 rounded-lg overflow-hidden aspect-video flex items-center justify-center border border-[#64ffda]/30">
                    {/* Placeholder - Replace with actual image */}
                    <div className="text-center">
                      <div className="text-6xl mb-4">🔧</div>
                      <p className="font-mono text-[#64ffda]">Project Image</p>
                      <p className="text-sm text-[#8892b0] mt-2">Replace with actual screenshot/demo</p>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#64ffda]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Project Info */}
              <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div>
                  <p className="text-[#64ffda] font-mono text-sm mb-2">Featured Project</p>
                  <h3 className="text-[#ccd6f6] text-2xl lg:text-3xl font-bold mb-4">{project.title}</h3>
                  
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

                  {/* Links */}
                  <div className={`flex space-x-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300"
                      >
                        <span className="text-xl">📁</span>
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300"
                      >
                        <span className="text-xl">🔗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Other Notable Projects */}
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
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[#64ffda] text-3xl">📂</div>
                  <div className="flex space-x-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300"
                      >
                        <span className="text-lg">📁</span>
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300"
                      >
                        <span className="text-lg">🔗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-[#ccd6f6] text-xl font-semibold mb-3">{project.title}</h3>
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