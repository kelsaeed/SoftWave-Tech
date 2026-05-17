// Plays behind the whole site so the glass panels have real water to refract.
export default function WaterBackground() {
  return (
    <div className="water-bg" aria-hidden="true">
      <video
        src="/assets/water/water-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/water/water-poster.jpg"
      />
      <div className="water-tint" />
    </div>
  )
}
