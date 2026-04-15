import { useRef, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  type MotionValue,
} from 'motion/react'
import { skills } from '../../data/portfolio'
import type { SkillCategory } from '../../types'
import Badge from '../ui/Badge'

// ─── Dados dos capítulos ────────────────────────────────────────────────────────

const CHAPTERS: {
  key: SkillCategory
  label: string
  subtitle: string
  accent: string
  range: [number, number, number, number]
}[] = [
    { key: 'languages', label: 'Linguagens', subtitle: 'A base de tudo', accent: '#3b82f6', range: [0.00, 0.05, 0.22, 0.27] },
    { key: 'frameworks', label: 'Frameworks', subtitle: 'Ferramentas do dia a dia', accent: '#06b6d4', range: [0.24, 0.29, 0.46, 0.51] },
    { key: 'databases', label: 'Databases', subtitle: 'Onde os dados vivem', accent: '#a855f7', range: [0.48, 0.53, 0.70, 0.75] },
    // xs/xe em ≤ 1.0 — View Timeline API exige offset em [0, 1]
    // Persistência no fim do scroll é resolvida via isLast prop no Chapter
    { key: 'devops', label: 'Cloud & DevOps', subtitle: 'Infraestrutura e escala', accent: '#f59e0b', range: [0.72, 0.77, 0.97, 1.00] },
  ]

// ─── Indicador de progresso lateral ────────────────────────────────────────────

function ProgressDots({ activeIndex, isDark }: { activeIndex: number; isDark: boolean }) {
  return (
    <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
      {CHAPTERS.map((c, i) => (
        <div key={c.key} className="relative flex items-center justify-end gap-2">
          {activeIndex === i && (
            <motion.span
              className="text-xs font-mono tracking-wider hidden md:block font-semibold"
              style={{ color: c.accent, filter: 'brightness(1.25)' }}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
            >
              {c.label}
            </motion.span>
          )}
          <motion.div
            className="rounded-full"
            animate={{
              width: activeIndex === i ? 8 : 5,
              height: activeIndex === i ? 8 : 5,
              backgroundColor: activeIndex === i ? c.accent : isDark ? 'rgba(255,255,255,0.55)' : '#94a3b8',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      ))}
    </div>
  )
}

// ─── Capítulo (scroll-linked) ───────────────────────────────────────────────────

function Chapter({
  chapter,
  scrollProgress,
  isActive,
  yRange,
  isLast,
}: {
  chapter: typeof CHAPTERS[0]
  scrollProgress: MotionValue<number>
  isActive: boolean
  yRange: [number, number, number, number]
  isLast: boolean
}) {
  const [rs, re, xs, xe] = chapter.range
  const chapterSkills = skills.filter(s => s.category === chapter.key)

  // Último capítulo: mantém opacity=1 e y=0 ao chegar no fim do scroll
  const opacityOut: [number, number, number, number] = isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  const yOut: [number, number, number, number] = isLast
    ? [yRange[0], yRange[1], yRange[2], 0]
    : yRange

  const opacity    = useTransform(scrollProgress, [rs, re, xs, xe], opacityOut)
  const y          = useTransform(scrollProgress, [rs, re, xs, xe], yOut)
  const titleScale = useTransform(scrollProgress, [rs, re], [1.06, 1])

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center px-5 md:px-16 lg:px-24 pointer-events-none"
    >
      <motion.p
        style={{ color: chapter.accent }}
        className="font-mono text-[11px] md:text-sm tracking-[0.3em] uppercase mb-2 md:mb-3"
      >
        {chapter.subtitle}
      </motion.p>

      <motion.h2
        style={{ scale: titleScale }}
        className="text-4xl md:text-7xl lg:text-8xl font-black leading-none mb-6 md:mb-10 origin-left"
      >
        <span style={{
          backgroundImage: `linear-gradient(120deg, var(--color-foreground) 30%, ${chapter.accent})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          {chapter.label}
        </span>
      </motion.h2>

      {/* Cards — pointer-events-auto para serem clicáveis dentro do layer pointer-events-none */}
      <div className="flex flex-wrap gap-2 md:gap-3 max-w-3xl pointer-events-auto pr-8 md:pr-0">
        <AnimatePresence mode="popLayout">
          {isActive && chapterSkills.map((skill, i) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: 'easeOut' }}
                className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-xl backdrop-blur-sm border"
                style={{ background: `${chapter.accent}12`, borderColor: `${chapter.accent}35` }}
              >
                <Icon size={18} style={{ color: skill.color, flexShrink: 0 }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs md:text-sm font-semibold text-foreground leading-none">
                    {skill.name}
                  </span>
                  <Badge level={skill.level} />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Componente principal ───────────────────────────────────────────────────────

export default function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const { isDark } = useTheme()

  // Calculado uma vez no render — CSR puro, window sempre disponível
  const isMobile = window.matchMedia('(max-width: 767px)').matches

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Paralaxe y reduzido no mobile — gesto de touch é mais curto e preciso
  const yRange: [number, number, number, number] = isMobile ? [24, 0, 0, -12] : [40, 0, 0, -28]

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const found = CHAPTERS.findIndex((c, i) => {
      const midFadeIn = c.range[0] + (c.range[1] - c.range[0]) * 0.5
      const isLast = i === CHAPTERS.length - 1
      return latest >= midFadeIn && (isLast ? latest <= c.range[3] : latest < c.range[3])
    })
    setActiveIndex(found)
  })

  const bgAccentOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.06, 0.06, 0])
  const hintOpacity    = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  return (
    /*
     * Container responsivo:
     *   mobile  → 450vh  (~112vh por capítulo — breathing room confortável no touch)
     *   desktop → 700vh  (hold longo, efeito Apple premium)
     *
     * touch-action: pan-y garante que o primeiro gesto de touch inicia scroll
     * imediatamente, sem o browser iOS "engolir" o primeiro toque para decidir zoom.
     */
    <div
      ref={containerRef}
      id="skills"
      className="h-[450vh] md:h-[700vh]"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Div sticky — usa 100dvh em vez de h-screen (100vh) para descontar
          a barra do navegador iOS que aparece/some e causava o "salto" */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100dvh' }}
      >
        {/* Fundo base — acompanha o tema */}
        <div className="absolute inset-0 bg-bg" />

        {/* Grid de circuito */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              `linear-gradient(rgba(59,130,246,${isDark ? '0.06' : '0.10'}) 1px, transparent 1px),` +
              `linear-gradient(90deg, rgba(59,130,246,${isDark ? '0.06' : '0.10'}) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Glow de acento que muda com o capítulo ativo */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: activeIndex >= 0
              ? `radial-gradient(ellipse 80% 60% at 20% 50%, ${CHAPTERS[activeIndex]?.accent}18, transparent)`
              : 'none',
            opacity: bgAccentOpacity,
            transition: 'background 0.8s ease',
          }}
        />

        {/* Linha de acento esquerda */}
        <div
          className="absolute left-0 top-0 w-0.75 h-full transition-all duration-700"
          style={{
            background: activeIndex >= 0
              ? `linear-gradient(to bottom, transparent, ${CHAPTERS[activeIndex]?.accent}80, transparent)`
              : 'transparent',
          }}
        />

        {/* Label de progresso no topo */}
        <div className="absolute top-6 md:top-8 left-5 md:left-16 flex items-center gap-3 z-20">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-foreground/30">
            Tech Stack
          </span>
          <div className="h-px w-8 md:w-12 bg-foreground/20" />
          <span className="font-mono text-[10px] md:text-xs text-foreground/30">
            {activeIndex >= 0 ? `${activeIndex + 1} / ${CHAPTERS.length}` : ''}
          </span>
        </div>

        {/* Capítulos */}
        {CHAPTERS.map((chapter, i) => (
          <Chapter
            key={chapter.key}
            chapter={chapter}
            scrollProgress={scrollYProgress}
            isActive={activeIndex === i}
            isLast={i === CHAPTERS.length - 1}
            yRange={yRange}
          />
        ))}

        <ProgressDots activeIndex={activeIndex} isDark={isDark} />

        {/* Hint de scroll */}
        <motion.div
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ opacity: hintOpacity }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-foreground/30">
            scroll para explorar
          </span>
          <motion.div
            className="w-px h-6 md:h-8 bg-foreground/20 origin-top"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  )
}
