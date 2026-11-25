import { useRef, useState } from 'react'

export default function Carousel({ shots, name }: { shots: string[]; name: string }) {
  const track = useRef<HTMLUListElement>(null)
  const [i, setI] = useState(0)
  const many = shots.length > 1

  const go = (n: number) => {
    const el = track.current
    if (el) el.scrollTo({ left: el.clientWidth * n, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }
  const btn = 'absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center border border-ink bg-foam text-ink hover:bg-ink hover:text-foam disabled:hidden'

  return (
    <div role="group" aria-roledescription="carousel" aria-label={`${name} screenshots`} className="relative border border-ink bg-plate">
      <ul
        ref={track}
        onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex aspect-[16/10] snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shots.map((s, n) => (
          <li key={s} role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${shots.length}`} className="size-full shrink-0 snap-center">
            <img src={s} alt={`${name}, screenshot ${n + 1}`} loading="lazy" className="size-full object-contain" />
          </li>
        ))}
      </ul>
      {many && (
        <>
          <button type="button" aria-label="Previous screenshot" disabled={i === 0} onClick={() => go(i - 1)} className={`${btn} left-2`}>‹</button>
          <button type="button" aria-label="Next screenshot" disabled={i === shots.length - 1} onClick={() => go(i + 1)} className={`${btn} right-2`}>›</button>
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
            {shots.map((_, n) => (
              <button key={n} type="button" aria-label={`Go to screenshot ${n + 1}`} aria-current={n === i} onClick={() => go(n)} className={`size-2.5 rounded-full border border-ink ${n === i ? 'bg-pin' : 'bg-foam'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
