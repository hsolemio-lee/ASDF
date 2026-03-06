import { useEffect, useRef, useState, useCallback } from 'react'
import { members } from '../data'
import { useInView } from '../hooks/useInView'
import { supabase } from '../lib/supabase'

const E = 'cubic-bezier(0.22, 1, 0.36, 1)'

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 6,
  padding: '10px 12px',
  color: '#FFFFFF',
  fontFamily: "'Noto Sans KR', sans-serif",
  fontSize: 13,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

function formatDate(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function MemberCheers({ member, onClose }) {
  const [cheers, setCheers] = useState([])
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase
      .from('comments')
      .select('*')
      .eq('member', member.nickname)
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setCheers(data) })
  }, [member.nickname])

  async function handleSubmit(e) {
    e.preventDefault()
    const trimNick = nickname.trim()
    const trimMsg = message.trim()
    if (!trimNick || !trimMsg) return

    setSubmitting(true)
    setError('')
    const { error: err } = await supabase
      .from('comments')
      .insert({ nickname: trimNick, message: trimMsg, member: member.nickname })

    if (err) {
      setError(`오류: ${err.message}`)
    } else {
      setNickname('')
      setMessage('')
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('member', member.nickname)
        .order('created_at', { ascending: false })
      if (data) setCheers(data)
    }
    setSubmitting(false)
  }

  return (
    <div
      style={{
        marginTop: 24,
        paddingTop: 24,
        borderTop: `1px solid ${member.color}33`,
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: '3px',
          color: member.color,
          fontWeight: 700,
          marginBottom: 14,
        }}
      >
        CHEERS · {member.nickname}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          maxLength={20}
          style={inputStyle}
          onFocus={e => { e.target.style.borderColor = `${member.color}88` }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.14)' }}
        />
        <textarea
          placeholder={`${member.nickname}에게 응원 메시지를 남겨주세요`}
          value={message}
          onChange={e => setMessage(e.target.value)}
          maxLength={200}
          rows={2}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }}
          onFocus={e => { e.target.style.borderColor = `${member.color}88` }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.14)' }}
        />
        {error && <div style={{ fontSize: 12, color: '#FF4D4D' }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={submitting || !nickname.trim() || !message.trim()}
            style={{
              padding: '9px 22px',
              background: submitting ? `${member.color}66` : member.color,
              color: '#000',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 14,
              letterSpacing: '2px',
              border: 'none',
              borderRadius: 5,
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { if (!submitting) e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {submitting ? '전송 중...' : '응원 남기기'}
          </button>
        </div>
      </form>

      {/* Cheer list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 260, overflowY: 'auto' }}>
        {cheers.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '20px 0',
              color: 'rgba(255,255,255,0.25)',
              fontSize: 13,
              fontFamily: "'Noto Sans KR', sans-serif",
            }}
          >
            첫 번째 응원을 남겨보세요!
          </div>
        ) : (
          cheers.map(c => (
            <div
              key={c.id}
              style={{
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${member.color}22`,
                borderRadius: 6,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: '1.5px', color: member.color }}>
                  {c.nickname}
                </span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
                  {formatDate(c.created_at)}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', fontFamily: "'Noto Sans KR', sans-serif", wordBreak: 'break-word' }}>
                {c.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default function Members() {
  const [titleRef, titleIn] = useInView()
  const [gridRef, gridIn] = useInView()

  const [hoverIdx, setHoverIdx] = useState(-1)
  const [glowSet, setGlowSet] = useState(() => new Set())
  const [cardKeys, setCardKeys] = useState(() => new Array(members.length).fill(0))
  const [expandedIdx, setExpandedIdx] = useState(null)

  const cardRefs = useRef([])

  const activate = useCallback((i) => {
    setCardKeys(prev => prev.map((k, idx) => idx === i ? k + 1 : k))
    setGlowSet(prev => new Set([...prev, i]))
  }, [])

  const deactivate = useCallback((i) => {
    setGlowSet(prev => { const s = new Set(prev); s.delete(i); return s })
  }, [])

  useEffect(() => {
    const obs = cardRefs.current.map((el, i) => {
      if (!el) return null
      const o = new IntersectionObserver(
        ([entry]) => { entry.isIntersecting ? activate(i) : deactivate(i) },
        { threshold: 0, rootMargin: '-32% 0px -32% 0px' }
      )
      o.observe(el)
      return o
    })
    return () => obs.forEach(o => o?.disconnect())
  }, [activate, deactivate])

  function handleCardClick(i) {
    if (members[i].secret) return
    setExpandedIdx(prev => prev === i ? null : i)
  }

  return (
    <section
      className="content-section"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      <div ref={titleRef} style={{ opacity: titleIn ? undefined : 0 }}>
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
        <div
          style={
            titleIn
              ? {
                  animation: `fadeInUp 0.8s ${E} 160ms both`,
                  marginTop: 20,
                  marginBottom: 8,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: "'Noto Sans KR', sans-serif",
                  letterSpacing: '0.5px',
                }
              : { opacity: 0 }
          }
        >
          멤버를 선택하면 응원 메시지를 남길 수 있어요
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
          const isGlow = glowSet.has(i)
          const isHover = hoverIdx === i
          const isExpanded = expandedIdx === i
          const canExpand = !m.secret

          return (
            <div
              key={m.nickname}
              ref={el => { cardRefs.current[i] = el }}
              onClick={() => handleCardClick(i)}
              style={{
                padding: '22px 24px',
                border: `1px solid ${m.color}${isExpanded ? 'dd' : isGlow ? 'bb' : isHover ? '66' : '28'}`,
                borderRadius: 6,
                background: `linear-gradient(135deg, ${m.color}${isExpanded ? '22' : isGlow ? '1c' : '0d'} 0%, transparent 100%)`,
                position: 'relative',
                overflow: 'hidden',
                scale: isGlow || isExpanded ? '1.02' : '0.95',
                transition: 'border-color 0.3s, box-shadow 0.5s, background 0.4s, scale 0.4s',
                boxShadow: isExpanded
                  ? `0 0 64px ${m.color}44, 0 0 20px ${m.color}33`
                  : isGlow
                    ? `0 0 48px ${m.color}55, 0 0 12px ${m.color}33`
                    : isHover
                      ? `0 0 24px ${m.color}22`
                      : 'none',
                cursor: canExpand ? 'pointer' : 'default',
                ...(isExpanded ? { gridColumn: '1 / -1' } : {}),
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

              {/* Absent badge */}
              {m.absent && (
                <div
                  aria-label="이번 공연 불참"
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 14,
                    fontSize: 9,
                    letterSpacing: '2px',
                    color: 'rgba(255,255,255,0.55)',
                    fontWeight: 700,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 4,
                    padding: '2px 7px',
                  }}
                >
                  이번 공연 불참
                </div>
              )}

              {/* Expand hint */}
              {canExpand && !isExpanded && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 14,
                    fontSize: 9,
                    letterSpacing: '2px',
                    color: `${m.color}88`,
                    fontWeight: 700,
                  }}
                >
                  CHEER ↓
                </div>
              )}
              {isExpanded && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 14,
                    fontSize: 9,
                    letterSpacing: '2px',
                    color: `${m.color}cc`,
                    fontWeight: 700,
                  }}
                >
                  닫기 ✕
                </div>
              )}

              {/* Card content */}
              <div style={isExpanded ? { display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' } : {}}>
                {/* Member info */}
                <div style={isExpanded ? { minWidth: 220 } : {}}>

                  {/* Photo / Avatar area */}
                  {!m.secret && (
                    <div
                      style={{
                        width: '100%',
                        height: 152,
                        borderRadius: 4,
                        overflow: 'hidden',
                        marginBottom: 16,
                        position: 'relative',
                        background: `${m.color}0d`,
                        border: `1px solid ${m.color}22`,
                        flexShrink: 0,
                      }}
                    >
                      {m.photo ? (
                        <>
                          <img
                            src={m.photo}
                            alt={m.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center top',
                              display: 'block',
                            }}
                          />
                          {/* Gradient overlay — blends photo into dark card bg */}
                          <div
                            aria-hidden="true"
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: '55%',
                              background: 'linear-gradient(to bottom, transparent, rgba(8,5,10,0.88))',
                              pointerEvents: 'none',
                            }}
                          />
                          {/* Subtle color tint on sides */}
                          <div
                            aria-hidden="true"
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: `linear-gradient(135deg, ${m.color}12 0%, transparent 60%)`,
                              pointerEvents: 'none',
                            }}
                          />
                        </>
                      ) : (
                        /* Placeholder for members without a photo */
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                            background: `linear-gradient(135deg, ${m.color}0f 0%, transparent 100%)`,
                          }}
                        >
                          <div
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              border: `1px solid ${m.color}44`,
                              background: `${m.color}18`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 26,
                              fontFamily: "'Bebas Neue', sans-serif",
                              color: `${m.color}99`,
                              letterSpacing: 2,
                            }}
                          >
                            {m.name[0]}
                          </div>
                          <div
                            style={{
                              fontSize: 9,
                              letterSpacing: '3px',
                              color: 'rgba(255,255,255,0.18)',
                              fontWeight: 700,
                            }}
                          >
                            NO PHOTO
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: 12,
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
                        fontSize: 14,
                        letterSpacing: '1px',
                        color: 'rgba(255,255,255,0.75)',
                        marginBottom: 10,
                        fontFamily: "'Noto Sans KR', sans-serif",
                        fontWeight: 600,
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
                </div>

                {/* Expanded cheers panel */}
                {isExpanded && (
                  <div
                    style={{ flex: 1, minWidth: 280 }}
                    onClick={e => e.stopPropagation()}
                  >
                    <MemberCheers member={m} />
                  </div>
                )}
              </div>

              {/* Secret overlay */}
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
