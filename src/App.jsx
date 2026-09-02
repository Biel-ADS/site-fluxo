import { useScrollState } from './hooks/useScrollState.js'
import Loader from './components/Loader.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Pains from './components/Pains.jsx'
import Solutions from './components/Solutions.jsx'
import Personas from './components/Personas.jsx'
import CtaBanner from './components/CtaBanner.jsx'
import Process from './components/Process.jsx'
import Numbers from './components/Numbers.jsx'
import Testimonials from './components/Testimonials.jsx'
import Compare from './components/Compare.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import MobileCta from './components/MobileCta.jsx'

export default function App() {
  const { scrolled, progress } = useScrollState()

  return (
    <>
      <Loader />
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <Nav scrolled={scrolled} />
      <main id="top">
        <Hero />
        <Marquee />
        <Pains />
        <Solutions />
        <Personas />
        <CtaBanner />
        <Process />
        <Numbers />
        <Testimonials />
        <Compare />
        <Faq />
        <FinalCta />
      </main>
      <MobileCta />
      <Footer />
    </>
  )
}
