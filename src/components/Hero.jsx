import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Scene3D from './Scene3D.jsx'
import { useAppReady } from '../hooks/useAppReady.js'

const isCoarsePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

function MagneticButton({ children, className, href }) {
  const ref = useRef(null)

  const onMove = (e) => {
    if (isCoarsePointer()) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(ref.current, { x: x * 0.25, y: y * 0.4, duration: 0.4, ease: 'power3.out' })
  }
  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' })
  }

  return (
    <a ref={ref} href={href} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      <span>{children}</span>
    </a>
  )
}

export default function Hero() {
  const titleRef = useRef(null)
  const ready = useAppReady()

  useEffect(() => {
    if (!ready) return
    const lines = titleRef.current.querySelectorAll('.reveal-line span')
    gsap.fromTo(
      lines,
      { y: '110%' },
      { y: '0%', duration: 0.9, stagger: 0.08, delay: 0.15, ease: 'power4.out' }
    )
    gsap.fromTo(
      '.hero-fade',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, delay: 0.5, ease: 'power3.out' }
    )
  }, [ready])

  return (
    <section className="hero">
      <Scene3D className="hero-canvas" color="#C9FF3D" radius={2.1} particleColor="#EAE8E0" />

      <div className="hero-inner">
        <p className="eyebrow hero-fade" style={{ opacity: 0 }}>
          automação · sistemas sob medida · engenharia de crescimento
        </p>
        <h1 className="hero-title" ref={titleRef}>
          <span className="reveal-line"><span>Sua empresa ainda</span></span>
          <span className="reveal-line"><span>trabalha <em>manualmente</em>.</span></span>
          <span className="reveal-line"><span>Sua concorrência <span className="highlight">já não trabalha mais</span>.</span></span>
        </h1>
        <p className="hero-sub hero-fade" style={{ opacity: 0 }}>
          Projetamos os sistemas, integrações e automações que tiram sua operação do "achismo" e da planilha —
          e liberam seu time para fazer o que realmente gera receita.
        </p>
        <div className="hero-cta hero-fade" style={{ opacity: 0 }}>
          <MagneticButton href="#contato" className="btn btn-primary magnetic">
            Quero automatizar minha operação
          </MagneticButton>
          <a href="#solucoes" className="btn btn-ghost">Ver o que fazemos ↓</a>
        </div>
        <div className="hero-meta hero-fade" style={{ opacity: 0 }}>
          <div className="meta-item"><strong>+120</strong> operações automatizadas</div>
          <div className="meta-item"><strong>72%</strong> menos tarefas manuais em média</div>
          <div className="meta-item"><strong>21 dias</strong> até o primeiro sistema no ar</div>
        </div>
      </div>

      <div className="scroll-cue"><span /></div>
    </section>
  )
}
