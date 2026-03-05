import { concert } from '../data'
import { useInView } from '../hooks/useInView'

const E = 'cubic-bezier(0.22, 1, 0.36, 1)'

const ADDR = '서울 강남구 도곡로4길 5 록커스가든'

const MAP_LINKS = [
  {
    label: '네이버 지도',
    url: 'https://map.naver.com/v5/search/' + encodeURIComponent(ADDR),
    bg: '#03C75A',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
      </svg>
    ),
  },
  {
    label: '카카오맵',
    url: 'https://map.kakao.com/?q=' + encodeURIComponent(ADDR),
    bg: '#FEE500',
    color: '#3C1E1E',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#3C1E1E" aria-hidden="true">
        <path d="M12 2C6.477 2 2 5.925 2 10.773c0 3.076 1.76 5.78 4.418 7.414L5.5 22l4.674-2.463C10.731 19.838 11.36 19.9 12 19.9c5.523 0 10-3.925 10-8.773C22 5.925 17.523 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: 'T맵',
    url: 'https://tmap.life/' + encodeURIComponent(ADDR),
    bg: '#E8002D',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
      </svg>
    ),
  },
]

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

        {/* Map buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {MAP_LINKS.map(({ label, url, bg, color = '#FFFFFF', icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                background: bg,
                color,
                fontFamily: "'Noto Sans KR', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '0.5px',
                borderRadius: 6,
                textDecoration: 'none',
                transition: 'filter 0.2s, transform 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.filter = 'brightness(1.12)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = 'brightness(1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {icon}
              {label}
            </a>
          ))}
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
