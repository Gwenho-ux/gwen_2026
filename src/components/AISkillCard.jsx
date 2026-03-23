import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CapabilityChip from './CapabilityChip'
import { fadeUp } from '../utils/motionVariants'

/**
 * AI Skill card — accordion layout.
 * Always visible: Problem, System Logic, Impact.
 * Hidden until "View more": Core Components, Key Insight, Output Examples, Quality Control.
 */

const Row = ({ label, children }) => (
  <div className="flex flex-col gap-2 md:grid md:grid-cols-[140px_1fr] md:gap-6 py-4 border-b border-border last:border-b-0 items-start">
    <span className="text-[10px] font-semibold tracking-label uppercase text-secondary pt-0.5 shrink-0">
      {label}
    </span>
    <div className="text-sm text-secondary leading-relaxed">{children}</div>
  </div>
)

const AISkillCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false)

  const {
    title,
    tags,
    thumbnailLabel,
    oneLiner,
    problem,
    systemLogic,
    coreComponents,
    keyInsight,
    outputExamples,
    impact,
    qualityControl,
  } = project

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(0,0,0,0.07)' }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="flex flex-col bg-white border border-border rounded-card overflow-hidden"
    >
      {/* ── Header: title block ─────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-7 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <CapabilityChip key={tag} label={tag} variant="accent" />
          ))}
        </div>
        <h3 className="text-xl font-bold tracking-tight text-primary leading-tight">
          {title}
        </h3>
        <p className="text-sm text-secondary leading-relaxed">{oneLiner}</p>
      </div>

      {/* ── Always-visible rows ─────────────────────────────────── */}
      <div className="px-7 pt-2 pb-0">
        <Row label="System Logic">
          <div className="flex flex-wrap items-center gap-1.5">
            {systemLogic.split('→').map((step, i, arr) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="bg-surface border border-border text-primary text-[11px] font-semibold px-2.5 py-1 rounded-card whitespace-nowrap">
                  {step.trim()}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-secondary text-xs" aria-hidden="true">→</span>
                )}
              </span>
            ))}
          </div>
        </Row>

        <Row label="Impact">
          <span className="text-primary font-medium">{impact}</span>
        </Row>
      </div>

      {/* ── Expandable rows ─────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 pt-0 pb-0 border-t border-border">
              <Row label="Problem">{problem}</Row>

              <Row label="Core Components">
                <ol className="flex flex-col gap-1.5">
                  {coreComponents.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="shrink-0 text-[10px] font-bold text-accent mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </Row>

              <Row label="Key Insight">
                <span className="font-semibold text-primary">"{keyInsight}"</span>
              </Row>

              <Row label="Output Examples">
                <ul className="flex flex-col gap-1.5">
                  {outputExamples.map((example, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="shrink-0 text-accent text-[10px] mt-1" aria-hidden="true">◆</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </Row>

              {qualityControl && (
                <Row label="Quality Control">{qualityControl}</Row>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ───────────────────────────────────────── */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center justify-center gap-2 w-full py-4 border-t border-border text-[11px] font-semibold tracking-label uppercase text-secondary hover:text-primary hover:bg-surface transition-colors duration-200"
      >
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="inline-block"
        >
          ↓
        </motion.span>
        {expanded ? 'View less' : 'View more'}
      </button>
    </motion.article>
  )
}

export default AISkillCard
