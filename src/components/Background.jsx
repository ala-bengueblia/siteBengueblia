// src/components/Background.jsx
import React, { useCallback } from 'react';
import { loadFull } from 'tsparticles';
import { Particles } from 'react-tsparticles';

export default function Background({ theme = 'default' }) {
  // Initialisation de tsParticles
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Configurations selon thème
  const optionsByTheme = {
    default: {
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          onClick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { quantity: 4 },
        },
      },
      particles: {
        color: { value: '#888888' },
        links: {
          color: '#888888',
          distance: 120,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        collisions: { enable: false },
        move: {
          direction: 'none',
          enable: true,
          outModes: 'bounce',
          random: false,
          speed: 1,
          straight: false,
        },
        number: { density: { enable: true, area: 800 }, value: 50 },
        opacity: { value: 0.3 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    },
    webdev: {
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.4 } },
          push: { quantity: 4 },
        },
      },
      particles: {
        color: { value: ['#E44D26', '#1572B6', '#F7DF1E'] },
        links: {
          color: '#cccccc',
          distance: 120,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.2,
          outModes: 'bounce',
        },
        number: { density: { enable: true, area: 800 }, value: 60 },
        opacity: { value: 0.4 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 4 } },
      },
      detectRetina: true,
    },
    ai: {
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          onClick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          repulse: { distance: 120, duration: 0.4 },
          push: { quantity: 3 },
        },
      },
      particles: {
        color: { value: '#00FFCC' },
        links: {
          color: '#00FFCC',
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          outModes: 'bounce',
        },
        number: { density: { enable: true, area: 800 }, value: 50 },
        opacity: { value: 0.3 },
        shape: { type: 'triangle' },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    },
    security: {
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
          resize: true,
        },
        modes: {
          grab: { distance: 120, links: { opacity: 0.5 } },
          push: { quantity: 2 },
        },
      },
      particles: {
        color: { value: '#FF416C' },
        links: {
          color: '#FF416C',
          distance: 100,
          enable: true,
          opacity: 0.25,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          outModes: 'bounce',
        },
        number: { density: { enable: true, area: 800 }, value: 40 },
        opacity: { value: 0.3 },
        shape: { type: 'polygon' },
        size: { value: { min: 2, max: 5 } },
      },
      detectRetina: true,
    },
  };

  const options = optionsByTheme[theme] || optionsByTheme.default;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        ...options,
        background: { color: { value: 'transparent' } },
        fullScreen: { enable: true, zIndex: -1 },
      }}
    />
  );
}
