import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../hooks/useTheme'
import gsap from 'gsap'
import { skills } from '../../data/portfolio'
import type { SkillCategory } from '../../types'
import Badge from '../ui/Badge'

// ─── Constants ─────────────────────────────────────────────────────────────────

const DWELL_MS = 4000

const CHAPTER_META: { key: SkillCategory; accent: string }[] = [
  { key: 'languages', accent: '#3b82f6' },
  { key: 'frameworks', accent: '#06b6d4' },
  { key: 'databases', accent: '#a855f7' },
  { key: 'devops', accent: '#f59e0b' },
]

// ─── Component ─────────────────────────────────────────────────────────────────

export default function SkillsSpotlight() {
  // activeIndex = tab highlight + timer. displayIndex = content rendered.
  // They diverge for ~280ms during the exit animation.
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const { isDark } = useTheme()
  const { t } = useTranslation()
  const prefersReduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const panelRef = useRef<HTMLDivElement>(null)
  const directionRef = useRef(1) // 1 = forward, -1 = backward

  // Dwell timer + progress
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const elapsedRef = useRef(0)
  const startTimeRef = useRef(Date.now())
  const isHoveredRef = useRef(false)
  const isFocusedRef = useRef(false)
  const isPausedRef = useRef(false)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const wapiRef = useRef<Animation | null>(null)

  const chapters = useMemo(() =>
    CHAPTER_META.map(c => ({
      ...c,
      label: t(`showcase.chapters.${c.key}.label`),
      subtitle: t(`showcase.chapters.${c.key}.subtitle`),
      skills: skills.filter(s => s.category === c.key),
    })),
    [t]
  )

  const active = chapters[activeIndex]
  const displayed = chapters[displayIndex]

  // ─── Animation: reacts to activeIndex changes (from timer OR tab click) ──────
  // Separating animation from state avoids nested setState + stale closure bugs.

  const prevIndexRef = useRef(0)

  useEffect(() => {
    const prev = prevIndexRef.current
    prevIndexRef.current = activeIndex
    if (activeIndex === prev) return

    // Wrap-around (3→0) should feel like going forward
    const isWrap = prev === CHAPTER_META.length - 1 && activeIndex === 0
    const dir = (isWrap || activeIndex > prev) ? 1 : -1
    directionRef.current = dir

    if (prefersReduced || !panelRef.current) {
      setDisplayIndex(activeIndex)
      return
    }

    const next = activeIndex
    gsap.killTweensOf(panelRef.current)

    gsap.to(panelRef.current, {
      x: `${-14 * dir}%`,
      rotateY: 12 * dir,
      scale: 0.94,
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: () => {
        flushSync(() => setDisplayIndex(next))
        gsap.fromTo(panelRef.current!,
          { x: `${14 * dir}%`, rotateY: -12 * dir, scale: 0.94, opacity: 0 },
          { x: '0%', rotateY: 0, scale: 1, opacity: 1, duration: 0.38, ease: 'power3.out' }
        )
      },
    })
  }, [activeIndex, prefersReduced])

  // ─── Badge stagger whenever displayed content changes ───────────────────────

  useEffect(() => {
    if (prefersReduced || !panelRef.current) return
    const badges = panelRef.current.querySelectorAll('[data-badge-item]')
    gsap.fromTo(badges,
      { opacity: 0, y: 10, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.22, stagger: 0.04, ease: 'power2.out', delay: 0.05 }
    )
  }, [displayIndex, prefersReduced])

  // ─── Select: pure state update only, animation handled above ────────────────

  const select = useCallback((next: number) => {
    if (next === activeIndex) return
    setActiveIndex(next)
  }, [activeIndex])

  // ─── Dwell timer ────────────────────────────────────────────────────────────

  const startDwell = useCallback((fromMs: number) => {
    if (prefersReduced) return
    const remaining = Math.max(50, DWELL_MS - fromMs)
    startTimeRef.current = Date.now()

    if (progressBarRef.current) {
      wapiRef.current?.cancel()
      const anim = progressBarRef.current.animate(
        [{ transform: `scaleX(${fromMs / DWELL_MS})` }, { transform: 'scaleX(1)' }],
        { duration: remaining, fill: 'forwards', easing: 'linear' }
      )
      if (isPausedRef.current) anim.pause()
      wapiRef.current = anim
    }

    if (timerRef.current) clearTimeout(timerRef.current)
    if (!isPausedRef.current) {
      // Pure state update — no animation logic, no stale closures
      timerRef.current = setTimeout(() => {
        setActiveIndex(prev => (prev + 1) % CHAPTER_META.length)
      }, remaining)
    }
  }, [prefersReduced])

  const pauseIfNeeded = useCallback(() => {
    if (isPausedRef.current || prefersReduced) return
    isPausedRef.current = true
    elapsedRef.current += Date.now() - startTimeRef.current
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
    wapiRef.current?.pause()
  }, [prefersReduced])

  const resumeIfPossible = useCallback(() => {
    if (isHoveredRef.current || isFocusedRef.current) return
    if (!isPausedRef.current || prefersReduced) return
    isPausedRef.current = false
    startDwell(elapsedRef.current)
  }, [prefersReduced, startDwell])

  const onMouseEnter = useCallback(() => { isHoveredRef.current = true; pauseIfNeeded() }, [pauseIfNeeded])
  const onMouseLeave = useCallback(() => { isHoveredRef.current = false; resumeIfPossible() }, [resumeIfPossible])
  const onSectionFocus = useCallback(() => { isFocusedRef.current = true; pauseIfNeeded() }, [pauseIfNeeded])
  const onSectionBlur = useCallback((e: React.FocusEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    isFocusedRef.current = false
    resumeIfPossible()
  }, [resumeIfPossible])

  useEffect(() => {
    if (prefersReduced) return
    elapsedRef.current = 0
    isPausedRef.current = isHoveredRef.current || isFocusedRef.current
    if (!isPausedRef.current) startDwell(0)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      wapiRef.current?.cancel()
    }
  }, [activeIndex, prefersReduced, startDwell])

  // ─── Tab keyboard nav ────────────────────────────────────────────────────────

  const onTabKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const total = CHAPTER_META.length
    let next = -1
    if (e.key === 'ArrowRight') { e.preventDefault(); next = (index + 1) % total }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); next = (index - 1 + total) % total }
    else if (e.key === 'Home') { e.preventDefault(); next = 0 }
    else if (e.key === 'End') { e.preventDefault(); next = total - 1 }
    if (next >= 0) { select(next); tabRefs.current[next]?.focus() }
  }, [select])

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <section
      id="skills"
      aria-label={t('showcase.label')}
      className="relative overflow-hidden py-20 md:py-28"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onSectionFocus}
      onBlur={onSectionBlur}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            `linear-gradient(rgba(59,130,246,${isDark ? '0.06' : '0.10'}) 1px, transparent 1px),` +
            `linear-gradient(90deg, rgba(59,130,246,${isDark ? '0.06' : '0.10'}) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 80% 60% at 20% 50%, ${active.accent}18, transparent)` }}
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 w-0.75 h-full transition-all duration-700"
        style={{ background: `linear-gradient(to bottom, transparent, ${active.accent}80, transparent)` }}
      />

      <div className="relative max-w-5xl mx-auto px-5 md:px-16">

        <div className="flex items-center gap-2 mb-6 md:mb-8">
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-foreground/25">
            {t('showcase.label')}
          </span>
          <div className="h-px w-5 bg-foreground/15" />
          <span className="font-mono text-[9px] text-foreground/25">
            {activeIndex + 1} / {chapters.length}
          </span>
        </div>

        <div
          role="tablist"
          aria-label={t('showcase.label')}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-10 md:mb-14"
        >
          {chapters.map((chapter, i) => {
            const isActive = activeIndex === i
            return (
              <button
                key={chapter.key}
                ref={el => { tabRefs.current[i] = el }}
                role="tab"
                id={`skills-tab-${chapter.key}`}
                aria-selected={isActive}
                aria-controls="skills-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={e => onTabKeyDown(e, i)}
                className={[
                  'relative flex flex-col gap-1.5 px-4 py-3 rounded-xl border text-left overflow-hidden',
                  'transition-colors duration-300 min-h-18',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60',
                  'focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                ].join(' ')}
                style={{
                  borderColor: isActive ? `${chapter.accent}60` : 'var(--color-border)',
                  background: isActive ? `${chapter.accent}0e` : 'var(--color-surface)',
                }}
              >
                {isActive && !prefersReduced && (
                  <div
                    ref={progressBarRef}
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
                    style={{ backgroundColor: chapter.accent, transform: 'scaleX(0)' }}
                  />
                )}
                <span
                  className="font-semibold text-sm leading-tight transition-colors duration-300"
                  style={{ color: isActive ? 'var(--color-foreground)' : 'var(--color-muted)' }}
                >
                  {chapter.label}
                </span>
                <span
                  className="font-mono text-[10px] leading-tight truncate transition-colors duration-300"
                  style={{ color: isActive ? chapter.accent : 'var(--color-muted)' }}
                >
                  {chapter.subtitle}
                </span>
              </button>
            )
          })}
        </div>

        {/* Single panel — GSAP rotates this on Y axis (exit/enter).
            No preserve-3d needed: no Safari rendering bugs, no height measurement. */}
        <div style={{ perspective: prefersReduced ? undefined : '900px' }}>
          <div
            ref={panelRef}
            role="tabpanel"
            id="skills-panel"
            aria-labelledby={`skills-tab-${active.key}`}
          >
            <p
              className="font-mono text-[10px] tracking-[0.28em] uppercase mb-2"
              style={{ color: displayed.accent }}
            >
              {displayed.subtitle}
            </p>

            <h2 className="text-2xl md:text-4xl font-black leading-none mb-5">
              <span style={{
                backgroundImage: `linear-gradient(120deg, var(--color-foreground) 30%, ${displayed.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {displayed.label}
              </span>
            </h2>

            <div className="flex flex-wrap gap-2 md:gap-2.5">
              {displayed.skills.map((skill) => {
                const Icon = skill.icon
                return (
                  <div
                    key={skill.name}
                    data-badge-item=""
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border"
                    style={{
                      background: `${displayed.accent}12`,
                      borderColor: `${displayed.accent}40`,
                    }}
                  >
                    <Icon size={14} style={{ color: isDark ? skill.color : (skill.lightColor ?? skill.color), flexShrink: 0 }} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-foreground leading-none">
                        {skill.name}
                      </span>
                      <Badge level={skill.level} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
