import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { personal } from '../../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

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
          Feito com React + Tailwind v4
        </span>
      </div>
    </footer>
  )
}
