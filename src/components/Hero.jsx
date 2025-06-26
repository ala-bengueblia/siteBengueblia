import React from 'react';
import { motion } from 'framer-motion';
import avatar from '../assets/ala.jpg'; // Veillez à une taille/poids optimisés
import './Hero.css';

export default function Hero() {
  // Variants Framer Motion pour stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };
  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="hero-wrapper">
      {/* Décor en arrière-plan similaire à About, avec opacité adoucie */}
      <div className="hero-decor" aria-hidden="true" />

      <motion.div
        className="hero container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Contenu texte */}
        <motion.div
          className="hero-content"
          variants={contentVariants}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hello, I&apos;m <span className="gradient-text">Ala Bengueblia</span>
            <motion.span
              className="hero-underline"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.3 }}
            />
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="subtitle-keyword">Computer Engineer</span> | <span className="subtitle-keyword">AI & Web Developer</span>
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.a
              href="#contact"
              className="button button-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
            <motion.a
              href="#projects"
              className="button button-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              My Projects
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="hero-image"
          variants={imageVariants}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        >
          <img src={avatar} alt="Ala Bengueblia" />
        </motion.div>
      </motion.div>
    </section>
  );
}