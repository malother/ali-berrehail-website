import { useLang } from '../i18n'
import { CATEGORY_IDS, CATEGORY_META, CATEGORY_COUNT, type CategoryId } from '../data/catalog'
import { CATEGORY_ICONS, IconArrow } from './Icons'
import Reveal from './Reveal'
import Parallax from './Parallax'

/* 8 featured families spread across the sourcing spectrum */
const FEATURED: CategoryId[] = ['olive-oil', 'dates', 'spices', 'honey', 'grains', 'legumes', 'canned-foods', 'seafood']

export default function Comprehensive() {
  const { d } = useLang()
  const items = d.catalog.items

  return (
    <section id="comprehensive" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-elec-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-elec-400">
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
            {d.comprehensive.label}
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.comprehensive.t1} <span className="text-elec-metal">{d.comprehensive.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-slate-400">{d.comprehensive.sub}</p>
          </Reveal>
        </div>

        {/* Featured families */}
        <Reveal delay={2}>
          <p className="mt-14 text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-500">{d.comprehensive.featuredTitle}</p>
        </Reveal>
        <Parallax range={24}>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED.map((id, i) => {
              const meta = CATEGORY_META[id]
              const item = items[CATEGORY_IDS.indexOf(id)]
              const Icon = CATEGORY_ICONS[id]
              const elec = meta.tone === 'elec'
              return (
                <Reveal key={id} delay={(i % 2 ? 2 : 1) as 1 | 2}>
                  <a
                    href="#catalog"
                    className="glass group relative block h-full overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-elec-500/40 hover:shadow-elec-glow"
                  >
                    <span
                      className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${elec ? 'via-elec-500/70' : 'via-crimson-500/70'} to-transparent`}
                      aria-hidden="true"
                    />
                    <span
                      className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ring-1 transition-transform duration-300 group-hover:scale-110 ${
                        elec
                          ? 'from-elec-400/20 to-elec-600/20 text-elec-400 ring-elec-500/30'
                          : 'from-crimson-500/20 to-crimson-700/20 text-crimson-400 ring-crimson-500/30'
                      }`}
                    >
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-white">{item.name}</h3>
                    <p className={`mt-1.5 text-xs font-semibold ${elec ? 'text-elec-400/90' : 'text-crimson-400/90'}`}>{item.positioning}</p>
                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </a>
                </Reveal>
              )
            })}
          </div>
        </Parallax>

        {/* Complete catalog strip */}
        <Reveal delay={2}>
          <p className="mt-16 text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-500">{d.comprehensive.allTitle}</p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-2.5">
            {CATEGORY_IDS.map((id) => {
              const Icon = CATEGORY_ICONS[id]
              const item = items[CATEGORY_IDS.indexOf(id)]
              return (
                <a
                  key={id}
                  href="#catalog"
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-elec-500/50 hover:text-elec-300"
                >
                  <Icon className="size-4 text-elec-500" />
                  {item.name}
                </a>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={2}>
          <p className="mt-10 text-center">
            <a href="#catalog" className="inline-flex items-center gap-2 text-sm font-bold text-elec-300 transition-all duration-300 hover:gap-3">
              {d.catalog.label}
              <IconArrow className="size-4 rtl-flip" />
            </a>
            <span className="ms-3 text-xs text-slate-600">· {CATEGORY_COUNT}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}