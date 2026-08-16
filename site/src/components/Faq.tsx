import { useState } from 'react'
import { useLang } from '../i18n'
import Reveal from './Reveal'
import { IconChevronDown } from './Icons'

export default function Faq() {
  const { d } = useLang()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-elec-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-elec-400">
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
            {d.faq.label}
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.faq.t1} <span className="text-elec-metal">{d.faq.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-slate-400">{d.faq.sub}</p>
          </Reveal>
        </div>

        {/* Accordion */}
        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {d.faq.items.map((it, i) => {
            const isOpen = open === i
            return (
              <Reveal key={it.q} delay={(i % 2 ? 2 : 1) as 1 | 2}>
                <div className={`glass overflow-hidden rounded-2xl transition-colors duration-300 ${isOpen ? 'border-elec-500/40' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                    >
                      <span className={`font-display text-base font-bold transition-colors sm:text-lg ${isOpen ? 'text-elec-300' : 'text-white'}`}>
                        {it.q}
                      </span>
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? 'rotate-180 border-elec-500/60 bg-elec-500/15 text-elec-400'
                            : 'border-white/10 bg-white/5 text-slate-400'
                        }`}
                        aria-hidden="true"
                      >
                        <IconChevronDown className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className={`grid transition-[grid-template-rows] duration-400 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-white/5 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-400">{it.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}