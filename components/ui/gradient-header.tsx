'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientHeaderProps {
  title: string
  subtitle?: string
  className?: string
  animated?: boolean
}

export function GradientHeader({
  title,
  subtitle,
  className,
  animated = true,
}: GradientHeaderProps) {
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  const HeaderComponent = animated ? motion.div : 'div'

  return (
    <HeaderComponent
      className={cn('text-center mb-12', className)}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        <span className="bg-gradient-to-r from-[#6D9EEB] via-[#B3E5CC] to-[#FFDEE2] bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      {subtitle && (
        <motion.p
          className="text-lg md:text-xl text-[#6B7280] max-w-2xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      )}
    </HeaderComponent>
  )
}