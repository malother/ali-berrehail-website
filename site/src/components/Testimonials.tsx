import { useLang } from '../i18n'
import Reveal from './Reveal'
import Parallax from './Parallax'
import { testimonials } from '../content/testimonials'

function QuoteMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M10 7H6a3 3 0 0 0-3 3v7h7v-7H6.5A1.5 1.5 0 0 1 8 8.5V7h2zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-3.5a1.5 1.5 0 0 1 1.5-1.5V7h2z" />
    </svg>
  )
}

export default function Testimonials() {
  const { d } = useLang()

  // Hidden until real client testimonials are added — never render placeholders.
  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-elec-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-elec-500">
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
            {d.testimonials.label}
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.testimonials.t1} <span className="text-elec-metal">{d.testimonials.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-slate-400">{d.testimonials.sub}</p>
          </Reveal>
        </div>

        {/* Cards */}
        <Parallax range={24}>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={`${t.name}-${i}`} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <figure className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-elec-500/30">
                  <span
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-elec-500/60 to-transparent"
                    aria-hidden="true"
                  />
                  <QuoteMark className="size-8 text-elec-500/50" />
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-300">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-white/10 pt-4">
                    <p className="font-display text-base font-bold text-white">{t.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Parallax>
      </div>
    </section>
  )
}
