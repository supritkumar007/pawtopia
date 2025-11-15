'use client'

import React, { useState, useMemo } from 'react'
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

export default function PetDetailsPage() {
  const params = useParams()
  const petId = params.id as string
  const [isFavorited, setIsFavorited] = useState(false)
  const [showAdoptionModal, setShowAdoptionModal] = useState(false)

  // Mock pet database
  const petsDatabase = {
    '1': {
      id: '1',
      name: 'Luna',
      breed: 'Golden Retriever',
      type: 'Dog',
      gender: 'Female',
      age: '2 years 3 months',
      size: 'Large',
      temperament: ['Friendly', 'Energetic', 'Good with kids', 'Trained'],
      vaccinated: true,
      sterilized: true,
      adoptionFee: 15000,
      description: 'Luna is a sweet and energetic Golden Retriever who loves playing fetch and swimming. She\'s great with kids and other dogs, making her perfect for families. Luna has been trained and is ready for her forever home! She comes with all her vaccinations up to date and is microchipped for safety.',
      images: [
        '/golden-retriever-puppy.png',
        '/placeholder.svg?key=4l0rb',
        '/placeholder.svg?key=o3rp0',
      ],
      medical: {
        vaccinated: true,
        neutered: true,
        microchipped: true,
        lastCheckup: 'January 15, 2024',
        medications: 'None',
        vaccinations: ['DHPP', 'Rabies', 'Bordetella', 'Leptospirosis'],
      },
      shelter: {
        name: 'Happy Paws Shelter',
        location: 'Mumbai, Maharashtra',
        phone: '+91 98765 43210',
        email: 'contact@happypaws.org',
      },
    },
    '2': {
      id: '2',
      name: 'Milo',
      breed: 'Tabby Cat',
      type: 'Cat',
      gender: 'Male',
      age: '1 year 2 months',
      size: 'Small',
      temperament: ['Playful', 'Affectionate', 'Indoor cat', 'Loves cuddles'],
      vaccinated: true,
      sterilized: true,
      adoptionFee: 8000,
      description: 'Milo is a charming Tabby cat with beautiful markings and a personality that will steal your heart. He\'s very affectionate and loves to cuddle, making him the perfect companion for someone looking for a loving feline friend.',
      images: [
        '/cute-tabby-cat.png',
        '/placeholder.svg?key=4l0rb',
        '/placeholder.svg?key=o3rp0',
      ],
      medical: {
        vaccinated: true,
        neutered: true,
        microchipped: true,
        lastCheckup: 'February 10, 2024',
        medications: 'None',
        vaccinations: ['FVRCP', 'Rabies', 'FeLV'],
      },
      shelter: {
        name: 'Feline Friends Shelter',
        location: 'Delhi, Delhi',
        phone: '+91 87654 32109',
        email: 'info@felinefriends.org',
      },
    },
    '3': {
      id: '3',
      name: 'Max',
      breed: 'Husky Mix',
      type: 'Dog',
      gender: 'Male',
      age: '3 years 1 month',
      size: 'Large',
      temperament: ['Energetic', 'Loyal', 'Needs exercise', 'Great with families'],
      vaccinated: true,
      sterilized: true,
      adoptionFee: 12000,
      description: 'Max is a beautiful Husky mix with striking blue eyes and a thick, fluffy coat. He\'s very energetic and needs an active family who can provide him with plenty of exercise and mental stimulation. Max is loyal, loving, and great with children.',
      images: [
        '/husky-dog-smiling.jpg',
        '/placeholder.svg?key=4l0rb',
        '/placeholder.svg?key=o3rp0',
      ],
      medical: {
        vaccinated: true,
        neutered: true,
        microchipped: true,
        lastCheckup: 'December 20, 2023',
        medications: 'None',
        vaccinations: ['DHPP', 'Rabies', 'Bordetella', 'Leptospirosis'],
      },
      shelter: {
        name: 'Northern Lights Animal Rescue',
        location: 'Bangalore, Karnataka',
        phone: '+91 76543 21098',
        email: 'adopt@northernlightsrescue.org',
      },
    },
  }

  // Get pet data based on ID
  const petData = useMemo(() => {
    return petsDatabase[petId as keyof typeof petsDatabase] || petsDatabase['1']
  }, [petId])

  // Get similar pets (exclude current pet)
  const similarPets = useMemo(() => {
    const allPets = Object.values(petsDatabase)
    return allPets
      .filter(pet => pet.id !== petId)
      .slice(0, 3)
      .map(pet => ({
        id: pet.id,
        name: pet.name,
        breed: pet.breed,
        age: pet.age.split(' ')[0], // Just the number
        image: pet.images[0],
      }))
  }, [petId])

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
      {showAdoptionModal && (
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
