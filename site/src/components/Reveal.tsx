import { useEffect, useRef, type ReactNode } from 'react'
import { onScrollTick } from '../lib/scroll'

type RevealTag = 'div' | 'li' | 'span' | 'section' | 'article' | 'h2' | 'p' | 'ul' | 'h1'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3
  as?: RevealTag
}

/**
 * Scroll-reveal wrapper. An element is revealed once its top crosses
 * the reveal line (viewport bottom - 60px); elements already above or
 * inside the viewport are revealed immediately, so instant jumps and
 * anchor navigation can never leave content hidden.
 * Respects prefers-reduced-motion via CSS (.reveal is disabled there).
 */
export default function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const Tag = as

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let off = () => {}
    const reveal = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (r.top < vh - 60) {
        el.classList.add('revealed')
        off()
      }
    }
    off = onScrollTick(reveal)
    return off
  }, [])

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node
      }}
      className={`reveal ${delay ? `reveal-d${delay}` : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}