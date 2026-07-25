import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <section className="page-hero-section">
      {/* 100VH FULL VIEWPORT HERO SECTION */}
      <div className="hero-wrapper-full">
        <div className="hero-card-full">
          <div className="hero-card-overlay"></div>
          <div className="hero-content-inner">

            {/* Upper Right Copy & Actions Block */}
            <div className="hero-mid-section">
              <div className="hero-microcopy-block">
                <p className="hero-microcopy-text">
                  We developed an easy-to-use, easy-to-operate, comprehensive system for gaining insights from drones and satellites. Compatible with drones & machinery, our platform delivers on-the-farm data assimilation.
                </p>
                <div className="hero-microcopy-actions">
                  <button className="btn-pill-white" onClick={() => navigate('/detect')}>
                    Free Trial
                  </button>
                  <button className="btn-pill-translucent" onClick={() => navigate('/features')}>
                    See All Products
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Main Headline & Explore Cue */}
            <div className="hero-bottom-section">
              <h1 className="hero-headline-main">
                The Most <em className="serif-italic">Powerful</em> Field Analytics Platform For Crop Insights
              </h1>
              <div className="hero-explore-cue" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                <span>Explore More</span> ↓
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MINIMAL FEATURE HIGHLIGHTS */}
      <div className="container mt-4">
        <div className="section-header-minimal text-center">
          <span className="badge-minimal">INTELLIGENT AGRICULTURE</span>
          <h2 className="section-title-main">
            Engineered for <em className="serif-italic">Precision Farming</em>
          </h2>
          <p className="section-subtitle">
            Empowering agricultural enterprises and farmers across Nigeria with AI diagnosis, real-time weather telemetry, and direct market access.
          </p>
        </div>

        <div className="grid-3 mb-4">
          {[
            {
              num: '01',
              title: 'AI Crop Diagnostics',
              desc: 'Instant plant disease detection powered by advanced visual neural models trained on sub-Saharan crop conditions.'
            },
            {
              num: '02',
              title: 'Native Voice Assistant',
              desc: 'Ask questions in English, Hausa, Yoruba, Igbo, Fulfulde, or Kanuri and receive localized farming recommendations.'
            },
            {
              num: '03',
              title: 'Real-Time Market Telemetry',
              desc: 'Access live commodity prices across regional hubs to maximize harvest yield values and trade directly.'
            }
          ].map(item => (
            <div key={item.title} className="card card-minimal">
              <span className="card-num">{item.num}</span>
              <h4 className="card-title">{item.title}</h4>
              <p className="card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* STATS STRIP */}
        <div className="stats-strip-card">
          <div className="grid-3">
            <div>
              <div className="stat-value">12,400+</div>
              <div className="stat-label">Farmers Empowered</div>
            </div>
            <div>
              <div className="stat-value">6 Languages</div>
              <div className="stat-label">Native Voice Support</div>
            </div>
            <div>
              <div className="stat-value">98.4%</div>
              <div className="stat-label">Diagnostic Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
