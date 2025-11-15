'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Stethoscope, Award, Calendar, Ruler, Weight, Shield, IndianRupee } from 'lucide-react'
import { BadgeTag } from './badge-tag'
import { GlassCard } from './glass-card'
import { GradientButton } from './gradient-button'

interface PetDetailsCardProps {
  pet: {
    id: string
    name: string
    breed: string
    type: string
    gender: string
    age: string
    size: string
    temperament: string[]
    vaccinated: boolean
    sterilized: boolean
    adoptionFee: number
    description: string
    shelter: {
      name: string
      location: string
      phone: string
      email: string
    }
  }
  isFavorited?: boolean
  onFavorite?: () => void
  onAdopt?: () => void
  className?: string
}

export function PetDetailsCard({
  pet,
  isFavorited = false,
  onFavorite,
  onAdopt,
  className,
}: PetDetailsCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Basic Info Card */}
      <GlassCard>
        <motion.div variants={itemVariants} className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2A2D34] mb-2">{pet.name}</h1>
            <p className="text-[#6B7280] flex items-center gap-2">
              <MapPin size={16} />
              {pet.shelter.location}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onFavorite}
            className={`p-3 rounded-full transition-all ${
              isFavorited
                ? 'bg-[#FFDEE2] text-[#E86666]'
                : 'bg-white/50 text-[#6B7280] hover:bg-white/70'
            }`}
          >
            <Heart size={24} fill={isFavorited ? 'currentColor' : 'none'} />
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-gradient-to-r from-[#6D9EEB]/10 to-[#6D9EEB]/5 rounded-lg">
            <p className="text-sm text-[#6B7280] mb-1">Breed</p>
            <p className="font-semibold text-[#2A2D34]">{pet.breed}</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-[#B3E5CC]/10 to-[#B3E5CC]/5 rounded-lg">
            <p className="text-sm text-[#6B7280] mb-1">Type</p>
            <p className="font-semibold text-[#2A2D34]">{pet.type}</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-[#FFDEE2]/10 to-[#FFDEE2]/5 rounded-lg">
            <p className="text-sm text-[#6B7280] mb-1">Gender</p>
            <p className="font-semibold text-[#2A2D34]">{pet.gender}</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-[#F8E8A6]/10 to-[#F8E8A6]/5 rounded-lg">
            <p className="text-sm text-[#6B7280] mb-1">Age</p>
            <p className="font-semibold text-[#2A2D34]">{pet.age}</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
          {pet.temperament.map((trait, index) => (
            <BadgeTag key={index} variant="primary" size="sm">
              {trait}
            </BadgeTag>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Shield size={20} className={pet.vaccinated ? 'text-[#2A8659]' : 'text-[#6B7280]'} />
            <span className="text-sm">{pet.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={20} className={pet.sterilized ? 'text-[#2A8659]' : 'text-[#6B7280]'} />
            <span className="text-sm">{pet.sterilized ? 'Sterilized' : 'Not Sterilized'}</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IndianRupee size={20} className="text-[#2A8659]" />
            <span className="text-2xl font-bold text-[#2A8659]">₹{pet.adoptionFee.toLocaleString()}</span>
            <span className="text-sm text-[#6B7280]">adoption fee</span>
          </div>
          <GradientButton onClick={onAdopt} size="lg">
            Adopt Me
          </GradientButton>
        </motion.div>
      </GlassCard>

      {/* Description Card */}
      <GlassCard>
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-[#2A2D34] mb-4"
        >
          About {pet.name}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-[#6B7280] leading-relaxed"
        >
          {pet.description}
        </motion.p>
      </GlassCard>

      {/* Shelter Info Card */}
      <GlassCard>
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-[#2A2D34] mb-4"
        >
          Shelter Information
        </motion.h2>
        <motion.div variants={itemVariants} className="space-y-3">
          <p className="font-semibold text-[#2A2D34] text-lg">{pet.shelter.name}</p>
          <div className="space-y-2 text-sm">
            <p className="text-[#6B7280]">
              <strong>Location:</strong> {pet.shelter.location}
            </p>
            <p className="text-[#6B7280]">
              <strong>Phone:</strong> {pet.shelter.phone}
            </p>
            <p className="text-[#6B7280]">
              <strong>Email:</strong> {pet.shelter.email}
            </p>
          </div>
          <GradientButton size="sm" variant="secondary">
            Contact Shelter
          </GradientButton>
        </motion.div>
      </GlassCard>
    </motion.div>
  )
}