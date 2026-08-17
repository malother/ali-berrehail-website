import { useMemo, useState } from 'react'
import { useLang } from '../i18n'
import { CATEGORY_COUNT, CATEGORY_IDS, CATEGORY_META, type CategoryId } from '../data/catalog'
import { IconCheck, IconClose, IconSearch } from './Icons'
import CategoryVisual from './CategoryVisual'
import Reveal from './Reveal'
import Parallax from './Parallax'
import { SITE_CONFIG } from '../config'
import { dispatchInquiry } from './Inquiry'

function CatalogCard({
  id,
  item,
  index,
  selected,
  onToggle,
  waUrl,
}: {
  id: CategoryId
  item: { name: string; positioning: string; desc: string }
  index: number
  selected: boolean
  onToggle: () => void
  waUrl: string
}) {
  const { d } = useLang()
  const meta = CATEGORY_META[id]
  const elec = meta.tone === 'elec'

  return (
    <article
      className={`card-in glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6 ${
        selected
          ? 'border-elec-500/60 ring-1 ring-elec-500/40 shadow-elec-glow'
          : 'hover:border-elec-500/40 hover:shadow-elec-glow'
      }`}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <span
        className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${elec ? 'via-elec-500/70' : 'via-crimson-500/70'} to-transparent`}
        aria-hidden="true"
      />

      {/* Visual */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl transition-transform duration-500 group-hover:scale-[1.03]">
        <CategoryVisual id={id} />
        <span className="absolute right-3 top-3 rounded-full bg-[rgba(255,253,248,0.92)] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#262219] ring-1 ring-elec-500/40 shadow-sm" dir="ltr">
          {meta.origin}
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={selected}
          aria-label={item.name}
          className={`absolute bottom-3 right-3 grid size-9 place-items-center rounded-full border backdrop-blur-sm transition-all duration-300 ${
            selected
              ? 'border-elec-500 bg-gradient-to-br from-elec-400 to-elec-600 text-white shadow-elec-glow'
              : 'border-elec-500/40 bg-[rgba(255,253,248,0.92)] text-[#262219] hover:border-elec-500/70 hover:text-elec-500'
          }`}
        >
          {selected ? <IconCheck className="size-4" /> : <span className="text-sm font-bold">+</span>}
        </button>
      </div>

      {/* Copy */}
      <h3 className="mt-4 font-display text-lg font-bold text-white">{item.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
      <p className={`mt-3 text-xs font-semibold ${elec ? 'text-elec-400/90' : 'text-crimson-400/90'}`}>{item.positioning}</p>
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-300 hover:gap-2.5 ${
          elec ? 'text-elec-400 hover:text-elec-300' : 'text-crimson-400 hover:text-crimson-300'
        }`}
      >
        {d.catalog.reqCta}
        <svg className="size-4 rtl-flip" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M5 12h14m0 0-6-6m6 6-6 6" />
        </svg>
      </a>
    </article>
  )
}

