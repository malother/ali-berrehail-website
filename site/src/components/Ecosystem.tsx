import { useLang } from '../i18n'
import Reveal from './Reveal'
import Parallax from './Parallax'
import TiltCard from './TiltCard'
import { IconArrow, IconChart, IconLayers, IconSpark, IconTarget } from './Icons'

const PILLAR_ICONS = [IconTarget, IconLayers, IconSpark, IconChart]

export default function Ecosystem() {
  const { d } = useLang()

  return (
    <section id="ecosystem" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-elec-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-elec-400">
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
            {d.ecosystem.label}
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.ecosystem.t1} <span className="text-elec-metal">{d.ecosystem.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-slate-400">{d.ecosystem.sub}</p>
          </Reveal>
        </div>

        {/* Pillars */}
        <Parallax range={24}>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {d.ecosystem.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length]
              return (
                <Reveal key={p.title} delay={(i % 2 ? 2 : 1) as 1 | 2}>
                  <TiltCard className="h-full">
                    <article className="glass relative h-full rounded-2xl p-6">
                      <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-elec-500/60 to-transparent" aria-hidden="true" />
                      <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-elec-400/20 to-elec-600/20 text-elec-400 ring-1 ring-elec-500/30">
                        <Icon className="size-6" />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-bold text-white">{p.title}</h3>
                      <p className="mt-1 text-xs font-semibold tracking-wide text-elec-500/90" dir="ltr">
                        {p.tag}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                    </article>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </Parallax>

        <Reveal delay={2}>
          <p className="mt-10 text-center">
            <a href="#services" className="inline-flex items-center gap-2 text-sm font-bold text-elec-300 transition-all duration-300 hover:gap-3">
              {d.nav.services}
              <IconArrow className="size-4 rtl-flip" />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}