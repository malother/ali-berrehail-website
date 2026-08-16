import { useEffect, useRef, useState } from 'react'
import { SITE_CONFIG, WHATSAPP_URL } from '../config'
import { LANG_META, useLang, type Lang } from '../i18n'
import { IconChevronDown, IconClose, IconGlobe, IconMenu, IconShield } from './Icons'

const LINKS = [
  { href: '#home', key: 'nav.home' },
  { href: '#services', key: 'nav.services' },
  { href: '#sourcing', key: 'nav.sourcing' },
  { href: '#about', key: 'nav.about' },
  { href: '#contact', key: 'nav.contact' },
] as const

const LANGS: Lang[] = ['en', 'ar', 'zh', 'tr', 'es']

export default function Navbar() {
  const { lang, setLang, d, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [compressed, setCompressed] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const langRef = useRef<HTMLDivElement | null>(null)

  /* Sticky header: shadow after scroll, slight compression further down */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      setCompressed(window.scrollY > 380)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Scrollspy: active section indicator */
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-38% 0px -55% 0px', threshold: 0 },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [lang])

  /* Close lang menu on outside click / Escape */
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('click', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const switchLang = (l: Lang) => {
    setLang(l)
    setLangOpen(false)
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/10' : ''}`}>
      {/* Metallic hairline */}
      <div className="brand-bar h-px w-full opacity-70" aria-hidden="true" />

      <nav
        aria-label={d.nav.selectLang}
        className={`glass mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 sm:px-7 ${compressed ? 'py-2' : ''}`}
      >
        {/* Brand */}
        <a href="#home" className="group flex items-center gap-3" aria-label={SITE_CONFIG.name}>
          <span className="relative grid size-10 place-items-center">
            <svg viewBox="0 0 40 40" className="size-10 drop-shadow-[0_0_12px_rgba(63,126,232,0.45)] transition-transform duration-500 group-hover:rotate-12" aria-hidden="true">
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f8e08e" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#8a6d1f" />
                </linearGradient>
                <linearGradient id="crimsonGrad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
              </defs>
              <path d="M20 2 36 11v18L20 38 4 29V11Z" fill="url(#goldGrad)" opacity="0.95" />
              <path d="M20 2v18m0 0L4 11m16 9 16-9M20 20v18" stroke="url(#crimsonGrad)" strokeWidth="1.4" fill="none" opacity="0.85" />
              <path d="M20 14 30 9v12L20 26 10 21V9Z" fill="#05060a" opacity="0.55" />
            </svg>
          </span>
          <span className="leading-tight" dir="ltr">
            <span className="block font-display text-lg font-extrabold tracking-[0.12em] text-gold-metal">{SITE_CONFIG.brand}</span>
            <span className="block text-xs font-semibold tracking-[0.45em] text-crimson-500">{SITE_CONFIG.name.split(' ')[1]?.toUpperCase() ?? 'ALI'}</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`nav-link text-sm font-medium transition-colors hover:text-elec-400 ${active === l.href ? 'active text-elec-400' : 'text-slate-300'}`}>
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={d.nav.selectLang}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-elec-500/50 hover:text-elec-300"
            >
              <IconGlobe className="size-4 text-elec-500" />
              <span className="text-xs font-bold">{lang.toUpperCase()}</span>
              <IconChevronDown className={`size-3.5 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <ul
                role="listbox"
                aria-label={d.nav.selectLang}
                className="glass absolute end-0 top-[calc(100%+10px)] w-44 overflow-hidden rounded-2xl p-1.5 shadow-2xl shadow-black/25"
              >
                <li>
                  <p className="px-3 pb-1.5 pt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">{d.nav.selectLang}</p>
                </li>
                {LANGS.map((l) => (
                  <li key={l}>
                    <button
                      role="option"
                      aria-selected={lang === l}
                      onClick={() => switchLang(l)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        lang === l ? 'bg-elec-500/15 text-elec-300' : 'text-slate-200 hover:bg-elec-500/10 hover:text-elec-300'
                      }`}
                    >
                      {LANG_META[l].native}
                      <span className="text-xs text-slate-500">{l.toUpperCase()}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-elec-400 via-elec-500 to-elec-600 px-5 py-2.5 text-sm font-bold text-white shadow-elec-glow transition-all duration-300 hover:scale-[1.03] hover:brightness-110 sm:flex"
          >
            <IconShield className="size-4" />
            {d.nav.cta}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? d.nav.closeMenu : d.nav.openMenu}
            aria-expanded={mobileOpen}
            className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition-colors hover:border-elec-500/50 hover:text-elec-300 lg:hidden"
          >
            {mobileOpen ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass mx-3 mt-2 overflow-hidden rounded-2xl p-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-elec-500/10 hover:text-elec-300 ${
                    active === l.href ? 'text-elec-300' : 'text-slate-200'
                  }`}
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-elec-400 via-elec-500 to-elec-600 px-5 py-3 text-sm font-bold text-white"
          >
            {d.nav.cta}
          </a>
        </div>
      )}
    </header>
  )
}