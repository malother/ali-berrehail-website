import { WHATSAPP_URL } from '../config'
import { useLang } from '../i18n'
import { IconWhatsApp } from './Icons'

export default function WhatsAppButton() {
  const { d } = useLang()

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={d.whatsapp.label}
      className="wa-float group fixed bottom-5 right-5 z-[60]"
    >
      <span className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-[#ffffff] shadow-2xl shadow-emerald-900/50 ring-2 ring-white/20 transition-transform duration-300 hover:scale-110">
        <IconWhatsApp className="size-7" />
      </span>
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-xl bg-onyx-800/95 px-4 py-2 text-xs font-semibold text-slate-200 opacity-0 shadow-xl ring-1 ring-white/10 transition-opacity duration-300 group-hover:opacity-100 sm:block" dir="ltr">
        {d.whatsapp.hint}
      </span>
    </a>
  )
}