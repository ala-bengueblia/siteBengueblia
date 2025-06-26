import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiPhp,
  SiMysql,
  SiFlask,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPython,
  SiDocker,
} from 'react-icons/si';
import { FiKey, FiCamera, FiServer } from 'react-icons/fi';
import './Projects.css';

const projects = [
  {
    id: 'sports-sale',
    title: 'Sports Sale Website',
    shortDesc: 'E-commerce platform to sell sports products using HTML, CSS, JS & PHP.',
    techStack: [
      { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
      { name: 'CSS3', icon: <SiCss3 />, color: '#1572B6' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: 'PHP', icon: <SiPhp />, color: '#777BB4' },
      { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
    ],
    details: `E-commerce website for sports gear:
- Product pages, shopping cart, and checkout process.
- User authentication and profile management.
- Admin panel in PHP to manage inventory and orders.
- Fully responsive design for all devices.`,
    demoUrl: 'https://youtu.be/Ou9LNqssj0Q',
    moreLink: null,
  },
  {
    id: 'face-recognition',
    title: 'Facial Recognition System',
    shortDesc: 'Facial recognition using Flask, OpenCV, face_recognition, NumPy, and REST API.',
    techStack: [
      { name: 'Flask', icon: <SiFlask />, color: '#000000' },
      { name: 'OpenCV', icon: <FiCamera />, color: '#5C3EE8' },
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'REST API', icon: <FiServer />, color: '#4A90E2' },
      { name: 'NumPy', icon: <SiPython />, color: '#3776AB' },
    ],
    details: `AI-powered facial recognition system:
- RESTful API with Flask backend.
- Image processing and face detection with OpenCV and face_recognition.
- Facial database handling and training setup.
- Embeddings and data manipulation via NumPy.`,
    demoUrl: 'https://youtu.be/coYwEcQbj4E',
    moreLink: null,
  },
  {
    id: 'sotupub-management',
    title: 'Candidate & Admin Management System',
    shortDesc: 'A full-stack platform using React, Node.js, Express, MongoDB, bcrypt & JWT.',
    techStack: [
      { name: 'React', icon: <SiReact />, color: '#61DAFB' },
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
      { name: 'Express', icon: <SiExpress />, color: '#000000' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
      { name: 'bcrypt', icon: <FiKey />, color: '#555555' },
      { name: 'JWT', icon: <FiKey />, color: '#555555' },
    ],
    details: `Internal candidate management tool:
- React dashboards for admins and applicants.
- Backend with Node.js and Express connected to MongoDB.
- Secure login system using bcrypt for hashing and JWT for sessions.
- Role-based access control and admin functionalities.`,
    demoUrl: null,
    moreLink: null,
  },
  {
    id: 'securepix',
    title: 'SecurePix Image Authentication',
    shortDesc: 'Anomaly detection using MOCCA, with React frontend, Node.js backend, Flask AI, and chatbot.',
    techStack: [
      { name: 'React', icon: <SiReact />, color: '#61DAFB' },
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
      { name: 'Flask', icon: <SiFlask />, color: '#000000' },
      { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
      { name: 'Chatbot', icon: <SiJavascript />, color: '#F7DF1E' },
    ],
    details: `SecurePix platform:
- Frontend built with React for uploading and viewing results.
- Node.js backend handling requests and managing services.
- AI microservice with Flask using MOCCA for image forgery detection.
- Integrated chatbot for real-time user assistance.`,
    demoUrl: 'https://youtu.be/Ou9LNqssj0Q',
    moreLink: null,
  },
];

export default function Projects() {
  const [selected, setSelected] = useState(null);

  // Framer Motion variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };

  return (
    <div className="projects-wrapper">
      <div className="projects-decor" aria-hidden="true" />

      <motion.div
        className="projects-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 className="projects-title" variants={cardVariants}>
          <span className="gradient-text">My Projects</span>
          <motion.span
            className="projects-underline"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.3 }}
          />
        </motion.h2>

        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              className="project-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
            >
              <div
                className="project-card-top-border"
                style={{
                  background: `linear-gradient(90deg, ${proj.techStack[0].color}, ${proj.techStack[proj.techStack.length - 1].color})`,
                }}
              />

              <div className="project-card-content">
                <h3 className="project-card-title">{proj.title}</h3>
                <p className="project-shortdesc">{proj.shortDesc}</p>

                <div className="project-tech-logos">
                  {proj.techStack.map((tech, i) => (
                    <motion.div
                      key={i}
                      className="tech-logo-pill"
                      title={tech.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 120 }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      style={{
                        background: `rgba(${hexToRgb(tech.color)}, 0.15)`,
                        color: tech.color,
                      }}
                    >
                      {tech.icon}
                      <span className="tech-name">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  className="project-button"
                  onClick={() => setSelected(proj)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-overlay"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal-content"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelected(null)}>
                &times;
              </button>
              <h2 className="modal-title">
                <span className="gradient-text">{selected.title}</span>
              </h2>
              <div className="modal-body">
                <p className="modal-details">{selected.details}</p>
                <div className="modal-techstack">
                  <h4>Technologies:</h4>
                  <div className="modal-tech-logos">
                    {selected.techStack.map((tech, i) => (
                      <div
                        key={i}
                        className="modal-tech-item"
                        title={tech.name}
                        style={{
                          background: `rgba(${hexToRgb(tech.color)}, 0.15)`,
                          color: tech.color,
                        }}
                      >
                        {tech.icon}
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Demo: YouTube iframe or local video */}
                {selected.demoUrl && (
                  <div className="modal-video">
                    <h4 className="gradient-text">Demo:</h4>
                    {(selected.demoUrl.includes('youtu.be') ||
                      selected.demoUrl.includes('youtube.com')) ? (
                      <div className="video-embed">
                        <iframe
                          width="560"
                          height="315"
                          src={
                            selected.demoUrl.includes('youtu.be')
                              ? `https://www.youtube.com/embed/${selected.demoUrl.split('/').pop()}`
                              : selected.demoUrl.replace('watch?v=', 'embed/')
                          }
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <video src={selected.demoUrl} controls className="project-video">
                        Your browser does not support the video.
                      </video>
                    )}
                  </div>
                )}

                {selected.moreLink && (
                  <div className="modal-more">
                    <a href={selected.moreLink} target="_blank" rel="noopener noreferrer">
                      View Live
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Utility to convert hex to "r, g, b"
function hexToRgb(hex) {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(cleaned, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}
