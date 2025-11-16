import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GradientHeader } from '@/components/ui/gradient-header'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#FDFCFD] to-[#F9F7FF] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GradientHeader
            title="Terms of Service"
            subtitle="Last updated: November 16, 2025"
            className="mb-12"
          />
          
          <div className="prose prose-lg max-w-none bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-soft-lg">
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">1. Acceptance of Terms</h2>
            <p className="text-[#6B7280] mb-6">
              By accessing or using Pawtopia ("the Service"), you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you may not access the Service.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">2. Description of Service</h2>
            <p className="text-[#6B7280] mb-6">
              Pawtopia is a pet adoption platform that connects animal lovers with shelters and rescue organizations. 
              Our service facilitates the process of finding and adopting pets, but we are not responsible for the 
              actions of shelters, pet owners, or adopters.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">3. User Accounts</h2>
            <p className="text-[#6B7280] mb-6">
              When you create an account with us, you must provide accurate and complete information. 
              You are responsible for maintaining the confidentiality of your account and password.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">4. Adoption Process</h2>
            <p className="text-[#6B7280] mb-6">
              All adoptions are subject to the policies of the individual shelters or rescue organizations. 
              Pawtopia does not guarantee any adoption and is not responsible for the health, behavior, 
              or well-being of any animals.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">5. User Responsibilities</h2>
            <p className="text-[#6B7280] mb-6">
              Users agree to use the service only for lawful purposes and in a way that does not infringe 
              the rights of others or restrict their use of the service.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">6. Limitation of Liability</h2>
            <p className="text-[#6B7280] mb-6">
              Pawtopia shall not be liable for any direct, indirect, incidental, special, or consequential 
              damages resulting from the use of or inability to use the service.
            </p>
            
            <h2 className="text-2xl font-bold text-[#2A2D34] mb-4">7. Changes to Terms</h2>
            <p className="text-[#6B7280] mb-6">
              We reserve the right to modify or replace these terms at any time. 
              Continued use of the service after any such changes constitutes acceptance of the new terms.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}