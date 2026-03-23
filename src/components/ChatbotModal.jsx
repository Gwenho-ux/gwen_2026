import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

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
    <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-black rounded-card shadow-2xl border-2 border-white flex flex-col overflow-visible">
      {/* Floating avatar — overlaps top-right corner */}
      <motion.img
        src="/chatbot-avatar.png"
        alt="Gwen AI"
        className="absolute -top-12 -right-4 w-24 h-24 object-contain pointer-events-none select-none z-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
        draggable={false}
      />

      {/* Header */}
      <div className="flex items-center px-5 py-4 border-b border-white/20 rounded-t-card overflow-hidden">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" aria-hidden="true" />
        <span className="ml-2.5 text-sm font-bold text-white">Chat with AI Me</span>
      </div>

      {/* Message area */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 max-h-72 overflow-x-hidden">
        {messages.map(({ id, role, text }) => (
          <div key={id} className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-card text-sm leading-relaxed ${
                role === 'user'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white/90 border border-white/10'
              }`}
            >
              {text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex items-center gap-3 px-4 py-4 border-t border-white/20 rounded-b-card overflow-hidden">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 text-sm bg-white/10 border border-white/10 rounded-card px-4 py-2.5 text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors"
        />
        <button
          onClick={handleSend}
          aria-label="Send message"
          className="shrink-0 w-9 h-9 flex items-center justify-center bg-white hover:bg-white/80 text-black rounded-card transition-colors"
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
