import Reveal from './Reveal.jsx'
import GlassCard from './GlassCard.jsx'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <Reveal>
        <GlassCard className="contact">
          <p className="kicker">Get in touch</p>
          <h2>Have something in mind?</h2>
          <p className="section-lead">
            Tell us what you are building. We usually reply within a day.
          </p>
          <a className="btn" href="mailto:khaledawad552002@gmail.com">
            khaledawad552002@gmail.com
          </a>
        </GlassCard>
      </Reveal>
    </section>
  )
}
