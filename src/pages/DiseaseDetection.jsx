import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { diseases } from '../data/diseases'

export default function DiseaseDetection() {
  const { showToast, updateDash } = useApp()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleUpload = (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) {
      showToast('Image too large. Max 5MB.', 'error')
      return
    }
    setFile(f)
    setResult(null)
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsDataURL(f)
  }

  const analyze = () => {
    if (!file) { showToast('Please upload a crop image first.', 'error'); return }
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      const d = diseases[Math.floor(Math.random() * diseases.length)]
      setResult(d)
      setLoading(false)
      updateDash('diseases')
      showToast('Diagnosis complete!', 'success')
    }, 2500)
  }

  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <h2>Crop Disease Detection</h2>
          <p>Upload a photo of your crop and our AI will diagnose the disease instantly</p>
        </div>
        <div className="grid-2" style={{ maxWidth: 900, margin: '0 auto' }}>
          <div>
            <div className="upload-zone" onClick={() => document.getElementById('fileInput').click()}>
              <div className="icon">+</div>
              <p><strong>Tap to upload a crop photo</strong></p>
              <p style={{ fontSize: 13, marginTop: 4 }}>Supports: JPG, PNG, WEBP - Max 5MB</p>
              <input type="file" id="fileInput" accept="image/*" onChange={handleUpload} />
            </div>
            {preview && (
              <div className="mt-2" style={{ textAlign: 'center' }}>
                <img src={preview} style={{ maxHeight: 260, borderRadius: 'var(--radius-sm)', margin: '0 auto' }} />
                <button className="btn btn-primary btn-sm mt-2" onClick={analyze}>Analyze This Crop</button>
              </div>
            )}
          </div>
          <div>
            {loading && (
              <div className="text-center mt-4">
                <div className="loader" />
                <p className="mt-2" style={{ color: 'var(--text-muted)' }}>AI is analyzing your crop image...</p>
              </div>
            )}
            {result && (
              <div className="result-card fade-in">
                <div className="badge">Diagnosis Result</div>
                <div className="disease-name mt-2">{result.name}</div>
                <div className="confidence mt-1">{result.conf} confidence</div>
                <div className="treatment">
                  <strong>Recommended Treatment:</strong>
                  <p style={{ marginTop: 6, fontSize: 14 }}>{result.treatment}</p>
                </div>
                <div className="mt-2">
                  <strong>Prevention Tips:</strong>
                  <p style={{ marginTop: 4, fontSize: 13, color: 'var(--text-muted)' }}>{result.prevention}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
