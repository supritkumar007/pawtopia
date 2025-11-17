'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Calendar, Stethoscope, FileText } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PetCarousel } from '@/components/ui/pet-carousel'
import { PetDetailsCard } from '@/components/ui/pet-details-card'
import { GlassCard } from '@/components/ui/glass-card'
import { BadgeTag } from '@/components/ui/badge-tag'
import { PetCard } from '@/components/ui/pet-card'
import { GradientHeader } from '@/components/ui/gradient-header'

interface PetData {
  id: string
  name: string
  breed: string
  type: string
  gender: string
  age: string
  size: string
  temperament: string[]
  vaccinated: boolean
  sterilized: boolean
  adoptionFee: number
  description: string
  images: string[]
  shelter: {
    name: string
    location: string
    phone: string
    email: string
  }
  medical: {
    vaccinated: boolean
    neutered: boolean
    microchipped: boolean
    lastCheckup: string
    medications: string
    vaccinations: string[]
  }
}

interface SimilarPet {
  id: string
  name: string
  breed: string
  age: string
  image: string
}

export default function PetDetailsPage() {
  const params = useParams()
  const petId = params.id as string
  const [petData, setPetData] = useState<PetData | null>(null)
  const [similarPets, setSimilarPets] = useState<SimilarPet[]>([])
  const [isFavorited, setIsFavorited] = useState(false)
  const [showAdoptionModal, setShowAdoptionModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch pet data from API
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/pets/${petId}`)
        if (!response.ok) {
          throw new Error('Pet not found')
        }

        const result = await response.json()
        if (result.success) {
          // Transform API data to match component expectations
          const apiPet = result.data
          const transformedPet = {
            id: apiPet._id,
            name: apiPet.name,
            breed: apiPet.breed,
            type: apiPet.type,
            gender: apiPet.gender,
            age: `${apiPet.ageYears} year${apiPet.ageYears !== 1 ? 's' : ''} ${apiPet.ageMonths} month${apiPet.ageMonths !== 1 ? 's' : ''}`,
            size: apiPet.size,
            temperament: apiPet.temperament || [],
            vaccinated: apiPet.vaccinated,
            sterilized: apiPet.sterilized,
            adoptionFee: apiPet.adoptionFee,
            description: apiPet.description,
            images: apiPet.images || [],
            shelter: {
              name: apiPet.shelterId?.name || 'Unknown Shelter',
              location: apiPet.shelterId?.address || 'Location not available',
              phone: apiPet.shelterId?.phone || 'Phone not available',
              email: apiPet.shelterId?.email || 'Email not available',
            },
            medical: {
              vaccinated: apiPet.vaccinated,
              neutered: apiPet.sterilized,
              microchipped: true, // Assuming all pets are microchipped
              lastCheckup: 'Recent checkup completed',
              medications: apiPet.medicalRecords?.length > 0 ? 'As prescribed' : 'None',
              vaccinations: ['DHPP', 'Rabies', 'Bordetella'], // Default vaccinations
            }
          }

          setPetData(transformedPet)
        } else {
          throw new Error(result.message || 'Failed to fetch pet data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching pet:', err)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchSimilarPets = async () => {
      try {
        const response = await fetch('/api/pets')
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data.length > 0) {
            // Get similar pets (same type, exclude current pet)
            const similar = result.data
              .filter(pet => pet._id !== petId && pet.type === petData?.type)
              .slice(0, 3)
              .map(pet => ({
                id: pet._id,
                name: pet.name,
                breed: pet.breed,
                age: `${pet.ageYears}`,
                image: pet.images?.[0] || '/placeholder.svg',
              }))
            setSimilarPets(similar)
          }
        }
      } catch (error) {
        console.error('Error fetching similar pets:', error)
      }
    }

    if (petId) {
      fetchPetData()
    }
  }, [petId])

  // Fetch similar pets when petData is available
  useEffect(() => {
    if (petData) {
      const fetchSimilarPets = async () => {
        try {
          const response = await fetch('/api/pets')
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.data.length > 0) {
              // Get similar pets (same type, exclude current pet)
              const similar = result.data
                .filter(pet => pet._id !== petId && pet.type === petData.type)
                .slice(0, 3)
                .map(pet => ({
                  id: pet._id,
                  name: pet.name,
                  breed: pet.breed,
                  age: `${pet.ageYears}`,
                  image: pet.images?.[0] || '/placeholder.svg',
                }))
              setSimilarPets(similar)
            }
          }
        } catch (error) {
          console.error('Error fetching similar pets:', error)
        }
      }
      fetchSimilarPets()
    }
  }, [petData, petId])

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D9EEB] mx-auto mb-4"></div>
            <p className="text-[#6B7280]">Loading pet details...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !petData) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#2A2D34] mb-4">Pet Not Found</h1>
            <p className="text-[#6B7280] mb-6">{error || 'The pet you\'re looking for doesn\'t exist.'}</p>
            <Link href="/browse">
              <button className="bg-[#6D9EEB] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#5B8DD5] transition-colors">
                Browse Pets
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF]">
        {/* Hero Section with Carousel */}
        <section className="relative pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 text-[#6D9EEB] hover:text-[#5B8DD5] mb-8 font-medium transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Browse
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Image Carousel */}
              <div className="lg:sticky lg:top-24">
                <PetCarousel images={petData.images} title={petData.name} />
              </div>

              {/* Pet Details */}
              <div>
                <PetDetailsCard
                  pet={petData}
                  isFavorited={isFavorited}
                  onFavorite={() => setIsFavorited(!isFavorited)}
                  onAdopt={() => setShowAdoptionModal(true)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Medical & Vaccination Records Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GlassCard className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Stethoscope size={24} className="text-[#6D9EEB]" />
                <h2 className="text-2xl font-bold text-[#2A2D34]">Medical & Vaccination Records</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-[#B3E5CC]/10 to-[#B3E5CC]/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-[#2A8659]" />
                    <span className="font-medium text-[#2A2D34]">Last Checkup</span>
                  </div>
                  <p className="text-[#6B7280]">{petData.medical.lastCheckup}</p>
                </div>

                <div className="bg-gradient-to-r from-[#6D9EEB]/10 to-[#6D9EEB]/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Stethoscope size={16} className="text-[#6D9EEB]" />
                    <span className="font-medium text-[#2A2D34]">Vaccinations</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {petData.medical.vaccinations.map((vaccine, index) => (
                      <BadgeTag key={index} variant="primary" size="sm">
                        {vaccine}
                      </BadgeTag>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#FFDEE2]/10 to-[#FFDEE2]/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={16} className="text-[#E86666]" />
                    <span className="font-medium text-[#2A2D34]">Medications</span>
                  </div>
                  <p className="text-[#6B7280]">{petData.medical.medications}</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Similar Pets Section */}
        <section className="py-12 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GradientHeader
              title="Similar Pets"
              subtitle="Other amazing pets looking for their forever homes"
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarPets.map((pet, index) => (
                <PetCard key={pet.id} {...pet} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Adoption Modal */}
      {showAdoptionModal && petData && (
        <AdoptionModal
          petName={petData.name}
          onClose={() => setShowAdoptionModal(false)}
        />
      )}
    </>
  )
}

// Simple adoption modal for now
function AdoptionModal({ petName, onClose }: { petName: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full glass-effect">
        <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">Adopt {petName}</h2>
        <p className="text-[#6B7280] mb-6">
          Thank you for your interest in adopting {petName}! Our team will contact you shortly to begin the adoption process.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-[#6D9EEB] text-white py-3 rounded-xl font-medium hover:bg-[#5B8DD5] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
