import { useReveal } from '../hooks/useReveal.js'
import SplitText from './SplitText.jsx'

const steps = [
  { idx: '01', title: 'Diagnóstico', text: 'Mapeamos sua operação e apontamos exatamente onde a automação e o sistema pagam a conta mais rápido.', time: '3 dias úteis' },
  { idx: '02', title: 'Arquitetura', text: 'Desenhamos o fluxo, as integrações e a interface antes de escrever uma linha de código.', time: '1 semana' },
  { idx: '03', title: 'Construção', text: 'Desenvolvemos em ciclos curtos, com entregas visíveis toda semana — você acompanha, não espera.', time: '2 a 6 semanas' },
  { idx: '04', title: 'Operação', text: 'Sistema no ar, time treinado, e um responsável dedicado acompanhando os primeiros 90 dias.', time: 'suporte contínuo' },
]

export default function Process() {
  const ref = useReveal()
  return (
    <section className="process" id="processo" ref={ref}>
      <div className="container">
        <SplitText as="span" className="section-tag">como funciona</SplitText>
        <h2 className="section-title reveal">Do diagnóstico ao sistema no ar, sem enrolação.</h2>
        <div className="process-line">
          {steps.map((s) => (
            <div className="process-step reveal" key={s.idx}>
              <span className="step-index">{s.idx}</span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
              <span className="step-time">{s.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
