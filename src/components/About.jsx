// src/components/About.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import avatar from '../assets/ala.jpg'; // Ensure optimized size and format
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDownload,
} from 'react-icons/fa';
import cvFile from '../assets/cv/CV_Bengueblia_Ala.pdf';
import './About.css';

// Rotating text component for keywords
function RotatingText({ words, interval = 3000 }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        className="rotating-word"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}

export default function About() {
  // Section visibility
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // 3D tilt effect
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = e => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const maxRot = 12;
    const rotY = ((x - midX) / midX) * maxRot;
    const rotX = ((midY - y) / midY) * maxRot;
    setTilt({ x: rotX, y: rotY });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  // Animated gradient border
  const [borderShift, setBorderShift] = useState(0);
  useEffect(() => {
    let frame;
    const animate = () => {
      setBorderShift(prev => (prev + 0.2) % 360);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Light/dark theme toggle
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // Content data
  const rotatingKeywords = [
    'AI & ML',
    'Web Dev',
    'Security',
    'Full-Stack',
    'Anomaly Detection',
    'UX/UI',
    'Cloud',
    'Innovation',
  ];
  const introSentences = [
    "I'm a passionate computer engineer who tackles technical challenges with enthusiasm.",
    "I build innovative full-stack applications, from anomaly detection to interactive platforms.",
    "Always learning: exploring new frameworks, architectures, and AI/ML approaches."
  ];
  const skills = [
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'Python', level: 80 },
    { name: 'Machine Learning', level: 70 },
    { name: 'Docker & DevOps', level: 65 },
    { name: 'Security', level: 60 },
  ];
  const timeline = [
    {
      year: '2024',
      title: 'MOCCA Anomaly Detection',
      desc: 'Developed a full-stack platform for image forgery detection using a multi-layer autoencoder. Deployed AI microservice with Flask, orchestrated via Node.js, frontend in React.'
    },
    {
      year: '2023',
      title: 'E-commerce Admin & Candidate Portal',
      desc: 'Built an online management system for admin and candidate applications using React, Node.js, Express, MongoDB with secure authentication and responsive design.'
    },
    {
      year: '2022',
      title: 'Flask & OpenCV Web Interface',
      desc: 'Created a facial recognition project using Flask, OpenCV, face_recognition, and containerized with Docker.'
    },
    {
      year: '2021',
      title: 'DevOps & Cloud Internship',
      desc: 'Implemented CI/CD pipelines, Docker containerization, deployment on AWS/GCP, and monitoring solutions.'
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section ref={sectionRef} className="about-wrapper">
      {/* Theme toggle button */}
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Animated background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* 3D tilted content card */}
      <div className="about-3d-wrapper">
        <motion.div
          ref={cardRef}
          className="about-container"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            borderImage: `linear-gradient(${borderShift}deg, var(--color-primary), var(--color-accent), var(--color-primary)) 1`,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial="hidden"
          animate={isSectionInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <div className="about-inner">
            {/* Avatar with hover effect */}
            <motion.div
              className="about-avatar-wrapper"
              variants={itemVariants}
              whileHover={{ scale: 1.08, rotateZ: 2 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <img src={avatar} alt="Ala Bengueblia" className="about-avatar" />
            </motion.div>
            <div className="about-content">
              <motion.h2 className="about-title" variants={itemVariants}>
                <span className="gradient-text">About Me</span>
              </motion.h2>
              <motion.h3 className="about-subtitle" variants={itemVariants}>
                Passionate about <RotatingText words={rotatingKeywords} interval={2500} />
              </motion.h3>
              <div className="about-text-block">
                {introSentences.map((text, idx) => (
                  <motion.p
                    key={idx}
                    className="about-text"
                    variants={itemVariants}
                    transition={{ delay: idx * 0.3 }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
              {/* Download CV button */}
              <motion.a
                href={cvFile}
                className="btn-download-cv"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDownload className="icon-cv" /> Download My CV
              </motion.a>

              {/* Social icons */}
              <motion.div className="social-icons" variants={itemVariants}>
                <a href="https://github.com/ala-bengueblia" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/ala-bengueblia-85a885278/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://x.com/BenkebliaA1295" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="timeline-section">
            <motion.h2 className="section-title" variants={itemVariants}>
              My Journey
            </motion.h2>
            <div className="timeline-container">
              {timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                const ref = useRef(null);
                const inView = useInView(ref, { once: true, margin: '-50px' });
                return (
                  <motion.div
                    ref={ref}
                    key={idx}
                    className={`timeline-item ${isLeft ? 'left' : 'right'}`}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    <div className="timeline-content">
                      <span className="timeline-year">{item.year}</span>
                      <h3 className="timeline-title">{item.title}</h3>
                      <p className="timeline-desc">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Skills Section */}
          <div className="skills-section">
            <motion.h2 className="section-title" variants={itemVariants}>
              Skills
            </motion.h2>
            <div className="skills-container">
              {skills.map((skill, idx) => {
                const refBar = useRef(null);
                const inViewBar = useInView(refBar, { once: true, margin: '-50px' });
                return (
                  <div key={idx} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar-bg">
                      <motion.div
                        ref={refBar}
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        animate={inViewBar ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                    </div>
                    <motion.span
                      className="skill-percentage"
                      initial={{ opacity: 0 }}
                      animate={inViewBar ? { opacity: 1 } : {}}
                      transition={{ delay: 1.0 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
