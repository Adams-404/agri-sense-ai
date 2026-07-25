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

  const navItems = [
    { page: 'home', label: 'Home' },
    { page: 'detect', label: 'Disease Detection' },
    { page: 'chat', label: 'AI Assistant' },
    { page: 'marketplace', label: 'Marketplace' },
    { page: 'prices', label: 'Market Prices' },
    { page: 'weather', label: 'Weather' },
    { page: 'dashboard', label: 'Dashboard' },
    { page: 'forum', label: 'Forum' },
  ]

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
    <nav style={{
      position:'fixed', top:0, left:0, right:0, height:'var(--nav-height)',
      background:'var(--bg-glass)', backdropFilter:'blur(20px)',
      WebkitBackdropFilter:'blur(20px)', borderBottom:'1px solid var(--border)',
      zIndex:1000, display:'flex', alignItems:'center', padding:'0 24px'
    }}>
      <div style={{
        maxWidth:1200, width:'100%', margin:'0 auto',
        display:'flex', alignItems:'center', justifyContent:'space-between'
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); go('home') }}
          style={{ fontSize:'1.3rem', fontWeight:800, color:'var(--primary)', display:'flex', alignItems:'center', gap:6, textDecoration:'none' }}>
          Agri<span style={{ color:'var(--accent)' }}>Sense</span> AI
        </a>

        <div style={{ display:'flex', gap:4, alignItems:'center' }}
          className={`nav-links${menuOpen ? ' open' : ''}`}>
          {navItems.map(item => (
            <a key={item.page} href="#"
              onClick={(e) => { e.preventDefault(); go(item.page) }}
              style={{
                padding:'8px 12px', borderRadius:6, fontSize:14, fontWeight:500,
                color: currentPath === item.page ? 'var(--primary)' : 'var(--text)',
                background: currentPath === item.page ? 'rgba(26,107,60,0.1)' : 'transparent',
                transition:'all 0.15s', whiteSpace:'nowrap', textDecoration:'none'
              }}>
              {item.label}
            </a>
          ))}
          <div ref={moreRef} style={{ position:'relative' }}>
            <a href="#"
              onClick={(e) => { e.preventDefault(); setMoreOpen(!moreOpen) }}
              style={{
                padding:'8px 12px', borderRadius:6, fontSize:14, fontWeight:500,
                color:'var(--text)', transition:'all 0.15s', whiteSpace:'nowrap', textDecoration:'none'
              }}>
              More +
            </a>
            {moreOpen && (
              <div style={{
                position:'fixed', top:'70px', left:'50%', transform:'translateX(-50%)',
                zIndex:999, background:'var(--bg-card)', border:'1px solid var(--border)',
                borderRadius:'var(--radius)', boxShadow:'var(--shadow-lg)', padding:12,
                minWidth:240, maxWidth:'90vw'
              }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                  {[
                    ['about','About'],['features','Features'],['news','News'],
                    ['profile','Profile'],['contact','Contact'],['login','Login'],
                    ['register','Register'],['admin','Admin'],['privacy','Privacy'],
                    ['terms','Terms']
                  ].map(([p, label]) => (
                    <button key={p} onClick={() => go(p)}
                      style={{ padding:'8px 10px', border:'none', background:'none', cursor:'pointer', borderRadius:6,
                        fontFamily:'var(--font)', color:'var(--text)', textAlign:'center', fontSize:13,
                        transition:'background 0.15s' }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div ref={langRef} style={{ position:'relative' }}>
            <button onClick={() => setLangOpen(!langOpen)}
              style={{ background:'none', border:'none', color:'var(--text)', cursor:'pointer', fontSize:'0.9rem', padding:'6px 8px', borderRadius:6, fontWeight:500 }}>
              {currentLang.toUpperCase()}
            </button>
            {langOpen && (
              <div style={{
                position:'fixed', top:70, right:24, zIndex:999,
                background:'var(--bg-card)', border:'1px solid var(--border)',
                borderRadius:'var(--radius-sm)', padding:8,
                boxShadow:'var(--shadow-lg)', minWidth:140
              }}>
                <div style={{ fontWeight:600, fontSize:11, marginBottom:6, padding:'4px 8px', textTransform:'uppercase', letterSpacing:'0.3px', color:'var(--text-muted)' }}>
                  Select Language
                </div>
                {Object.entries(langLabels).map(([code, name]) => (
                  <button key={code} onClick={() => { setCurrentLang(code); setLangOpen(false) }}
                    style={{
                      display:'block', width:'100%', padding:'6px 10px', border:'none',
                      background: currentLang === code ? 'rgba(26,107,60,0.1)' : 'none',
                      cursor:'pointer', textAlign:'left', borderRadius:4,
                      fontFamily:'var(--font)', color:'var(--text)', fontSize:13
                    }}>
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={toggleTheme}
            style={{ background:'none', border:'none', color:'var(--text)', cursor:'pointer', fontSize:'0.9rem', padding:'6px 8px', borderRadius:6, fontWeight:500 }}>
            {darkMode ? 'LIGHT' : 'DARK'}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ display:'none', background:'none', border:'none', color:'var(--text)', cursor:'pointer', fontSize:'1.3rem', padding:6, borderRadius:6 }}
            className="menu-toggle">
            ☰
          </button>
        </div>
      </div>

      <style>{`
        @media(max-width:768px) {
          .nav-links { display:none; position:fixed; top:var(--nav-height); left:0; right:0;
            background:var(--bg-card); flex-direction:column; padding:12px;
            border-bottom:1px solid var(--border); box-shadow:var(--shadow-lg); }
          .nav-links.open { display:flex; }
          .menu-toggle { display:block !important; }
        }
      `}</style>
    </nav>
  )
}
