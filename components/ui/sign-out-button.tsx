'use client'

import React, { useState } from 'react'
import { LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { ConfirmModal } from './confirm-modal'

interface SignOutButtonProps {
  onSignOut: () => void
  variant?: 'button' | 'icon' | 'text'
  className?: string
}

export function SignOutButton({ onSignOut, variant = 'button', className }: SignOutButtonProps) {
  const [showModal, setShowModal] = useState(false)

  const handleSignOut = () => {
    onSignOut()
    setShowModal(false)
  }

  if (variant === 'icon') {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowModal(true)}
          className={`p-2 rounded-lg bg-gradient-to-r from-[#FFDEE2]/20 to-[#FFDEE2]/10 text-[#E86666] hover:from-[#FFDEE2]/30 hover:to-[#FFDEE2]/20 transition-all ${className}`}
          title="Sign Out"
        >
          <LogOut size={20} />
        </motion.button>

        <ConfirmModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleSignOut}
          title="Sign Out"
          message="Are you sure you want to sign out of your account?"
          confirmText="Sign Out"
          cancelText="Cancel"
          variant="warning"
        />
      </>
    )
  }

  if (variant === 'text') {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowModal(true)}
          className={`flex items-center gap-2 text-[#E86666] hover:text-[#E86666]/80 transition-colors ${className}`}
        >
          <LogOut size={16} />
          Sign Out
        </motion.button>

        <ConfirmModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleSignOut}
          title="Sign Out"
          message="Are you sure you want to sign out of your account?"
          confirmText="Sign Out"
          cancelText="Cancel"
          variant="warning"
        />
      </>
    )
  }

  // Default button variant
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
        className={`flex items-center gap-3 p-4 bg-gradient-to-r from-[#FFDEE2]/20 to-[#FFDEE2]/10 text-[#E86666] rounded-xl hover:from-[#FFDEE2]/30 hover:to-[#FFDEE2]/20 transition-all font-medium ${className}`}
      >
        <LogOut size={20} />
        Sign Out
      </motion.button>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleSignOut}
        title="Sign Out"
        message="Are you sure you want to sign out of your account?"
        confirmText="Sign Out"
        cancelText="Cancel"
        variant="warning"
      />
    </>
  )
}