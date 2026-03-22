import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CapabilityChip from './CapabilityChip'
import LazyImage from './LazyImage'
import { fadeUp } from '../utils/motionVariants'

/**
 * Case study card — navigates to internal /case/:id page.
 * If `href` is set (external URL), opens in new tab instead.
 */
const CaseStudyCard = ({ caseStudy }) => {
  const { id, title, description, tags, duration, role, thumbnail, href } = caseStudy
  const navigate = useNavigate()

  const handleClick = () => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      navigate(`/case/${id}`)
    }
  }

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.08)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group flex flex-col md:flex-row gap-8 p-8 bg-white border border-border rounded-card cursor-pointer"
      onClick={handleClick}
    >
      {/* Thumbnail */}
      <div className="md:w-80 shrink-0">
        <div className="w-full aspect-[4/3] rounded-card overflow-hidden bg-surface">
          {thumbnail ? (
            <LazyImage
              src={thumbnail}
              alt={title}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              wrapperClassName="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-secondary text-sm">
              No image
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 flex-1 justify-center">
        <div className="flex items-center gap-3 text-[11px] text-secondary font-semibold tracking-label uppercase">
          <span>{role}</span>
          <span aria-hidden="true">·</span>
          <span>{duration}</span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-primary leading-tight">
          {title}
        </h3>

        <p className="text-base text-secondary leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <CapabilityChip key={tag} label={tag} />
          ))}
        </div>

        <span className="mt-3 self-start text-[11px] font-semibold tracking-label uppercase text-secondary group-hover:text-accent transition-colors duration-200">
          View Case Study →
        </span>
      </div>
    </motion.article>
  )
}

export default CaseStudyCard
