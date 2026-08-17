import { useLang } from '../i18n'
import Reveal from './Reveal'
import Parallax from './Parallax'
import { IconArrow, IconBox, IconClipboard, IconFileText, IconTag, IconTarget } from './Icons'

const STEP_ICONS = [IconClipboard, IconTag, IconBox, IconTarget, IconFileText]

export default function PrivateLabel() {
  const { d } = useLang()

  return (
    <section id="privateLabel" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-crimson-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-crimson-500">
            <span className="h-px w-8 bg-crimson-500" aria-hidden="true" />
            {d.privateLabel.label}
            <span className="h-px w-8 bg-crimson-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.privateLabel.t1} <span className="text-elec-metal">{d.privateLabel.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-slate-400">{d.privateLabel.sub}</p>
          </Reveal>
        </div>

        <Parallax range={28}>
          <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Steps */}
            <div className="space-y-4">
              {d.privateLabel.items.map((it, i) => {
                const Icon = STEP_ICONS[i % STEP_ICONS.length]
                return (
                  <Reveal key={it.title} delay={(i % 2 ? 2 : 1) as 1 | 2}>
                    <article className="glass group relative flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-elec-500/40 sm:p-6">
                      <span className="absolute inset-y-0 start-0 w-1 rounded-full bg-gradient-to-b from-elec-500 to-crimson-600 opacity-60" aria-hidden="true" />
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-elec-400/20 to-elec-600/20 text-elec-400 ring-1 ring-elec-500/30 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-white">{it.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{it.desc}</p>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>

            {/* Visual: abstract private-label pack composition */}
            <Reveal delay={2}>
              <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
                <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
                <div className="pointer-events-none absolute -end-20 -top-20 size-56 rounded-full bg-elec-500/10 blur-[80px]" aria-hidden="true" />

                <div className="relative flex items-end justify-center gap-5">
                  <div className="glass w-36 rounded-t-2xl rounded-b-xl border-elec-500/25 p-4 pb-2 text-center" dir="ltr">
                    <span className="mx-auto grid size-12 place-items-center rounded-full bg-gradient-to-br from-elec-400 to-elec-600 text-white">
                      <IconTag className="size-6" />
                    </span>
                    <p className="mt-3 font-display text-[10px] font-extrabold tracking-[0.3em] text-elec-metal">YOUR BRAND</p>
                    <p className="mt-1 text-[10px] tracking-[0.2em] text-slate-500">PRODUCT NAME</p>
                    <p className="mt-3 border-t border-white/10 pt-2 text-[9px] tracking-[0.15em] text-slate-600">NET · SPEC · LOT</p>
                  </div>
                  <div className="glass w-24 rounded-t-xl rounded-b-lg border-elec-500/20 p-3 pb-2 text-center" dir="ltr">
                    <span className="mx-auto grid size-9 place-items-center rounded-lg bg-gradient-to-br from-crimson-500 to-crimson-700 text-[#ffffff]">
                      <IconBox className="size-5" />
                    </span>
                    <p className="mt-2 font-display text-[8px] font-bold tracking-[0.25em] text-slate-300">YOUR BRAND</p>
                    <p className="mt-3 border-t border-white/10 pt-2 text-[8px] tracking-[0.15em] text-slate-600">BULK · B2B</p>
                  </div>
                </div>

                <p className="relative mt-8 text-center text-xs text-slate-600">{d.privateLabel.sub}</p>
                <div className="relative mt-6 text-center">
                  <a
                    href="#inquiry"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-elec-400 via-elec-500 to-elec-600 px-7 py-3.5 text-sm font-bold text-white shadow-elec-glow transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
                  >
                    {d.privateLabel.cta}
                    <IconArrow className="size-4 rtl-flip" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Parallax>
      </div>
    </section>
  )
}