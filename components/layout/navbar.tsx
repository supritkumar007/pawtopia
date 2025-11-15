'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, User } from 'lucide-react'
import { GradientButton } from '@/components/ui/gradient-button'
import { SignOutButton } from '@/components/ui/sign-out-button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsLoggedIn(!!token)
  }, [])

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear localStorage regardless of API call success
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      setIsLoggedIn(false)
      window.location.href = '/'
    }
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Browse Pets', href: '/browse' },
    { label: 'Shelters', href: '/shelters' },
    { label: 'Blog', href: '/blog' },
    { label: 'Lost & Found', href: '/lost-and-found' },
  ]

  return (
    <nav className="glass-effect sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC] bg-clip-text text-transparent"
          >
            Pawtopia
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#2A2D34] hover:text-[#6D9EEB] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link href="/favorites" className="p-2 hover:bg-white/50 rounded-full transition-colors">
                  <Heart size={20} className="text-[#FFDEE2]" />
                </Link>
                <Link href="/dashboard" className="p-2 hover:bg-white/50 rounded-full transition-colors">
                  <User size={20} className="text-[#6D9EEB]" />
                </Link>
                <SignOutButton
                  onSignOut={handleSignOut}
                  variant="icon"
                />
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="p-2 hover:bg-white/50 rounded-full transition-colors">
                  <User size={20} className="text-[#6D9EEB]" />
                </Link>
                <Link href="/auth/signin">
                  <GradientButton size="sm">Sign In</GradientButton>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-[#2A2D34] hover:bg-white/50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-2 space-y-2">
              {isLoggedIn ? (
                <>
                  <Link href="/favorites" className="block w-full">
                    <GradientButton className="w-full" variant="secondary">My Favorites</GradientButton>
                  </Link>
                  <Link href="/dashboard" className="block w-full">
                    <GradientButton className="w-full" variant="secondary">Dashboard</GradientButton>
                  </Link>
                  <SignOutButton
                    onSignOut={handleSignOut}
                    variant="button"
                    className="w-full"
                  />
                </>
              ) : (
                <Link href="/auth/signin" className="block w-full">
                  <GradientButton className="w-full">Sign In</GradientButton>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
