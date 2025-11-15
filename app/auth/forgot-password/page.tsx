'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, Check } from 'lucide-react'
import { AuthCard } from '@/components/ui/auth-card'
import { FormInput } from '@/components/ui/form-input'
import { GradientButton } from '@/components/ui/gradient-button'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!email) {
      setError('Email is required')
      setIsLoading(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <AuthCard title="Check Your Email">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#B3E5CC] to-[#6D9EEB] flex items-center justify-center mx-auto">
            <Check size={32} className="text-white" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#2A2D34] mb-2">Email Sent!</h2>
            <p className="text-[#6B7280] text-sm">
              We've sent a password reset link to <strong>{email}</strong>. Check your email and follow the instructions to reset your password.
            </p>
          </div>

          <div className="pt-4 text-sm text-[#6B7280]">
            Didn't receive the email?{' '}
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-[#6D9EEB] hover:underline font-medium"
            >
              Try again
            </button>
          </div>

          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-[#6D9EEB] hover:underline mt-4"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Reset Your Password"
      subtitle="Enter your email to receive a reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          icon={<Mail size={20} />}
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          error={error}
        />

        <GradientButton type="submit" size="lg" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </GradientButton>
      </form>

      <Link
        href="/auth/login"
        className="flex items-center gap-2 justify-center text-[#6D9EEB] hover:underline mt-6 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Login
      </Link>
    </AuthCard>
  )
}
