import { useEffect, useRef, useState, useCallback } from 'react'
import { members } from '../data'
import { useInView } from '../hooks/useInView'

const E = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function Members() {
  const [titleRef, titleIn] = useInView()
  const [gridRef,  gridIn]  = useInView()

  const [hoverIdx,  setHoverIdx]  = useState(-1)
  const [glowSet,   setGlowSet]   = useState(() => new Set())
  const [cardKeys,  setCardKeys]  = useState(() => new Array(members.length).fill(0))

  const cardRefs = useRef([])
  const timers   = useRef([])

  const activate = useCallback((i) => {
    setCardKeys(prev => prev.map((k, idx) => idx === i ? k + 1 : k))
    setGlowSet(prev => new Set([...prev, i]))
    clearTimeout(timers.current[i])
    timers.current[i] = setTimeout(() => {
      setGlowSet(prev => { const s = new Set(prev); s.delete(i); return s })
    }, 850)
  }, [])

  useEffect(() => {
    const obs = cardRefs.current.map((el, i) => {
      if (!el) return null
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) activate(i) },
        { threshold: 0.35 }
      )
      o.observe(el)
      return o
    })
    return () => {
      obs.forEach(o => o?.disconnect())
      timers.current.forEach(t => clearTimeout(t))
    }
  }, [activate])

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
          ASDF Band &middot; {members.length} Members
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
        {members.map((m, i) => {
          const isGlow  = glowSet.has(i)
          const isHover = hoverIdx === i

          return (
            <div
              key={m.nickname}
              ref={el => { cardRefs.current[i] = el }}
              style={{
                padding: '22px 24px',
                border: `1px solid ${m.color}${isGlow ? 'bb' : isHover ? '66' : '28'}`,
                borderRadius: 6,
                background: `linear-gradient(135deg, ${m.color}${isGlow ? '1c' : '0d'} 0%, transparent 100%)`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.5s, background 0.4s',
                boxShadow: isGlow
                  ? `0 0 48px ${m.color}55, 0 0 12px ${m.color}33`
                  : isHover
                    ? `0 0 24px ${m.color}22`
                    : 'none',
                ...(gridIn
                  ? { animation: `fadeInScale 0.7s ${E} ${i * 90}ms both` }
                  : { opacity: 0 }),
              }}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(-1)}
            >
              {/* Sheen sweep on scroll highlight */}
              {cardKeys[i] > 0 && (
                <div
                  key={cardKeys[i]}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '45%',
                    height: '100%',
                    background: `linear-gradient(105deg, transparent 0%, ${m.color}55 50%, transparent 100%)`,
                    animation: 'cardSheen 0.65s ease-out forwards',
                    pointerEvents: 'none',
                    zIndex: 5,
                  }}
                />
              )}

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
                {m.secret ? '??????' : m.role}
              </div>

              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(22px, 5vw, 30px)',
                  letterSpacing: '2px',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  marginBottom: 4,
                  filter: m.secret ? 'blur(8px)' : undefined,
                  userSelect: m.secret ? 'none' : undefined,
                }}
              >
                {m.nickname}
              </div>

              {!m.secret && (
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: '1px',
                    color: 'rgba(255,255,255,0.35)',
                    marginBottom: 10,
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  {m.name}
                </div>
              )}

              <div
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.45)',
                  fontStyle: 'italic',
                  fontFamily: "'Noto Sans KR', sans-serif",
                  filter: m.secret ? 'blur(6px)' : undefined,
                  userSelect: m.secret ? 'none' : undefined,
                }}
              >
                {m.desc}
              </div>

              {m.secret && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      fontSize: 32,
                      letterSpacing: '10px',
                      color: m.color,
                      fontFamily: "'Bebas Neue', sans-serif",
                      textShadow: `0 0 12px ${m.color}88`,
                    }}
                  >
                    ???
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      letterSpacing: '4px',
                      color: 'rgba(255,255,255,0.3)',
                      fontWeight: 700,
                    }}
                  >
                    CLASSIFIED
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
