import { useTranslation } from 'react-i18next'
import type { SkillLevel } from '../../types'

const levelClassName: Record<SkillLevel, string> = {
  daily:     'bg-emerald-500/15 dark:bg-emerald-500/25 text-emerald-600 dark:text-emerald-300 border-emerald-500/30 dark:border-emerald-400/40',
  projects:  'bg-blue-500/15    dark:bg-blue-500/25    text-blue-600    dark:text-blue-300    border-blue-500/30    dark:border-blue-400/40',
  exploring: 'bg-amber-500/15   dark:bg-amber-500/25   text-amber-600   dark:text-amber-300   border-amber-500/30   dark:border-amber-400/40',
  studying:  'bg-rose-500/15    dark:bg-rose-500/25    text-rose-600    dark:text-rose-300    border-rose-500/30    dark:border-rose-400/40',
}

interface BadgeProps {
  level: SkillLevel
}

export default function Badge({ level }: BadgeProps) {
  const { t } = useTranslation()

  return (
    <span
      className={[
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border tracking-wide',
        levelClassName[level],
      ].join(' ')}
    >
      {t(`badge.${level}`)}
    </span>
  )
}
