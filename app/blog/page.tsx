'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight, Search } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'

interface BlogData {
  _id: string
  title: string
  content: string
  author: { name: string }
  category: string
  images: string[]
  tags: string[]
  published: boolean
  createdAt: string
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [articles, setArticles] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/blogs')
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }

        const result = await response.json()
        if (result.success) {
          // Transform API data to match component expectations
          const transformedArticles = result.data.map((blog: BlogData) => ({
            id: blog._id,
            title: blog.title,
            excerpt: blog.content.substring(0, 150) + '...', // First 150 chars as excerpt
            category: blog.category.toLowerCase(),
            author: blog.author?.name || 'Anonymous',
            date: new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            image: blog.images?.[0] || '/placeholder.svg',
            readTime: `${Math.ceil(blog.content.split(' ').length / 200)} min read`, // Estimate read time
          }))

          setArticles(transformedArticles)
        } else {
          throw new Error(result.message || 'Failed to fetch blogs')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching blogs:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D9EEB] mx-auto mb-4"></div>
            <p className="text-[#6B7280]">Loading blog articles...</p>
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
            <h1 className="text-2xl font-bold text-[#2A2D34] mb-4">Error Loading Blogs</h1>
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
