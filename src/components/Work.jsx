import Reveal from './Reveal.jsx'

const steps = [
  {
    no: '01',
    title: 'Discovery & Requirements',
    text: 'Initial software development consultation to define project scope, technical requirements, target platform (Flutter mobile, web, n8n automation, or SaaS), and measurable success metrics for your project.',
  },
  {
    no: '02',
    title: 'Design & Planning',
    text: 'Detailed project planning, software architecture design, and rapid prototyping. We deliver a minimum viable product (MVP) for early validation with real users and stakeholders.',
  },
  {
    no: '03',
    title: 'Development & Deployment',
    text: 'Agile development cycles with regular demos and progress updates. End-to-end delivery from coding to production deployment, with ongoing technical support and maintenance.',
  },
]

export default function Work() {
  return (
    <section className="section" data-nav="work">
      <span id="work" className="section-anchor" aria-hidden="true" />
      <Reveal className="section-head">
        <p className="kicker">Our Development Process</p>
        <h2>
          Software Development Workflow <span className="grad">Built to Deliver.</span>
        </h2>
        <p className="section-lead">
          Our software development process is built for transparency, fast
          iteration, and reliable delivery. Three structured phases take your
          Flutter app, web, n8n automation, or SaaS project from initial
          discovery to live production deployment.
        </p>
      </Reveal>

      <div className="timeline">
        {steps.map((s, i) => (
          <Reveal key={s.no} className="step" delay={i * 130}>
            <div className="step__no">{s.no}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
