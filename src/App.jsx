import { useState } from 'react'
import WaterBackground from './components/WaterBackground.jsx'
import CursorTrail from './components/CursorTrail.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Intro from './components/Intro.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import WhatWeBuild from './components/WhatWeBuild.jsx'
import WhatWeAchieved from './components/WhatWeAchieved.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem('introSeen') === '1',
  )

  function finishIntro() {
    sessionStorage.setItem('introSeen', '1')
    setIntroDone(true)
  }

  return (
    <>
      <WaterBackground />
      <div className="grain" aria-hidden="true" />
      <CursorTrail />
      <ScrollProgress />
      {!introDone && <Intro onFinish={finishIntro} />}
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <WhatWeBuild />
        <WhatWeAchieved />
        <Services />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
