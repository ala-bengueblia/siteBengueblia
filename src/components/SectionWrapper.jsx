// src/components/SectionWrapper.jsx
import React from 'react';
import Background from './Background';
import './SectionWrapper.css';

export default function SectionWrapper({ theme = 'default', children }) {
  return (
    <section className="section-wrapper">
      {/* Background animé derrière */}
      <Background theme={theme} />
      {/* Conteneur de contenu avec style semi-transparent / backdrop-filter */}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}
