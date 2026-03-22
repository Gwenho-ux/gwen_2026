import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SONG = { src: '/midnight-lanterns.mp3', title: 'Midnight Lanterns' }

// ── Singleton audio — created once, survives all page navigations ──────────
let _audio = null
// Tracks whether the user explicitly paused — prevents autoplay resuming on navigation
let _userPaused = false

const getAudio = () => {
  if (!_audio && typeof window !== 'undefined') {
    _audio = new Audio(SONG.src)
    _audio.loop   = true
    _audio.volume = 0.45
  }
  return _audio
}

/**
 * Minimal ambient music player — lives in the TopNav.
 * Uses a module-level Audio singleton so playback is uninterrupted
 * when React Router navigates between pages.
 */
const MusicPlayer = () => {
  const [playing, setPlaying] = useState(() => {
    const a = getAudio()
    return a ? !a.paused : false
  })
  const [visible, setVisible] = useState(false)

  // Attempt autoplay on first mount — skipped if user has manually paused
  useEffect(() => {
    const audio = getAudio()
    if (!audio || !audio.paused || _userPaused) return

    const tryPlay = async () => {
      try {
        await audio.play()
        setPlaying(true)
        setVisible(true)
        setTimeout(() => setVisible(false), 3000)
      } catch {
        setPlaying(false)
      }
    }
    tryPlay()
  }, [])

  const toggle = async () => {
    const audio = getAudio()
    if (!audio) return
    if (playing) {
      audio.pause()
      _userPaused = true
      setPlaying(false)
    } else {
      await audio.play()
      _userPaused = false
      setPlaying(true)
      setVisible(true)
      setTimeout(() => setVisible(false), 2500)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Song title — briefly fades in on play */}
      <AnimatePresence>
        {visible && (
          <motion.span
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.35 }}
            className="hidden sm:block text-[11px] font-medium tracking-wide text-secondary whitespace-nowrap"
          >
            ♪ {SONG.title}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Play / Pause button — large tap target */}
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="flex items-center justify-center w-10 h-10 rounded-full text-secondary hover:text-primary transition-colors"
        title={SONG.title}
      >
        {playing ? (
          <span className="flex items-end gap-[3px] h-5">
            {[1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[4px] rounded-full bg-accent inline-block"
                animate={{ height: ['7px', '18px', '5px', '15px', '7px'] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              />
            ))}
          </span>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 18V6l12-2v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default MusicPlayer
