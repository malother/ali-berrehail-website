import { useLang } from '../i18n'
import { SITE_CONFIG, WHATSAPP_URL } from '../config'
import Reveal from './Reveal'
import Parallax from './Parallax'
import ProfilePhoto from './ProfilePhoto'
import { IconArrow, IconCheck, IconShield } from './Icons'

export default function About() {
  const { d } = useLang()

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-elec-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Executive portrait */}
        <Parallax range={36}>
          <Reveal>
            <ProfilePhoto />
            {/* Floating ANAE badge */}
            <div className="glass absolute -bottom-6 end-6 flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-xl shadow-black/20">
              <IconShield className="size-6 text-elec-400" />
              <div>
                <p className="text-sm font-bold text-elec-300">{d.trustSection.b1t}</p>
                <p className="text-[11px] text-slate-500" dir="ltr">
                  ID: {SITE_CONFIG.anaeId}
                </p>
              </div>
            </div>
          </Reveal>
        </Parallax>

        {/* Bio */}
        <Parallax range={30}>
          <Reveal className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-crimson-500">
            <span className="h-px w-8 bg-crimson-500" aria-hidden="true" />
            {d.about.label}
          </Reveal>

          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.about.t1} <span className="text-elec-metal">{d.about.t2}</span>
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-8 space-y-5 leading-relaxed text-slate-400">
              <p>{d.about.p1}</p>
              <p>{d.about.p2}</p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <ul className="mt-8 space-y-3.5">
              {[d.about.li1, d.about.li2, d.about.li3].map((li) => (
                <li key={li} className="flex items-center gap-3 text-slate-300">
                  <IconCheck className="size-5 shrink-0 text-elec-400" />
                  {li}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Executive profile panel */}
          <Reveal delay={3}>
            <div className="glass mt-10 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-display text-2xl font-extrabold italic text-elec-metal">{SITE_CONFIG.name}</p>
                  <p className="mt-1 text-sm font-semibold text-elec-300/90">{d.about.roleLine}</p>
                  <p className="mt-0.5 text-sm text-slate-400">{d.about.role}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-elec-500/30 bg-elec-500/10 px-4 py-1.5 text-xs font-bold text-elec-300">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-elec-400 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-elec-400" />
                  </span>
                  {d.about.availability}
                </span>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-elec-400 via-elec-500 to-elec-600 px-6 py-3 text-sm font-bold text-white shadow-elec-glow transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
              >
                {d.about.cta}
                <IconArrow className="size-4 rtl-flip" />
              </a>
            </div>
          </Reveal>
        </Parallax>
      </div>
    </section>
  )
}