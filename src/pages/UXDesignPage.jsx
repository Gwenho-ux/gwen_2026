import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import TabNav from '../components/TabNav'
import CaseStudyCard from '../components/CaseStudyCard'
import ProjectCard from '../components/ProjectCard'
import CapabilityChip from '../components/CapabilityChip'
import ScatterText from '../components/ScatterText'
import { caseStudies } from '../data/caseStudies'
import { projects, uxScopes, uxProcess } from '../data/projects'
import { getCategoryBySlug } from '../data/categories'
import { staggerContainer, staggerContainerFast, fadeUp, scaleUp } from '../utils/motionVariants'

const SHOWCASE_SEGMENTS = [
  { text: 'Over ', color: '#0a0a0a' },
  { text: '40+',  color: '#DC4A19' },
  { text: ' projects shipped over the years.', color: '#0a0a0a' },
]

const tabs = [
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'showcase', label: 'Project Showcase' },
  { id: 'scope', label: 'Scope / Areas' },
]

const category = getCategoryBySlug('ux-design')
const uxProjects = projects['ux-design']
const uxCaseStudies = caseStudies.filter((cs) => cs.categorySlug === 'ux-design')

const UXDesignPage = () => {
  const [activeTab, setActiveTab] = useState('case-studies')

  return (
    <div>
      <PageHero category={category} />

      {/* Tab navigation */}
      <div className="px-6 bg-black sticky top-16 z-30 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Tab content */}
      <div className="px-6 py-24">
        <div className="max-w-7xl mx-auto">

          {activeTab === 'case-studies' && (
            <motion.div key="case-studies" className="flex flex-col gap-8" variants={staggerContainer} initial="hidden" animate="visible">
              <SectionHeader title="Case Studies" subtitle="Deep dives into projects where research, strategy, and craft intersected." />
              <motion.div variants={staggerContainer} className="flex flex-col gap-8 mt-4">
                {uxCaseStudies.map((cs) => <CaseStudyCard key={cs.id} caseStudy={cs} />)}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'showcase' && (
            <motion.div key="showcase" className="flex flex-col gap-8" variants={staggerContainerFast} initial="hidden" animate="visible">
              <SectionHeader title="Project Showcase" subtitle="A curated selection of UX and product design work." />
              <motion.div variants={staggerContainerFast} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {uxProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'showcase' && (
            <ScatterText
              segments={SHOWCASE_SEGMENTS}
              label={null}
              fontSize="clamp(2.2rem, 5vw, 4.5rem)"
              className="pt-16 pb-0 bg-transparent"
            />
          )}

          {activeTab === 'scope' && (
            <motion.div key="scope" className="flex flex-col gap-10" variants={staggerContainer} initial="hidden" animate="visible">
              <SectionHeader title="Scope & Capabilities" subtitle="The full breadth of UX disciplines I work across." />
              <motion.div variants={staggerContainerFast} className="flex flex-wrap gap-3 mt-2">
                {uxScopes.map((scope) => (
                  <motion.div key={scope} variants={scaleUp}>
                    <CapabilityChip label={scope} className="text-xs px-4 py-2" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={staggerContainerFast} className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-4">
                {uxProcess.map(({ step, title, desc }) => (
                  <motion.div key={step} variants={fadeUp}
                    whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.07)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="flex flex-col gap-4 p-8 border border-border bg-white rounded-card">
                    <span className="text-[11px] font-semibold tracking-label uppercase text-accent">{step}</span>
                    <h3 className="text-lg font-bold text-primary">{title}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>
          )}

        </div>
      </div>
    </div>
  )
}

export default UXDesignPage
