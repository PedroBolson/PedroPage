import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../hooks/useTheme'
import { skills } from '../../data/portfolio'
import type { SkillCategory } from '../../types'
import Badge from '../ui/Badge'

const CHAPTER_META: { key: SkillCategory; accent: string }[] = [
  { key: 'languages', accent: '#3b82f6' },
  { key: 'frameworks', accent: '#06b6d4' },
  { key: 'databases', accent: '#a855f7' },
  { key: 'devops', accent: '#f59e0b' },
]

const DWELL_S = 2.8

export default function SkillsTourOverlay() {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const chapters = CHAPTER_META.map(c => ({
    ...c,
    label: t(`showcase.chapters.${c.key}.label`),
    subtitle: t(`showcase.chapters.${c.key}.subtitle`),
    skills: skills.filter(s => s.category === c.key),
  }))

  useEffect(() => {
    const handleOpen = () => { setIdx(0); setOpen(true) }
    window.addEventListener('skills-tour', handleOpen)
    return () => window.removeEventListener('skills-tour', handleOpen)
  }, [])

  const close = () => {
    setOpen(false)
    const section = document.getElementById('skills')
    if (section) {
      const endY = section.offsetTop + section.offsetHeight - window.innerHeight
      window.scrollTo({ top: endY, behavior: 'instant' })
    }
  }

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      if (idx < chapters.length - 1) setIdx(i => i + 1)
      else close()
    }, DWELL_S * 1000)
    return () => clearTimeout(timer)
  }, [open, idx])

  const chapter = chapters[idx]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-998 flex flex-col bg-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                `linear-gradient(rgba(59,130,246,${isDark ? '0.06' : '0.10'}) 1px, transparent 1px),` +
                `linear-gradient(90deg, rgba(59,130,246,${isDark ? '0.06' : '0.10'}) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Accent glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{ background: `radial-gradient(ellipse 80% 60% at 20% 50%, ${chapter.accent}18, transparent)` }}
          />

          {/* Left bar */}
          <div
            className="absolute left-0 top-0 w-0.75 h-full transition-all duration-700"
            style={{ background: `linear-gradient(to bottom, transparent, ${chapter.accent}80, transparent)` }}
          />

          {/* Progress bar */}
          <div className="relative h-0.5 w-full bg-foreground/10 shrink-0">
            <motion.div
              key={idx}
              className="absolute left-0 top-0 h-full origin-left"
              style={{ backgroundColor: chapter.accent }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DWELL_S, ease: 'linear' }}
            />
          </div>

          {/* Header */}
          <div className="absolute top-6 left-5 flex items-center gap-3 z-10">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/30">
              {t('showcase.label')}
            </span>
            <div className="h-px w-8 bg-foreground/20" />
            <span className="font-mono text-[10px] text-foreground/30">
              {idx + 1} / {chapters.length}
            </span>
          </div>

          {/* Skip */}
          <button
            onClick={close}
            className="absolute top-5 right-5 z-10 font-mono text-[10px] tracking-widest uppercase text-foreground/30 hover:text-foreground/60 transition-colors px-2 py-1"
          >
            skip ✕
          </button>

          {/* Chapter content */}
          <div className="flex-1 flex flex-col justify-center px-5 pr-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <p
                  className="font-mono text-[11px] tracking-[0.3em] uppercase mb-2"
                  style={{ color: chapter.accent }}
                >
                  {chapter.subtitle}
                </p>

                <h2
                  className="text-4xl font-black leading-none mb-6"
                  style={{
                    backgroundImage: `linear-gradient(120deg, var(--color-foreground) 30%, ${chapter.accent})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {chapter.label}
                </h2>

                <div className="flex flex-wrap gap-2">
                  {chapter.skills.map((skill, i) => {
                    const Icon = skill.icon
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 14, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25, delay: i * 0.05, ease: 'easeOut' }}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border"
                        style={{ background: `${chapter.accent}12`, borderColor: `${chapter.accent}35` }}
                      >
                        <Icon size={16} style={{ color: skill.color, flexShrink: 0 }} />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-semibold text-foreground leading-none">
                            {skill.name}
                          </span>
                          <Badge level={skill.level} />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
            {chapters.map((c, i) => (
              <motion.div
                key={c.key}
                className="rounded-full"
                animate={{
                  width: idx === i ? 8 : 5,
                  height: idx === i ? 8 : 5,
                  backgroundColor: idx === i ? c.accent : isDark ? 'rgba(255,255,255,0.55)' : '#94a3b8',
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
