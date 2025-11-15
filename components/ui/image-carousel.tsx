'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface ImageCarouselProps {
  images: string[]
  title: string
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      <div className="relative h-96 md:h-full rounded-2xl overflow-hidden glass-effect shadow-soft-lg group">
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300"
          style={{
            transform: isZoomed ? 'scale(1.2)' : 'scale(1)',
          }}
        />

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-4 right-4 p-3 bg-white/80 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100"
        >
          <Maximize2 size={20} className="text-[#6D9EEB]" />
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full transition-all"
            >
              <ChevronLeft size={24} className="text-[#6D9EEB]" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full transition-all"
            >
              <ChevronRight size={24} className="text-[#6D9EEB]" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all border-2 ${
                index === currentIndex
                  ? 'border-[#6D9EEB] scale-105'
                  : 'border-transparent hover:border-[#6D9EEB]/50'
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
