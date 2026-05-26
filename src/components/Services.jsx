import Reveal from './Reveal.jsx'
import GlassCard from './GlassCard.jsx'

// Short copy to fit inside the hex silhouette. The longer SEO copy lives
// in the section's lead paragraph above (and in the full-text snippets in
// index.html meta tags).
const services = [
  {
    icon: '⚡',
    title: '24/7 Available',
    text: 'Response within one business day.',
  },
  {
    icon: '💬',
    title: 'Direct Comms',
    text: 'Talk to the developer, not a manager.',
  },
  {
    icon: '🔍',
    title: 'Transparent Pricing',
    text: 'Clear scope. No hidden fees.',
  },
  {
    icon: '🛡️',
    title: 'End-to-End',
    text: 'Discovery to launch, plus support.',
  },
]

export default function Services() {
  return (
    <section className="section" data-nav="services">
      <span id="services" className="section-anchor" aria-hidden="true" />
      <Reveal className="section-head">
        <p className="kicker">Why Choose SoftWaveTech</p>
        <h2>
          Built for Reliable Software <span className="grad">Development Partnerships.</span>
        </h2>
        <p className="section-lead">
          Beyond the technical work — Flutter apps, web development, n8n
          automation, and SaaS — every project we take on comes with the
          commitments that actually matter to clients: clear communication,
          transparent pricing, fast response times, and full end-to-end
          delivery from discovery through long-term support.
        </p>
      </Reveal>

      <div className="bento">
        {services.map((s, i) => (
          <Reveal key={s.title} dir="scale" delay={i * 90}>
            <GlassCard className="service">
              <span className="card-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
