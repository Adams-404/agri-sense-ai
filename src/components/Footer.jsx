import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const go = (page) => navigate('/' + page)

  const linkStyle = {
    display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 6,
    textDecoration: 'none', transition: 'color 0.15s'
  }

  return (
    <footer style={{ borderTop:'1px solid var(--border)', padding:'40px 0 24px', marginTop:60 }}>
      <div className="container">
        <div className="grid-4" style={{ gap: 32 }}>
          <div>
            <h5 style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>AgriSense AI</h5>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              AI-powered farming for every Nigerian farmer.
            </p>
          </div>
          <div>
            <h5 style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Quick Links</h5>
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
            <h5 style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Resources</h5>
            {[['about','About Us'],['features','Features'],['news','News'],['forum','Community']].map(([p, label]) => (
              <a key={p} href="#" onClick={(e) => { e.preventDefault(); go(p) }} style={linkStyle}>{label}</a>
            ))}
          </div>
          <div>
            <h5 style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Legal</h5>
            {[['privacy','Privacy Policy'],['terms','Terms of Service'],['contact','Contact']].map(([p, label]) => (
              <a key={p} href="#" onClick={(e) => { e.preventDefault(); go(p) }} style={linkStyle}>{label}</a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 24, marginTop: 24, borderTop: '1px solid var(--border)', fontSize: 13, color: 'var(--text-muted)' }}>
          &copy; 2026 AgriSense AI. Built for Nigerian farmers.
        </div>
      </div>
    </footer>
  )
}
