'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Calendar, Heart, FileText, Settings } from 'lucide-react'
import { GlassCard } from './glass-card'

interface ProfileSidebarProps {
  user: {
    name: string
    email: string
    phone: string
    location: string
    avatar?: string
    memberSince: string
  }
  stats?: {
    favorites: number
    applications: number
  }
  className?: string
}

export function ProfileSidebar({ user, stats, className }: ProfileSidebarProps) {
  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
      className={className}
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      {/* Profile Card */}
      <GlassCard className="mb-6">
        <div className="text-center">
          <motion.div
            className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={32} className="text-white" />
            )}
          </motion.div>
          <h3 className="text-xl font-bold text-[#2A2D34] mb-1">{user.name}</h3>
          <p className="text-sm text-[#6B7280] mb-4">Member since {user.memberSince}</p>
        </div>

        <div className="space-y-3">
          <motion.div
            className="flex items-center gap-3 text-sm"
            variants={itemVariants}
          >
            <Mail size={16} className="text-[#6D9EEB]" />
            <span className="text-[#2A2D34]">{user.email}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 text-sm"
            variants={itemVariants}
          >
            <Phone size={16} className="text-[#6D9EEB]" />
            <span className="text-[#2A2D34]">{user.phone}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 text-sm"
            variants={itemVariants}
          >
            <MapPin size={16} className="text-[#6D9EEB]" />
            <span className="text-[#2A2D34]">{user.location}</span>
          </motion.div>
        </div>
      </GlassCard>

      {/* Stats Card */}
      {stats && (
        <GlassCard>
          <h4 className="font-bold text-[#2A2D34] mb-4">Quick Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="text-center p-3 bg-gradient-to-r from-[#FFDEE2]/20 to-[#FFDEE2]/10 rounded-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Heart size={20} className="mx-auto mb-1 text-[#E86666]" />
              <p className="text-2xl font-bold text-[#E86666]">{stats.favorites}</p>
              <p className="text-xs text-[#6B7280]">Favorites</p>
            </motion.div>
            <motion.div
              className="text-center p-3 bg-gradient-to-r from-[#6D9EEB]/20 to-[#6D9EEB]/10 rounded-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <FileText size={20} className="mx-auto mb-1 text-[#6D9EEB]" />
              <p className="text-2xl font-bold text-[#6D9EEB]">{stats.applications}</p>
              <p className="text-xs text-[#6B7280]">Applications</p>
            </motion.div>
          </div>
        </GlassCard>
      )}
    </motion.div>
  )
}