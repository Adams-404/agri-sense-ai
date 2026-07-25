import { useApp } from '../context/AppContext'

export default function Dashboard() {
  const { dashCounts } = useApp()

  const activities = []
  if (dashCounts.diseases > 0) activities.push(`${dashCounts.diseases} disease ${dashCounts.diseases === 1 ? 'detection' : 'detections'}`)
  if (dashCounts.chats > 0) activities.push(`${dashCounts.chats} AI chat ${dashCounts.chats === 1 ? 'session' : 'sessions'}`)
  if (dashCounts.products > 0) activities.push(`${dashCounts.products} product${dashCounts.products > 1 ? 's' : ''} listed`)

  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <h2>Your Dashboard</h2>
          <p>Track your farming activities and insights</p>
        </div>
        <div className="grid-4">
          {[
            { num: dashCounts.diseases, label: 'Diseases Detected' },
            { num: dashCounts.chats, label: 'AI Chat Sessions' },
            { num: dashCounts.products, label: 'Products Listed' },
            { num: dashCounts.priceChecks, label: 'Price Checks' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="card mt-3">
          <h4 className="mb-2">Recent Activity</h4>
          {activities.length === 0 ? (
            <p style={{ color:'var(--text-muted)', fontSize:14 }}>No activity yet. Start using AgriSense AI!</p>
          ) : activities.map((a, i) => (
            <div key={i} style={{ padding:'8px 0', borderBottom:'1px solid var(--border)', fontSize:14 }}>{a}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
