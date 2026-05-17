import Reveal from './Reveal.jsx'
import GlassCard from './GlassCard.jsx'

const services = [
  {
    title: 'Web apps',
    text: 'Dashboards, tools and sites built to be fast and easy to maintain.',
  },
  {
    title: 'Mobile apps',
    text: 'Cross-platform apps that feel native and stay smooth.',
  },
  {
    title: 'APIs & backends',
    text: 'The systems behind the product - clean, documented, reliable.',
  },
  {
    title: 'Interface design',
    text: 'Layouts and flows that make complex things feel simple.',
  },
]

export default function Services() {
  return (
    <section className="section" id="services">
      <Reveal>
        <p className="kicker">What we do</p>
        <h2>Services</h2>
      </Reveal>

      <Reveal className="grid">
        {services.map((s) => (
          <GlassCard key={s.title} className="service">
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </GlassCard>
        ))}
      </Reveal>
    </section>
  )
}
