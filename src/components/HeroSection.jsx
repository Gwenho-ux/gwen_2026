import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const GRAIN_STYLE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
  backgroundSize: '200px 200px',
}

const scrollToCraft = () =>
  document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' })

const ScrollCircle = ({ opacity }) => (
  <motion.div
    style={{ opacity }}
    className="absolute bottom-0 left-0 right-0 flex justify-center z-10 cursor-pointer"
    onClick={scrollToCraft}
    role="button"
    aria-label="Scroll to My Areas of Craft"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && scrollToCraft()}
  >
    <div className="w-[9.8rem] h-[9.8rem] rounded-full bg-accent flex flex-col items-center justify-start pt-5 gap-1" style={{ transform: 'translateY(66%)' }}>
      <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }} className="text-white text-lg leading-none" aria-hidden="true">↓</motion.span>
      <p className="text-[11px] font-semibold tracking-widest uppercase text-white">Scroll for my works</p>
    </div>
  </motion.div>
)

/**
 * Reusable two-stage video: plays `startSrc` once, then loops `loopSrc` silently.
 * `className` is applied to both video elements (position / size).
 */
const TwoStageVideo = ({ startSrc, loopSrc, poster, className }) => {
  const loopRef = useRef(null)
  const [stage, setStage] = useState('intro') // 'intro' | 'loop'

  const onIntroEnded = () => {
    setStage('loop')
    if (loopRef.current) loopRef.current.play().catch(() => {})
  }

  return (
    <>
      <video
        key="intro"
        className={`${className} transition-opacity duration-700 ${stage === 'intro' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        src={startSrc}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={onIntroEnded}
        aria-hidden="true"
      />
      <video
        ref={loopRef}
        key="loop"
        className={`${className} transition-opacity duration-700 ${stage === 'loop' ? 'opacity-100' : 'opacity-0'}`}
        src={loopSrc}
        muted
        playsInline
        loop
        preload="auto"
        aria-hidden="true"
      />
    </>
  )
}

const HeroSection = () => {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const videoClass = 'absolute inset-0 w-full h-full object-cover'

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">

      {/* ── Desktop: intro → loop ───────────────────────────────── */}
      <div className="hidden md:block absolute inset-0">
        <TwoStageVideo
          startSrc="/desktop_start.mp4"
          loopSrc="/desktop_loop.mp4"
          poster="/poster-desktop.jpg"
          className={videoClass}
        />
      </div>

      {/* ── Desktop: grain overlay ──────────────────────────────── */}
      <div className="hidden md:block absolute inset-0 pointer-events-none" style={GRAIN_STYLE} aria-hidden="true" />

      {/* ── Mobile: intro → loop ────────────────────────────────── */}
      <div className="md:hidden absolute inset-0">
        <TwoStageVideo
          startSrc="/mobile_start.mp4"
          loopSrc="/mobile_loop.mp4"
          poster="/poster-mobile.jpg"
          className={videoClass}
        />
      </div>

      {/* ── Scroll circle ───────────────────────────────────────── */}
      <ScrollCircle opacity={contentOpacity} />
    </section>
  )
}

export default HeroSection
