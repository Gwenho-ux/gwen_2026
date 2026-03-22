import { motion } from 'framer-motion'
import LazyImage from './LazyImage'
import { fadeUp } from '../utils/motionVariants'

/**
 * Card for Mini Experiences — thumbnail, description, key learning,
 * tags, optional "closed" notice, and a live link button.
 */
const MiniExperienceCard = ({ project }) => {
  const { title, description, keyLearning, tags, thumbnail, closedNotice, liveHref } = project

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,0.09)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group flex flex-col bg-white border border-border rounded-card overflow-hidden cursor-pointer"
      onClick={() => liveHref && window.open(liveHref, '_blank', 'noopener,noreferrer')}
    >
      {/* Thumbnail */}
      <div className="w-full aspect-video overflow-hidden relative">
        <LazyImage
          src={thumbnail}
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          wrapperClassName="w-full h-full"
          loading="lazy"
        />
        {/* Closed notice badge */}
        {closedNotice && (
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold rounded-full bg-black/70 text-white/90 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
              {closedNotice}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-7 flex-1">
        <h3 className="text-lg font-bold tracking-tight text-primary leading-tight">
          {title}
        </h3>

        <p className="text-sm text-secondary leading-relaxed">{description}</p>

        {/* Key learning */}
        <div className="pl-4 border-l-2 border-accent">
          <p className="text-xs text-secondary leading-relaxed">
            <span className="font-semibold text-primary">Key learning: </span>
            {keyLearning}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-medium rounded-full border border-border text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Live link — stopPropagation not needed since card click handles navigation */}
        {liveHref && (
          <span className="btn-primary self-start mt-2 text-xs px-5 py-3">
            Try it ↗
          </span>
        )}
      </div>
    </motion.article>
  )
}

export default MiniExperienceCard
