import Reveal from './Reveal.jsx'

/* ------------------------------------------------------------------ *
 *  Placeholder case-study slots.
 *
 *  Each card represents a future case study slot. When a project
 *  delivers real outcomes, replace the placeholder shell with an
 *  object that follows the shape in `caseStudyShape` below:
 *
 *    {
 *      id: 'unique-id',
 *      name: 'Real Client / Project Name',
 *      industry: 'Industry',
 *      summary: 'One-line summary of what was delivered.',
 *      metrics: [
 *        { label: 'Process Time', before: 40, after: 12, unit: 'hrs/week' },
 *        { label: 'Operating Cost', before: 8000, after: 3400, unit: '$/mo' },
 *        { label: 'Manual Headcount', before: 6, after: 2, unit: 'roles' },
 *      ],
 *    }
 *
 *  Until then, each slot renders as an empty chart frame with a
 *  "Case study coming soon" label, so the section is visually ready
 *  but no fabricated data is shown.
 * ------------------------------------------------------------------ */

const METRIC_TEMPLATE = [
  { label: 'Process Time', icon: '⏱️' },
  { label: 'Operating Cost', icon: '💰' },
  { label: 'Manual Headcount', icon: '👥' },
]

const slots = [
  { id: 'slot-1', label: 'Case Study 01 — Coming Soon' },
  { id: 'slot-2', label: 'Case Study 02 — Coming Soon' },
  { id: 'slot-3', label: 'Case Study 03 — Coming Soon' },
]

export default function WhatWeAchieved() {
  return (
    <section className="section" data-nav="what-we-achieved">
      <span id="what-we-achieved" className="section-anchor" aria-hidden="true" />

      <Reveal className="section-head">
        <p className="kicker">Client Outcomes</p>
        <h2>
          What We <span className="grad">Achieved.</span>
        </h2>
        <p className="section-lead">
          Measurable client outcomes from completed software development projects.
          Each case study tracks before-vs-after improvements in process time,
          operating cost, and operational headcount — sourced directly from
          client teams using SoftWaveTech-built Flutter apps, websites,
          n8n automations, and SaaS platforms.
        </p>
      </Reveal>

      <Reveal className="wwa-notice" delay={80}>
        <span className="wwa-notice__icon" aria-hidden="true">📊</span>
        <p>
          <strong>Verified client metrics will populate this section</strong> as
          projects complete and clients sign off on releasing their numbers.
          No assumed data is shown here.
        </p>
      </Reveal>

      <div className="wwa-grid">
        {slots.map((slot, i) => (
          <Reveal key={slot.id} delay={120 + i * 100}>
            <PlaceholderCaseStudy label={slot.label} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function PlaceholderCaseStudy({ label }) {
  return (
    <article className="wwa-card wwa-card--empty" aria-label={label}>
      <header className="wwa-card__head">
        <h3>{label}</h3>
        <p className="wwa-card__industry">Awaiting Data</p>
      </header>
      <div className="wwa-metrics">
        {METRIC_TEMPLATE.map((m) => (
          <EmptyMetric key={m.label} icon={m.icon} label={m.label} />
        ))}
      </div>
      <p className="wwa-card__hint">
        Real before/after numbers will appear here once the client signs off on
        releasing them.
      </p>
    </article>
  )
}

function EmptyMetric({ icon, label }) {
  return (
    <div className="wwa-metric wwa-metric--empty">
      <div className="wwa-metric__head">
        <span className="wwa-metric__icon" aria-hidden="true">{icon}</span>
        <span className="wwa-metric__label">{label}</span>
      </div>
      <div className="wwa-bars wwa-bars--empty" aria-hidden="true">
        <div className="wwa-bar-wrap">
          <div className="wwa-bar wwa-bar--empty" />
          <span className="wwa-bar__label">Before</span>
        </div>
        <div className="wwa-bar-wrap">
          <div className="wwa-bar wwa-bar--empty" />
          <span className="wwa-bar__label">After</span>
        </div>
      </div>
      <div className="wwa-metric__delta wwa-metric__delta--empty">
        <span className="wwa-metric__delta-num">— %</span>
        <span className="wwa-metric__delta-text">pending</span>
      </div>
    </div>
  )
}
