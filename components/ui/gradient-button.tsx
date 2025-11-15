import React from 'react'
import { cn } from '@/lib/utils'

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function GradientButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: GradientButtonProps) {
  const baseStyles = 'font-medium transition-all duration-300 rounded-xl active:scale-95 hover:shadow-soft-lg'
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#6D9EEB] to-[#5B8DD5] text-white hover:shadow-soft-lg hover:scale-105',
    secondary: 'bg-gradient-to-r from-[#FFDEE2] to-[#FFD4DB] text-[#2A2D34] hover:shadow-soft-lg hover:scale-105',
    accent: 'bg-gradient-to-r from-[#B3E5CC] to-[#9ED9C1] text-[#2A2D34] hover:shadow-soft-lg hover:scale-105',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
