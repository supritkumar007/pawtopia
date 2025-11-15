import React from 'react'

export function PetCardSkeleton() {
  return (
    <div className="glass-effect rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gradient-to-r from-white/40 to-white/20" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/40 rounded w-3/4" />
        <div className="h-3 bg-white/30 rounded w-1/2" />
        <div className="h-3 bg-white/30 rounded w-2/3" />
      </div>
    </div>
  )
}
