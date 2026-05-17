import { useRef } from 'react'

const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

export default function Nav() {
  const dropRef = useRef(null)
  const labelRef = useRef(null)
  const splashRef = useRef(null)
  const splashVideoRef = useRef(null)
  const busy = useRef(false)

  // click a droplet -> it falls, the page rides down with it, then it splashes
  function goTo(e, id, label) {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target || busy.current) return
    busy.current = true

    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const startY = rect.bottom + 6
    const landY = window.innerHeight * 0.62

    const drop = dropRef.current
    labelRef.current.textContent = label
    drop.style.left = `${x}px`
    drop.style.opacity = '1'
    drop.style.transform = `translate(-50%, ${startY}px) scale(0.55)`

    const startScroll = window.scrollY
    const endScroll = target.getBoundingClientRect().top + window.scrollY - 70
    const root = document.documentElement
    root.style.scrollBehavior = 'auto'

    const duration = 1500
    const t0 = performance.now()

    function step(now) {
      const p = Math.min((now - t0) / duration, 1)
      const k = easeInOut(p)
      window.scrollTo(0, startScroll + (endScroll - startScroll) * k)
      const y = startY + (landY - startY) * k
      drop.style.transform = `translate(-50%, ${y}px) scale(${0.55 + 0.55 * k})`
      if (p < 1) {
        requestAnimationFrame(step)
      } else {
        root.style.scrollBehavior = ''
        splash(x, landY)
      }
    }
    requestAnimationFrame(step)
  }

  function splash(x, y) {
    dropRef.current.style.opacity = '0'

    const s = splashRef.current
    s.style.left = `${x}px`
    s.style.top = `${y}px`
    s.classList.remove('play')
    void s.offsetWidth // restart the ring animation
    s.classList.add('play')

    const v = splashVideoRef.current
    if (v) {
      v.currentTime = 0
      v.play().catch(() => {})
    }

    setTimeout(() => {
      busy.current = false
    }, 800)
  }

  return (
    <>
      <header className="nav">
        <a href="#top" className="brand">
          Softwave<span>Tech</span>
        </a>
        <nav>
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="drop-link"
              onClick={(e) => goTo(e, l.id, l.label)}
            >
              <span>{l.label}</span>
            </a>
          ))}
        </nav>
      </header>

      <div className="drop-layer" aria-hidden="true">
        <div ref={dropRef} className="falling-drop">
          <span ref={labelRef} />
        </div>
        <div ref={splashRef} className="splash">
          <video
            ref={splashVideoRef}
            src="/assets/intro/splash.webm"
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </>
  )
}
