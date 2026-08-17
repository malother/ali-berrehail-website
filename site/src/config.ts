/**
 * Central site configuration.
 * All editable business facts live here — no duplication across components.
 */
export const SITE_CONFIG = {
  name: 'Ali Berrehail',
  brand: 'BERREHAIL',
  brandTag: 'B2B · Food Sourcing',
  positioning:
    'Elite B2B E-commerce Marketing & International Food Sourcing Consultancy',
  // Replace this value with the URL/path of the real photo (jpg/png/webp).
  // The layout and fallback avatar never change when this value is swapped.
  personalPhoto: 'PERSONAL_PHOTO_URL',
  email: 'a.ecommerce@outlook.fr',
  whatsappNumber: '213555231119',
  whatsappDisplay: '+213 555 23 11 19',
  phone: '+213 664 58 28 45',
  phoneRaw: 'tel:+213664582845',
  anaeId: '109404******6109',
  location: 'Algeria',
} as const

export const WHATSAPP_URL = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
  'Hello Ali, I would like to discuss a business opportunity.',
)}`

/**
 * Centralized asset references. Assets live under /public/assets.
 * - `3d/` reserved for GLB/GLTF models (none shipped yet — scenes are procedural)
 * - `images/` for AI-generated or purchased visuals (optional upgrades)
 * - `video/` for cinematic loops (optional upgrades)
 */
export const ASSETS = {
  heroModel: '/assets/3d/hero/global-trade.glb',
  sourcingModel: '/assets/3d/sourcing/global-sourcing.glb',
  heroVideo: '/Mol/hero-background.mp4',
  heroPoster: '/Mol/hero-poster.jpg',
  personalPhoto: '/assets/images/ali-berrehail.jpg',
} as const

/**
 * Asset manifest — track every optional AI/generated asset here.
 * (name, purpose, source, path, status)
 */
export const ASSET_MANIFEST = [
  { name: 'ali-berrehail.jpg', purpose: 'Executive profile photo', source: 'user upload', path: ASSETS.personalPhoto, status: 'pending' },
  { name: 'global-trade.glb', purpose: 'Hero 3D model', source: 'optional (ComfyUI/Kaggle or purchased)', path: ASSETS.heroModel, status: 'procedural Three.js in use' },
  { name: 'global-sourcing.glb', purpose: 'Sourcing 3D model', source: 'optional (ComfyUI/Kaggle or purchased)', path: ASSETS.sourcingModel, status: 'procedural Three.js in use' },
  { name: 'Mol/hero-background.mp4', purpose: 'Hero cinematic loop (all devices)', source: 'user upload', path: ASSETS.heroVideo, status: 'active' },
  { name: 'Mol/hero-poster.jpg', purpose: 'Hero video poster fallback (autoplay blocked / pre-play)', source: 'extracted frame (ffmpeg)', path: ASSETS.heroPoster, status: 'active' },
] as const

/** Contact form API endpoint (served by server.ps1 — data/messages.json) */
export const API = {
  contact: '/api/contact',
  wholesale: '/api/wholesale',
} as const