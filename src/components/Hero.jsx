import { useState } from 'react'
import { concert } from '../data'
import { useCountdown } from '../hooks/useCountdown'

const LIGHTS = [
  { x: '8%',  color: 'rgba(0, 220, 100, 0.42)',   w: '68%', h: '58%' },
  { x: '50%', color: 'rgba(255, 140, 0, 0.48)',    w: '52%', h: '54%' },
  { x: '92%', color: 'rgba(140, 50, 255, 0.42)',   w: '68%', h: '58%' },
  { x: '28%', color: 'rgba(0, 180, 255, 0.30)',    w: '42%', h: '46%' },
  { x: '72%', color: 'rgba(255, 210, 0, 0.22)',    w: '42%', h: '40%' },
]

const E = 'cubic-bezier(0.22, 1, 0.36, 1)'

function heroAnim(delay) {
  return { animation: `heroIn 0.9s ${E} ${delay}ms both` }
}

function CountdownUnit({ value, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 56 }}>
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(32px, 9vw, 52px)',
          lineHeight: 1,
          color: '#00CFFF',
          textShadow: '0 0 18px rgba(0,207,255,0.6)',
          animation: 'countdownPulse 1s ease-in-out infinite',
          letterSpacing: '2px',
        }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span
        style={{
          fontSize: 9,
          letterSpacing: '2px',
          color: 'rgba(255,255,255,0.35)',
          marginTop: 4,
          fontWeight: 700,
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Hero({ onMemberPreview, memberPreview }) {
  const { isConcertLive, d, h, m, s } = useCountdown()
  const [tapCount, setTapCount] = useState(0)
  const [tapFlash, setTapFlash] = useState(false)
  const [showUnlockMsg, setShowUnlockMsg] = useState(false)

  function handleLogoTap() {
    if (memberPreview) return
    const next = tapCount + 1
    setTapCount(next)
    setTapFlash(true)
    setTimeout(() => setTapFlash(false), 180)
    if (next >= 10) {
      onMemberPreview()
      setShowUnlockMsg(true)
      setTimeout(() => setShowUnlockMsg(false), 2500)
    }
  }

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
          animation: `stagePulse 5s ease-in-out infinite`,
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
          ...heroAnim(0),
        }}
      >
        <span>{concert.date}</span>
        <span>{concert.time}</span>
      </div>

      {/* Main content */}
      <div style={{ textAlign: 'center', width: '100%', maxWidth: 560, position: 'relative', zIndex: 2 }}>

        {/* asdf logo — 10번 탭하면 멤버 미리보기 해제 */}
        <div
          onClick={handleLogoTap}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(72px, 22vw, 130px)',
            lineHeight: 1,
            letterSpacing: '-2px',
            background: 'linear-gradient(175deg, #FFD700 0%, #FF8C00 55%, #FF5500 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: tapFlash
              ? 'drop-shadow(0 0 52px rgba(255,200,0,1))'
              : memberPreview
                ? 'drop-shadow(0 0 32px rgba(0,207,255,0.75))'
                : 'drop-shadow(0 0 24px rgba(255,140,0,0.65))',
            transition: 'filter 0.15s',
            cursor: memberPreview ? 'default' : 'pointer',
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
            ...heroAnim(120),
          }}
        >
          asdf
        </div>

        {/* 탭 진행 점 (1~9번 탭 중일 때만 표시) */}
        {!memberPreview && tapCount > 0 && tapCount < 10 && (
          <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 6 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: i < tapCount ? 'rgba(255,160,0,0.75)' : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.1s',
                }}
              />
            ))}
          </div>
        )}

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
            ...heroAnim(260),
          }}
        >
          &#9889; 1st Live &#9889;
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,140,0,0.5), transparent)', marginBottom: 20, ...heroAnim(340) }} />

        {/* Main title */}
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(44px, 13vw, 88px)',
            lineHeight: 1,
            letterSpacing: '4px',
            color: '#FFFFFF',
            textShadow: '0 0 40px rgba(255,255,255,0.18)',
            ...heroAnim(400),
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
            ...heroAnim(480),
          }}
        >
          ROCKERS GARDEN
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,140,0,0.35), transparent)', marginBottom: 28, ...heroAnim(520) }} />

        {/* Venue KO */}
        <div
          style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(38px, 13vw, 76px)',
            letterSpacing: '-1px',
            color: '#FFFFFF',
            lineHeight: 1.05,
            ...heroAnim(600),
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
            ...heroAnim(700),
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
            ...heroAnim(800),
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
            ...heroAnim(880),
          }}
        >
          {'\uc7a5\uc18c'} : {concert.address}
        </div>

        {/* Countdown */}
        <div
          style={{
            marginTop: 36,
            ...heroAnim(960),
          }}
        >
          {isConcertLive ? (
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(22px, 6vw, 36px)',
                letterSpacing: '6px',
                color: '#00FF7F',
                textShadow: '0 0 24px rgba(0,255,127,0.65)',
                animation: 'stagePulse 1.5s ease-in-out infinite',
              }}
            >
              &#9654; NOW LIVE
            </div>
          ) : (
            <div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: '4px',
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                공연 시작까지
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  gap: 4,
                }}
              >
                <CountdownUnit value={d} label="DAYS" />
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(28px, 8vw, 46px)',
                    color: 'rgba(0,207,255,0.4)',
                    lineHeight: 1,
                    paddingTop: 2,
                    animation: 'colonBlink 1s step-end infinite',
                  }}
                >
                  :
                </span>
                <CountdownUnit value={h} label="HRS" />
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(28px, 8vw, 46px)',
                    color: 'rgba(0,207,255,0.4)',
                    lineHeight: 1,
                    paddingTop: 2,
                    animation: 'colonBlink 1s step-end infinite',
                  }}
                >
                  :
                </span>
                <CountdownUnit value={m} label="MIN" />
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(28px, 8vw, 46px)',
                    color: 'rgba(0,207,255,0.4)',
                    lineHeight: 1,
                    paddingTop: 2,
                    animation: 'colonBlink 1s step-end infinite',
                  }}
                >
                  :
                </span>
                <CountdownUnit value={s} label="SEC" />
              </div>
            </div>
          )}
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
          animation: `bounce 2s ease-in-out 1.2s infinite, heroIn 0.9s ${E} 1s both`,
          zIndex: 2,
        }}
      >
        <span>SCROLL</span>
        <span>&#9660;</span>
      </div>

      {/* 멤버 미리보기 해제 알림 */}
      {showUnlockMsg && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 300,
            background: 'rgba(8,5,10,0.92)',
            border: '1px solid rgba(0,207,255,0.45)',
            borderRadius: 14,
            padding: '24px 36px',
            textAlign: 'center',
            boxShadow: '0 0 40px rgba(0,207,255,0.2), 0 8px 40px rgba(0,0,0,0.8)',
            animation: `fadeInScale 0.3s ${E} both`,
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: 30, marginBottom: 10 }}>&#128275;</div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 18,
              letterSpacing: '4px',
              color: '#00CFFF',
              textShadow: '0 0 16px rgba(0,207,255,0.6)',
            }}
          >
            MEMBER PREVIEW
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.45)',
              marginTop: 6,
              letterSpacing: '1px',
            }}
          >
            세트리스트가 공개되었습니다
          </div>
        </div>
      )}
    </section>
  )
}
