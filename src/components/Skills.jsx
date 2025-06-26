import React from 'react';
import { motion } from 'framer-motion';
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiMongodb,
  SiFlask,
  SiPhp,
  SiAngular,
  SiDocker,
  SiVite,
  SiNextdotjs,
  SiDotnet,
} from 'react-icons/si';
import { GiMedusaHead } from 'react-icons/gi';
import './Skills.css';

const skills = [
  { name: 'C# (.NET)', icon: <SiDotnet />, color: '#239120' },
  { name: 'PHP', icon: <SiPhp />, color: '#777BB4' },
  { name: 'Angular', icon: <SiAngular />, color: '#DD0031' },
  { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
  { name: 'React', icon: <SiReact />, color: '#61DAFB' },
  { name: 'Vite', icon: <SiVite />, color: '#646CFF' },
  { name: 'Medusa', icon: <GiMedusaHead />, color: '#FF6F61' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#F0DB4F' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
  { name: 'Python', icon: <SiPython />, color: '#3776AB' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#38B2AC' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
  { name: 'Flask', icon: <SiFlask />, color: '#000000' },
];

export default function Skills() {
  // variants for staggering child animations
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="skills-wrapper">
      {/* Uncomment/add .skills-decor if you want an animated background like in Projects */}
      {/* <div className="skills-decor" aria-hidden="true" /> */}

      <motion.div
        className="skills-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2 className="skills-title" variants={cardVariants}>
          Skills & Technologies
          <motion.span
            className="skills-underline"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 }}
          />
        </motion.h2>

        <div className="skills-grid">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 + 0.2, type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.05 }}
              style={{ borderTop: `4px solid ${skill.color}` }}
            >
              <div className="icon" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <p>{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
