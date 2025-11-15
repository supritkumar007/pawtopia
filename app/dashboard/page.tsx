'use client'

import React, { useState } from 'react'
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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'favorites' | 'applications' | 'profile' | 'settings'>('favorites')
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  const userProfile = {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    avatar: '/placeholder-user.jpg',
    memberSince: 'January 2024',
  }

  const favorites = [
    { id: '1', name: 'Luna', breed: 'Golden Retriever', age: '2', image: '/golden-retriever-puppy.png' },
    { id: '2', name: 'Milo', breed: 'Tabby Cat', age: '1', image: '/cute-tabby-cat.png' },
    { id: '3', name: 'Max', breed: 'Husky Mix', age: '3', image: '/husky-dog-smiling.jpg' },
  ]

  const applications = [
    {
      id: '1',
      petName: 'Luna',
      status: 'approved',
      appliedDate: '2024-01-15',
      message: 'Your adoption has been approved! Contact the shelter to finalize the paperwork.',
    },
    {
      id: '2',
      petName: 'Charlie',
      status: 'pending',
      appliedDate: '2024-01-10',
      message: 'Your application is under review. You will hear back within 3-5 business days.',
    },
    {
      id: '3',
      petName: 'Max',
      status: 'rejected',
      appliedDate: '2024-01-05',
      message: 'Unfortunately, this application was not approved. View other pets to continue your search.',
    },
  ]

  const statusColors = {
    approved: { bg: 'bg-[#B3E5CC]/20', text: 'text-[#2A8659]', label: 'Approved' },
    pending: { bg: 'bg-[#F8E8A6]/20', text: 'text-[#B8860B]', label: 'Pending' },
    rejected: { bg: 'bg-[#FFDEE2]/20', text: 'text-[#E86666]', label: 'Not Approved' },
  }

  const handleSignOut = () => {
    // Handle sign out logic
    console.log('Signing out...')
    setShowSignOutModal(false)
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
                  <FavoritesGrid
                    favorites={favorites}
                    onRemoveFavorite={(id) => console.log('Remove favorite:', id)}
                  />
                )}

                {activeTab === 'applications' && (
                  <div className="space-y-4">
                    {applications.map((app) => {
                      const colors = statusColors[app.status as keyof typeof statusColors]
                      return (
                        <GlassCard key={app.id}>
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-[#2A2D34] text-lg">{app.petName}</h3>
                              <p className="text-sm text-[#6B7280] flex items-center gap-2 mt-1">
                                <Clock size={14} />
                                Applied: {app.appliedDate}
                              </p>
                            </div>
                            <BadgeTag variant={app.status === 'approved' ? 'success' : app.status === 'pending' ? 'warning' : 'error'}>
                              {colors.label}
                            </BadgeTag>
                          </div>
                          <p className="text-[#6B7280] text-sm mb-4">{app.message}</p>
                          <div className="flex gap-2">
                            <GradientButton size="sm">View Pet</GradientButton>
                            <GradientButton size="sm" variant="secondary">Contact Shelter</GradientButton>
                          </div>
                        </GlassCard>
                      )
                    })}
                  </div>
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
