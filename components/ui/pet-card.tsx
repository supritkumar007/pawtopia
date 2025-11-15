'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PetCardProps {
  id: string
  name: string
  breed: string
  age: string
  image: string
  isFavorited?: boolean
  onFavorite?: (id: string) => void
}

export function PetCard({
  id,
  name,
  breed,
  age,
  image,
  isFavorited = false,
  onFavorite,
}: PetCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/pet/${id}`}>
      <div
        className="glass-effect rounded-2xl overflow-hidden shadow-soft transition-all duration-300 hover:shadow-soft-lg cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'perspective(600px) rotateX(5deg) rotateY(-5deg) scale(1.02)' : 'none',
          transition: 'all 0.3s ease-out'
        }}
      >
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#6D9EEB]/10 to-[#B3E5CC]/10">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onFavorite?.(id)
            }}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10',
              isFavorited
                ? 'bg-[#FFDEE2] text-[#E86666]'
                : 'bg-white/80 text-gray-400 hover:text-[#FFDEE2]'
            )}
          >
            <Heart
              size={20}
              className="transition-all duration-300"
              fill={isFavorited ? 'currentColor' : 'none'}
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-[#2A2D34] mb-1">{name}</h3>
          <p className="text-sm text-[#6B7280] mb-2">{breed}</p>
          <p className="text-xs text-[#6B7280]">{age} years old</p>
        </div>
      </div>
    </Link>
  )
}
