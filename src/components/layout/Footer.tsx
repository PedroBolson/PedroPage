import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { personal } from '../../data/portfolio'

function CoffeeCup() {
  const wisp = (delay: number) => ({
    animate: { opacity: [0, 0.55, 0] as number[], y: [0, -3, -6] as number[] },
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const, delay },
  })

  return (
    <svg
      viewBox="0 0 16 20"
      width="14" height="17"
      className="inline-block ml-0.5"
      style={{ color: 'currentColor', verticalAlign: '0px' }}
    >
      {/* Fumaça */}
      <motion.path d="M4 8C3 6 5 5 4 3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" {...wisp(0)} />
      <motion.path d="M8 8C7 6 9 5 8 3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" {...wisp(0.9)} />
      {/* Borda da xícara */}
      <rect x="1" y="8" width="10" height="1.5" rx="0.75" fill="currentColor" opacity="0.9" />
      {/* Corpo */}
      <path d="M1.5 9.5L1 19H11L10.5 9.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      {/* Alça */}
      <path d="M10.5 11C14 11 14 17 10.5 17" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        <span className="font-mono text-sm text-muted">
          {'<PB />'} &copy; {year}
        </span>

        <div className="flex items-center gap-4">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-brand transition-colors"
          >
            <SiGithub size={18} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-accent transition-colors"
          >
            <FaLinkedin size={18} />
          </a>
        </div>

        <span className="text-xs text-muted">
          {(() => {
            const [before, after] = t('footer.tagline').split('{cup}')
            return <>{before}<CoffeeCup />{after}</>
          })()}
        </span>

      </div>
    </footer>
  )
}
