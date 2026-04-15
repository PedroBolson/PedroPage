import { motion } from 'motion/react'
import Badge from './Badge'
import type { Skill } from '../../types'

interface TechCardProps {
  skill: Skill
  index: number
}

export default function TechCard({ skill, index }: TechCardProps) {
  const Icon = skill.icon

  return (
    <motion.div
      className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface border border-border hover:border-brand/40 transition-all duration-300 cursor-default"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Glow sutil no hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 24px ${skill.color}22` }}
      />

      {/* Ícone */}
      <div className="relative z-10 w-12 h-12 flex items-center justify-center">
        <Icon
          size={36}
          style={{ color: skill.color }}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Nome */}
      <span className="relative z-10 text-sm font-semibold text-foreground text-center leading-tight">
        {skill.name}
      </span>

      {/* Badge de nível */}
      <div className="relative z-10">
        <Badge level={skill.level} />
      </div>
    </motion.div>
  )
}
