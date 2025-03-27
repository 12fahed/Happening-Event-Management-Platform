"use client"

import Link from "next/link"
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#252736] mt-20 py-12 border-t border-[#3a3c4a]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-[#d1ff32] font-horizon text-xl mb-4">ABOUT US</h3>
            <p className="text-gray-300 font-montserrat text-sm mb-4">
              EventX is the ultimate platform for discovering and booking the hottest events in your area. From concerts
              to conferences, we've got you covered.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-8 h-8 bg-[#1c1e2a] rounded-full flex items-center justify-center hover:bg-[#8a5cf6] transition-colors duration-300"
                >
                  <Icon className="w-4 h-4 text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-[#d1ff32] font-horizon text-xl mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              {["Home", "Events", "Schedule", "Venue", "Contact Us", "FAQ"].map((link, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-gray-300 font-montserrat text-sm hover:text-[#d1ff32] transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">→</span> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-[#d1ff32] font-horizon text-xl mb-4">CONTACT US</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[#8a5cf6] mr-2 mt-0.5" />
                <span className="text-gray-300 font-montserrat text-sm">123 Event Street, City Center, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-[#8a5cf6] mr-2" />
                <span className="text-gray-300 font-montserrat text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-[#8a5cf6] mr-2" />
                <span className="text-gray-300 font-montserrat text-sm">info@eventx.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-[#d1ff32] font-horizon text-xl mb-4">NEWSLETTER</h3>
            <p className="text-gray-300 font-montserrat text-sm mb-4">
              Subscribe to our newsletter for the latest updates on events and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-[#1c1e2a] text-white px-4 py-2 rounded-l-full outline-none w-full font-montserrat text-sm"
              />
              <button className="bg-[#d1ff32] text-black px-4 py-2 rounded-r-full font-horizon hover:bg-[#e2ff6a] transition-colors duration-300">
                SEND
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#3a3c4a] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 font-montserrat text-sm mb-4 md:mb-0">© 2025 EventX. All rights reserved.</p>
          <div className="flex space-x-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <Link
                key={index}
                href="#"
                className="text-gray-400 font-montserrat text-sm hover:text-[#d1ff32] transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

