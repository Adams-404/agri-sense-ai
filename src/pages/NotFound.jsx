import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <section className="page">
      <div className="container text-center" style={{ paddingTop: 120 }}>
        <h2 style={{ fontSize: '3rem', margin: '16px 0' }}>404</h2>
        <p style={{ color: 'var(--text-muted)' }}>Oops! This page doesn't exist.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Go Home</button>
      </div>
    </section>
  )
}
