'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeTagProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BadgeTag({
  children,
  variant = 'primary',
  size = 'md',
  className,
}: BadgeTagProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#6D9EEB]/20 to-[#6D9EEB]/10 text-[#6D9EEB] border-[#6D9EEB]/30',
    secondary: 'bg-gradient-to-r from-[#FFDEE2]/20 to-[#FFDEE2]/10 text-[#E86666] border-[#FFDEE2]/30',
    accent: 'bg-gradient-to-r from-[#B3E5CC]/20 to-[#B3E5CC]/10 text-[#2A8659] border-[#B3E5CC]/30',
    success: 'bg-gradient-to-r from-[#B3E5CC]/20 to-[#B3E5CC]/10 text-[#2A8659] border-[#B3E5CC]/30',
    warning: 'bg-gradient-to-r from-[#F8E8A6]/20 to-[#F8E8A6]/10 text-[#B8860B] border-[#F8E8A6]/30',
    error: 'bg-gradient-to-r from-[#FFDEE2]/20 to-[#FFDEE2]/10 text-[#E86666] border-[#FFDEE2]/30',
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium transition-all duration-300 hover:scale-105',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
