import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useAnimation } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const PRODUCTS = [
  {
    id: 'ux-design',
    image: '/product-ux.png',
    title: 'UX & Product Design',
    route: '/ux-design',
    inside: ['Case Studies', 'Product Showcase', 'UX Flows & System Thinking'],
  },
  {
    id: 'creativity',
    image: '/product-creative.png',
    title: 'Creative Direction & Branding',
    route: '/creativity',
    inside: ['Branding Case Studies', 'Visual Design', 'Art Direction'],
  },
  {
    id: 'ai',
    image: '/product-ai.png',
    title: 'AI Systems & Workflows',
    route: '/ai',
    inside: ['AI Skills & Systems', 'Workflows', 'Tools & Frameworks'],
  },
  {
    id: 'prototyping',
    image: '/product-mini.png',
    title: 'Mini Experiences',
    route: '/prototyping',
    inside: ['Mini Products', 'Prototypes', 'Live Demos'],
  },
  {
    id: 'leadership',
    image: '/product-impact.png',
    title: 'Leadership & Impact',
    route: '/leadership',
    inside: ['Achievements', 'Team Leadership', 'Knowledge Sharing'],
  },
]

const N = PRODUCTS.length
const mod = (n, m) => ((n % m) + m) % m

const getRel = (idx, active) => {
  const raw = idx - active
  const half = Math.floor(N / 2)
  if (raw > half) return raw - N
  if (raw < -half) return raw + N
  return raw
}

// Size/style config per relative distance
const TIER = {
  0: { size: 340, opacity: 1,    blur: 0, zIndex: 30 },
  1: { size: 240, opacity: 0.55, blur: 1, zIndex: 20 },
  2: { size: 180, opacity: 0.32, blur: 2, zIndex: 10 },
}
const getTier = (absRel) => TIER[Math.min(absRel, 2)]

const wiggle = {
  hover: {
    rotate: [0, -2.5, 2.5, -1.5, 1.5, 0],
    y: [0, -7, 0],
    transition: { duration: 0.32, ease: 'easeInOut' },
  },
  rest: { rotate: 0, y: 0 },
}

const DRAG_THRESHOLD = 50

const ProductCarousel = () => {
  const [active, setActive] = useState(2)
  const navigate = useNavigate()
  const dragX = useMotionValue(0)
  const dragControls = useAnimation()

  const prev = useCallback(() => setActive((a) => mod(a - 1, N)), [])
  const next = useCallback(() => setActive((a) => mod(a + 1, N)), [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  const handleDragEnd = useCallback((_, info) => {
    const offset = info.offset.x
    if (offset < -DRAG_THRESHOLD) next()
    else if (offset > DRAG_THRESHOLD) prev()
    dragControls.start({ x: 0, transition: { duration: 0 } })
  }, [next, prev, dragControls])

  // Sort products left→right by relative index so flex order is correct
  const sortedItems = useMemo(() =>
    PRODUCTS
      .map((p, idx) => ({ ...p, origIdx: idx, rel: getRel(idx, active) }))
      .sort((a, b) => a.rel - b.rel),
    [active]
  )

  const current = PRODUCTS[active]

  return (
    <div className="w-full select-none">
      {/* ── Carousel stage — draggable on mobile ────────────────── */}
      <motion.div
        className="relative flex items-center justify-center gap-3 md:gap-6 px-4 overflow-hidden md:pointer-events-auto"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0.15, right: 0.15 }}
        animate={dragControls}
        style={{ x: dragX }}
        onDragEnd={handleDragEnd}
        // Only enable drag on mobile via CSS-based check — drag is always mounted
        // but on desktop the arrow buttons are the primary interaction
      >

        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 md:left-6 z-40 w-10 h-10 rounded-full border border-border bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-white hover:border-primary transition-all shadow-sm shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {sortedItems.map(({ rel, origIdx, ...product }) => {
          const absRel = Math.abs(rel)
          const isCenter = rel === 0
          const tier = getTier(absRel)

          return (
            <motion.div
              key={product.id}
              className={`shrink-0 flex items-center justify-center cursor-pointer ${absRel === 2 ? 'hidden md:flex' : ''}`}
              animate={{
                width: tier.size,
                opacity: tier.opacity,
                filter: `blur(${tier.blur}px)`,
                zIndex: tier.zIndex,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              onClick={() => isCenter ? navigate(product.route) : setActive(origIdx)}
              whileHover={!isCenter ? 'hover' : 'rest'}
              initial="rest"
              variants={wiggle}
            >
              <motion.img
                src={product.image}
                alt={product.title}
                animate={{
                  width: tier.size,
                  height: tier.size,
                  filter: isCenter ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.13))' : 'none',
                  y: isCenter ? [0, -10, 0] : 0,
                }}
                transition={isCenter ? {
                  width:  { type: 'spring', stiffness: 280, damping: 30 },
                  height: { type: 'spring', stiffness: 280, damping: 30 },
                  filter: { type: 'spring', stiffness: 280, damping: 30 },
                  y: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' },
                } : { type: 'spring', stiffness: 280, damping: 30 }}
                className="object-contain"
                draggable={false}
              />
            </motion.div>
          )
        })}

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 md:right-6 z-40 w-10 h-10 rounded-full border border-border bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-white hover:border-primary transition-all shadow-sm shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.div>

      {/* ── Active item info ─────────────────────────────────────── */}
      <div className="mt-10 flex flex-col items-center text-center gap-4 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-4"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
              {current.title}
            </h3>

            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] font-semibold tracking-widest uppercase text-secondary">
                What's inside:
              </p>
              <p className="text-sm text-secondary text-center">
                {current.inside.join(' | ')}
              </p>
            </div>

            <button
              onClick={() => navigate(current.route)}
              className="btn-primary mt-1"
            >
              Explore
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dot indicators ──────────────────────────────────────── */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {PRODUCTS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            aria-label={`Go to ${PRODUCTS[idx].title}`}
            className={`rounded-full transition-all duration-300 ${
              idx === active
                ? 'w-6 h-2 bg-accent'
                : 'w-2 h-2 bg-border hover:bg-secondary'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel
