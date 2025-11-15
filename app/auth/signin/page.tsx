'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AuthForm } from '@/components/ui/auth-form'
import { BlobBackground } from '@/components/ui/blob-background'
import { motion } from 'framer-motion'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <>
      <Navbar />
      <section className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] relative overflow-hidden">
        <BlobBackground colors={{ blob1: '#6D9EEB', blob2: '#FFDEE2', blob3: '#B3E5CC' }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md"
        >
          <div className="glass-effect rounded-3xl p-8 shadow-soft-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-[#2A2D34] mb-2"
              >
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#6B7280]"
              >
                Sign in to your Pawtopia account
              </motion.p>
            </div>

            {/* Auth Form */}
            <AuthForm
              type="signin"
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            {/* Remember me & Forgot password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between text-sm mb-6"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-2 border-[#6D9EEB] accent-[#6D9EEB]" />
                <span className="text-[#6B7280]">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-[#6D9EEB] hover:text-[#5B8DD5] transition-colors">
                Forgot password?
              </Link>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="my-6 flex items-center gap-3"
            >
              <div className="flex-1 h-px bg-[#6D9EEB]/20" />
              <span className="text-sm text-[#6B7280]">or</span>
              <div className="flex-1 h-px bg-[#6D9EEB]/20" />
            </motion.div>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-sm text-[#6B7280]"
            >
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-[#6D9EEB] font-semibold hover:text-[#5B8DD5] transition-colors">
                Sign Up
              </Link>
            </motion.p>

            {/* Cute illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 flex items-center gap-2 text-xs text-[#6B7280] justify-center"
            >
              <Heart size={14} className="text-[#FFDEE2]" fill="#FFDEE2" />
              <span>Every login brings you closer to your new best friend</span>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  )
}
