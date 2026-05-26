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
    <section className="section" data-nav="about">
      <span id="about" className="section-anchor" aria-hidden="true" />
      <Reveal className="section-head">
        <p className="kicker">About</p>
        <h2>A studio of <span className="grad">two.</span></h2>
        <p className="section-lead">
          Egypt-based, worldwide clients. Mobile, web, automation, SaaS.
        </p>
      </Reveal>

      <div className="about-grid">
        <Reveal className="people" dir="left">
          <GlassCard className="person">
            <div className="person__avatar">K</div>
            <p className="person__role">Flutter &amp; Web Development</p>
            <h3>Khaled</h3>
            <p>
              Flutter Mobile App Developer &amp; Web Development Specialist.
              Builds cross-platform Flutter applications for iOS and Android,
              and custom websites using HTML, CSS, and JavaScript with proven
              mobile and web development expertise.
            </p>
          </GlassCard>
          <GlassCard className="person">
            <div className="person__avatar">H</div>
            <p className="person__role">Automation &amp; SaaS Development</p>
            <h3>Hams</h3>
            <p>
              n8n Automation Specialist &amp; SaaS Developer. Designs and
              implements n8n workflow automations, Meta API integrations, and
              custom SaaS products. Builds software systems and business
              automation that streamline operations end-to-end.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal className="about-figures" dir="right" delay={120}>
          <Figure end={12} suffix="+" label="software projects delivered" />
          <Figure end={6} suffix=" yrs" label="development experience" />
          <Figure end={100} suffix="%" label="end-to-end project delivery" />
        </Reveal>
      </div>
    </section>
  )
}
