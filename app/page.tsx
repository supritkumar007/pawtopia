'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Users, Zap, Award } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'
import { BlobBackground } from '@/components/ui/blob-background'
import { PetCard } from '@/components/ui/pet-card'

interface Pet {
  _id: string
  name: string
  breed: string
  ageYears: number
  ageMonths: number
  images: string[]
}

export default function Home() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [scrollY, setScrollY] = useState(0)
  const [featuredPets, setFeaturedPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        const response = await fetch('/api/pets')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data.length > 0) {
            // Take first 3 pets as featured
            setFeaturedPets(data.data.slice(0, 3))
          }
        }
      } catch (error) {
        console.error('Error fetching featured pets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedPets()
  }, [])

  const handleFavorite = (id: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const features = [
    {
      icon: Heart,
      title: 'Find Your Match',
      description: 'Browse thousands of adoptable pets and find your perfect companion.',
    },
    {
      icon: Zap,
      title: 'Quick Process',
      description: 'Simple adoption application that takes just a few minutes.',
    },
    {
      icon: Users,
      title: 'Connect with Shelters',
      description: 'Work directly with trusted shelters and rescue organizations.',
    },
    {
      icon: Award,
      title: 'Verified Pets',
      description: 'All pets are health-checked and ready for their new homes.',
    },
  ]

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDFCFD] via-[#F9F7FF] to-[#FDFCFD]">
        <BlobBackground colors={{ blob1: '#6D9EEB', blob2: '#FFDEE2', blob3: '#B3E5CC' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-up">
              <h1 className="text-5xl md:text-6xl font-bold text-[#2A2D34] mb-6 leading-tight text-balance">
                Find Your Perfect <span className="bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC] bg-clip-text text-transparent">Furry Friend</span>
              </h1>
              <p className="text-lg text-[#6B7280] mb-8 text-balance">
                Adopt a pet and change a life. Browse thousands of loving animals waiting for their forever homes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/browse">
                  <GradientButton size="lg" className="flex items-center gap-2">
                    Start Browsing <ArrowRight size={20} />
                  </GradientButton>
                </Link>
                <Link href="#why-choose">
                  <button className="px-8 py-4 text-lg font-medium text-[#6D9EEB] border-2 border-[#6D9EEB] rounded-xl hover:bg-[#6D9EEB]/10 transition-all">
                    Learn More
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                <div className="animate-pulse-gentle">
                  <p className="text-3xl font-bold text-[#6D9EEB]">10K+</p>
                  <p className="text-sm text-[#6B7280]">Happy Adoptions</p>
                </div>
                <div className="animate-pulse-gentle" style={{ animationDelay: '0.2s' }}>
                  <p className="text-3xl font-bold text-[#B3E5CC]">500+</p>
                  <p className="text-sm text-[#6B7280]">Shelter Partners</p>
                </div>
                <div className="animate-pulse-gentle" style={{ animationDelay: '0.4s' }}>
                  <p className="text-3xl font-bold text-[#FFDEE2]">50K+</p>
                  <p className="text-sm text-[#6B7280]">Available Pets</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="relative h-96 md:h-full animate-float">
              <Image
                src="/cute-pets-playing-together.jpg"
                alt="Happy pets"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#6D9EEB] rounded-full flex items-center justify-center">
            <div className="w-1 h-2 bg-[#6D9EEB] rounded-full animate-slide-up" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-choose" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2D34] mb-4">Why Choose Pawtopia?</h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              We make pet adoption simple, safe, and joyful for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="glass-effect rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC] flex items-center justify-center mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#2A2D34] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#6B7280]">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2D34] mb-4">Featured Pets</h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Meet some of our amazing pets looking for their forever homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {isLoading ? (
              // Show loading placeholders
              [...Array(3)].map((_, index) => (
                <div key={index} className="animate-slide-up glass-effect rounded-2xl p-6 h-64 flex items-center justify-center" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-[#6B7280]">Loading pets...</div>
                </div>
              ))
            ) : featuredPets.length > 0 ? (
              featuredPets.map((pet, index) => (
                <div key={pet._id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <PetCard
                    id={pet._id}
                    name={pet.name}
                    breed={pet.breed}
                    age={`${pet.ageYears}y ${pet.ageMonths}m`}
                    image={pet.images?.[0] || '/placeholder.svg'}
                    isFavorited={favorites.has(pet._id)}
                    onFavorite={handleFavorite}
                  />
                </div>
              ))
            ) : (
              // Show empty state if no pets available
              <div className="col-span-full text-center py-12">
                <p className="text-[#6B7280] text-lg">No pets available at the moment.</p>
                <p className="text-[#6B7280] mt-2">Check back later for new arrivals!</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link href="/browse">
              <GradientButton size="lg">View All Pets</GradientButton>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2A2D34] mb-16 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Browse', desc: 'Explore our collection of adoptable pets' },
              { num: '2', title: 'Connect', desc: 'Reach out to shelters or rescue organizations' },
              { num: '3', title: 'Apply', desc: 'Complete our simple adoption application' },
              { num: '4', title: 'Adopt', desc: 'Bring your new friend home and celebrate' },
            ].map((step, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC] flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-soft">
                  {step.num}
                </div>
                <h3 className="font-bold text-[#2A2D34] mb-2 text-lg">{step.title}</h3>
                <p className="text-sm text-[#6B7280]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC] relative overflow-hidden">
        <BlobBackground colors={{ blob1: 'rgba(255,255,255,0.1)', blob2: 'rgba(255,255,255,0.15)', blob3: 'rgba(255,255,255,0.1)' }} className="opacity-30" />
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Find Your Perfect Pet?</h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of happy pet owners and start your adoption journey today.
          </p>
          <Link href="/auth/signin">
            <GradientButton size="lg" className="bg-white text-[#6D9EEB] hover:bg-white/90">
              Get Started Now
            </GradientButton>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
