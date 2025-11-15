'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock } from 'lucide-react'
import { AuthCard } from '@/components/ui/auth-card'
import { FormInput } from '@/components/ui/form-input'
import { GradientButton } from '@/components/ui/gradient-button'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    alert('Login successful!')
  }

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your Pawtopia account"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          icon={<Mail size={20} />}
          label="Email Address"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormInput
          icon={<Lock size={20} />}
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-[#6D9EEB] cursor-pointer"
            />
            <span className="text-sm text-[#6B7280]">Remember me</span>
          </label>
          <Link href="/auth/forgot-password" className="text-sm text-[#6D9EEB] hover:underline">
            Forgot Password?
          </Link>
        </div>

        <GradientButton type="submit" size="lg" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </GradientButton>
      </form>

      <div className="mt-6 text-center text-sm text-[#6B7280]">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="text-[#6D9EEB] hover:underline font-medium">
          Create One
        </Link>
      </div>

      <div className="mt-4 pt-4 border-t border-white/40">
        <button className="w-full py-3 rounded-xl bg-white/50 hover:bg-white/70 transition-colors text-sm font-medium text-[#2A2D34]">
          Continue with Google
        </button>
      </div>
    </AuthCard>
  )
}
