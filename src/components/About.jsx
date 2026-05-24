import Reveal from './Reveal.jsx'
import GlassCard from './GlassCard.jsx'
import useCountUp from '../hooks/useCountUp.js'

function Figure({ end, suffix, label }) {
  const [ref, value] = useCountUp(end, { suffix })
  return (
    <GlassCard className="figure">
      <span className="figure__num grad" ref={ref}>
        {value}
      </span>
      <span className="figure__label">{label}</span>
    </GlassCard>
  )
}

export default function About() {
  return (
    <section className="section" id="about">
      <Reveal className="section-head">
        <p className="kicker">Who we are</p>
        <h2>A two-person studio that ships.</h2>
        <p className="section-lead">
          We started SoftWaveTech because most software feels heavier than it
          needs to be. We keep teams small, decisions fast, and the work honest —
          so you talk to the people actually building your product.
        </p>
      </Reveal>

      <div className="about-grid">
        <Reveal className="people" dir="left">
          <GlassCard className="person">
            <div className="person__avatar">K</div>
            <p className="person__role">Engineering</p>
            <h3>Khaled</h3>
            <p>Backend &amp; systems. Turns rough ideas into things that run and keep running.</p>
          </GlassCard>
          <GlassCard className="person">
            <div className="person__avatar">H</div>
            <p className="person__role">Product &amp; design</p>
            <h3>Hams</h3>
            <p>Interface &amp; product. Makes the work clear, considered and good to use.</p>
          </GlassCard>
        </Reveal>

        <Reveal className="about-figures" dir="right" delay={120}>
          <Figure end={12} suffix="+" label="products designed & shipped" />
          <Figure end={6} suffix=" yrs" label="combined experience" />
          <Figure end={100} suffix="%" label="of work taken end to end" />
        </Reveal>
      </div>
    </section>
  )
}
