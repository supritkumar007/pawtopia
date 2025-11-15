import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Users, Heart } from 'lucide-react'
import { GradientButton } from './gradient-button'

interface ShelterCardProps {
  id: string
  name: string
  location: string
  phone: string
  email: string
  petCount: number
  image: string
  rating?: number
}

export function ShelterCard({
  id,
  name,
  location,
  phone,
  email,
  petCount,
  image,
  rating = 4.8,
}: ShelterCardProps) {
  return (
    <div className="glass-effect rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all group">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 px-3 py-1 bg-[#FFDEE2]/90 text-[#E86666] rounded-full text-sm font-bold">
          {rating}★
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-[#2A2D34] mb-2">{name}</h3>

        <div className="space-y-2 mb-4 text-sm text-[#6B7280]">
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-[#6D9EEB]" />
            {location}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} className="text-[#6D9EEB]" />
            {phone}
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} className="text-[#6D9EEB]" />
            {email}
          </p>
          <p className="flex items-center gap-2 text-[#B3E5CC]">
            <Users size={16} />
            {petCount} pets available
          </p>
        </div>

        <Link href={`/shelters/${id}`} className="w-full block">
          <GradientButton variant="secondary" size="sm" className="w-full">
            View Details
          </GradientButton>
        </Link>
      </div>
    </div>
  )
}
