import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import CapabilityChip from './CapabilityChip'
import { scaleUp } from '../utils/motionVariants'

/**
 * Product-package style card — 20px radius, generous padding, Apple-style spacing.
 */
const CategoryCard = ({ category }) => {
  const { title, label, description, route, icon } = category
  const navigate = useNavigate()

  return (
    <motion.button
      variants={scaleUp}
      whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(0,0,0,0.10)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => navigate(route)}
      className="group flex flex-col gap-5 p-8 bg-white border border-border text-left w-full h-full cursor-pointer rounded-card"
      aria-label={`Explore ${title}`}
    >
      {/* Icon placeholder */}
      <div className="w-14 h-14 bg-surface border border-border flex items-center justify-center text-2xl text-secondary rounded-card transition-colors duration-200 group-hover:border-accent/40">
        {icon}
      </div>

      <CapabilityChip label={label} variant="accent" />

      <h3 className="text-lg font-bold tracking-tight text-primary leading-tight">
        {title}
      </h3>

      <p className="text-sm text-secondary leading-relaxed flex-1">{description}</p>

      <span className="text-[11px] font-semibold tracking-label uppercase text-secondary group-hover:text-accent transition-colors duration-200">
        Explore →
      </span>
    </motion.button>
  )
}

export default CategoryCard
