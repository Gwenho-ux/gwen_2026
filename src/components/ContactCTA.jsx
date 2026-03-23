import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/motionVariants'

const EMAIL = 'winglam.gwen@gmail.com'

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy email address"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-secondary hover:text-primary hover:border-primary transition-all text-xs font-semibold"
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Copy
        </>
      )}
    </button>
  )
}

/**
 * Contact invitation block — scroll-reveal with staggered children.
 */
const ContactCTA = () => {
  return (
    <section id="contact" className="border-t border-border overflow-hidden py-16 md:py-24">
      <div className="flex flex-col-reverse md:flex-row min-h-[480px]">

        {/* Left — content (bottom on mobile, left on desktop) */}
        <motion.div
          className="flex flex-col justify-center gap-8 px-8 md:px-16 py-20 md:w-1/2 bg-surface"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <span className="block w-8 h-px bg-accent" aria-hidden="true" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary text-left">
              Want to work together?
            </h2>
            <p className="text-secondary text-base text-left">
              I&apos;m always open to interesting projects, conversations, and collaborations.
              Let&apos;s make something worth making.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
            {/* LinkedIn button */}
            <a
              href="https://www.linkedin.com/in/gwen-h-a522b31a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              LinkedIn ↗
            </a>

            {/* Email — text + copy button */}
            <div className="flex items-center gap-2 px-5 py-3 rounded-card border border-border bg-white">
              <span className="text-sm font-medium text-primary">{EMAIL}</span>
              <CopyButton text={EMAIL} />
            </div>
          </motion.div>
        </motion.div>

        {/* Right — image cropped 20px top & bottom on desktop */}
        <div className="md:w-1/2 min-h-[320px] md:min-h-0 flex items-center justify-center bg-surface overflow-hidden">
          <img
            src="/contact-hero.png"
            alt="Gwen"
            className="w-full object-contain md:-my-5"
          />
        </div>

      </div>
    </section>
  )
}

export default ContactCTA
