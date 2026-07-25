import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { showToast } = useApp()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    showToast('Logged in successfully!', 'success')
  }
  return (
    <section className="page">
      <div className="container" style={{ maxWidth: 420 }}>
        <div className="auth-card card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label>Email</label><input type="email" placeholder="farmer@example.com" required /></div>
            <div className="form-group"><label>Password</label><input type="password" placeholder="Enter your password" required /></div>
            <div style={{ textAlign: 'right', marginBottom: 16 }}>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot') }} style={{ fontSize: 13 }}>Forgot password?</a>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Login</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: 'var(--text-muted)' }}>
            Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register') }}>Register</a>
          </p>
        </div>
      </div>
    </section>
  )
}
