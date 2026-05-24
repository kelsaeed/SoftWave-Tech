import { useEffect, useState } from 'react'

const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // highlight the link for the section currently in view
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand" onClick={() => setOpen(false)}>
        <span className="brand__dot" />
        SoftWave<span>Tech</span>
      </a>

      <nav className={`nav__links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>
            {l.label}
          </a>
        ))}
        <a className="btn sm nav__cta" href="#contact">
          Start a project
        </a>
      </nav>

      <button
        className={`nav__toggle ${open ? 'open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
