import { useRef, type MouseEvent, type ReactNode } from 'react'

/**
 * 3D perspective-tilt card: the surface rotates toward the cursor and a
 * glare follows the pointer. Pure CSS transforms (cheap, GPU-friendly),
 * disabled on touch devices and under prefers-reduced-motion.
 */
export default function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement | null>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    card.style.setProperty('--rx', `${((0.5 - py) * 14).toFixed(2)}deg`)
    card.style.setProperty('--ry', `${((px - 0.5) * 14).toFixed(2)}deg`)
    card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
    card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
  }

  const onLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
    card.style.setProperty('--mx', '50%')
    card.style.setProperty('--my', '50%')
  }

  return (
    <div className={`tilt-scene ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={cardRef} className="tilt-card">
        {children}
      </div>
    </div>
  )
}