import { useRef, useEffect, useCallback, useMemo } from 'react'

/**
 * Magnetic scatter text — characters repel away from the cursor
 * with spring interpolation. Desktop only; static on mobile.
 *
 * Props:
 *   segments      – [{ text: string, color: string }]  text content with per-segment colour
 *   fontSize      – CSS font-size value (default: clamp(2rem, 5.5vw, 5rem))
 *   label         – small label shown above the text
 *   className     – extra classes on the outer <section>
 *   radius        – px radius around cursor that activates repulsion
 *   maxDistance   – max px a character can be pushed
 *   returnSpeed   – lerp factor toward origin (lower = slower / more elegant)
 *   chaseSpeed    – lerp factor toward repulsion target
 *   maxRotation   – max deg rotation per character
 */

const DEFAULT_SEGMENTS = [
  { text: "If you stay a little longer, you'll start to understand how I ", color: '#0a0a0a' },
  { text: 'think',  color: '#DC4A19' },
  { text: '.',      color: '#0a0a0a' },
]

const lerp = (a, b, t) => a + (b - a) * t

// Derive CHARS and TOKENS from segments array
const buildCharsAndTokens = (segments) => {
  const chars = segments.flatMap(({ text, color }, si) =>
    text.split('').map((char, ci) => ({ char, color, key: `${si}-${ci}` }))
  )

  const tokens = []
  let i = 0
  while (i < chars.length) {
    if (chars[i].char === ' ') {
      const start = i
      const tokenChars = []
      while (i < chars.length && chars[i].char === ' ') { tokenChars.push(chars[i]); i++ }
      tokens.push({ isWord: false, chars: tokenChars, startIdx: start })
    } else {
      const start = i
      const tokenChars = []
      while (i < chars.length && chars[i].char !== ' ') { tokenChars.push(chars[i]); i++ }
      tokens.push({ isWord: true, chars: tokenChars, startIdx: start })
    }
  }
  return { chars, tokens }
}

const ScatterText = ({
  segments     = DEFAULT_SEGMENTS,
  fontSize     = 'clamp(2rem, 5.5vw, 5rem)',
  label        = 'A thought',
  className    = 'py-36 px-6 bg-white border-b border-border',
  radius       = 130,
  maxDistance  = 90,
  returnSpeed  = 0.055,
  chaseSpeed   = 0.14,
  maxRotation  = 7,
}) => {
  const { chars: CHARS, tokens: TOKENS } = useMemo(
    () => buildCharsAndTokens(segments),
    [segments]
  )

  const containerRef = useRef(null)
  const spanRefs     = useRef([])
  const offsets      = useRef([])
  const targets      = useRef([])
  const mouse        = useRef({ x: -9999, y: -9999, inside: false })
  const charCentres  = useRef([])
  const rafId        = useRef(null)
  const isMobile     = useRef(false)

  useEffect(() => {
    const n = CHARS.length
    offsets.current     = Array.from({ length: n }, () => ({ x: 0, y: 0, rot: 0 }))
    targets.current     = Array.from({ length: n }, () => ({ x: 0, y: 0, rot: 0 }))
    charCentres.current = Array.from({ length: n }, () => ({ cx: 0, cy: 0 }))
    spanRefs.current    = spanRefs.current.slice(0, n)
    isMobile.current    = window.matchMedia('(pointer: coarse)').matches
  }, [CHARS.length])

  const cacheRects = useCallback(() => {
    spanRefs.current.forEach((el, i) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      charCentres.current[i] = { cx: r.left + r.width / 2, cy: r.top + r.height / 2 }
    })
  }, [])

  const tick = useCallback(() => {
    const { x: mx, y: my, inside } = mouse.current
    const off = offsets.current
    const tgt = targets.current
    const cen = charCentres.current

    for (let i = 0; i < off.length; i++) {
      const el = spanRefs.current[i]
      if (!el) continue

      if (inside) {
        const ax   = cen[i].cx + off[i].x
        const ay   = cen[i].cy + off[i].y
        const dx   = ax - mx
        const dy   = ay - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < radius && dist > 0) {
          const t     = 1 - dist / radius
          const force = t * t * maxDistance
          const angle = Math.atan2(dy, dx)
          tgt[i].x   = Math.cos(angle) * force
          tgt[i].y   = Math.sin(angle) * force
          tgt[i].rot = (Math.cos(angle) * force / maxDistance) * maxRotation
        } else {
          tgt[i].x = tgt[i].y = tgt[i].rot = 0
        }
      } else {
        tgt[i].x = tgt[i].y = tgt[i].rot = 0
      }

      const speed = inside && (Math.abs(tgt[i].x) > 0.5 || Math.abs(tgt[i].y) > 0.5)
        ? chaseSpeed
        : returnSpeed

      off[i].x   = lerp(off[i].x,   tgt[i].x,   speed)
      off[i].y   = lerp(off[i].y,   tgt[i].y,   speed)
      off[i].rot = lerp(off[i].rot, tgt[i].rot, speed)

      const tx = off[i].x
      const ty = off[i].y
      const tr = off[i].rot
      if (Math.abs(tx) > 0.02 || Math.abs(ty) > 0.02 || Math.abs(tr) > 0.02) {
        el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) rotate(${tr.toFixed(2)}deg)`
      } else if (el.style.transform) {
        el.style.transform = ''
      }
    }

    rafId.current = requestAnimationFrame(tick)
  }, [radius, maxDistance, returnSpeed, chaseSpeed, maxRotation])

  useEffect(() => {
    if (isMobile.current) return

    const container = containerRef.current
    if (!container) return

    const onMove  = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    const onEnter = () => { cacheRects(); mouse.current.inside = true }
    const onLeave = () => { mouse.current.inside = false }

    container.addEventListener('mousemove',  onMove)
    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', cacheRects)
    window.addEventListener('scroll', cacheRects, { passive: true })

    rafId.current = requestAnimationFrame(tick)

    return () => {
      container.removeEventListener('mousemove',  onMove)
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', cacheRects)
      window.removeEventListener('scroll', cacheRects)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [tick, cacheRects])

  return (
    <section className={className}>
      <div className="max-w-7xl mx-auto">
        {label && (
          <p className="text-[11px] font-semibold tracking-label uppercase text-accent mb-10 md:mb-14">
            {label}
          </p>
        )}

        <p
          ref={containerRef}
          className="select-none cursor-default"
          style={{ fontSize, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}
          aria-label={CHARS.map((c) => c.char).join('')}
        >
          {TOKENS.map((token, ti) =>
            token.isWord ? (
              <span key={ti} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {token.chars.map(({ char, color, key }, ci) => {
                  const idx = token.startIdx + ci
                  return (
                    <span
                      key={key}
                      ref={(el) => { spanRefs.current[idx] = el }}
                      aria-hidden="true"
                      style={{ display: 'inline-block', color, willChange: 'transform' }}
                    >
                      {char}
                    </span>
                  )
                })}
              </span>
            ) : (
              token.chars.map(({ char, color, key }, ci) => {
                const idx = token.startIdx + ci
                return (
                  <span
                    key={key}
                    ref={(el) => { spanRefs.current[idx] = el }}
                    aria-hidden="true"
                    style={{ display: 'inline', color, whiteSpace: 'pre', willChange: 'transform' }}
                  >
                    {char}
                  </span>
                )
              })
            )
          )}
        </p>
      </div>
    </section>
  )
}

export default ScatterText
