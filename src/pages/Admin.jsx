export default function Admin() {
  const users = [
    { name: 'Aliyu Bello', email: 'aliyu@email.com', type: 'Farmer', state: 'Kano', status: 'active' },
    { name: 'Chioma Okafor', email: 'chioma@email.com', type: 'Trader', state: 'Enugu', status: 'active' },
    { name: 'Musa Idris', email: 'musa@email.com', type: 'Extension Officer', state: 'Kaduna', status: 'pending' },
  ]
  return (
    <section className="page">
      <div className="container">
        <div className="page-header"><h2>Admin Dashboard</h2><p>Manage users, products, and platform data</p></div>
        <div className="grid-3 mb-4">
          <div className="stat-card"><div className="stat-num">12,400</div><div className="stat-label">Total Users</div></div>
          <div className="stat-card"><div className="stat-num">1,892</div><div className="stat-label">Active Farmers</div></div>
          <div className="stat-card"><div className="stat-num">4,561</div><div className="stat-label">Disease Checks</div></div>
        </div>
        <div className="card">
          <h4 className="mb-2">Recent Users</h4>
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Type</th><th>State</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i}>
                    <td>{u.name}</td><td>{u.email}</td><td>{u.type}</td><td>{u.state}</td>
                    <td><span style={{ color: u.status === 'active' ? '#16a34a' : '#f5a623' }}>{u.status}</span></td>
                    <td><button className="btn btn-danger btn-sm">{u.status === 'active' ? 'Suspend' : 'Approve'}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
