import Reveal from './Reveal.jsx'
import GlassCard from './GlassCard.jsx'

const services = [
  {
    icon: '⚡',
    title: '24/7 Availability & Fast Response',
    text: 'Always-on technical support and guaranteed response within one business day. Our software development team is available across time zones for urgent project requests, technical questions, and ongoing collaboration with clients in Egypt, MENA, and worldwide.',
  },
  {
    icon: '💬',
    title: 'Direct Developer Communication',
    text: 'Communicate directly with the Flutter, web, n8n, and SaaS developers actually building your software — no account managers, no intermediaries, no layers of bureaucracy. Clear technical conversations, faster decisions, and zero context lost in handoffs.',
  },
  {
    icon: '🔍',
    title: 'Transparent Pricing & Process',
    text: 'Clear project scope, fixed-price deliverables, milestone-based billing, and zero hidden fees. Honest software development quotes with detailed line items, predictable invoicing, and full visibility into progress at every phase of the engagement.',
  },
  {
    icon: '🛡️',
    title: 'End-to-End Delivery & Post-Launch Support',
    text: 'Full project ownership from initial discovery to production deployment — and beyond. We deliver tested, documented, production-ready code, plus ongoing maintenance, technical support, bug fixes, and feature updates after launch.',
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
