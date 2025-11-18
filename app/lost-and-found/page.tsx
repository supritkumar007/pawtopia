'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Calendar, Heart, Share2, Phone, AlertCircle } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'

interface LostFoundPost {
  _id: string
  type: 'lost' | 'found'
  petName: string
  description: string
  lastSeenLocation: string
  images: string[]
  userId: { name: string; phone: string; email: string }
  status: string
  postedAt: string
}

export default function LostAndFoundPage() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost')
  const [showPostModal, setShowPostModal] = useState(false)
  const [posts, setPosts] = useState<LostFoundPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/lostfound/all')
        if (!response.ok) {
          throw new Error('Failed to fetch lost and found posts')
        }

        const result = await response.json()
        if (result.success) {
          setPosts(result.data)
        } else {
          throw new Error(result.message || 'Failed to fetch posts')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching lost and found posts:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D9EEB] mx-auto mb-4"></div>
            <p className="text-[#6B7280]">Loading lost and found posts...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#2A2D34] mb-4">Error Loading Posts</h1>
            <p className="text-[#6B7280] mb-6">{error}</p>
            <GradientButton onClick={() => window.location.reload()}>
              Try Again
            </GradientButton>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const lostPets = posts.filter(post => post.type === 'lost').map(post => ({
    id: post._id,
    name: post.petName,
    breed: 'Unknown Breed', // Model doesn't have breed field
    lastSeen: post.lastSeenLocation,
    date: new Date(post.postedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    image: post.images?.[0] || '/placeholder.svg',
    description: post.description,
    contact: post.userId?.phone || 'Contact not available',
    reward: 'Reward offered', // Model doesn't have reward field
  }))

  const foundPets = posts.filter(post => post.type === 'found').map(post => ({
    id: post._id,
    breed: 'Unknown Breed', // Model doesn't have breed field
    foundLocation: post.lastSeenLocation,
    date: new Date(post.postedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    image: post.images?.[0] || '/placeholder.svg',
    description: post.description,
  }))


  const displayPets = activeTab === 'lost' ? lostPets : foundPets

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2A2D34] mb-4">Lost & Found</h1>
            <p className="text-lg text-[#6B7280] flex items-center gap-2">
              <AlertCircle size={20} className="text-[#E86666]" />
              Help reunite pets with their families
            </p>
          </div>

          {/* Tabs and CTA */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex gap-4 border-b border-white/40 w-full md:w-auto">
              <button
                onClick={() => setActiveTab('lost')}
                className={`px-6 py-3 font-medium border-b-2 transition-all ${
                  activeTab === 'lost'
                    ? 'border-[#E86666] text-[#E86666]'
                    : 'border-transparent text-[#6B7280] hover:text-[#2A2D34]'
                }`}
              >
                Lost Pets ({lostPets.length})
              </button>
              <button
                onClick={() => setActiveTab('found')}
                className={`px-6 py-3 font-medium border-b-2 transition-all ${
                  activeTab === 'found'
                    ? 'border-[#B3E5CC] text-[#2A8659]'
                    : 'border-transparent text-[#6B7280] hover:text-[#2A2D34]'
                }`}
              >
                Found Pets ({foundPets.length})
              </button>
            </div>
            <GradientButton onClick={() => setShowPostModal(true)} size="lg">
              Post a Pet
            </GradientButton>
          </div>

          {/* Pet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayPets.map((pet, index) => (
              <div
                key={pet.id}
                className="glass-effect rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.breed}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                  {activeTab === 'lost' && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-[#E86666] text-white rounded-full text-xs font-bold">
                      MISSING
                    </div>
                  )}
                  {activeTab === 'found' && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-[#B3E5CC] text-[#2A8659] rounded-full text-xs font-bold">
                      FOUND
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2A2D34] mb-2">
                    {'name' in pet ? pet.name : 'Unknown'}
                  </h3>
                  <p className="text-[#6B7280] mb-4">{pet.breed}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <p className="flex items-center gap-2 text-[#6B7280]">
                      <MapPin size={16} className="text-[#6D9EEB]" />
                      {'lastSeen' in pet ? pet.lastSeen : pet.foundLocation}
                    </p>
                    <p className="flex items-center gap-2 text-[#6B7280]">
                      <Calendar size={16} className="text-[#6D9EEB]" />
                      {pet.date}
                    </p>
                  </div>

                  <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{pet.description}</p>

                  {activeTab === 'lost' && 'reward' in pet && (
                    <p className="text-sm font-bold text-[#FFDEE2] mb-4">Reward: {pet.reward}</p>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-3 bg-[#6D9EEB] text-white rounded-lg hover:bg-[#5B8DD5] transition-colors font-medium text-sm flex items-center justify-center gap-2">
                      <Phone size={16} />
                      Contact
                    </button>
                    <button className="flex-1 py-2 px-3 bg-white/50 hover:bg-white/70 rounded-lg transition-colors text-[#6B7280] text-sm flex items-center justify-center gap-2">
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Resources */}
          <div className="glass-effect rounded-2xl p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-6">Emergency Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Animal Control',
                  info: '+1 (555) 911-PETS',
                  desc: 'Report lost or found pets',
                },
                {
                  title: 'Local Shelters',
                  info: 'Check our Shelters directory',
                  desc: 'Visit shelters to check lost pet registry',
                },
                {
                  title: 'Microchip Registry',
                  info: 'www.aaha.org',
                  desc: 'Check if your pet is registered',
                },
              ].map((resource, index) => (
                <div key={index} className="border-2 border-white/40 rounded-xl p-4 text-center">
                  <h3 className="font-bold text-[#2A2D34] mb-2">{resource.title}</h3>
                  <p className="text-[#6D9EEB] font-medium mb-2">{resource.info}</p>
                  <p className="text-sm text-[#6B7280]">{resource.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Post Modal */}
      {showPostModal && (
        <PostPetModal onClose={() => setShowPostModal(false)} />
      )}
    </>
  )
}

