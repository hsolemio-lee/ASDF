import { concert } from '../data'

const LIGHTS = [
  { x: '8%',  color: 'rgba(0, 220, 100, 0.42)',   w: '68%', h: '58%' },
  { x: '50%', color: 'rgba(255, 140, 0, 0.48)',    w: '52%', h: '54%' },
  { x: '92%', color: 'rgba(140, 50, 255, 0.42)',   w: '68%', h: '58%' },
  { x: '28%', color: 'rgba(0, 180, 255, 0.30)',    w: '42%', h: '46%' },
  { x: '72%', color: 'rgba(255, 210, 0, 0.22)',    w: '42%', h: '40%' },
]

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 24px 60px',
        background: '#08050a',
      }}
    >
      {/* Stage lights */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: LIGHTS.map(
            l => `radial-gradient(ellipse ${l.w} ${l.h} at ${l.x} 0%, ${l.color} 0%, transparent 65%)`
          ).join(', '),
          animation: 'stagePulse 5s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Date / Time */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          right: 24,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '2px',
          color: 'rgba(255,255,255,0.55)',
          zIndex: 2,
        }}
      >
        <span>{concert.date}</span>
        <span>{concert.time}</span>
      </div>

      {/* Main content */}
      <div style={{ textAlign: 'center', width: '100%', maxWidth: 560, position: 'relative', zIndex: 2 }}>

        {/* asdf logo */}
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(72px, 22vw, 130px)',
            lineHeight: 1,
            letterSpacing: '-2px',
            background: 'linear-gradient(175deg, #FFD700 0%, #FF8C00 55%, #FF5500 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 24px rgba(255,140,0,0.65))',
          }}
        >
          asdf
        </div>

        {/* 1st Live badge */}
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(22px, 6vw, 40px)',
            letterSpacing: '6px',
            color: '#FFD700',
            textShadow: '0 0 18px rgba(255,215,0,0.5)',
            marginTop: -4,
            marginBottom: 20,
          }}
        >
          &#9889; 1st Live &#9889;
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,140,0,0.5), transparent)', marginBottom: 20 }} />

        {/* Main title */}
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(44px, 13vw, 88px)',
            lineHeight: 1,
            letterSpacing: '4px',
            color: '#FFFFFF',
            textShadow: '0 0 40px rgba(255,255,255,0.18)',
          }}
        >
          ASDF 1st Live
        </div>

        {/* Venue EN */}
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(12px, 3.5vw, 20px)',
            letterSpacing: '10px',
            color: 'rgba(255,255,255,0.35)',
            marginTop: 6,
            marginBottom: 28,
          }}
        >
          ROCKERS GARDEN
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,140,0,0.35), transparent)', marginBottom: 28 }} />

        {/* Venue KO */}
        <div
          style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(38px, 13vw, 76px)',
            letterSpacing: '-1px',
            color: '#FFFFFF',
            lineHeight: 1.05,
          }}
        >
          {concert.venue}
        </div>

        {/* Code */}
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(26px, 8vw, 50px)',
            letterSpacing: '8px',
            color: '#00CFFF',
            textShadow: '0 0 22px rgba(0,207,255,0.55)',
            margin: '6px 0',
          }}
        >
          {concert.code}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 'clamp(13px, 3.5vw, 17px)',
            fontWeight: 700,
            color: '#FFD700',
            letterSpacing: '1px',
            margin: '14px 0 6px',
          }}
        >
          {concert.tagline}
        </div>

        {/* Address */}
        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.42)',
            letterSpacing: '0.5px',
          }}
        >
          {'\uc7a5\uc18c'} : {concert.address}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          fontSize: 11,
          letterSpacing: '3px',
          color: 'rgba(255,255,255,0.28)',
          animation: 'bounce 2s ease-in-out infinite',
          zIndex: 2,
        }}
      >
        <span>SCROLL</span>
        <span>&#9660;</span>
      </div>
    </section>
  )
}
