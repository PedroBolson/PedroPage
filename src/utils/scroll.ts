const HEADER_H = 64

export function scrollToSection(id: string): void {
  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const target = document.getElementById(id)
  if (!target) return
  const y = target.getBoundingClientRect().top + window.scrollY - HEADER_H
  window.scrollTo({ top: y, behavior: 'smooth' })
}
