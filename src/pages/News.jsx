import { newsArticles } from '../data/news'

export default function News() {
  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <h2>Agricultural News</h2>
          <p>Latest news and updates for Nigerian farmers</p>
        </div>
        <div className="grid-3">
          {newsArticles.map((n, i) => (
            <div key={i} className="card">
              <div className="badge mb-1">{n.source}</div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: 6 }}>{n.title}</h4>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{n.summary}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>{n.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
