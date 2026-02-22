import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { setlist } from '../data/concertData';

const colorMap = {
  cyan: {
    text: '#00f5ff',
    dim: 'rgba(0,245,255,0.15)',
    border: 'rgba(0,245,255,0.3)',
    glow: '0 0 12px rgba(0,245,255,0.4)',
    indexBg: 'rgba(0,245,255,0.08)',
  },
  pink: {
    text: '#ff00aa',
    dim: 'rgba(255,0,170,0.15)',
    border: 'rgba(255,0,170,0.3)',
    glow: '0 0 12px rgba(255,0,170,0.4)',
    indexBg: 'rgba(255,0,170,0.08)',
  },
  green: {
    text: '#00ff88',
    dim: 'rgba(0,255,136,0.15)',
    border: 'rgba(0,255,136,0.3)',
    glow: '0 0 12px rgba(0,255,136,0.4)',
    indexBg: 'rgba(0,255,136,0.08)',
  },
};

function SetlistItem({ track, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  const c = colorMap[track.color] || colorMap.cyan;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '14px 16px',
        borderRadius: '3px',
        background: isInView ? c.dim : 'transparent',
        border: `1px solid ${c.border}`,
        boxShadow: isInView ? c.glow : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left accent bar */}
      <motion.div
        initial={{ height: 0 }}
        animate={isInView ? { height: '100%' } : {}}
        transition={{ duration: 0.4, delay: index * 0.07 + 0.2 }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '3px',
          background: c.text,
          boxShadow: `0 0 6px ${c.text}`,
          borderRadius: '0 2px 2px 0',
        }}
      />

      {/* Index */}
      <div
        className="mono"
        style={{
          fontSize: '12px',
          color: c.text,
          textShadow: `0 0 8px ${c.text}`,
          background: c.indexBg,
          padding: '4px 8px',
          borderRadius: '2px',
          minWidth: '36px',
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        {track.index}
      </div>

      {/* Title area */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '17px',
              fontWeight: 700,
              color: '#e8e8f0',
              letterSpacing: '0.5px',
              lineHeight: 1.2,
            }}
          >
            {track.title}
          </span>
          {track.note && (
            <span
              className="mono"
              style={{
                fontSize: '9px',
                color: c.text,
                background: c.dim,
                border: `1px solid ${c.border}`,
                padding: '2px 6px',
                borderRadius: '2px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                boxShadow: c.glow,
              }}
            >
              {track.note}
            </span>
          )}
        </div>
      </div>

      {/* Duration */}
      <div
        className="mono"
        style={{
          fontSize: '12px',
          color: '#6060a0',
          flexShrink: 0,
        }}
      >
        {track.duration}
      </div>
    </motion.div>
  );
}

function SectionHeader({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: '32px' }}
    >
      <div
        className="mono"
        style={{ fontSize: '10px', color: '#6060a0', letterSpacing: '4px', marginBottom: '8px' }}
      >
        // SETLIST.json
      </div>
      <h2
        className="orbitron"
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#00f5ff',
          letterSpacing: '3px',
          textShadow: '0 0 10px rgba(0,245,255,0.6)',
        }}
      >
        {children}
      </h2>
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, rgba(0,245,255,0.6), transparent)',
          boxShadow: '0 0 6px rgba(0,245,255,0.4)',
          marginTop: '12px',
        }}
      />
    </motion.div>
  );
}

export default function Setlist() {
  const totalDuration = '48:26';

  return (
    <section
      style={{
        minHeight: '100vh',
        padding: '80px 24px',
        maxWidth: '480px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Subtle background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(0,245,255,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <SectionHeader>TONIGHT'S SET</SectionHeader>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
        {setlist.map((track, i) => (
          <SetlistItem key={track.index} track={track} index={i} />
        ))}
      </div>

      {/* Total duration footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px 0px' }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{
          marginTop: '32px',
          padding: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '3px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div className="mono" style={{ fontSize: '11px', color: '#6060a0', letterSpacing: '3px' }}>
          TOTAL_TRACKS
        </div>
        <div className="mono" style={{ fontSize: '13px', color: '#e8e8f0' }}>
          {setlist.length} tracks
        </div>
        <div className="mono" style={{ fontSize: '11px', color: '#6060a0' }}>
          ~{totalDuration}
        </div>
      </motion.div>
    </section>
  );
}
