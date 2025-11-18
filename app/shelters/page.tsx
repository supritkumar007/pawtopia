'use client'

import React, { useState, useEffect } from 'react'
import { Search, MapPin, Users } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'
import { ShelterCard } from '@/components/ui/shelter-card'
import { FormInput } from '@/components/ui/form-input'

interface ShelterData {
  _id: string
  name: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  phone: string
  email: string
  capacity: number
  currentOccupancy: number
  images: string[]
}

export default function SheltersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [shelters, setShelters] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/shelters')
        if (!response.ok) {
          throw new Error('Failed to fetch shelters')
        }

        const result = await response.json()
        if (result.success) {
          // Transform API data to match component expectations
          const transformedShelters = result.data.map((shelter: ShelterData) => ({
            id: shelter._id,
            name: shelter.name,
            location: `${shelter.address.city}, ${shelter.address.state}`,
            phone: shelter.phone,
            email: shelter.email,
            petCount: shelter.currentOccupancy,
            image: shelter.images?.[0] || '/placeholder.svg',
            rating: 4.8, // Default rating
          }))

          setShelters(transformedShelters)
        } else {
          throw new Error(result.message || 'Failed to fetch shelters')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching shelters:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchShelters()
  }, [])

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D9EEB] mx-auto mb-4"></div>
            <p className="text-[#6B7280]">Loading shelters...</p>
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
            <h1 className="text-2xl font-bold text-[#2A2D34] mb-4">Error Loading Shelters</h1>
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


  const filteredShelters = shelters.filter(shelter => {
    const matchesSearch = shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shelter.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = !selectedLocation || shelter.location.includes(selectedLocation)
    return matchesSearch && matchesLocation
  })

  const locations = [...new Set(shelters.map(s => s.location.split(',')[1].trim()))]

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2A2D34] mb-4">Find a Shelter</h1>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Connect with trusted shelters and rescue organizations in your area.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="glass-effect rounded-2xl p-6 shadow-soft mb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6D9EEB]" size={20} />
                <input
                  type="text"
                  placeholder="Search shelters by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/50 pl-12 pr-4 py-3 rounded-lg border-2 border-transparent focus:border-[#6D9EEB] focus:outline-none placeholder-[#6B7280] text-[#2A2D34]"
                />
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-3 bg-white/50 text-[#2A2D34] rounded-lg border-2 border-transparent focus:border-[#6D9EEB] focus:outline-none"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <p className="text-sm text-[#6B7280]">
              <Users size={16} className="inline mr-2" />
              Found {filteredShelters.length} shelters
            </p>
          </div>

          {/* Shelters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredShelters.map((shelter, index) => (
              <div key={shelter.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <ShelterCard {...shelter} />
              </div>
            ))}
          </div>

          {filteredShelters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#6B7280] mb-4">No shelters found matching your search.</p>
              <GradientButton onClick={() => { setSearchQuery(''); setSelectedLocation(''); }}>
                Clear Filters
              </GradientButton>
            </div>
          )}

          {/* CTA Section */}
          <div className="glass-effect rounded-2xl p-8 shadow-soft text-center">
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">Want to List Your Shelter?</h2>
            <p className="text-[#6B7280] mb-6 max-w-2xl mx-auto">
              Join our network of trusted shelters and reach thousands of potential adopters.
            </p>
            <GradientButton size="lg">Contact Us</GradientButton>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
