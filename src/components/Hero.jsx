import useMagnetic from '../hooks/useMagnetic.js'

const line1 = ['We', 'build', 'calm,', 'reliable']
const line2 = ['software', 'that', 'just', 'works.']

// Splits a line into words that rise in with a stagger.
function Words({ words, start }) {
  return words.map((w, i) => (
    <span className="word" key={w + i} style={{ animationDelay: `${start + i * 0.07}s` }}>
      {w}
      {i < words.length - 1 ? ' ' : ''}
    </span>
  ))
}

const stats = [
  { num: '2', label: 'people, zero noise' },
  { num: '~1d', label: 'usual reply time' },
  { num: '100%', label: 'shipped, not promised' },
]

export default function Hero() {
  const primary = useMagnetic(0.35)
  const secondary = useMagnetic(0.35)

  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <p className="eyebrow">
          <b />
          Software studio
        </p>

        <h1>
          <Words words={line1} start={0.15} />
          <br />
          <span className="grad">
            <Words words={line2} start={0.45} />
          </span>
        </h1>

        <p className="lead">
          SoftWaveTech is a small studio by Khaled and Hams. We design and ship
          web and mobile products without the noise — fast to talk to, clear to
          work with, built to last.
        </p>

        <div className="hero-actions">
          <a className="btn" href="#contact" ref={primary}>
            Start a project
            <span className="btn__arrow">→</span>
          </a>
          <a className="btn ghost" href="#work" ref={secondary}>
            How we work
          </a>
        </div>

        <div className="hero-stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__num grad">{s.num}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to content">
        <span />
      </a>
    </section>
  )
}
