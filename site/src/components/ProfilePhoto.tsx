import { useState } from 'react'
import { SITE_CONFIG } from '../config'
import { useLang } from '../i18n'

/**
 * Executive profile photo container.
 * - Uses SITE_CONFIG.personalPhoto (centralized — swap one value to change the photo)
 * - Premium glass frame with electric-blue gradient + crimson corner brackets
 * - Elegant male 3D-business-avatar fallback when the photo is missing/failed
 */
export default function ProfilePhoto({ className = '' }: { className?: string }) {
  const { d } = useLang()
  const [failed, setFailed] = useState(false)

  const photoReady = SITE_CONFIG.personalPhoto !== 'PERSONAL_PHOTO_URL' && !failed

  return (
    <div className={`relative mx-auto w-full max-w-[380px] ${className}`}>
      {/* Rotating dashed orbit */}
      <div className="animate-spin-slow absolute -inset-7 rounded-full border-2 border-dashed border-elec-500/25" aria-hidden="true" />

      {/* Ambient glow */}
      <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-elec-500/25 to-crimson-500/25 blur-2xl" aria-hidden="true" />

      {/* Elec-crimson gradient frame */}
      <div className="relative rounded-[2rem] bg-gradient-to-br from-elec-300 via-elec-500 to-crimson-500 p-[2.5px] shadow-2xl shadow-black/25">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[calc(2rem-2.5px)] bg-onyx-800">
          {photoReady ? (
            <img
              src={SITE_CONFIG.personalPhoto}
              alt={d.about.photoAlt}
              className="size-full object-cover object-top"
              onError={() => setFailed(true)}
            />
          ) : (
            <FallbackAvatar />
          )}
        </div>
      </div>

      {/* Crimson corner brackets */}
      <span className="corner corner-tl" aria-hidden="true" />
      <span className="corner corner-tr" aria-hidden="true" />
      <span className="corner corner-bl" aria-hidden="true" />
      <span className="corner corner-br" aria-hidden="true" />
    </div>
  )
}

/** Masculine 3D business avatar fallback — shown until the real photo is set. */
function FallbackAvatar() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-onyx-900">
      <svg viewBox="0 0 200 200" className="w-3/5" aria-hidden="true">
        <defs>
          <linearGradient id="suitGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a8c4f5" />
            <stop offset="55%" stopColor="#3f7ee8" />
            <stop offset="100%" stopColor="#1d3d80" />
          </linearGradient>
          <radialGradient id="halo" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="rgba(63,126,232,0.18)" />
            <stop offset="100%" stopColor="rgba(63,126,232,0)" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="96" fill="url(#halo)" />
        <circle cx="100" cy="78" r="34" fill="url(#suitGrad)" />
        <path d="M100 118c-42 0-60 22-64 54l-6 28h140l-6-28c-4-32-22-54-64-54Z" fill="url(#suitGrad)" />
        <path d="M100 118v-8m0 8c-10 0-18-4-24-10m24 10c10 0 18-4 24-10" stroke="#05060a" strokeWidth="4" fill="none" opacity="0.7" />
        <path d="M100 172 74 158l26-14 26 14Z" fill="#05060a" opacity="0.6" />
      </svg>
    </div>
  )
}