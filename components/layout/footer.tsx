import React from 'react'
import Link from 'next/link'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-[#FDFCFD] to-[#F0EBFF] paw-pattern border-t border-white/40 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC] bg-clip-text text-transparent mb-2">
              Pawtopia
            </h3>
            <p className="text-sm text-[#6B7280]">
              Connecting loving homes with amazing pets.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-[#2A2D34] mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li><Link href="/browse" className="hover:text-[#6D9EEB] transition-colors">Browse Pets</Link></li>
              <li><Link href="/shelters" className="hover:text-[#6D9EEB] transition-colors">Shelters</Link></li>
              <li><Link href="/blog" className="hover:text-[#6D9EEB] transition-colors">Blog</Link></li>
              <li><Link href="/lost-and-found" className="hover:text-[#6D9EEB] transition-colors">Lost & Found</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#2A2D34] mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#6D9EEB]" />
                <a href="mailto:pawtopia@gmail.com" className="hover:text-[#6D9EEB] transition-colors">
                  pawtopia@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#6D9EEB]" />
                <a href="tel:7624804287" className="hover:text-[#6D9EEB] transition-colors">
                  7624804287
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-[#6D9EEB]" />
                <span>123 Pet Street, City</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-[#2A2D34] mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6D9EEB] to-[#B3E5CC] flex items-center justify-center text-white hover:shadow-soft transition-all hover:scale-110"
                >
                  <span className="text-xs font-bold">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/40 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#6B7280] flex items-center gap-2 mb-4 md:mb-0">
            <Heart size={16} className="text-[#FFDEE2]" fill="#FFDEE2" />
            Made with love for pet lovers © {currentYear} Pawtopia
          </p>
          <div className="flex gap-4 text-sm text-[#6B7280]">
            <Link href="/privacy" className="hover:text-[#6D9EEB] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#6D9EEB] transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-[#6D9EEB] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
