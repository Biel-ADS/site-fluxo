import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import SplitText from './SplitText.jsx'

const tabs = [
  { id: 'automacao', label: 'Automação de Processos' },
  { id: 'sistemas', label: 'Sistemas Sob Medida' },
  { id: 'growth', label: 'Marketing & Growth' },
]

function FlowVisual() {
  return (
    <div className="flow-diagram">
      <div className="flow-node n1">Pedido<br />entra</div>
      <div className="flow-node n2">Sistema<br />valida</div>
      <div className="flow-node n3">Financeiro<br />atualiza</div>
      <div className="flow-node n4">Cliente<br />notificado</div>
      <svg className="flow-lines" viewBox="0 0 400 260" preserveAspectRatio="none">
        <path className="flow-path" d="M60,50 C160,50 160,130 200,130" />
        <path className="flow-path" d="M200,130 C240,130 240,50 340,50" />
        <path className="flow-path" d="M200,130 C240,130 240,210 340,210" />
      </svg>
    </div>
  )
}

function MockVisual() {
  return (
    <div className="mock-window">
      <div className="mock-bar"><span /><span /><span /></div>
      <div className="mock-body">
        <div className="mock-side" />
        <div className="mock-content">
          <div className="mock-card" />
          <div className="mock-card small" />
          <div className="mock-chart">
            {[40, 70, 55, 90, 65].map((h, i) => (
              <div className="bar" style={{ '--h': `${h}%` }} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FunnelVisual() {
  const stages = [
    { w: '100%', label: 'Visitantes', value: '18.400' },
    { w: '64%', label: 'Leads', value: '3.120' },
    { w: '34%', label: 'Oportunidades', value: '860' },
    { w: '16%', label: 'Clientes', value: '214' },
  ]
  return (
    <div className="funnel">
      {stages.map((s) => (
        <div className="funnel-stage" style={{ '--w': s.w }} key={s.label}>
          {s.label} <b>{s.value}</b>
        </div>
      ))}
    </div>
  )
}

export default function Solutions() {
  const [active, setActive] = useState('automacao')
  const ref = useReveal()

  return (
    <section className="solutions" id="solucoes" ref={ref}>
      <div className="container">
        <SplitText as="span" className="section-tag">o que entregamos</SplitText>
        <h2 className="section-title reveal">
          Três frentes. Um único objetivo: <em>sua empresa rodando sem depender de gente para tarefas repetitivas.</em>
        </h2>

        <div className="solution-tabs reveal">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`tab-btn${active === t.id ? ' active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="tab-panels">
          <div className={`tab-panel${active === 'automacao' ? ' active' : ''}`}>
            <div className="panel-grid">
              <div className="panel-text">
                <h3>Automação de Processos</h3>
                <p>Mapeamos onde sua equipe perde tempo fazendo trabalho que um script deveria fazer — e construímos a automação que assume essa tarefa 24h por dia, sem cansar e sem errar.</p>
                <ul className="panel-list">
                  <li>Integração entre ERP, CRM, financeiro e ferramentas internas</li>
                  <li>Robôs de captura, cadastro e conciliação de dados</li>
                  <li>Notificações e fluxos de aprovação automáticos</li>
                  <li>Relatórios gerados e enviados sozinhos, todo dia</li>
                </ul>
              </div>
              <div className="panel-visual"><FlowVisual /></div>
            </div>
          </div>

          <div className={`tab-panel${active === 'sistemas' ? ' active' : ''}`}>
            <div className="panel-grid">
              <div className="panel-text">
                <h3>Sistemas Sob Medida</h3>
                <p>Nem todo problema cabe em um software pronto. Quando a sua operação é única, construímos o sistema web ou painel interno que se encaixa exatamente no seu jeito de trabalhar.</p>
                <ul className="panel-list">
                  <li>Painéis administrativos e portais de cliente</li>
                  <li>Plataformas SaaS e produtos digitais próprios</li>
                  <li>Módulos de gestão (estoque, pedidos, agenda, contratos)</li>
                  <li>Infraestrutura escalável, segura e sua — sem lock-in</li>
                </ul>
              </div>
              <div className="panel-visual"><MockVisual /></div>
            </div>
          </div>

          <div className={`tab-panel${active === 'growth' ? ' active' : ''}`}>
            <div className="panel-grid">
              <div className="panel-text">
                <h3>Marketing & Growth</h3>
                <p>Sistema bom sem demanda não gera receita. Por isso desenhamos a aquisição — performance, funil e conteúdo — com o mesmo rigor de engenharia que aplicamos no software.</p>
                <ul className="panel-list">
                  <li>Tráfego pago com atribuição real, não achismo</li>
                  <li>Funis conectados direto ao seu CRM/sistema</li>
                  <li>Landing pages que convertem, testadas por dados</li>
                  <li>Relatório de CAC, LTV e ROI atualizado ao vivo</li>
                </ul>
              </div>
              <div className="panel-visual"><FunnelVisual /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
