import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { HiSun, HiMoon, HiBars3, HiXMark, HiChevronDown } from 'react-icons/hi2'
import { useTheme } from '../../hooks/useTheme'
import { scrollToSection } from '../../utils/scroll'

const NAV_KEYS = [
  { key: 'home',     href: '#hero'     },
  { key: 'skills',   href: '#skills'   },
  { key: 'projects', href: '#projects' },
  { key: 'contact',  href: '#contact'  },
]

const TOTAL_STEPS = 10 // "edro " (5) + "olson" (5)

function getInner(count: number): { before: string; after: string } {
  if (count === 0) return { before: 'PB', after: '' }
  if (count <= 5)  return { before: 'P' + 'edro '.slice(0, count), after: 'B' }
  return             { before: 'Pedro B' + 'olson'.slice(0, count - 5), after: '' }
}

function LogoText() {
  const [hovered, setHovered] = useState(false)
  const [count, setCount]     = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (hovered) {
      intervalRef.current = setInterval(() => {
        setCount(c => {
          if (c >= TOTAL_STEPS) { clearInterval(intervalRef.current!); return c }
          return c + 1
        })
      }, 60)
    } else {
      intervalRef.current = setInterval(() => {
        setCount(c => {
          if (c <= 0) { clearInterval(intervalRef.current!); return 0 }
          return c - 1
        })
      }, 28)
    }

    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [hovered])

  const { before, after } = getInner(count)
  const isExpanded = count > 0

  return (
    <span
      className="inline-flex items-baseline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {'<'}
      <span>{before}</span>
      {isExpanded && (
        <motion.span
          className="text-brand"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        >
          |
        </motion.span>
      )}
      <span>{after}</span>
      {' />'}
    </span>
  )
}

const LANGS = [
  { code: 'pt', label: 'Português', flag: 'br' },
  { code: 'en', label: 'English',   flag: 'us' },
  { code: 'es', label: 'Español',   flag: 'es' },
] as const

function LangPicker() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = LANGS.find(l => l.code === i18n.language) ?? LANGS[0]

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Select language"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-muted hover:text-foreground hover:bg-surface2 transition-all duration-200"
      >
        <span className={`fi fi-${current.flag}`} style={{ fontSize: 14, borderRadius: 2 }} />
        <span className="uppercase tracking-wide">{current.code}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex' }}
        >
          <HiChevronDown size={12} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-1.5 w-36 bg-surface border border-border rounded-xl shadow-lg shadow-black/10 overflow-hidden z-50"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {LANGS.map(lang => (
              <button
                key={lang.code}
                onClick={() => { i18n.changeLanguage(lang.code); setOpen(false) }}
                className={[
                  'w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors duration-150',
                  i18n.language === lang.code
                    ? 'bg-brand/10 text-brand font-semibold'
                    : 'text-muted hover:bg-surface2 hover:text-foreground',
                ].join(' ')}
              >
                <span className={`fi fi-${lang.flag} shrink-0`} style={{ fontSize: 16, borderRadius: 2 }} />
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Header() {
  const { isDark, toggle } = useTheme()
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    closeMenu()
    scrollToSection(href.slice(1))
  }

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-lg shadow-black/10' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => handleNav(e, '#hero')}
          className="font-mono font-bold text-xl text-gradient select-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoText />
        </motion.a>

        {/* Nav desktop */}
        <motion.nav
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {NAV_KEYS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-sm font-medium text-muted hover:text-brand transition-colors duration-200"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </motion.nav>

        {/* Controles direita */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Seletor de idioma */}
          <div className="hidden md:flex">
            <LangPicker />
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-brand hover:bg-surface2 transition-all duration-200"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Hamburguer mobile */}
          <button
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted hover:text-brand hover:bg-surface2 transition-all duration-200"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <HiXMark size={22} /> : <HiBars3 size={22} />}
          </button>
        </motion.div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden glass border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {NAV_KEYS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="py-2 text-sm font-medium text-muted hover:text-brand transition-colors"
                >
                  {t(`nav.${link.key}`)}
                </a>
              ))}
              <div className="pt-3 pb-1 border-t border-border mt-2">
                <LangPicker />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
