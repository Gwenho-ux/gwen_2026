import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SONG = { src: '/midnight-lanterns.mp3', title: 'Midnight Lanterns' }
const EVENTS = ['click', 'keydown', 'touchstart', 'scroll']

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

  // Attempt autoplay — if blocked by browser policy, wait for first user interaction
  useEffect(() => {
    const audio = getAudio()
    if (!audio || _userPaused) return

    const tryPlay = async () => {
      if (_userPaused || !audio.paused) return
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // Autoplay blocked — attach one-time interaction listener
        const onInteraction = async () => {
          if (_userPaused || !audio.paused) return
          try {
            await audio.play()
            setPlaying(true)
          } catch { /* still blocked — user can press play manually */ }
          EVENTS.forEach(e => document.removeEventListener(e, onInteraction))
        }
        EVENTS.forEach(e => document.addEventListener(e, onInteraction, { once: true }))
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
    }
  }

  return (
    <motion.button
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface hover:bg-border/40 transition-colors cursor-pointer"
    >
      {/* Waveform bars (playing) or static music note (paused) */}
      <span className="flex items-end gap-[3px] h-4 w-5 shrink-0">
        {playing ? (
          [1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-accent inline-block"
              animate={{ height: ['5px', '14px', '4px', '12px', '5px'] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          ))
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-secondary">
            <path d="M9 18V6l12-2v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        )}
      </span>

      {/* Song name */}
      <span className="hidden sm:block text-[11px] font-medium tracking-wide text-secondary whitespace-nowrap">
        {SONG.title}
      </span>

      {/* Play / Pause icon */}
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-bg shrink-0">
        {playing ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <rect x="1.5" y="1" width="2.5" height="8" rx="1" />
            <rect x="6" y="1" width="2.5" height="8" rx="1" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <path d="M2 1.5l7 3.5-7 3.5V1.5z" />
          </svg>
        )}
      </span>
    </motion.button>
  )
}

export default MusicPlayer
