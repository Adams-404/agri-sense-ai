import { useApp } from '../context/AppContext'

export default function Profile() {
  const { currentLang, setCurrentLang, darkMode, toggleTheme, langLabels } = useApp()
  return (
    <section className="page">
      <div className="container">
        <div className="page-header"><h2>My Profile</h2></div>
        <div className="profile-card card">
          <div className="profile-avatar">F</div>
          <h3>Farmer Demo</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>farmer@agrisense.ai</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '16px 0' }}>
            <span className="badge">Maize Farmer</span>
            <span className="badge">Kano State</span>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => {}}>Edit Profile</button>
        </div>
        <div className="card mt-3">
          <h4 className="mb-2">Settings</h4>
          <div className="form-group">
            <label>Preferred Language</label>
            <select value={currentLang} onChange={e => setCurrentLang(e.target.value)}
              style={{ padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', fontFamily: 'var(--font)', color: 'var(--text)' }}>
              {Object.entries(langLabels).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Theme</label>
            <select value={darkMode ? 'dark' : 'light'} onChange={toggleTheme}
              style={{ padding: 10, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg)', fontFamily: 'var(--font)', color: 'var(--text)' }}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}
