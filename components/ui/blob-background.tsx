import React from 'react'

interface BlobBackgroundProps {
  className?: string
  colors?: {
    blob1?: string
    blob2?: string
    blob3?: string
  }
}

export function BlobBackground({
  className = '',
  colors = {
    blob1: '#6D9EEB',
    blob2: '#FFDEE2',
    blob3: '#B3E5CC',
  },
}: BlobBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </defs>

        {/* Blob 1 */}
        <circle
          cx="200"
          cy="300"
          r="200"
          fill={colors.blob1}
          opacity="0.15"
          filter="url(#blur)"
          style={{
            animation: 'float 6s ease-in-out infinite',
          }}
        />

        {/* Blob 2 */}
        <circle
          cx="800"
          cy="200"
          r="180"
          fill={colors.blob2}
          opacity="0.12"
          filter="url(#blur)"
          style={{
            animation: 'float 8s ease-in-out infinite 1s',
          }}
        />

        {/* Blob 3 */}
        <circle
          cx="400"
          cy="800"
          r="220"
          fill={colors.blob3}
          opacity="0.1"
          filter="url(#blur)"
          style={{
            animation: 'float 7s ease-in-out infinite 2s',
          }}
        />
      </svg>
    </div>
  )
}
