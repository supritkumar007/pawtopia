'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { FormInput } from './form-input'
import { LocationSelect } from './location-select'
import { GradientButton } from './gradient-button'
import { PastelButton } from './pastel-button'

interface AuthFormProps {
  type: 'signin' | 'signup'
  onSubmit: (data: any) => void
  isLoading?: boolean
  className?: string
}

export function AuthForm({ type, onSubmit, isLoading = false, className }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    location: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleLocationChange = (value: string) => {
    setFormData(prev => ({ ...prev, location: value }))
    if (errors.location) {
      setErrors(prev => ({ ...prev, location: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Basic validation
    const newErrors: Record<string, string> = {}

    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (type === 'signup') {
      if (!formData.name) newErrors.name = 'Name is required'
      if (!formData.phone) newErrors.phone = 'Phone is required'
      if (!formData.location) newErrors.location = 'Location is required'
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  const formVariants = {
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

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {type === 'signup' && (
        <motion.div variants={fieldVariants}>
          <FormInput
            label="Full Name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
        </motion.div>
      )}

      <motion.div variants={fieldVariants}>
        <FormInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
      </motion.div>

      {type === 'signup' && (
        <motion.div variants={fieldVariants}>
          <FormInput
            label="Phone Number"
            name="phone"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
        </motion.div>
      )}

      {type === 'signup' && (
        <motion.div variants={fieldVariants}>
          <label className="block text-sm font-medium text-[#2A2D34] mb-2">
            City
          </label>
          <LocationSelect
            value={formData.location}
            onChange={handleLocationChange}
            error={errors.location}
            placeholder="Select your city"
          />
        </motion.div>
      )}

      <motion.div variants={fieldVariants}>
        <label className="block text-sm font-medium text-[#2A2D34] mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white/80 text-[#2A2D34] placeholder-[#6B7280] transition-all duration-300 focus:outline-none focus:border-[#6D9EEB] focus:bg-white focus:shadow-soft"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6B7280] hover:text-[#6D9EEB] transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-[#E86666] mt-2">⚠ {errors.password}</p>
        )}
      </motion.div>

      {type === 'signup' && (
        <motion.div variants={fieldVariants}>
          <FormInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />
        </motion.div>
      )}

      <motion.div variants={fieldVariants}>
        <GradientButton
          type="submit"
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading
            ? (type === 'signin' ? 'Signing in...' : 'Creating Account...')
            : (type === 'signin' ? 'Sign In' : 'Create Account')
          }
        </GradientButton>
      </motion.div>
    </motion.form>
  )
}