import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterChipProps {
  label: string
  onRemove: () => void
  variant?: 'primary' | 'secondary' | 'accent'
}

export function FilterChip({ label, onRemove, variant = 'primary' }: FilterChipProps) {
  const variantStyles = {
    primary: 'bg-[#6D9EEB]/20 text-[#6D9EEB] hover:bg-[#6D9EEB]/30',
    secondary: 'bg-[#FFDEE2]/20 text-[#E86666] hover:bg-[#FFDEE2]/30',
    accent: 'bg-[#B3E5CC]/20 text-[#2A8659] hover:bg-[#B3E5CC]/30',
  }

  return (
    <div className={cn('inline-flex items-center gap-2 px-3 py-1 rounded-full transition-colors', variantStyles[variant])}>
      <span className="text-sm font-medium">{label}</span>
      <button
        onClick={onRemove}
        className="hover:scale-110 transition-transform"
      >
        <X size={14} />
      </button>
    </div>
  )
}
