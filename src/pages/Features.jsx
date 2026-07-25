export default function Features() {
  const features = [
    { title: 'AI Disease Detection', desc: 'Snap a photo and get instant disease diagnosis with treatment recommendations.' },
    { title: 'Voice Assistant', desc: 'Get farming advice read aloud in your preferred language.' },
    { title: 'Multi-Language', desc: 'English, Hausa, Fulfulde, Yoruba, Igbo, and Kanuri support.' },
    { title: 'Market Prices', desc: 'Real-time crop prices from major Nigerian markets.' },
    { title: 'Marketplace', desc: 'Sell your produce directly to buyers across Nigeria.' },
    { title: 'Weather Forecast', desc: '7-day forecast with farming advice tailored to your region.' },
    { title: 'PWA & Offline', desc: 'Works offline and installs on your phone - no app store needed.' },
    { title: 'Community Forum', desc: 'Connect with other farmers, share knowledge, get help.' },
  ]
  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <h2>Features</h2>
          <p>Everything you need to farm smarter</p>
        </div>
        <div className="grid-2">
          {features.map((f, i) => (
            <div key={i} className="card">
              <h4>{f.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 8 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
