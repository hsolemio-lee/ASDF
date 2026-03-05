import { setlist } from '../data'

const TAG_COLOR = {
  '\uc624\ud504\ub2dd':  '#00FF7F',
  '\ud0c0\uc774\ud2c0\uacf3': '#FF8C00',
  '\uc559\ucf54\ub974': '#9B4DFF',
}

export default function Setlist() {
  return (
    <section className="content-section">
      <div className="section-eyebrow">SETLIST</div>
      <div className="section-sub">10 Tracks &middot; 2026.03.28</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {setlist.map((track) => {
          const accent = TAG_COLOR[track.tag] || 'rgba(255,255,255,0.1)'
          return (
            <div
              key={track.no}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.025)',
                borderLeft: `3px solid ${track.tag ? accent : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '0 6px 6px 0',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.025)'}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 18,
                  color: 'rgba(255,255,255,0.22)',
                  minWidth: 26,
                  lineHeight: 1,
                }}
              >
                {String(track.no).padStart(2, '0')}
              </span>

              <span style={{ flex: 1, fontWeight: 700, fontSize: 'clamp(14px, 3.5vw, 17px)' }}>
                {track.title}
              </span>

              {track.tag && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '1px',
                    color: accent,
                    background: `${accent}22`,
                    border: `1px solid ${accent}44`,
                    padding: '3px 8px',
                    borderRadius: 3,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {track.tag}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
