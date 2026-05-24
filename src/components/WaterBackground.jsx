import { useEffect, useRef, useState } from 'react'
import useParallax from '../hooks/useParallax.js'
import { videoAllowed } from '../lib/media.js'

// Layered ocean backdrop:
//   poster  ->  video  ->  tint  ->  drifting caustic light  ->  animated wave layers
// The poster (AVIF/WebP/JPG via a <picture>) shows instantly. The video's
// <source> tags are only rendered after idle time and only when the connection
// /motion settings allow it, so the first paint never fetches video.
export default function WaterBackground() {
  const causticsRef = useParallax(0.08)
  const videoRef = useRef(null)
  // `armed` gates whether the <source> elements exist at all (lazy attachment).
  const [armed, setArmed] = useState(false)
  const [playing, setPlaying] = useState(false)

  // Decide, after first paint, whether to attach the video sources.
  useEffect(() => {
    if (!videoAllowed()) return // poster + SVG waves only — nothing fetched

    let idleId
    const arm = () => setArmed(true)
    if ('requestIdleCallback' in window) {
      idleId = requestIdleCallback(arm, { timeout: 2500 })
    } else {
      idleId = setTimeout(arm, 1200)
    }
    return () => {
      if (idleId == null) return
      if ('cancelIdleCallback' in window) cancelIdleCallback(idleId)
      else clearTimeout(idleId)
    }
  }, [])

  // Once the sources are in the DOM, load + play them and wire visibility.
  useEffect(() => {
    if (!armed) return
    const video = videoRef.current
    if (!video) return

    video.load() // pick up the freshly-rendered <source> children
    // Autoplay may be rejected (e.g. battery saver); the poster simply stays.
    video.play().catch(() => {})

    const onPlaying = () => setPlaying(true)
    // Pause decoding while the tab is hidden, resume when it returns.
    const onVisibility = () => {
      if (document.hidden) video.pause()
      else video.play().catch(() => {})
    }
    video.addEventListener('playing', onPlaying)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      video.removeEventListener('playing', onPlaying)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [armed])

  return (
    <div className="water-bg" aria-hidden="true">
      <picture className={`water-bg__poster ${playing ? 'is-hidden' : ''}`}>
        <source srcSet="/assets/water/water-poster.avif" type="image/avif" />
        <source srcSet="/assets/water/water-poster.webp" type="image/webp" />
        <img src="/assets/water/water-poster.jpg" alt="" />
      </picture>

      <video ref={videoRef} className="water-bg__video" muted loop playsInline preload="none">
        {armed && (
          <>
            <source src="/assets/water/water-bg.webm" type="video/webm" />
            <source src="/assets/water/water-bg.optimized.mp4" type="video/mp4" />
          </>
        )}
      </video>

      <div className="water-bg__tint" />
      <div className="water-bg__caustics" ref={causticsRef} />

      <div className="water-bg__waves">
        <svg className="wave-3" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="w1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1f7f8c" stopOpacity="0" />
              <stop offset="100%" stopColor="#1f7f8c" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <path
            fill="url(#w1)"
            d="M0,160 C240,210 480,110 720,150 C960,190 1200,250 1440,180 C1680,210 1920,110 2160,150 C2400,190 2640,250 2880,180 L2880,320 L0,320 Z"
          />
        </svg>

        <svg className="wave-2" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="w2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6fe3df" stopOpacity="0" />
              <stop offset="100%" stopColor="#6fe3df" stopOpacity="0.26" />
            </linearGradient>
          </defs>
          <path
            fill="url(#w2)"
            d="M0,210 C300,160 540,250 780,210 C1020,170 1260,230 1440,210 C1740,160 1980,250 2220,210 C2460,170 2700,230 2880,210 L2880,320 L0,320 Z"
          />
        </svg>

        <svg className="wave-1" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path
            fill="#04121a"
            fillOpacity="0.92"
            d="M0,250 C260,290 520,230 780,260 C1040,290 1300,250 1440,265 C1700,290 1960,230 2220,260 C2480,290 2740,250 2880,265 L2880,320 L0,320 Z"
          />
        </svg>
      </div>
    </div>
  )
}
