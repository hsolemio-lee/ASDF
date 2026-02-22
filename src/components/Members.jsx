import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { members } from '../data/concertData';

const colorMap = {
  cyan: {
    text: '#00f5ff',
    dim: 'rgba(0,245,255,0.08)',
    border: 'rgba(0,245,255,0.25)',
    glow: '0 0 20px rgba(0,245,255,0.2)',
    avatarBorder: 'rgba(0,245,255,0.5)',
    avatarGlow: '0 0 15px rgba(0,245,255,0.4)',
  },
  pink: {
    text: '#ff00aa',
    dim: 'rgba(255,0,170,0.08)',
    border: 'rgba(255,0,170,0.25)',
    glow: '0 0 20px rgba(255,0,170,0.2)',
    avatarBorder: 'rgba(255,0,170,0.5)',
    avatarGlow: '0 0 15px rgba(255,0,170,0.4)',
  },
  green: {
    text: '#00ff88',
    dim: 'rgba(0,255,136,0.08)',
    border: 'rgba(0,255,136,0.25)',
    glow: '0 0 20px rgba(0,255,136,0.2)',
    avatarBorder: 'rgba(0,255,136,0.5)',
    avatarGlow: '0 0 15px rgba(0,255,136,0.4)',
  },
};

function StatChip({ label, value, color }) {
  const c = colorMap[color] || colorMap.cyan;
  return (
    <div
      className="mono"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        padding: '6px 10px',
        background: c.dim,
        border: `1px solid ${c.border}`,
        borderRadius: '3px',
        minWidth: '56px',
      }}
    >
      <div style={{ fontSize: '9px', color: '#6060a0', letterSpacing: '2px' }}>{label}</div>
      <div style={{ fontSize: '12px', color: c.text, textShadow: `0 0 6px ${c.text}` }}>{value}</div>
    </div>
  );
}

function MemberCard({ member, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  const c = colorMap[member.color] || colorMap.cyan;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        background: c.dim,
        border: `1px solid ${c.border}`,
        borderRadius: '4px',
        padding: '24px',
        boxShadow: isInView ? c.glow : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top-right corner accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40px',
          height: '40px',
          borderBottom: `1px solid ${c.border}`,
          borderLeft: `1px solid ${c.border}`,
          borderRadius: '0 0 0 4px',
          opacity: 0.5,
        }}
      />

      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
        {/* Avatar */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '4px',
            border: `1px solid ${c.avatarBorder}`,
            boxShadow: c.avatarGlow,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            background: `linear-gradient(135deg, ${c.dim}, rgba(0,0,0,0.3))`,
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {member.emoji}
          {/* Scanline on avatar */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Name & role */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="mono"
            style={{ fontSize: '10px', color: '#6060a0', letterSpacing: '2px', marginBottom: '4px' }}
          >
            {member.handle}
          </div>
          <div
            className="orbitron"
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: c.text,
              textShadow: `0 0 8px ${c.text}`,
              letterSpacing: '2px',
              marginBottom: '4px',
            }}
          >
            {member.name}
          </div>
          <div
            className="mono"
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '3px',
            }}
          >
            {member.role}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: `linear-gradient(90deg, ${c.border}, transparent)`,
          marginBottom: '14px',
        }}
      />

      {/* Bio */}
      <p
        style={{
          fontSize: '14px',
          color: 'rgba(232,232,240,0.7)',
          lineHeight: 1.7,
          letterSpacing: '0.3px',
          marginBottom: '16px',
        }}
      >
        {member.bio}
      </p>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <StatChip label="EXP" value={member.stats.exp} color={member.color} />
        <StatChip label="LANG" value={member.stats.lang} color={member.color} />
        <StatChip label="FREQ" value={member.stats.freq} color={member.color} />
      </div>
    </motion.div>
  );
}

function SectionHeader() {
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
        // MEMBERS.json
      </div>
      <h2
        className="orbitron"
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#ff00aa',
          letterSpacing: '3px',
          textShadow: '0 0 10px rgba(255,0,170,0.6)',
        }}
      >
        THE BAND
      </h2>
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, rgba(255,0,170,0.6), transparent)',
          boxShadow: '0 0 6px rgba(255,0,170,0.4)',
          marginTop: '12px',
        }}
      />
    </motion.div>
  );
}

export default function Members() {
  return (
    <section
      style={{
        minHeight: '100vh',
        padding: '80px 24px 100px',
        maxWidth: '480px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,0,170,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <SectionHeader />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
        {members.map((member, i) => (
          <MemberCard key={member.id} member={member} index={i} />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px 0px' }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          marginTop: '60px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), rgba(255,0,170,0.3), transparent)',
            marginBottom: '24px',
          }}
        />
        <div
          className="orbitron"
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#00f5ff',
            textShadow: '0 0 10px rgba(0,245,255,0.6)',
            letterSpacing: '4px',
            marginBottom: '8px',
          }}
        >
          NULL VECTOR
        </div>
        <div className="mono" style={{ fontSize: '10px', color: '#6060a0', letterSpacing: '3px' }}>
          © 2025 · ALL RIGHTS RESERVED · EOF
        </div>
      </motion.div>
    </section>
  );
}
