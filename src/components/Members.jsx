import { members } from '../data'

export default function Members() {
  return (
    <section className="content-section" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="section-eyebrow">MEMBERS</div>
      <div className="section-sub">ASDF Band &middot; 5 Members</div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: 14,
        }}
      >
        {members.map((m) => (
          <div
            key={m.nickname}
            style={{
              padding: '22px 24px',
              border: `1px solid ${m.color}28`,
              borderRadius: 6,
              background: `linear-gradient(135deg, ${m.color}0d 0%, transparent 100%)`,
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.25s, box-shadow 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${m.color}66`
              e.currentTarget.style.boxShadow = `0 0 24px ${m.color}22`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${m.color}28`
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Top accent bar */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${m.color}, ${m.color}66)`,
              }}
            />

            <div
              style={{
                fontSize: 10,
                letterSpacing: '3px',
                color: m.color,
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              {m.role}
            </div>

            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(22px, 5vw, 30px)',
                letterSpacing: '2px',
                color: '#FFFFFF',
                lineHeight: 1.1,
                marginBottom: 10,
              }}
            >
              {m.nickname}
            </div>

            <div
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.45)',
                fontStyle: 'italic',
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              {m.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
