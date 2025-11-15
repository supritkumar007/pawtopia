'use client'

import React, { useState } from 'react'
import { Heart, Gift, Zap, CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientButton } from '@/components/ui/gradient-button'

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time')
  const [selectedOption, setSelectedOption] = useState<'donation' | 'sponsor'>('donation')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const donationAmounts = [10, 25, 50, 100, 250, 500]

  const sponsorPets = [
    { id: '1', name: 'Luna', breed: 'Golden Retriever', monthlyAmount: 30 },
    { id: '2', name: 'Milo', breed: 'Tabby Cat', monthlyAmount: 15 },
    { id: '3', name: 'Max', breed: 'Husky Mix', monthlyAmount: 45 },
  ]

  const handleDonate = () => {
    setIsSubmitted(true)
    setTimeout(() => {
      alert('Thank you for your donation! 🎉')
      setIsSubmitted(false)
    }, 1500)
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2A2D34] mb-4">Support Our Mission</h1>
            <p className="text-lg text-[#6B7280]">Help us rescue, rehabilitate, and rehome animals in need</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { id: 'donation', title: 'Make a Donation', icon: Gift },
              { id: 'sponsor', title: 'Sponsor a Pet', icon: Heart },
            ].map(option => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id as any)}
                  className={`glass-effect rounded-2xl p-8 shadow-soft transition-all cursor-pointer ${
                    selectedOption === option.id
                      ? 'ring-2 ring-[#6D9EEB] scale-105'
                      : 'hover:shadow-soft-lg'
                  }`}
                >
                  <Icon size={32} className="text-[#6D9EEB] mb-4" />
                  <h3 className="text-xl font-bold text-[#2A2D34]">{option.title}</h3>
                  <p className="text-sm text-[#6B7280] mt-2">
                    {option.id === 'donation'
                      ? 'One-time or recurring gifts'
                      : 'Sponsor a pet\'s care'}
                  </p>
                </button>
              )
            })}
          </div>

          {selectedOption === 'donation' && (
            <div className="glass-effect rounded-2xl p-8 shadow-soft mb-12">
              <h2 className="text-2xl font-bold text-[#2A2D34] mb-6">Choose Your Impact</h2>

              {/* Donation Type */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-[#2A2D34] mb-3">Donation Type</label>
                <div className="flex gap-4">
                  {['one-time', 'monthly'].map(type => (
                    <button
                      key={type}
                      onClick={() => setDonationType(type as any)}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                        donationType === type
                          ? 'bg-[#6D9EEB] text-white'
                          : 'bg-white/50 text-[#2A2D34] hover:bg-white/70'
                      }`}
                    >
                      {type === 'one-time' ? 'One-Time' : 'Monthly'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-[#2A2D34] mb-3">Select Amount</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {donationAmounts.map(amount => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`py-3 px-4 rounded-lg font-bold transition-all ${
                        selectedAmount === amount
                          ? 'bg-gradient-to-r from-[#6D9EEB] to-[#5B8DD5] text-white scale-105'
                          : 'bg-white/50 text-[#2A2D34] hover:bg-white/70'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-white/40 rounded-lg focus:border-[#6D9EEB] focus:outline-none bg-white/50"
                />
              </div>

              {/* Summary */}
              <div className="mb-8 p-4 bg-[#6D9EEB]/10 rounded-lg">
                <p className="text-sm text-[#6B7280] mb-1">Total: {donationType === 'monthly' ? 'per month' : 'today'}</p>
                <p className="text-3xl font-bold text-[#6D9EEB]">₹{selectedAmount}</p>
              </div>

              <GradientButton size="lg" className="w-full" onClick={handleDonate} disabled={isSubmitted}>
                {isSubmitted ? 'Processing...' : 'Donate Now'}
              </GradientButton>
            </div>
          )}

          {selectedOption === 'sponsor' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#2A2D34]">Sponsor a Pet</h2>
              {sponsorPets.map(pet => (
                <div key={pet.id} className="glass-effect rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#2A2D34]">{pet.name}</h3>
                      <p className="text-[#6B7280]">{pet.breed}</p>
                      <p className="text-sm text-[#B3E5CC] font-medium mt-2 flex items-center gap-1">
                        <Zap size={16} />
                        ₹{pet.monthlyAmount}/month
                      </p>
                    </div>
                    <GradientButton onClick={handleDonate}>
                      <Heart size={20} className="mr-2" />
                      Sponsor
                    </GradientButton>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Impact Section */}
          <div className="mt-16 glass-effect rounded-2xl p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-8">Your Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { amount: '₹500', description: 'Provides food for 1 pet for a week' },
                { amount: '₹2500', description: 'Covers a pet\'s veterinary checkup' },
                { amount: '₹5000', description: 'Helps rescue and rehabilitate 1 pet' },
              ].map((impact, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC] flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold text-[#6D9EEB] mb-2">{impact.amount}</p>
                  <p className="text-sm text-[#6B7280]">{impact.description}</p>
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
