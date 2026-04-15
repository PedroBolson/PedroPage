import { useRef, useState } from 'react'
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

// ─── Capítulos do scroll story ─────────────────────────────────────────────────

const CHAPTERS: {
  key: SkillCategory
  label: string
  subtitle: string
  accent: string
  range: [number, number, number, number] // [fadeIn_start, fadeIn_end, fadeOut_start, fadeOut_end]
}[] = [
    //                                                                                    fadeIn       hold          fadeOut
    { key: 'languages', label: 'Linguagens', subtitle: 'A base de tudo', accent: '#3b82f6', range: [0.00, 0.07, 0.20, 0.27] },  // hold: 13%
    { key: 'frameworks', label: 'Frameworks', subtitle: 'Ferramentas do dia a dia', accent: '#06b6d4', range: [0.24, 0.31, 0.44, 0.51] },  // hold: 13%
    { key: 'databases', label: 'Databases', subtitle: 'Onde os dados vivem', accent: '#a855f7', range: [0.48, 0.55, 0.68, 0.75] },  // hold: 13%
    { key: 'devops', label: 'Cloud & DevOps', subtitle: 'Infraestrutura e escala', accent: '#f59e0b', range: [0.72, 0.79, 0.96, 1.00] },  // hold: 17%
  ]

// ─── Indicador de progresso lateral ────────────────────────────────────────────

function ProgressDots({
  activeIndex,
}: {
  activeIndex: number
}) {
  return (
    <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
      {CHAPTERS.map((c, i) => (
        <div key={c.key} className="relative flex items-center justify-end gap-2">
          {activeIndex === i && (
            <motion.span
              className="text-[10px] font-mono tracking-wider hidden md:block"
              style={{ color: c.accent }}
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
              backgroundColor: activeIndex === i ? c.accent : 'rgba(255,255,255,0.25)',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      ))}
    </div>
  )
}

// ─── Cada capítulo do scroll story ─────────────────────────────────────────────

function Chapter({
  chapter,
  scrollProgress,
  isActive,
}: {
  chapter: typeof CHAPTERS[0]
  scrollProgress: MotionValue<number>
  isActive: boolean
}) {
  const [rs, re, xs, xe] = chapter.range
  const chapterSkills = skills.filter(s => s.category === chapter.key)

  // Transformações scroll-linked para o container do capítulo
  const opacity = useTransform(scrollProgress, [rs, re, xs, xe], [0, 1, 1, 0])
  const y = useTransform(scrollProgress, [rs, re, xs, xe], [40, 0, 0, -28])

  // Zoom sutil de entrada no título
  const titleScale = useTransform(scrollProgress, [rs, re], [1.06, 1])

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 pointer-events-none"
    >
      {/* Subtitle / eyebrow */}
      <motion.p
        style={{ color: chapter.accent }}
        className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-3"
      >
        {chapter.subtitle}
      </motion.p>

      {/* Título com zoom de entrada */}
      <motion.h2
        style={{ scale: titleScale }}
        className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-10 origin-left"
        css-gradient={chapter.accent}
      >
        <span
          style={{
            backgroundImage: `linear-gradient(120deg, white 30%, ${chapter.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {chapter.label}
        </span>
      </motion.h2>

      {/* Cards com AnimatePresence + stagger — reagem a isActive */}
      <div className="flex flex-wrap gap-3 max-w-3xl pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {isActive &&
            chapterSkills.map((skill, i) => {
              const Icon = skill.icon
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: 'easeOut' }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm border"
                  style={{
                    background: `${chapter.accent}12`,
                    borderColor: `${chapter.accent}35`,
                  }}
                >
                  <Icon size={22} style={{ color: skill.color, flexShrink: 0 }} />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-white leading-none">
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Detecta qual capítulo está ativo — usa o ponto médio do fade-in como trigger
  // `<= range[3]` no último capítulo evita o bug de boundary onde scrollYProgress=1.0
  // faria a condição `< 1.00` falhar e sumir os badges abruptamente
  useMotionValueEvent(scrollYProgress, 'change', latest => {
    const found = CHAPTERS.findIndex((c, i) => {
      const midFadeIn = c.range[0] + (c.range[1] - c.range[0]) * 0.5
      const isLast = i === CHAPTERS.length - 1
      return latest >= midFadeIn && (isLast ? latest <= c.range[3] : latest < c.range[3])
    })
    setActiveIndex(found)
  })

  // Cor de acento que interpola entre os capítulos (para o fundo)
  const bgAccentOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.06, 0.06, 0])

  return (
    /* Container de 700vh — mais scroll físico por capítulo = transição mais suave */
    <div ref={containerRef} style={{ height: '700vh' }} id="scroll-showcase">
      {/* Div sticky — fica visível durante todo o scroll do container */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Fundo escuro base */}
        <div className="absolute inset-0 bg-[oklch(0.07_0.025_265)]" />

        {/* Grid de circuito (tênue) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)',
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

        {/* Label de progresso topo */}
        <div className="absolute top-8 left-8 md:left-16 flex items-center gap-3 z-20">
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/30">
            Tech Stack
          </span>
          <div className="h-px w-12 bg-white/20" />
          <span className="font-mono text-xs text-white/30">
            {activeIndex >= 0 ? `${activeIndex + 1} / ${CHAPTERS.length}` : ''}
          </span>
        </div>

        {/* Capítulos (sobrepostos, scroll-linked) */}
        {CHAPTERS.map((chapter, i) => (
          <Chapter
            key={chapter.key}
            chapter={chapter}
            scrollProgress={scrollYProgress}
            isActive={activeIndex === i}
          />
        ))}

        {/* Indicador de progresso lateral */}
        <ProgressDots activeIndex={activeIndex} />

        {/* Hint de scroll (só no início) */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
          }}
        >
          <span className="text-[10px] font-mono tracking-widest uppercase text-white/30">
            scroll para explorar
          </span>
          <motion.div
            className="w-px h-8 bg-white/20 origin-top"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  )
}
