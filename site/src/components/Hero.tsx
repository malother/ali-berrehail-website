import { useLang } from '../i18n'
import Parallax from './Parallax'
import Reveal from './Reveal'
import { IconArrow, IconBolt, IconGlobe, IconShield, IconTrend } from './Icons'

/**
 * Immersive hero over the cinematic 3D universe.
 * The globe/network live in the fixed background canvas — this section
 * layers typography, CTAs and floating data chips in the foreground.
 */
export default function Hero() {
  const { d } = useLang()

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Bottom fade into the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-onyx-950/80"
        aria-hidden="true"
      />

      {/* Soft dark lens behind the copy so headline stays crisp over the video */}
      <div
        className="pointer-events-none absolute inset-y-0 start-0 w-full bg-[radial-gradient(ellipse_95%_85%_at_38%_45%,rgba(8,10,14,0.82),rgba(8,10,14,0.4)_55%,rgba(8,10,14,0.08)_80%)] sm:w-[64%]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-6 pb-28 pt-36 lg:grid-cols-[1.12fr_0.88fr]">
        {/* Foreground copy layer */}
        <Parallax range={26}>
          <Reveal delay={1} className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-xs font-semibold tracking-wide text-elec-300">
            <IconShield className="size-4 text-elec-400" />
            {d.hero.badge}
          </Reveal>

          <Reveal as="h1" delay={1} className="mt-7 font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl xl:text-[3.4rem]">
            <span>{d.hero.t1}</span>{' '}
            <span className="text-elec-metal">{d.hero.t2}</span>{' '}
            <span className="mx-2 text-crimson-500">&amp;</span>{' '}
            <span>{d.hero.t3}</span>{' '}
            <span className="relative inline-block text-crimson-500">
              {d.hero.t4}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 220 10" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8C60 2 160 2 218 6" stroke="#bf2c2c" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
              </svg>
            </span>{' '}
            <span>{d.hero.t5}</span>
          </Reveal>

          <Reveal as="p" delay={2} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400">{d.hero.sub}</Reveal>

          {/* CTAs */}
          <Reveal delay={3} className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#contact"
              className="btn-glow relative inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-elec-400 via-elec-500 to-elec-600 px-9 py-4 text-base font-bold text-white shadow-elec-glow transition-all duration-300 hover:scale-[1.04] hover:brightness-110"
            >
              {d.hero.ctaPrimary}
              <IconArrow className="size-5 rtl-flip" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2.5 rounded-2xl glass px-8 py-4 text-base font-semibold text-slate-200 transition-all duration-300 hover:border-elec-500/40 hover:text-elec-300"
            >
              {d.hero.ctaSecondary}
            </a>
          </Reveal>

          {/* Trust indicators */}
          <Reveal as="ul" delay={3} className="mt-10 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <li className="glass inline-flex items-center gap-2 rounded-full px-4 py-2">
              <IconShield className="size-4 text-elec-400" />
              {d.hero.chip1}
            </li>
            <li className="glass inline-flex items-center gap-2 rounded-full px-4 py-2">
              <IconGlobe className="size-4 text-elec-400" />
              {d.hero.chip2}
            </li>
            <li className="glass inline-flex items-center gap-2 rounded-full px-4 py-2">
              <IconBolt className="size-4 text-elec-400" />
              {d.hero.chip3}
            </li>
          </Reveal>
        </Parallax>

        {/* Foreground floating data chips (depth layer over the universe) */}
        <Parallax range={46} className="relative hidden h-[420px] sm:block">
          <div className="orbit-ring absolute start-[16%] top-[10%] size-[300px]" aria-hidden="true" />
          <div className="orbit-ring absolute start-[30%] top-[24%] size-[210px]" style={{ animationDuration: '32s' }} aria-hidden="true" />

          <div className="float-chip glass absolute start-[24%] top-[16%] flex items-center gap-2.5 rounded-2xl px-5 py-3.5" style={{ animationDelay: '0s' }}>
            <IconGlobe className="size-5 text-elec-400" />
            <div>
              <p className="text-sm font-bold text-slate-100">{d.hero.globeTitle}</p>
              <p className="text-[11px] text-slate-500">{d.hero.globeSub}</p>
            </div>
          </div>

          <div className="float-chip glass absolute end-[6%] top-[42%] flex items-center gap-2.5 rounded-2xl px-5 py-3.5" style={{ animationDelay: '1.6s' }}>
            <IconTrend className="size-5 text-crimson-400" />
            <div>
              <p className="text-sm font-bold text-slate-100">{d.trustSection.b3t}</p>
              <p className="text-[11px] text-slate-500">{d.trustSection.b3s}</p>
            </div>
          </div>

          <div className="float-chip glass absolute start-[8%] bottom-[18%] flex items-center gap-2.5 rounded-2xl px-5 py-3.5" style={{ animationDelay: '3.1s' }}>
            <IconBolt className="size-5 text-elec-400" />
            <div>
              <p className="text-sm font-bold text-slate-100">{d.services.label}</p>
              <p className="text-[11px] text-slate-500">{d.hero.scroll}</p>
            </div>
          </div>

          {/* Country chips */}
          <div className="absolute bottom-[2%] start-[38%] flex gap-1.5" aria-hidden="true">
            {['EN', 'AR', 'ZH', 'TR', 'ES'].map((c, i) => (
              <span
                key={c}
                className={`grid h-9 min-w-9 place-items-center rounded-xl border px-1.5 text-[10px] font-bold backdrop-blur-md ${
                  i % 2 ? 'border-crimson-500/30 bg-crimson-500/10 text-crimson-300' : 'border-elec-500/30 bg-elec-500/10 text-elec-300'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </Parallax>
      </div>

      {/* Scroll hint */}
      <a
        href="#services"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-slate-500 transition-colors hover:text-elec-400 md:block"
        aria-label={d.hero.scroll}
      >
        <svg className="size-6 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}