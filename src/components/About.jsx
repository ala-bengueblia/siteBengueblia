// src/components/About.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import avatar from '../assets/ala.jpg'; // Optimise l’image (taille, poids)
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDownload,
} from 'react-icons/fa';
import cvFile from '../assets/cv/CV_Bengueblia_Ala.pdf';import './About.css';

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
  // Références pour in-view
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Tilt 3D sur la carte principale
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
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
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Animation bordure gradient
  const [borderShift, setBorderShift] = useState(0);
  useEffect(() => {
    let req;
    const animate = () => {
      setBorderShift(prev => (prev + 0.2) % 360);
      req = requestAnimationFrame(animate);
    };
    req = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(req);
  }, []);

  // Theme clair / sombre (si utilisé)
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Contenu : rotating text, intro, skills, timeline
  const rotatingKeywords = [
    'AI & ML',
    'Web Dev',
    'Sécurité',
    'Full-stack',
    'Anomalies',
    'UX/UI',
    'Cloud',
    'Innovation',
  ];
  const introSentences = [
    "Ingénieur informatique passionné, je relève des défis techniques avec enthousiasme.",
    "Je conçois des applications full-stack innovantes, de la détection d’anomalies à des plateformes interactives.",
    "Toujours en apprentissage : j’explore de nouveaux frameworks, architectures et approches AI/ML."
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
      title: 'Détection d’anomalies (MOCCA)',
      desc: 'Développement d’une plateforme full-stack pour détecter les falsifications d’images via un autoencodeur multi-couches. Implémentation du microservice AI en Flask, orchestration Node.js, frontend React.'
    },
    {
      year: '2023',
      title: 'Application e-commerce React/Node',
      desc: 'Création d’un site de gestion des candidate et admin  en ligne pour une societé avec React, Node.js, Express, MongoDB, authentification sécurisée, responsive design.'
    },
    {
      year: '2022',
      title: 'Interface Web Flask & OpenCV',
      desc: 'Projet de reconnaissance faciale utilisant Flask, OpenCV, face_recognition, déploiement via Docker.'
    },
    {
      year: '2021',
      title: 'Stage DevOps & Cloud',
      desc: 'Mise en place de pipelines CI/CD, conteneurisation Docker, déploiement sur AWS/GCP, surveillance et monitoring.'
    },
  ];

  // Variants Framer Motion
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
      {/* Toggle theme */}
      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Arrière-plan animé (blobs) */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Carte principale avec tilt 3D */}
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
          {/* Avatar et intro */}
          <div className="about-inner">
            <motion.div
              className="about-avatar-wrapper"
              variants={itemVariants}
              whileHover={{ scale: 1.08, rotateZ: 2 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <img src={avatar} alt="Ala Bengueblia" className="about-avatar"/>
            </motion.div>
            <div className="about-content">
              <motion.h2 className="about-title" variants={itemVariants}>
                <span className="gradient-text">À propos de moi</span>
              </motion.h2>
              <motion.h3 className="about-subtitle" variants={itemVariants}>
                Passionné par{' '}
                <RotatingText words={rotatingKeywords} interval={2500} />
              </motion.h3>
              <div className="about-text-block">
                {introSentences.map((text, idx) => (
                  <motion.p
                    key={idx}
                    className="about-text"
                    variants={itemVariants}
                    transition={{ delay: idx * 0.3 }}
                  >
                    {text.split(' ').map((word, widx) => {
                      const clean = word.replace(/[^a-zA-ZÀ-ÿ&]/g, '');
                      const highlights = [
                        'passionné','applications','innovantes','défis','AI','ML','frameworks','architectures','apprentissage'
                      ];
                      if (highlights.some(h => clean.toLowerCase().includes(h.toLowerCase()))) {
                        return (
                          <span key={widx} className="about-highlight">
                            {word + ' '}
                          </span>
                        );
                      }
                      return word + ' ';
                    })}
                  </motion.p>
                ))}
              </div>
              {/* Bouton téléchargement CV */}
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
                  <FaDownload className="icon-cv" /> Télécharger mon CV
                </motion.a>

              {/* Icônes sociales */}
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

          {/* Timeline d’expérience */}
          <div className="timeline-section">
            <motion.h2 className="section-title" variants={itemVariants}>
              Mon parcours
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

          {/* Compétences */}
          <div className="skills-section">
            <motion.h2 className="section-title" variants={itemVariants}>
              Compétences
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
