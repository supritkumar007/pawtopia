'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight, Search } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const articles = [
    {
      id: '1',
      title: 'Preparing Your Home for a New Pet',
      excerpt: 'Essential tips to prepare your home before bringing your new furry friend.',
      category: 'adoption',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      image: '/placeholder.svg?key=2uq53',
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'Understanding Pet Adoption Process',
      excerpt: 'A comprehensive guide to navigating the adoption process at Pawtopia.',
      category: 'adoption',
      author: 'Michael Chen',
      date: '2024-01-10',
      image: '/placeholder.svg?key=4l0rb',
      readTime: '7 min read',
    },
    {
      id: '3',
      title: 'Pet Health: 10 Essential Vaccinations',
      excerpt: 'Learn about the vaccinations your pet needs for optimal health.',
      category: 'health',
      author: 'Dr. Emily Watson',
      date: '2024-01-05',
      image: '/placeholder.svg?key=o3rp0',
      readTime: '6 min read',
    },
    {
      id: '4',
      title: 'Training Tips for New Pet Owners',
      excerpt: 'Effective strategies to train your new pet and build a strong bond.',
      category: 'training',
      author: 'James Miller',
      date: '2024-01-01',
      image: '/placeholder.svg?key=8k2q1',
      readTime: '8 min read',
    },
  ]

  const categories = ['all', 'adoption', 'health', 'training', 'stories']

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2A2D34] mb-4">Pawtopia Blog</h1>
            <p className="text-lg text-[#6B7280]">Tips, stories, and advice for pet lovers</p>
          </div>

          {/* Search */}
          <div className="glass-effect rounded-2xl p-4 shadow-soft mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6D9EEB]" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-12 pr-4 py-3 text-[#2A2D34] placeholder-[#6B7280] focus:outline-none"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#6D9EEB] to-[#5B8DD5] text-white'
                    : 'bg-white/50 text-[#2A2D34] hover:bg-white/70'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredArticles.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className="glass-effect rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all group animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#6D9EEB] text-white rounded-full text-xs font-bold capitalize">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#2A2D34] mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-[#6B7280] mb-4 pb-4 border-b border-white/40">
                      <span>{article.readTime}</span>
                      <span>{article.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#2A2D34]">By {article.author}</span>
                      <ArrowRight size={16} className="text-[#6D9EEB] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#6B7280]">No articles found. Try a different search.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
