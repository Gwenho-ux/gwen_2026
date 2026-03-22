import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import MetricBlock from '../components/MetricBlock'
import { projects, achievements } from '../data/projects'
import { getCategoryBySlug } from '../data/categories'
import { fadeUp, staggerContainer, staggerContainerFast } from '../utils/motionVariants'

const category = getCategoryBySlug('leadership')
const leadershipMetrics = projects['leadership']

const LeadershipPage = () => {
  return (
    <div>
      <PageHero category={{ ...category, title: 'Leadership & Impact' }} />

      {/* Content */}
      <div className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div className="flex flex-col gap-14" variants={staggerContainer} initial="hidden" animate="visible">

            <SectionHeader
              title="Impact & Achievements"
              subtitle="Numbers and narratives that represent the real work — leading people, shipping products, and building lasting systems."
            />

            {/* Metric blocks */}
            <motion.div variants={staggerContainerFast} className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {leadershipMetrics.map((item) => (
                <MetricBlock key={item.id} metric={item.metric} label={item.label} description={item.description} />
              ))}
            </motion.div>

            {/* Achievement cards */}
            <motion.div variants={staggerContainer} className="flex flex-col gap-4">
              <motion.h3 variants={fadeUp} className="text-lg font-bold text-primary">Key Achievements</motion.h3>
              <motion.div variants={staggerContainerFast} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {achievements.map(({ id, metric, label, context, href }) => (
                  <motion.div key={id} variants={fadeUp}
                    whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.07)' }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    className="flex flex-col gap-2 p-7 bg-white border border-border rounded-card">
                    <span className="text-4xl font-extrabold tracking-display text-primary leading-none">
                      {metric}
                    </span>
                    <span className="text-[10px] font-semibold tracking-label uppercase text-accent">
                      {label}
                    </span>
                    <p className="text-sm text-secondary leading-relaxed mt-1">{context}</p>
                    {href && (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-3 self-start">
                        Visit Now →
                      </a>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LeadershipPage
