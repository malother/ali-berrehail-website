import { useState } from 'react'
import { detectDevice } from '../../lib/device'
import UniverseScene from './UniverseScene'

/** Static layered fallback when WebGL is unavailable. */
export function UniverseFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_38%,rgba(63,126,232,0.09),rgba(5,6,10,0)_70%)]" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden="true" />

      {/* Static globe (hero side) */}
      <div className="animate-float-y absolute right-[6%] top-[14%] hidden w-[300px] opacity-80 lg:block" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="block w-full">
          <circle cx="100" cy="100" r="82" fill="rgba(10,12,17,0.6)" stroke="#3f7ee8" strokeWidth="1.6" />
          <g stroke="rgba(63,126,232,0.45)" fill="none">
            <ellipse cx="100" cy="100" rx="82" ry="18" />
            <ellipse cx="100" cy="100" rx="82" ry="38" />
            <ellipse cx="100" cy="100" rx="82" ry="58" />
            <ellipse cx="100" cy="100" rx="18" ry="82" />
            <ellipse cx="100" cy="100" rx="38" ry="82" />
            <ellipse cx="100" cy="100" rx="58" ry="82" />
          </g>
          <path d="M30 60 Q100 10 170 55" stroke="#dc2626" strokeWidth="1.4" fill="none" opacity="0.7" />
          <path d="M45 150 Q110 105 165 135" stroke="#dc2626" strokeWidth="1.4" fill="none" opacity="0.6" />
          <circle cx="100" cy="100" r="5" fill="#3f7ee8" />
        </svg>
      </div>

      {/* Static sourcing network (lower area) */}
      <div className="animate-float-y absolute left-[4%] top-[52%] hidden w-[300px] opacity-80 lg:block" style={{ animationDelay: '2s' }} aria-hidden="true">
        <svg viewBox="0 0 200 200" className="block w-full">
          <circle cx="100" cy="100" r="9" fill="#3f7ee8" opacity="0.9" />
          <g stroke="rgba(63,126,232,0.5)" strokeWidth="1.2" fill="none">
            <path d="M100 100 40 40" strokeDasharray="4 4" />
            <path d="M100 100 160 42" strokeDasharray="4 4" />
            <path d="M100 100 172 112" strokeDasharray="4 4" />
            <path d="M100 100 125 168" strokeDasharray="4 4" />
            <path d="M100 100 58 158" strokeDasharray="4 4" />
            <path d="M100 100 24 104" strokeDasharray="4 4" />
          </g>
          <circle cx="40" cy="40" r="7" fill="#6f9ef0" />
          <circle cx="160" cy="42" r="7" fill="#ef4444" />
          <circle cx="172" cy="112" r="7" fill="#6f9ef0" />
          <circle cx="125" cy="168" r="7" fill="#ef4444" />
          <circle cx="58" cy="158" r="7" fill="#6f9ef0" />
          <circle cx="24" cy="104" r="7" fill="#ef4444" />
        </svg>
      </div>

      {/* Floating dots */}
      {['left-[8%] top-[20%] size-[5px] bg-elec-500', 'left-[86%] top-[40%] size-[4px] bg-crimson-500', 'left-[30%] top-[12%] size-[4px] bg-elec-500', 'left-[72%] top-[72%] size-[5px] bg-crimson-500'].map((c, i) => (
        <span key={i} className={`animate-float-y absolute rounded-full opacity-70 ${c}`} style={{ animationDelay: `${i * 0.9}s` }} aria-hidden="true" />
      ))}
    </div>
  )
}

/**
 * The persistent cinematic universe: a fixed, full-viewport canvas that
 * sits behind every section and is driven by global scroll progress.
 */
export default function UniverseCanvas() {
  const [profile] = useState(() => detectDevice())

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {profile.webgl ? <UniverseScene profile={profile} /> : <UniverseFallback />}
    </div>
  )
}