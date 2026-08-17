import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { getScrollState, onScrollTick } from '../../lib/scroll'
import type { DeviceProfile } from '../../lib/device'

const R = 1.5
const HOME = [0, 0.35, 6.4] as const

const smooth = (t: number) => t * t * (3 - 2 * t)

/* Eased keyframe envelope: progress -> value */
function envelope(p: number, keys: Array<[number, number]>) {
  if (p <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i][0]) {
      const [p0, v0] = keys[i - 1]
      const [p1, v1] = keys[i]
      const t = smooth(Math.min(1, Math.max(0, (p - p0) / (p1 - p0 || 1e-6))))
      return v0 + (v1 - v0) * t
    }
  }
  return keys[keys.length - 1][1]
}

/* ── Scroll choreography (progress-based, tuned to measured layout) ── */
/* Section ranges (desktop): hero .00-.06, ecosystem .06-.10, differentiator .10-.15,
   services .15-.26, sourcing .26-.34, comprehensive .34-.42, catalog .42-.55,
   privateLabel .55-.62, quality .62-.67, logistics .67-.72, about .72-.77,
   trust .77-.84, inquiry .84-.91, faq .91-.96, contact .96-1 */
const EARTH_KEYS: Array<[number, number]> = [
  [0, 1],
  [0.06, 0.9],
  [0.12, 0.55],
  [0.2, 0.3],
  [0.27, 0.55],
  [0.35, 0.8],
  [0.42, 0.85],
  [0.55, 0.6],
  [0.6, 0.3],
  [0.72, 0.35],
  [0.8, 0.18],
  [0.9, 0.12],
  [1, 0.22],
]
const ROUTES_KEYS: Array<[number, number]> = [
  [0, 0],
  [0.04, 0.8],
  [0.12, 0.5],
  [0.27, 0.9],
  [0.42, 1],
  [0.55, 0.65],
  [0.6, 0.15],
  [0.72, 0.4],
  [0.82, 0.1],
  [1, 0.05],
]
const NETWORK_KEYS: Array<[number, number]> = [
  [0, 0],
  [0.15, 0.2],
  [0.27, 0.85],
  [0.42, 1],
  [0.55, 0.8],
  [0.62, 0.3],
  [0.72, 0.6],
  [0.82, 0.2],
  [1, 0.1],
]
const CHIPS_KEYS: Array<[number, number]> = [
  [0, 0],
  [0.03, 1],
  [0.26, 1],
  [0.32, 0],
  [0.84, 0],
  [0.88, 0.85],
  [0.97, 0.85],
  [1, 0.5],
]
const PARTICLES_KEYS: Array<[number, number]> = [
  [0, 0.8],
  [0.3, 0.9],
  [0.55, 1],
  [0.75, 0.9],
  [1, 0.45],
]
const ACTIVITY_KEYS: Array<[number, number]> = [
  [0, 1],
  [0.3, 1.1],
  [0.55, 0.75],
  [0.8, 0.4],
  [1, 0.3],
]

interface CamKey {
  p: number
  pos: [number, number, number]
  look: [number, number, number]
}
const CAM_KEYS: CamKey[] = [
  { p: 0, pos: [0, 0.35, 6.4], look: [0.9, 0, 0] },
  { p: 0.08, pos: [0.7, 0.45, 5.5], look: [1.15, 0.05, 0] },
  { p: 0.13, pos: [1.4, 0.55, 4.9], look: [1.45, 0.1, 0] },
  { p: 0.21, pos: [2.3, 0.7, 4.4], look: [1.75, 0.12, 0] },
  { p: 0.3, pos: [3.0, 0.85, 3.9], look: [1.95, 0.15, 0] },
  { p: 0.38, pos: [3.3, 0.9, 3.7], look: [2.0, 0.15, 0] },
  { p: 0.48, pos: [2.5, 0.35, 4.3], look: [1.2, 0, 0] },
  { p: 0.58, pos: [1.4, -0.3, 4.9], look: [0.4, -0.25, 0] },
  { p: 0.64, pos: [0.6, -0.75, 5.3], look: [-0.25, -0.32, 0] },
  { p: 0.7, pos: [-0.3, -0.95, 5.5], look: [-0.8, -0.28, 0] },
  { p: 0.75, pos: [-1.0, -0.35, 5.6], look: [-0.55, 0.05, 0] },
  { p: 0.8, pos: [-0.4, -0.05, 5.4], look: [-0.15, 0.1, 0] },
  { p: 0.87, pos: [0.3, 0.25, 5.4], look: [0.2, 0.12, 0] },
  { p: 0.93, pos: [0.15, 0.2, 5.3], look: [0.1, 0.12, 0] },
  { p: 1, pos: [0, 0.15, 5.2], look: [0, 0.12, 0] },
]

