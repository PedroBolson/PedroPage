import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { HiSun, HiMoon, HiBars3, HiXMark } from 'react-icons/hi2'
import { useTheme } from '../../hooks/useTheme'
import { scrollToSection } from '../../utils/scroll'

const NAV_LINKS = [
  { label: 'Início', href: '#hero' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' },
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

export default function Header() {
  const { isDark, toggle } = useTheme()
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
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-sm font-medium text-muted hover:text-brand transition-colors duration-200"
            >
              {link.label}
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
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="py-2 text-sm font-medium text-muted hover:text-brand transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
