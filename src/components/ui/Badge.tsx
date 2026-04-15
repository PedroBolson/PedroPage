import type { SkillLevel } from '../../types'

const levelConfig: Record<SkillLevel, { label: string; className: string }> = {
  daily:     { label: 'Uso Diário',  className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
  projects:  { label: 'Projetos',    className: 'bg-blue-500/15    text-blue-400    border-blue-500/30'    },
  exploring: { label: 'Explorando',  className: 'bg-amber-500/15   text-amber-400   border-amber-500/30'   },
  studying:  { label: 'Estudando',   className: 'bg-rose-500/15    text-rose-400    border-rose-500/30'    },
}

interface BadgeProps {
  level: SkillLevel
}

export default function Badge({ level }: BadgeProps) {
  const { label, className } = levelConfig[level]

  return (
    <span
      className={[
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border tracking-wide',
        className,
      ].join(' ')}
    >
      {label}
    </span>
  )
}
