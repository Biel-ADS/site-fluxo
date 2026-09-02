import { useReveal } from '../hooks/useReveal.js'

export default function CtaBanner() {
  const ref = useReveal()
  return (
    <section className="cta-banner">
      <div className="container cta-banner-inner reveal" ref={ref}>
        <p>Ainda decidindo? <strong>21 dias</strong> é o tempo médio até o primeiro sistema entrar em produção.</p>
        <a href="#contato" className="btn btn-primary">Agendar diagnóstico gratuito</a>
      </div>
    </section>
  )
}
