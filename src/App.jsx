import { useState } from 'react'
import Intro from './components/Intro.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
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
      {!introDone && <Intro onFinish={finishIntro} />}
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
