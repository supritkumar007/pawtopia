'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const INDIAN_CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Jaipur',
  'Kolkata',
  'Kochi',
  'Ahmedabad',
  'Gurgaon',
  'Noida',
]

interface LocationSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

export function LocationSelect({
  value,
  onChange,
  placeholder = 'Select a city',
  error,
}: LocationSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full px-4 py-3 text-left bg-white rounded-lg border-2 transition-all duration-300',
          error
            ? 'border-[#E86666] focus:border-[#E86666]'
            : 'border-[#6D9EEB]/20 focus:border-[#6D9EEB]',
          'hover:border-[#6D9EEB]/40 flex items-center justify-between'
        )}
      >
        <span className={value ? 'text-[#2A2D34]' : 'text-[#6B7280]'}>
          {value || placeholder}
        </span>
        <ChevronDown size={20} className={cn('transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#6D9EEB]/20 rounded-lg shadow-soft-lg z-10 max-h-64 overflow-y-auto">
          {INDIAN_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => {
                onChange(city)
                setIsOpen(false)
              }}
              className={cn(
                'w-full text-left px-4 py-2 hover:bg-[#6D9EEB]/10 transition-colors',
                value === city && 'bg-[#6D9EEB]/20 text-[#6D9EEB] font-medium'
              )}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-[#E86666] mt-1">{error}</p>}
    </div>
  )
}
