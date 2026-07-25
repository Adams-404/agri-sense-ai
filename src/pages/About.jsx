export default function About() {
  return (
    <section className="page">
      <div className="container" style={{ maxWidth: 700 }}>
        <div className="page-header">
          <h2>About AgriSense AI</h2>
        </div>
        <div className="card">
          <p style={{ lineHeight: 1.8, color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text)' }}>AgriSense AI</strong> is an AI-powered agricultural platform built specifically for Nigerian farmers. 
            Founded in 2026, our mission is to democratize access to cutting-edge agricultural technology for every farmer - 
            regardless of location, language, or technical ability.
          </p>
          <p style={{ lineHeight: 1.8, color: 'var(--text-muted)', marginTop: 16 }}>
            We combine computer vision, natural language processing, and local market data to deliver a comprehensive 
            farming assistant that works on low-end smartphones and in low-connectivity environments.
          </p>
          <div className="grid-2 mt-3" style={{ textAlign: 'center' }}>
            <div><strong>6+ Languages</strong></div>
            <div><strong>Works on 2G/3G</strong></div>
            <div><strong>30+ Partners</strong></div>
            <div><strong>12,400+ Farmers</strong></div>
          </div>
        </div>
      </div>
    </section>
  )
}
