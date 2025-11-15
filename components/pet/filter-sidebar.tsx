'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterSidebarProps {
  onFilterChange: (filters: Record<string, any>) => void
  selectedFilters: Record<string, any>
}

export function FilterSidebar({ onFilterChange, selectedFilters }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    species: true,
    size: true,
    age: true,
    vaccination: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleFilterChange = (key: string, value: string) => {
    const current = selectedFilters[key] || []
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value]
    onFilterChange({ ...selectedFilters, [key]: updated })
  }

  const filters = {
    species: ['Dog', 'Cat', 'Rabbit', 'Bird', 'Small Pets'],
    size: ['Small', 'Medium', 'Large', 'Extra Large'],
    age: ['0-1 years', '1-3 years', '3-7 years', '7+ years'],
    vaccination: ['Vaccinated', 'Not Vaccinated'],
  }

  return (
    <div className="space-y-4">
      {Object.entries(filters).map(([section, options]) => (
        <div key={section} className="glass-effect rounded-2xl p-4 shadow-soft">
          <button
            onClick={() => toggleSection(section)}
            className="w-full flex items-center justify-between font-bold text-[#2A2D34] hover:text-[#6D9EEB] transition-colors"
          >
            <span className="capitalize">{section}</span>
            <ChevronDown
              size={18}
              className={cn('transition-transform', expandedSections[section] ? 'rotate-180' : '')}
            />
          </button>

          {expandedSections[section] && (
            <div className="mt-4 space-y-3">
              {options.map(option => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={(selectedFilters[section] || []).includes(option)}
                    onChange={() => handleFilterChange(section, option)}
                    className="w-4 h-4 accent-[#6D9EEB] cursor-pointer"
                  />
                  <span className="text-sm text-[#6B7280] group-hover:text-[#2A2D34] transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => onFilterChange({})}
        className="w-full py-2 px-4 bg-[#FFDEE2]/20 hover:bg-[#FFDEE2]/30 text-[#E86666] rounded-xl transition-colors font-medium text-sm"
      >
        Clear Filters
      </button>
    </div>
  )
}
