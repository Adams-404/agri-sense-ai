import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const go = (page) => navigate('/' + page)

  const linkStyle = {
    display: 'block', fontSize: 14, color: 'rgba(255, 255, 255, 0.65)', marginBottom: 8,
    textDecoration: 'none', transition: 'color 0.2s'
  }

  return (
    <footer className="footer-dark">
      <div className="container">
        <div className="grid-4" style={{ gap: 32 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>AgriSense</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6 }}>
              The field analytics platform delivering real-time crop insights and AI diagnosis for smart farming.
            </p>
          </div>

          <div>
            <h5 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15, color: '#ffffff', letterSpacing: '-0.01em' }}>Platform</h5>
            {['detect','chat','marketplace','prices'].map(p => {
              const labels = { detect: 'Disease Detection', chat: 'AI Assistant', marketplace: 'Marketplace', prices: 'Market Prices' }
              return (
                <a key={p} href="#" onClick={(e) => { e.preventDefault(); go(p) }} style={linkStyle}>
                  {labels[p]}
                </a>
              )
            })}
          </div>

          <div>
            <h5 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15, color: '#ffffff', letterSpacing: '-0.01em' }}>Company</h5>
            {[['about','About Us'],['features','Features'],['news','News'],['forum','Community Forum']].map(([p, label]) => (
              <a key={p} href="#" onClick={(e) => { e.preventDefault(); go(p) }} style={linkStyle}>{label}</a>
            ))}
          </div>

          <div>
            <h5 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15, color: '#ffffff', letterSpacing: '-0.01em' }}>Legal & Help</h5>
            {[['privacy','Privacy Policy'],['terms','Terms of Service'],['contact','Contact Us']].map(([p, label]) => (
              <a key={p} href="#" onClick={(e) => { e.preventDefault(); go(p) }} style={linkStyle}>{label}</a>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingTop: 28, marginTop: 40, borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: 13, color: 'rgba(255, 255, 255, 0.5)' }}>
          &copy; 2026 AgriSense. All rights reserved. Precision field analytics for modern agriculture.
        </div>
      </div>
    </footer>
  )
}
