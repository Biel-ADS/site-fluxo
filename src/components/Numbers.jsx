import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

function Counter({ target, suffix = '', decimal = false }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return
          started.current = true
          const duration = 1400
          let startTime = null
          const tick = (ts) => {
            if (!startTime) startTime = ts
            const progress = Math.min((ts - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const v = target * eased
            setValue(decimal ? Number(v.toFixed(1)) : Math.round(v))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          obs.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, decimal])

  return (
    <span ref={ref}>
      <span className="number-value">{value}</span>
      <span className="number-suffix">{suffix}</span>
    </span>
  )
}

const cards = [
  { target: 72, suffix: '%', text: 'redução média de tarefas manuais depois da automação' },
  { target: 120, suffix: '+', text: 'operações e sistemas entregues para empresas de todos os portes' },
  { target: 21, suffix: '', text: 'dias, em média, até o primeiro sistema entrar em produção' },
  { target: 4.9, suffix: '', text: 'nota média de satisfação dos clientes ativos (base de 87 avaliações)', decimal: true },
]

export default function Numbers() {
  const ref = useReveal()
  return (
    <section className="numbers" id="numeros" ref={ref}>
      <div className="container numbers-grid">
        {cards.map((c) => (
          <div className="number-card reveal" key={c.text}>
            <Counter target={c.target} suffix={c.suffix} decimal={c.decimal} />
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
