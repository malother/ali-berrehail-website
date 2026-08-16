import { useLang } from '../i18n'
import Reveal from './Reveal'
import Parallax from './Parallax'
import { IconClipboard, IconFileText, IconFlask, IconRefresh, IconSearch, IconShield } from './Icons'

const QA_ICONS = [IconClipboard, IconFlask, IconFileText, IconRefresh, IconSearch]

export default function Quality() {
  const { d } = useLang()

  return (
    <section id="quality" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-gold-500">
            <span className="h-px w-8 bg-gold-500" aria-hidden="true" />
            {d.quality.label}
            <span className="h-px w-8 bg-gold-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.quality.t1} <span className="text-gold-metal">{d.quality.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-slate-400">{d.quality.sub}</p>
          </Reveal>
        </div>

        {/* Items */}
        <Parallax range={24}>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {d.quality.items.map((it, i) => {
              const Icon = QA_ICONS[i % QA_ICONS.length]
              const crimson = i % 2 === 1
              return (
                <Reveal key={it.title} delay={(i % 2 ? 2 : 1) as 1 | 2}>
                  <article className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/30">
                    <span
                      className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${crimson ? 'via-crimson-500/60' : 'via-gold-500/60'} to-transparent`}
                      aria-hidden="true"
                    />
                    <span
                      className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ring-1 transition-transform duration-300 group-hover:scale-110 ${
                        crimson
                          ? 'from-crimson-500/20 to-crimson-700/20 text-crimson-400 ring-crimson-500/30'
                          : 'from-gold-400/20 to-gold-600/20 text-gold-400 ring-gold-500/30'
                      }`}
                    >
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-white">{it.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{it.desc}</p>
                  </article>
                </Reveal>
              )
            })}

            {/* Conceptual-verification note */}
            <Reveal delay={2}>
              <article className="glass relative h-full overflow-hidden rounded-2xl border-l-2 border-l-gold-500 p-6">
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 text-gold-400 ring-1 ring-gold-500/30">
                  <IconShield className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{d.quality.label}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{d.quality.visualNote}</p>
              </article>
            </Reveal>
          </div>
        </Parallax>
      </div>
    </section>
  )
}