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

      {/* Auto-scrolling marquee of the project lifecycle. The steps array
          is rendered twice (with a trailing arrow after EACH step,
          including the last) so the inner track has perfect symmetry —
          translating it by -50% lines the second copy up exactly where
          the first copy began, giving a seamless infinite loop. */}
      <Reveal className="timeline">
        <div className="timeline__track">
          {[...steps, ...steps].map((s, i) => (
            <Fragment key={i}>
              <div className="step">
                <div className="step__no">{s.no}</div>
                <h3>{s.title}</h3>
              </div>
              <span className="step__arrow" aria-hidden="true">→</span>
            </Fragment>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
