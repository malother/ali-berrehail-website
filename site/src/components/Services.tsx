import { useLang } from '../i18n'
import Reveal from './Reveal'
import Parallax from './Parallax'
import TiltCard from './TiltCard'
import { IconArrow, IconCheck, IconUsers, IconChart, IconTarget, IconSpark, IconGlobe } from './Icons'

/* Accent alternation for a premium rhythm */
const ACCENTS = [
  { line: 'via-gold-500/80', icon: 'from-gold-400/20 to-gold-600/20 text-gold-400 ring-gold-500/30', title: 'text-gold-400/90', cta: 'text-gold-300 hover:text-gold-200', check: 'text-gold-400' },
  { line: 'via-crimson-500/80', icon: 'from-crimson-500/20 to-crimson-700/20 text-crimson-400 ring-crimson-500/30', title: 'text-crimson-400/90', cta: 'text-crimson-400 hover:text-crimson-300', check: 'text-crimson-400' },
]

const SERVICE_ICONS = [IconTarget, IconChart, IconSpark, IconUsers, IconGlobe]

export default function Services() {
  const { d } = useLang()

  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-28">
      {/* Section accent hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-crimson-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-gold-500">
            <span className="h-px w-8 bg-gold-500" aria-hidden="true" />
            {d.services.label}
            <span className="h-px w-8 bg-gold-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.services.t1} <span className="text-gold-metal">{d.services.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">{d.services.sub}</p>
          </Reveal>
        </div>

        {/* Cards grid */}
        <Parallax range={30}>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
          {d.services.items.map((s, i) => {
            const a = ACCENTS[i % 2]
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length]
            return (
              <Reveal key={s.title} delay={(i % 2 ? 2 : 1) as 1 | 2}>
                <TiltCard className="h-full">
                  <article className="glass h-full rounded-3xl p-6 sm:p-8">
                    <span className={`absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent ${a.line} to-transparent`} aria-hidden="true" />
                    <div className="card-depth relative">
                      <div className="flex items-start justify-between">
                        <span className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ring-1 ${a.icon}`}>
                          <Icon className="size-7" />
                        </span>
                        <span className="font-display text-3xl font-extrabold text-white/10" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-2xl font-bold text-white">{s.title}</h3>
                      <p className={`mt-1 text-sm font-semibold ${a.title}`}>{s.tag}</p>
                      <p className="mt-4 leading-relaxed text-slate-400">{s.desc}</p>
                      <ul className="mt-6 space-y-2.5 text-sm text-slate-300">
                        {s.benefits.map((b) => (
                          <li key={b} className="flex items-center gap-2.5">
                            <IconCheck className={`size-4 shrink-0 ${a.check}`} />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#contact"
                        className={`mt-8 inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 hover:gap-3 ${a.cta}`}
                      >
                        {s.cta}
                        <IconArrow className="size-4 rtl-flip" />
                      </a>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            )
          })}
          </div>
        </Parallax>

        {/* Guarantee strip */}
        <Reveal delay={3}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-400">
            {d.services.guarantees.map((g) => (
              <span key={g} className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5">
                <IconCheck className="size-4 text-gold-400" />
                {g}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}