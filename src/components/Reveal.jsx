import useReveal from '../hooks/useReveal.js'

// Wrapper that fades its children in on scroll. `dir` controls the slide
// direction (up | left | right | scale) and `delay` staggers groups.
export default function Reveal({ children, className = '', dir = 'up', delay = 0, as: Tag = 'div' }) {
  const [ref, shown] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`}
      data-dir={dir}
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
