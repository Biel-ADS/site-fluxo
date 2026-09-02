import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import Scene3D from './Scene3D.jsx'
import SplitText from './SplitText.jsx'

export default function FinalCta() {
  const ref = useReveal()
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="final-cta" id="contato">
      <Scene3D className="cta-canvas" color="#0B0D0F" radius={2.3} particleColor="#0B0D0F" autoRotateSpeed={0.04} mouseInfluence={0.15} />
      <div className="container final-cta-inner reveal" ref={ref}>
        <SplitText as="span" className="section-tag light">próximo passo</SplitText>
        <h2 className="final-title">Sua operação pode rodar sozinha <br />a partir do mês que vem.</h2>
        <p className="final-sub">Agende um diagnóstico gratuito de 30 minutos. Sem compromisso, sem enrolação — só um mapa claro do que dá pra automatizar primeiro.</p>
        <form className="cta-form" onSubmit={onSubmit}>
          <input type="text" name="nome" placeholder="Seu nome" required />
          <input type="text" name="empresa" placeholder="Empresa" required />
          <input type="email" name="email" placeholder="E-mail corporativo" required />
          <input type="tel" name="telefone" placeholder="WhatsApp" required />
          <select name="segmento" defaultValue="" required>
            <option value="" disabled>Segmento da empresa</option>
            <option>Indústria</option>
            <option>Varejo / E-commerce</option>
            <option>Serviços</option>
            <option>Saúde</option>
            <option>Logística</option>
            <option>Financeiro / Contábil</option>
            <option>Outro</option>
          </select>
          <select name="faturamento" defaultValue="" required>
            <option value="" disabled>Faturamento mensal</option>
            <option>Até R$ 100 mil</option>
            <option>R$ 100 mil a R$ 500 mil</option>
            <option>R$ 500 mil a R$ 2 milhões</option>
            <option>Acima de R$ 2 milhões</option>
          </select>
          <button type="submit" className="btn btn-primary btn-large" disabled={sent} style={sent ? { opacity: 0.7 } : undefined}>
            {sent ? 'Recebemos! Vamos te chamar em breve.' : 'Agendar diagnóstico gratuito'}
          </button>
        </form>
        <p className="final-note">Resposta em até 1 dia útil. Sem spam, sem letra miúda.</p>
      </div>
    </section>
  )
}
