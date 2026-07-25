import { useApp } from '../context/AppContext'

export default function Contact() {
  const { showToast } = useApp()
  const handleSubmit = (e) => {
    e.preventDefault()
    showToast('Message sent! We will get back to you.', 'success')
  }
  return (
    <section className="page">
      <div className="container" style={{ maxWidth: 600 }}>
        <div className="page-header"><h2>Contact Us</h2><p>We would love to hear from you</p></div>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label>Name</label><input type="text" required /></div>
              <div className="form-group"><label>Email</label><input type="email" required /></div>
            </div>
            <div className="form-group"><label>Subject</label><input type="text" required /></div>
            <div className="form-group"><label>Message</label><textarea rows="4" required></textarea></div>
            <button className="btn btn-primary" type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  )
}
