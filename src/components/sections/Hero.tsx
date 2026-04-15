import type { Variants } from 'motion/react'
import { motion } from 'motion/react'
import { Parallax } from 'react-scroll-parallax'
import { HiArrowDown } from 'react-icons/hi2'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import ParticleBackground from '../effects/ParticleBackground'
import { personal } from '../../data/portfolio'
import { scrollToSection } from '../../utils/scroll'

// Tipagem explícita como Variants resolve o conflito com o index signature do motion
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Fundo: partículas numa camada parallax mais lenta ── */}
      <Parallax speed={-12} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-brand/10 via-transparent to-transparent" />
        <ParticleBackground />
      </Parallax>

      {/* Gradiente de transição no rodapé da seção */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-bg to-transparent pointer-events-none z-10" />

      {/* ── Conteúdo: texto numa camada parallax mais rápida ── */}
      <Parallax speed={6} className="relative z-20 text-center px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-3"
        >
          <motion.p
            variants={lineVariants}
            className="font-mono text-sm md:text-base text-muted tracking-[0.25em] uppercase"
          >
            {t('personal.greeting')}
          </motion.p>

          <motion.h1
            variants={lineVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gradient leading-none tracking-tight"
          >
            {personal.name}
          </motion.h1>

          <motion.h2
            variants={lineVariants}
            className="text-xl md:text-2xl font-semibold text-muted"
          >
            {t('personal.title')}
          </motion.h2>

          <motion.p
            variants={lineVariants}
            className="max-w-md text-sm md:text-base text-muted leading-relaxed mt-2"
          >
            {t('personal.description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={lineVariants}
            className="flex flex-wrap items-center justify-center gap-4 mt-6"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand/80 glow-brand transition-all duration-300 hover:scale-105"
            >
              <SiGithub size={18} />
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:border-accent hover:text-accent transition-all duration-300 hover:scale-105"
            >
              <FaLinkedin size={18} />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </Parallax>

      {/* ── Seta de scroll ── */}
      <motion.a
        href="#skills"
        onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}
        className="absolute bottom-10 z-20 flex flex-col items-center gap-1 text-muted hover:text-brand transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <HiArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  )
}
