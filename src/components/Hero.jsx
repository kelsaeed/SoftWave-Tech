import { Fragment } from 'react'
import useMagnetic from '../hooks/useMagnetic.js'

const line1 = ['We', 'build', 'calm,', 'reliable']
const line2 = 'software that just works.'
const FULL_HEADLINE = 'We build calm, reliable software that just works.'

// Line 1: words rise in once on load.
function Line1() {
  return line1.map((w, i) => (
    <span className="word" key={w + i} style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
      {w}
      {i < line1.length - 1 ? ' ' : ''}
    </span>
  ))
}

// Line 2: ghosted at rest, each character sharpens + glows on hover, staggered
// left-to-right. Words stay inline-block (no mid-word break) while the spaces
// between them remain real wrap points so the line wraps cleanly on mobile.
function Line2() {
  const words = line2.split(' ')
  let i = -1
  return words.map((word, wi) => (
    <Fragment key={wi}>
      <span className="reveal-word">
        {[...word].map((ch, ci) => {
          i += 1
          return (
            <span className="rc" style={{ '--i': i }} key={ci}>
              {ch}
            </span>
          )
        })}
      </span>
      {wi < words.length - 1 ? ' ' : ''}
    </Fragment>
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

        {/* aria-label carries the full sentence for screen readers; the visual
            span tree is hidden from them so nothing is read twice */}
        <h1 className="hero-title" aria-label={FULL_HEADLINE}>
          <span aria-hidden="true">
            <span className="hero-line">
              <Line1 />
            </span>
            <br />
            <span className="hero-reveal">
              <Line2 />
            </span>
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
            What we build
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
