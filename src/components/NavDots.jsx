import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', label: 'HERO' },
  { id: 'setlist', label: 'SETLIST' },
  { id: 'members', label: 'MEMBERS' },
];

export default function NavDots() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        zIndex: 1000,
      }}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <motion.button
            key={id}
            onClick={() => scrollTo(id)}
            title={label}
            whileTap={{ scale: 0.8 }}
            style={{
              width: isActive ? '10px' : '6px',
              height: isActive ? '10px' : '6px',
              borderRadius: '50%',
              background: isActive ? '#00f5ff' : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              outline: 'none',
              boxShadow: isActive
                ? '0 0 8px #00f5ff, 0 0 16px rgba(0,245,255,0.4)'
                : 'none',
              transition: 'all 0.3s ease',
              alignSelf: 'center',
            }}
          />
        );
      })}
    </div>
  );
}
