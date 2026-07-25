import { useState } from 'react'
import { weatherData, dayNames } from '../data/weather'

export default function Weather() {
  const [region, setRegion] = useState('Kano')
  const data = weatherData[region] || weatherData['Kano']

  const today = new Date()
  const forecast = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    return {
      day: dayNames[d.getDay()],
      temp: data.temp + Math.floor(Math.random() * 6) - 3
    }
  })

  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <h2>Weather Forecast</h2>
          <p>7-day weather forecast for your farming region</p>
        </div>
        <div style={{ display:'flex', gap:8, marginBottom:20, justifyContent:'center', flexWrap:'wrap' }}>
          <select value={region} onChange={e => setRegion(e.target.value)}
            style={{ padding:'10px 16px', borderRadius:8, border:'1px solid var(--border)', background:'var(--bg)',
              fontFamily:'var(--font)', fontSize:14, color:'var(--text)' }}>
            {Object.keys(weatherData).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="weather-main">
          <div>
            <div className="weather-current">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start' }}>
                <div>
                  <div style={{ fontSize:'1.1rem', fontWeight:600 }}>{region}</div>
                  <div className="temp">{data.temp}°C</div>
                  <div className="condition">{data.condition}</div>
                </div>
              </div>
              <div className="details">
                <div><div className="val">{data.humidity}%</div><div className="lbl">Humidity</div></div>
                <div><div className="val">{data.wind} km/h</div><div className="lbl">Wind</div></div>
                <div><div className="val">{data.rain}%</div><div className="lbl">Rain</div></div>
                <div><div className="val">{data.uv}</div><div className="lbl">UV Index</div></div>
              </div>
            </div>
          </div>
          <div className="card">
            <h4 style={{ marginBottom:12 }}>Farming Advice</h4>
            <p style={{ fontSize:14, color:'var(--text-muted)' }}>{data.advice}</p>
            <div className="mt-2" style={{ padding:12, background:'rgba(245,166,35,0.08)', borderRadius:'var(--radius-sm)' }}>
              <strong style={{ fontSize:13 }}>Suggested Crops to Plant Now:</strong>
              <p style={{ fontSize:13, marginTop:4, color:'var(--text-muted)' }}>{data.crops}</p>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h4 className="mb-2">7-Day Forecast</h4>
          <div className="weather-week">
            {forecast.map((d, i) => (
              <div key={i} className="weather-day">
                <div className="day-name">{d.day}</div>
                <div className="day-temp">{d.temp}°</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
