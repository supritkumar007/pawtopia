'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MapPin, Phone, Mail, Clock, Globe, Award, Heart } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'
import { PetCard } from '@/components/ui/pet-card'

export default function ShelterDetailsPage() {
  const shelterData = {
    id: '1',
    name: 'Happy Paws Shelter',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567',
    email: 'contact@happypaws.org',
    website: 'www.happypaws.org',
    image: '/placeholder.svg?key=2uq53',
    coverImage: '/placeholder.svg?key=32tl3',
    rating: 4.8,
    reviews: 128,
    founded: '2010',
    description: 'Happy Paws Shelter is a non-profit organization dedicated to rescuing, rehabilitating, and rehoming abandoned and neglected animals. Since 2010, we have successfully helped over 5,000 pets find their forever homes.',
    mission: 'Our mission is to provide a safe haven for animals in need and connect them with loving families who will give them the care they deserve.',
    hours: {
      monday: '10:00 AM - 6:00 PM',
      tuesday: '10:00 AM - 6:00 PM',
      wednesday: 'Closed',
      thursday: '10:00 AM - 6:00 PM',
      friday: '10:00 AM - 8:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: '12:00 PM - 5:00 PM',
    },
    services: ['Adoption', 'Rescue', 'Foster Programs', 'Veterinary Care', 'Training'],
  }

  const availablePets = [
    { id: '1', name: 'Luna', breed: 'Golden Retriever', age: '2', image: '/placeholder.svg?key=2uq53' },
    { id: '2', name: 'Milo', breed: 'Tabby Cat', age: '1', image: '/placeholder.svg?key=4l0rb' },
    { id: '3', name: 'Max', breed: 'Husky Mix', age: '3', image: '/placeholder.svg?key=o3rp0' },
    { id: '4', name: 'Bella', breed: 'Siamese', age: '2', image: '/placeholder.svg?key=8k2q1' },
  ]

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF]">
        {/* Cover Section */}
        <div className="relative h-80 overflow-hidden">
          <Image
            src={shelterData.coverImage || "/placeholder.svg"}
            alt={shelterData.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FDFCFD]" />
          <Link
            href="/shelters"
            className="absolute top-6 left-6 flex items-center gap-2 text-white bg-black/40 px-4 py-2 rounded-full hover:bg-black/60 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Shelters
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="glass-effect rounded-2xl p-8 shadow-soft mb-8">
                <h1 className="text-4xl font-bold text-[#2A2D34] mb-2">{shelterData.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-lg font-bold text-[#FFDEE2]">★ {shelterData.rating}</span>
                  <span className="text-[#6B7280]">({shelterData.reviews} reviews)</span>
                </div>

                <div className="space-y-2 mb-6 text-[#6B7280]">
                  <p className="flex items-center gap-2">
                    <MapPin size={20} className="text-[#6D9EEB]" />
                    {shelterData.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={20} className="text-[#6D9EEB]" />
                    {shelterData.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={20} className="text-[#6D9EEB]" />
                    {shelterData.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Globe size={20} className="text-[#6D9EEB]" />
                    {shelterData.website}
                  </p>
                </div>

                <div className="flex gap-3">
                  <GradientButton size="lg">Contact Shelter</GradientButton>
                  <button className="px-6 py-3 border-2 border-[#6D9EEB] text-[#6D9EEB] rounded-xl font-medium hover:bg-[#6D9EEB]/10 transition-colors">
                    <Heart size={20} className="inline mr-2" />
                    Follow
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="glass-effect rounded-2xl p-8 shadow-soft mb-8">
                <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">About Us</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">{shelterData.description}</p>
                <p className="text-[#6D9EEB] font-medium italic">"{shelterData.mission}"</p>
              </div>

              {/* Services */}
              <div className="glass-effect rounded-2xl p-8 shadow-soft mb-8">
                <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">Our Services</h2>
                <div className="flex flex-wrap gap-3">
                  {shelterData.services.map(service => (
                    <span key={service} className="px-4 py-2 bg-[#6D9EEB]/20 text-[#6D9EEB] rounded-full text-sm font-medium">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="glass-effect rounded-2xl p-8 shadow-soft mb-8">
                <h2 className="text-2xl font-bold text-[#2A2D34] mb-4 flex items-center gap-2">
                  <Clock size={24} className="text-[#6D9EEB]" />
                  Hours of Operation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {Object.entries(shelterData.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between border-b border-white/40 pb-2">
                      <span className="font-medium text-[#2A2D34] capitalize">{day}</span>
                      <span className={hours === 'Closed' ? 'text-[#E86666]' : 'text-[#6B7280]'}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass-effect rounded-2xl p-6 shadow-soft">
                <h3 className="font-bold text-[#2A2D34] mb-4 flex items-center gap-2">
                  <Award size={20} className="text-[#6D9EEB]" />
                  Shelter Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[#6B7280]">Founded</p>
                    <p className="font-medium text-[#2A2D34]">{shelterData.founded}</p>
                  </div>
                  <div>
                    <p className="text-[#6B7280]">Available Pets</p>
                    <p className="font-medium text-[#2A2D34]">32 animals</p>
                  </div>
                  <div>
                    <p className="text-[#6B7280]">Animals Adopted</p>
                    <p className="font-medium text-[#2A2D34]">5,000+</p>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-2xl p-6 shadow-soft">
                <h3 className="font-bold text-[#2A2D34] mb-4">Get Involved</h3>
                <div className="space-y-2">
                  <GradientButton variant="secondary" className="w-full" size="sm">
                    Donate
                  </GradientButton>
                  <button className="w-full px-4 py-2 bg-[#B3E5CC]/20 text-[#2A8659] rounded-lg hover:bg-[#B3E5CC]/30 transition-colors font-medium text-sm">
                    Volunteer
                  </button>
                  <button className="w-full px-4 py-2 bg-[#F8E8A6]/20 text-[#B8860B] rounded-lg hover:bg-[#F8E8A6]/30 transition-colors font-medium text-sm">
                    Foster
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Available Pets */}
          <div className="py-12 px-8">
            <h2 className="text-3xl font-bold text-[#2A2D34] mb-8">Available Pets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {availablePets.map((pet, index) => (
                <div key={pet.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <PetCard {...pet} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
