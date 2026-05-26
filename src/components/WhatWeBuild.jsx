import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'

/* ------------------------------------------------------------------ *
 *  Category icons (inline SVG, currentColor-tinted so they pick up
 *  the aqua palette). Kept lightweight so no extra HTTP requests.
 * ------------------------------------------------------------------ */
const icons = {
  saas: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19a4.5 4.5 0 1 0-1.41-8.78 6 6 0 0 0-11.66 1.93A3.5 3.5 0 0 0 6 19h11.5z" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  ),
  flutter: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.314 0L2.3 12 6 15.7 21.684.013zM14.328 11.072L7.857 17.53l6.47 6.47h7.357l-6.46-6.47 6.46-6.458z" />
    </svg>
  ),
  websites: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M2 7h20M8 21h8M12 17v4" />
      <circle cx="5.2" cy="5.1" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="7" cy="5.1" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="8.8" cy="5.1" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.18" />
      <path d="M9.5 12a2.5 2.5 0 0 1 5 0M12 9.5v5" />
    </svg>
  ),
}

/* ------------------------------------------------------------------ *
 *  Portfolio data. Placeholder projects — replace `images`,
 *  `description`, and `title` with the real ones when ready.
 * ------------------------------------------------------------------ */
const categories = [
  {
    id: 'saas',
    title: 'SaaS Platforms',
    blurb: 'Cloud SaaS platforms engineered for scale.',
    longDescription:
      'Custom SaaS platforms — multi-tenant architecture, billing, user management, role-based access, analytics dashboards. MVP to production.',
    projects: [
      {
        id: 'inventory-flow',
        title: 'InventoryFlow',
        description:
          'Multi-tenant SaaS for inventory + supply chain. Role-based access, live dashboards, Stripe billing.',
        images: [],
        tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      },
      {
        id: 'team-pulse',
        title: 'TeamPulse',
        description:
          'Team productivity dashboard. Project tracking, time logs, Slack integration.',
        images: [],
        tech: ['Next.js', 'Prisma', 'Redis', 'Slack API'],
      },
    ],
  },
  {
    id: 'flutter',
    title: 'Flutter Applications',
    blurb: 'Cross-platform iOS + Android apps in Flutter.',
    longDescription:
      'Flutter mobile apps for iOS and Android. UX, integrations, App Store and Google Play deployment, post-launch updates.',
    projects: [
      {
        id: 'fit-track',
        title: 'FitTrack',
        description:
          'Flutter fitness tracker. Workout plans, progress charts, wearable sync.',
        images: [],
        tech: ['Flutter', 'Firebase', 'HealthKit'],
      },
      {
        id: 'deliver-mate',
        title: 'DeliverMate',
        description:
          'Food delivery app. Live tracking, in-app payments, route optimization.',
        images: [],
        tech: ['Flutter', 'Google Maps', 'Stripe', 'Firebase'],
      },
    ],
  },
  {
    id: 'websites',
    title: 'Websites',
    blurb: 'Fast, accessible, SEO-ready websites in HTML/CSS/JS.',
    longDescription:
      'Marketing sites, landing pages, portfolios, storefronts, web apps. HTML, CSS, JavaScript. Optimized for performance, SEO, accessibility.',
    projects: [
      {
        id: 'boutique-brand',
        title: 'Boutique Brand',
        description:
          'Fashion e-commerce storefront. Galleries, secure checkout, SEO product pages.',
        images: [],
        tech: ['HTML', 'CSS', 'JavaScript', 'Shopify'],
      },
      {
        id: 'architect-portfolio',
        title: 'Architect Portfolio',
        description:
          'Portfolio site with case-study layouts and a lightweight custom CMS.',
        images: [],
        tech: ['JavaScript', 'CSS Grid', 'Custom CMS'],
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI Automations',
    blurb: 'AI workflows with n8n, LLMs, and Meta tooling.',
    longDescription:
      'n8n automation, AI lead qualification, content generation pipelines, Meta API integrations. Removes operational busywork.',
    projects: [
      {
        id: 'lead-capture-ai',
        title: 'LeadCapture AI',
        description:
          'AI lead scoring + follow-up emails. Syncs to HubSpot via n8n.',
        images: [],
        tech: ['n8n', 'OpenAI', 'HubSpot'],
      },
      {
        id: 'content-bot',
        title: 'ContentBot',
        description:
          'AI content pipeline. Ideas, drafts, images, multi-platform publishing.',
        images: [],
        tech: ['n8n', 'OpenAI', 'Meta APIs'],
      },
    ],
  },
]

/* ------------------------------------------------------------------ *
 *  Main section
 * ------------------------------------------------------------------ */
export default function WhatWeBuild() {
  const [openCategoryId, setOpenCategoryId] = useState(null)
  const [openProject, setOpenProject] = useState(null)

  const openCategory = openCategoryId
    ? categories.find((c) => c.id === openCategoryId)
    : null

  // ESC closes the topmost open modal (project first if open, then category)
  useEffect(() => {
    if (!openCategoryId && !openProject) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (openProject) setOpenProject(null)
      else setOpenCategoryId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openCategoryId, openProject])

  // Lock body scroll while a modal is open
  useEffect(() => {
    const anyOpen = openCategoryId || openProject
    if (anyOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [openCategoryId, openProject])

  return (
    <section className="section" data-nav="what-we-build">
      <span id="what-we-build" className="section-anchor" aria-hidden="true" />

      <Reveal className="section-head">
        <p className="kicker">Portfolio</p>
        <h2>
          What We <span className="grad">Build.</span>
        </h2>
        <p className="section-lead">
          Four specialties. Click a category to see projects.
        </p>
      </Reveal>

      <div className="wwb-grid">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} dir="scale" delay={i * 80}>
            <button
              type="button"
              className="wwb-card"
              onClick={() => setOpenCategoryId(cat.id)}
              aria-label={`View ${cat.title} projects`}
            >
              <span className={`wwb-card__icon wwb-card__icon--${cat.id}`} aria-hidden="true">
                {icons[cat.id]}
              </span>
              <h3 className="wwb-card__title">{cat.title}</h3>
              <p className="wwb-card__blurb">{cat.blurb}</p>
              <span className="wwb-card__cta">
                View projects <span aria-hidden="true">→</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {openCategory && (
        <CategoryModal
          category={openCategory}
          onClose={() => {
            setOpenProject(null)
            setOpenCategoryId(null)
          }}
          onSelectProject={setOpenProject}
        />
      )}

      {openProject && (
        <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ *
 *  Category modal — lists the projects in the chosen category
 * ------------------------------------------------------------------ */
function CategoryModal({ category, onClose, onSelectProject }) {
  return (
    <div
      className="wwb-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${category.title} projects`}
    >
      <button
        type="button"
        className="wwb-modal__backdrop"
        onClick={onClose}
        aria-label="Close projects panel"
      />
      <div className="wwb-modal__panel">
        <button
          type="button"
          className="wwb-modal__close"
          onClick={onClose}
          aria-label="Close projects panel"
        >
          ×
        </button>
        <header className="wwb-modal__head">
          <p className="kicker">{category.title}</p>
          <h3>Projects in {category.title}</h3>
          <p>{category.longDescription}</p>
        </header>
        <div className="wwb-projects">
          {category.projects.map((proj) => (
            <button
              key={proj.id}
              type="button"
              className="wwb-project"
              onClick={() => onSelectProject(proj)}
            >
              <div className="wwb-project__thumb">
                {proj.images && proj.images[0] ? (
                  <img src={proj.images[0]} alt={proj.title} loading="lazy" />
                ) : (
                  <span className="wwb-project__placeholder" aria-hidden="true">
                    {proj.title.charAt(0)}
                  </span>
                )}
              </div>
              <div className="wwb-project__body">
                <h4>{proj.title}</h4>
                <p>{proj.description}</p>
                {proj.tech && (
                  <ul className="wwb-project__tech">
                    {proj.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 *  Project detail modal — full description + image gallery
 * ------------------------------------------------------------------ */
function ProjectModal({ project, onClose }) {
  const hasImages = project.images && project.images.length > 0

  return (
    <div
      className="wwb-modal wwb-modal--project"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <button
        type="button"
        className="wwb-modal__backdrop"
        onClick={onClose}
        aria-label="Close project details"
      />
      <div className="wwb-modal__panel">
        <button
          type="button"
          className="wwb-modal__close"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>
        <header className="wwb-modal__head">
          <p className="kicker">Project Details</p>
          <h3>{project.title}</h3>
        </header>

        {hasImages ? (
          <div className="wwb-gallery">
            {project.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className="wwb-gallery wwb-gallery--empty" aria-hidden="true">
            <span>Project images coming soon</span>
          </div>
        )}

        <div className="wwb-project__details">
          <p>{project.description}</p>
          {project.tech && project.tech.length > 0 && (
            <div>
              <p className="kicker">Tech Stack</p>
              <ul className="wwb-project__tech">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
