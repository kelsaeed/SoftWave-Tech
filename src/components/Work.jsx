import Reveal from './Reveal.jsx'

const steps = [
  {
    no: '01',
    title: 'Talk it through',
    text: 'A short call to understand the problem and what success actually looks like.',
  },
  {
    no: '02',
    title: 'Plan small',
    text: 'A clear scope and a first version we can put in front of real users fast.',
  },
  {
    no: '03',
    title: 'Build & ship',
    text: 'Short cycles, so you always see real progress — not promises or status decks.',
  },
]

export default function Work() {
  return (
    <section className="section" id="work">
      <Reveal className="section-head">
        <p className="kicker">How we work</p>
        <h2>
          Simple <span className="grad">by default.</span>
        </h2>
        <p className="section-lead">
          No heavy process, no surprises. Three steps from first call to something
          live you can use.
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
