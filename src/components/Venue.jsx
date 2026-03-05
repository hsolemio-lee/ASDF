import { concert } from '../data'
import { useInView } from '../hooks/useInView'

const E = 'cubic-bezier(0.22, 1, 0.36, 1)'

const MAP_URL =
  'https://map.naver.com/v5/search/' +
  encodeURIComponent('서울 강남구 도곡로4길 5 록커스가든')

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
          오시는 길
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
            marginBottom: 24,
          }}
        >
          {concert.address}
        </div>

        {/* Naver Map button */}
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 24px',
            background: '#03C75A',
            color: '#FFFFFF',
            fontFamily: "'Noto Sans KR', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '0.5px',
            borderRadius: 6,
            textDecoration: 'none',
            transition: 'filter 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.filter = 'brightness(1.15)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.filter = 'brightness(1)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {/* Naver N icon SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
          </svg>
          네이버 지도로 보기
        </a>
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
