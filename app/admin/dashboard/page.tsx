'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientHeader } from '@/components/ui/gradient-header'
import { GlassCard } from '@/components/ui/glass-card'
import { Spinner } from '@/components/ui/spinner'
import { Users, PawPrint, FileCheck, Home, Newspaper, MapPin } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAdminAndFetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const userRole = localStorage.getItem('userRole')
        
        if (!token) {
          router.push('/auth/signin')
          return
        }

        // Check if user is admin
        if (userRole !== 'admin') {
          router.push('/dashboard')
          return
        }

        // Fetch user data
        const userRes = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (userRes.ok) {
          const userData = await userRes.json()
          setUser(userData.data)
        }

        // Fetch admin stats
        const statsRes = await fetch('/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData.data)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching admin data:', error)
        setLoading(false)
      }
    }

    checkAdminAndFetchData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    )
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GradientHeader
            title={`Welcome, ${user?.name || 'Admin'}!`}
            subtitle="Manage your pet adoption platform"
            className="mb-12"
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Pets</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats?.totalPets || 0}</h3>
                  <p className="text-sm text-green-600 mt-1">
                    {stats?.availablePets || 0} available
                  </p>
                </div>
                <div className="p-4 bg-blue-100 rounded-lg">
                  <PawPrint className="text-blue-600" size={32} />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Adopted Pets</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats?.adoptedPets || 0}</h3>
                  <p className="text-sm text-gray-500 mt-1">Success stories</p>
                </div>
                <div className="p-4 bg-green-100 rounded-lg">
                  <FileCheck className="text-green-600" size={32} />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pending Adoptions</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats?.pendingAdoptions || 0}</h3>
                  <p className="text-sm text-orange-600 mt-1">Needs review</p>
                </div>
                <div className="p-4 bg-orange-100 rounded-lg">
                  <FileCheck className="text-orange-600" size={32} />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Users</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats?.totalUsers || 0}</h3>
                  <p className="text-sm text-gray-500 mt-1">Registered</p>
                </div>
                <div className="p-4 bg-purple-100 rounded-lg">
                  <Users className="text-purple-600" size={32} />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Shelters</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stats?.totalShelters || 0}</h3>
                  <p className="text-sm text-gray-500 mt-1">Partner locations</p>
                </div>
                <div className="p-4 bg-indigo-100 rounded-lg">
                  <Home className="text-indigo-600" size={32} />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Quick Actions */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => router.push('/admin/pets')}
                className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center"
              >
                <PawPrint className="mx-auto mb-2 text-blue-600" size={24} />
                <p className="text-sm font-medium text-gray-700">Manage Pets</p>
              </button>
              
              <button
                onClick={() => router.push('/admin/adoptions')}
                className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center"
              >
                <FileCheck className="mx-auto mb-2 text-green-600" size={24} />
                <p className="text-sm font-medium text-gray-700">Review Adoptions</p>
              </button>
              
              <button
                onClick={() => router.push('/admin/shelters')}
                className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors text-center"
              >
                <Home className="mx-auto mb-2 text-indigo-600" size={24} />
                <p className="text-sm font-medium text-gray-700">Manage Shelters</p>
              </button>
              
              <button
                onClick={() => router.push('/admin/blogs')}
                className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center"
              >
                <Newspaper className="mx-auto mb-2 text-purple-600" size={24} />
                <p className="text-sm font-medium text-gray-700">Manage Blogs</p>
              </button>
            </div>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </>
  )
}
