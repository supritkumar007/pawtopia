import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientHeader } from '@/components/ui/gradient-header'

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GradientHeader
            title="Cookies Policy"
            subtitle="Last updated: November 16, 2025"
            className="mb-12"
          />
          
          <div className="prose prose-lg max-w-none bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-soft-lg">
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">1. What Are Cookies</h2>
            <p className="text-[#6B7280] mb-6">
              Cookies are small text files stored on your device when you visit websites. 
              They help websites remember your preferences and improve your browsing experience.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">2. How We Use Cookies</h2>
            <p className="text-[#6B7280] mb-6">
              We use cookies to authenticate users, remember your preferences, 
              analyze site usage, and improve our services.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">3. Types of Cookies We Use</h2>
            <h3 className="text-xl font-semibold text-[#2A2D34] mb-2">Essential Cookies</h3>
            <p className="text-[#6B7280] mb-4">
              These cookies are necessary for the website to function properly. 
              They enable core functionality such as user authentication and account security.
            </p>
            
            <h3 className="text-xl font-semibold text-[#2A2D34] mb-2">Performance Cookies</h3>
            <p className="text-[#6B7280] mb-4">
              These cookies help us understand how visitors interact with our website 
              by collecting and reporting information anonymously.
            </p>
            
            <h3 className="text-xl font-semibold text-[#2A2D34] mb-2">Functionality Cookies</h3>
            <p className="text-[#6B7280] mb-6">
              These cookies enable enhanced functionality and personalization, 
              such as remembering your preferences and settings.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">4. Managing Cookies</h2>
            <p className="text-[#6B7280] mb-6">
              You can control and/or delete cookies as you wish. 
              You can delete all cookies that are already on your device and 
              you can set most browsers to prevent them from being placed.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">5. Third-Party Cookies</h2>
            <p className="text-[#6B7280] mb-6">
              We may use third-party services that use cookies to collect information 
              about your online activities across different websites.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">6. Updates to This Policy</h2>
            <p className="text-[#6B7280] mb-6">
              We may update our Cookies Policy from time to time. 
              We will notify you of any changes by posting the new policy on this page.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}