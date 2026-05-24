import { useEffect, useRef, useState } from 'react'
import { videoAllowed } from '../lib/media.js'

// Plays the rendered water intro once. On reduced-motion or weak/metered
// connections we skip it entirely and never fetch it. The <source> tags
// (WebM first, MP4 fallback) are only rendered once `armed`, so with
// preload="none" nothing downloads until we've decided to play.
export default function Intro({ onFinish }) {
  const videoRef = useRef(null)
  const [armed, setArmed] = useState(false)
  const [leaving, setLeaving] = useState(false)

  function close() {
    setLeaving(true)
    setTimeout(onFinish, 600)
  }

  // Gate before any source exists: skip straight to the site if not allowed.
  useEffect(() => {
    if (!videoAllowed()) {
      onFinish()
      return
    }
    setArmed(true)
  }, [])

  // Sources are now in the DOM — load and play them.
  useEffect(() => {
    if (!armed) return
    const v = videoRef.current
    if (!v) return
    v.load()
    v.play().catch(close)
  }, [armed])

  return (
    <div className={`intro ${leaving ? 'intro-out' : ''}`}>
      <video
        ref={videoRef}
        className="intro-video"
        muted
        playsInline
        preload="none"
        onEnded={close}
        onError={close}
      >
        {armed && (
          <>
            <source src="/assets/intro/softwave-intro.webm" type="video/webm" />
            <source src="/assets/intro/softwave-intro.optimized.mp4" type="video/mp4" />
          </>
        )}
      </video>
      <button className="intro-skip" onClick={close}>
        Skip
      </button>
    </div>
  )
}
