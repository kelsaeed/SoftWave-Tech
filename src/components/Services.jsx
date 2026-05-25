import Reveal from './Reveal.jsx'
import GlassCard from './GlassCard.jsx'

const services = [
  {
    icon: '🖥️',
    title: 'Web apps',
    text: 'Dashboards, tools and sites built to be fast, accessible and easy to maintain.',
  },
  {
    icon: '📱',
    title: 'Mobile apps',
    text: 'Cross-platform apps that feel native and stay smooth.',
  },
  {
    icon: '🔌',
    title: 'APIs & backends',
    text: 'The systems behind the product — clean, documented, reliable.',
  },
  {
    icon: '🎯',
    title: 'Interface design',
    text: 'Layouts and flows that make complex things feel simple and obvious.',
  },
]

export default function Services() {
  return (
    <section className="section" data-nav="services">
      <span id="services" className="section-anchor" aria-hidden="true" />
      <Reveal className="section-head">
        <p className="kicker">What we do</p>
        <h2>
          Everything your product needs, <span className="grad">nothing it doesn’t.</span>
        </h2>
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
