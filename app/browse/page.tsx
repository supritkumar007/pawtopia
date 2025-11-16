'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Search, MapPin, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'
import { PetCard } from '@/components/ui/pet-card'
import { FilterChip } from '@/components/ui/filter-chip'
import { PetCardSkeleton } from '@/components/ui/skeleton-loader'
import { EmptyState } from '@/components/ui/empty-state'
import { FilterSidebar } from '@/components/pet/filter-sidebar'

interface Pet {
  _id: string
  name: string
  type: string
  breed: string
  ageYears: number
  ageMonths: number
  gender: string
  size: string
  vaccinated: boolean
  sterilized: boolean
  description: string
  adoptionFee: number
  images: string[]
  status: string
  createdAt: string
}

export default function BrowsePetsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({})
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [allPets, setAllPets] = useState<Pet[]>([])
  const [error, setError] = useState<string | null>(null)

  // Fetch pets from API
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/pets')
        if (!response.ok) {
          throw new Error('Failed to fetch pets')
        }
        const data = await response.json()
        if (data.success) {
          setAllPets(data.data)
        } else {
          throw new Error(data.message || 'Failed to fetch pets')
        }
      } catch (err) {
        console.error('Error fetching pets:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch pets')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPets()
  }, [])

  const itemsPerPage = 12

  // Filter and sort pets
  const filteredPets = useMemo(() => {
    let result = allPets

    // Search filter
    if (searchQuery) {
      result = result.filter(pet =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filters
    if (selectedFilters.species?.length > 0) {
      result = result.filter(pet => selectedFilters.species.includes(pet.type))
    }
    if (selectedFilters.size?.length > 0) {
      result = result.filter(pet => selectedFilters.size.includes(pet.size))
    }
    if (selectedFilters.vaccination?.length > 0) {
      const includesVaccinated = selectedFilters.vaccination.includes('Vaccinated')
      const includesNotVaccinated = selectedFilters.vaccination.includes('Not Vaccinated')
      result = result.filter(pet => {
        if (includesVaccinated && pet.vaccinated) return true
        if (includesNotVaccinated && !pet.vaccinated) return true
        return false
      })
    }

    // Sort
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name))
    }

    return result
  }, [searchQuery, selectedFilters, sortBy, allPets])

  const paginatedPets = filteredPets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredPets.length / itemsPerPage)

  const handleFavorite = (id: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0)
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#2A2D34] mb-2">Browse Pets</h1>
            <p className="text-[#6B7280]">Find your perfect companion from our collection of {filteredPets.length} amazing pets</p>
          </div>

          {/* Search & Controls */}
          <div className="space-y-4 mb-8">
            <div className="glass-effect rounded-2xl p-4 shadow-soft flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6D9EEB]" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or breed..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full bg-transparent pl-12 pr-4 py-2 text-[#2A2D34] placeholder-[#6B7280] focus:outline-none"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setCurrentPage(1)
                }}
                className="px-4 py-2 bg-white/50 text-[#2A2D34] rounded-lg border border-transparent hover:border-[#6D9EEB] focus:outline-none focus:border-[#6D9EEB] transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
              </select>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-4 py-2 bg-[#6D9EEB] text-white rounded-lg hover:bg-[#5B8DD5] transition-colors flex items-center gap-2 font-medium relative"
              >
                <Filter size={20} />
                {getActiveFilterCount() > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FFDEE2] text-[#E86666] rounded-full flex items-center justify-center text-xs font-bold">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Active Filters */}
            {getActiveFilterCount() > 0 && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(selectedFilters).map(([key, values]) =>
                  Array.isArray(values) && values.map(value => (
                    <FilterChip
                      key={`${key}-${value}`}
                      label={value}
                      onRemove={() => {
                        setSelectedFilters(prev => ({
                          ...prev,
                          [key]: prev[key].filter((v: string) => v !== value)
                        }))
                        setCurrentPage(1)
                      }}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filter */}
            {isFilterOpen && (
              <div className="lg:col-span-1 lg:block">
                <div className="sticky top-20">
                  <FilterSidebar
                    selectedFilters={selectedFilters}
                    onFilterChange={(filters) => {
                      setSelectedFilters(filters)
                      setCurrentPage(1)
                    }}
                  />
                </div>
              </div>
            )}

            {/* Pet Grid */}
            <div className={isFilterOpen ? 'lg:col-span-3' : 'lg:col-span-4'}>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <PetCardSkeleton key={i} />
                  ))}
                </div>
              ) : paginatedPets.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {paginatedPets.map((pet, index) => (
                      <div key={pet._id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
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
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-white/50 text-[#6D9EEB] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/70 transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <div className="flex gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 rounded-lg font-medium transition-all ${
                              currentPage === i + 1
                                ? 'bg-gradient-to-r from-[#6D9EEB] to-[#5B8DD5] text-white'
                                : 'bg-white/50 text-[#2A2D34] hover:bg-white/70'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-white/50 text-[#6D9EEB] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/70 transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <EmptyState
                  title="No Pets Found"
                  description="Try adjusting your filters or search terms to find your perfect pet"
                  action={
                    <GradientButton
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedFilters({})
                        setCurrentPage(1)
                      }}
                    >
                      Clear Filters
                    </GradientButton>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
