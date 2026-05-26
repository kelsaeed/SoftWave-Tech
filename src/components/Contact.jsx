import { useState } from 'react'
import Reveal from './Reveal.jsx'
import GlassCard from './GlassCard.jsx'

const RECIPIENT = 'khaledawad552002@gmail.com'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'sent'

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Compose the mailto with all form fields. The user's email client
    // opens with the message pre-filled — they review and hit send.
    const subject = `Project inquiry from ${form.name || 'a SoftWaveTech visitor'}`
    const bodyLines = [
      `Name:  ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      '',
      '— Project details —',
      form.message,
    ]
    const body = bodyLines.join('\r\n')
    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('sent')
  }

  return (
    <section className="section section--center" data-nav="contact">
      <span id="contact" className="section-anchor" aria-hidden="true" />
      <Reveal dir="scale">
        <GlassCard className="contact-card" tilt={3}>
          <p className="kicker">Contact SoftWaveTech</p>
          <h2>
            Hire Flutter, Web, Automation <span className="grad">&amp; SaaS Developers.</span>
          </h2>
          <p className="section-lead">
            Looking for a software development partner for your Flutter app,
            web, n8n automation, or SaaS project? Tell us a bit about it
            below — we reply within one business day.
          </p>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row">
              <label className="contact-field">
                <span className="contact-field__label">Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                />
              </label>
              <label className="contact-field">
                <span className="contact-field__label">Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+20 1XX XXX XXXX"
                  autoComplete="tel"
                />
              </label>
            </div>

            <label className="contact-field">
              <span className="contact-field__label">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                autoComplete="email"
              />
            </label>

            <label className="contact-field">
              <span className="contact-field__label">Project Details</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us what you're building, the rough scope, and any deadlines you have in mind."
              />
            </label>

            <div className="contact-form__actions">
              <button type="submit" className="btn">
                Send Inquiry
                <span className="btn__arrow">→</span>
              </button>
            </div>

            {status === 'sent' && (
              <p className="contact-form__status" role="status">
                Your email client should now open with your message ready to send.
                If it doesn't,{' '}
                <a href={`mailto:${RECIPIENT}`} className="contact-form__direct">
                  email us directly
                </a>
                .
              </p>
            )}
          </form>
        </GlassCard>
      </Reveal>
    </section>
  )
}
