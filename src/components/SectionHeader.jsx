import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/motionVariants'

/**
 * Reusable section heading block — title + optional subtitle + optional accent rule.
 * Animates in with staggered fade-up on scroll entry.
 */
const SectionHeader = ({ title, subtitle, align = 'left', showRule = true, dark = false, className = '' }) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align]

  return (
    <motion.div
      className={`flex flex-col gap-3 ${alignClass} ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {showRule && (
        <motion.span
          variants={fadeUp}
          className="block w-8 h-px bg-accent"
          aria-hidden="true"
        />
      )}
      <motion.h2
        variants={fadeUp}
        className={`text-3xl md:text-4xl font-bold tracking-tight leading-tight ${dark ? 'text-white' : 'text-primary'}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeUp} className={`text-base max-w-xl ${dark ? 'text-white/60' : 'text-secondary'}`}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeader
