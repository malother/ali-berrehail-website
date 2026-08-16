import type { ComponentType, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  'aria-hidden': true,
} as const

/* ── General icons ─────────────────────────────────────────── */

export const IconGlobe = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
)

export const IconShield = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z" />
    <path d="m8.5 11.5 2.5 2.5 5-5.5" />
  </svg>
)

export const IconBolt = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2Z" />
  </svg>
)

export const IconCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12 5 5L20 7" />
  </svg>
)

export const IconArrow = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14m0 0-6-6m6 6-6 6" />
  </svg>
)

export const IconMail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

export const IconPhone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 4h4l1.5 4.5-2.2 1.6a12 12 0 0 0 5.6 5.6l1.6-2.2L20 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
)

export const IconWhatsApp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.7-2-1-1 .8a4 4 0 0 1-1.6-1.6l.8-1-1-2L9 9.5Z" />
  </svg>
)

export const IconMenu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconClose = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const IconChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const IconChevronUp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 15 6-6 6 6" />
  </svg>
)

export const IconTrend = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
)

export const IconUsers = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c.8-3.2 3.2-5 6.5-5s5.7 1.8 6.5 5" />
    <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M17.5 15.4c2 .7 3.3 2.2 4 4.6" />
  </svg>
)

export const IconChart = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
)

export const IconShip = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 16 5 8h14l2 8" />
    <path d="M5 8V5h14v3" />
    <path d="M3 20c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />
  </svg>
)

export const IconTarget = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)

export const IconSpark = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3c.6 3.8 2.6 5.8 6.5 6.5-3.9.7-5.9 2.7-6.5 6.5-.6-3.8-2.6-5.8-6.5-6.5 3.9-.7 5.9-2.7 6.5-6.5Z" />
  </svg>
)

export const IconLayers = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5M3 17l9 5 9-5" opacity="0.6" />
  </svg>
)

export const IconSearch = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const IconBox = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" />
    <path d="M3 7.5 12 12l9-4.5M12 12v9" />
    <path d="M7.5 5 16.5 9.5" opacity="0.6" />
  </svg>
)

export const IconClipboard = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="5" y="4" width="14" height="17" rx="2.5" />
    <path d="M9 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
    <path d="M9 10h6M9 14h6M9 18h3.5" opacity="0.7" />
  </svg>
)

export const IconTruck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2 6h12v10H2V6Z" />
    <path d="M14 9h4l3 3v4h-7V9Z" />
    <circle cx="6" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
    <path d="M6 18h2M15 18h2" opacity="0.5" />
  </svg>
)

export const IconRoute = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="5" r="2" />
    <path d="M7 19h7a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h7" />
  </svg>
)

export const IconTag = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 11V4a1 1 0 0 1 1-1h7l9 9-8 8-9-9Z" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)

export const IconFileText = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 3h8l4 4v14H6V3Z" />
    <path d="M14 3v4h4" />
    <path d="M9 12h6M9 16h6" opacity="0.7" />
  </svg>
)

export const IconFlask = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 3h6M10 3v6l-5.5 9a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V3" />
    <path d="M7.5 15h9" opacity="0.7" />
  </svg>
)

export const IconRefresh = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
    <path d="M18 3v4h-4M6 21v-4h4" />
  </svg>
)

/* ── Category icons (17) ───────────────────────────────────── */

export const IconOliveOil = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21c-5 0-8-3-8-7.5C4 9 9 6 12 3c3 3 8 6 8 10.5C20 18 17 21 12 21Z" />
    <path d="M9 14a3 3 0 0 0 3 3" />
    <path d="M12 5.5v1.5" />
  </svg>
)

export const IconDates = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3s-5 5-5 10a5 5 0 0 0 10 0c0-5-5-10-5-10Z" />
    <path d="M7 13a5 5 0 0 0 5 5" opacity="0.7" />
    <path d="M12 3v3M12 8v2M12 12.5v1.5" opacity="0.7" />
  </svg>
)

export const IconCoffee = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" />
    <path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17" />
    <path d="M8 4.5c0-1 1-1 1-2M12 4.5c0-1 1-1 1-2" opacity="0.7" />
  </svg>
)

export const IconTea = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 11h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-5Z" />
    <path d="M16 12h1.5a2.5 2.5 0 0 1 0 5H16" />
    <path d="M8 7.5 10.5 5 8 2.5" />
  </svg>
)

