'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Users, Clock, Ticket } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const events = [
    {
      id: '1',
      title: 'Monthly Adoption Event',
      date: 'January 27, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Happy Paws Shelter, San Francisco',
      description: 'Join us for our monthly adoption event featuring hundreds of pets looking for homes. Meet our staff, learn about the adoption process, and find your perfect companion!',
      attendees: 342,
      image: '/placeholder.svg?key=2uq53',
      isFree: true,
    },
    {
      id: '2',
      title: 'Pet Training Workshop',
      date: 'February 3, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'Community Center, Downtown',
      description: 'Learn effective training techniques from professional trainers. This workshop covers basic obedience, behavioral issues, and building a strong bond with your pet.',
      attendees: 128,
      image: '/placeholder.svg?key=4l0rb',
      isFree: false,
      ticketPrice: '₹1250',
    },
    {
      id: '3',
      title: 'Pet Health Fair',
      date: 'February 10, 2024',
      time: '9:00 AM - 2:00 PM',
      location: 'Central Park',
      description: 'Free health screenings, vaccinations, and consultations with veterinarians. Bring your pets for a day of fun activities and health services.',
      attendees: 567,
      image: '/placeholder.svg?key=o3rp0',
      isFree: true,
    },
    {
      id: '4',
      title: 'Adoption Success Stories',
      date: 'February 15, 2024',
      time: '6:00 PM - 8:00 PM',
      location: 'Pawtopia Community Hall',
      description: 'Hear inspiring stories from pet owners who found their perfect companions through Pawtopia. A celebration of second chances and happy endings.',
      attendees: 89,
      image: '/placeholder.svg?key=8k2q1',
      isFree: true,
    },
  ]

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2A2D34] mb-4">Upcoming Events</h1>
            <p className="text-lg text-[#6B7280]">Join us for adoption events, workshops, and community gatherings</p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="glass-effect rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all animate-slide-up group cursor-pointer"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedEvent(event.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  {event.isFree && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-[#B3E5CC] text-[#2A8659] rounded-full text-xs font-bold">
                      FREE
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2A2D34] mb-3">{event.title}</h3>

                  <div className="space-y-2 mb-4 text-sm text-[#6B7280]">
                    <p className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#6D9EEB]" />
                      {event.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={16} className="text-[#6D9EEB]" />
                      {event.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#6D9EEB]" />
                      {event.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users size={16} className="text-[#6D9EEB]" />
                      {event.attendees} people interested
                    </p>
                  </div>

                  <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{event.description}</p>

                  <div className="flex gap-3">
                    <GradientButton size="sm" className="flex-1">
                      Learn More
                    </GradientButton>
                    {!event.isFree && (
                      <button className="flex-1 px-4 py-2 bg-[#F8E8A6]/20 text-[#B8860B] rounded-lg hover:bg-[#F8E8A6]/30 transition-colors font-medium text-sm flex items-center justify-center gap-2">
                        <Ticket size={16} />
                        {event.ticketPrice}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="glass-effect rounded-2xl p-8 text-center shadow-soft">
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">Have an Event Idea?</h2>
            <p className="text-[#6B7280] mb-6">Help us organize community events to connect pet lovers!</p>
            <GradientButton size="lg">Suggest an Event</GradientButton>
          </div>
        </div>
      </main>

      <Footer />

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={events.find(e => e.id === selectedEvent)!}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  )
}

function EventDetailModal({ event, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full glass-effect shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-[#2A2D34] flex-1">{event.title}</h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#2A2D34] transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="relative h-48 rounded-xl overflow-hidden mb-6">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4 mb-8">
          <p className="flex items-center gap-3 text-[#6B7280]">
            <Calendar className="text-[#6D9EEB]" />
            <span>{event.date}</span>
          </p>
          <p className="flex items-center gap-3 text-[#6B7280]">
            <Clock className="text-[#6D9EEB]" />
            <span>{event.time}</span>
          </p>
          <p className="flex items-center gap-3 text-[#6B7280]">
            <MapPin className="text-[#6D9EEB]" />
            <span>{event.location}</span>
          </p>
          <p className="flex items-center gap-3 text-[#6B7280]">
            <Users className="text-[#6D9EEB]" />
            <span>{event.attendees} people interested</span>
          </p>
        </div>

        <p className="text-[#6B7280] leading-relaxed mb-8">{event.description}</p>

        <div className="flex gap-3">
          <GradientButton size="lg" className="flex-1">
            Register Now
          </GradientButton>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-white/50 text-[#2A2D34] rounded-xl hover:bg-white/70 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
