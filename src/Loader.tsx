import { useEffect, useState } from 'react'

const DOTS = 16

/**
 * Full-screen loader. Sketchfab reports no download progress, so the percentage eases toward 92
 * while the model loads, then runs to 100 when `done` flips. shortcut: fake progress, swap for real events if Sketchfab adds them.
 */
export default function Loader({ done }: { done: boolean }) {
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = gone ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [gone])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      setPct((p) => {
        const target = done ? 100 : 92
        const next = p + (target - p) * (done ? 0.18 : 0.012)
        return done && next > 99.5 ? 100 : next
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [done])

  // Never trap the visitor: leave after 25 s even if the model never reports ready.
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 25000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (pct >= 100) {
      const t = setTimeout(() => setGone(true), 450)
      return () => clearTimeout(t)
    }
  }, [pct])

  if (gone) return null
  const lit = Math.floor((pct / 100) * DOTS)

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading, ${Math.floor(pct)} percent`}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#0e0f10] px-4 py-10 transition-opacity duration-500 ${pct >= 100 ? 'opacity-0' : 'opacity-100'}`}
    >
      <span />
      <div className="flex w-full max-w-3xl flex-col items-center gap-6">
        <p className="font-label text-sm tracking-[0.5em] text-pin-text sm:text-base">LOADING...</p>
        <div className="flex w-full items-center justify-between" aria-hidden>
          {Array.from({ length: DOTS }, (_, i) => {
            const on = i < lit
            const head = i === lit
            const size = on ? 6 + (i / DOTS) * 14 : 10
            return (
              <span
                key={i}
                className={`rounded-full transition-all duration-300 ${head ? 'loader-head' : ''}`}
                style={{
                  width: size,
                  height: size,
                  background: on || head ? '#ff7d4d' : '#6b3a26',
                  opacity: on ? 1 : head ? 1 : 0.55,
                  boxShadow: on ? `0 0 ${4 + i}px #ff5b1f` : 'none',
                }}
              />
            )
          })}
        </div>
      </div>
      <p className="font-label text-5xl tabular-nums text-ink sm:text-6xl">
        {Math.floor(pct)}
        <span className="text-2xl text-muted">%</span>
      </p>
    </div>
  )
}
