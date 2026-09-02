import { useReveal } from '../hooks/useReveal.js'
import SplitText from './SplitText.jsx'

const pains = [
  {
    num: '01',
    before: '"A gente resolve tudo por planilha e WhatsApp."',
    after: 'Um sistema central onde cada pedido, cliente e status atualiza sozinho.',
  },
  {
    num: '02',
    before: '"Só sabemos o resultado do mês quando o mês já acabou."',
    after: 'Dashboards vivos, atualizados em tempo real, com o número que importa na tela.',
  },
  {
    num: '03',
    before: '"Contratamos gente só para copiar dado de um sistema pro outro."',
    after: 'Integrações que conversam sozinhas — sem retrabalho, sem erro humano.',
  },
]

export default function Pains() {
  const ref = useReveal()
  return (
    <section className="pains" id="dores" ref={ref}>
      <div className="container">
        <SplitText as="span" className="section-tag">o diagnóstico</SplitText>
        <h2 className="section-title reveal">
          Você não tem um problema de esforço. <br />Tem um problema de <em>sistema</em>.
        </h2>
        <div className="pains-grid">
          {pains.map((p) => (
            <article className="pain-card reveal" key={p.num}>
              <span className="pain-num">{p.num}</span>
              <p className="pain-before">{p.before}</p>
              <div className="pain-arrow">→</div>
              <p className="pain-after">{p.after}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
