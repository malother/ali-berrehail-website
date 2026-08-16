import { useLang } from '../i18n'
import Reveal from './Reveal'
import Parallax from './Parallax'
import { IconBox, IconChart, IconCheck, IconFileText, IconShip, IconTarget } from './Icons'

const STEP_ICONS = [IconCheck, IconBox, IconFileText, IconShip, IconChart, IconTarget]

export default function Logistics() {
  const { d } = useLang()

  return (
    <section id="logistics" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-crimson-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-crimson-500">
            <span className="h-px w-8 bg-crimson-500" aria-hidden="true" />
            {d.logistics.label}
            <span className="h-px w-8 bg-crimson-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.logistics.t1} <span className="text-gold-metal">{d.logistics.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-slate-400">{d.logistics.sub}</p>
          </Reveal>
        </div>

        {/* Steps */}
        <Parallax range={24}>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {d.logistics.steps.map((s, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length]
              return (
                <Reveal key={s.title} delay={(i % 2 ? 2 : 1) as 1 | 2}>
                  <article className="glass group relative h-full overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/40">
                    <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" aria-hidden="true" />
                    <div className="flex items-center justify-between">
                      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 text-gold-400 ring-1 ring-gold-500/30 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-display text-2xl font-extrabold text-white/10" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-sm font-bold text-white">{s.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{s.desc}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </Parallax>

        {/* Conceptual route visual */}
        <Reveal delay={2}>
          <div className="glass relative mt-10 overflow-hidden rounded-3xl p-7 sm:p-10">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
            <p className="relative text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-500">{d.logistics.visualTitle}</p>

            {/* Route line */}
            <div className="relative mx-auto mt-8 flex max-w-3xl items-center" aria-hidden="true">
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-gold-500 via-gold-500/60 to-crimson-500" />
              <div className="relative z-10 flex w-full items-center justify-between">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`grid size-7 place-items-center rounded-full border text-[10px] font-extrabold ${
                      i === 0
                        ? 'border-gold-500 bg-gold-500 text-onyx-950'
                        : i === 5
                          ? 'border-crimson-500 bg-crimson-500 text-[#ffffff]'
                          : 'border-gold-500/50 bg-onyx-900 text-gold-400'
                    }`}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>

            <p className="relative mt-6 text-center text-sm text-slate-400">{d.logistics.visualSub}</p>
            <p className="relative mt-3 text-center text-xs text-slate-600">{d.logistics.visualNote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}