'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { GradientButton } from './gradient-button'
import { PastelButton } from './pastel-button'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}: ConfirmModalProps) {
  const buttonVariants = {
    danger: 'secondary',
    warning: 'accent',
    info: 'primary',
  } as const

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md glass-effect rounded-3xl p-8 shadow-soft-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#6B7280] hover:text-[#2A2D34] transition-colors"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">{title}</h2>
                <p className="text-[#6B7280] mb-8">{message}</p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <PastelButton
                    onClick={onClose}
                    className="flex-1"
                    variant="primary"
                  >
                    {cancelText}
                  </PastelButton>
                  <GradientButton
                    onClick={onConfirm}
                    className="flex-1"
                    variant={buttonVariants[variant]}
                  >
                    {confirmText}
                  </GradientButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
