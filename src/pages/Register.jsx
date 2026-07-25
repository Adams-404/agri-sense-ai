import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Register() {
  const { showToast } = useApp()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    showToast('Account created! Welcome to AgriSense AI.', 'success')
  }
  return (
    <section className="page">
      <div className="container" style={{ maxWidth: 500 }}>
        <div className="auth-card card">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label>First Name</label><input type="text" required /></div>
              <div className="form-group"><label>Last Name</label><input type="text" required /></div>
            </div>
            <div className="form-group"><label>Email</label><input type="email" required /></div>
            <div className="form-group"><label>Phone</label><input type="tel" placeholder="+234..." required /></div>
            <div className="form-group">
              <label>State</label>
              <select>
                <option>Kano</option><option>Kaduna</option><option>Lagos</option><option>Abuja</option>
                <option>Ibadan</option><option>Maiduguri</option><option>Jos</option><option>Sokoto</option>
                <option>Enugu</option><option>Port Harcourt</option><option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Farming Type</label>
              <select>
                <option>Smallholder Farmer</option><option>Commercial Farmer</option>
                <option>Extension Officer</option><option>Agricultural Student</option>
                <option>Food Buyer</option><option>Government Agency</option><option>Other</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Password</label><input type="password" required /></div>
              <div className="form-group"><label>Confirm</label><input type="password" required /></div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Create Account</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: 'var(--text-muted)' }}>
            Already registered? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login') }}>Login</a>
          </p>
        </div>
      </div>
    </section>
  )
}
