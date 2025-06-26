import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { SiLinkedin } from 'react-icons/si';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Pour tilt 3D
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const maxRot = 10; // intensité du tilt
    const rotY = ((x - midX) / midX) * maxRot;
    const rotX = ((midY - y) / midY) * maxRot;
    card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, traiterez l’envoi via API/email service
    console.log('Contact submitted', form);
    setSubmitted(true);
    // Remettre submitted à false après un délai si vous voulez réafficher le formulaire
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <section className="contact-wrapper">
      {/* Décor flottant en arrière-plan */}
      <div className="contact-blob blob-1" />
      <div className="contact-blob blob-2" />
      <div className="contact-blob blob-3" />

      <div
        className="contact-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence>
          {!submitted ? (
            <motion.div
              className="contact"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2
                className="contact-title"
                custom={1}
                variants={containerVariants}
              >
                Contactez-moi
              </motion.h2>

              <motion.form
                onSubmit={handleSubmit}
                className="contact-form"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Name */}
                <motion.div
                  className="contact-form-field"
                  custom={2}
                  variants={containerVariants}
                >
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="input-field"
                    placeholder=" "
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="name" className="input-label">
                    Votre nom
                  </label>
                </motion.div>

                {/* Email */}
                <motion.div
                  className="contact-form-field"
                  custom={3}
                  variants={containerVariants}
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input-field"
                    placeholder=" "
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email" className="input-label">
                    Votre e-mail
                  </label>
                </motion.div>

                {/* Message */}
                <motion.div
                  className="contact-form-field"
                  custom={4}
                  variants={containerVariants}
                >
                  <textarea
                    id="message"
                    name="message"
                    className="input-field textarea-field"
                    placeholder=" "
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="message" className="input-label">
                    Votre message
                  </label>
                </motion.div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="submit-button"
                  custom={5}
                  variants={containerVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Envoyer
                </motion.button>
              </motion.form>

              {/* Info de contact */}
              <motion.div
                className="contact-info"
                custom={6}
                variants={containerVariants}
              >
                <motion.div className="item" custom={7} variants={containerVariants}>
                  <Mail className="icon" />
                  <span>alabenkeblia@gmail.com</span>
                </motion.div>
                <motion.div className="item" custom={8} variants={containerVariants}>
                  <Phone className="icon" />
                  <span>+216 99 889 9986</span>
                </motion.div>
                <motion.div className="item" custom={9} variants={containerVariants}>
                  <SiLinkedin className="icon" />
                  <a
                    href="https://www.linkedin.com/in/ala-bengueblia-85a885278/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="submit-feedback"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Merci ! Votre message a été envoyé.</h3>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
