'use client'

import React, { useState } from 'react'
import { Search, MapPin, Users } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'
import { ShelterCard } from '@/components/ui/shelter-card'
import { FormInput } from '@/components/ui/form-input'

export default function SheltersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const shelters = [
    {
      id: '1',
      name: 'Happy Paws Shelter',
      location: 'San Francisco, CA',
      phone: '+1 (555) 123-4567',
      email: 'contact@happypaws.org',
      petCount: 32,
      image: '/placeholder.svg?key=2uq53',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Furry Friends Rescue',
      location: 'Oakland, CA',
      phone: '+1 (555) 234-5678',
      email: 'info@furryfriends.org',
      petCount: 28,
      image: '/placeholder.svg?key=4l0rb',
      rating: 4.6,
    },
    {
      id: '3',
      name: 'Paws & Love Haven',
      location: 'San Jose, CA',
      phone: '+1 (555) 345-6789',
      email: 'support@pawsandhaven.org',
      petCount: 41,
      image: '/placeholder.svg?key=o3rp0',
      rating: 4.9,
    },
    {
      id: '4',
      name: 'Best Friends Animal Society',
      location: 'Berkeley, CA',
      phone: '+1 (555) 456-7890',
      email: 'hello@bestfriends.org',
      petCount: 35,
      image: '/placeholder.svg?key=8k2q1',
      rating: 4.7,
    },
    {
      id: '5',
      name: 'Second Chance Sanctuary',
      location: 'Mountain View, CA',
      phone: '+1 (555) 567-8901',
      email: 'care@secondchance.org',
      petCount: 22,
      image: '/placeholder.svg?key=9l4r2',
      rating: 4.5,
    },
    {
      id: '6',
      name: 'Animal Friends United',
      location: 'Sunnyvale, CA',
      phone: '+1 (555) 678-9012',
      email: 'team@animalfriends.org',
      petCount: 38,
      image: '/placeholder.svg?key=5m8s3',
      rating: 4.8,
    },
  ]

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
