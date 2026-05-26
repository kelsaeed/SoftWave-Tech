import Reveal from './Reveal.jsx'
import GlassCard from './GlassCard.jsx'

export default function Contact() {
  return (
    <section className="section section--center" data-nav="contact">
      <span id="contact" className="section-anchor" aria-hidden="true" />
      <Reveal dir="scale">
        <GlassCard className="contact-card" tilt={3}>
          <p className="kicker">Contact SoftWaveTech</p>
          <h2>
            Hire Flutter, Web, Automation <span className="grad">&amp; SaaS Developers.</span>
          </h2>
          <p className="section-lead">
            Looking for a software development partner for your next project?
            Contact SoftWaveTech for Flutter mobile app development, custom web
            development, n8n workflow automation, or SaaS product quotes. Based
            in Egypt, serving clients globally with responses within one
            business day.
          </p>
          <div className="contact-actions">
            <a className="btn btn--email" href="mailto:khaledawad552002@gmail.com">
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
