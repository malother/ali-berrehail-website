import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { getScrollState, onScrollTick } from '../lib/scroll'

interface ParallaxProps {
  children: ReactNode
  /** Max translateY in px (content lags the scroll — depth illusion). */
  range?: number
  className?: string
}

/**
 * Depth parallax: the wrapped content moves slightly slower than the
 * scroll, creating layered depth against the fixed 3D universe. The
 * scroll engine's scene energy adds a subtle extra lift so content
 * and camera move as one during scroll transitions.
 * Disabled for prefers-reduced-motion.
 */
export default function Parallax({ children, range = 32, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useMemo(
    () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false),
    [],
  )

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    return onScrollTick(() => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
      const y = (0.5 - p) * range + (getScrollState().intensity - 1) * 16
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
    })
  }, [reduced, range])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}