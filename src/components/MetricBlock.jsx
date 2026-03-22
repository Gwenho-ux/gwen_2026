import { motion } from 'framer-motion'
import { fadeUp } from '../utils/motionVariants'

/**
 * Large metric highlight block — 20px radius, generous padding.
 */
const MetricBlock = ({ metric, label, description, className = '' }) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.07)' }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`flex flex-col gap-3 p-8 bg-white border border-border rounded-card ${className}`}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="text-5xl md:text-6xl font-extrabold tracking-display text-primary leading-none"
      >
        {metric}
      </motion.span>
      <span className="text-xs font-semibold tracking-label uppercase text-accent">
        {label}
      </span>
      {description && (
        <p className="text-sm text-secondary mt-1 leading-relaxed">{description}</p>
      )}
    </motion.div>
  )
}

export default MetricBlock
