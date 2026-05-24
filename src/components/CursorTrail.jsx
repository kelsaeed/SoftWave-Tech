import { useEffect, useRef } from 'react'

// Bright water ripples that follow the mouse. Canvas so it stays smooth.
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
      if (dx * dx + dy * dy < 36) return
      lastX = e.clientX
      lastY = e.clientY
      ripples.push({ x: e.clientX, y: e.clientY, r: 5, life: 1 })
      if (ripples.length > 28) ripples.shift()
    }

    function frame() {
      ctx.clearRect(0, 0, width, height)
      ctx.shadowColor = 'rgba(150, 245, 245, 0.9)'

      for (let i = ripples.length - 1; i >= 0; i--) {
        const p = ripples[i]
        p.r += 2
        p.life -= 0.016
        if (p.life <= 0) {
          ripples.splice(i, 1)
          continue
        }

        // bright glowing ring
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(170, 248, 247, ${p.life * 0.95})`
        ctx.lineWidth = 2.5
        ctx.shadowBlur = 14
        ctx.stroke()

        // soft inner glow that fades fast
        if (p.life > 0.55) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(190, 250, 250, ${(p.life - 0.55) * 0.5})`
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(frame)
    }

    let raf = requestAnimationFrame(frame)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)

    // Stop the animation loop entirely while the tab is hidden so it does no
    // work in the background, then restart it cleanly when the tab is shown.
    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (!raf) {
        raf = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />
}
