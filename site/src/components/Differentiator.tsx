import { useLang } from '../i18n'
import Reveal from './Reveal'
import Parallax from './Parallax'
import { IconBolt, IconChart, IconGlobe, IconLayers, IconRoute, IconShield } from './Icons'

const ACCENTS = [
  { icon: 'from-elec-400/20 to-elec-600/20 text-elec-400 ring-elec-500/30', num: 'text-elec-500/40' },
  { icon: 'from-crimson-500/20 to-crimson-700/20 text-crimson-400 ring-crimson-500/30', num: 'text-crimson-500/40' },
]

const ITEM_ICONS = [IconShield, IconBolt, IconGlobe, IconLayers, IconRoute, IconChart]

export default function Differentiator() {
  const { d } = useLang()

  return (
    <section id="differentiator" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-crimson-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-crimson-500">
            <span className="h-px w-8 bg-crimson-500" aria-hidden="true" />
            {d.differentiator.label}
            <span className="h-px w-8 bg-crimson-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.differentiator.t1} <span className="text-elec-metal">{d.differentiator.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-slate-400">{d.differentiator.sub}</p>
          </Reveal>
        </div>

        {/* Items */}
        <Parallax range={28}>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {d.differentiator.items.map((it, i) => {
              const a = ACCENTS[i % 2]
              const Icon = ITEM_ICONS[i % ITEM_ICONS.length]
              return (
                <Reveal key={it.title} delay={(i % 2 ? 2 : 1) as 1 | 2}>
                  <article className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-elec-500/30">
                    <span
                      className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${
                        i % 2 ? 'via-crimson-500/60' : 'via-elec-500/60'
                      } to-transparent`}
                      aria-hidden="true"
                    />
                    <div className="flex items-start justify-between gap-3">
                      <span className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ring-1 ${a.icon}`}>
                        <Icon className="size-6" />
                      </span>
                      <span className={`font-display text-3xl font-extrabold ${a.num}`} aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-white">{it.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{it.desc}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </Parallax>
      </div>
    </section>
  )
}