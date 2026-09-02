import { useReveal } from '../hooks/useReveal.js'
import SplitText from './SplitText.jsx'

const rows = [
  ['Escopo', 'Só marketing, ou só software — nunca os dois juntos', 'Marketing, sistema e automação na mesma engenharia'],
  ['Prazo de entrega', '2 a 6 meses até ver algo funcionando', 'Primeiro sistema no ar em 21 dias'],
  ['Propriedade', 'Você paga mensalidade e não é dono de nada', 'Código e sistema são seus, sem lock-in'],
  ['Relatórios', 'PDF mensal, defasado', 'Dashboard ao vivo, sempre atualizado'],
  ['Suporte', 'Ticket que demora dias', 'Time dedicado, resposta em minutos'],
]

export default function Compare() {
  const ref = useReveal()
  return (
    <section className="compare" id="comparativo" ref={ref}>
      <div className="container">
        <SplitText as="span" className="section-tag">a diferença</SplitText>
        <h2 className="section-title reveal">
          Agência de marketing genérica ou fábrica de software lenta. <br /><em>Escolha um terceiro caminho.</em>
        </h2>
        <div className="compare-table reveal">
          <div className="compare-row compare-head">
            <div></div>
            <div>Agência tradicional</div>
            <div className="col-highlight">FLUXO</div>
          </div>
          {rows.map((r) => (
            <div className="compare-row" key={r[0]}>
              <div>{r[0]}</div>
              <div>{r[1]}</div>
              <div className="col-highlight">{r[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
