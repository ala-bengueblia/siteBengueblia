// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className="footer-container">
        <p className="footer-text">
          &copy; {currentYear} <strong>Ala Bengueblia</strong> — Tous droits réservés.
        </p>

        <div className="footer-socials">
          <a href="https://github.com/ala-bengueblia" target="_blank" rel="noopener noreferrer" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/ala-ben" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="alabenkeblia@gmail.com" title="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