export default function Catalog() {
  const { d } = useLang()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | CategoryId>('all')
  const [selected, setSelected] = useState<CategoryId[]>([])

  const items = d.catalog.items

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CATEGORY_IDS.filter((id) => {
      const i = CATEGORY_IDS.indexOf(id)
      const item = items[i]
      if (filter !== 'all' && id !== filter) return false
      if (!q) return true
      return `${item.name} ${item.positioning} ${item.desc}`.toLowerCase().includes(q)
    })
  }, [query, filter, items])

  const waUrl = (name: string) =>
    `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`${d.catalog.reqCta}: ${name}`)}`

  const toggle = (id: CategoryId) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const requestSelected = () => {
    if (selected.length === 0) return
    dispatchInquiry(selected.map((id) => items[CATEGORY_IDS.indexOf(id)].name))
    setSelected([])
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="catalog" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-elec-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-crimson-500">
            <span className="h-px w-8 bg-crimson-500" aria-hidden="true" />
            {d.catalog.label}
            <span className="h-px w-8 bg-crimson-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.catalog.t1} <span className="text-elec-metal">{d.catalog.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-slate-400">{d.catalog.sub}</p>
          </Reveal>
        </div>

        {/* Toolbar: search + filter */}
        <Reveal delay={2}>
          <div className="mt-12 flex flex-col items-center gap-4">
            <label className="glass flex w-full max-w-md items-center gap-3 rounded-2xl px-5 py-3 transition-colors focus-within:border-elec-500/50">
              <IconSearch className="size-4 shrink-0 text-elec-500" />
              <span className="sr-only">{d.catalog.search}</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={d.catalog.search}
                className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
              />
            </label>

            <div className="flex max-w-full flex-wrap items-center justify-center gap-2.5" role="group" aria-label={d.catalog.label}>
              <button
                onClick={() => setFilter('all')}
                aria-pressed={filter === 'all'}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-elec-400 to-elec-600 font-bold text-white shadow-elec-glow'
                    : 'glass text-slate-300 hover:border-elec-500/50 hover:text-elec-300'
                }`}
              >
                {d.catalog.all}
              </button>
              {CATEGORY_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => setFilter(id)}
                  aria-pressed={filter === id}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    filter === id
                      ? 'bg-gradient-to-r from-elec-400 to-elec-600 font-bold text-white shadow-elec-glow'
                      : 'glass text-slate-300 hover:border-elec-500/50 hover:text-elec-300'
                  }`}
                >
                  {items[CATEGORY_IDS.indexOf(id)].name}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Result count */}
        <p className="mt-6 text-center text-sm text-slate-500">
          {d.catalog.showing} <span className="font-bold text-elec-400">{visible.length}</span> {d.catalog.of}
        </p>

        {/* Grid */}
        <Parallax range={30}>
          <div key={`${filter}-${query}`} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((id, i) => {
            const item = items[CATEGORY_IDS.indexOf(id)]
            const isSel = selected.includes(id)
            return (
              <CatalogCard
                key={id}
                id={id}
                item={item}
                index={i}
                selected={isSel}
                onToggle={() => toggle(id)}
                waUrl={waUrl(item.name)}
              />
            )
          })}
          </div>
        </Parallax>

        {/* Multi-select CTA */}
        {selected.length > 0 && (
          <Reveal delay={1}>
            <div className="glass mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-4 rounded-2xl border-elec-500/40 p-5 shadow-elec-glow">
              <p className="text-sm font-semibold text-slate-200">
                {d.catalog.showing}{' '}
                <span className="font-bold text-elec-400">{selected.length}</span>{' '}
                {d.catalog.of}
              </p>
              <button
                type="button"
                onClick={requestSelected}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-elec-400 via-elec-500 to-elec-600 px-6 py-3 text-sm font-bold text-white shadow-elec-glow transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
              >
                {d.inquiry.label}
                <IconCheck className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setSelected([])}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition-colors hover:text-crimson-300"
              >
                <IconClose className="size-4" />
                {d.inquiry.fCategories}
              </button>
            </div>
          </Reveal>
        )}

        {/* Empty state */}
        {visible.length === 0 && (
          <div className="glass mx-auto mt-8 max-w-md rounded-2xl p-10 text-center">
            <p className="font-display text-lg font-bold text-white">{d.catalog.emptyTitle}</p>
            <p className="mt-2 text-sm text-slate-400">{d.catalog.emptyDesc}</p>
            <button
              onClick={() => {
                setQuery('')
                setFilter('all')
              }}
              className="mt-6 rounded-full bg-gradient-to-r from-elec-400 to-elec-600 px-6 py-2.5 text-sm font-bold text-white shadow-elec-glow transition-transform hover:scale-[1.03]"
            >
              {d.catalog.all}
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-slate-600">{CATEGORY_COUNT} · {d.catalog.label}</p>
      </div>
    </section>
  )
}