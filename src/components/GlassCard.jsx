import useTilt from '../hooks/useTilt.js'

// A frosted panel that tilts in 3D toward the cursor and carries a soft
// highlight that follows the pointer.
export default function GlassCard({ children, className = '', tilt = 7 }) {
  const { ref, onMove, onLeave } = useTilt(tilt)

  return (
    <div ref={ref} className={`glass ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  )
}
