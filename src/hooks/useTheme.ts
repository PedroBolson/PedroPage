import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'pb-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (saved) return saved

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  localStorage.setItem(STORAGE_KEY, theme)
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Aplica o tema no mount e em toda troca
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, toggle, isDark: theme === 'dark' }
}
