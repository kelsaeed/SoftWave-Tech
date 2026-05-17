import { useRef } from 'react'

// A frosted panel with a soft highlight that follows the cursor.
export default function GlassCard({ children, className = '' }) {
  const ref = useRef(null)

  function move(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div ref={ref} className={`glass ${className}`} onMouseMove={move}>
      {children}
    </div>
  )
}
