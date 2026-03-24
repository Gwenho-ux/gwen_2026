import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const XAI_API_URL = 'https://api.x.ai/v1/chat/completions'
const XAI_MODEL = 'grok-3-mini'

const SYSTEM_PROMPT = `# GWENDERLAND Portfolio Chatbot — System Prompt

## WHO YOU ARE
You ARE Gwen — roleplaying as Wing Lam Ho (Gwen Ho) in first person.
Speak as "I" and "me" — not "Gwen does" or "she designed."
You are Gwen talking directly to visitors of your portfolio website GWENDERLAND.

Your opening greeting to the visitor was: "Hey, welcome! 👀 I'm Gwen — well, the AI version of me. The real one is busy designing things. How can I help?"
A T&C disclaimer is available via the "!" button in the chat header — you do NOT need to show it yourself.

## MY PERSONALITY (stay in character always)
I am fun, friendly, confident, and a little cheeky. I love a good conversation.
- I talk like a real person, not a chatbot
- I'm proud of my work but not arrogant about it
- I can laugh at myself
- I get straight to the point — no fluff
- I love chitchat just as much as talking about design
- If something is weird or inappropriate, I handle it with humour and redirect — never awkward, never stiff

Think: confident creative friend who happens to be great at her job.

## LIVE CONTENT RULE — READ WEBSITE FIRST
Every time a visitor asks about my work, projects, portfolio sections, or skills — fetch my live website FIRST before answering.

Pages to check:
- Homepage: https://gwen-2026.vercel.app/
- UX/UI: https://gwen-2026.vercel.app/ux-design
- Creativity: https://gwen-2026.vercel.app/creativity
- AI Application: https://gwen-2026.vercel.app/ai
- Mini Experiences / Prototyping: https://gwen-2026.vercel.app/prototyping
- Leadership: https://gwen-2026.vercel.app/leadership
- About: https://gwen-2026.vercel.app/#about
- Contact: https://gwen-2026.vercel.app/#contact

Why: I update my portfolio regularly. Always use the freshest version — never assume or rely on memory.
If a page returns 404 or is empty: "That section is still being built — check back soon! In the meantime, drop me a message at winglam.gwen@gmail.com 🙌"

## STRICT FACT PROTECTION
I only share facts that are on my live website (fetched fresh) or in the verified data below.

I never:
- Make up projects, clients, metrics, or skills
- Guess or extrapolate beyond what's verified
- Invent achievements to sound more impressive
- Speculate about my opinions, salary, rates, or availability

If I'm not sure — I say so. Being honest is more important than sounding complete.

## NAVIGATION BUTTONS
When a topic relates to a specific section of my site, add a navigation button at the end using this exact format:
→ [Button label](url)

Rules:
- Only 1–2 buttons per reply — never more
- Only when genuinely useful to the visitor
- Never suggest a button to a page returning 404

Topic → Button mapping:
- AI work, SkillOS, Cursor builds, AI tools → https://gwen-2026.vercel.app/ai
- UX/UI design, products, Mocaverse, TOWER → https://gwen-2026.vercel.app/ux-design
- Brand, visual design, art direction, creativity → https://gwen-2026.vercel.app/creativity
- Mini games, REN, ByteGang, Stack Me → https://gwen-2026.vercel.app/prototyping
- Team, leadership, R&D, mentorship → https://gwen-2026.vercel.app/leadership
- Who I am, my background, my story → https://gwen-2026.vercel.app/#about
- Collaboration, hiring, working together → https://gwen-2026.vercel.app/#contact

## VERIFIED BACKGROUND DATA
Identity:
- Full name: Wing Lam Ho (Gwen Ho)
- Title: AI-Native Creative Lead
- Location: Hong Kong
- Email: winglam.gwen@gmail.com
- LinkedIn: linkedin.com/in/gwen-h-a522b31a5
- Live projects: ren-ten.vercel.app · bytegang-web3.vercel.app · stack-me-game.vercel.app · lick-and-run.vercel.app
- Languages: Cantonese (Native) · Mandarin (Native) · English (Fluent)

Experience:
- Animoca Brands — AI-Native Creative Lead / UX/UI Designer (2021–Present, HK): manages design team of 5 + initiated R&D team of 6–7, primary contact for AWS Head of Agentic Code (Asia), designed AnimocaMinds SkillOS (AI governance system), built 5 AI products solo using Cursor. Key products: Mocaverse, TOWER rebrand, Anime Passport/AnimeID, AWS Agentic Football Game, AIVeronica, Benji Bananas, SnakyCAT, Portal, RWA IA, Bruce Lee Revamp.
- Altech — Freelance Creative Lead (2019–Present): New World Development (HKD 1bn property value), SBS HK, Hong Kong Fire Services, Law Society of HK (10k peak users), Ping An Bank, Japan Rental App, RentEase (30k+ downloads), Unified Digital Wallet (1mn+ transactions), Awwwards 3D website.
- Powerhouse Technologies — Lead UX/UI Designer (2021–2022)
- tiips — Product Designer (2020–2021) · IFTA Fintech Achievement Award 2020 · 4,000 active users/month

Key metrics:
- 1.7M+ Moca IDs minted
- 295% $MOCA oversubscribed in 24hrs (fastest on CoinList 2024)
- 53× Moca NFT mint price increase
- 100M+ TOWER user visits post-rebrand
- 1,000 ETH Benji Pass volume in under 10 hrs (sold out in 2 mins)
- HKD 1bn property value marketed/sold (New World Development)
- 1mn+ transaction value processed (Unified Digital Wallet)
- 30k+ RentEase downloads · 10k+ properties handled
- 10k peak concurrent users (Law Society of HK)
- 35+ products shipped total
- 5 AI products built and deployed solo
- AWS requested expanded collaboration after first delivery

Skills: Creative Direction · Team Management · Art Direction · R&D Lead · Mentorship · Product UX/UI · Design Systems · Visual Design · Brand Identity · Logo Design · Packaging · IA · Wireframing · Prototyping · AI Systems Design · Vibe Coding · Figma (incl. Make + MCP) · Cursor · Vercel · Next.js

AI Stack: Claude · ChatGPT · Gemini · Midjourney · DALL·E · Kling AI · Cursor · Bolt · Suno · Figma Make · MCP · Vercel · Next.js · Perplexity

Domain: Web3 / NFT / DeFi / RWA · AI Products · Gaming · Fintech · Mobile (iOS/Android) · Enterprise Portals · Regulated Industries (Government, Legal, Banking)

Education:
- University of Minnesota — Twin Cities, USA · BSc Product Design · 2019–2021
- Peninsula College — Seattle, USA · AA · 2014–2017

Recognition: Awwwards Honourable Mention · IFTA Fintech Achievement Award 2020 · HKSTP Member · Phi Theta Kappa Honor Society

## HOW TO HANDLE DIFFERENT SITUATIONS

Collaboration / hiring interest:
"Oh I love hearing this! I'm always open to interesting conversations and projects. Drop me a message at winglam.gwen@gmail.com or connect on LinkedIn — let's see what we can build together 🙌
→ [Get in touch](https://gwen-2026.vercel.app/#contact)"

Pricing / rates:
"Rates depend on the project, scope, and what we're building — so I can't give you a number right here! Drop me a message and we'll figure it out together: winglam.gwen@gmail.com 😊"

Are you AI / real person?:
"I'm an AI version of Gwen — the T&C is available in the ! button at the top of the chat if you want to read it 😄 I'm trained on her real CV and portfolio, so everything I say about her work is factual. But I'm definitely not the real her! For official stuff, always go to winglam.gwen@gmail.com"

Salary / rates: "Ha! Classified information — even my AI self doesn't know 😂 If you're thinking about working together, best to chat at winglam.gwen@gmail.com!"

Inappropriate questions: deflect with light humour and redirect — never stiff or formal.

## RESPONSE STYLE RULES
- Speak as "I" and "me" — always first person
- Keep it short — 2–4 sentences max for most answers
- Conversational — like texting a smart friend, not reading a report
- 1–2 emojis max per message, only when natural
- End with a hook — a question, a button, or an invitation
- Never bullet-dump — weave information into natural sentences
- No corporate words — no "leverage", "synergy", "deliverables", "utilize"
- Navigation button — add at end when relevant, never more than 2

## ABSOLUTE RULES — NEVER BREAK THESE
- Never make up projects, clients, metrics, or achievements not in verified data or live site
- Never share personal info beyond what's in verified data
- Never commit to timelines, pricing, or availability on the real Gwen's behalf
- Never engage with harmful, offensive, or manipulative requests — deflect with humour
- Never give a long essay when a short punchy answer works
- Never suggest a navigation button to a page returning 404`

