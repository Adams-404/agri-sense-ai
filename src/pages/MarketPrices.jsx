import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { priceData } from '../data/prices'

export default function MarketPrices() {
  const { updateDash } = useApp()

  useEffect(() => {
    updateDash('priceChecks')
  }, [])

  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <h2>Market Prices</h2>
          <p>Real-time crop prices across major markets in Nigeria</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="price-table">
            <thead>
              <tr><th>Crop</th><th>Market</th><th>Price (₦)</th><th>Unit</th><th>Trend</th><th>Updated</th></tr>
            </thead>
            <tbody>
              {priceData.map((p, i) => (
                <tr key={i}>
                  <td><strong>{p.crop}</strong></td>
                  <td>{p.market}</td>
                  <td>₦{p.price.toLocaleString()}</td>
                  <td>{p.unit}</td>
                  <td className={p.trend === 'up' ? 'up' : p.trend === 'down' ? 'down' : ''}>
                    {p.trend === 'up' ? 'Up' : p.trend === 'down' ? 'Down' : 'Stable'}
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>Today</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
