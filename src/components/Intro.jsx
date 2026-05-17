import { useEffect, useRef, useState } from 'react'

// Plays the rendered water intro once. If the clip is missing or
// can't autoplay, we just skip straight to the site.
export default function Intro({ onFinish }) {
  const videoRef = useRef(null)
  const [leaving, setLeaving] = useState(false)

  function close() {
    setLeaving(true)
    setTimeout(onFinish, 600)
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(close)
  }, [])

  return (
    <div className={`intro ${leaving ? 'intro-out' : ''}`}>
      <video
        ref={videoRef}
        className="intro-video"
        src="/assets/intro/softwave-intro.mp4"
        muted
        playsInline
        onEnded={close}
        onError={close}
      />
      <button className="intro-skip" onClick={close}>
        Skip
      </button>
    </div>
  )
}
