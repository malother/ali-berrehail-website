import { useLang } from '../i18n'
import { SITE_CONFIG } from '../config'
import Reveal from './Reveal'
import Parallax from './Parallax'
import { IconBolt, IconGlobe, IconShield } from './Icons'

export default function TrustSection() {
  const { d } = useLang()

  const badges = [
    {
      title: d.trustSection.b1t,
      sub: d.trustSection.b1s,
      value: SITE_CONFIG.anaeId,
      icon: IconShield,
      tone: 'elec' as const,
    },
    {
      title: d.trustSection.b2t,
      sub: d.trustSection.b2s,
      icon: IconGlobe,
      tone: 'crimson' as const,
    },
    {
      title: d.trustSection.b3t,
      sub: d.trustSection.b3s,
      icon: IconBolt,
      tone: 'elec' as const,
    },
  ]

  return (
    <section id="trust" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-crimson-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* ANAE VERIFIED banner */}
        <Parallax range={24}>
          <Reveal>
            <div className="verify-shimmer relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-elec-500/35 bg-gradient-to-r from-elec-500/10 via-elec-500/5 to-crimson-500/10 px-8 py-7 shadow-elec-glow">
              <div className="flex flex-wrap items-center justify-center gap-5">
                <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-elec-300 via-elec-500 to-elec-600 text-white shadow-elec-glow">
                  <IconShield className="size-9" />
                </span>
                <div className="text-center md:text-start" dir="ltr">
                  <p className="font-display text-2xl font-extrabold tracking-[0.14em] text-elec-metal">{d.trustSection.bannerT}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {d.trustSection.bannerS}{' '}
                    <span className="rounded-md bg-onyx-950/80 px-2 py-0.5 font-bold tracking-wider text-elec-300 ring-1 ring-elec-500/30">
                      {SITE_CONFIG.anaeId}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-slate-600">{d.trustSection.bannerNote}</p>
          </Reveal>
        </Parallax>

        {/* Three trust badges */}
        <Parallax range={28}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {badges.map((b, i) => {
            const Icon = b.icon
            const crimson = b.tone === 'crimson'
            return (
              <Reveal key={b.title} delay={(i + 1) as 1 | 2 | 3}>
                <div
                  className={`glass group h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${
                    crimson ? 'hover:border-crimson-500/40 hover:shadow-crimson-glow' : 'hover:border-elec-500/40 hover:shadow-elec-glow'
                  }`}
                >
                  <Icon
                    className={`size-8 transition-transform duration-300 group-hover:scale-110 ${
                      crimson ? 'text-crimson-400' : 'text-elec-400'
                    }`}
                  />
                  <p className="mt-3.5 text-sm font-bold text-white">{b.title}</p>
                  <p className={`mt-1.5 text-xs leading-relaxed ${crimson ? 'text-crimson-300/80' : 'text-elec-300/80'}`}>{b.sub}</p>
                  {b.value && (
                    <p className="mt-1.5 text-xs text-slate-500" dir="ltr">
                      ID: {b.value}
                    </p>
                  )}
                </div>
              </Reveal>
            )
          })}
          </div>
        </Parallax>
      </div>
    </section>
  )
}