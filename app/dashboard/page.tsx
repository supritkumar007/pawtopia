'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, FileText, Clock, CheckCircle, Phone, Mail, MapPin, Settings, Edit, LogOut } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'
import { ProfileSidebar } from '@/components/ui/profile-sidebar'
import { FavoritesGrid } from '@/components/ui/favorites-grid'
import { GlassCard } from '@/components/ui/glass-card'
import { BadgeTag } from '@/components/ui/badge-tag'
import { SignOutButton } from '@/components/ui/sign-out-button'
import { GradientHeader } from '@/components/ui/gradient-header'
import { Spinner } from '@/components/ui/spinner'

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'favorites' | 'applications' | 'profile' | 'settings'>('favorites')
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [favorites, setFavorites] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        
        if (!token) {
          router.push('/auth/signin')
          return
        }

        // Fetch user profile
        const profileRes = await fetch('/api/profile/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!profileRes.ok) {
          if (profileRes.status === 401) {
            localStorage.removeItem('accessToken')
            router.push('/auth/signin')
          }
          throw new Error(`HTTP error! status: ${profileRes.status}`)
        }

        const profileData = await profileRes.json()
        
        // Check if user is admin and redirect
        if (profileData.data.user.role === 'admin') {
          router.push('/admin/dashboard')
          return
        }

        setUserProfile({
          name: profileData.data.user.name,
          email: profileData.data.user.email,
          phone: profileData.data.user.phone,
          location: `${profileData.data.user.location.city}, ${profileData.data.user.location.state}`,
          avatar: profileData.data.user.avatar || '/placeholder-user.jpg',
          memberSince: new Date(profileData.data.user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        })

        setFavorites(profileData.data.favorites || [])
        setApplications(profileData.data.adoptions || [])
        setLoading(false)
      } catch (error: any) {
        console.error('Error fetching user data:', error)
        // If it's an auth error, redirect to signin
        if (error.message?.includes('Not authorized') || error.message?.includes('401')) {
          localStorage.removeItem('accessToken')
          router.push('/auth/signin')
        }
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const statusColors = {
    approved: { bg: 'bg-[#B3E5CC]/20', text: 'text-[#2A8659]', label: 'Approved' },
    pending: { bg: 'bg-[#F8E8A6]/20', text: 'text-[#B8860B]', label: 'Pending' },
    rejected: { bg: 'bg-[#FFDEE2]/20', text: 'text-[#E86666]', label: 'Not Approved' },
  }

  const handleSignOut = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    router.push('/auth/signin')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    )
  }

  if (!userProfile) {
    return null
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <GradientHeader
            title="My Profile"
            subtitle="Manage your account, favorites, and adoption applications"
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ProfileSidebar
                user={userProfile}
                stats={{ favorites: favorites.length, applications: applications.length }}
              />

              {/* Sign Out Button */}
              <GlassCard className="mt-6">
                <SignOutButton
                  onSignOut={handleSignOut}
                  variant="button"
                  className="w-full"
                />
              </GlassCard>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="flex gap-2 mb-8 border-b border-white/40 overflow-x-auto">
                {[
                  { key: 'favorites', label: 'Favorites', icon: Heart },
                  { key: 'applications', label: 'Applications', icon: FileText },
                  { key: 'profile', label: 'Profile', icon: Edit },
                  { key: 'settings', label: 'Settings', icon: Settings },
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

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'favorites' && (
                  favorites.length > 0 ? (
                    <FavoritesGrid
                      favorites={favorites.map(pet => ({
                        id: pet._id,
                        name: pet.name,
                        breed: pet.breed,
                        age: `${pet.ageYears}`,
                        image: pet.images?.[0] || '/placeholder-pet.jpg'
                      }))}
                      onRemoveFavorite={async (id) => {
                        try {
                          const token = localStorage.getItem('accessToken')
                          await fetch('/api/favorites/remove', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ petId: id })
                          })
                          setFavorites(favorites.filter(f => f._id !== id))
                        } catch (error) {
                          console.error('Error removing favorite:', error)
                        }
                      }}
                    />
                  ) : (
                    <GlassCard>
                      <div className="text-center py-12">
                        <Heart className="mx-auto mb-4 text-gray-400" size={48} />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No favorites yet</h3>
                        <p className="text-gray-500 mb-4">Start adding pets to your favorites!</p>
                        <GradientButton onClick={() => router.push('/browse')}>Browse Pets</GradientButton>
                      </div>
                    </GlassCard>
                  )
                )}

                {activeTab === 'applications' && (
                  applications.length > 0 ? (
                    <div className="space-y-4">
                      {applications.map((app) => {
                        const colors = statusColors[app.status as keyof typeof statusColors]
                        const statusMessages = {
                          submitted: 'Your application is under review. You will hear back within 3-5 business days.',
                          approved: 'Your adoption has been approved! Contact the shelter to finalize the paperwork.',
                          rejected: 'Unfortunately, this application was not approved. View other pets to continue your search.'
                        }
                        return (
                          <GlassCard key={app._id}>
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-bold text-[#2A2D34] text-lg">{app.petId?.name || 'Pet'}</h3>
                                <p className="text-sm text-[#6B7280] flex items-center gap-2 mt-1">
                                  <Clock size={14} />
                                  Applied: {new Date(app.submittedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <BadgeTag variant={app.status === 'approved' ? 'success' : app.status === 'submitted' ? 'warning' : 'error'}>
                                {app.status === 'submitted' ? 'Pending' : colors.label}
                              </BadgeTag>
                            </div>
                            <p className="text-[#6B7280] text-sm mb-4">{statusMessages[app.status as keyof typeof statusMessages]}</p>
                            <div className="flex gap-2">
                              {app.petId && (
                                <GradientButton size="sm" onClick={() => router.push(`/pet/${app.petId._id}`)}>View Pet</GradientButton>
                              )}
                              <GradientButton size="sm" variant="secondary">Contact Shelter</GradientButton>
                            </div>
                          </GlassCard>
                        )
                      })}
                    </div>
                  ) : (
                    <GlassCard>
                      <div className="text-center py-12">
                        <FileText className="mx-auto mb-4 text-gray-400" size={48} />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No applications yet</h3>
                        <p className="text-gray-500 mb-4">Apply for a pet adoption to see your applications here!</p>
                        <GradientButton onClick={() => router.push('/browse')}>Browse Pets</GradientButton>
                      </div>
                    </GlassCard>
                  )
                )}

                {activeTab === 'profile' && (
                  <GlassCard>
                    <h2 className="text-2xl font-bold text-[#2A2D34] mb-6">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-[#6B7280]">Name</label>
                        <p className="text-[#2A2D34] font-medium mt-1">{userProfile.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#6B7280]">Email</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail size={18} className="text-[#6D9EEB]" />
                          <p className="text-[#2A2D34]">{userProfile.email}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#6B7280]">Phone</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone size={18} className="text-[#6D9EEB]" />
                          <p className="text-[#2A2D34]">{userProfile.phone}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#6B7280]">Location</label>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin size={18} className="text-[#6D9EEB]" />
                          <p className="text-[#2A2D34]">{userProfile.location}</p>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-[#6B7280]">Member Since</label>
                        <p className="text-[#2A2D34] font-medium mt-1">{userProfile.memberSince}</p>
                      </div>
                    </div>
                    <GradientButton className="mt-6">Edit Profile</GradientButton>
                  </GlassCard>
                )}

                {activeTab === 'settings' && (
                  <GlassCard>
                    <h2 className="text-2xl font-bold text-[#2A2D34] mb-6">Account Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-[#2A2D34] mb-4">Notifications</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#6D9EEB]" />
                            <span className="text-[#2A2D34]">Email me about new pets matching my preferences</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#6D9EEB]" />
                            <span className="text-[#2A2D34]">Receive adoption success stories</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 accent-[#6D9EEB]" />
                            <span className="text-[#2A2D34]">Allow shelters to contact me</span>
                          </label>
                        </div>
                      </div>

                      <div className="border-t border-white/20 pt-6">
                        <h3 className="font-semibold text-[#2A2D34] mb-4">Danger Zone</h3>
                        <button className="text-[#E86666] hover:text-[#E86666]/80 font-medium text-sm">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

    </>
  )
}
