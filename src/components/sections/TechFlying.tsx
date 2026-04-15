import { Parallax } from 'react-scroll-parallax'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { flyingTechs } from '../../data/portfolio'

/**
 * Posicionamento fixo de cada ícone voador na cena.
 * top/left em %, speed parallax e tamanho.
 * A variação de speed cria profundidade: ícones com speed alto
 * "passam" mais rápido enquanto os de speed baixo ficam "mais longe".
 */
const PLACEMENTS = [
  { top: 8, left: 5, speed: -18, size: 52, opacity: 0.9 },
  { top: 12, left: 78, speed: 14, size: 64, opacity: 1.0 },
  { top: 22, left: 28, speed: -10, size: 44, opacity: 0.75 },
  { top: 18, left: 55, speed: 20, size: 56, opacity: 0.85 },
  { top: 35, left: 8, speed: 16, size: 48, opacity: 0.8 },
  { top: 38, left: 70, speed: -14, size: 60, opacity: 0.9 },
  { top: 50, left: 20, speed: 22, size: 40, opacity: 0.7 },
  { top: 48, left: 46, speed: -20, size: 72, opacity: 1.0 },
  { top: 60, left: 85, speed: 12, size: 50, opacity: 0.8 },
  { top: 65, left: 2, speed: -16, size: 58, opacity: 0.85 },
  { top: 72, left: 62, speed: 18, size: 46, opacity: 0.75 },
  { top: 78, left: 35, speed: -12, size: 66, opacity: 0.9 },
  { top: 85, left: 15, speed: 10, size: 42, opacity: 0.7 },
  { top: 90, left: 88, speed: -22, size: 54, opacity: 0.85 },
]

export default function TechFlying() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden py-8" style={{ minHeight: '120vh' }}>

      {/* Fundo escuro com gradiente */}
      <div className="absolute inset-0 bg-linear-to-b from-bg via-surface to-bg" />

      {/* Grid tênue — sensação de circuito */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-brand) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Label central */}
      <div className="relative z-10 flex flex-col items-center justify-center" style={{ minHeight: '120vh' }}>
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted mb-3">
            {t('techFlying.eyebrow')}
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-gradient leading-tight">
            {t('techFlying.heading1')}<br />{t('techFlying.heading2')}
          </h2>
        </motion.div>
      </div>

      {/* ── Ícones voadores — cada um em sua própria camada de parallax ── */}
      {flyingTechs.map((tech, i) => {
        const p = PLACEMENTS[i % PLACEMENTS.length]
        const Icon = tech.icon

        return (
          <Parallax
            key={tech.name}
            speed={p.speed}
            className="absolute"
            style={{ top: `${p.top}%`, left: `${p.left}%` }}
          >
            <motion.div
              className="flex flex-col items-center gap-1.5 select-none"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: p.opacity, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: 'backOut' }}
            >
              {/* Ícone com glow */}
              <div
                className="rounded-2xl p-3 bg-surface/60 backdrop-blur-sm border border-border/50"
                style={{ boxShadow: `0 0 32px ${tech.color}33` }}
              >
                <Icon
                  size={p.size}
                  style={{ color: tech.color, filter: `drop-shadow(0 0 8px ${tech.color}88)` }}
                />
              </div>

              {/* Label */}
              <span
                className="font-mono text-[11px] font-semibold tracking-wide"
                style={{ color: tech.color }}
              >
                {tech.name}
              </span>
            </motion.div>
          </Parallax>
        )
      })}
    </section>
  )
}
