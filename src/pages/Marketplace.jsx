import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { initialProducts } from '../data/products'

export default function Marketplace() {
  const { showToast, updateDash } = useApp()
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name:'', category:'Grains', price:'', unit:'kg', location:'', desc:'', phone:'' })

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filter !== 'all' && p.category !== filter) return false
    return true
  })

  const addProduct = (e) => {
    e.preventDefault()
    if (!form.name || !form.price || !form.location || !form.phone) {
      showToast('Please fill all required fields.', 'error')
      return
    }
    setProducts(prev => [{ ...form, price: parseFloat(form.price) }, ...prev])
    setShowForm(false)
    setForm({ name:'', category:'Grains', price:'', unit:'kg', location:'', desc:'', phone:'' })
    showToast('Product listed successfully!', 'success')
    updateDash('products')
  }

  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <h2>Marketplace</h2>
          <p>Buy fresh produce directly from Nigerian farmers</p>
        </div>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:20, justifyContent:'center' }}>
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding:'10px 16px', borderRadius:8, border:'1px solid var(--border)', background:'var(--bg)',
              fontFamily:'var(--font)', fontSize:14, minWidth:200, color:'var(--text)' }} />
          <select value={filter} onChange={e => setFilter(e.target.value)}
            style={{ padding:'10px 16px', borderRadius:8, border:'1px solid var(--border)', background:'var(--bg)',
              fontFamily:'var(--font)', fontSize:14, color:'var(--text)' }}>
            <option value="all">All Categories</option>
            <option value="Grains">Grains</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Tubers">Tubers</option>
            <option value="Livestock">Livestock</option>
          </select>
          <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>+ Sell Your Produce</button>
        </div>

        <div className="marketplace-grid">
          {filtered.length === 0 ? (
            <div className="text-center" style={{ gridColumn:'1/-1', padding:40, color:'var(--text-muted)' }}>
              No products found.
            </div>
          ) : filtered.map((p, i) => (
            <div key={i} className="product-card">
              <div className="img">{p.category}</div>
              <div className="body">
                <h4>{p.name}</h4>
                <div className="price">₦{p.price.toLocaleString()} / {p.unit}</div>
                <div className="meta">
                  <span>{p.location}</span>
                  <span>{p.category}</span>
                </div>
                <p style={{ fontSize:13, color:'var(--text-muted)', marginTop:6 }}>{p.desc}</p>
                <button className="btn btn-primary btn-sm mt-2" onClick={() => showToast(`Contact seller at ${p.phone}`, 'info')}>
                  Contact Seller
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="card">
              <h4 className="mb-3">List Your Produce</h4>
              <form onSubmit={addProduct}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input placeholder="e.g. Fresh Tomatoes" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                      <option>Grains</option><option>Vegetables</option><option>Fruits</option><option>Tubers</option><option>Livestock</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Price (₦)</label>
                    <input type="number" placeholder="5000" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <select value={form.unit} onChange={e => setForm({...form, unit: e.target.value})}>
                    <option>kg</option><option>bag</option><option>crate</option><option>piece</option><option>bunch</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input placeholder="Kano State" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea rows="2" placeholder="Fresh organic tomatoes..." value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input placeholder="+234..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <button className="btn btn-primary" type="submit">List Product</button>
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
