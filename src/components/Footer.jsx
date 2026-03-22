import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp } from '../utils/motionVariants'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'UX/UI', to: '/ux-design' },
  { label: 'Creativity', to: '/creativity' },
  { label: 'AI Application', to: '/ai' },
  { label: 'Mini Experiences', to: '/prototyping' },
  { label: 'Leadership', to: '/leadership' },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <motion.footer
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="border-t border-border bg-bg px-6 py-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs text-secondary">
          © {year} GWENDERLAND. All rights reserved.
        </span>

        <nav className="flex items-center gap-6 flex-wrap justify-center">
          {footerLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-[11px] font-semibold tracking-label uppercase text-secondary hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.footer>
  )
}

export default Footer
