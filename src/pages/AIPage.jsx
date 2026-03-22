import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import TabNav from '../components/TabNav'
import CapabilityChip from '../components/CapabilityChip'
import AISkillCard from '../components/AISkillCard'
import { projects, aiSkills } from '../data/projects'
import { getCategoryBySlug } from '../data/categories'
import { fadeUp, staggerContainer, staggerContainerFast, scaleUp } from '../utils/motionVariants'

const tabs = [
  { id: 'skills', label: 'AI Skills / Systems' },
  { id: 'workflow', label: 'AI Thinking / Workflow' },
]

const category = getCategoryBySlug('ai')
const aiProjects = projects['ai']

const AIPage = () => {
  const [activeTab, setActiveTab] = useState('skills')

  return (
    <div>
      <PageHero category={category} />

      {/* Tab navigation */}
      <div className="px-6 bg-black sticky top-16 z-30 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      <div className="px-6 py-24">
        <div className="max-w-7xl mx-auto">

          {activeTab === 'skills' && (
            <motion.div key="skills" className="flex flex-col gap-10" variants={staggerContainer} initial="hidden" animate="visible">
              <SectionHeader title="AI Skills & Systems" subtitle="Where I've applied AI in practice — from prompt engineering to production pipelines." />
              <motion.div variants={staggerContainer} className="flex flex-col gap-10 mt-2">
                {aiProjects.map((project) => (
                  <AISkillCard key={project.id} project={project} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'workflow' && (
            <motion.div key="workflow" className="flex flex-col gap-10" variants={staggerContainerFast} initial="hidden" animate="visible">
              <SectionHeader
                title="AI Thinking & Workflow"
                subtitle="I use AI to build structured workflows — not just outputs, but systems that teams can actually use."
              />
              <motion.div variants={staggerContainerFast} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-2">
                {aiSkills.map((skill) => (
                  <motion.div key={skill.title} variants={scaleUp}
                    whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.09)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="flex flex-col gap-5 p-8 bg-white border border-border rounded-card">
                    <div className="w-12 h-12 bg-surface border border-border flex items-center justify-center text-primary text-lg font-bold rounded-card">
                      {skill.icon}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-bold text-primary">{skill.title}</h3>
                      <p className="text-sm text-secondary leading-relaxed">{skill.description}</p>
                    </div>
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

export default AIPage
