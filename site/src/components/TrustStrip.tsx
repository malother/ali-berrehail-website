import { useLang } from '../i18n'
import { IconBolt, IconChart, IconGlobe, IconShip, IconTarget, IconTrend } from './Icons'
import type { ComponentType, SVGProps } from 'react'

const ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [IconTrend, IconGlobe, IconShip, IconChart, IconTarget, IconBolt]

/** Premium trust strip: six capability signals over the universe canvas. */
export default function TrustStrip() {
  const { d } = useLang()

  return (
    <section aria-label="Trust signals" className="relative py-12">
      <div className="brand-bar absolute inset-x-0 top-0 h-px opacity-60" aria-hidden="true" />
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-6 sm:grid-cols-3 lg:grid-cols-6">
        {d.trust.map((label, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <li key={label} className="flex flex-col items-center gap-3 text-center">
              <span className="grid size-11 place-items-center rounded-2xl border border-elec-500/20 bg-elec-500/5 text-elec-400">
                <Icon className="size-5" />
              </span>
              <span className="text-[13px] font-semibold tracking-wide text-slate-300">{label}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}