import { Fragment } from 'react'
import useMagnetic from '../hooks/useMagnetic.js'

const line1 = ['Flutter', 'Apps,', 'Web', 'Development,']
const line2 = 'n8n Automation & SaaS Solutions.'
const FULL_HEADLINE = 'Flutter Apps, Web Development, n8n Automation & SaaS Solutions.'

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
  { num: '2', label: 'development specialists' },
  { num: '~1d', label: 'project response time' },
  { num: '100%', label: 'end-to-end delivery' },
]

export default function Hero() {
  const primary = useMagnetic(0.35)
  const secondary = useMagnetic(0.35)

  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <p className="eyebrow">
          <b />
          Software Development Studio — Egypt &amp; Global
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
          SoftWaveTech is a professional software development studio delivering
          Flutter mobile app development, custom web development (HTML, CSS,
          JavaScript), n8n workflow automation, and SaaS product development.
          Based in Egypt, serving clients across MENA and worldwide with
          end-to-end software delivery.
        </p>

        <div className="hero-actions">
          <a className="btn" href="#contact" ref={primary}>
            Start a project
            <span className="btn__arrow">→</span>
          </a>
          <a className="btn ghost" href="#what-we-build" ref={secondary}>
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
