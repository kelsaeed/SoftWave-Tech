import { useEffect, useRef } from 'react'

// Soft water ripples that follow the mouse. Canvas so it stays smooth.
export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduced || !fine) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const ripples = []
    let lastX = 0
    let lastY = 0

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    function onMove(e) {
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      // only spawn after the pointer has actually moved a little
      if (dx * dx + dy * dy < 90) return
      lastX = e.clientX
      lastY = e.clientY
      ripples.push({ x: e.clientX, y: e.clientY, r: 4, life: 1 })
      if (ripples.length > 24) ripples.shift()
    }

    function frame() {
      ctx.clearRect(0, 0, width, height)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const p = ripples[i]
        p.r += 1.4
        p.life -= 0.022
        if (p.life <= 0) {
          ripples.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(120, 224, 224, ${p.life * 0.5})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
      raf = requestAnimationFrame(frame)
    }

    let raf = requestAnimationFrame(frame)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />
}
