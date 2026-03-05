import { useState, useEffect } from 'react'

// 공연 시작 시각: 2026-03-28 18:00 KST (UTC+9)
const CONCERT_TIME = new Date('2026-03-28T18:00:00+09:00').getTime()

export function useCountdown() {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const remaining = CONCERT_TIME - now
  const isUnlocked = remaining <= 0

  if (isUnlocked) return { isUnlocked: true, d: 0, h: 0, m: 0, s: 0 }

  const totalSec = Math.floor(remaining / 1000)
  const d = Math.floor(totalSec / 86400)
  const h = Math.floor((totalSec % 86400) / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60

  return { isUnlocked, d, h, m, s }
}
