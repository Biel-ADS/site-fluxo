import { useReveal } from '../hooks/useReveal.js'
import SplitText from './SplitText.jsx'

const personas = [
  {
    tag: 'Diretoria / C-level',
    title: 'Do "achismo" à decisão com dado',
    items: [
      'Visão consolidada de receita, custo e margem em tempo real',
      'Menos reunião pra saber "como estamos" — o número já está na tela',
      'Decisões de investimento com base em histórico, não em intuição',
      'Governança e auditoria sem depender de planilha de terceiros',
    ],
  },
  {
    tag: 'Gestores / Coordenação',
    title: 'O fim de apagar incêndio todo dia',
    items: [
      'Fluxo de aprovação automático — sem cobrar por WhatsApp',
      'Indicadores de equipe atualizados sem pedir relatório manual',
      'Alertas automáticos quando algo sai do previsto',
      'Menos tempo gerenciando ferramenta, mais tempo gerenciando gente',
    ],
  },
  {
    tag: 'Time operacional',
    title: 'Adeus ao trabalho braçal e repetitivo',
    items: [
      'Sem digitar o mesmo dado em três sistemas diferentes',
      'Menos planilha, menos "copia e cola", menos erro',
      'Interface pensada pra quem usa 8 horas por dia, não pra quem vende',
      'Tempo livre pra trabalho que exige gente — não robô',
    ],
  },
]

export default function Personas() {
  const ref = useReveal()
  return (
    <section className="personas" id="personas" ref={ref}>
      <div className="container">
        <SplitText as="span" className="section-tag">para quem decide</SplitText>
        <h2 className="section-title reveal">Um sistema, três motivos diferentes para ele existir.</h2>
        <div className="persona-grid">
          {personas.map((p) => (
            <article className="persona-card reveal" key={p.tag}>
              <span className="persona-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <ul className="persona-list">
                {p.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="persona-cta reveal">
          <a href="#contato" className="btn btn-ghost">Ver qual frente resolve seu problema primeiro →</a>
        </div>
      </div>
    </section>
  )
}
