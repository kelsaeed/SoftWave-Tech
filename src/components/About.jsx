import Reveal from './Reveal.jsx'
import GlassCard from './GlassCard.jsx'

export default function About() {
  return (
    <section className="section" id="about">
      <Reveal>
        <p className="kicker">Who we are</p>
        <h2>A two-person studio that ships.</h2>
        <p className="section-lead">
          We started SoftWaveTech because most software feels heavier than it
          needs to be. We keep teams small, decisions fast, and the work honest.
        </p>
      </Reveal>

      <Reveal className="people">
        <GlassCard className="person">
          <h3>Khaled</h3>
          <p>Engineering & backend. Turns rough ideas into things that run.</p>
        </GlassCard>
        <GlassCard className="person">
          <h3>Hams</h3>
          <p>Product & interface. Makes the work clear and good to use.</p>
        </GlassCard>
      </Reveal>
    </section>
  )
}
