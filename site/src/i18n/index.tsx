import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dict, LANG_META, type Dict, type Lang } from './dict'

const STORAGE_KEY = 'berrehail_lang'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  d: Dict
  /** Resolve a dotted path inside the current dictionary, e.g. t('hero.sub') */
  t: (path: string) => string
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  d: dict.en,
  t: (p) => p,
})

function resolve(obj: unknown, path: string): string {
  const val = path.split('.').reduce<unknown>((acc, k) => (acc as Record<string, unknown> | undefined)?.[k], obj)
  return typeof val === 'string' ? val : path
}

function getInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && saved in dict) return saved as Lang
  } catch {
    /* storage unavailable */
  }
  const nav = navigator.language?.toLowerCase() ?? ''
  if (nav.startsWith('ar')) return 'ar'
  if (nav.startsWith('zh')) return 'zh'
  if (nav.startsWith('tr')) return 'tr'
  if (nav.startsWith('es')) return 'es'
  return 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  useEffect(() => {
    const meta = LANG_META[lang]
    document.documentElement.lang = lang
    document.documentElement.dir = meta.dir
    document.title = meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', meta.description)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      d: dict[lang],
      t: (path) => resolve(dict[lang], path),
    }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

export { LANG_META }
export type { Lang }