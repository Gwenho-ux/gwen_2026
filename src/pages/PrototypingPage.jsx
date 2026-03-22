import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import MiniExperienceCard from '../components/MiniExperienceCard'
import { projects } from '../data/projects'
import { getCategoryBySlug } from '../data/categories'
import { fadeUp, staggerContainerFast } from '../utils/motionVariants'

const category = getCategoryBySlug('prototyping')
const protoProjects = projects['prototyping']

const PrototypingPage = () => {
  return (
    <div>
      <PageHero category={category} />

      <div className="px-6 py-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">

          <div className="max-w-2xl">
            <SectionHeader
              title="Mini Experiences"
              subtitle="Small experiments, real shipping. Each one built fast, learned from, and sent into the world."
            />
          </div>

          {/* Philosophy strip */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-border"
            variants={staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[
              { label: 'Speed', text: 'Ship in hours, not months. Move the idea from head to browser before it dies.' },
              { label: 'Clarity', text: 'Every prototype starts with one question. What does this need to prove?' },
              { label: 'Learning', text: 'The goal is not a perfect product. The goal is a clearer question.' },
            ].map(({ label, text }) => (
              <motion.div key={label} variants={fadeUp} className="flex flex-col gap-3">
                <span className="text-[11px] font-semibold tracking-label uppercase text-accent">{label}</span>
                <p className="text-base text-secondary leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mini Experience cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {protoProjects.map((project) => (
              <MiniExperienceCard key={project.id} project={project} />
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default PrototypingPage
