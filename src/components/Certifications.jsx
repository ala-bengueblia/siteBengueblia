// src/components/Certifications.jsx
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaDownload, FaFilePdf, FaTimes } from 'react-icons/fa';
import './Certifications.css';

// Récupération automatique des PDF dans src/assets/certs/
const pdfModules = import.meta.glob('../assets/certs/*.pdf', { as: 'url', eager: true });
function getPdfItems() {
  return Object.entries(pdfModules).map(([path, url]) => {
    const segments = path.split('/');
    const filename = segments[segments.length - 1];
    const nameWithoutExt = filename.replace(/\.pdf$/i, '');
    const title = nameWithoutExt
      .replace(/[-_]+/g, ' ')
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return { title, url };
  });
}

export default function Certifications() {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const pdfItems = getPdfItems();

  const [modalPdf, setModalPdf] = useState(null);
  const openModal = (item) => setModalPdf(item);
  const closeModal = () => setModalPdf(null);

  // Variants pour le titre
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 0.6 } },
  };

  return (
    <section ref={sectionRef} className="certif-wrapper">
      {/* Conteneur centré pour le titre */}
      <motion.div
        className="certif-title-container"
        initial="hidden"
        animate={isSectionInView ? "visible" : "hidden"}
        variants={{}}
      >
        <motion.h2
          className="certif-title"
          variants={titleVariants}
        >
          Mes Certifications & Diplômes
        </motion.h2>
        {/* Underline animé */}
        <motion.div
          className="certif-title-underline"
          variants={underlineVariants}
        />
      </motion.div>

      {/* Grille de cartes */}
      <div className="certif-grid">
        {pdfItems.map((item, idx) => (
          <CertCard
            key={item.url}
            item={item}
            index={idx}
            parentInView={isSectionInView}
            onClick={() => openModal(item)}
          />
        ))}
      </div>

      {/* Modal agrandie */}
      <AnimatePresence>
        {modalPdf && (
          <motion.div
            className="certif-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="certif-modal-content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            >
              <button className="certif-modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
              <div className="certif-modal-header">
                <FaFilePdf className="certif-modal-icon" />
                <h3>{modalPdf.title}</h3>
              </div>
              <div className="certif-modal-body">
                <iframe
                  src={modalPdf.url}
                  title={modalPdf.title}
                  className="certif-pdf-preview"
                />
              </div>
              <div className="certif-modal-footer">
                <a
                  href={modalPdf.url}
                  download
                  className="certif-download-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload /> Télécharger
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CertCard({ item, index, parentInView, onClick }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Tilt 3D
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const maxRot = 10;
    const rotY = ((x - midX) / midX) * maxRot;
    const rotX = ((midY - y) / midY) * maxRot;
    setTilt({ x: rotX, y: rotY });
  };
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  // Variants Framer Motion pour l’apparition en cascade
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: index * 0.1, type: 'spring', stiffness: 120, damping: 20 },
    },
  };

  return (
    <div
      ref={cardRef}
      className="certif-card-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="certif-card"
        variants={cardVariants}
        initial="hidden"
        animate={parentInView && isInView ? "visible" : "hidden"}
        style={{
          transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          rotateY: hovered ? 5 : 0,
        }}
      >
        <div className="certif-card-content">
          <FaFilePdf className="certif-card-icon" />
          <h4 className="certif-card-title">{item.title}</h4>
          <span className={`certif-card-overlay-text ${hovered ? 'visible' : ''}`}>
            Aperçu
          </span>
        </div>
        {/* Bordure animée (optionnelle) */}
        <motion.div
          className="certif-card-border-anim"
          animate={hovered ? { opacity: [0, 1, 0], rotate: 360 } : { opacity: 0 }}
          transition={hovered ? { repeat: Infinity, duration: 2, ease: 'linear' } : {}}
        />
      </motion.div>
    </div>
  );
}