function PostPetModal({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<'lost' | 'found'>('lost')
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    location: '',
    date: '',
    description: '',
    contact: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Pet post submitted successfully! Thank you for helping!')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full glass-effect shadow-2xl">
        <h2 className="text-2xl font-bold text-[#2A2D34] mb-6">Post a Pet</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            {['lost', 'found'].map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setType(option as 'lost' | 'found')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  type === option
                    ? option === 'lost'
                      ? 'bg-[#E86666] text-white'
                      : 'bg-[#B3E5CC] text-[#2A8659]'
                    : 'bg-white/50 text-[#6B7280]'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>

          {type === 'lost' && (
            <input
              type="text"
              placeholder="Pet name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-white/40 rounded-lg focus:border-[#6D9EEB] focus:outline-none bg-white/50"
            />
          )}

          <input
            type="text"
            placeholder="Breed / Description"
            value={formData.breed}
            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
            className="w-full px-4 py-2 border-2 border-white/40 rounded-lg focus:border-[#6D9EEB] focus:outline-none bg-white/50"
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border-2 border-white/40 rounded-lg focus:border-[#6D9EEB] focus:outline-none bg-white/50"
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border-2 border-white/40 rounded-lg focus:border-[#6D9EEB] focus:outline-none bg-white/50"
          />
          <textarea
            placeholder="Details about the pet..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border-2 border-white/40 rounded-lg focus:border-[#6D9EEB] focus:outline-none bg-white/50 resize-none"
            rows={3}
          />
          <input
            type="tel"
            placeholder="Your contact number"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full px-4 py-2 border-2 border-white/40 rounded-lg focus:border-[#6D9EEB] focus:outline-none bg-white/50"
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-white/50 text-[#2A2D34] rounded-lg hover:bg-white/70 transition-colors font-medium"
            >
              Cancel
            </button>
            <GradientButton size="lg" className="flex-1" type="submit">
              Post
            </GradientButton>
          </div>
        </form>
      </div>
    </div>
  )
}
