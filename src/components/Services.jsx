import Reveal from './Reveal.jsx'
import GlassCard from './GlassCard.jsx'

const services = [
  {
    icon: '📱',
    title: 'Flutter Mobile App Development',
    text: 'Cross-platform Flutter app development for iOS and Android. Native-feel performance, custom UI implementation, and complete mobile app development from prototype to App Store and Google Play launch.',
  },
  {
    icon: '🖥️',
    title: 'Web Development (HTML, CSS, JavaScript)',
    text: 'Custom web development services using modern HTML, CSS, and JavaScript. Responsive websites, landing pages, web applications, and dashboards optimized for performance, SEO, and accessibility.',
  },
  {
    icon: '⚙️',
    title: 'n8n Workflow Automation',
    text: 'Professional n8n automation services and workflow consulting. Custom n8n workflow automation, Meta API integrations, and reliable business automation that connects your tools and scales with your operations.',
  },
  {
    icon: '🚀',
    title: 'SaaS & Custom Software Development',
    text: 'SaaS development and custom software solutions for businesses. We architect and build SaaS platforms, internal business tools, dashboards, and software systems tailored to your operational requirements.',
  },
]

export default function Services() {
  return (
    <section className="section" data-nav="services">
      <span id="services" className="section-anchor" aria-hidden="true" />
      <Reveal className="section-head">
        <p className="kicker">Our Services</p>
        <h2>
          Software Development Services for Mobile, Web, <span className="grad">Automation &amp; SaaS.</span>
        </h2>
        <p className="section-lead">
          Full-stack software development services covering Flutter mobile app
          development, custom web development, n8n workflow automation, and
          SaaS product engineering. Choose a single service or work with us
          end-to-end across the entire delivery cycle.
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
