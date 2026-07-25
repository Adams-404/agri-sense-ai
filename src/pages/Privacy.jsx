export default function Privacy() {
  return (
    <section className="page">
      <div className="container" style={{ maxWidth: 700 }}>
        <div className="page-header"><h2>Privacy Policy</h2></div>
        <div className="card">
          <p style={{ lineHeight: 1.8, color: 'var(--text-muted)' }}>
            At AgriSense AI, we take your privacy seriously. We collect minimal data needed to provide our services - 
            primarily your name, email, location, and crop images you upload for disease detection.
            We never share your data with third parties without your explicit consent.
            Your crop images are used only for analysis and are not stored permanently unless you opt in.
          </p>
        </div>
      </div>
    </section>
  )
}
