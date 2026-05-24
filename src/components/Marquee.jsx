const items = [
  'Web apps',
  'Mobile apps',
  'APIs & backends',
  'Interface design',
  'Dashboards',
  'Cross-platform',
  'Performance',
  'Clean code',
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
