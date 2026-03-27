import { useState, useEffect } from 'react'

// 공연 시작 시각: 2026-03-28 18:00 KST (UTC+9)
const CONCERT_TIME = new Date('2026-03-28T18:00:00+09:00').getTime()
// 세트리스트 공개 시각: 공연 10분 전
const UNLOCK_TIME  = new Date('2026-03-28T17:50:00+09:00').getTime()

export function useCountdown() {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const isConcertLive = now >= CONCERT_TIME
  const isUnlocked    = now >= UNLOCK_TIME

  if (isConcertLive) return { isUnlocked: true, isConcertLive: true, d: 0, h: 0, m: 0, s: 0 }

  const remaining = CONCERT_TIME - now
  const totalSec = Math.floor(remaining / 1000)
  const d = Math.floor(totalSec / 86400)
  const h = Math.floor((totalSec % 86400) / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60

  return { isUnlocked, isConcertLive, d, h, m, s }
}
