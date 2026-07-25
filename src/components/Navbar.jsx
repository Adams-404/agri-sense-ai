import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { darkMode, toggleTheme, currentLang, setCurrentLang, langLabels } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const langRef = useRef()
  const moreRef = useRef()

  const currentPath = location.pathname.replace('/', '') || 'home'

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const go = (page) => {
    navigate('/' + page)
    setMenuOpen(false)
    setMoreOpen(false)
  }

  return (
    <nav className="site-navbar">
      <div className="navbar-container">
        {/* Left Side: Brand Text Only (NO LOGO ICON / EMOJI as requested) */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); go('home') }}
          className="brand-text"
        >
          AgriSense
        </a>

        {/* Center: Main Navigation Links */}
        <div className={`nav-menu ${menuOpen ? 'is-open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); go('features') }} className={`nav-item ${currentPath === 'features' ? 'active' : ''}`}>
            Products ▾
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); go('detect') }} className={`nav-item ${currentPath === 'detect' ? 'active' : ''}`}>
            Focus Crops ▾
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); go('about') }} className={`nav-item ${currentPath === 'about' ? 'active' : ''}`}>
            Use Cases
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); go('forum') }} className={`nav-item ${currentPath === 'forum' ? 'active' : ''}`}>
            Network ▾
          </a>
          
          <div ref={moreRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button 
              onClick={() => setMoreOpen(!moreOpen)} 
              className="nav-item nav-dropdown-btn"
            >
              Learn More ▾
            </button>
            {moreOpen && (
              <div className="dropdown-panel">
                <div className="dropdown-grid">
                  {[
                    ['chat','AI Assistant'],['marketplace','Marketplace'],['prices','Market Prices'],
                    ['weather','Weather'],['dashboard','Dashboard'],['news','News'],
                    ['profile','Profile'],['contact','Contact'],['login','Login'],
                    ['register','Register']
                  ].map(([p, label]) => (
                    <button key={p} onClick={() => go(p)} className="dropdown-link">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Auth & Utility Actions */}
        <div className="navbar-actions">
          <div ref={langRef} style={{ position: 'relative' }}>
            <button onClick={() => setLangOpen(!langOpen)} className="util-btn">
              {currentLang.toUpperCase()} ▾
            </button>
            {langOpen && (
              <div className="dropdown-panel lang-panel">
                <div className="dropdown-header">Select Language</div>
                {Object.entries(langLabels).map(([code, name]) => (
                  <button 
                    key={code} 
                    onClick={() => { setCurrentLang(code); setLangOpen(false) }}
                    className={`dropdown-link ${currentLang === code ? 'active' : ''}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={toggleTheme} className="util-btn">
            {darkMode ? 'LIGHT' : 'DARK'}
          </button>

          <a href="#" onClick={(e) => { e.preventDefault(); go('login') }} className="nav-login-link">
            Log in
          </a>

          <button onClick={() => go('register')} className="btn-pill-white-sm">
            Get a Demo
          </button>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-toggle-btn"
            aria-label="Toggle Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  )
}
