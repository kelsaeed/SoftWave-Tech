import Reveal from './Reveal.jsx'
import GlassCard from './GlassCard.jsx'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <Reveal dir="scale">
        <GlassCard className="contact-card" tilt={3}>
          <p className="kicker">Get in touch</p>
          <h2>
            Have something <span className="grad">in mind?</span>
          </h2>
          <p className="section-lead">
            Tell us what you’re building — a rough idea is enough. We usually
            reply within a day.
          </p>
          <div className="contact-actions">
            <a className="btn" href="mailto:khaledawad552002@gmail.com">
              khaledawad552002@gmail.com
              <span className="btn__arrow">→</span>
            </a>
            <a className="btn ghost" href="#top">
              Back to top
            </a>
          </div>
        </GlassCard>
      </Reveal>
    </section>
  )
}
