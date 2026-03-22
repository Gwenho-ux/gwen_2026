import { motion } from 'framer-motion'
import CapabilityChip from './CapabilityChip'
import LazyImage from './LazyImage'
import { scaleUp } from '../utils/motionVariants'

/**
 * Project tile card — real thumbnail image, domain badge, 20px radius.
 */
const ProjectCard = ({ project, showLearning = false }) => {
  const { title, description, tags, domain, thumbnail, thumbnailLabel, keyLearning, liveHref } = project

  return (
    <motion.article
      variants={scaleUp}
      whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.09)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group flex flex-col bg-white border border-border rounded-card overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="w-full aspect-[4/3] overflow-hidden bg-surface relative">
        {thumbnail ? (
          <LazyImage
            src={thumbnail}
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            wrapperClassName="w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-secondary text-sm">
            {thumbnailLabel ?? 'No image'}
          </div>
        )}
        {/* Domain badges overlaid on the image */}
        {domain?.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {domain.map((d) => (
              <span
                key={d}
                className="px-2.5 py-1 text-[10px] font-semibold tracking-wide rounded-full bg-black/60 text-white backdrop-blur-sm"
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-7">
        <h3 className="text-lg font-bold tracking-tight text-primary leading-tight">
          {title}
        </h3>

        <p className="text-sm text-secondary leading-relaxed">{description}</p>

        {showLearning && keyLearning && (
          <div className="mt-1 pl-4 border-l-2 border-accent">
            <p className="text-xs text-secondary italic leading-relaxed">
              <span className="font-semibold text-primary not-italic">Key learning: </span>
              {keyLearning}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          {tags.map((tag) => (
            <CapabilityChip key={tag} label={tag} />
          ))}
        </div>

        {liveHref && (
          <a
            href={liveHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 self-start text-[11px] font-semibold tracking-label uppercase text-secondary group-hover:text-accent transition-colors duration-200"
          >
            View Live →
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default ProjectCard
