'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'soft'
}

export function GlassCard({
  children,
  className,
  variant = 'default',
}: GlassCardProps) {
  const variants = {
    default: 'glass-effect shadow-soft',
    elevated: 'glass-effect shadow-soft-lg',
    soft: 'glass-effect shadow-soft-sm',
  }

  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300 hover:shadow-soft-lg',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  )
}