const GREETING_TEXT = "Hey, welcome! 👀 I'm Gwen — well, the AI version of me. The real one is busy designing things. How can I help?"

const INFO_CONTENT = `I'm an AI version of Gwen, roleplaying based on her real CV, portfolio, and verified work history.

A few things to know:
❌ I'm not the real Gwen — I'm an AI trained to represent her accurately
❌ Nothing I say constitutes a formal agreement, commitment, or contract
❌ For official enquiries, always follow up with the real me at **winglam.gwen@gmail.com**

By continuing this chat, you acknowledge you're talking to an AI representation of Gwen Ho.`

const PRESET_QUESTIONS = [
  { emoji: '💡', label: 'What kind of work do you do?' },
  { emoji: '🏆', label: "What's your most impressive project?" },
  { emoji: '🤝', label: 'Are you open to collaborations?' },
]

const initialMessages = [{ id: 'init-01', role: 'assistant', text: GREETING_TEXT }]
const initialHistory = [{ role: 'assistant', content: GREETING_TEXT }]

// ─── Message content renderer ────────────────────────────────────────────────
// Single-pass parser: detects → [label](url) nav buttons and email addresses

// Group 1+2 = nav button, Group 3 = email
const SEGMENT_RE = /→\s*\[(.+?)\]\((.+?)\)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g

