import { useLang } from '../i18n'
import { WHATSAPP_URL } from '../config'
import Reveal from './Reveal'
import Parallax from './Parallax'
import { IconArrow, IconBolt } from './Icons'

/** Full-width conversion banner over the calm universe. */
export default function CtaSection() {
  const { d } = useLang()

  return (
    <section aria-label={d.cta.label} className="relative overflow-hidden py-24">
      {/* Restrained accent: hairlines + a soft radial pool for focus */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(63,126,232,0.1),transparent_65%)] blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-elec-500/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-crimson-500/50 to-transparent" />
      </div>

      <Parallax range={26}>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="glass mx-auto inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-elec-400">
            <IconBolt className="size-4 text-crimson-500" />
            {d.cta.label}
          </span>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-7 font-display text-4xl font-extrabold leading-[1.12] text-white sm:text-5xl xl:text-6xl">
            {d.cta.t1} <span className="text-elec-metal">{d.cta.t2}</span> <span className="text-crimson-500">{d.cta.t3}</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">{d.cta.sub}</p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#contact"
              className="btn-glow inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-elec-400 via-elec-500 to-elec-600 px-10 py-4.5 text-base font-bold text-white shadow-elec-glow transition-all duration-300 hover:scale-[1.04] hover:brightness-110"
            >
              {d.cta.marketing}
              <IconArrow className="size-5 rtl-flip" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center gap-2.5 rounded-2xl px-9 py-4 text-base font-semibold text-slate-200 transition-all duration-300 hover:border-elec-500/40 hover:text-elec-300"
            >
              {d.cta.sourcing}
            </a>
          </div>
        </Reveal>
        </div>
      </Parallax>
    </section>
  )
}