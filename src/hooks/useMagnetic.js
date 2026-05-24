import { useEffect, useRef } from 'react'

const fine = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Pulls an element gently toward the cursor while hovering it.
export default function useMagnetic(strength = 0.4) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !fine()) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }
    const reset = () => {
      el.style.transform = ''
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', reset)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', reset)
    }
  }, [strength])

  return ref
}
