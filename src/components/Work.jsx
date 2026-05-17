import Reveal from './Reveal.jsx'

const steps = [
  {
    no: '01',
    title: 'Talk it through',
    text: 'A short call to understand the problem and what success looks like.',
  },
  {
    no: '02',
    title: 'Plan small',
    text: 'A clear scope and a first version we can put in front of real users.',
  },
  {
    no: '03',
    title: 'Build & ship',
    text: 'We work in short cycles so you always see progress, not promises.',
  },
]

export default function Work() {
  return (
    <section className="section" id="work">
      <Reveal>
        <p className="kicker">How we work</p>
        <h2>Simple by default.</h2>
      </Reveal>

      <Reveal className="steps">
        {steps.map((s) => (
          <div key={s.no} className="step">
            <span className="step-no">{s.no}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
