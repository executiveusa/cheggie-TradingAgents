'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from './i18n'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'sr',
  setLang: () => {},
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('sr')
  const toggle = () => setLang((l) => (l === 'sr' ? 'en' : 'sr'))

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
