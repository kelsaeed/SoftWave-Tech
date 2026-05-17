export default function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="brand">
        Softwave<span>Tech</span>
      </a>
      <nav>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#work">Process</a>
        <a href="#contact" className="nav-cta">
          Contact
        </a>
      </nav>
    </header>
  )
}
