/**
 * WebGL capability detection with graceful fallbacks.
 */
export function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

export interface DeviceProfile {
  webgl: boolean
  /** Low-power devices / small screens get reduced particle counts & dpr. */
  lowPower: boolean
  reducedMotion: boolean
  /** Cap device pixel ratio to keep fill-rate sane. */
  maxDpr: number
}

export function detectDevice(): DeviceProfile {
  const reducedMotion = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = window.innerWidth < 768
  const lowPower = reducedMotion || small || (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined && ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4
  return { webgl: webglAvailable(), lowPower, reducedMotion, maxDpr: lowPower ? 1 : 1.75 }
}

export const MEDIA_POINTER_FINE = '(pointer: fine)'