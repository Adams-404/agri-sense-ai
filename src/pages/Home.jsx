import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <section className="page-hero-section">
      {/* 100VH FULL VIEWPORT HERO SECTION WITH FADED BOTTOM EDGE */}
      <div className="hero-wrapper-full">
        <div className="hero-card-full">
          <div className="hero-card-overlay"></div>
          <div className="hero-content-inner">

            {/* Upper Right Copy & Real Action Buttons */}
            <div className="hero-mid-section animate-slide-up animate-delay-1">
              <div className="hero-microcopy-block">
                <p className="hero-microcopy-text">
                  AI-powered agricultural platform for crop disease diagnosis, real-time weather telemetry, and market prices tailored for modern farming enterprise.
                </p>
                <div className="hero-microcopy-actions">
                  <button className="btn-pill-white" onClick={() => navigate('/detect')}>
                    Detect Crop Disease
                  </button>
                  <button className="btn-pill-translucent" onClick={() => navigate('/chat')}>
                    Ask AI Assistant
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Headline & Animated Explore Cue */}
            <div className="hero-bottom-section animate-slide-up animate-delay-2">
              <h1 className="hero-headline-main">
                The Most <em className="serif-italic">Powerful</em> Field Analytics Platform For Crop Insights
              </h1>
              <div 
                className="hero-explore-cue" 
                onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
              >
                <span>Explore Platform</span>
                <span className="hero-explore-arrow">↓</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MINIMAL FEATURE HIGHLIGHTS */}
      <div className="container mt-4">
        <div className="section-header-minimal text-center animate-slide-up animate-delay-3">
          <span className="badge-minimal">INTELLIGENT AGRICULTURE</span>
          <h2 className="section-title-main">
            Engineered for <em className="serif-italic">Precision Farming</em>
          </h2>
          <p className="section-subtitle">
            Empowering agricultural enterprises and farmers across Nigeria with instant AI diagnosis, local language AI guidance, and live market prices.
          </p>
        </div>

        <div className="grid-3 mb-4">
          {[
            {
              num: '01',
              title: 'AI Crop Diagnostics',
              desc: 'Snap a crop photo for immediate disease detection and custom treatment recommendations.',
              route: '/detect'
            },
            {
              num: '02',
              title: 'Native Multilingual Voice',
              desc: 'Get agricultural advice in English, Hausa, Yoruba, Igbo, Fulfulde, and Kanuri.',
              route: '/chat'
            },
            {
              num: '03',
              title: 'Market & Weather Telemetry',
              desc: 'Monitor real-time commodity prices and hyper-local rain forecasts before harvesting.',
              route: '/prices'
            }
          ].map((item, idx) => (
            <div 
              key={item.title} 
              className={`card card-minimal animate-slide-up animate-delay-${idx + 1}`}
              onClick={() => navigate(item.route)}
            >
              <span className="card-num">{item.num}</span>
              <h4 className="card-title">{item.title}</h4>
              <p className="card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* STATS STRIP */}
        <div className="stats-strip-card animate-slide-up animate-delay-3">
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
