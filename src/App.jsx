import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Certifications from './components/Certifications';

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="main-content" style={{ marginTop: '4rem' }}>
        <section id="home">
          <Hero />
        </section>
        <section id="about" className="section">
          <About />
        </section>
        <section id="skills" className="section section-alt">
          <Skills />
        </section>
        <section id="projects" className="section">
          <Projects />
        </section>
        <section id="certifications" className="section">
          <Certifications />
         </section>
        <section id="contact" className="section section-alt">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
