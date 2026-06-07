# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server (--host, acessível na rede local)
npm run build     # tsc -b && vite build
npm run lint      # eslint
npm run preview   # preview do build estático
```

Deploy via Firebase Hosting (`firebase.json`).

## Architecture

### Single source of truth
Toda a informação do portfólio vive em [`src/data/portfolio.ts`](src/data/portfolio.ts):
- `personal` — nome, GitHub, LinkedIn, email
- `skills` — lista de skills com `level` (`'daily' | 'projects' | 'exploring' | 'studying'`) e `category` (`'languages' | 'frameworks' | 'databases' | 'devops'`)
- `projects` — projetos com `descriptions` multilíngue (`{ pt, en, es }`)
- `flyingTechs` — ícones do efeito TechFlying

Para adicionar/remover skills ou projetos, **edite apenas esse arquivo** — os componentes lêem de lá automaticamente.

### Internacionalização
3 idiomas: `pt` (fallback), `en`, `es`. Arquivos em [`src/i18n/locales/`](src/i18n/locales/). Detecta pelo browser/localStorage, persiste em `localStorage`. Use o hook `useTranslation()` do `react-i18next`. Textos dos projetos ficam em `portfolio.ts` (campo `descriptions`), não nos JSONs de i18n.

### Tema dark/light
Hook [`useTheme`](src/hooks/useTheme.ts): aplica/remove a classe `.dark` no `<html>` e persiste em `localStorage` (`pb-theme`). O Tailwind v4 usa `@custom-variant dark (&:where(.dark, .dark *))` — não há `darkMode: 'class'` no config.

### CSS / Design tokens
[`src/styles/main.css`](src/styles/main.css) é o entry point do Tailwind v4. Design tokens ficam no bloco `@theme` (cores semânticas: `bg`, `surface`, `foreground`, `muted`, `brand`, `accent`). Sobreposição dark via bloco `.dark {}`. Utilitários customizados em `@layer utilities` (`.text-gradient`, `.glow-brand`, `.glass`).

O [`src/index.css`](src/index.css) contém variáveis CSS legadas de um design anterior — coexiste sem conflitar.

### Animações
Biblioteca importada como `motion/react` (package `motion` v12+, rebrand do Framer Motion). **Não usar `framer-motion`**. Para parallax de scroll usa `react-scroll-parallax`. ScrollShowcase usa `useScroll` + `useTransform` do Motion para animações scroll-linked.

### Skills Tour (mobile)
[`SkillsTourOverlay`](src/components/sections/SkillsTourOverlay.tsx) é um overlay fullscreen que percorre os 4 capítulos de skills automaticamente (2.8s por capítulo). Ativado via custom event: `window.dispatchEvent(new Event('skills-tour'))`. Ao fechar, scrolla para o fim da seção `#skills` via `scrollTo({ behavior: 'instant' })`.

### Seções (ordem no DOM)
`Header → Hero → ScrollShowcase (#skills, 900vh mobile / 700vh desktop) → TechFlying → Projects → Contact → Footer → SkillsTourOverlay`

### Build / bundling
Vite usa rolldown com code splitting manual: `react-vendor`, `motion`, `i18n`, `particles`, `parallax` em chunks separados.

## Types

```ts
// src/types/index.ts
SkillLevel    = 'daily' | 'projects' | 'exploring' | 'studying'
SkillCategory = 'languages' | 'frameworks' | 'databases' | 'devops'
Locale        = 'pt' | 'en' | 'es'
```
