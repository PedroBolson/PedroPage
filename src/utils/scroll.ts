// Altura do header fixo — usada para não sobrepor o conteúdo ao navegar
const HEADER_H = 64

/**
 * Navega suavemente para uma seção pelo id.
 *
 * Caso específico do parallax (#skills):
 *   Se o destino for uma seção POSTERIOR ao ScrollShowcase e o usuário
 *   ainda estiver dentro dele, fazemos um salto instantâneo para o fim do
 *   parallax antes de iniciar o smooth scroll. Isso evita que os capítulos
 *   animem durante a navegação (o "bug" do parallax).
 */
export function scrollToSection(id: string): void {
  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const target = document.getElementById(id)
  if (!target) return

  // Ir para o início do parallax: sem offset de header (é fullscreen sticky)
  if (id === 'skills') {
    window.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
    return
  }

  const showcase = document.getElementById('skills')
  if (showcase) {
    const showcaseBottom = showcase.offsetTop + showcase.offsetHeight

    if (window.scrollY < showcaseBottom) {
      // Salto instantâneo para o fim do parallax
      window.scrollTo({ top: showcaseBottom, behavior: 'instant' })

      // Dois frames para garantir que o browser processou o salto
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