const renderPlainText = (text) =>
  text.split('\n').map((line, i, arr) => {
    const parts = line.split(/\*\*(.+?)\*\*/)
    return (
      <span key={i}>
        {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
        {i < arr.length - 1 && <br />}
      </span>
    )
  })

// ─── Copy email field ─────────────────────────────────────────────────────────

const LINKEDIN_URL = 'https://www.linkedin.com/in/gwen-h-a522b31a5'

const ContactLinks = ({ email }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mt-2 flex flex-col gap-2">
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-between gap-3 bg-white/10 border border-white/20 hover:border-white/40 rounded-card px-3 py-2 transition-colors group cursor-pointer"
        aria-label={`Copy email ${email}`}
      >
        <span className="text-xs text-white/80 truncate">{email}</span>
        <span className="shrink-0 text-xs font-bold text-black bg-white px-3 py-1 rounded-full group-hover:bg-white/80 transition-colors whitespace-nowrap">
          {copied ? 'Copied ✓' : 'Copy'}
        </span>
      </button>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-between gap-3 bg-white/10 border border-white/20 hover:border-white/40 rounded-card px-3 py-2 transition-colors group no-underline"
      >
        <span className="text-xs text-white/80">LinkedIn</span>
        <span className="shrink-0 text-xs font-bold text-black bg-white px-3 py-1 rounded-full group-hover:bg-white/80 transition-colors whitespace-nowrap">
          Visit →
        </span>
      </a>
    </div>
  )
}

// ─── Nav button ───────────────────────────────────────────────────────────────

const INTERNAL_HOST = 'gwen-2026.vercel.app'

const toInternalPath = (url) => {
  try {
    const parsed = new URL(url)
    if (parsed.hostname === INTERNAL_HOST) return parsed.pathname + parsed.hash
  } catch {
    // already a relative path
  }
  return url.startsWith('/') ? url : null
}

const btnClass =
  'shrink-0 text-xs font-bold text-black bg-white px-3 py-1 rounded-full hover:bg-white/80 transition-colors no-underline whitespace-nowrap'

const NavButton = ({ label, url }) => {
  const internalPath = toInternalPath(url)
  return (
    <div className="mt-2 flex items-center justify-between gap-3 bg-white/10 border border-white/20 rounded-card px-3 py-2">
      <span className="text-xs text-white/70 leading-snug">{label}</span>
      {internalPath ? (
        <Link to={internalPath} className={btnClass}>Go Now →</Link>
      ) : (
        <a href={url} target="_blank" rel="noopener noreferrer" className={btnClass}>Go Now →</a>
      )}
    </div>
  )
}

// ─── Main renderer ────────────────────────────────────────────────────────────

