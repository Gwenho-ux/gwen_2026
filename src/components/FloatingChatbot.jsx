import { useState } from 'react'
import ChatbotModal from './ChatbotModal'

const ROTATING_TEXT = 'Gwen · Gwen · Gwen · Gwen · Gwen · Gwen · Gwen · Gwen · '

const RotatingRing = () => (
  <svg
    viewBox="0 0 100 100"
    className="absolute inset-0 w-full h-full animate-spin"
    style={{ animationDuration: '8s' }}
    aria-hidden="true"
  >
    <defs>
      <path
        id="circle-path"
        d="M 50,50 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
      />
    </defs>
    <text
      fill="white"
      style={{ fontSize: '7.5px', letterSpacing: '1.5px', fontWeight: 600 }}
    >
      <textPath href="#circle-path">{ROTATING_TEXT}</textPath>
    </text>
  </svg>
)

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen && <ChatbotModal onClose={() => setIsOpen(false)} />}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Chat with Gwen AI'}
        className={`relative rounded-full bg-black border-2 border-white shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 mt-3 ${isOpen ? 'w-12 h-12' : 'w-28 h-28 md:w-40 md:h-40'}`}
      >
        {/* Rotating text ring */}
        {!isOpen && <RotatingRing />}

        {/* Avatar / close icon */}
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="text-white">
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <img
            src="/chatbot-avatar.png"
            alt="Gwen AI"
            className="w-20 h-20 md:w-28 md:h-28 object-contain rounded-full"
            draggable={false}
          />
        )}
      </button>
    </div>
  )
}

export default FloatingChatbot
