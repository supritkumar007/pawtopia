import React from 'react'
import { BlobBackground } from './blob-background'

interface AuthCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#FDFCFD] via-[#F9F7FF] to-[#FDFCFD] overflow-hidden">
      <BlobBackground />

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-effect rounded-3xl p-8 shadow-soft-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2A2D34] mb-2">{title}</h1>
            {subtitle && <p className="text-[#6B7280]">{subtitle}</p>}
          </div>

          {children}
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 text-center text-sm text-[#6B7280]">
          <p>🐾 Pawtopia - Find Your Perfect Pet</p>
        </div>
      </div>
    </div>
  )
}