/* ── Helpers ─────────────────────────────────────────────────────── */
function ll(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta))
}

function lerpKeys(p: number, outPos: THREE.Vector3, outLook: THREE.Vector3, travel = 1) {
  let i = 0
  while (i < CAM_KEYS.length - 2 && p > CAM_KEYS[i + 1].p) i++
  const a = CAM_KEYS[i]
  const b = CAM_KEYS[i + 1]
  const t = smooth(Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p || 1e-6))))
  const px = a.pos[0] + (b.pos[0] - a.pos[0]) * t
  const py = a.pos[1] + (b.pos[1] - a.pos[1]) * t
  const pz = a.pos[2] + (b.pos[2] - a.pos[2]) * t
  outPos.set(HOME[0] + (px - HOME[0]) * travel, HOME[1] + (py - HOME[1]) * travel, HOME[2] + (pz - HOME[2]) * travel)
  outLook.set(
    a.look[0] + (b.look[0] - a.look[0]) * t,
    a.look[1] + (b.look[1] - a.look[1]) * t,
    a.look[2] + (b.look[2] - a.look[2]) * t,
  )
}

/* ── Earth: wireframe globe + trade routes + pulses + hubs ───────── */
const HUBS: Array<[number, number]> = [
  [36.7, 3.05], [41.0, 29.0], [24.4, 54.4], [48.8, 2.35], [39.9, 116.4],
  [19.0, 72.8], [-23.5, -46.6], [52.5, 13.4], [35.7, 139.7], [1.35, 103.8],
]

