import { useState, useRef, useEffect } from 'react'

const initialMessages = [
  {
    id: 'init-01',
    role: 'assistant',
    text: "Hi! I'm [Name]'s AI. Ask me anything about his work, experience, or projects.",
  },
]

/**
 * Floating chat panel — UI shell only, no real AI.
 * Send button uses lime accent with dark text.
 */
const ChatbotModal = ({ onClose }) => {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', text: trimmed },
      {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: "Thanks for your message! AI integration coming soon. In the meantime, feel free to browse the portfolio.",
      },
    ])
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-card shadow-2xl border border-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span className="text-sm font-bold text-primary">Chat with AI Me</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="text-secondary hover:text-primary transition-colors p-1"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Message area */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 max-h-72">
        {messages.map(({ id, role, text }) => (
          <div key={id} className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-card text-sm leading-relaxed ${
                role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-surface text-primary border border-border'
              }`}
            >
              {text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-center gap-3 px-4 py-4 border-t border-border">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 text-sm bg-surface border border-border rounded-card px-4 py-2.5 text-primary placeholder:text-secondary outline-none focus:border-primary transition-colors"
        />
        <button
          onClick={handleSend}
          aria-label="Send message"
          className="shrink-0 w-9 h-9 flex items-center justify-center bg-accent hover:bg-accent-hover text-white rounded-card transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ChatbotModal
