import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { concertInfo } from '../data/concertData';

const CHARS = '!@#$%^&*()_+{}|:<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function useGlitchText(finalText, delay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let startTimeout;
    startTimeout = setTimeout(() => {
      let iteration = 0;
      const total = finalText.length * 3;
      const interval = setInterval(() => {
        const resolved = Math.floor(iteration / 3);
        const scrambled = finalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < resolved) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
        setDisplayed(scrambled);
        iteration++;
        if (iteration > total) {
          clearInterval(interval);
          setDisplayed(finalText);
          setDone(true);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [finalText, delay]);

  return { displayed, done };
}

function NeonLine({ color = 'cyan' }) {
  const colorMap = {
    cyan: 'rgba(0,245,255,0.7)',
    pink: 'rgba(255,0,170,0.7)',
    green: 'rgba(0,255,136,0.7)',
  };
  const c = colorMap[color] || colorMap.cyan;
  return (
    <div
      style={{
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
        boxShadow: `0 0 8px ${c}`,
        margin: '12px 0',
      }}
    />
  );
}

function InfoBlock({ label, value, color = 'cyan' }) {
  const colorMap = {
    cyan: { text: '#00f5ff', glow: 'rgba(0,245,255,0.8)' },
    pink: { text: '#ff00aa', glow: 'rgba(255,0,170,0.8)' },
    green: { text: '#00ff88', glow: 'rgba(0,255,136,0.8)' },
  };
  const c = colorMap[color] || colorMap.cyan;
  return (
    <div style={{ marginBottom: '16px' }}>
      <div
        className="mono"
        style={{ fontSize: '10px', color: '#6060a0', letterSpacing: '3px', marginBottom: '4px' }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '17px',
          fontWeight: 700,
          color: c.text,
          textShadow: `0 0 8px ${c.glow}`,
          letterSpacing: '1px',
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function Hero() {
  const { displayed: bandNameDisplay } = useGlitchText(concertInfo.bandName, 300);
  const [scrollIndicator, setScrollIndicator] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setScrollIndicator(false);
      else setScrollIndicator(true);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px 80px',
        position: 'relative',
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(0,245,255,0.06) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 80%, rgba(255,0,170,0.06) 0%, transparent 60%),
          radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 0%, #050508 100%)
        `,
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Corner decorations */}
      {[
        { top: 20, left: 20 },
        { top: 20, right: 20 },
        { bottom: 20, left: 20 },
        { bottom: 20, right: 20 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '30px',
            height: '30px',
            ...pos,
            borderTop: i < 2 ? '2px solid rgba(0,245,255,0.4)' : 'none',
            borderBottom: i >= 2 ? '2px solid rgba(0,245,255,0.4)' : 'none',
            borderLeft: i % 2 === 0 ? '2px solid rgba(0,245,255,0.4)' : 'none',
            borderRight: i % 2 !== 0 ? '2px solid rgba(0,245,255,0.4)' : 'none',
          }}
        />
      ))}

      {/* Poster art area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '360px',
          aspectRatio: '3/4',
          borderRadius: '4px',
          marginBottom: '40px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(0,245,255,0.25)',
          boxShadow: '0 0 40px rgba(0,245,255,0.1), 0 0 80px rgba(255,0,170,0.08)',
        }}
      >
        {/* Gradient poster */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at 30% 30%, rgba(0,245,255,0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 70%, rgba(255,0,170,0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 50%, rgba(191,0,255,0.08) 0%, transparent 70%),
              linear-gradient(160deg, #070712 0%, #0a0520 50%, #07120a 100%)
            `,
          }}
        />

        {/* Poster inner content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 24px',
            gap: '24px',
          }}
        >
          {/* Circuit decoration top */}
          <div className="mono" style={{ fontSize: '9px', color: 'rgba(0,245,255,0.4)', letterSpacing: '4px' }}>
            [ LIVE PERFORMANCE ]
          </div>

          {/* Waveform visual */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '48px' }}>
            {Array.from({ length: 24 }).map((_, i) => {
              const h = [20, 35, 55, 70, 90, 75, 60, 80, 95, 70, 50, 40, 60, 85, 95, 75, 55, 70, 85, 60, 45, 30, 20, 15][i] || 30;
              const isHighlight = i >= 8 && i <= 16;
              return (
                <div
                  key={i}
                  style={{
                    width: '4px',
                    height: `${h}%`,
                    borderRadius: '2px',
                    background: isHighlight
                      ? 'linear-gradient(to top, #ff00aa, #00f5ff)'
                      : 'rgba(0,245,255,0.3)',
                    boxShadow: isHighlight ? '0 0 6px rgba(0,245,255,0.5)' : 'none',
                  }}
                />
              );
            })}
          </div>

          {/* Band name on poster */}
          <div
            className="orbitron"
            style={{
              fontSize: '28px',
              fontWeight: 900,
              color: '#00f5ff',
              textAlign: 'center',
              letterSpacing: '6px',
              textShadow: '0 0 20px rgba(0,245,255,0.8), 0 0 40px rgba(0,245,255,0.4)',
              lineHeight: 1.1,
            }}
          >
            NULL<br />VECTOR
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              className="mono"
              style={{ fontSize: '11px', color: 'rgba(255,0,170,0.8)', letterSpacing: '3px', marginBottom: '6px' }}
            >
              {concertInfo.date}
            </div>
            <div
              style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}
            >
              {concertInfo.venue}
            </div>
          </div>

          {/* Bottom decoration */}
          <div style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,0,170,0.6), transparent)',
            boxShadow: '0 0 6px rgba(255,0,170,0.5)',
          }} />

          <div className="mono" style={{ fontSize: '9px', color: 'rgba(191,0,255,0.6)', letterSpacing: '3px' }}>
            // A NIGHT OF SIGNAL &amp; NOISE
          </div>
        </div>

        {/* Scan line animation */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '-5%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)',
            boxShadow: '0 0 10px rgba(0,245,255,0.3)',
            pointerEvents: 'none',
            animation: 'posterScan 3s linear 2s infinite',
          }}
        />
      </motion.div>

      {/* Concert info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ width: '100%', maxWidth: '360px' }}
      >
        {/* Band name title */}
        <div style={{ marginBottom: '8px' }}>
          <div
            className="mono"
            style={{ fontSize: '10px', color: '#6060a0', letterSpacing: '4px', marginBottom: '8px' }}
          >
            // BAND_NAME.exe
          </div>
          <h1
            className="orbitron"
            style={{
              fontSize: '36px',
              fontWeight: 900,
              color: '#00f5ff',
              letterSpacing: '4px',
              textShadow: '0 0 15px rgba(0,245,255,0.7), 0 0 30px rgba(0,245,255,0.3)',
              lineHeight: 1,
            }}
          >
            {bandNameDisplay}
          </h1>
          <div
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '3px',
              marginTop: '8px',
              fontStyle: 'italic',
            }}
          >
            {concertInfo.tagline}
          </div>
        </div>

        <NeonLine color="cyan" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', marginTop: '8px' }}>
          <InfoBlock label="// DATE" value={concertInfo.date} color="cyan" />
          <InfoBlock label="// TIME" value={concertInfo.time} color="pink" />
          <InfoBlock label="// DOORS_OPEN" value={concertInfo.doorsOpen} color="green" />
          <InfoBlock label="// TICKET" value={concertInfo.ticketPrice} color="cyan" />
        </div>

        <NeonLine color="pink" />

        <InfoBlock label="// VENUE" value={concertInfo.venue} color="pink" />
        <div
          className="mono"
          style={{ fontSize: '12px', color: '#6060a0', letterSpacing: '1px', marginTop: '-8px' }}
        >
          {concertInfo.address}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: scrollIndicator ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none',
        }}
      >
        <div className="mono" style={{ fontSize: '9px', color: 'rgba(0,245,255,0.5)', letterSpacing: '3px' }}>
          SCROLL
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to bottom, rgba(0,245,255,0.6), transparent)',
            boxShadow: '0 0 4px rgba(0,245,255,0.4)',
          }}
        />
      </motion.div>
    </section>
  );
}
