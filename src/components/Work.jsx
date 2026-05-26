import { Fragment } from 'react'
import Reveal from './Reveal.jsx'

// Main phases of every project — titles only.
const steps = [
  { no: '01', title: 'Discovery' },
  { no: '02', title: 'Planning' },
  { no: '03', title: 'Development' },
  { no: '04', title: 'Deployment' },
  { no: '05', title: 'Support' },
]

export default function Work() {
  return (
    <section className="section" data-nav="work">
      <span id="work" className="section-anchor" aria-hidden="true" />
      <Reveal className="section-head">
        <p className="kicker">Process</p>
        <h2>
          How We <span className="grad">Deliver.</span>
        </h2>
      </Reveal>

      <div className="timeline">
        {steps.map((s, i) => (
          <Fragment key={s.no}>
            <Reveal className="step" delay={i * 110}>
              <div className="step__no">{s.no}</div>
              <h3>{s.title}</h3>
            </Reveal>
            {i < steps.length - 1 && (
              <span className="step__arrow" aria-hidden="true">→</span>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
