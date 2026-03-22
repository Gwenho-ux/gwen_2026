import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import FloatingChatbot from '../components/FloatingChatbot'
import { getCaseStudyById } from '../data/caseStudies'
import { fadeUp, staggerContainerFast } from '../utils/motionVariants'
import LazyImage from '../components/LazyImage'

const Section = ({ label, children }) => (
  <motion.div
    variants={fadeUp}
    className="flex flex-col gap-4 py-12 border-t border-border"
  >
    <p className="text-[11px] font-semibold tracking-label uppercase text-accent">{label}</p>
    {children}
  </motion.div>
)

const Tag = ({ children }) => (
  <span className="inline-block px-3 py-1.5 text-xs font-semibold rounded-full border border-border text-secondary">
    {children}
  </span>
)

const CaseStudyPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const cs = getCaseStudyById(id)

  if (!cs || !cs.detail) {
    return (
      <div className="min-h-screen flex items-center justify-center text-secondary">
        Case study not found.
      </div>
    )
  }

  const d = cs.detail

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <TopNav />

      <main className="flex-1 pt-16">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <div className="w-full bg-black">
          <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 flex flex-col gap-6">
            <button
              onClick={() => navigate(-1)}
              className="self-start text-white/50 hover:text-white text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-2"
            >
              ← Back
            </button>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-3xl"
            >
              {d.hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg text-white/60 max-w-2xl leading-relaxed"
            >
              {d.hero.subtitle}
            </motion.p>

            {cs.links?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                {cs.links.map(({ label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {label} ↗
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────────── */}
        <motion.div
          className="max-w-5xl mx-auto px-6 pb-32"
          variants={staggerContainerFast}
          initial="hidden"
          animate="visible"
        >
          {/* Meta row — thumbnail left, meta fields right */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row gap-8 py-12 border-b border-border"
          >
            {/* Thumbnail */}
            {cs.thumbnail && (
              <div className="md:w-72 shrink-0">
                <LazyImage
                  src={cs.thumbnail}
                  alt={cs.title}
                  className="object-cover"
                  wrapperClassName="w-full aspect-[4/3] rounded-card overflow-hidden"
                />
              </div>
            )}

            {/* Meta fields */}
            <div className="flex flex-col justify-center gap-6 flex-1">
              <div className="flex flex-col gap-1">
                <p className="text-[11px] font-semibold tracking-label uppercase text-accent">Role</p>
                <p className="text-base font-medium text-primary">{d.role}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[11px] font-semibold tracking-label uppercase text-accent">Timeline</p>
                <p className="text-base font-medium text-primary">{d.timeline}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-semibold tracking-label uppercase text-accent">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {cs.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* What I Led */}
          <Section label="What I Led">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.whatILed.map((item) => (
                <li key={item} className="flex items-start gap-3 text-primary text-base">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Impact */}
          <Section label="Impact & Outcome">
            <ul className="flex flex-col gap-3">
              {d.impact.map((item) => (
                <li key={item} className="flex items-start gap-3 text-primary text-base">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Problem */}
          <Section label="The Thinking">
            <div className="flex flex-col gap-2">
              {d.problem.heading.split('\n').map((line, i) => (
                <p key={i} className="text-2xl md:text-3xl font-bold text-primary leading-snug">{line}</p>
              ))}
            </div>
            <p className="text-base text-secondary leading-relaxed mt-2">{d.problem.body}</p>
          </Section>

          {/* Directions */}
          <Section label="Creative Exploration">
            <ul className="flex flex-col gap-2 mb-6">
              {d.directions.exploring.map((item) => (
                <li key={item} className="flex items-start gap-3 text-secondary text-base">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-black text-white rounded-card px-6 py-5">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">Final Direction</p>
              <p className="text-base font-medium leading-relaxed">{d.directions.final}</p>
            </div>
          </Section>

          {/* Design */}
          <Section label="Design Approach">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {d.design.map((item) => (
                <li key={item} className="flex items-start gap-3 text-primary text-base">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* System Thinking */}
          <Section label="System Thinking">
            <ul className="flex flex-col gap-3">
              {d.systemThinking.map((item) => (
                <li key={item} className="flex items-start gap-3 text-primary text-base">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* Collaboration — only rendered if there are items */}
          {d.collaboration?.length > 0 && (
            <Section label="Collaboration">
              <ul className="flex flex-col gap-3">
                {d.collaboration.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-secondary text-base">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Reflection */}
          <Section label="Reflection">
            <blockquote className="border-l-4 border-accent pl-6">
              {d.reflection.split('\n').map((line, i) => (
                <p key={i} className={`text-xl md:text-2xl font-bold text-primary leading-snug ${i > 0 ? 'mt-2' : ''}`}>
                  {line}
                </p>
              ))}
            </blockquote>
          </Section>
        </motion.div>
      </main>

      <Footer />
      <FloatingChatbot />
    </div>
  )
}

export default CaseStudyPage
