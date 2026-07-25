import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function ForgotPassword() {
  const { showToast } = useApp()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    showToast('Reset link sent to your email!', 'success')
  }
  return (
    <section className="page">
      <div className="container" style={{ maxWidth: 420 }}>
        <div className="auth-card card">
          <h2>Reset Password</h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 20 }}>
            Enter your email and we'll send you a reset link
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label>Email</label><input type="email" required /></div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Reset Link</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 16 }}>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login') }} style={{ fontSize: 14 }}>Back to Login</a>
          </p>
        </div>
      </div>
    </section>
  )
}
