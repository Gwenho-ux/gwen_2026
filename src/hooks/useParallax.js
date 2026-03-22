import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * useParallax — returns a ref and a y motion value.
 * Attach ref to the container and style={{ y }} to the element you want to drift.
 *
 * @param {number} speed - parallax speed factor (0 = stationary, 1 = full scroll speed).
 *                         Negative values drift downward as you scroll up.
 * @param {string[]} offset - framer-motion scroll offset. Defaults to section-level tracking.
 */
export const useParallax = (speed = 0.3, offset = ['start end', 'end start']) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset })

  const distance = speed * 120
  const y = useTransform(scrollYProgress, [0, 1], [`${distance}px`, `-${distance}px`])

  return { ref, y }
}
