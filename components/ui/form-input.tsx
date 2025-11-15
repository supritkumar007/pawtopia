import React from 'react'
import { cn } from '@/lib/utils'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function FormInput({
  label,
  error,
  icon,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#2A2D34] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6D9EEB]">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white/80 text-[#2A2D34] placeholder-[#6B7280] transition-all duration-300',
            'focus:outline-none focus:border-[#6D9EEB] focus:bg-white focus:shadow-soft',
            'hover:bg-white',
            icon && 'pl-12',
            error && 'border-[#E86666] bg-[#FFDEE2]/20',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-[#E86666] mt-2 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}
