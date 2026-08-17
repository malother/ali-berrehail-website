import { useState, type FormEvent } from 'react'
import { useLang } from '../i18n'
import { API, SITE_CONFIG, WHATSAPP_URL } from '../config'
import Reveal from './Reveal'
import Parallax from './Parallax'
import { IconArrow, IconCheck, IconClose, IconMail, IconPhone, IconShield, IconWhatsApp } from './Icons'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const { d, lang } = useLang()
  const [status, setStatus] = useState<Status>('idle')

  const cards = [
    {
      icon: IconMail,
      label: d.contact.email,
      value: SITE_CONFIG.email,
      href: `mailto:${SITE_CONFIG.email}`,
      external: false,
      tone: 'elec' as const,
    },
    {
      icon: IconWhatsApp,
      label: d.contact.wa,
      value: SITE_CONFIG.whatsappDisplay,
      href: WHATSAPP_URL,
      external: true,
      tone: 'crimson' as const,
    },
    {
      icon: IconPhone,
      label: d.contact.call,
      value: SITE_CONFIG.phone,
      href: SITE_CONFIG.phoneRaw,
      external: false,
      tone: 'elec' as const,
    },
  ]

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      company: String(data.get('company') ?? ''),
      category: String(data.get('category') ?? ''),
      message: String(data.get('message') ?? ''),
      lang,
      ts: new Date().toISOString(),
    }
    try {
      const res = await fetch(API.contact, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-elec-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-elec-400">
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
            {d.contact.label}
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.contact.t1} <span className="text-elec-metal">{d.contact.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-slate-400">{d.contact.sub}</p>
          </Reveal>
        </div>

        <Parallax range={34}>
          <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Direct channels */}
          <Reveal delay={1}>
            <div className="flex h-full flex-col gap-4">
              {cards.map((c) => {
                const Icon = c.icon
                const crimson = c.tone === 'crimson'
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noreferrer' : undefined}
                    className={`glass group flex items-center gap-5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                      crimson ? 'hover:border-crimson-500/40 hover:shadow-crimson-glow' : 'hover:border-elec-500/40 hover:shadow-elec-glow'
                    }`}
                  >
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ring-1 transition-transform duration-300 group-hover:scale-110 ${
                        crimson
                          ? 'from-crimson-500/20 to-crimson-700/20 text-crimson-400 ring-crimson-500/30'
                          : 'from-elec-400/20 to-elec-600/20 text-elec-400 ring-elec-500/30'
                      }`}
                    >
                      <Icon className="size-6" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{c.label}</p>
                      <p className="mt-1 truncate font-semibold text-slate-100" dir="ltr">
                        {c.value}
                      </p>
                    </div>
                    <IconArrow className="ms-auto size-4 shrink-0 text-slate-600 transition-colors group-hover:text-elec-400 rtl-flip" />
                  </a>
                )
              })}

              {/* Response guarantee note */}
              <div className="glass mt-2 rounded-2xl border-l-2 border-l-elec-500 p-5">
                <p className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300">
                  <IconShield className="mt-0.5 size-4 shrink-0 text-elec-400" />
                  {d.contact.guarantee}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={2}>
            <form onSubmit={onSubmit} className="glass rounded-3xl p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.contact.fName} *</span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={d.contact.fNamePh}
                    className="field w-full"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.contact.fEmail} *</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={d.contact.fEmailPh}
                    dir="ltr"
                    className="field w-full"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.contact.fCompany}</span>
                  <input type="text" name="company" placeholder={d.contact.fCompanyPh} className="field w-full" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.contact.fCategory}</span>
                  <select name="category" defaultValue="" className="field w-full">
                    <option value="" disabled>
                      {d.contact.fCategory}
                    </option>
                    {d.catalog.items.map((it) => (
                      <option key={it.name} value={it.name}>
                        {it.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.contact.fMessage} *</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={d.contact.fMessagePh}
                    className="field w-full resize-none"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-glow mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-elec-400 via-elec-500 to-elec-600 px-8 py-4 text-base font-bold text-white shadow-elec-glow transition-all duration-300 hover:scale-[1.01] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? d.contact.sending : d.contact.submit}
                {status !== 'sending' && <IconArrow className="size-5 rtl-flip" />}
              </button>

              {/* Feedback */}
              {status === 'sent' && (
                <p role="status" className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300">
                  <IconCheck className="size-4 shrink-0" />
                  {d.contact.success}
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="mt-4 flex items-center gap-2 rounded-xl border border-crimson-500/40 bg-crimson-500/10 px-4 py-3 text-sm font-semibold text-crimson-300">
                  <IconClose className="size-4 shrink-0" />
                  {d.contact.error}
                </p>
              )}
              <p className="mt-4 text-center text-xs text-slate-600">{d.contact.formSub}</p>
            </form>
          </Reveal>
        </div>
        </Parallax>
      </div>
    </section>
  )
}