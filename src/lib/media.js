// Shared gate for heavy autoplay video. Everyone always gets the poster image
// plus the lightweight SVG/CSS water effects; the multi-MB clips are a
// progressive enhancement we skip on reduced-motion or weak/metered links.
export function videoAllowed() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false

  const conn =
    navigator.connection || navigator.webkitConnection || navigator.mozConnection
  if (conn) {
    if (conn.saveData) return false
    if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g') return false
  }
  return true
}
