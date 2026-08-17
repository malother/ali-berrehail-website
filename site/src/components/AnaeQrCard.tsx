import { SITE_CONFIG } from '../config'
import { useLang } from '../i18n'
import Reveal from './Reveal'
import { IconShield } from './Icons'

/**
 * Official ANAE verification QR card.
 * - Uses the ORIGINAL official QR image (SITE_CONFIG.anaeQr) — never regenerated.
 * - White tile preserves scan contrast; image is shown at its native resolution.
 * - The QR itself is the verification — no URL is displayed or linked.
 */
export default function AnaeQrCard() {
  const { d } = useLang()

  return (
    <Reveal>
      <div className="glass relative mx-auto mt-8 max-w-2xl overflow-hidden rounded-3xl border border-elec-500/35 p-6 shadow-elec-glow sm:p-7">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
          {/* Original QR on a white scan tile */}
          <span className="shrink-0 rounded-2xl bg-[#ffffff] p-3 shadow-xl shadow-black/25 ring-1 ring-white/20">
            <img
              src={SITE_CONFIG.anaeQr}
              alt={d.trustSection.qrAlt}
              width={188}
              height={186}
              loading="lazy"
              className="h-auto w-36 sm:w-40"
            />
          </span>

          {/* Card details */}
          <span className="text-center sm:text-start">
            <span className="inline-flex items-center gap-2 text-elec-400">
              <IconShield className="size-5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-[0.25em]">{d.trustSection.qrLabel}</span>
            </span>
            <span className="mt-2 block font-display text-lg font-extrabold text-elec-metal sm:text-xl">
              {d.trustSection.bannerT}
            </span>
            <span className="mt-1.5 block text-sm text-slate-400" dir="ltr">
              ID: {SITE_CONFIG.anaeId}
            </span>
            <span className="mt-2 block text-xs font-medium text-elec-300/90">{d.trustSection.qrHint}</span>
          </span>
        </div>
      </div>
    </Reveal>
  )
}