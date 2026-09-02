import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import SplitText from './SplitText.jsx'

const faqs = [
  { q: 'Minha empresa é pequena, a FLUXO atende esse porte?', a: 'Sim. Trabalhamos com operações desde 5 pessoas até empresas com centenas de colaboradores — o projeto é dimensionado pra sua realidade, não o contrário.' },
  { q: 'Quanto tempo leva um projeto do início ao fim?', a: 'O diagnóstico leva 3 dias úteis. A partir daí, o primeiro sistema costuma ir ao ar entre 2 e 6 semanas, dependendo da complexidade das integrações.' },
  { q: 'Vocês integram com o sistema que já usamos hoje (ERP, CRM etc)?', a: 'Sim, é o ponto de partida da maioria dos projetos. Trabalhamos com as principais plataformas do mercado e construímos integrações customizadas quando não existe conector pronto.' },
  { q: 'O sistema desenvolvido é meu, ou fico preso à FLUXO?', a: 'É seu. Código, infraestrutura e dados ficam sob sua propriedade — você pode continuar com a gente ou levar para outro time a qualquer momento.' },
  { q: 'Como funciona o suporte depois da entrega?', a: 'Acompanhamos os primeiros 90 dias de operação com um responsável dedicado, e a partir daí você escolhe entre plano de manutenção contínua ou suporte sob demanda.' },
  { q: 'Preciso ter um time técnico interno para operar o sistema?', a: 'Não. Construímos pensando em quem vai usar no dia a dia, com treinamento incluso na entrega — nenhuma linha de código exigida da sua equipe.' },
]

function FaqItem({ item, open, onToggle }) {
  const bodyRef = useRef(null)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" onClick={onToggle}>
        {item.q}
        <span className="faq-icon">+</span>
      </button>
      <div className="faq-a" style={{ maxHeight: open ? `${bodyRef.current?.scrollHeight ?? 200}px` : '0px' }}>
        <p ref={bodyRef}>{item.a}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(null)
  const ref = useReveal()

  return (
    <section className="faq" id="faq" ref={ref}>
      <div className="container">
        <SplitText as="span" className="section-tag">perguntas frequentes</SplitText>
        <h2 className="section-title reveal">Ainda com dúvida? Provavelmente já respondemos.</h2>
        <div className="faq-list reveal">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
