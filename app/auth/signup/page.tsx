'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AuthForm } from '@/components/ui/auth-form'
import { GradientButton } from '@/components/ui/gradient-button'
import { BlobBackground } from '@/components/ui/blob-background'
import { motion } from 'framer-motion'

export default function SignUpPage() {
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setIsLoading(true)

    const newErrors: Record<string, string> = {}
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

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
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-[#2A2D34] mb-2"
              >
                Create Your Account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#6B7280]"
              >
                Join us to find your perfect pet companion
              </motion.p>
            </div>

            <AuthForm
              type="signup"
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

            {/* Terms Agreement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-2 mb-6"
            >
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked)
                  if (e.target.checked && errors.terms) {
                    setErrors(prev => ({ ...prev, terms: '' }))
                  }
                }}
                className="w-4 h-4 mt-1 accent-[#6D9EEB] cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-[#6B7280]">
                I agree to the <Link href="/terms" className="text-[#6D9EEB] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#6D9EEB] hover:underline">Privacy Policy</Link>
              </label>
            </motion.div>
            {errors.terms && (
              <p className="text-sm text-[#E86666] mb-4">⚠ {errors.terms}</p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex-1 h-px bg-[#6D9EEB]/20" />
              <span className="text-sm text-[#6B7280]">or</span>
              <div className="flex-1 h-px bg-[#6D9EEB]/20" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-sm text-[#6B7280]"
            >
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-[#6D9EEB] font-semibold hover:text-[#5B8DD5] transition-colors">
                Sign In
              </Link>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 flex items-center gap-2 text-xs text-[#6B7280] justify-center"
            >
              <Heart size={14} className="text-[#FFDEE2]" fill="#FFDEE2" />
              <span>Every adoption saves a life</span>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  )
}
