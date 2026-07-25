import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <section className="page">
      <div className="hero">
        <div className="hero-content">
          <div className="badge mb-2">AI-Powered Smart Farming</div>
          <h1>Your AI Farming Assistant<br/>for <span>Nigerian Farmers</span></h1>
          <p>
            Detect crop diseases instantly, get AI farming advice in your local language,
            check market prices, sell your produce, and access weather forecasts.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/detect')}>Detect Disease</button>
            <button className="btn btn-accent" onClick={() => navigate('/chat')}>Ask AI Assistant</button>
            <button className="btn btn-outline" onClick={() => navigate('/register')}>Get Started Free</button>
          </div>
          <div className="hero-stats">
            <div><div className="num">12,400+</div><div className="label">Farmers Helped</div></div>
            <div><div className="num">6</div><div className="label">Languages</div></div>
            <div><div className="num">98%</div><div className="label">Disease Accuracy</div></div>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: -40, position: 'relative', zIndex: 2 }}>
        <div className="grid-3">
          {[
            { title: 'Disease Detection', desc: 'Snap a photo and get instant diagnosis with treatment recommendations.' },
            { title: 'Multi-Language AI', desc: 'Get farming advice in English, Hausa, Yoruba, Igbo, Fulfulde, and Kanuri.' },
            { title: 'Market Intelligence', desc: 'Real-time crop prices, weather forecasts, and a marketplace to sell your produce.' },
          ].map(item => (
            <div key={item.title} className="card text-center">
              <h4 style={{ marginBottom: 8 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
