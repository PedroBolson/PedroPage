import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import TechCard from '../ui/TechCard'
import { skills } from '../../data/portfolio'
import type { SkillCategory } from '../../types'

const CATEGORIES: { key: SkillCategory | 'all'; label: string }[] = [
  { key: 'all',        label: 'Todas'          },
  { key: 'languages',  label: 'Linguagens'     },
  { key: 'frameworks', label: 'Frameworks'     },
  { key: 'databases',  label: 'Databases'      },
  { key: 'devops',     label: 'Cloud & DevOps' },
]

export default function Skills() {
  const [active, setActive] = useState<SkillCategory | 'all'>('all')

  const filtered = active === 'all'
    ? skills
    : skills.filter(s => s.category === active)

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted mb-3">
            Resumo completo
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-gradient">
            Tech Stack
          </h2>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={[
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                active === cat.key
                  ? 'bg-brand text-white glow-brand'
                  : 'bg-surface border border-border text-muted hover:border-brand/50 hover:text-brand',
              ].join(' ')}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/*
          Grid com layout animation:
          - Sem `key={active}` → sem remount, sem flicker
          - AnimatePresence + layout nas cards individuais gerenciam a transição
        */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{    opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.22, delay: i * 0.03 }}
              >
                <TechCard skill={skill} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
