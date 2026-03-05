import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useInView } from '../hooks/useInView'

const E = 'cubic-bezier(0.22, 1, 0.36, 1)'

function formatDate(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

export default function Comments() {
  const [comments, setComments] = useState([])
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [titleRef, titleIn] = useInView()
  const [formRef, formIn] = useInView()
  const [listRef, listIn] = useInView()

  async function fetchComments() {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setComments(data)
  }

  useEffect(() => { fetchComments() }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const trimNick = nickname.trim()
    const trimMsg = message.trim()
    if (!trimNick || !trimMsg) return
    if (trimNick.length > 20) { setError('닉네임은 20자 이하로 입력해주세요.'); return }
    if (trimMsg.length > 200) { setError('메시지는 200자 이하로 입력해주세요.'); return }

    setSubmitting(true)
    setError('')
    const { error: err } = await supabase
      .from('comments')
      .insert({ nickname: trimNick, message: trimMsg })

    if (err) {
      setError('저장 중 오류가 발생했어요. 다시 시도해주세요.')
    } else {
      setNickname('')
      setMessage('')
      await fetchComments()
    }
    setSubmitting(false)
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 6,
    padding: '12px 14px',
    color: '#FFFFFF',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  return (
    <section
      className="content-section"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Title */}
      <div ref={titleRef} style={{ opacity: titleIn ? undefined : 0, textAlign: 'center' }}>
        <div
          className="section-eyebrow"
          style={titleIn ? { animation: `fadeInUp 0.8s ${E} 0ms both` } : {}}
        >
          방명록
        </div>
        <div
          className="section-sub"
          style={titleIn ? { animation: `fadeInUp 0.8s ${E} 80ms both` } : {}}
        >
          Guestbook &middot; 응원 메시지를 남겨주세요
        </div>
      </div>

      {/* Form */}
      <div
        ref={formRef}
        style={formIn ? { animation: `fadeInUp 0.85s ${E} 0ms both` } : { opacity: 0 }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            maxLength={20}
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = 'rgba(255,140,0,0.5)' }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)' }}
          />
          <textarea
            placeholder="응원 메시지를 남겨주세요 (200자 이내)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={200}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
            onFocus={e => { e.target.style.borderColor = 'rgba(255,140,0,0.5)' }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)' }}
          />
          {error && (
            <div style={{ fontSize: 13, color: '#FF4D4D', paddingLeft: 2 }}>{error}</div>
          )}
          <button
            type="submit"
            disabled={submitting || !nickname.trim() || !message.trim()}
            style={{
              alignSelf: 'flex-end',
              padding: '12px 28px',
              background: submitting ? 'rgba(255,140,0,0.4)' : '#FF8C00',
              color: '#000',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 16,
              letterSpacing: '2px',
              border: 'none',
              borderRadius: 6,
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { if (!submitting) e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {submitting ? '전송 중...' : '남기기'}
          </button>
        </form>
      </div>

      {/* Comments list */}
      <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {comments.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 0',
              color: 'rgba(255,255,255,0.25)',
              fontSize: 14,
              fontFamily: "'Noto Sans KR', sans-serif",
              ...(listIn ? { animation: `fadeInUp 0.7s ${E} both` } : { opacity: 0 }),
            }}
          >
            첫 번째 응원 메시지를 남겨보세요!
          </div>
        ) : (
          comments.map((c, i) => (
            <div
              key={c.id}
              style={{
                padding: '16px 18px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8,
                ...(listIn
                  ? { animation: `fadeInUp 0.6s ${E} ${Math.min(i, 5) * 60}ms both` }
                  : { opacity: 0 }),
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 15,
                    letterSpacing: '1.5px',
                    color: '#FF8C00',
                  }}
                >
                  {c.nickname}
                </span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
                  {formatDate(c.created_at)}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: "'Noto Sans KR', sans-serif",
                  wordBreak: 'break-word',
                }}
              >
                {c.message}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
