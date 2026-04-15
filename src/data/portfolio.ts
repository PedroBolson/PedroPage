/**
 * ╔══════════════════════════════════════════════════════╗
 * ║  Dados do portfólio — edite aqui para atualizar o   ║
 * ║  site sem precisar tocar nos componentes.            ║
 * ╚══════════════════════════════════════════════════════╝
 */

import {
  SiJavascript, SiTypescript, SiHtml5, SiPython,
  SiReact, SiNodedotjs, SiNestjs, SiVite, SiTailwindcss,
  SiGraphql, SiNextdotjs, SiGit,
  SiPostgresql, SiFirebase, SiMysql, SiMongodb,
  SiDocker, SiFramer, SiGithub,
} from 'react-icons/si'
import { FaLinkedin, FaAws, FaAmazon } from 'react-icons/fa'
import { TbApi, TbDatabase, TbBrandReactNative } from 'react-icons/tb'
import { BiCodeAlt } from 'react-icons/bi'
import { SiDotnet } from 'react-icons/si'

import type { Skill, Project, Social } from '../types'

// ─── Informações pessoais ──────────────────────────────────────────────────────

export const personal = {
  name: 'Pedro Bolson',
  greeting: 'Olá, eu sou',
  title: 'Desenvolvedor Full Stack',
  description: 'Criando soluções web e mobile inovadoras com foco em experiência de usuário e performance.',
  github: 'https://github.com/PedroBolson',
  linkedin: 'https://www.linkedin.com/in/pedro-bolson-086a03337',
  email: '', // adicione seu e-mail quando quiser
}

// ─── Redes sociais ─────────────────────────────────────────────────────────────

export const socials: Social[] = [
  { label: 'GitHub', url: personal.github, icon: SiGithub },
  { label: 'LinkedIn', url: personal.linkedin, icon: FaLinkedin },
]

// ─── Skills ───────────────────────────────────────────────────────────────────
// Adicione ou remova skills nesta lista para atualizar o grid.
// Levels: 'daily' | 'projects' | 'exploring' | 'studying'

export const skills: Skill[] = [
  // Linguagens
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 'daily', category: 'languages' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 'daily', category: 'languages' },
  { name: 'HTML & CSS', icon: SiHtml5, color: '#E34F26', level: 'daily', category: 'languages' },
  { name: 'SQL', icon: TbDatabase, color: '#336791', level: 'projects', category: 'languages' },
  { name: 'Python', icon: SiPython, color: '#3776AB', level: 'exploring', category: 'languages' },
  { name: 'C', icon: BiCodeAlt, color: '#A8B9CC', level: 'exploring', category: 'languages' },
  { name: 'C#', icon: SiDotnet, color: '#9B4F96', level: 'exploring', category: 'languages' },

  // Frameworks & Ferramentas
  { name: 'React', icon: SiReact, color: '#61DAFB', level: 'daily', category: 'frameworks' },
  { name: 'React Native', icon: TbBrandReactNative, color: '#61DAFB', level: 'daily', category: 'frameworks' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 'daily', category: 'frameworks' },
  { name: 'NestJS', icon: SiNestjs, color: '#E0234E', level: 'projects', category: 'frameworks' },
  { name: 'Vite', icon: SiVite, color: '#646CFF', level: 'daily', category: 'frameworks' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 'daily', category: 'frameworks' },
  { name: 'REST APIs', icon: TbApi, color: '#4ADE80', level: 'daily', category: 'frameworks' },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055FF', level: 'exploring', category: 'frameworks' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098', level: 'exploring', category: 'frameworks' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF', level: 'studying', category: 'frameworks' },
  { name: 'Git', icon: SiGit, color: '#F05032', level: 'daily', category: 'frameworks' },

  // Bancos de dados
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', level: 'daily', category: 'databases' },
  { name: 'Firestore', icon: SiFirebase, color: '#FFA000', level: 'daily', category: 'databases' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1', level: 'projects', category: 'databases' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 'exploring', category: 'databases' },
  { name: 'DynamoDB', icon: FaAmazon, color: '#FF9900', level: 'exploring', category: 'databases' },

  // Cloud & DevOps
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', level: 'daily', category: 'devops' },
  { name: 'AWS', icon: FaAws, color: '#FF9900', level: 'daily', category: 'devops' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 'exploring', category: 'devops' },
]

// ─── Projetos ─────────────────────────────────────────────────────────────────
// Adicione seus projetos aqui quando estiver pronto.

export const projects: Project[] = [
  // Exemplo de estrutura — descomente e preencha quando quiser:
  // {
  //   title: 'Nome do Projeto',
  //   description: 'Descrição curta do que o projeto faz e qual problema resolve.',
  //   tech: ['React', 'Node.js', 'PostgreSQL'],
  //   github: 'https://github.com/PedroBolson/nome-repo',
  //   live: 'https://projeto.vercel.app',
  //   image: '/projects/nome-do-projeto.png',
  // },
  {
    title: 'UPEVA - União pela vida animal',
    description: 'Plataforma web para divulgação de animais, envio de candidaturas de adoção e operação interna da ONG.',
    tech: ['React', 'TypeScript', 'Tailwind CSS 4', 'Firebase (Hosting, Firestore, Auth, Storage, Functions)'],
    github: 'https://github.com/PedroBolson/Upeva',
    live: 'https://upevapets.web.app',
    image: '/assets/projects/upeva.png',
  },
]

// ─── Skills destacadas para o efeito TechFlying ───────────────────────────────
// Ícones que "voam" pela tela na seção de transição.

export const flyingTechs = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'NestJS', icon: SiNestjs, color: '#E0234E' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'AWS', icon: FaAws, color: '#FF9900' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#AAAAAA' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Vite', icon: SiVite, color: '#646CFF' },
]
