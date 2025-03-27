"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, DollarSign, ArrowRight, Sparkles } from "lucide-react"

interface EventFormProps {
  onSubmit: (formData: any) => void
  selectedKeywords: string[]
}

export default function EventForm({ onSubmit, selectedKeywords }: EventFormProps) {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventLocation: "",
    expectedAttendees: "",
    eventScale: "Local",
    eventAccess: "Public",
    ticketType: "Free Entry",
    budget: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, selectedKeywords })
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="bg-[#232342] rounded-2xl p-8 shadow-xl mb-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#DFFF60] opacity-5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#DFFF60] opacity-5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <h2 className="text-3xl font-horizon font-bold mb-8 text-center relative text-white">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Event Details
        </motion.span>
        <motion.div
          className="absolute -top-6 -right-6 text-[#DFFF60]"
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
      </h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-8"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Event Details */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xl font-horizon font-semibold text-[#DFFF60]">Basic Event Details</h3>

            <div className="space-y-2">
              <label className="block text-zinc-300 font-montserrat">Event Name</label>
              <div className="relative">
                <motion.input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a2e] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#DFFF60] focus:border-transparent font-montserrat"
                  placeholder="Enter event name"
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(223, 255, 96, 0.3)" }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-zinc-300 font-montserrat">Event Date</label>
              <div className="relative">
                <motion.input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a2e] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#DFFF60] focus:border-transparent font-montserrat"
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(223, 255, 96, 0.3)" }}
                />
                <Calendar className="absolute right-3 top-3 text-zinc-500" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-zinc-300 font-montserrat">Event Location</label>
              <div className="relative">
                <motion.input
                  type="text"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a2e] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#DFFF60] focus:border-transparent font-montserrat"
                  placeholder="Enter location"
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(223, 255, 96, 0.3)" }}
                />
                <MapPin className="absolute right-3 top-3 text-zinc-500" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-zinc-300 font-montserrat">Expected Attendees</label>
              <div className="relative">
                <motion.input
                  type="number"
                  name="expectedAttendees"
                  value={formData.expectedAttendees}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a2e] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#DFFF60] focus:border-transparent font-montserrat"
                  placeholder="Number of attendees"
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(223, 255, 96, 0.3)" }}
                />
                <Users className="absolute right-3 top-3 text-zinc-500" size={20} />
              </div>
            </div>
          </motion.div>

          {/* Event Scale & Budget */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xl font-horizon font-semibold text-[#DFFF60]">Event Scale & Budget</h3>

            <div className="space-y-2">
              <label className="block text-zinc-300 font-montserrat">Event Scale</label>
              <motion.select
                name="eventScale"
                value={formData.eventScale}
                onChange={handleChange}
                className="w-full bg-[#1a1a2e] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#DFFF60] focus:border-transparent font-montserrat"
                whileFocus={{ boxShadow: "0 0 0 2px rgba(223, 255, 96, 0.3)" }}
              >
                <option value="Local">Local</option>
                <option value="Regional">Regional</option>
                <option value="National">National</option>
                <option value="International">International</option>
              </motion.select>
            </div>

            <div className="space-y-2">
              <label className="block text-zinc-300 font-montserrat">Event Access</label>
              <motion.select
                name="eventAccess"
                value={formData.eventAccess}
                onChange={handleChange}
                className="w-full bg-[#1a1a2e] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#DFFF60] focus:border-transparent font-montserrat"
                whileFocus={{ boxShadow: "0 0 0 2px rgba(223, 255, 96, 0.3)" }}
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Invite Only">Invite Only</option>
              </motion.select>
            </div>

            <div className="space-y-2">
              <label className="block text-zinc-300 font-montserrat">Ticket Type</label>
              <motion.select
                name="ticketType"
                value={formData.ticketType}
                onChange={handleChange}
                className="w-full bg-[#1a1a2e] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#DFFF60] focus:border-transparent font-montserrat"
                whileFocus={{ boxShadow: "0 0 0 2px rgba(223, 255, 96, 0.3)" }}
              >
                <option value="Free Entry">Free Entry</option>
                <option value="Paid Tickets">Paid Tickets</option>
                <option value="Donation Based">Donation Based</option>
              </motion.select>
            </div>

            <div className="space-y-2">
              <label className="block text-zinc-300 font-montserrat">Estimated Budget</label>
              <div className="relative">
                <motion.input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a2e] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#DFFF60] focus:border-transparent pl-10 font-montserrat"
                  placeholder="Enter budget amount"
                  whileFocus={{ boxShadow: "0 0 0 2px rgba(223, 255, 96, 0.3)" }}
                />
                <DollarSign className="absolute left-3 top-3 text-zinc-500" size={20} />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="pt-4 flex justify-center" variants={itemVariants}>
          <motion.button
            type="submit"
            className="bg-[#DFFF60] text-[#1a1a2e] px-8 py-3 rounded-full font-bold font-montserrat flex items-center gap-2 transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(223, 255, 96, 0.4)",
              backgroundColor: "#EEFF9D",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Departments <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  )
}

