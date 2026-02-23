'use client'

import { useSyncExternalStore } from 'react'

export type Lang = 'es' | 'en'

function detectLanguage(): Lang {
  if (typeof navigator === 'undefined') return 'es'

  return navigator.language.startsWith('en') ? 'en' : 'es'
}

function subscribe() {
  return () => {}
}

export function useLanguage(): { lang: Lang; mounted: boolean } {
  const lang = useSyncExternalStore<Lang>(subscribe, detectLanguage, () => 'es')

  return {
    lang,
    mounted: true,
  }
}
