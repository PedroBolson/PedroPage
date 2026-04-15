import type { IconType } from 'react-icons'

export type SkillLevel = 'daily' | 'projects' | 'exploring' | 'studying'
export type SkillCategory = 'languages' | 'frameworks' | 'databases' | 'devops'

export interface Skill {
  name: string
  icon: IconType
  /** Cor do ícone (hex ou css color) */
  color: string
  level: SkillLevel
  category: SkillCategory
}

export interface Project {
  title: string
  description: string
  tech: string[]
  github?: string
  live?: string
  /** Caminho relativo a /public ou URL externa */
  image?: string
}

export interface Social {
  label: string
  url: string
  icon: IconType
}
