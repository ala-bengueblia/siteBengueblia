// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const [scrolling, setScrolling] = useState(false);

  // Ajout du lien Certifications
  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
      // Détecter la section active selon la position de scroll
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let current = 'Home';
      for (const link of links) {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = window.scrollY + rect.top;
          if (scrollPos >= top) {
            current = link.name;
          }
        }
      }
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // links fixe, pas besoin de le mettre en dépendance

  // Variants pour l’animation des liens
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  // Variants pour menu mobile
  const mobileMenuVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  };

  return (
    <nav className={`navbar ${scrolling ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        {/* Logo animé */}
        <motion.a
          href="#home"
          className="logo"
          onClick={() => setActive('Home')}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 2 }}
        >
          <span className="logo-gradient">Ala Bengueblia</span>
        </motion.a>

        {/* Liens desktop */}
        <div className="nav-links">
          {links.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={`nav-link ${active === link.name ? 'active' : ''}`}
              onClick={() => {
                setActive(link.name);
                setOpen(false);
              }}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {link.name}
              {/* Underline animée avec layoutId */}
              <motion.span
                className="underline"
                layoutId="underline"
                animate={active === link.name ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.a>
          ))}
        </div>

        {/* Bouton menu mobile */}
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile animé */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {links.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActive(link.name);
                  setOpen(false);
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.1 }}
                className={`mobile-nav-link ${active === link.name ? 'active' : ''}`}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
