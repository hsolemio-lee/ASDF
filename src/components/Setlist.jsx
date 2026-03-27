import { useState } from 'react'
import { setlist } from '../data'
import { useInView } from '../hooks/useInView'
import { useCountdown } from '../hooks/useCountdown'

const TAG_COLOR = {
  '오프닝':  '#00FF7F',
  '타이틀곡': '#FF8C00',
  '앙코르': '#9B4DFF',
}

const E = 'cubic-bezier(0.22, 1, 0.36, 1)'

function redact(title) {
  const len = Math.max(8, Math.round(title.length * 1.1))
  return '█'.repeat(len)
}

function SessionModal({ track, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          zIndex: 200,
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        }}
      />
      {/* 센터링 래퍼 — transform으로 인한 animation 충돌 방지 */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 201,
        }}
      >
      <div
        style={{
          background: '#0d0812',
          border: '1px solid rgba(255,140,0,0.35)',
          borderRadius: 14,
          padding: '26px 26px 22px',
          width: 'min(440px, 88vw)',
          boxShadow: '0 0 50px rgba(255,140,0,0.12), 0 8px 48px rgba(0,0,0,0.85)',
          animation: `fadeInScale 0.25s ${E} both`,
          position: 'relative',
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 14,
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.3)',
            fontSize: 24,
            cursor: 'pointer',
            lineHeight: 1,
            padding: '0 4px',
          }}
        >
          ×
        </button>

        {/* 트랙 번호 + 파트 배지 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 13,
              color: 'rgba(255,255,255,0.22)',
              letterSpacing: '1px',
            }}
          >
            {String(track.no).padStart(2, '0')}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '2px',
              color: '#FF8C00',
              background: 'rgba(255,140,0,0.1)',
              border: '1px solid rgba(255,140,0,0.25)',
              padding: '2px 8px',
              borderRadius: 3,
            }}
          >
            {track.part}
          </span>
        </div>

        {/* 제목 */}
        <div
          style={{
            fontWeight: 800,
            fontSize: 'clamp(17px, 4.5vw, 22px)',
            marginBottom: 20,
            color: '#fff',
            paddingRight: 24,
          }}
        >
          {track.title}
        </div>

        {/* 세션 멤버 목록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {track.session.map(s => (
            <div key={s.role} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.3)',
                  fontWeight: 700,
                  minWidth: 86,
                  flexShrink: 0,
                  paddingTop: 4,
                  letterSpacing: '0.3px',
                }}
              >
                {s.role}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {s.members.map(m => (
                  <span
                    key={m}
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.88)',
                      background: 'rgba(255,255,255,0.055)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '4px 12px',
                      borderRadius: 20,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  )
}

function PartHeader({ label, listIn, i }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '18px 0 6px',
        ...(listIn ? { animation: `fadeInLeft 0.65s ${E} ${i * 55}ms both` } : { opacity: 0 }),
      }}
    >
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 13,
          letterSpacing: '4px',
          color: 'rgba(255,140,0,0.65)',
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, rgba(255,140,0,0.2), transparent)',
        }}
      />
    </div>
  )
}

function LockedTrack({ track, i, listIn }) {
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
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.03) 2px, rgba(255,0,0,0.03) 4px)',
          pointerEvents: 'none',
        }}
      />
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
      <span
        style={{
          flex: 1,
          fontWeight: 700,
          fontSize: 'clamp(14px, 3.5vw, 17px)',
          color: 'rgba(180,0,0,0.55)',
          letterSpacing: '2px',
          animation: 'redactFlicker 3s ease-in-out infinite',
          animationDelay: `${(track.no - 1) * 0.31}s`,
          userSelect: 'none',
        }}
      >
        {redact(track.title)}
      </span>
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
          animationDelay: `${(track.no - 1) * 0.2}s`,
        }}
      >
        &#128274; LOCKED
      </span>
    </div>
  )
}

function UnlockedTrack({ track, i, listIn, onSelect }) {
  const accent = TAG_COLOR[track.tag] || 'rgba(255,255,255,0.1)'
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '16px 20px',
        background: 'rgba(255,255,255,0.025)',
        borderLeft: `3px solid ${track.tag ? accent : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '0 6px 6px 0',
        transition: 'background 0.2s',
        ...(listIn
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

      {/* 클릭 가능한 제목 */}
      <span
        onClick={() => onSelect(track)}
        style={{
          flex: 1,
          fontWeight: 700,
          fontSize: 'clamp(14px, 3.5vw, 17px)',
          cursor: 'pointer',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#FF8C00' }}
        onMouseLeave={e => { e.currentTarget.style.color = '' }}
      >
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

export default function Setlist({ memberPreview }) {
  const [titleRef, titleIn] = useInView()
  const [listRef,  listIn]  = useInView()
  const { isUnlocked } = useCountdown()
  const [selectedTrack, setSelectedTrack] = useState(null)

  const isViewable = isUnlocked || memberPreview

  // 파트 헤더 포함 평탄화 목록 생성
  const items = []
  let lastPart = null
  setlist.forEach((track, trackIdx) => {
    if (track.part !== lastPart) {
      lastPart = track.part
      items.push({ type: 'header', part: track.part })
    }
    items.push({ type: 'track', track })
  })

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
          {isViewable
            ? `${setlist.length} Tracks · 2026.03.28`
            : `${setlist.length} Tracks · 공연 10분 전 공개`}
        </div>

        {/* 잠금 상태 안내 */}
        {!isViewable && titleIn && (
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
              &#128274;&nbsp;&nbsp;공연 10분 전 자동으로 공개됩니다
            </span>
          </div>
        )}

        {/* 멤버 미리보기 배지 */}
        {memberPreview && !isUnlocked && titleIn && (
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
                color: 'rgba(0,207,255,0.7)',
                background: 'rgba(0,207,255,0.07)',
                border: '1px solid rgba(0,207,255,0.25)',
                padding: '6px 14px',
                borderRadius: 4,
                fontWeight: 700,
              }}
            >
              &#128275;&nbsp;&nbsp;MEMBER PREVIEW
            </span>
          </div>
        )}
      </div>

      <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((item, idx) => {
          if (item.type === 'header') {
            return (
              <PartHeader
                key={`header-${item.part}`}
                label={item.part}
                listIn={listIn}
                i={idx}
              />
            )
          }
          return isViewable
            ? (
              <UnlockedTrack
                key={item.track.no}
                track={item.track}
                i={idx}
                listIn={listIn}
                onSelect={setSelectedTrack}
              />
            )
            : (
              <LockedTrack
                key={item.track.no}
                track={item.track}
                i={idx}
                listIn={listIn}
              />
            )
        })}
      </div>

      {selectedTrack && (
        <SessionModal
          track={selectedTrack}
          onClose={() => setSelectedTrack(null)}
        />
      )}
    </section>
  )
}
