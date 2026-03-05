import { concert } from '../data'
import { useInView } from '../hooks/useInView'

const E = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function Venue() {
  const [titleRef, titleIn] = useInView()
  const [boxRef,   boxIn]   = useInView()
  const [gridRef,  gridIn]  = useInView()

  return (
    <section
      className="content-section"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}
    >
      <div
        ref={titleRef}
        style={{ opacity: titleIn ? undefined : 0 }}
      >
        <div
          className="section-eyebrow"
          style={titleIn ? { animation: `fadeInUp 0.8s ${E} 0ms both` } : {}}
        >
          {'\uc624\uc2dc\ub294 \uae38'}
        </div>
        <div
          className="section-sub"
          style={titleIn ? { animation: `fadeInUp 0.8s ${E} 80ms both` } : {}}
        >
          Location &middot; {concert.date}
        </div>
      </div>

      {/* Venue box */}
      <div
        ref={boxRef}
        style={{
          padding: '36px 28px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 8,
          marginBottom: 20,
          ...(boxIn
            ? { animation: `fadeInUp 0.85s ${E} 0ms both` }
            : { opacity: 0 }),
        }}
      >
        <div
          style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(30px, 10vw, 52px)',
            color: '#FFFFFF',
            marginBottom: 8,
          }}
        >
          {concert.venue}
        </div>

        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(22px, 6vw, 34px)',
            letterSpacing: '5px',
            color: '#00CFFF',
            textShadow: '0 0 18px rgba(0,207,255,0.45)',
            marginBottom: 18,
          }}
        >
          {concert.code}
        </div>

        <div
          style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
          }}
        >
          {concert.address}
        </div>
      </div>

      {/* Date / Time grid */}
      <div
        ref={gridRef}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 48 }}
      >
        {[
          { label: 'DATE', value: concert.date },
          { label: 'TIME', value: concert.time },
        ].map(({ label, value }, i) => (
          <div
            key={label}
            style={{
              padding: '20px 16px',
              background: 'rgba(255,140,0,0.07)',
              border: '1px solid rgba(255,140,0,0.18)',
              borderRadius: 6,
              ...(gridIn
                ? { animation: `fadeInScale 0.7s ${E} ${i * 100}ms both` }
                : { opacity: 0 }),
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: '3px',
                color: '#FF8C00',
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              {label}
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(16px, 4vw, 22px)',
                letterSpacing: '2px',
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          fontSize: 11,
          letterSpacing: '3px',
          color: 'rgba(255,255,255,0.18)',
          fontFamily: "'Bebas Neue', sans-serif",
        }}
      >
        ASDF 1ST LIVE &copy; 2026
      </div>
    </section>
  )
}
