'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PetCarouselProps {
  images: string[]
  title: string
  className?: string
}

export function PetCarousel({ images, title, className }: PetCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={cn('relative space-y-4', className)}>
      {/* Main Image Container */}
      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden glass-effect shadow-soft-lg group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-cover transition-transform duration-300"
              style={{
                transform: isZoomed ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Zoom Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-4 right-4 p-3 bg-white/80 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-soft"
        >
          <ZoomIn size={20} className="text-[#6D9EEB]" />
        </motion.button>

        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-16 p-3 bg-white/80 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-soft"
        >
          <Heart
            size={20}
            className={cn(
              'transition-colors',
              isLiked ? 'text-[#FFDEE2] fill-[#FFDEE2]' : 'text-gray-600'
            )}
          />
        </motion.button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-soft"
            >
              <ChevronLeft size={24} className="text-[#6D9EEB]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-soft"
            >
              <ChevronRight size={24} className="text-[#6D9EEB]" />
            </motion.button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 overflow-x-auto pb-2"
        >
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all border-2',
                index === currentIndex
                  ? 'border-[#6D9EEB] scale-105 shadow-soft'
                  : 'border-transparent hover:border-[#6D9EEB]/50'
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  )
}