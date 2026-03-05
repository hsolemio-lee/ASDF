import { setlist } from '../data'
import { useInView } from '../hooks/useInView'
import { useCountdown } from '../hooks/useCountdown'

const TAG_COLOR = {
  '오프닝':  '#00FF7F',
  '타이틀곡': '#FF8C00',
  '앙코르': '#9B4DFF',
}

const E = 'cubic-bezier(0.22, 1, 0.36, 1)'

// 트랙 제목 길이에 맞게 블록 문자 생성
function redact(title) {
  // 글자 수 기준으로 █ 블록 생성 (모바일 대응)
  const len = Math.max(8, Math.round(title.length * 1.1))
  return '█'.repeat(len)
}

function LockedTrack({ track, i, listIn }) {
  const accent = TAG_COLOR[track.tag] || 'rgba(255,255,255,0.1)'
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '16px 20px',
        background: 'rgba(255,10,10,0.04)',
        borderLeft: '3px solid rgba(255,40,40,0.25)',
        borderRadius: '0 6px 6px 0',
        position: 'relative',
        overflow: 'hidden',
        ...(listIn
          ? { animation: `fadeInLeft 0.65s ${E} ${i * 55}ms both` }
          : { opacity: 0 }),
      }}
    >
      {/* 스캔라인 효과 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.03) 2px, rgba(255,0,0,0.03) 4px)',
          pointerEvents: 'none',
        }}
      />

      {/* 트랙 번호 */}
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 18,
          color: 'rgba(255,60,60,0.3)',
          minWidth: 26,
          lineHeight: 1,
        }}
      >
        {String(track.no).padStart(2, '0')}
      </span>

      {/* 가려진 제목 */}
      <span
        style={{
          flex: 1,
          fontWeight: 700,
          fontSize: 'clamp(14px, 3.5vw, 17px)',
          color: 'rgba(180,0,0,0.55)',
          letterSpacing: '2px',
          animation: 'redactFlicker 3s ease-in-out infinite',
          animationDelay: `${i * 0.31}s`,
          userSelect: 'none',
        }}
      >
        {redact(track.title)}
      </span>

      {/* LOCKED 배지 */}
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '2px',
          color: 'rgba(255,60,60,0.7)',
          background: 'rgba(255,0,0,0.1)',
          border: '1px solid rgba(255,40,40,0.3)',
          padding: '3px 8px',
          borderRadius: 3,
          whiteSpace: 'nowrap',
          animation: 'lockPulse 2s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`,
        }}
      >
        &#128274; LOCKED
      </span>
    </div>
  )
}

function UnlockedTrack({ track, i, listIn, isNewlyUnlocked }) {
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
        ...(isNewlyUnlocked
          ? { animation: `revealTrack 0.7s ${E} ${i * 80}ms both` }
          : listIn
            ? { animation: `fadeInLeft 0.65s ${E} ${i * 55}ms both` }
            : { opacity: 0 }),
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
}

export default function Setlist() {
  const [titleRef, titleIn] = useInView()
  const [listRef,  listIn]  = useInView()
  const { isUnlocked } = useCountdown()

  return (
    <section className="content-section">
      <div
        ref={titleRef}
        style={{ opacity: titleIn ? undefined : 0 }}
      >
        <div
          className="section-eyebrow"
          style={titleIn ? { animation: `fadeInUp 0.8s ${E} 0ms both` } : {}}
        >
          SETLIST
        </div>
        <div
          className="section-sub"
          style={titleIn ? { animation: `fadeInUp 0.8s ${E} 80ms both` } : {}}
        >
          {isUnlocked
            ? '10 Tracks · 2026.03.28'
            : '10 Tracks · 공연 시작 후 공개'}
        </div>

        {/* 잠금 상태 안내 */}
        {!isUnlocked && titleIn && (
          <div
            style={{
              textAlign: 'center',
              marginBottom: 32,
              animation: `fadeInUp 0.8s ${E} 160ms both`,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: 11,
                letterSpacing: '2px',
                color: 'rgba(255,60,60,0.6)',
                background: 'rgba(255,0,0,0.07)',
                border: '1px solid rgba(255,40,40,0.2)',
                padding: '6px 14px',
                borderRadius: 4,
                fontWeight: 700,
                animation: 'lockPulse 2.5s ease-in-out infinite',
              }}
            >
              &#128274;&nbsp;&nbsp;공연 시작 후 자동으로 공개됩니다
            </span>
          </div>
        )}
      </div>

      <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {setlist.map((track, i) =>
          isUnlocked
            ? <UnlockedTrack key={track.no} track={track} i={i} listIn={listIn} isNewlyUnlocked={false} />
            : <LockedTrack   key={track.no} track={track} i={i} listIn={listIn} />
        )}
      </div>
    </section>
  )
}
