import { useRef } from 'react'

const fine = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Returns handlers that tilt a glass card in 3D toward the cursor and
// also feed the cursor position to the card's radial highlight.
export default function useTilt(max = 7) {
  const ref = useRef(null)

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
    if (!fine()) return
    el.style.setProperty('--rx', `${(px - 0.5) * max}deg`)
    el.style.setProperty('--ry', `${(0.5 - py) * max}deg`)
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return { ref, onMove, onLeave }
}
