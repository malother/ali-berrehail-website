import { useEffect, useState, type FormEvent } from 'react'
import { useLang } from '../i18n'
import { API } from '../config'
import { IconCheck, IconClose } from './Icons'
import Reveal from './Reveal'
import Parallax from './Parallax'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const INQUIRY_EVENT = 'berrehail:inquiry'

/** Prefill payload fired by the Catalog multi-select CTA. */
function dispatchInquiry(categories: string[]) {
  window.dispatchEvent(new CustomEvent(INQUIRY_EVENT, { detail: { categories } }))
}

export { dispatchInquiry }

export default function Inquiry() {
  const { d, lang } = useLang()
  const [status, setStatus] = useState<Status>('idle')
  const [selected, setSelected] = useState<string[]>([])

  /* Receive prefill requests from the catalog multi-select CTA */
  useEffect(() => {
    const onEvent = (e: Event) => {
      const detail = (e as CustomEvent<{ categories?: string[] }>).detail
      if (detail?.categories?.length) {
        setSelected(detail.categories)
      }
    }
    window.addEventListener(INQUIRY_EVENT, onEvent)
    return () => window.removeEventListener(INQUIRY_EVENT, onEvent)
  }, [])

  const toggle = (name: string) => {
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      company: String(data.get('company') ?? ''),
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      quantity: String(data.get('quantity') ?? ''),
      inquiryType: String(data.get('inquiryType') ?? ''),
      categories: selected,
      message: String(data.get('message') ?? ''),
      lang,
      ts: new Date().toISOString(),
    }
    try {
      const res = await fetch(API.wholesale, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      setSelected([])
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const items = d.catalog.items

  return (
    <section id="inquiry" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-elec-500/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-elec-400">
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
            {d.inquiry.label}
            <span className="h-px w-8 bg-elec-500" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              {d.inquiry.t1} <span className="text-elec-metal">{d.inquiry.t2}</span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 text-slate-400">{d.inquiry.sub}</p>
          </Reveal>
        </div>

        {/* Form */}
        <Parallax range={30}>
          <Reveal delay={2}>
            <form onSubmit={onSubmit} className="glass mx-auto mt-14 max-w-4xl rounded-3xl p-8 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.inquiry.fCompany} *</span>
                  <input type="text" name="company" required placeholder={d.inquiry.fCompanyPh} className="field w-full" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.inquiry.fName} *</span>
                  <input type="text" name="name" required placeholder={d.inquiry.fNamePh} className="field w-full" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.inquiry.fEmail} *</span>
                  <input type="email" name="email" required placeholder={d.inquiry.fEmailPh} dir="ltr" className="field w-full" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.inquiry.fPhone}</span>
                  <input type="tel" name="phone" placeholder={d.inquiry.fPhonePh} dir="ltr" className="field w-full" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.inquiry.fQuantity}</span>
                  <input type="text" name="quantity" placeholder={d.inquiry.fQuantityPh} className="field w-full" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.inquiry.fType} *</span>
                  <select name="inquiryType" required defaultValue="" className="field w-full">
                    <option value="" disabled>
                      {d.inquiry.fType}
                    </option>
                    {d.inquiry.fTypeOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Multi-select categories */}
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 block text-sm font-semibold text-slate-300">
                    {d.inquiry.fCategories} {selected.length > 0 && <span className="text-elec-400">· {selected.length}</span>}
                  </legend>
                  <div className="flex flex-wrap gap-2" role="group" aria-label={d.inquiry.fCategories}>
                    {items.map((it) => {
                      const on = selected.includes(it.name)
                      return (
                        <button
                          key={it.name}
                          type="button"
                          onClick={() => toggle(it.name)}
                          aria-pressed={on}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                            on
                              ? 'bg-gradient-to-r from-elec-400 to-elec-600 font-bold text-white shadow-elec-glow'
                              : 'glass text-slate-300 hover:border-elec-500/50 hover:text-elec-300'
                          }`}
                        >
                          {it.name}
                        </button>
                      )
                    })}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{d.inquiry.fCategoriesHint}</p>
                </fieldset>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">{d.inquiry.fMessage} *</span>
                  <textarea name="message" required rows={5} placeholder={d.inquiry.fMessagePh} className="field w-full resize-none" />
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-glow mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-elec-400 via-elec-500 to-elec-600 px-8 py-4 text-base font-bold text-white shadow-elec-glow transition-all duration-300 hover:scale-[1.01] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? d.inquiry.sending : d.inquiry.submit}
                {status !== 'sending' && <IconCheck className="size-5" />}
              </button>

              {status === 'sent' && (
                <p role="status" className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-300">
                  <IconCheck className="size-4 shrink-0" />
                  {d.inquiry.success}
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="mt-4 flex items-center gap-2 rounded-xl border border-crimson-500/40 bg-crimson-500/10 px-4 py-3 text-sm font-semibold text-crimson-300">
                  <IconClose className="size-4 shrink-0" />
                  {d.inquiry.error}
                </p>
              )}
              <p className="mt-4 text-center text-xs text-slate-600">{d.inquiry.formSub}</p>
            </form>
          </Reveal>
        </Parallax>
      </div>
    </section>
  )
}