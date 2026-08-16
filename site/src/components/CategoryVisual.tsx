/**
 * CategoryVisual — local, license-clean fallback visuals for the 17 sourcing
 * categories. Hand-crafted vector art in the light-premium palette
 * (ivory / champagne / gold / crimson / graphite). Zero network dependency.
 *
 * If real photography becomes available later, replace <CategoryVisual> with
 * an <img src={`/assets/images/categories/${id}.webp`}> — the card layout
 * already supports it.
 */
import type { ReactNode } from 'react'
import type { CategoryId } from '../data/catalog'

const GRAPHITE = '#262219'
const IVORY = '#faf7f0'
const GOLD = '#c2982b'
const GOLD_LIGHT = '#d9b95c'
const GOLD_PALE = '#e8d5a0'
const CRIMSON = '#a32020'
const CRIMSON_LIGHT = '#c23a3a'

function Frame({ id, tone, children }: { id: string; tone: 'gold' | 'crimson'; children: ReactNode }) {
  const accent = tone === 'gold' ? GOLD : CRIMSON
  const accentLight = tone === 'gold' ? GOLD_LIGHT : CRIMSON_LIGHT
  return (
    <svg viewBox="0 0 400 300" className="size-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`bg-${id}`} cx="50%" cy="40%" r="78%">
          <stop offset="0%" stopColor="#fffdf8" />
          <stop offset="72%" stopColor="#f7f1e3" />
          <stop offset="100%" stopColor="#efe5d0" />
        </radialGradient>
        <radialGradient id={`halo-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentLight} stopOpacity="0.26" />
          <stop offset="100%" stopColor={accentLight} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`sh-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GRAPHITE} stopOpacity="0.22" />
          <stop offset="100%" stopColor={GRAPHITE} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`lin-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffdf8" />
          <stop offset="100%" stopColor="#f2ead8" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" rx="18" fill={`url(#bg-${id})`} />
      <circle cx="200" cy="148" r="126" fill={`url(#halo-${id})`} />
      <rect x="20" y="20" width="360" height="260" rx="14" fill="none" stroke={accent} strokeOpacity="0.32" strokeWidth="1.5" />
      <circle cx="52" cy="48" r="2.2" fill={accent} fillOpacity="0.5" />
      <circle cx="348" cy="254" r="2.6" fill={accent} fillOpacity="0.45" />
      <ellipse cx="200" cy="252" rx="108" ry="20" fill={`url(#sh-${id})`} />
      {children}
    </svg>
  )
}

function Bowl({ cx, cy, rx, ry, fill, stroke }: { cx: string | number; cy: string | number; rx: string | number; ry: string | number; fill: string; stroke: string }) {
  const x = Number(cx)
  const y = Number(cy)
  const r1 = Number(rx)
  const r2 = Number(ry)
  return <path d={`M${x - r1} ${y} A${r1} ${r2} 0 0 0 ${x + r1} ${y} Z`} fill={fill} stroke={stroke} strokeWidth="3" strokeLinecap="round" />
}

export default function CategoryVisual({ id }: { id: CategoryId }) {
  switch (id) {
    /* ── Gold tone ─────────────────────────────────────────────── */
    case 'olive-oil':
      return (
        <Frame id={id} tone="gold">
          {/* oil bottle */}
          <rect x="168" y="78" width="64" height="148" rx="16" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="192" y="46" width="16" height="36" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="186" y="36" width="28" height="14" rx="4" fill={GOLD} />
          {/* label */}
          <rect x="182" y="128" width="36" height="46" rx="6" fill={IVORY} stroke={GOLD} strokeWidth="2" />
          <circle cx="200" cy="146" r="9" fill="none" stroke={GOLD} strokeWidth="2" />
          {/* olives + dish */}
          <g>
            <circle cx="120" cy="216" r="13" fill="#7c8a45" stroke={GRAPHITE} strokeWidth="2" />
            <circle cx="146" cy="228" r="11" fill="#7c8a45" stroke={GRAPHITE} strokeWidth="2" />
            <circle cx="134" cy="232" r="8" fill="#9aaa5c" stroke={GRAPHITE} strokeWidth="2" />
            <path d="M120 203 q-6 -8 2 -10 q8 -2 6 8" fill="#7c8a45" stroke={GRAPHITE} strokeWidth="1.6" />
          </g>
          <ellipse cx="270" cy="236" rx="34" ry="12" fill={IVORY} stroke={GRAPHITE} strokeWidth="2" />
          <ellipse cx="270" cy="233" rx="24" ry="8" fill={GOLD_LIGHT} />
        </Frame>
      )
    case 'coffee':
      return (
        <Frame id={id} tone="gold">
          {/* burlap sack */}
          <rect x="96" y="108" width="96" height="112" rx="12" fill="#eadfc6" stroke={GRAPHITE} strokeWidth="2.5" />
          <path d="M126 108 v-18 q0 -10 18 -10 h12 q18 0 18 10 v18" fill="#f2ead8" stroke={GRAPHITE} strokeWidth="2.5" />
          <path d="M126 128 l26 22 m26 -22 l-26 22 m26 22 l-26 22 m-26 -22 l26 -22 m0 44 l-26 -22" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
          {/* cup */}
          <path d="M222 150 h92 l-12 62 a26 26 0 0 1 -26 22 h-16 a26 26 0 0 1 -26 -22 Z" fill={IVORY} stroke={GRAPHITE} strokeWidth="2.5" />
          <ellipse cx="268" cy="150" rx="46" ry="10" fill={GOLD} />
          <circle cx="316" cy="166" r="12" fill="none" stroke={GRAPHITE} strokeWidth="2.5" />
          <path d="M330 172 a13 13 0 0 0 2 -12" fill="none" stroke={GRAPHITE} strokeWidth="2.5" />
          {/* beans */}
          <ellipse cx="186" cy="228" rx="12" ry="7" transform="rotate(24 186 228)" fill={GOLD} stroke={GRAPHITE} strokeWidth="1.6" />
          <ellipse cx="212" cy="240" rx="11" ry="6" transform="rotate(-18 212 240)" fill={GOLD_LIGHT} stroke={GRAPHITE} strokeWidth="1.6" />
          <ellipse cx="238" cy="252" rx="10" ry="6" transform="rotate(30 238 252)" fill={GOLD} stroke={GRAPHITE} strokeWidth="1.6" />
          {/* steam */}
          <path d="M246 118 q-8 -12 4 -20 q10 -6 -2 -16" fill="none" stroke={GOLD_LIGHT} strokeWidth="3" strokeLinecap="round" />
          <path d="M272 112 q-8 -12 4 -20 q10 -6 -2 -16" fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
        </Frame>
      )
    case 'spices':
      return (
        <Frame id={id} tone="gold">
          <Bowl cx="122" cy="196" rx="54" ry="20" fill={GOLD} stroke={GRAPHITE} />
          <ellipse cx="122" cy="196" rx="54" ry="20" fill={GOLD_LIGHT} stroke="none" />
          <circle cx="104" cy="186" r="7" fill={GOLD_PALE} />
          <circle cx="132" cy="190" r="7" fill={GOLD_PALE} />
          <circle cx="144" cy="200" r="6" fill={GOLD_PALE} />
          <Bowl cx="200" cy="228" rx="58" ry="20" fill={GOLD} stroke={GRAPHITE} />
          <ellipse cx="200" cy="228" rx="58" ry="20" fill={CRIMSON} stroke="none" />
          <circle cx="182" cy="218" r="6" fill={CRIMSON_LIGHT} />
          <circle cx="206" cy="222" r="6" fill={CRIMSON_LIGHT} />
          <circle cx="222" cy="232" r="5" fill={CRIMSON_LIGHT} />
          <Bowl cx="292" cy="206" rx="46" ry="17" fill={GOLD} stroke={GRAPHITE} />
          <ellipse cx="292" cy="206" rx="46" ry="17" fill={IVORY} stroke="none" />
          <circle cx="278" cy="198" r="6" fill={IVORY} />
          <circle cx="298" cy="202" r="6" fill={IVORY} />
          <circle cx="310" cy="210" r="5" fill={IVORY} />
          {/* scattered */}
          <circle cx="120" cy="132" r="3" fill={GOLD} />
          <circle cx="162" cy="122" r="3" fill={CRIMSON} />
          <circle cx="216" cy="136" r="3" fill={GOLD} />
          <circle cx="278" cy="146" r="3" fill={CRIMSON} />
          <circle cx="318" cy="128" r="3" fill={GOLD} />
          <circle cx="180" cy="158" r="2.4" fill={GOLD} />
          <circle cx="252" cy="162" r="2.4" fill={CRIMSON} />
          <circle cx="306" cy="168" r="2.4" fill={GOLD} />
        </Frame>
      )
    case 'nuts':
      return (
        <Frame id={id} tone="gold">
          <Bowl cx="206" cy="212" rx="96" ry="30" fill={GOLD} stroke={GRAPHITE} />
          <ellipse cx="206" cy="212" rx="96" ry="30" fill={GOLD_PALE} stroke="none" />
          {/* almonds */}
          <ellipse cx="160" cy="178" rx="26" ry="13" transform="rotate(-24 160 178)" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2" />
          <ellipse cx="214" cy="170" rx="24" ry="12" transform="rotate(12 214 170)" fill={IVORY} stroke={GRAPHITE} strokeWidth="2" />
          <ellipse cx="258" cy="182" rx="24" ry="12" transform="rotate(-8 258 182)" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2" />
          <ellipse cx="188" cy="196" rx="22" ry="11" transform="rotate(26 188 196)" fill={IVORY} stroke={GRAPHITE} strokeWidth="2" />
          {/* walnuts */}
          <circle cx="238" cy="200" r="15" fill={GOLD} stroke={GRAPHITE} strokeWidth="2" />
          <path d="M228 196 q10 10 20 0" fill="none" stroke={GRAPHITE} strokeWidth="1.6" />
          <circle cx="272" cy="204" r="13" fill={GOLD_LIGHT} stroke={GRAPHITE} strokeWidth="2" />
          <path d="M264 200 q8 8 16 0" fill="none" stroke={GRAPHITE} strokeWidth="1.6" />
          <circle cx="150" cy="200" r="13" fill={GOLD_LIGHT} stroke={GRAPHITE} strokeWidth="2" />
          {/* hazelnuts */}
          <ellipse cx="178" cy="228" rx="12" ry="8" transform="rotate(-14 178 228)" fill={GOLD} stroke={GRAPHITE} strokeWidth="1.8" />
          <ellipse cx="226" cy="232" rx="12" ry="8" transform="rotate(18 226 232)" fill={GOLD} stroke={GRAPHITE} strokeWidth="1.8" />
        </Frame>
      )
    case 'dried-fruits':
      return (
        <Frame id={id} tone="gold">
          <ellipse cx="202" cy="206" rx="104" ry="34" fill={IVORY} stroke={GRAPHITE} strokeWidth="2.5" />
          <ellipse cx="202" cy="206" rx="104" ry="34" fill="none" stroke={GOLD} strokeWidth="1.5" />
          {/* apricots */}
          <circle cx="152" cy="178" r="17" fill={GOLD} stroke={GRAPHITE} strokeWidth="2" />
          <path d="M152 178 q-4 -8 4 -10 q8 -2 6 8" fill={GOLD_LIGHT} stroke="none" />
          <circle cx="176" cy="192" r="14" fill={GOLD_LIGHT} stroke={GRAPHITE} strokeWidth="2" />
          <circle cx="204" cy="178" r="15" fill={GOLD} stroke={GRAPHITE} strokeWidth="2" />
          {/* figs */}
          <path d="M244 172 q14 -4 20 8 q6 12 -6 18 q-12 6 -18 -6 q-6 -12 4 -20 Z" fill={GRAPHITE} stroke="none" opacity="0.82" />
          <path d="M262 186 q8 -2 11 4" fill="none" stroke={IVORY} strokeWidth="1.6" />
          <path d="M284 196 q10 -3 14 3 q4 6 -4 9 q-8 3 -11 -5 q-3 -8 1 -7 Z" fill={GRAPHITE} stroke="none" opacity="0.7" />
          {/* raisins */}
          <circle cx="160" cy="212" r="6" fill={GRAPHITE} />
          <circle cx="180" cy="222" r="6" fill={GRAPHITE} />
          <circle cx="202" cy="214" r="5.5" fill={GRAPHITE} />
          <circle cx="222" cy="224" r="5.5" fill={GRAPHITE} />
          <circle cx="246" cy="218" r="5" fill={GRAPHITE} />
          <circle cx="268" cy="226" r="5" fill={GRAPHITE} />
          <circle cx="286" cy="214" r="5" fill={GRAPHITE} />
        </Frame>
      )
    case 'grains':
      return (
        <Frame id={id} tone="gold">
          <rect x="118" y="142" width="108" height="100" rx="12" fill="#eadfc6" stroke={GRAPHITE} strokeWidth="2.5" />
          <path d="M146 142 v-16 q0 -10 18 -10 h16 q18 0 18 10 v16" fill="#f2ead8" stroke={GRAPHITE} strokeWidth="2.5" />
          <path d="M146 170 l30 26 m30 -26 l-30 26 m30 26 l-30 26 m-30 -26 l30 -26 m0 52 l-30 -26" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
          {/* wheat */}
          <g stroke={GRAPHITE} strokeWidth="2" fill="none">
            <path d="M296 236 q-2 -58 -4 -104" />
            <path d="M300 236 q2 -58 4 -104" />
            <path d="M298 136 q-26 -4 -20 -20 q8 8 20 8" fill={GOLD} />
            <path d="M298 156 q-28 -2 -22 -18 q8 8 22 8" fill={GOLD} />
            <path d="M298 176 q-28 -2 -22 -18 q8 8 22 8" fill={GOLD} />
            <path d="M300 138 q24 -4 18 -20 q-8 8 -18 8" fill={GOLD} />
            <path d="M300 158 q26 -2 20 -18 q-8 8 -20 8" fill={GOLD} />
            <path d="M300 178 q26 -2 20 -18 q-8 8 -20 8" fill={GOLD} />
            <path d="M298 206 q-24 2 -20 16 q8 -6 20 -6" fill={GOLD} />
            <path d="M300 206 q24 2 20 16 q-8 -6 -20 -6" fill={GOLD} />
          </g>
          <circle cx="176" cy="238" r="4" fill={GOLD} />
          <circle cx="206" cy="244" r="4" fill={GOLD} />
          <circle cx="238" cy="238" r="4" fill={GOLD} />
        </Frame>
      )
    case 'legumes':
      return (
        <Frame id={id} tone="gold">
          <Bowl cx="118" cy="196" rx="52" ry="19" fill={GOLD} stroke={GRAPHITE} />
          <ellipse cx="118" cy="196" rx="52" ry="19" fill={GOLD_PALE} stroke="none" />
          <circle cx="100" cy="188" r="6" fill={GOLD_LIGHT} />
          <circle cx="122" cy="192" r="6" fill={GOLD_LIGHT} />
          <circle cx="138" cy="200" r="5.5" fill={GOLD_LIGHT} />
          <Bowl cx="206" cy="224" rx="60" ry="20" fill={GOLD} stroke={GRAPHITE} />
          <ellipse cx="206" cy="224" rx="60" ry="20" fill={IVORY} stroke="none" />
          <circle cx="186" cy="216" r="7" fill={IVORY} />
          <circle cx="208" cy="220" r="7" fill={IVORY} />
          <circle cx="228" cy="228" r="6.5" fill={IVORY} />
          <Bowl cx="296" cy="196" rx="46" ry="17" fill={GOLD} stroke={GRAPHITE} />
          <ellipse cx="296" cy="196" rx="46" ry="17" fill={CRIMSON} stroke="none" />
          <ellipse cx="280" cy="190" rx="10" ry="6" fill={CRIMSON_LIGHT} />
          <ellipse cx="300" cy="194" rx="10" ry="6" fill={CRIMSON_LIGHT} />
          <ellipse cx="318" cy="200" rx="9" ry="5.5" fill={CRIMSON_LIGHT} />
          <path d="M96 136 q6 8 0 16" stroke={GOLD} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M146 128 q6 8 0 16" stroke={GOLD} strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M260 132 q6 8 0 16" stroke={GOLD} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </Frame>
      )
    case 'pasta':
      return (
        <Frame id={id} tone="gold">
          <Bowl cx="196" cy="208" rx="100" ry="32" fill={GOLD} stroke={GRAPHITE} />
          <ellipse cx="196" cy="208" rx="100" ry="32" fill={GOLD_PALE} stroke="none" />
          {/* spaghetti strands */}
          <g stroke={GOLD_LIGHT} strokeWidth="3.4" fill="none" strokeLinecap="round">
            <path d="M136 176 q22 -22 52 -8 q30 14 54 -6" />
            <path d="M150 196 q24 -18 52 -4 q28 14 52 -8" />
            <path d="M162 160 q20 -18 46 -8 q26 10 48 -6" />
          </g>
          {/* penne */}
          <g stroke={GRAPHITE} strokeWidth="2" fill={GOLD_PALE}>
            <rect x="242" y="148" width="30" height="14" rx="5" transform="rotate(24 257 155)" />
            <rect x="228" y="172" width="30" height="14" rx="5" transform="rotate(-14 243 179)" />
            <rect x="120" y="148" width="28" height="13" rx="5" transform="rotate(-28 134 154)" />
            <rect x="262" y="190" width="28" height="13" rx="5" transform="rotate(12 276 196)" />
            <rect x="142" y="184" width="28" height="13" rx="5" transform="rotate(36 156 190)" />
          </g>
          <circle cx="232" cy="242" r="4" fill={GOLD} />
          <circle cx="264" cy="248" r="4" fill={GOLD} />
          <circle cx="180" cy="246" r="4" fill={GOLD} />
        </Frame>
      )
    case 'canned-foods':
      return (
        <Frame id={id} tone="gold">
          <rect x="118" y="120" width="64" height="112" rx="10" fill={IVORY} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="118" y="120" width="64" height="18" rx="8" fill="#d8d2c2" />
          <rect x="128" y="154" width="44" height="30" rx="4" fill={GOLD_PALE} stroke={GOLD} strokeWidth="1.6" />
          <rect x="196" y="106" width="70" height="126" rx="10" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="196" y="106" width="70" height="20" rx="8" fill="#d8d2c2" />
          <rect x="208" y="144" width="46" height="34" rx="4" fill={CRIMSON} />
          <circle cx="231" cy="161" r="9" fill={CRIMSON_LIGHT} />
          <rect x="280" y="128" width="58" height="104" rx="10" fill={IVORY} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="280" y="128" width="58" height="16" rx="7" fill="#d8d2c2" />
          <rect x="290" y="160" width="38" height="34" rx="4" fill={GOLD_PALE} stroke={GOLD} strokeWidth="1.6" />
          {/* tomato + leaf */}
          <circle cx="231" cy="238" r="15" fill={CRIMSON} stroke={GRAPHITE} strokeWidth="2" />
          <path d="M231 222 q-8 -8 8 -10 q16 -2 8 12 q-4 6 -10 4" fill="#7c8a45" stroke={GRAPHITE} strokeWidth="1.6" />
        </Frame>
      )
    case 'honey':
      return (
        <Frame id={id} tone="gold">
          {/* honeycomb */}
          <g stroke={GOLD} strokeWidth="2.2" fill="none">
            <path d="M318 110 l14 8 0 16 -14 8 -14 -8 0 -16 Z" />
            <path d="M318 96 l14 8 0 16 -14 8 -14 -8 0 -16 Z" />
            <path d="M290 96 l14 8 0 16 -14 8 -14 -8 0 -16 Z" />
          </g>
          <path d="M318 106 l14 8 0 16 -14 8 -14 -8 0 -16 Z" fill={GOLD_LIGHT} fillOpacity="0.5" />
          {/* jar */}
          <rect x="136" y="118" width="96" height="118" rx="16" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="154" y="134" width="60" height="86" rx="10" fill={GOLD_LIGHT} />
          <path d="M158 148 q20 10 52 0" fill="none" stroke={GOLD} strokeWidth="2.4" />
          <path d="M158 190 q20 10 52 0" fill="none" stroke={GOLD} strokeWidth="2.4" />
          <rect x="176" y="96" width="16" height="26" fill={GRAPHITE} />
          <rect x="168" y="86" width="32" height="14" rx="5" fill={GRAPHITE} />
          {/* dipper */}
          <line x1="262" y1="96" x2="228" y2="168" stroke={GRAPHITE} strokeWidth="5" strokeLinecap="round" />
          <circle cx="222" cy="182" r="13" fill={GOLD} stroke={GRAPHITE} strokeWidth="2.5" />
          <path d="M212 190 q10 8 20 0 q-4 12 -10 12 q-6 0 -10 -12 Z" fill={GOLD_LIGHT} />
          {/* drip */}
          <path d="M236 224 q-4 18 4 26 q8 8 4 22" fill="none" stroke={GOLD_LIGHT} strokeWidth="4" strokeLinecap="round" />
        </Frame>
      )
    case 'sauces':
      return (
        <Frame id={id} tone="gold">
          <rect x="104" y="96" width="56" height="140" rx="14" fill={IVORY} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="122" y="70" width="20" height="30" fill={IVORY} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="114" y="60" width="36" height="14" rx="4" fill={CRIMSON} />
          <rect x="114" y="140" width="36" height="46" rx="5" fill={IVORY} stroke={GOLD} strokeWidth="1.8" />
          <circle cx="132" cy="163" r="8" fill="none" stroke={GOLD} strokeWidth="1.8" />
          <rect x="196" y="84" width="62" height="152" rx="16" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="216" y="58" width="22" height="30" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="208" y="48" width="38" height="14" rx="4" fill={GOLD} />
          <rect x="208" y="128" width="38" height="48" rx="5" fill={IVORY} stroke={GOLD} strokeWidth="1.8" />
          <rect x="218" y="140" width="18" height="24" rx="3" fill={GOLD_LIGHT} />
          {/* herb sprig */}
          <g stroke={GRAPHITE} strokeWidth="2" fill="none">
            <path d="M290 236 q-4 -40 -2 -64" />
            <path d="M288 200 q-14 -2 -14 -12 q8 6 14 6" fill="#7c8a45" />
            <path d="M288 176 q-14 -2 -14 -12 q8 6 14 6" fill="#7c8a45" />
            <path d="M290 220 q14 -2 14 -12 q-8 6 -14 6" fill="#7c8a45" />
          </g>
          {/* oil bowl */}
          <ellipse cx="300" cy="240" rx="26" ry="10" fill={IVORY} stroke={GRAPHITE} strokeWidth="2" />
          <ellipse cx="300" cy="238" rx="18" ry="6.5" fill={GOLD_LIGHT} />
        </Frame>
      )
    case 'confectionery':
      return (
        <Frame id={id} tone="gold">
          <ellipse cx="200" cy="210" rx="112" ry="36" fill={IVORY} stroke={GRAPHITE} strokeWidth="2.5" />
          <ellipse cx="200" cy="210" rx="112" ry="36" fill="none" stroke={GOLD} strokeWidth="1.5" />
          <circle cx="148" cy="178" r="19" fill={GOLD} stroke={GRAPHITE} strokeWidth="2" />
          <path d="M148 178 q-5 -9 5 -11 q10 -2 7 9" fill="none" stroke={IVORY} strokeWidth="2" strokeLinecap="round" />
          <circle cx="196" cy="172" r="17" fill={GOLD_LIGHT} stroke={GRAPHITE} strokeWidth="2" />
          <path d="M196 172 q-5 -8 4 -10 q9 -2 7 8" fill="none" stroke={IVORY} strokeWidth="2" strokeLinecap="round" />
          <circle cx="242" cy="182" r="18" fill={GOLD} stroke={GRAPHITE} strokeWidth="2" />
          <path d="M242 182 q-5 -9 5 -11 q10 -2 7 9" fill="none" stroke={IVORY} strokeWidth="2" strokeLinecap="round" />
          <rect x="162" y="204" width="26" height="26" rx="6" fill={CRIMSON} stroke={GRAPHITE} strokeWidth="2" />
          <rect x="170" y="212" width="10" height="10" rx="2" fill={CRIMSON_LIGHT} />
          <circle cx="216" cy="212" r="14" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2" />
          <circle cx="222" cy="218" r="5" fill={IVORY} fillOpacity="0.6" />
          <circle cx="250" cy="208" r="13" fill={GOLD} stroke={GRAPHITE} strokeWidth="2" />
          <path d="M250 208 q-4 -7 4 -9 q8 -2 6 7" fill="none" stroke={IVORY} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="174" cy="238" r="5" fill={GOLD_LIGHT} />
          <circle cx="230" cy="240" r="5" fill={GOLD} />
        </Frame>
      )

    /* ── Crimson tone ───────────────────────────────────────────── */
    case 'dates':
      return (
        <Frame id={id} tone="crimson">
          <Bowl cx="204" cy="216" rx="102" ry="32" fill={GRAPHITE} stroke={GRAPHITE} />
          <ellipse cx="204" cy="216" rx="102" ry="32" fill={GOLD} stroke="none" />
          <ellipse cx="204" cy="216" rx="102" ry="32" fill="none" stroke={GRAPHITE} strokeWidth="2.5" />
          {/* dates pile */}
          <g fill={CRIMSON_LIGHT} stroke={GRAPHITE} strokeWidth="2">
            <ellipse cx="170" cy="176" rx="26" ry="15" transform="rotate(-14 170 176)" />
            <ellipse cx="216" cy="168" rx="27" ry="15" transform="rotate(10 216 168)" />
            <ellipse cx="252" cy="180" rx="24" ry="14" transform="rotate(22 252 180)" />
            <ellipse cx="192" cy="194" rx="25" ry="14" transform="rotate(-26 192 194)" />
            <ellipse cx="240" cy="194" rx="23" ry="13" transform="rotate(6 240 194)" />
          </g>
          <path d="M172 176 q-8 -16 6 -20 q14 -4 12 14" fill="#9e2a1f" stroke="none" />
          <path d="M222 172 q-8 -16 6 -20 q14 -4 12 14" fill="#9e2a1f" stroke="none" />
          <ellipse cx="150" cy="200" rx="20" ry="12" transform="rotate(-30 150 200)" fill={CRIMSON_LIGHT} stroke={GRAPHITE} strokeWidth="2" />
          {/* one date */}
          <ellipse cx="302" cy="238" rx="26" ry="13" transform="rotate(-16 302 238)" fill={CRIMSON_LIGHT} stroke={GRAPHITE} strokeWidth="2" />
          <path d="M282 234 q-8 -14 4 -17 q12 -3 10 12" fill="#9e2a1f" stroke="none" />
          <path d="M310 244 q8 10 2 16" stroke={GRAPHITE} strokeWidth="2" fill="none" strokeLinecap="round" />
        </Frame>
      )
    case 'tea':
      return (
        <Frame id={id} tone="crimson">
          {/* teapot */}
          <path d="M172 128 q10 -16 44 -16 q34 0 44 16 l14 52 a34 34 0 0 1 -34 40 h-48 a34 34 0 0 1 -34 -40 Z" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2.5" />
          <circle cx="218" cy="140" r="12" fill={CRIMSON_LIGHT} stroke={GRAPHITE} strokeWidth="2" />
          <path d="M260 136 q22 -4 26 -16 q4 -10 -8 -14" fill="none" stroke={GRAPHITE} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M148 116 q-4 -14 10 -16" fill="none" stroke={GRAPHITE} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M126 108 q10 -6 18 -2" fill="none" stroke={GRAPHITE} strokeWidth="2.5" strokeLinecap="round" />
          {/* cup */}
          <path d="M96 210 h64 l-6 26 a16 16 0 0 1 -16 12 h-20 a16 16 0 0 1 -16 -12 Z" fill={IVORY} stroke={GRAPHITE} strokeWidth="2.5" />
          <ellipse cx="128" cy="210" rx="32" ry="7" fill={GOLD_LIGHT} />
          {/* leaves */}
          <g stroke={GRAPHITE} strokeWidth="2" fill="none">
            <path d="M262 236 q-2 -46 2 -78" />
            <path d="M264 196 q-16 -2 -16 -13 q9 6 16 5" fill="#7c8a45" />
            <path d="M264 168 q-16 -2 -16 -13 q9 6 16 5" fill="#7c8a45" />
            <path d="M266 220 q16 -2 16 -13 q-9 6 -16 5" fill="#7c8a45" />
          </g>
          <circle cx="298" cy="238" r="4" fill={GOLD} />
          {/* steam */}
          <path d="M224 84 q-6 -10 3 -16 q8 -5 -2 -14" fill="none" stroke={CRIMSON_LIGHT} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M206 82 q-6 -10 3 -16 q8 -5 -2 -14" fill="none" stroke={CRIMSON} strokeWidth="2.6" strokeLinecap="round" />
        </Frame>
      )
    case 'dairy':
      return (
        <Frame id={id} tone="crimson">
          {/* cheese wedge */}
          <path d="M136 170 L264 132 L296 214 L168 244 Z" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M136 170 L264 132 L296 214 L168 244 Z" fill="none" stroke={GOLD} strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="206" cy="178" r="7" fill={CRIMSON_LIGHT} />
          <circle cx="244" cy="166" r="6" fill={CRIMSON_LIGHT} />
          <circle cx="258" cy="196" r="6" fill={CRIMSON_LIGHT} />
          <circle cx="222" cy="210" r="5" fill={CRIMSON_LIGHT} />
          <circle cx="182" cy="204" r="5" fill={CRIMSON_LIGHT} />
          {/* milk bottle */}
          <rect x="60" y="120" width="52" height="116" rx="12" fill={IVORY} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="74" y="92" width="24" height="32" fill={IVORY} stroke={GRAPHITE} strokeWidth="2.5" />
          <rect x="70" y="84" width="32" height="12" rx="4" fill={GRAPHITE} />
          <rect x="70" y="158" width="32" height="42" rx="5" fill={IVORY} stroke={CRIMSON} strokeWidth="1.8" />
          {/* cream */}
          <path d="M290 150 q12 8 24 0" fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
          <path d="M286 164 q12 8 24 0" fill="none" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
          <circle cx="314" cy="196" r="8" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="1.8" />
        </Frame>
      )
    case 'frozen-foods':
      return (
        <Frame id={id} tone="gold">
          {/* ice block */}
          <g>
            <path d="M118 196 L168 158 L210 182 L166 220 Z" fill={IVORY} stroke={GRAPHITE} strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M166 220 L210 182 L252 206 L206 242 Z" fill="#f2ead8" stroke={GRAPHITE} strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M118 196 L166 220 L206 242 L206 242 L156 244 Z" fill="#e8dcc2" stroke={GRAPHITE} strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M168 158 L210 182 L252 206 L218 152 Z" fill="#fffdf8" stroke={GRAPHITE} strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M196 168 l18 12 m-6 -18 l18 12" stroke={IVORY} strokeWidth="2.4" strokeLinecap="round" />
          </g>
          {/* berries */}
          <circle cx="268" cy="170" r="16" fill={CRIMSON} stroke={GRAPHITE} strokeWidth="2" />
          <circle cx="284" cy="182" r="13" fill={CRIMSON_LIGHT} stroke={GRAPHITE} strokeWidth="2" />
          <circle cx="258" cy="194" r="12" fill={CRIMSON} stroke={GRAPHITE} strokeWidth="2" />
          <circle cx="280" cy="164" r="9" fill={CRIMSON_LIGHT} stroke={GRAPHITE} strokeWidth="2" />
          <circle cx="270" cy="176" r="3" fill={IVORY} />
          <circle cx="282" cy="186" r="2.6" fill={IVORY} />
          {/* frost dots */}
          <circle cx="130" cy="136" r="3" fill={GOLD_LIGHT} />
          <circle cx="170" cy="122" r="2.4" fill={GOLD_LIGHT} />
          <circle cx="224" cy="130" r="2.6" fill={GOLD_LIGHT} />
          <circle cx="306" cy="226" r="2.6" fill={GOLD_LIGHT} />
          <circle cx="132" cy="240" r="2.4" fill={GOLD_LIGHT} />
        </Frame>
      )
    case 'seafood':
      return (
        <Frame id={id} tone="crimson">
          {/* whole fish */}
          <g>
            <path d="M96 168 q104 -44 190 -6 q-10 26 -36 34 q-4 30 -44 30 q-40 0 -66 -18 q-20 12 -44 -4 Z" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="262" cy="164" r="7" fill={GRAPHITE} />
            <circle cx="264" cy="162" r="2.6" fill={IVORY} />
            <path d="M214 148 q10 12 20 12 q10 0 20 -12" fill="none" stroke={GRAPHITE} strokeWidth="2" />
            <path d="M230 142 v12 m14 -10 v10" stroke={GRAPHITE} strokeWidth="2" />
            <path d="M118 176 q-14 4 -20 -2 q6 -8 22 -4" fill="#eadfc6" stroke={GRAPHITE} strokeWidth="1.8" />
          </g>
          {/* shrimp */}
          <path d="M268 236 q34 -14 52 -40 q8 -12 -2 -18 q-12 8 -34 30 q-24 18 -34 16 q-14 -2 -12 10 q4 12 30 2" fill={CRIMSON_LIGHT} stroke={GRAPHITE} strokeWidth="2.2" />
          <path d="M314 182 q8 4 12 0" stroke={GRAPHITE} strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M292 214 q-6 10 -4 14" stroke={GRAPHITE} strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* ice */}
          <path d="M96 238 l26 -14 22 10 24 -12 22 12 26 -14 26 10 18 -10 24 18 -12 12 -152 6 Z" fill={IVORY} stroke={GRAPHITE} strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
          <path d="M126 230 l20 -8 m-10 16 l20 -8" stroke={GOLD_LIGHT} strokeWidth="2" strokeLinecap="round" />
        </Frame>
      )

    /* fallback guard — never reached, but keeps TS exhaustive */
    default:
      return <Frame id={id} tone="gold"><circle cx="200" cy="150" r="60" fill={GOLD_PALE} stroke={GRAPHITE} strokeWidth="2.5" /></Frame>
  }
}