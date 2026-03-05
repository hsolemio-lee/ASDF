import { members } from '../data'
import { useInView } from '../hooks/useInView'

const E = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function Members() {
  const [titleRef, titleIn] = useInView()
  const [gridRef,  gridIn]  = useInView()

  return (
    <section
      className="content-section"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div
        ref={titleRef}
        style={{ opacity: titleIn ? undefined : 0 }}
      >
        <div
          className="section-eyebrow"
          style={titleIn ? { animation: `fadeInUp 0.8s ${E} 0ms both` } : {}}
        >
          MEMBERS
        </div>
        <div
          className="section-sub"
          style={titleIn ? { animation: `fadeInUp 0.8s ${E} 80ms both` } : {}}
        >
          ASDF Band &middot; 5 Members
        </div>
      </div>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: 14,
        }}
      >
        {members.map((m, i) => (
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
              ...(gridIn
                ? { animation: `fadeInScale 0.7s ${E} ${i * 90}ms both` }
                : { opacity: 0 }),
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
