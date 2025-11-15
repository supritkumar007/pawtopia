'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Filter, Download, Share2 } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'
import { FavoritesGrid } from '@/components/ui/favorites-grid'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientHeader } from '@/components/ui/gradient-header'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([
    { id: '1', name: 'Luna', breed: 'Golden Retriever', age: '2', image: '/golden-retriever-puppy.png' },
    { id: '2', name: 'Milo', breed: 'Tabby Cat', age: '1', image: '/cute-tabby-cat.png' },
    { id: '3', name: 'Max', breed: 'Husky Mix', age: '3', image: '/husky-dog-smiling.jpg' },
  ])

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(pet => pet.id !== id))
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <GradientHeader
              title="My Favorites"
              subtitle={`${favorites.length} pet${favorites.length !== 1 ? 's' : ''} saved`}
            />
            <div className="flex gap-3">
              <GlassCard className="p-4">
                <button className="flex items-center gap-2 text-[#6D9EEB] hover:text-[#5B8DD5] transition-colors font-medium">
                  <Download size={20} />
                  Export
                </button>
              </GlassCard>
              <GradientButton size="lg" className="flex items-center gap-2">
                <Share2 size={20} />
                Share
              </GradientButton>
            </div>
          </div>

          {/* Favorites Grid */}
          <FavoritesGrid
            favorites={favorites}
            onRemoveFavorite={handleRemoveFavorite}
            className="mb-12"
          />

          {/* Next Steps */}
          {favorites.length > 0 && (
            <GlassCard className="text-center">
              <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">Next Steps</h2>
              <p className="text-[#6B7280] mb-6 max-w-2xl mx-auto">
                Love one of these pets? Start the adoption application process to begin your journey!
              </p>
              <Link href="/browse">
                <GradientButton size="lg">Browse More Pets</GradientButton>
              </Link>
            </GlassCard>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
