import { useEffect, useRef } from 'react'
import { ASSETS } from '../config'
import { onScrollTick } from '../lib/scroll'

const smooth = (t: number) => t * t * (3 - 2 * t)

/**
 * Light-premium hero atmosphere layer.
 *
 * Composition (bottom → top):
 *   1. Mol/hero-background.mp4 (full-bleed, muted, loop — all devices)
 *   2. soft ivory wash + warm gradient (keeps text legible on light)
 *   3. Three.js universe — transparent canvas paints the globe ON TOP
 *   4. vignette + foreground content
 *
 * Interactivity:
 *   - scroll: the video belongs to the hero — it fades out by the time the
 *     services section arrives (the light page takes over), gently zooming
 *     and rising as it goes
 *   - pointer: the inner layer drifts opposite the cursor (mouse parallax);
 *     skipped for coarse pointers and reduced-motion users
 */
export default function HeroVideoLayer() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)

  const coarse = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches

  /* Autoplay robustness: iOS/Safari needs the muted flag set programmatically
     before play(); a canplay retry covers slow starts. If autoplay is still
     blocked the poster frame keeps the hero visual intact. */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      return
    }
    const tryPlay = () => {
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
    tryPlay()
    v.addEventListener('canplay', tryPlay)
    return () => v.removeEventListener('canplay', tryPlay)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const offScroll = onScrollTick(() => {
      const root = rootRef.current
      if (!root) return
      const hero = document.getElementById('home')
      if (!hero) return
      const r = hero.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)))
      const fade = 1 - smooth(Math.min(1, Math.max(0, (p - 0.18) / 0.28)))
      root.style.opacity = fade.toFixed(3)
      if (!reduced) {
        const zoom = 1 + 0.05 * smooth(p)
        root.style.transform = `scale(${zoom.toFixed(3)}) translateY(${(-p * 4).toFixed(2)}vh)`
      }
    })

    if (reduced || coarse) return offScroll

    /* Mouse parallax: inner layer drifts opposite the cursor */
    let tx = 0
    let ty = 0
    let rx = 0
    let ry = 0
    let raf = 0
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = () => {
      const inner = innerRef.current
      if (!inner) return
      rx += (tx - rx) * 0.06
      ry += (ty - ry) * 0.06
      inner.style.transform = `translate3d(${(rx * 14).toFixed(2)}px, ${(ry * 10).toFixed(2)}px, 0) scale(1.06)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      offScroll()
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div ref={innerRef} className="absolute -inset-4 will-change-transform">
        {/* Portrait 540x960 source: cover + center crop keeps the central visual
            area on portrait phones (only the side edges are cropped) and the
            middle band on landscape phones. Poster covers pre-play/blocked states. */}
        <video
          ref={videoRef}
          className="size-full bg-onyx-950 object-cover"
          style={coarse ? { objectPosition: 'center' } : undefined}
          src={ASSETS.heroVideo}
          poster={ASSETS.heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        {/* Dark graphite wash + gradient — keeps text legible, video stays visible */}
        <div className="absolute inset-0 bg-[#0a0c10]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10]/85 via-[#0a0c10]/15 to-[#0a0c10]/55" />
      </div>
    </div>
  )
}