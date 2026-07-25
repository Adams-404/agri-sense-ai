import { useState, useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { responses } from '../data/chatResponses'

export default function ChatAssistant() {
  const { currentLang, setCurrentLang, langLabels, showToast, updateDash } = useApp()
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I'm your farming assistant. Ask me anything about crops, soil, pests, or farming techniques." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    const msg = input.trim()
    if (!msg) return
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const langResponses = responses[currentLang] || responses.en
      const reply = langResponses[Math.floor(Math.random() * langResponses.length)]
      setMessages(prev => [...prev, { role: 'assistant', text: reply, lang: langLabels[currentLang] || 'English' }])
      setLoading(false)
      updateDash('chats')
    }, 1500 + Math.random() * 1500)
  }

  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <h2>AI Farming Assistant</h2>
          <p>Ask any farming question - get answers in your preferred language</p>
        </div>
        <div className="lang-selector">
          {Object.entries(langLabels).map(([code, name]) => (
            <button key={code} className={currentLang === code ? 'active' : ''} onClick={() => setCurrentLang(code)}>
              {name}
            </button>
          ))}
        </div>
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.role}`}>
                <div className="msg-label">
                  {m.role === 'user' ? 'You' : `AI Assistant${m.lang ? ` (${m.lang})` : ''}`}
                </div>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-message assistant">
                <div className="msg-label">AI Assistant</div>
                <div className="loader" style={{ margin: 0 }} />
              </div>
            )}
            <div ref={endRef} />
          </div>
          <div className="chat-input-area">
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              placeholder="Type your farming question..."
              onKeyDown={e => e.key === 'Enter' && send()} />
            <button onClick={send}>{'>'}</button>
          </div>
        </div>
      </div>
    </section>
  )
}
