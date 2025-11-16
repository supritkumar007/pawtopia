'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  BarChart3,
  Users,
  Heart,
  FileText,
  Building,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'
import { GlassCard } from '@/components/ui/glass-card'
import { BadgeTag } from '@/components/ui/badge-tag'
import { GradientHeader } from '@/components/ui/gradient-header'

interface AdminStats {
  totalUsers: number
  totalPets: number
  totalAdoptions: number
  totalShelters: number
  pendingAdoptions: number
  approvedAdoptions: number
}

interface User {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
}

interface Pet {
  _id: string
  name: string
  type: string
  breed: string
  status: string
  createdAt: string
}

interface Adoption {
  _id: string
  userId: { name: string; email: string }
  petId: { name: string; breed: string }
  status: string
  submittedAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'pets' | 'shelters' | 'users' | 'adoptions' | 'blogs'>('overview')
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [pets, setPets] = useState<Pet[]>([])
  const [adoptions, setAdoptions] = useState<Adoption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        router.push('/auth/signin')
        return
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        if (userData.success && userData.data.role === 'admin') {
          setIsAdmin(true)
          loadDashboardData()
        } else {
          router.push('/dashboard')
        }
      } else {
        router.push('/auth/signin')
      }
    } catch (error) {
      console.error('Admin check failed:', error)
      router.push('/auth/signin')
    }
  }

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)

      // Load stats
      const statsResponse = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        if (statsData.success) {
          setStats(statsData.data)
        }
      }

      // Load users
      const usersResponse = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      if (usersResponse.ok) {
        const usersData = await usersResponse.json()
        if (usersData.success) {
          setUsers(usersData.data)
        }
      }

      // Load pets
      const petsResponse = await fetch('/api/pets/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      if (petsResponse.ok) {
        const petsData = await petsResponse.json()
        if (petsData.success) {
          setPets(petsData.data)
        }
      }

      // Load adoptions
      const adoptionsResponse = await fetch('/api/adoption/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      if (adoptionsResponse.ok) {
        const adoptionsData = await adoptionsResponse.json()
        if (adoptionsData.success) {
          setAdoptions(adoptionsData.data)
        }
      }

    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdoptionAction = async (adoptionId: string, action: 'approve' | 'reject') => {
    try {
      const endpoint = action === 'approve' ? `/api/adoption/${adoptionId}/approve` : `/api/adoption/${adoptionId}/reject`

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })

      if (response.ok) {
        // Reload adoptions data
        loadDashboardData()
      } else {
        alert(`Failed to ${action} adoption`)
      }
    } catch (error) {
      console.error(`Failed to ${action} adoption:`, error)
      alert(`Failed to ${action} adoption`)
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-[#E86666] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2A2D34] mb-2">Access Denied</h2>
          <p className="text-[#6B7280]">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GradientHeader
            title="Admin Dashboard"
            subtitle="Manage pets, users, shelters, and adoptions"
            className="mb-12"
          />

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8 border-b border-white/40 overflow-x-auto">
            {[
              { key: 'overview', label: 'Overview', icon: BarChart3 },
              { key: 'pets', label: 'Pets', icon: Heart },
              { key: 'shelters', label: 'Shelters', icon: Building },
              { key: 'users', label: 'Users', icon: Users },
              { key: 'adoptions', label: 'Adoptions', icon: FileText },
              { key: 'blogs', label: 'Blogs', icon: FileText },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center gap-2 px-6 py-3 font-medium whitespace-nowrap transition-all border-b-2 ${
                  activeTab === key
                    ? 'border-[#6D9EEB] text-[#6D9EEB]'
                    : 'border-transparent text-[#6B7280] hover:text-[#2A2D34]'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC] flex items-center justify-center">
                      <Users size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2A2D34]">{stats?.totalUsers || 0}</p>
                      <p className="text-sm text-[#6B7280]">Total Users</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FFDEE2] to-[#F8E8A6] flex items-center justify-center">
                      <Heart size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2A2D34]">{stats?.totalPets || 0}</p>
                      <p className="text-sm text-[#6B7280]">Total Pets</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#B3E5CC] to-[#6D9EEB] flex items-center justify-center">
                      <FileText size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2A2D34]">{stats?.totalAdoptions || 0}</p>
                      <p className="text-sm text-[#6B7280]">Total Adoptions</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#F8E8A6] to-[#FFDEE2] flex items-center justify-center">
                      <Building size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2A2D34]">{stats?.totalShelters || 0}</p>
                      <p className="text-sm text-[#6B7280]">Total Shelters</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {activeTab === 'users' && (
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#2A2D34]">Users Management</h2>
                  <GradientButton size="sm">
                    <Plus size={16} className="mr-2" />
                    Add User
                  </GradientButton>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/40">
                        <th className="text-left py-3 px-4 font-semibold text-[#2A2D34]">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#2A2D34]">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#2A2D34]">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#2A2D34]">Joined</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#2A2D34]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id} className="border-b border-white/20">
                          <td className="py-3 px-4 text-[#2A2D34]">{user.name}</td>
                          <td className="py-3 px-4 text-[#6B7280]">{user.email}</td>
                          <td className="py-3 px-4">
                            <BadgeTag variant={user.role === 'admin' ? 'success' : 'primary'}>
                              {user.role}
                            </BadgeTag>
                          </td>
                          <td className="py-3 px-4 text-[#6B7280]">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="p-1 text-[#6D9EEB] hover:bg-[#6D9EEB]/10 rounded">
                                <Eye size={16} />
                              </button>
                              <button className="p-1 text-[#2A2D34] hover:bg-[#2A2D34]/10 rounded">
                                <Edit size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            )}

            {activeTab === 'adoptions' && (
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#2A2D34]">Adoption Applications</h2>
                </div>
                <div className="space-y-4">
                  {adoptions.map((adoption) => (
                    <div key={adoption._id} className="border border-white/40 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-[#2A2D34]">{adoption.petId?.name || 'Unknown Pet'}</h3>
                          <p className="text-sm text-[#6B7280]">
                            Applied by: {adoption.userId?.name || 'Unknown User'} ({adoption.userId?.email || 'N/A'})
                          </p>
                          <p className="text-xs text-[#6B7280] mt-1">
                            Applied: {new Date(adoption.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <BadgeTag
                          variant={
                            adoption.status === 'approved' ? 'success' :
                            adoption.status === 'rejected' ? 'error' : 'warning'
                          }
                        >
                          {adoption.status}
                        </BadgeTag>
                      </div>
                      {adoption.status === 'submitted' && (
                        <div className="flex gap-2">
                          <GradientButton
                            size="sm"
                            onClick={() => handleAdoptionAction(adoption._id, 'approve')}
                          >
                            <CheckCircle size={16} className="mr-2" />
                            Approve
                          </GradientButton>
                          <GradientButton
                            size="sm"
                            variant="secondary"
                            onClick={() => handleAdoptionAction(adoption._id, 'reject')}
                          >
                            <XCircle size={16} className="mr-2" />
                            Reject
                          </GradientButton>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {activeTab === 'pets' && (
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#2A2D34]">Pets Management</h2>
                  <GradientButton size="sm">
                    <Plus size={16} className="mr-2" />
                    Add Pet
                  </GradientButton>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/40">
                        <th className="text-left py-3 px-4 font-semibold text-[#2A2D34]">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#2A2D34]">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#2A2D34]">Breed</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#2A2D34]">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-[#2A2D34]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pets.map((pet) => (
                        <tr key={pet._id} className="border-b border-white/20">
                          <td className="py-3 px-4 text-[#2A2D34]">{pet.name}</td>
                          <td className="py-3 px-4 text-[#6B7280]">{pet.type}</td>
                          <td className="py-3 px-4 text-[#6B7280]">{pet.breed}</td>
                          <td className="py-3 px-4">
                            <BadgeTag
                              variant={
                                pet.status === 'available' ? 'success' :
                                pet.status === 'adopted' ? 'primary' : 'warning'
                              }
                            >
                              {pet.status}
                            </BadgeTag>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="p-1 text-[#6D9EEB] hover:bg-[#6D9EEB]/10 rounded">
                                <Eye size={16} />
                              </button>
                              <button className="p-1 text-[#2A2D34] hover:bg-[#2A2D34]/10 rounded">
                                <Edit size={16} />
                              </button>
                              <button className="p-1 text-[#E86666] hover:bg-[#E86666]/10 rounded">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            )}

            {(activeTab === 'shelters' || activeTab === 'blogs') && (
              <GlassCard>
                <div className="text-center py-12">
                  <Building size={48} className="text-[#6B7280] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#2A2D34] mb-2">
                    {activeTab === 'shelters' ? 'Shelters Management' : 'Blog Management'}
                  </h3>
                  <p className="text-[#6B7280] mb-6">
                    {activeTab === 'shelters'
                      ? 'Manage animal shelters and rescue organizations'
                      : 'Create and manage blog posts and news articles'
                    }
                  </p>
                  <GradientButton>
                    <Plus size={16} className="mr-2" />
                    {activeTab === 'shelters' ? 'Add Shelter' : 'Create Post'}
                  </GradientButton>
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}