import { animate } from 'motion'
import type { AnimationPlaybackControls } from 'motion'

// Altura do header fixo
const HEADER_H = 64

// Progresso (0–1) do meio do plateau de cada capítulo em ScrollShowcase
// languages [0.05–0.22], frameworks [0.29–0.46], databases [0.53–0.70], devops [0.77–0.97]
const CHAPTER_PROGRESS = [0.135, 0.375, 0.67, 1.0] as const

function runCinematicScroll(sectionStart: number, sectionRange: number, fromY: number): void {
  const waypoints = CHAPTER_PROGRESS
    .map(p => sectionStart + p * sectionRange)
    .filter(wp => wp > fromY + 20) // só capítulos à frente

  if (waypoints.length === 0) return

  const isMobile = window.matchMedia('(hover: none)').matches

  // ── Mobile: scroll nativo único até o fim — sem interrupções JS ────────
  if (isMobile) {
    const cancel = () => {
      window.scrollTo({ top: window.scrollY, behavior: 'instant' as ScrollBehavior })
      window.removeEventListener('touchstart', cancel)
    }
    setTimeout(() => {
      if (window.scrollY < sectionStart + sectionRange)
        window.addEventListener('touchstart', cancel, { once: true, passive: true })
    }, 300)

    window.scrollTo({ top: Math.round(sectionStart + sectionRange), behavior: 'smooth' })
    return
  }

  // ── Desktop: JS-driven com easing customizado ────────────────────────────
  let controls: AnimationPlaybackControls | null = null
  let active = true
  let pauseTimer: ReturnType<typeof setTimeout> | null = null

  const cancel = () => {
    active = false
    controls?.stop()
    if (pauseTimer) clearTimeout(pauseTimer)
    window.removeEventListener('wheel', cancel)
  }

  window.addEventListener('wheel', cancel, { passive: true })

  const next = (i: number) => {
    if (!active || i >= waypoints.length) { cancel(); return }

    controls = animate(window.scrollY, waypoints[i], {
      duration: 1.6,
      ease: [0.25, 0, 0.4, 1],
      onUpdate: v => {
        const top = Math.round(v)
        document.documentElement.scrollTop = top
        document.body.scrollTop = top
      },
      onComplete: () => {
        if (!active) return
        if (i === waypoints.length - 1) { cancel(); return }
        pauseTimer = setTimeout(() => next(i + 1), 1400)
      },
    })
  }

  next(0)
}

/**
 * Navega suavemente para uma seção pelo id.
 *
 * #skills: fly-through cinematic — anima capítulo a capítulo com pause entre eles,
 * aterrissando no DevOps. Scroll manual cancela a animação.
 */
export function scrollToSection(id: string): void {
  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const target = document.getElementById(id)
  if (!target) return

  if (id === 'skills') {
    const sectionStart = target.offsetTop
    const sectionRange = target.offsetHeight - window.innerHeight
    const endY = sectionStart + sectionRange
    const startY = window.scrollY

    if (startY > endY) {
      // Abaixo da seção: sobe instantâneo e já começa o cinematic
      window.scrollTo({ top: sectionStart, behavior: 'instant' })
      requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          runCinematicScroll(sectionStart, sectionRange, sectionStart - 1)
        )
      )
      return
    }

    runCinematicScroll(sectionStart, sectionRange, startY)
    return
  }

  const showcase = document.getElementById('skills')
  if (showcase) {
    const showcaseBottom = showcase.offsetTop + showcase.offsetHeight

    if (window.scrollY < showcaseBottom) {
      window.scrollTo({ top: showcaseBottom, behavior: 'instant' })
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const y = target.getBoundingClientRect().top + window.scrollY - HEADER_H
          window.scrollTo({ top: y, behavior: 'smooth' })
        })
      )
      return
    }
  }

  const y = target.getBoundingClientRect().top + window.scrollY - HEADER_H
  window.scrollTo({ top: y, behavior: 'smooth' })
}
