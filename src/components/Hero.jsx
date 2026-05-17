export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <p className="eyebrow">Software studio</p>
        <h1>
          We build calm, reliable
          <br />
          software that just works.
        </h1>
        <p className="lead">
          Softwave Tech is a small studio by Khaled and Hams. We design and
          ship web and mobile products without the noise.
        </p>
        <div className="hero-actions">
          <a className="btn" href="#contact">
            Start a project
          </a>
          <a className="btn ghost" href="#work">
            How we work
          </a>
        </div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to content">
        <span />
      </a>
    </section>
  )
}
