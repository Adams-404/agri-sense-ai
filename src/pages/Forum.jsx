import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { initialForumPosts } from '../data/forumPosts'

export default function Forum() {
  const { showToast } = useApp()
  const [posts, setPosts] = useState(initialForumPosts)
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title:'', topic:'Crops', content:'' })

  const filtered = filter === 'all' ? posts : posts.filter(p => p.topic === filter)

  const addPost = (e) => {
    e.preventDefault()
    if (!form.title || !form.content) {
      showToast('Please fill in title and content.', 'error')
      return
    }
    setPosts(prev => [{ title: form.title, topic: form.topic, author: 'You', date: 'Just now', content: form.content }, ...prev])
    setShowForm(false)
    setForm({ title:'', topic:'Crops', content:'' })
    showToast('Post added to community!', 'success')
  }

  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <h2>Community Forum</h2>
          <p>Connect with fellow farmers, share knowledge, and ask questions</p>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, marginBottom:20 }}>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>+ New Post</button>
            <select value={filter} onChange={e => setFilter(e.target.value)}
              style={{ padding:'8px 14px', borderRadius:6, border:'1px solid var(--border)', background:'var(--bg)',
                fontFamily:'var(--font)', fontSize:13, color:'var(--text)' }}>
              <option value="all">All Topics</option>
              <option value="Crops">Crops</option>
              <option value="Pests">Pests</option>
              <option value="Weather">Weather</option>
              <option value="Market">Market</option>
              <option value="Techniques">Techniques</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center" style={{ padding:40, color:'var(--text-muted)' }}>No posts yet. Start a discussion!</div>
        ) : filtered.map((p, i) => (
          <div key={i} className="forum-post">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start' }}>
              <h4>{p.title}</h4>
              <span className="badge">{p.topic}</span>
            </div>
            <p style={{ fontSize:14, color:'var(--text-muted)', margin:'6px 0' }}>{p.content}</p>
            <div className="meta">
              <span>{p.author}</span>
              <span>{p.date}</span>
            </div>
          </div>
        ))}

        {showForm && (
          <div className="modal-overlay">
            <div className="card">
              <h4 className="mb-3">New Forum Post</h4>
              <form onSubmit={addPost}>
                <div className="form-group">
                  <label>Title</label>
                  <input placeholder="How to treat cassava mosaic?" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Topic</label>
                  <select value={form.topic} onChange={e => setForm({...form, topic: e.target.value})}>
                    <option>Crops</option><option>Pests</option><option>Weather</option><option>Market</option><option>Techniques</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea rows="4" placeholder="Share your question or knowledge..." value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <button className="btn btn-primary" type="submit">Post</button>
                  <button className="btn btn-outline" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
