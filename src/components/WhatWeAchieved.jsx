import Reveal from './Reveal.jsx'

/* ------------------------------------------------------------------ *
 *  Case studies — sample data shown by default.
 *
 *  When a real client signs off on releasing their figures, replace
 *  the corresponding object below with the real numbers. The card
 *  computes the delta % and animates the bars automatically.
 *
 *  Shape:
 *    {
 *      id: 'unique-slug',
 *      name: 'Project / Client Name',
 *      industry: 'Industry sector',
 *      summary: 'One-sentence project summary',
 *      metrics: [
 *        { label, icon, before, after, prefix?, suffix? },
 *        ...
 *      ],
 *    }
 *
 *  `prefix` (e.g. '$') is glued in front of the number; `suffix`
 *  (e.g. 'hrs/wk') is appended after a space.
 * ------------------------------------------------------------------ */

const caseStudies = [
  {
    id: 'study-1',
    name: 'Logistics Operations Platform',
    industry: 'Logistics & Supply Chain',
    summary: 'Custom SaaS dashboard replacing manual spreadsheet tracking and route planning.',
    metrics: [
      { label: 'Process Time', icon: '⏱️', before: 40, after: 12, suffix: 'hrs/wk' },
      { label: 'Operating Cost', icon: '💰', before: 8400, after: 3200, prefix: '$' },
      { label: 'Manual Headcount', icon: '👥', before: 6, after: 2, suffix: 'roles' },
    ],
  },
  {
    id: 'study-2',
    name: 'Retail Loyalty Mobile App',
    industry: 'E-Commerce & Retail',
    summary: 'Flutter cross-platform app with automated reward workflows and in-app payments.',
    metrics: [
      { label: 'Process Time', icon: '⏱️', before: 28, after: 8, suffix: 'hrs/wk' },
      { label: 'Operating Cost', icon: '💰', before: 5200, after: 2100, prefix: '$' },
      { label: 'Manual Headcount', icon: '👥', before: 4, after: 1, suffix: 'roles' },
    ],
  },
  {
    id: 'study-3',
    name: 'Marketing Automation Suite',
    industry: 'Marketing & Lead Generation',
    summary: 'n8n-powered lead qualification, scoring, and CRM sync workflow.',
    metrics: [
      { label: 'Process Time', icon: '⏱️', before: 22, after: 5, suffix: 'hrs/wk' },
      { label: 'Operating Cost', icon: '💰', before: 3800, after: 1200, prefix: '$' },
      { label: 'Manual Headcount', icon: '👥', before: 3, after: 1, suffix: 'roles' },
    ],
  },
]

function formatValue(value, metric) {
  const prefix = metric.prefix || ''
  const suffix = metric.suffix ? ` ${metric.suffix}` : ''
  return `${prefix}${value.toLocaleString()}${suffix}`
}

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
          operating cost, and operational headcount.
        </p>
      </Reveal>

      <Reveal className="wwa-notice" delay={80}>
        <span className="wwa-notice__icon" aria-hidden="true">📊</span>
        <p>
          <strong>Sample case studies shown below.</strong> Verified real-client
          outcomes will replace these as projects complete and clients sign off
          on releasing their figures.
        </p>
      </Reveal>

      <div className="wwa-grid">
        {caseStudies.map((study, i) => (
          <Reveal key={study.id} delay={120 + i * 100}>
            <CaseStudyCard study={study} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function CaseStudyCard({ study }) {
  return (
    <article className="wwa-card">
      <header className="wwa-card__head">
        <h3>{study.name}</h3>
        <p className="wwa-card__industry">{study.industry}</p>
      </header>
      {study.summary && <p className="wwa-card__summary">{study.summary}</p>}
      <div className="wwa-metrics">
        {study.metrics.map((m, i) => (
          <MetricChart key={i} metric={m} />
        ))}
      </div>
    </article>
  )
}

function MetricChart({ metric }) {
  const afterPct = Math.round((metric.after / metric.before) * 100)
  const reductionPct = Math.round((1 - metric.after / metric.before) * 100)
  const beforeFormatted = formatValue(metric.before, metric)
  const afterFormatted = formatValue(metric.after, metric)

  return (
    <div className="wwa-metric">
      <div className="wwa-metric__head">
        <span className="wwa-metric__icon" aria-hidden="true">{metric.icon}</span>
        <span className="wwa-metric__label">{metric.label}</span>
      </div>
      <div className="wwa-bars">
        <div className="wwa-bar-wrap">
          <div className="wwa-bar-track">
            <div
              className="wwa-bar wwa-bar--before"
              style={{ '--h': '100%' }}
              title={beforeFormatted}
            />
          </div>
          <span className="wwa-bar__label">Before</span>
          <span className="wwa-bar__value">{beforeFormatted}</span>
        </div>
        <div className="wwa-bar-wrap">
          <div className="wwa-bar-track">
            <div
              className="wwa-bar wwa-bar--after"
              style={{ '--h': `${afterPct}%` }}
              title={afterFormatted}
            />
          </div>
          <span className="wwa-bar__label">After</span>
          <span className="wwa-bar__value">{afterFormatted}</span>
        </div>
      </div>
      <div className="wwa-metric__delta">
        <span className="wwa-metric__delta-num">−{reductionPct}%</span>
        <span className="wwa-metric__delta-text">improvement</span>
      </div>
    </div>
  )
}
