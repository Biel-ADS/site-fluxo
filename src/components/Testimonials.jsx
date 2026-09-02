import { useReveal } from '../hooks/useReveal.js'
import SplitText from './SplitText.jsx'

const testimonials = [
  { quote: '"A gente levava 3 dias pra fechar o relatório financeiro do mês. Hoje é automático — e o time que fazia isso agora vende."', name: 'Marcelo Andrade', role: 'Diretor Financeiro, Grupo Altavia' },
  { quote: '"Tínhamos 4 sistemas que não se falavam. A FLUXO conectou tudo em 5 semanas. Parece outra empresa."', name: 'Renata Souza', role: 'COO, Bloom Varejo' },
  { quote: '"O painel que construíram virou a ferramenta que a operação inteira usa todo dia. Nunca mais abrimos planilha."', name: 'Diego Fonseca', role: 'CEO, Rota Logística' },
]

export default function Testimonials() {
  const ref = useReveal()
  return (
    <section className="testimonials" ref={ref}>
      <div className="container">
        <SplitText as="span" className="section-tag">quem já saiu do manual</SplitText>
        <h2 className="section-title reveal">Não é sobre tecnologia. É sobre tempo de volta.</h2>
        <div className="testi-grid">
          {testimonials.map((t) => (
            <blockquote className="testi-card reveal" key={t.name}>
              <p>{t.quote}</p>
              <footer><strong>{t.name}</strong><span>{t.role}</span></footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
