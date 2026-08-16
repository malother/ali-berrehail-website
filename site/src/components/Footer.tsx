import { useLang } from '../i18n'
import { SITE_CONFIG, WHATSAPP_URL } from '../config'
import { IconChevronUp, IconGlobe, IconMail, IconPhone, IconShield, IconWhatsApp } from './Icons'

const NAV_LINKS = [
  { href: '#home', key: 'nav.home' },
  { href: '#services', key: 'nav.services' },
  { href: '#ecosystem', key: 'nav.ecosystem' },
  { href: '#differentiator', key: 'nav.differentiator' },
  { href: '#catalog', key: 'nav.catalog' },
  { href: '#about', key: 'nav.about' },
  { href: '#contact', key: 'nav.contact' },
] as const

const SOURCING_LINKS = [
  { href: '#sourcing', key: 'nav.sourcing' },
  { href: '#comprehensive', key: 'nav.comprehensive' },
  { href: '#privateLabel', key: 'nav.privateLabel' },
  { href: '#quality', key: 'nav.quality' },
  { href: '#logistics', key: 'nav.logistics' },
  { href: '#inquiry', key: 'nav.inquiry' },
  { href: '#faq', key: 'nav.faq' },
] as const

export default function Footer() {
  const { d, t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-onyx-950/80">
      <div className="brand-bar absolute inset-x-0 top-0 h-px" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="absolute -bottom-40 left-1/2 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-elec-500/8 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr]">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-3" aria-label={SITE_CONFIG.name}>
              <svg viewBox="0 0 40 40" className="size-10" aria-hidden="true">
                <defs>
                  <linearGradient id="fGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f8e08e" />
                    <stop offset="50%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#8a6d1f" />
                  </linearGradient>
                </defs>
                <path d="M20 2 36 11v18L20 38 4 29V11Z" fill="url(#fGold)" opacity="0.95" />
                <path d="M20 14 30 9v12L20 26 10 21V9Z" fill="#05060a" opacity="0.55" />
              </svg>
              <span className="leading-tight" dir="ltr">
                <span className="block font-display text-lg font-extrabold tracking-[0.12em] text-gold-metal">{SITE_CONFIG.brand}</span>
                <span className="block text-xs font-semibold tracking-[0.45em] text-crimson-500">{SITE_CONFIG.name.split(' ')[1]?.toUpperCase() ?? 'ALI'}</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-500">{d.footer.about}</p>
            <p className="mt-3 text-xs font-semibold text-gold-400/80">{d.about.roleLine}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-elec-400 via-elec-500 to-elec-600 px-6 py-3 text-sm font-bold text-white shadow-elec-glow transition-all duration-300 hover:brightness-110"
            >
              {d.nav.cta}
            </a>
          </div>

          {/* Explore */}
          <nav aria-label={d.footer.navTitle}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">{d.footer.navTitle}</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={`${l.href}-${l.key}`}>
                  <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-elec-300">
                    {t(l.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sourcing */}
          <nav aria-label={d.sourcing.label}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">{d.sourcing.label}</p>
            <ul className="mt-5 space-y-3">
              {SOURCING_LINKS.map((l) => (
                <li key={`${l.href}-${l.key}`}>
                  <a href={l.href} className="text-sm text-slate-400 transition-colors hover:text-elec-300">
                    {t(l.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Direct contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">{d.footer.contactTitle}</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2.5 transition-colors hover:text-elec-300" dir="ltr">
                  <IconMail className="size-4 shrink-0 text-elec-500" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 transition-colors hover:text-elec-300" dir="ltr">
                  <IconWhatsApp className="size-4 shrink-0 text-crimson-500" />
                  {SITE_CONFIG.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.phoneRaw} className="flex items-center gap-2.5 transition-colors hover:text-elec-300" dir="ltr">
                  <IconPhone className="size-4 shrink-0 text-elec-500" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
            </ul>
            <p className="mt-6 flex items-center gap-2 text-xs text-slate-600">
              <IconShield className="size-4 text-elec-500" />
              <span dir="ltr">ANAE ID: {SITE_CONFIG.anaeId}</span>
            </p>
            <p className="mt-3 text-xs text-slate-600">{d.trustSection.bannerNote}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-7">
          <p className="text-xs text-slate-600">
            © {year} {SITE_CONFIG.name}. {d.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 text-xs text-slate-600" dir="ltr">
              <IconGlobe className="size-3.5 text-elec-500" />
              {d.footer.langs}
            </span>
            <span className="text-xs text-slate-600">{d.footer.privacy} · {d.footer.terms}</span>
            <a
              href="#home"
              aria-label={d.footer.top}
              className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-elec-400 transition-all duration-300 hover:border-elec-500/50 hover:text-elec-300"
            >
              <IconChevronUp className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}