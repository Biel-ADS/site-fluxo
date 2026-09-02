import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery.js'
import { useAppReady } from '../hooks/useAppReady.js'

export default function Nav({ scrolled }) {
  const navRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const ready = useAppReady()

  // Entrance cascade: logo slides in, nav links stagger in behind it,
  // the CTA arrives last from the opposite side — the header "assembling"
  // instead of just being there on load. Waits for the intro Loader to
  // hand off (useAppReady) so it doesn't play out hidden behind it.
  useEffect(() => {
    if (reducedMotion || !ready) return
    const el = navRef.current
    if (!el) return
    const logo = el.querySelector('.logo')
    const links = el.querySelectorAll('.nav-links a')
    const cta = el.querySelector('.btn-nav')

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power3.out' } })
      tl.fromTo(logo, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.6 }, 0)
      tl.fromTo(links, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.1)
      tl.fromTo(cta, { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.6 }, 0.25)
    }, el)

    return () => ctx.revert()
  }, [reducedMotion, ready])

  return (
    <header ref={navRef} className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="nav-inner">
        <a href="#top" className="logo">FLUXO<span className="dot">.</span></a>
        <nav className="nav-links">
          <a href="#solucoes">Soluções</a>
          <a href="#personas">Para quem</a>
          <a href="#processo">Processo</a>
          <a href="#numeros">Resultados</a>
          <a href="#comparativo">Por que a FLUXO</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#contato" className="btn btn-nav">Agendar diagnóstico</a>
      </div>
    </header>
  )
}
