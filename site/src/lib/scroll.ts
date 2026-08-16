/**
 * Lightweight scroll engine (no dependencies).
 * Tracks global scroll progress, the current cinematic phase and
 * the local progress inside it. The 3D universe reads this state
 * directly in useFrame — no React re-renders per frame.
 */

export interface ScrollState {
  /** Global scroll progress 0..1 (document). */
  progress: number
  /** Current phase: 0 hero, 1 services, 2 sourcing, 3 catalog, 4 about, 5 contact. */
  phase: number
  /** Local progress 0..1 inside the current phase. */
  local: number
  /** Smoothed scroll velocity (px/s, signed). */
  velocity: number
  /**
   * Scene energy 0..1.3+: 1 = full showcase, ~0.5 inside content-heavy
   * phases (legibility), boosted while scrolling fast (transitions).
   * Smoothed — safe to read per frame.
   */
  intensity: number
}

export const PHASES = [
  'hero',
  'ecosystem',
  'differentiator',
  'services',
  'sourcing',
  'comprehensive',
  'catalog',
  'privateLabel',
  'quality',
  'logistics',
  'about',
  'trust',
  'inquiry',
  'faq',
  'contact',
] as const

const state: ScrollState = { progress: 0, phase: 0, local: 0, velocity: 0, intensity: 1 }

type TickCb = (s: ScrollState) => void
const subs = new Set<TickCb>()

let running = false
let rafId = 0
let ticking = false
let lastY = 0
let lastT = 0

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/** Read the current scroll state (scenes call this inside useFrame). */
export function getScrollState(): ScrollState {
  return state
}

export function phaseId(phase: number): (typeof PHASES)[number] {
  return PHASES[Math.min(Math.max(phase, 0), PHASES.length - 1)]
}

/** Subscribe to scroll ticks (returns unsubscribe). */
export function onScrollTick(cb: TickCb): () => void {
  subs.add(cb)
  cb(state)
  return () => {
    subs.delete(cb)
  }
}

function update() {
  ticking = false
  const now = performance.now()
  const y = window.scrollY
  const doc = document.documentElement
  const h = Math.max(1, doc.scrollHeight - window.innerHeight)
  const dt = Math.max(now - lastT, 8) / 1000
  const dy = y - lastY
  lastY = y
  lastT = now

  const vel = dy / dt
  state.velocity += (vel - state.velocity) * Math.min(1, dt * 3)

  state.progress = clamp01(y / h)

  const abs = [0]
  for (let i = 1; i < PHASES.length; i++) {
    const el = document.getElementById(PHASES[i])
    abs.push(el ? el.getBoundingClientRect().top + y : -1)
  }
  abs.push(h)

  let ph = 0
  for (let i = 1; i < abs.length - 1; i++) if (y >= abs[i]) ph = i
  state.phase = Math.min(ph, PHASES.length - 1)
  const span = abs[state.phase + 1] - abs[state.phase]
  state.local = span > 0 ? clamp01((y - abs[state.phase]) / span) : 0

  // Scene energy: full at phase boundaries (transitions), dimmed inside
  // content-heavy phases so text stays legible; fast scrolling adds punch.
  const dist = Math.min(state.local, 1 - state.local)
  const phaseDim = state.phase === 0 ? 1 : 1 - 0.5 * clamp01(dist * 2.4)
  const velBoost = 1 + Math.min(0.35, Math.abs(state.velocity) / 5000)
  const target = phaseDim * velBoost
  state.intensity += (target - state.intensity) * Math.min(1, dt * 5)

  subs.forEach((cb) => cb(state))
}

/** Start the engine (idempotent). Call once from App. */
export function startScrollEngine(): () => void {
  if (running) return () => {}
  running = true
  lastY = window.scrollY
  lastT = performance.now()

  const onScroll = () => {
    if (!ticking) {
      ticking = true
      rafId = requestAnimationFrame(update)
    }
  }
  const onResize = onScroll

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  update()

  return () => {
    running = false
    cancelAnimationFrame(rafId)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onResize)
  }
}