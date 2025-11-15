'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { PetCard } from './pet-card'

interface FavoritesGridProps {
  favorites: Array<{
    id: string
    name: string
    breed: string
    age: string
    image: string
  }>
  onRemoveFavorite: (id: string) => void
  className?: string
}

export function FavoritesGrid({ favorites, onRemoveFavorite, className }: FavoritesGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  }

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#FFDEE2]/20 to-[#FFDEE2]/10 flex items-center justify-center"
        >
          <Heart size={32} className="text-[#FFDEE2]" />
        </motion.div>
        <h3 className="text-xl font-bold text-[#2A2D34] mb-2">No favorites yet</h3>
        <p className="text-[#6B7280]">Start exploring and add some pets to your favorites!</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {favorites.map((pet, index) => (
        <motion.div
          key={pet.id}
          variants={itemVariants}
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          exit={{
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.3 },
          }}
        >
          <div className="relative group">
            <PetCard
              {...pet}
              isFavorited={true}
              onFavorite={() => onRemoveFavorite(pet.id)}
            />

            {/* Remove button overlay */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemoveFavorite(pet.id)}
              className="absolute top-3 right-3 p-2 bg-[#FFDEE2] text-[#E86666] rounded-full shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-soft-lg"
            >
              <Heart size={16} fill="currentColor" />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}