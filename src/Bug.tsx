import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

const UID = '199e4a1ec2be46a48351e6a95ead7085'
const API_SRC = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'

type Vec = [number, number, number]
type Api = {
  start(): void
  addEventListener(name: string, cb: () => void): void
  getCameraLookAt(cb: (err: unknown, cam: { position: Vec; target: Vec }) => void): void
  setCameraLookAt(pos: Vec, target: Vec, seconds: number): void
}
declare global {
  interface Window {
    Sketchfab?: new (iframe: HTMLIFrameElement) => {
      init(uid: string, opts: Record<string, unknown>): void
    }
  }
}

function loadApi(): Promise<void> {
  if (window.Sketchfab) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = API_SRC
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('sketchfab api'))
    document.head.appendChild(s)
  })
}

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n))

/**
 * The bug owns the camera: the iframe ignores pointer events and this component
 * orbits it from the window cursor (desktop) or from drags (mouse, touch, arrow keys).
 * shortcut: assumes Sketchfab's Z-up camera space, flip UP if the bug tumbles.
 */
export default function Bug({ onReady }: { onReady?: () => void }) {
  const iframe = useRef<HTMLIFrameElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const goal = useRef({ mx: 0, my: 0, dx: 0, dy: 0 })
  const [live, setLive] = useState(() => !matchMedia('(pointer: coarse)').matches)
  const [ready, setReady] = useState(false)
  const [native, setNative] = useState(false)
  const plain = () => {
    setNative(true)
    onReady?.()
    if (iframe.current && !iframe.current.src) iframe.current.src = `https://sketchfab.com/models/${UID}/embed`
  }
  const mounted = useRef(false)
  // Touch devices wait for a tap, so there is nothing to load yet: do not hold the page behind the loader.
  useEffect(() => {
    if (!live) onReady?.()
  }, [live, onReady])
  const inited = useRef(false)

  useEffect(() => {
    if (!live || !iframe.current) return
    mounted.current = true
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

    // StrictMode mounts twice; Sketchfab's client must init a given iframe only once.
    if (!inited.current) {
      inited.current = true
      start()
    }

    function start() {
      loadApi()
      .then(() => {
        if (!iframe.current || !window.Sketchfab) return
        const client = new window.Sketchfab(iframe.current)
        client.init(UID, {
          success(api: Api) {
            api.start()
            api.addEventListener('viewerready', () => {
              api.getCameraLookAt((err, cam) => {
                if (err) return plain()
                setReady(true)
                onReady?.()
                orbit(api, cam.position, cam.target)
              })
            })
          },
          error: plain,
          ...Object.fromEntries(
            ['ui_controls', 'ui_infos', 'ui_stop', 'ui_watermark', 'ui_hint', 'ui_help', 'ui_settings', 'ui_inspector', 'ui_vr', 'ui_fullscreen', 'ui_annotations', 'ui_ar', 'ui_loading'].map((k) => [k, '0']),
          ),
          transparent: 1, autostart: 1, preload: 1, dnt: 1, camera: 0,
        })
      })
      .catch(plain)
    }

    function orbit(api: Api, pos: Vec, tgt: Vec) {
      const v: Vec = [pos[0] - tgt[0], pos[1] - tgt[1], pos[2] - tgt[2]]
      const r = Math.hypot(...v)
      const yaw0 = Math.atan2(v[1], v[0])
      const pitch0 = Math.asin(v[2] / r)
      let yaw = yaw0
      let pitch = pitch0
      let last = ''
      const tick = () => {
        if (!mounted.current) return
        const g = goal.current
        const ty = yaw0 + (reduce ? 0 : -g.mx * 0.7) + g.dx
        const tp = clamp(pitch0 + (reduce ? 0 : g.my * 0.3) + g.dy, -1.2, 1.2)
        yaw += (ty - yaw) * 0.08
        pitch += (tp - pitch) * 0.08
        const key = yaw.toFixed(4) + pitch.toFixed(4)
        if (key !== last) {
          last = key
          api.setCameraLookAt(
            [tgt[0] + r * Math.cos(pitch) * Math.cos(yaw), tgt[1] + r * Math.cos(pitch) * Math.sin(yaw), tgt[2] + r * Math.sin(pitch)],
            tgt,
            0,
          )
        }
        requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      goal.current.mx = (e.clientX / innerWidth - 0.5) * 2
      goal.current.my = (e.clientY / innerHeight - 0.5) * 2
    }
    addEventListener('pointermove', onMove)
    return () => {
      mounted.current = false
      removeEventListener('pointermove', onMove)
    }
  }, [live])

  const drag = useRef<{ x: number; y: number } | null>(null)
  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onDrag = (e: React.PointerEvent) => {
    if (!drag.current) return
    goal.current.dx -= (e.clientX - drag.current.x) * 0.012
    goal.current.dy = clamp(goal.current.dy + (e.clientY - drag.current.y) * 0.008, -0.9, 0.9)
    drag.current = { x: e.clientX, y: e.clientY }
  }
  const onKey = (e: KeyboardEvent) => {
    const k: Record<string, [number, number]> = { ArrowLeft: [0.15, 0], ArrowRight: [-0.15, 0], ArrowUp: [0, 0.1], ArrowDown: [0, -0.1] }
    const d = k[e.key]
    if (!d) return
    e.preventDefault()
    goal.current.dx += d[0]
    goal.current.dy = clamp(goal.current.dy + d[1], -0.9, 0.9)
  }

  return (
    <div
      ref={wrap}
      role="group"
      aria-label="Interactive 3D model of a bug. Drag or use the arrow keys to rotate it."
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={native ? undefined : onDown}
      onPointerMove={onDrag}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
      className="relative h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
    >
      {live ? (
        <iframe
          ref={iframe}
          title="3D model of a bug"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-700 ${ready || native ? 'opacity-100' : 'opacity-0'} ${native ? '' : 'pointer-events-none'}`}
        />
      ) : (
        <button
          type="button"
          onClick={() => setLive(true)}
          className="absolute inset-0 m-auto h-fit w-fit border border-ink bg-plate px-5 py-3 font-label text-xs text-ink hover:bg-foam"
        >
          Load the 3D bug
        </button>
      )}
      {live && !ready && !native && (
        <p className="absolute inset-0 grid place-items-center font-label text-xs text-muted" aria-live="polite">
          Pinning specimen…
        </p>
      )}
    </div>
  )
}