export const IconSpices = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3a9 9 0 0 1 9 9h-4a5 5 0 0 0-10 0H3a9 9 0 0 1 9-9Z" />
    <path d="M12 12 6.5 20a3 3 0 0 0 2.5 1h6a3 3 0 0 0 2.5-1L12 12Z" />
  </svg>
)

export const IconNuts = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 4c-1.5 0-2.5 1-3 2.5C7.5 6.5 6 7.5 5.5 9.5 5 11.5 5.5 13.5 7 15c1 1.5 2.5 2.5 4.5 3 1.5.5 3.5 0 5-1 1.5-1.5 2-3.5 1.5-5.5C17.5 9.5 15.5 8 13.5 8 13 6.5 12 4 12 4Z" />
    <path d="M12 8v10" opacity="0.7" />
  </svg>
)

export const IconDriedFruits = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="9" r="5.5" />
    <circle cx="9" cy="9" r="2" />
    <path d="M15 15c2.5 0 4.5 2 4.5 4.5S17.5 24 15 24s-4.5-2-4.5-4.5S12.5 15 15 15Z" transform="translate(-3 -6)" />
  </svg>
)

export const IconGrains = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3c-2.5 3-2.5 6.5 0 9 1-1.5 1.5-3 1.5-4.5" />
    <path d="M12 3c2.5 3 2.5 6.5 0 9" />
    <path d="M4 13h16" />
    <path d="M4 13c0 4 3.5 7 8 7s8-3 8-7" />
    <path d="M8 13c0 2.5 2 4.5 4 5M16 13c0 2.5-2 4.5-4 5" opacity="0.6" />
  </svg>
)

export const IconLegumes = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3c-5 0-8 3.5-8 8.5S7 20 12 20s8-3.5 8-8.5S17 3 12 3Z" />
    <path d="M12 3v17" />
    <path d="M12 8c-1.5 1.5-1.5 3 0 4.5 1.5-1.5 1.5-3 0-4.5Z" opacity="0.7" />
  </svg>
)

export const IconPasta = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 8c0 3 4 4 8 4s8-1 8-4" />
    <path d="M4 8a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2" opacity="0.6" />
    <path d="M12 12v9M6 15v6M18 15v6" />
  </svg>
)

export const IconCanned = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 8h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" />
    <path d="M4 11h16" />
    <path d="M12 11v4" opacity="0.7" />
  </svg>
)

export const IconHoney = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8 3h8l2 5H6l2-5Z" />
    <path d="M6 8h12l-1.5 12a2 2 0 0 1-2 1.7h-5a2 2 0 0 1-2-1.7L6 8Z" />
    <path d="M9.5 12h5" opacity="0.7" />
  </svg>
)

export const IconSauces = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 3h6l-1 4 2 14H8l2-14-1-4Z" />
    <path d="M9 11h6" opacity="0.7" />
  </svg>
)

export const IconDairy = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 5h6v3a5 5 0 0 1-1.5 3.6L13 13v8h-2v-8l-.5-1.4A5 5 0 0 1 9 8V5Z" />
    <path d="M9 5H6.5a1.5 1.5 0 0 0 0 3H9" />
  </svg>
)

export const IconFrozen = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v18M3 12h18" />
    <path d="M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3" opacity="0.7" />
  </svg>
)

export const IconSeafood = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 12c3-4 6-6 9-6s6 2 9 6c-3 4-6 6-9 6s-6-2-9-6Z" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <path d="M12 6v12" opacity="0.6" />
  </svg>
)

export const IconConfectionery = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 3.5a2.5 2.5 0 0 1 5 0V6h-5V3.5Z" />
    <path d="M12 3.5a2.5 2.5 0 0 1 5 0V6h-5V3.5Z" />
    <path d="M6 6h12l-1 6H7l-1-6Z" />
    <path d="M8 12v6a2 2 0 0 0 4 0v-6M12 12v6a2 2 0 0 0 4 0v-6" />
  </svg>
)

export const CATEGORY_ICONS: Record<string, ComponentType<IconProps>> = {
  'olive-oil': IconOliveOil,
  dates: IconDates,
  coffee: IconCoffee,
  tea: IconTea,
  spices: IconSpices,
  nuts: IconNuts,
  'dried-fruits': IconDriedFruits,
  grains: IconGrains,
  legumes: IconLegumes,
  pasta: IconPasta,
  'canned-foods': IconCanned,
  honey: IconHoney,
  sauces: IconSauces,
  dairy: IconDairy,
  'frozen-foods': IconFrozen,
  seafood: IconSeafood,
  confectionery: IconConfectionery,
}