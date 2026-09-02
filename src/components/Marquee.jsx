const names = ['ROTA LOGÍSTICA', 'NORTE CAPITAL', 'VÉRTICE INDÚSTRIA', 'GRUPO ALTAVIA', 'CLÍNICA PRIMA', 'BLOOM VAREJO', 'ANCORA CONTÁBIL', 'OESTE AGRO']

export default function Marquee() {
  return (
    <section className="marquee-section">
      <p className="marquee-label">Empresas que trocaram trabalho manual por sistema</p>
      <div className="marquee">
        <div className="marquee-track">
          {[...names, ...names].map((n, i) => (
            <span key={i}>{n}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
