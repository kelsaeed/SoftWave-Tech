export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <span>SoftWaveTech</span>
      <span>&copy; {year}</span>
    </footer>
  )
}