function Earth({ lowPower, reducedMotion }: { lowPower: boolean; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const pulseGroup = useRef<THREE.Group>(null)
  const latMat = useRef<THREE.LineBasicMaterial>(null)
  const arcsMat = useRef<THREE.LineBasicMaterial>(null)
  const ringMat = useRef<THREE.MeshBasicMaterial>(null)
  const hubMats = useRef<Array<THREE.MeshStandardMaterial | null>>([])
  const pulseMats = useRef<Array<THREE.MeshBasicMaterial | null>>([])
  const env = useRef({ earth: 1, routes: 0, activity: 1 })

  const { latGeo, arcsGeo, pulses, hubs } = useMemo(() => {
    const lat: number[] = []
    for (let la = -80; la <= 80; la += 20) {
      for (let lo = 0; lo < 360; lo += 4) {
        const a = ll(la, lo, R)
        const b = ll(la, lo + 4, R)
        lat.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    for (let lo = 0; lo < 360; lo += 20) {
      for (let la = -80; la < 80; la += 4) {
        const a = ll(la, lo, R)
        const b = ll(la + 4, lo, R)
        lat.push(a.x, a.y, a.z, b.x, b.y, b.z)
      }
    }
    const latG = new THREE.BufferGeometry()
    latG.setAttribute('position', new THREE.Float32BufferAttribute(lat, 3))

    const arcs: number[] = []
    const pulses: Array<{ curve: THREE.QuadraticBezierCurve3; t: number; speed: number; color: string }> = []
    const hubs: Array<{ pos: THREE.Vector3; color: string }> = []
    let seed = 7
    const rnd = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    const pairCount = lowPower ? 4 : 8
    for (let i = 0; i < pairCount; i++) {
      const a = HUBS[Math.floor(rnd() * HUBS.length)]
      let b = HUBS[Math.floor(rnd() * HUBS.length)]
      if (b === a) b = HUBS[(HUBS.indexOf(a) + 3) % HUBS.length]
      const p1 = ll(a[0], a[1], R)
      const p2 = ll(b[0], b[1], R)
      const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(R + 0.45 + rnd() * 0.35)
      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
      const samples = 36
      for (let s = 0; s <= samples; s++) arcs.push(...curve.getPoint(s / samples).toArray())
      pulses.push({ curve, t: (i * 0.13) % 1, speed: 0.045 + ((i * 0.021) % 0.03), color: i % 2 ? '#b32727' : '#3f7ee8' })
      hubs.push({ pos: p1, color: i % 2 ? '#a32020' : '#3f7ee8' })
      hubs.push({ pos: p2, color: i % 2 ? '#a32020' : '#3f7ee8' })
    }
    const arcsG = new THREE.BufferGeometry()
    arcsG.setAttribute('position', new THREE.Float32BufferAttribute(arcs, 3))
    return { latGeo: latG, arcsGeo: arcsG, pulses, hubs }
  }, [lowPower])

  useFrame((_, delta) => {
    const s = getScrollState()
    const I = s.intensity
    env.current.earth = envelope(s.progress, EARTH_KEYS)
    env.current.routes = envelope(s.progress, ROUTES_KEYS)
    env.current.activity = envelope(s.progress, ACTIVITY_KEYS)

    const g = group.current
    if (g) {
      g.visible = env.current.earth > 0.02
      if (!reducedMotion) g.rotation.y += delta * 0.09 * env.current.activity * (0.5 + 0.5 * I)
    }
    if (latMat.current) latMat.current.opacity = 0.4 * env.current.earth * I
    if (ringMat.current) ringMat.current.opacity = 0.3 * env.current.earth * I
    if (arcsMat.current) arcsMat.current.opacity = 0.6 * env.current.routes * I

    hubMats.current.forEach((m) => {
      if (m) m.emissiveIntensity = (1.1 * env.current.routes + 0.15 * env.current.earth) * I
    })

    const pg = pulseGroup.current
    if (pg && !reducedMotion) {
      pg.children.forEach((child, idx) => {
        const def = pulses[idx]
        if (def && child instanceof THREE.Mesh) {
          def.t = (def.t + delta * def.speed) % 1
          child.position.copy(def.curve.getPoint(def.t))
          const m = pulseMats.current[idx]
          if (m) m.opacity = 0.9 * env.current.routes * I
        }
      })
    }
  })

  return (
    <group position={[1.9, 0.05, 0]}>
      {/* Outer aura ring */}
      <mesh rotation={[Math.PI / 2.55, 0, -0.35]}>
        <torusGeometry args={[R * 1.34, 0.004, 8, 128]} />
        <meshBasicMaterial color="#3f7ee8" transparent opacity={0.3} ref={ringMat} />
      </mesh>
      <group ref={group}>
        <lineSegments geometry={latGeo}>
          <lineBasicMaterial color="#3f7ee8" transparent opacity={0.4} ref={latMat} />
        </lineSegments>
        <lineSegments geometry={arcsGeo}>
          <lineBasicMaterial color="#b32727" transparent opacity={0.6} ref={arcsMat} />
        </lineSegments>
        <group ref={pulseGroup}>
          {pulses.map((p, i) => (
            <mesh key={`pulse-${i}`} position={[0, -9, 0]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial color={p.color} transparent opacity={0} ref={(m) => { pulseMats.current[i] = m }} />
            </mesh>
          ))}
        </group>
        {hubs.map((h, i) => (
          <mesh key={`hub-${i}`} position={h.pos}>
            <sphereGeometry args={[0.05, 10, 10]} />
            <meshStandardMaterial
              color={h.color}
              emissive={h.color}
              emissiveIntensity={1}
              roughness={0.3}
              metalness={0.4}
              ref={(m) => { hubMats.current[i] = m }}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ── Global buyer/supplier network (sourcing phase) ───────────────── */
function Network({ lowPower, reducedMotion }: { lowPower: boolean; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const connMat = useRef<THREE.LineDashedMaterial>(null)
  const nodeMats = useRef<Array<THREE.MeshStandardMaterial | null>>([])
  const hubMat = useRef<THREE.MeshStandardMaterial>(null)
  const env = useRef({ vis: 0, activity: 1 })

  const { nodes, connGeo } = useMemo(() => {
    const count = lowPower ? 7 : 9
    const RING = 2.1
    const nodes: Array<{ pos: THREE.Vector3; color: string }> = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = RING * (0.8 + ((i * 37) % 40) / 100)
      const y = Math.sin(i * 1.9) * 0.55
      nodes.push({
        pos: new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius),
        color: i % 2 === 0 ? '#3f7ee8' : '#b32727',
      })
    }
    const lines: THREE.Vector3[][] = []
    for (const n of nodes) lines.push([new THREE.Vector3(0, 0, 0), n.pos])
    for (let i = 0; i < nodes.length; i++) lines.push([nodes[i].pos, nodes[(i + 1) % nodes.length].pos])
    lines.push([nodes[0].pos, nodes[4].pos])
    if (nodes.length > 7) lines.push([nodes[2].pos, nodes[7].pos])
    const positions: number[] = []
    for (const [a, b] of lines) positions.push(a.x, a.y, a.z, b.x, b.y, b.z)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return { nodes, connGeo: g }
  }, [lowPower])

  useFrame((state, delta) => {
    const s = getScrollState()
    const I = s.intensity
    env.current.vis = envelope(s.progress, NETWORK_KEYS)
    env.current.activity = envelope(s.progress, ACTIVITY_KEYS)
    const g = group.current
    if (g) {
      g.visible = env.current.vis > 0.02
      if (!reducedMotion) g.rotation.y += delta * 0.06 * env.current.activity * (0.5 + 0.5 * I)
    }
    if (connMat.current) {
      connMat.current.opacity = 0.55 * env.current.vis * I
      ;(connMat.current as unknown as { dashOffset: number }).dashOffset -= delta * 0.05 * env.current.activity * I
    }
    if (hubMat.current) hubMat.current.emissiveIntensity = (0.5 + 0.8 * env.current.vis) * I
    const t = state.clock.elapsedTime
    nodeMats.current.forEach((m, i) => {
      if (!m) return
      const stagger = Math.min(1, Math.max(0, s.local * 1.7 - i * 0.1))
      m.opacity = env.current.vis * smooth(stagger) * I
      if (!reducedMotion) {
        const scale = 1 + Math.sin(t * 1.2 + i * 1.7) * 0.12 * env.current.activity
        m.color.set(nodes[i].color).multiplyScalar(scale > 1 ? 1 : 0.9)
      }
    })
  })

  return (
    <group position={[-2.6, 0.15, 0]} ref={group} visible={false}>
      <lineSegments geometry={connGeo}>
        <lineDashedMaterial color="#3f7ee8" dashSize={0.14} gapSize={0.1} transparent opacity={0} ref={connMat} />
      </lineSegments>
      <mesh>
        <torusGeometry args={[0.42, 0.02, 12, 48]} />
        <meshStandardMaterial color="#3f7ee8" emissive="#3f7ee8" emissiveIntensity={0.5} metalness={0.7} roughness={0.3} ref={hubMat} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#3f7ee8" emissive="#3f7ee8" emissiveIntensity={1.2} />
      </mesh>
      {nodes.map((n, i) => (
        <mesh key={`n-${i}`} position={n.pos}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={0.9}
            roughness={0.25}
            metalness={0.5}
            transparent
            opacity={0}
            ref={(m) => { nodeMats.current[i] = m }}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ── Ambient particle field (catalog/atmosphere phase) ────────────── */
function Particles({ lowPower, reducedMotion }: { lowPower: boolean; reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const mat = useRef<THREE.PointsMaterial>(null)
  const count = lowPower ? 110 : 300

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const crimson = new THREE.Color('#b32727')
    const blue = new THREE.Color('#3f7ee8')
    for (let i = 0; i < count; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(2.2 + Math.random() * 5)
      positions.set([v.x, v.y, v.z], i * 3)
      const roll = Math.random()
      const c = roll > 0.8 ? crimson : roll > 0.55 ? blue : new THREE.Color('#6f9ef0')
      colors.set([c.r, c.g, c.b], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return g
  }, [count])

  useFrame((_, delta) => {
    const s = getScrollState()
    const v = envelope(s.progress, PARTICLES_KEYS)
    if (mat.current) mat.current.opacity = 0.75 * v * s.intensity
    if (ref.current && !reducedMotion) ref.current.rotation.y += delta * 0.018 * (0.6 + v)
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        ref={mat}
      />
    </points>
  )
}

/* ── Floating data chips (digital/services phase) ─────────────────── */
function DataChips({ lowPower, reducedMotion }: { lowPower: boolean; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  const mats = useRef<Array<THREE.MeshBasicMaterial | null>>([])

  const chips = useMemo(() => {
    const base: Array<[number, number, number, string]> = lowPower
      ? [
          [0.9, 1.25, -0.7, '#3f7ee8'],
          [2.5, 0.85, 0.3, '#3a6fd6'],
          [1.3, -1.1, 0.8, '#b32727'],
        ]
      : [
          [0.9, 1.25, -0.7, '#3f7ee8'],
          [2.5, 0.85, 0.3, '#3a6fd6'],
          [1.3, -1.1, 0.8, '#b32727'],
          [-0.7, 1.5, -1.2, '#3f7ee8'],
          [0.25, -1.55, 0.15, '#3a6fd6'],
          [3.1, -0.4, -0.6, '#b32727'],
        ]
    return base.map(([x, y, z, c], i) => ({
      pos: new THREE.Vector3(x, y, z),
      color: c,
      phase: i * 0.6,
      size: 0.055 + ((i * 37) % 20) / 1000,
    }))
  }, [lowPower])

  useFrame((state) => {
    const s = getScrollState()
    const vis = envelope(s.progress, CHIPS_KEYS)
    const g = group.current
    if (g) g.visible = vis > 0.02
    const t = state.clock.elapsedTime
    mats.current.forEach((m, i) => {
      if (!m) return
      m.opacity = vis * (0.55 + 0.35 * Math.sin(t * 1.6 + chips[i].phase)) * s.intensity
    })
    if (g && !reducedMotion) {
      g.children.forEach((child, i) => {
        child.position.y = chips[i].pos.y + Math.sin(t * 0.8 + chips[i].phase) * 0.18
        child.rotation.z = Math.sin(t * 0.5 + chips[i].phase) * 0.3
      })
    }
  })

  return (
    <group ref={group} visible={false}>
      {chips.map((c, i) => (
        <mesh key={`chip-${i}`} position={c.pos}>
          <boxGeometry args={[c.size * 2, c.size * 2, c.size * 0.35]} />
          <meshBasicMaterial color={c.color} transparent opacity={0} ref={(m) => { mats.current[i] = m }} />
        </mesh>
      ))}
    </group>
  )
}

/* ── Camera rig: leads the narrative, damped path + idle drift ────── */
function CameraRig({ reducedMotion, lowPower }: { reducedMotion: boolean; lowPower: boolean }) {
  const cur = useMemo(() => new THREE.Vector3(0, 0.35, 6.4), [])
  const look = useMemo(() => new THREE.Vector3(0.9, 0, 0), [])
  const tgt = useMemo(() => new THREE.Vector3(), [])
  const lookTgt = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const s = getScrollState()
    // Camera leads the scroll slightly so it glides into each section.
    const lead = Math.min(1, s.progress * 1.06)
    lerpKeys(lead, tgt, lookTgt, lowPower ? 0.68 : 1)
    const k = reducedMotion ? 1 : 1 - Math.exp(-delta * (lowPower ? 1.9 : 2.6))
    cur.lerp(tgt, k)
    look.lerp(lookTgt, k)
    // Continuous idle drift keeps the universe alive between sections.
    const t = state.clock.elapsedTime
    const amp = reducedMotion ? 0 : lowPower ? 0.05 : 0.11
    const swayX = Math.sin(t * 0.21) * amp
    const swayY = Math.cos(t * 0.17) * amp * 0.6
    const px = reducedMotion ? 0 : state.pointer.x * (lowPower ? 0.08 : 0.16)
    const py = reducedMotion ? 0 : state.pointer.y * (lowPower ? 0.05 : 0.1)
    state.camera.position.set(cur.x + px + swayX, cur.y + py + swayY, cur.z)
    state.camera.lookAt(look.x + px * 0.5, look.y + py * 0.5, look.z)
  })

  return null
}

/* Redraw once per scroll tick when frameloop is 'demand' */
function ScrollInvalidate({ active }: { active: boolean }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    if (!active) return
    return onScrollTick(() => invalidate())
  }, [active, invalidate])
  return null
}

function Scene({ profile }: { profile: DeviceProfile }) {
  return (
    <>
      <CameraRig reducedMotion={profile.reducedMotion} lowPower={profile.lowPower} />
      <ScrollInvalidate active={profile.reducedMotion} />
      <Earth lowPower={profile.lowPower} reducedMotion={profile.reducedMotion} />
      <Network lowPower={profile.lowPower} reducedMotion={profile.reducedMotion} />
      <Particles lowPower={profile.lowPower} reducedMotion={profile.reducedMotion} />
      <DataChips lowPower={profile.lowPower} reducedMotion={profile.reducedMotion} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#cdd6f4" />
      <pointLight position={[-5, -3, -4]} intensity={18} color="#a32020" />
      <pointLight position={[4, 3, -5]} intensity={12} color="#3a6fd6" />
    </>
  )
}

export default function UniverseScene({ profile }: { profile: DeviceProfile }) {
  return (
    <Canvas
      dpr={[1, profile.maxDpr]}
      camera={{ position: [0, 0.35, 6.4], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      frameloop={profile.reducedMotion ? 'demand' : 'always'}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <Scene profile={profile} />
    </Canvas>
  )
}