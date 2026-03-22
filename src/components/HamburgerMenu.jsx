import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'UX/UI Design', to: '/ux-design' },
  { label: 'Creativity', to: '/creativity' },
  { label: 'AI Application', to: '/ai' },
  { label: 'Mini Experiences', to: '/prototyping' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

/**
 * Fullscreen overlay navigation for mobile.
 * Opens/closes via isOpen prop. Calls onClose to dismiss.
 */
const HamburgerMenu = ({ isOpen, onClose }) => {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-[60] bg-bg flex flex-col transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Top bar within overlay — mirrors TopNav height */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-border">
        <span className="font-bold text-lg tracking-tight text-primary">GWENDERLAND.</span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="text-secondary hover:text-primary transition-colors p-1"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col justify-center flex-1 px-6 gap-1">
        {navItems.map(({ label, to }, index) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `text-4xl font-bold tracking-tight transition-colors py-2 ${
                isActive ? 'text-primary' : 'text-secondary hover:text-primary'
              }`
            }
            style={{ transitionDelay: isOpen ? `${index * 40}ms` : '0ms' }}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer strip */}
      <div className="px-6 py-6 border-t border-border">
        <p className="text-xs text-secondary tracking-label uppercase">© {new Date().getFullYear()} GWENDERLAND.</p>
      </div>
    </div>
  )
}

export default HamburgerMenu
