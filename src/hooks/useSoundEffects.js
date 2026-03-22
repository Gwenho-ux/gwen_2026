import { useEffect, useRef } from 'react'

// Preload both audio objects once at module level
const _click = typeof window !== 'undefined' ? new Audio('/click.mp3') : null
const _hover  = typeof window !== 'undefined' ? new Audio('/hover.mp3') : null
if (_click) _click.volume = 0.35
if (_hover)  _hover.volume = 0.2

// Play by cloning so rapid triggers can overlap cleanly
const playClick = () => {
  if (!_click) return
  const a = _click.cloneNode()
  a.volume = _click.volume
  a.play().catch(() => {})
}

const playHover = () => {
  if (!_hover) return
  const a = _hover.cloneNode()
  a.volume = _hover.volume
  a.play().catch(() => {})
}

// Interactive element selectors that should trigger hover sound
const HOVER_SELECTOR = 'a, button, [role="button"], [role="tab"], input, select, textarea, label'

/**
 * Attaches global click and mouseover sound effects to the document.
 * Hover sound fires only when entering a new interactive element.
 * Must be called once from a top-level component (e.g. App).
 */
export const useSoundEffects = () => {
  const lastHoverTarget = useRef(null)

  useEffect(() => {
    const onClick = () => playClick()

    const onMouseOver = (e) => {
      const target = e.target.closest(HOVER_SELECTOR)
      if (target && target !== lastHoverTarget.current) {
        lastHoverTarget.current = target
        playHover()
      }
    }

    const onMouseOut = (e) => {
      const target = e.target.closest(HOVER_SELECTOR)
      if (target && target === lastHoverTarget.current) {
        lastHoverTarget.current = null
      }
    }

    document.addEventListener('click',     onClick)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout',  onMouseOut)

    return () => {
      document.removeEventListener('click',     onClick)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout',  onMouseOut)
    }
  }, [])
}
