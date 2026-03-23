import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

/**
 * Shared hero banner for all category pages.
 * Renders label, title, tagline and a decorative product image
 * fading in from the right. Pass children for optional extras (e.g. a tab nav).
 */
const PageHero = ({ category, children }) => {
  const heroRef = useRef(null)
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <div ref={heroRef} className="relative px-6 py-28 border-b border-border overflow-hidden">

      {/* Decorative product image — right side, fades left into bg */}
      {category.heroBg && (
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-end pointer-events-none select-none"
          style={{ y: imgY, opacity: imgOpacity }}
        >
          <img
            src={category.heroBg}
            alt=""
            aria-hidden="true"
            className="h-full max-h-[420px] w-auto object-contain"
            style={{
              maskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, black 30%, transparent 100%)',
            }}
          />
        </motion.div>
      )}

      {/* Text — sits above the image */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 max-w-7xl mx-auto flex flex-col gap-5"
      >
        {window.history.length > 1 && (
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate(-1)}
            className="self-start flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-secondary hover:text-primary transition-colors"
          >
            ← Back
          </motion.button>
        )}

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold tracking-label uppercase text-accent"
        >
          {category.label}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-display text-primary leading-tight"
        >
          {category.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-secondary w-[55%] md:w-auto md:max-w-xl"
        >
          {category.tagline}
        </motion.p>

        {children}
      </motion.div>
    </div>
  )
}

export default PageHero
