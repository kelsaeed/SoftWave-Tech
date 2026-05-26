const items = [
  'Flutter App Development',
  'Mobile App Development',
  'Web Development',
  'HTML / CSS / JavaScript',
  'n8n Automation',
  'Workflow Automation',
  'SaaS Development',
  'Custom Software',
  'Meta API Integration',
  'Cross-Platform Apps',
  'API Development',
  'Business Automation',
]

// Infinite scrolling strip of what the studio does. The list is duplicated
// so the -50% keyframe loops seamlessly.
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...items, ...items].map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
