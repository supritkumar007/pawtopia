import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientHeader } from '@/components/ui/gradient-header'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GradientHeader
            title="Privacy Policy"
            subtitle="Last updated: November 16, 2025"
            className="mb-12"
          />
          
          <div className="prose prose-lg max-w-none bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-soft-lg">
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">1. Information We Collect</h2>
            <p className="text-[#6B7280] mb-6">
              We collect information you provide directly to us, including your name, email address, 
              phone number, location, and preferences when you register for an account or fill out forms.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">2. How We Use Your Information</h2>
            <p className="text-[#6B7280] mb-6">
              We use the information we collect to provide, maintain, and improve our services, 
              to process adoption applications, to communicate with you, and to personalize your experience.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">3. Information Sharing</h2>
            <p className="text-[#6B7280] mb-6">
              We do not sell, trade, or otherwise transfer your personal information to outside parties 
              without your consent, except as necessary to provide our services or as required by law.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">4. Data Security</h2>
            <p className="text-[#6B7280] mb-6">
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the Internet is 100% secure.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">5. Cookies and Tracking</h2>
            <p className="text-[#6B7280] mb-6">
              We use cookies and similar tracking technologies to enhance your experience and 
              analyze usage patterns. You can control cookies through your browser settings.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">6. Data Retention</h2>
            <p className="text-[#6B7280] mb-6">
              We retain your information for as long as necessary to provide our services and 
              comply with legal obligations.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">7. Your Rights</h2>
            <p className="text-[#6B7280] mb-6">
              You have the right to access, update, or delete your personal information. 
              Contact us if you wish to exercise these rights.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">8. Changes to Privacy Policy</h2>
            <p className="text-[#6B7280] mb-6">
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}