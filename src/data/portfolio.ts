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
  SiDocker, SiFramer, SiGithub, SiPrisma, SiNginx, SiTypeorm, SiGsap, SiExpo, SiExpress,
} from 'react-icons/si'
import { FaLinkedin, FaAws, FaAmazon } from 'react-icons/fa'
import { TbApi, TbDatabase, TbBrandReactNative, TbBolt } from 'react-icons/tb'
import { BiCodeAlt } from 'react-icons/bi'
import { SiDotnet } from 'react-icons/si'

import type { Skill, Project, Social, Locale } from '../types'

// ─── Informações pessoais ──────────────────────────────────────────────────────

export const personal = {
  name: 'Pedro Bolson',
  github: 'https://github.com/PedroBolson',
  linkedin: 'https://www.linkedin.com/in/pedro-bolson-086a03337',
  email: 'pedbolson@gmail.com',
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
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', lightColor: '#9a7a00', level: 'daily', category: 'languages' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 'daily', category: 'languages' },
  { name: 'HTML & CSS', icon: SiHtml5, color: '#E34F26', level: 'daily', category: 'languages' },
  { name: 'SQL', icon: TbDatabase, color: '#336791', level: 'projects', category: 'languages' },
  { name: 'Python', icon: SiPython, color: '#3776AB', level: 'exploring', category: 'languages' },
  { name: 'C', icon: BiCodeAlt, color: '#A8B9CC', level: 'exploring', category: 'languages' },
  { name: 'C#', icon: SiDotnet, color: '#9B4F96', level: 'exploring', category: 'languages' },

  // Frameworks & Ferramentas
  { name: 'React', icon: SiReact, color: '#61DAFB', level: 'daily', category: 'frameworks' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 'daily', category: 'frameworks' },
  { name: 'Vite', icon: SiVite, color: '#646CFF', level: 'daily', category: 'frameworks' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 'daily', category: 'frameworks' },
  { name: 'REST APIs', icon: TbApi, color: '#4ADE80', level: 'daily', category: 'frameworks' },
  { name: 'GSAP', icon: SiGsap, color: '#88CE02', lightColor: '#4a7200', level: 'daily', category: 'frameworks' },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055FF', level: 'daily', category: 'frameworks' },
  { name: 'Git', icon: SiGit, color: '#F05032', level: 'daily', category: 'frameworks' },
  { name: 'Prisma', icon: SiPrisma, color: '#2D3748', level: 'daily', category: 'frameworks' },
  { name: 'NestJS', icon: SiNestjs, color: '#E0234E', level: 'daily', category: 'frameworks' },
  { name: 'Express.js', icon: SiExpress, color: '#888888', level: 'projects', category: 'frameworks' },
  { name: 'TypeORM', icon: SiTypeorm, color: '#FE0803', level: 'projects', category: 'frameworks' },
  { name: 'React Native', icon: TbBrandReactNative, color: '#61DAFB', level: 'exploring', category: 'frameworks' },
  { name: 'NativeWind', icon: SiTailwindcss, color: '#38BDF8', level: 'exploring', category: 'frameworks' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#AAAAAA', lightColor: '#1a1a1a', level: 'exploring', category: 'frameworks' },
  { name: 'Expo', icon: SiExpo, color: '#4630EB', level: 'exploring', category: 'frameworks' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098', level: 'exploring', category: 'frameworks' },

  // Bancos de dados
  { name: 'Firestore', icon: SiFirebase, color: '#FFA000', level: 'daily', category: 'databases' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1', level: 'daily', category: 'databases' },
  { name: 'Convex', icon: TbBolt, color: '#EE342F', level: 'daily', category: 'databases' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', level: 'projects', category: 'databases' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 'exploring', category: 'databases' },
  { name: 'DynamoDB', icon: FaAmazon, color: '#FF9900', level: 'exploring', category: 'databases' },

  // Cloud & DevOps
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', level: 'daily', category: 'devops' },
  { name: 'Convex', icon: TbBolt, color: '#EE342F', level: 'daily', category: 'devops' },
  { name: 'AWS', icon: FaAws, color: '#FF9900', level: 'projects', category: 'devops' },
  { name: 'NGINX', icon: SiNginx, color: '#009639', level: 'projects', category: 'devops' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 'exploring', category: 'devops' },
]

// ─── Projetos ─────────────────────────────────────────────────────────────────
// Adicione seus projetos aqui quando estiver pronto.

export const projects: Project[] = [
  // Exemplo de estrutura — descomente e preencha quando quiser:
  // {
  //   title: 'Nome do Projeto',
  //   descriptions: {
  //     pt: 'Descrição em português.',
  //     en: 'Description in English.',
  //     es: 'Descripción en español.',
  //   },
  //   tech: ['React', 'Node.js', 'PostgreSQL'],
  //   github: 'https://github.com/PedroBolson/nome-repo',
  //   live: 'https://projeto.vercel.app',
  //   image: '/projects/nome-do-projeto.png',
  // },
  {
    title: 'LinksPilot - Encurtador de URLs',
    descriptions: {
      pt: 'Aplicativo para encurtar URLs de forma rápida e eficiente.',
      en: 'Application to shorten URLs quickly and efficiently.',
      es: 'Aplicación para acortar URLs de manera rápida y eficiente.',
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS 4', 'Firebase (Hosting, Firestore, Auth, Functions)'],
    github: 'https://github.com/PedroBolson/Links-Pilot',
    live: 'https://linkspilot.pedrobolson.com.br',
    image: '/assets/projects/linkshortener.png',
  },
  {
    title: 'UPEVA - União pela vida animal',
    descriptions: {
      pt: 'Plataforma web para divulgação de animais, envio de candidaturas de adoção e operação interna da ONG - Ainda em desenvolvimento.',
      en: 'Web platform for animal listings, adoption applications and internal NGO operations - Still in development.',
      es: 'Plataforma web para publicación de animales, solicitudes de adopción y operación interna de la ONG - Aún en desarrollo.',
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS 4', 'Firebase (Hosting, Firestore, Auth, Storage, Functions)'],
    github: 'https://github.com/PedroBolson/Upeva',
    live: 'https://upevapets.web.app',
    image: '/assets/projects/upeva.png',
  },
  {
    title: 'Eco Recicla - Plataforma de Reciclagem Inteligente',
    descriptions: {
      pt: 'Plataforma web que gamifica o processo de reciclagem, permitindo que usuários ganhem pontos por ações sustentáveis - Projeto DEMO.',
      en: 'Web platform that gamifies recycling, letting users earn points for sustainable actions - DEMO project.',
      es: 'Plataforma web que gamifica el reciclaje, permitiendo que los usuarios ganen puntos por acciones sostenibles - Proyecto DEMO.',
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS 4', 'Firebase (Hosting, Firestore, Auth, Functions)'],
    github: 'https://github.com/PedroBolson/Interface-Reciclagem',
    live: 'https://recicla-caxias.web.app',
    image: '/assets/projects/recicla.png',
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

// ─── Helper para localizar descrições dos projetos ────────────────────────────

export function getProjects(lang: string) {
  const l: Locale = (['pt', 'en', 'es'].includes(lang) ? lang : 'pt') as Locale
  return projects.map(p => ({ ...p, description: p.descriptions[l] }))
}
