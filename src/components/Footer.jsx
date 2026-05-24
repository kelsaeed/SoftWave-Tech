const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">
            SoftWave<span>Tech</span>
          </div>
          <p className="footer__tag">Calm, reliable software — by Khaled &amp; Hams.</p>
        </div>

        <nav className="footer__links">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer__copy">&copy; {year} SoftWaveTech. All rights reserved.</div>
      </div>
    </footer>
  )
}
