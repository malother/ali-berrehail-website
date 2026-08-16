import { useLang } from '../i18n'
import Reveal from './Reveal'
import Parallax from './Parallax'
import { IconCheck, IconGlobe, IconTrend } from './Icons'

/** Static buyer/supplier network diagram (decorative, conceptual). */
function NetworkDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="relative mx-auto block w-full">
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(63,126,232,0.2)" strokeWidth="1" strokeDasharray="3 6" />
        <circle cx="100" cy="100" r="10" fill="#3f7ee8" opacity="0.9" />
        <g stroke="rgba(63,126,232,0.6)" strokeWidth="1.2" fill="none">
          <path d="M100 100 40 40" strokeDasharray="4 4" />
          <path d="M100 100 160 42" strokeDasharray="4 4" />
          <path d="M100 100 170 110" strokeDasharray="4 4" />
          <path d="M100 100 125 165" strokeDasharray="4 4" />
          <path d="M100 100 60 155" strokeDasharray="4 4" />
          <path d="M100 100 25 105" strokeDasharray="4 4" />
        </g>
        <circle cx="40" cy="40" r="7" fill="#6f9ef0" />
        <circle cx="160" cy="42" r="7" fill="#bf2c2c" />
        <circle cx="170" cy="110" r="7" fill="#6f9ef0" />
        <circle cx="125" cy="165" r="7" fill="#bf2c2c" />
        <circle cx="60" cy="155" r="7" fill="#6f9ef0" />
        <circle cx="25" cy="105" r="7" fill="#bf2c2c" />
      </svg>
    </div>
  )
}

export default function Sourcing() {
  const { d } = useLang()

  return (
    <section id="sourcing" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-elec-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-crimson-500">
            <span className="h-px w-8 bg-crimson-500" aria-hidden="true" />
            {d.sourcing.label}
            <span className="h-px w-8 bg-crimson-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.sourcing.t1} <span className="text-elec-metal">{d.sourcing.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">{d.sourcing.sub}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2">
          {/* Network visualization panel (the live network plays in the universe behind) */}
          <Parallax range={34}>
            <Reveal delay={1}>
              <div className="glass relative overflow-hidden rounded-[2.5rem] p-6 sm:p-8">
                <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
                <div className="relative h-[300px] sm:h-[340px]">
                  <NetworkDiagram />
                </div>
                <div className="relative mt-4 rounded-2xl border border-white/5 bg-onyx-950/60 px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-elec-500">
                    <IconGlobe className="size-3.5" />
                    {d.sourcing.visualTitle}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-200">{d.sourcing.visualSub}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <IconTrend className="size-3.5" />
                    {d.sourcing.visualNote}
                  </p>
                </div>
              </div>
            </Reveal>
          </Parallax>

          {/* Six-step workflow */}
          <Parallax range={28}>
            <ol className="relative space-y-4">
              {d.sourcing.steps.map((s, i) => (
                <Reveal key={s.title} as="li" delay={(i % 3) as 0 | 1 | 2}>
                  <div className="group glass flex gap-5 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-elec-500/40">
                    <span className="relative shrink-0">
                      <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-elec-400/20 to-elec-600/20 font-display text-lg font-extrabold text-elec-400 ring-1 ring-elec-500/30">
                        {i + 1}
                      </span>
                      {i < d.sourcing.steps.length - 1 && (
                        <span className="absolute left-1/2 top-full h-4 w-px -translate-x-1/2 bg-gradient-to-b from-elec-500/50 to-transparent" aria-hidden="true" />
                      )}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                    </div>
                    <IconCheck className="ms-auto mt-1 size-5 shrink-0 text-elec-500/60 transition-colors group-hover:text-elec-400" />
                  </div>
                </Reveal>
              ))}
            </ol>
          </Parallax>
        </div>
      </div>
    </section>
  )
}