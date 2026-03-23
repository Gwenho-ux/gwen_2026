import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import HamburgerMenu from './HamburgerMenu'
import MusicPlayer from './MusicPlayer'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'UX/UI', to: '/ux-design' },
  { label: 'Creativity', to: '/creativity' },
  { label: 'AI Application', to: '/ai' },
  { label: 'Mini Experiences', to: '/prototyping' },
  { label: 'Leadership', to: '/leadership' },
]

const rightItems = [
  { label: 'About',   to: { pathname: '/', hash: '#about'   } },
  { label: 'Contact', to: { pathname: '/', hash: '#contact' } },
]

/**
 * Top navigation bar — Zajno/Opal inspired.
 * Sticky, backdrop-blur, spread layout, orange active indicator.
 * Collapses to hamburger on mobile.
 */
const TopNav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 backdrop-blur-md ${
          isLanding && !scrolled ? 'bg-black/35' : 'bg-black/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 md:px-4 xl:px-6 h-16 flex items-center justify-between gap-2">
          {/* Logo */}
          <NavLink
            to="/"
            className="font-bold text-[13px] xl:text-base tracking-tight text-white hover:text-accent transition-colors shrink-0"
          >
            GWENDERLAND.
          </NavLink>

          {/* Center nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-7 min-w-0" aria-label="Primary navigation">
            {navItems.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-[10px] lg:text-[11px] xl:text-[12px] font-semibold tracking-label uppercase transition-colors relative pb-px whitespace-nowrap ${
                    isActive
                      ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-accent'
                      : 'text-white/60 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right items — hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6 shrink-0">
            {rightItems.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className="text-[10px] lg:text-[11px] xl:text-[12px] font-semibold tracking-label uppercase transition-colors whitespace-nowrap text-white/60 hover:text-white"
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Music player */}
          <div className="shrink-0">
            <MusicPlayer />
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden transition-colors p-1 text-white hover:text-white/70"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Fullscreen mobile overlay */}
      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

export default TopNav
