"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import Footer from "@/components/footer"
import Image from "next/image"

export default function LandingPage() {
  const [hours, setHours] = useState(23)
  const [minutes, setMinutes] = useState(4)
  const [seconds, setSeconds] = useState(47)

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          if (hours > 0) {
            setHours(hours - 1)
            setMinutes(59)
            setSeconds(59)
          } else {
            // Reset timer when it reaches 0
            setHours(23)
            setMinutes(4)
            setSeconds(47)
          }
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [hours, minutes, seconds])

  // Generate random QR code data
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EVENTX-${Math.random().toString(36).substring(2, 8)}`

  return (
    <div className="min-h-screen bg-[#1c1e2a] text-white overflow-hidden">
      {/* Header */}
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="text-[#d1ff32] text-2xl font-horizon hover:scale-110 transition-transform duration-300 cursor-pointer">
          HAPPENIN<span className="text-[#8a5cf6]">G</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          {["HOME", "EVENTS", "SCHEDULE", "VENUE"].map((item, index) => (
            <Link
              key={index}
              href="#"
              className="text-white hover:text-[#d1ff32] font-montserrat text-sm tracking-wider relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d1ff32] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            href="#"
            className="text-white hover:text-[#d1ff32] font-montserrat text-sm tracking-wider relative group"
          >
            CONTACT US
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d1ff32] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <div className="w-8 h-8 bg-[#8a5cf6] rounded-full flex items-center justify-center hover:bg-[#9d74f7] transition-colors duration-300 cursor-pointer">
            <span className="text-white">G</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-horizon mb-4 hover:text-[#d1ff32] transition-colors duration-300">
            BOOK{" "}
            <span className="inline-block align-middle mx-2 animate-pulse">
              <Image 
                src="/img1.png" 
                alt="Ticket" 
                width={80} 
                height={80} 
                className="inline-block" 
              />
            </span>{" "}
            AND EXPLORE
          </h1>
          <h2 className="text-5xl md:text-6xl font-horizon hover:text-[#d1ff32] transition-colors duration-300">
            UPCOMING{" "}
            <span className="inline-block align-middle mx-2 animate-bounce">
              <Image src="/img2.png" alt="Arrow" width={80} height={80} className="inline-block" />
            </span>{" "}
            EVENTS
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="bg-[#252736] rounded-xl p-6 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-[#d1ff32] text-xl font-horizon mb-4 animate-pulse">SPONSOR</h3>
                <div className="space-y-3 text-xl">
                  {["indeed", "skyione", "OPTIMUS", "LASERITE"].map((sponsor, index) => (
                    <div
                      key={index}
                      className="text-gray-400 font-montserrat hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {sponsor}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center relative">
                <div className="animate-spin-slow absolute">
                  <Image src="/img4.png" alt="Play Button Outer" width={150} height={150} />
                </div>
                <div className="absolute">
                  <Image src="/img5.png" alt="Play Button Inner" width={100} height={100} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-[#252736] rounded-xl p-6 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="mb-6">
              <p className="text-sm font-montserrat mb-6">
                Welcome to HAPPENING, the ultimate destination for making your dream event come true.
              </p>

              {/* Countdown Timer */}
              <div className="flex justify-between mb-8">
                <div className="text-center">
                  <div className="text-4xl font-horizon">{hours.toString().padStart(2, "0")}</div>
                  <div className="text-xs text-gray-400 font-montserrat">HOURS</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent mx-2"></div>
                <div className="text-center">
                  <div className="text-4xl font-horizon">{minutes.toString().padStart(2, "0")}</div>
                  <div className="text-xs text-gray-400 font-montserrat">MINUTE</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent mx-2"></div>
                <div className="text-center">
                  <div className="text-4xl font-horizon">{seconds.toString().padStart(2, "0")}</div>
                  <div className="text-xs text-gray-400 font-montserrat">SECOND</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg hover:rotate-3 transition-transform duration-300">
                    <Image src={qrCodeUrl} alt="QR Code" width={60} height={60} />
                  </div>
                  <div className="text-xs ml-2 font-montserrat">
                    <div className="animate-pulse">GET YOURS!</div>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button className="w-full bg-[#d1ff32] text-black py-3 px-6 rounded-full flex items-center justify-between hover:bg-[#e2ff6a] transition-colors duration-300 group">
                <span className="font-horizon">Make Your Event come True</span>
                <div className="w-8 h-8 bg-[#8a5cf6] rounded-full flex items-center justify-center group-hover:bg-[#9d74f7] transition-colors duration-300">
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Ticket Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="transform hover:translate-y-[-5px] transition-transform duration-300">
            <h2 className="text-4xl font-horizon mb-4 animate-glow">
              DECIDE TO JOIN
              <br />
              THE EVENT
            </h2>
            <p className="text-sm text-gray-300 mb-6 font-montserrat">
              Once you've found an event you're interested in, you can view all the details and information you need,
              including the event date, time, location, lineup, speakers, and agenda.
            </p>
            <button className="bg-[#8a5cf6] text-white py-3 px-8 rounded-full flex items-center hover:bg-[#9d74f7] transition-colors duration-300 group">
              <span className="font-horizon mr-2">GET TICKET</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/img3.png"
              alt="Neon Ticket"
              width={300}
              height={300}
              className="transform rotate-12 hover:rotate-0 transition-transform duration-500 animate-float"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}