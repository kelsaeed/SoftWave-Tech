const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="brand">
        SoftWave<span>Tech</span>
      </a>
      <nav>
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
