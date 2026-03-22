import { useState } from 'react'
import ChatbotModal from './ChatbotModal'

/**
 * Fixed bottom-right floating chatbot bubble.
 * Lime green, pulsing. Dark icon since accent bg is light.
 */
const FloatingChatbot = () => {
  return null
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen && <ChatbotModal onClose={() => setIsOpen(false)} />}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat with AI Me'}
        className="relative w-14 h-14 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center shadow-lg transition-colors duration-200 mt-3"
      >
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40"
            aria-hidden="true"
          />
        )}

        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M2 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 4V4z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  )
}

export default FloatingChatbot
