import React from 'react'
import { Search } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6D9EEB]/10 to-[#B3E5CC]/10 flex items-center justify-center mx-auto mb-4">
        <Search size={32} className="text-[#6D9EEB]" />
      </div>
      <h3 className="text-xl font-bold text-[#2A2D34] mb-2">{title}</h3>
      <p className="text-[#6B7280] mb-6">{description}</p>
      {action}
    </div>
  )
}