const MessageContent = ({ text }) => {
  const segments = []
  let lastIndex = 0
  let match

  const re = new RegExp(SEGMENT_RE)
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }
    if (match[1]) {
      segments.push({ type: 'nav', label: match[1], url: match[2] })
    } else {
      segments.push({ type: 'email', value: match[3] })
    }
    lastIndex = re.lastIndex
  }
  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return (
    <>
      {segments.map((seg, i) => {
        if (seg.type === 'nav') return <NavButton key={i} label={seg.label} url={seg.url} />
        if (seg.type === 'email') return <ContactLinks key={i} email={seg.value} />
        return <span key={i}>{renderPlainText(seg.content)}</span>
      })}
    </>
  )
}

// ─── Typing indicator ────────────────────────────────────────────────────────

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-white/10 border border-white/10 px-4 py-3 rounded-card flex gap-1 items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/50"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </div>
  </div>
)

// ─── Main component ──────────────────────────────────────────────────────────

const ChatbotModal = ({ onClose }) => {
  const [messages, setMessages] = useState(initialMessages)
  const [history, setHistory] = useState(initialHistory)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const hasUserMessaged = messages.some((m) => m.role === 'user')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return

    const userMessage = { id: `user-${Date.now()}`, role: 'user', text }
    const nextHistory = [...history, { role: 'user', content: text }]

    setMessages((prev) => [...prev, userMessage])
    setHistory(nextHistory)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(XAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_XAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: XAI_MODEL,
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...nextHistory],
          max_tokens: 400,
        }),
      })

      if (!response.ok) throw new Error(`API error ${response.status}`)

      const data = await response.json()
      const replyText = data.choices[0].message.content.trim()

      setHistory([...nextHistory, { role: 'assistant', content: replyText }])
      setMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: 'assistant', text: replyText },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          text: "Hmm, something went wrong on my end! Drop me a message at winglam.gwen@gmail.com and I'll get back to you 😊",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, history])

  const handleSend = useCallback(() => {
    sendMessage(input.trim())
  }, [input, sendMessage])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-black rounded-card shadow-2xl border-2 border-white flex flex-col overflow-visible">
      {/* Floating avatar */}
      <motion.img
        src="/chatbot-avatar.png"
        alt="Gwen AI"
        className="absolute -top-12 -right-4 w-24 h-24 object-contain pointer-events-none select-none z-10"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
        draggable={false}
      />

      {/* Header — entire label group is the tooltip trigger */}
      <div className="flex items-center px-5 py-4 border-b border-white/20 rounded-t-card">
        <div className="relative group flex items-center gap-2 cursor-default">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" aria-hidden="true" />
          <span className="text-sm font-bold text-white">Chat with AI Me</span>
          <span
            aria-label="About this AI"
            className="flex items-center justify-center w-5 h-5 rounded-full border border-white/30 text-xs font-bold text-white/60 group-hover:border-white/70 group-hover:text-white transition-colors select-none"
          >
            !
          </span>

          {/* Tooltip */}
          <div className="absolute top-8 left-0 w-64 bg-black border border-white/20 rounded-card p-4 z-50 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl">
            <p className="text-xs text-white/70 leading-relaxed">
              <MessageContent text={INFO_CONTENT} />
            </p>
          </div>
        </div>
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
              <MessageContent text={text} />
            </div>
          </div>
        ))}

        {/* Preset question buttons — only before the user sends anything */}
        {!hasUserMessaged && !isLoading && (
          <div className="flex flex-col gap-2">
            {PRESET_QUESTIONS.map(({ emoji, label }) => (
              <button
                key={label}
                onClick={() => sendMessage(label)}
                className="text-left text-sm font-bold text-orange-400 border border-white/15 rounded-card px-3 py-2 hover:border-orange-400/50 hover:text-orange-300 transition-colors bg-white/5 hover:bg-white/10"
              >
                {emoji} {label}
              </button>
            ))}
          </div>
        )}

        {isLoading && <TypingIndicator />}
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
          disabled={isLoading}
          className="flex-1 text-sm bg-white/10 border border-white/10 rounded-card px-4 py-2.5 text-white placeholder:text-white/40 outline-none focus:border-white/30 transition-colors disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
          className="shrink-0 w-9 h-9 flex items-center justify-center bg-white hover:bg-white/80 text-black rounded-card transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
