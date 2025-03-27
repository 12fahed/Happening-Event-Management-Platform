"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Star, Clock, Users, MapPin, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

// Department data with enhanced details for the detailed view
const departmentDetails = {
  Marketing: {
    icon: "marketing",
    description: "Promotion, advertising, and audience engagement strategies for your event",
    tasks: [
      { name: "Create promotional materials", status: "completed", dueDate: "8 weeks before event" },
      { name: "Manage social media campaigns", status: "in-progress", dueDate: "6 weeks before event" },
      { name: "Coordinate with influencers", status: "pending", dueDate: "4 weeks before event" },
      { name: "Design email marketing campaign", status: "pending", dueDate: "5 weeks before event" },
      { name: "Develop PR strategy", status: "pending", dueDate: "7 weeks before event" },
    ],
    teamSize: "4-6 people",
    timeline: "8 weeks before event",
    budget: "$2,500 - $5,000",
    keyContacts: [
      { name: "Sarah Johnson", role: "Marketing Lead", email: "sarah@eventx.com" },
      { name: "Michael Chen", role: "Social Media Specialist", email: "michael@eventx.com" },
    ],
  },
  Design: {
    icon: "design",
    description: "Visual identity, graphics, and branding elements for your event",
    tasks: [
      { name: "Design event logo and branding", status: "completed", dueDate: "10 weeks before event" },
      { name: "Create signage and banners", status: "in-progress", dueDate: "6 weeks before event" },
      { name: "Develop digital assets", status: "pending", dueDate: "5 weeks before event" },
      { name: "Design merchandise", status: "pending", dueDate: "7 weeks before event" },
      { name: "Create event program", status: "pending", dueDate: "3 weeks before event" },
    ],
    teamSize: "3-4 people",
    timeline: "10 weeks before event",
    budget: "$1,500 - $3,000",
    keyContacts: [
      { name: "Alex Rivera", role: "Design Lead", email: "alex@eventx.com" },
      { name: "Jamie Wong", role: "Graphic Designer", email: "jamie@eventx.com" },
    ],
  },
  "Social Media": {
    icon: "social",
    description: "Online presence and community management for maximum engagement",
    tasks: [
      { name: "Create content calendar", status: "completed", dueDate: "8 weeks before event" },
      { name: "Manage event hashtags", status: "in-progress", dueDate: "Ongoing" },
      { name: "Live posting during event", status: "pending", dueDate: "Day of event" },
      { name: "Engage with audience comments", status: "in-progress", dueDate: "Ongoing" },
      { name: "Coordinate influencer posts", status: "pending", dueDate: "2 weeks before event" },
    ],
    teamSize: "2-3 people",
    timeline: "Ongoing",
    budget: "$1,000 - $2,500",
    keyContacts: [
      { name: "Taylor Smith", role: "Social Media Manager", email: "taylor@eventx.com" },
      { name: "Jordan Lee", role: "Content Creator", email: "jordan@eventx.com" },
    ],
  },
  Logistics: {
    icon: "logistics",
    description: "Venue setup, equipment, and transportation coordination",
    tasks: [
      { name: "Coordinate venue logistics", status: "in-progress", dueDate: "4 weeks before event" },
      { name: "Arrange transportation", status: "pending", dueDate: "3 weeks before event" },
      { name: "Manage equipment setup", status: "pending", dueDate: "1 week before event" },
      { name: "Coordinate with vendors", status: "in-progress", dueDate: "Ongoing" },
      { name: "Create floor plan", status: "completed", dueDate: "6 weeks before event" },
    ],
    teamSize: "5-8 people",
    timeline: "4 weeks before event",
    budget: "$5,000 - $10,000",
    keyContacts: [
      { name: "Chris Morgan", role: "Logistics Manager", email: "chris@eventx.com" },
      { name: "Pat Johnson", role: "Venue Coordinator", email: "pat@eventx.com" },
    ],
  },
  Security: {
    icon: "security",
    description: "Safety measures and crowd management for a secure event",
    tasks: [
      { name: "Develop security plan", status: "in-progress", dueDate: "3 weeks before event" },
      { name: "Coordinate with venue security", status: "pending", dueDate: "2 weeks before event" },
      { name: "Emergency response planning", status: "pending", dueDate: "2 weeks before event" },
      { name: "Staff security checkpoints", status: "pending", dueDate: "Day of event" },
      { name: "Secure valuable equipment", status: "pending", dueDate: "Day before event" },
    ],
    teamSize: "6-10 people",
    timeline: "2 weeks before event",
    budget: "$3,000 - $7,000",
    keyContacts: [
      { name: "Sam Wilson", role: "Security Lead", email: "sam@eventx.com" },
      { name: "Alex Thompson", role: "Safety Coordinator", email: "alex.t@eventx.com" },
    ],
  },
  Technical: {
    icon: "technical",
    description: "AV equipment, lighting, and technical support for your event",
    tasks: [
      { name: "Setup sound systems", status: "pending", dueDate: "Day before event" },
      { name: "Manage lighting equipment", status: "pending", dueDate: "Day before event" },
      { name: "Technical troubleshooting", status: "pending", dueDate: "Day of event" },
      { name: "Test all equipment", status: "pending", dueDate: "Day before event" },
      { name: "Coordinate with performers", status: "in-progress", dueDate: "1 week before event" },
    ],
    teamSize: "4-6 people",
    timeline: "1 week before event",
    budget: "$4,000 - $8,000",
    keyContacts: [
      { name: "Jesse Kim", role: "Technical Director", email: "jesse@eventx.com" },
      { name: "Riley Garcia", role: "AV Specialist", email: "riley@eventx.com" },
    ],
  },
  Catering: {
    icon: "catering",
    description: "Food and beverage services for attendees and staff",
    tasks: [
      { name: "Menu planning", status: "completed", dueDate: "6 weeks before event" },
      { name: "Coordinate with vendors", status: "in-progress", dueDate: "4 weeks before event" },
      { name: "Dietary accommodations", status: "in-progress", dueDate: "3 weeks before event" },
      { name: "Finalize quantities", status: "pending", dueDate: "2 weeks before event" },
      { name: "Setup service stations", status: "pending", dueDate: "Day of event" },
    ],
    teamSize: "3-5 people",
    timeline: "3 weeks before event",
    budget: "$5,000 - $15,000",
    keyContacts: [
      { name: "Morgan Lee", role: "Catering Manager", email: "morgan@eventx.com" },
      { name: "Casey Brown", role: "Food Service Coordinator", email: "casey@eventx.com" },
    ],
  },
  Entertainment: {
    icon: "entertainment",
    description: "Performers, activities, and guest experience coordination",
    tasks: [
      { name: "Book performers", status: "in-progress", dueDate: "6 weeks before event" },
      { name: "Schedule activities", status: "pending", dueDate: "4 weeks before event" },
      { name: "Coordinate performances", status: "pending", dueDate: "1 week before event" },
      { name: "Plan audience engagement", status: "in-progress", dueDate: "3 weeks before event" },
      { name: "Arrange equipment needs", status: "pending", dueDate: "2 weeks before event" },
    ],
    teamSize: "3-4 people",
    timeline: "6 weeks before event",
    budget: "$3,000 - $10,000",
    keyContacts: [
      { name: "Quinn Taylor", role: "Entertainment Director", email: "quinn@eventx.com" },
      { name: "Avery Martinez", role: "Talent Coordinator", email: "avery@eventx.com" },
    ],
  },
}

// Enhanced SVG icons with more attractive styling
const departmentIcons: Record<string, JSX.Element> = {
  marketing: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21H3V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M21 9L15 15L10 10L3 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  design: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M12 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 16V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  social: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="5" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="19" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 16L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 16L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  logistics: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 10H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  security: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 8V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  technical: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.7 6.3C14.3 5.9 13.7 5.9 13.3 6.3L8.3 11.3C7.9 11.7 7.9 12.3 8.3 12.7L13.3 17.7C13.7 18.1 14.3 18.1 14.7 17.7L19.7 12.7C20.1 12.3 20.1 11.7 19.7 11.3L14.7 6.3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 20L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 7L4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 17L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  catering: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 9H22V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V9Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M22 9C22 7.34315 20.6569 6 19 6H5C3.34315 6 2 7.34315 2 9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 6V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 6V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 6V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 15L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  entertainment: (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 14C8.5 15.5 10 16.5 12 16.5C14 16.5 15.5 15.5 16 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="9" r="1.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="15" cy="9" r="1.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
}

export default function DepartmentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [department, setDepartment] = useState<string>("Technical") // Default for demo
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState<string>("tasks")

  // In a real app, you would get the department from the URL params
  useEffect(() => {
    if (params.department) {
      setDepartment(decodeURIComponent(params.department as string))
    }
  }, [params])

  // Track mouse position for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Get department details
  const details = departmentDetails[department as keyof typeof departmentDetails] || departmentDetails.Technical

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white relative overflow-hidden">
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#DFFF60] opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.7, 0.3, 0.7],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Cursor glow effect */}
      <motion.div
        className="fixed w-64 h-64 rounded-full bg-[#DFFF60] opacity-10 pointer-events-none blur-3xl"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          className="flex flex-col items-center mb-16 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full bg-[#DFFF60] opacity-5 blur-3xl"
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

          <motion.h1
            className="text-4xl md:text-6xl font-horizon font-bold mb-2 text-center relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              className="text-[#DFFF60] inline-block"
              animate={{
                textShadow: [
                  "0 0 10px rgba(223, 255, 96, 0.3)",
                  "0 0 20px rgba(223, 255, 96, 0.5)",
                  "0 0 10px rgba(223, 255, 96, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              EVENT
            </motion.span>
            <span className="text-white">X</span>

            <motion.div
              className="absolute -top-8 -right-8 text-[#DFFF60]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: [0, 10, 0, -10, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.8 },
                scale: { duration: 0.5, delay: 0.8 },
                rotate: { duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 },
              }}
            >
              <Star className="w-8 h-8" fill="#DFFF60" />
            </motion.div>
          </motion.h1>

          <motion.p
            className="text-xl text-zinc-400 text-center max-w-2xl font-montserrat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Department details and planning
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-[#232342] rounded-2xl p-8 shadow-xl mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background decorative elements */}
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

          <div className="flex items-center justify-between mb-8">
            <motion.button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-montserrat"
              whileHover={{ x: -5, color: "#DFFF60" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowLeft size={20} />
              <span>Back to Selected Departments</span>
            </motion.button>
          </div>

          <motion.div
            className="flex flex-col md:flex-row gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Department Header */}
            <motion.div
              className="w-full md:w-1/3 bg-[#1a1a2e] rounded-xl p-6 border-2 border-[#DFFF60] shadow-[0_0_15px_rgba(223,255,96,0.2)]"
              whileHover={{
                boxShadow: "0 0 25px rgba(223, 255, 96, 0.3)",
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  className="text-3xl text-[#DFFF60]"
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  {departmentIcons[details.icon]}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-horizon font-bold text-[#DFFF60]">{department}</h2>
                  <p className="text-zinc-400 mt-1 font-montserrat text-sm">{details.description}</p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-2 text-zinc-300 font-montserrat">
                  <Users className="w-5 h-5 text-[#DFFF60]" />
                  <span>Team Size: {details.teamSize}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 font-montserrat">
                  <Clock className="w-5 h-5 text-[#DFFF60]" />
                  <span>Timeline: {details.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300 font-montserrat">
                  <MapPin className="w-5 h-5 text-[#DFFF60]" />
                  <span>Budget: {details.budget}</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-horizon font-bold text-white mb-2">Key Contacts</h3>
                <div className="space-y-3">
                  {details.keyContacts.map((contact, index) => (
                    <motion.div
                      key={index}
                      className="bg-[#1f1f3a] p-3 rounded-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <p className="font-montserrat font-medium text-white">{contact.name}</p>
                      <p className="text-zinc-400 text-sm font-montserrat">{contact.role}</p>
                      <p className="text-[#DFFF60] text-sm font-montserrat mt-1">{contact.email}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Department Content */}
            <motion.div className="w-full md:w-2/3">
              {/* Tabs */}
              <div className="flex border-b border-zinc-700 mb-6">
                {["tasks", "timeline", "resources"].map((tab) => (
                  <motion.button
                    key={tab}
                    className={`px-4 py-2 font-horizon font-medium capitalize ${
                      activeTab === tab
                        ? "text-[#DFFF60] border-b-2 border-[#DFFF60]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "tasks" && (
                  <motion.div
                    key="tasks"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-horizon font-bold text-white mb-4">Tasks & Responsibilities</h3>
                    <div className="space-y-4">
                      {details.tasks.map((task, index) => (
                        <motion.div
                          key={index}
                          className="bg-[#1a1a2e] p-4 rounded-xl border border-zinc-800 flex items-start gap-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 15px rgba(223, 255, 96, 0.1)",
                            borderColor: "#3f3f60",
                          }}
                        >
                          <div className="mt-1">
                            {task.status === "completed" ? (
                              <CheckCircle className="w-5 h-5 text-[#DFFF60]" />
                            ) : task.status === "in-progress" ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              >
                                <Clock className="w-5 h-5 text-[#DFFF60]" />
                              </motion.div>
                            ) : (
                              <AlertCircle className="w-5 h-5 text-zinc-500" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-montserrat font-medium text-white">{task.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-montserrat ${
                                  task.status === "completed"
                                    ? "bg-[#DFFF60]/20 text-[#DFFF60]"
                                    : task.status === "in-progress"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : "bg-zinc-700/30 text-zinc-400"
                                }`}
                              >
                                {task.status === "completed"
                                  ? "Completed"
                                  : task.status === "in-progress"
                                    ? "In Progress"
                                    : "Pending"}
                              </span>
                              <span className="text-xs text-zinc-500 font-montserrat">{task.dueDate}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "timeline" && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-horizon font-bold text-white mb-4">Department Timeline</h3>

                    <div className="relative pl-8">
                      {/* Timeline line */}
                      <motion.div
                        className="absolute left-[7px] top-0 bottom-0 w-1 bg-zinc-700"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 1 }}
                      />

                      <div className="space-y-8">
                        {details.tasks.map((task, index) => (
                          <motion.div
                            key={index}
                            className="relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                          >
                            <motion.div
                              className={`w-4 h-4 rounded-full absolute -left-8 top-1 z-10 ${
                                task.status === "completed"
                                  ? "bg-[#DFFF60]"
                                  : task.status === "in-progress"
                                    ? "bg-blue-400"
                                    : "bg-zinc-600"
                              }`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                                delay: 0.3 + index * 0.1,
                              }}
                            >
                              {task.status === "in-progress" && (
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-blue-400 opacity-50"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                  }}
                                />
                              )}
                            </motion.div>

                            <div className="bg-[#1a1a2e] p-4 rounded-xl border border-zinc-800">
                              <h4 className="font-montserrat font-medium text-white">{task.name}</h4>
                              <p className="text-zinc-400 text-sm font-montserrat mt-1">{task.dueDate}</p>
                              <div className="mt-2">
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full font-montserrat ${
                                    task.status === "completed"
                                      ? "bg-[#DFFF60]/20 text-[#DFFF60]"
                                      : task.status === "in-progress"
                                        ? "bg-blue-500/20 text-blue-400"
                                        : "bg-zinc-700/30 text-zinc-400"
                                  }`}
                                >
                                  {task.status === "completed"
                                    ? "Completed"
                                    : task.status === "in-progress"
                                      ? "In Progress"
                                      : "Pending"}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "resources" && (
                  <motion.div
                    key="resources"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-horizon font-bold text-white mb-4">Resources & Materials</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        className="bg-[#1a1a2e] p-4 rounded-xl border border-zinc-800"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 15px rgba(223, 255, 96, 0.1)",
                          borderColor: "#3f3f60",
                        }}
                      >
                        <h4 className="font-montserrat font-medium text-white">Budget Allocation</h4>
                        <p className="text-zinc-400 text-sm font-montserrat mt-1">Total budget: {details.budget}</p>
                        <div className="mt-3 h-4 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#DFFF60]"
                            initial={{ width: 0 }}
                            animate={{ width: "35%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                        <p className="text-xs text-zinc-500 font-montserrat mt-1">35% utilized</p>
                      </motion.div>

                      <motion.div
                        className="bg-[#1a1a2e] p-4 rounded-xl border border-zinc-800"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 15px rgba(223, 255, 96, 0.1)",
                          borderColor: "#3f3f60",
                        }}
                      >
                        <h4 className="font-montserrat font-medium text-white">Team Members</h4>
                        <p className="text-zinc-400 text-sm font-montserrat mt-1">Required: {details.teamSize}</p>
                        <div className="mt-3 flex -space-x-2">
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-8 h-8 rounded-full bg-[#2a2a4a] border-2 border-[#1a1a2e] flex items-center justify-center text-xs font-medium text-white"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                            >
                              {details.keyContacts[i % 2]?.name.charAt(0) || "T"}
                            </motion.div>
                          ))}
                          <motion.div
                            className="w-8 h-8 rounded-full bg-[#DFFF60] border-2 border-[#1a1a2e] flex items-center justify-center text-xs font-medium text-[#1a1a2e]"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            +2
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-[#1a1a2e] p-4 rounded-xl border border-zinc-800"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 15px rgba(223, 255, 96, 0.1)",
                          borderColor: "#3f3f60",
                        }}
                      >
                        <h4 className="font-montserrat font-medium text-white">Required Equipment</h4>
                        <ul className="mt-2 space-y-1 text-zinc-400 text-sm font-montserrat">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF60]"></span>
                            <span>Professional cameras</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF60]"></span>
                            <span>Lighting equipment</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF60]"></span>
                            <span>Sound system</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF60]"></span>
                            <span>Laptops and software</span>
                          </li>
                        </ul>
                      </motion.div>

                      <motion.div
                        className="bg-[#1a1a2e] p-4 rounded-xl border border-zinc-800"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 15px rgba(223, 255, 96, 0.1)",
                          borderColor: "#3f3f60",
                        }}
                      >
                        <h4 className="font-montserrat font-medium text-white">Important Documents</h4>
                        <ul className="mt-2 space-y-2 text-zinc-400 text-sm font-montserrat">
                          <li className="flex items-center gap-2">
                            <span className="text-[#DFFF60]">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 2V8H20"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 13H8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 17H8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 9H9H8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span>Department_Plan.pdf</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#DFFF60]">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 2V8H20"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 13H8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 17H8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 9H9H8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span>Budget_Breakdown.xlsx</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#DFFF60]">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 2V8H20"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 13H8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M16 17H8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10 9H9H8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span>Team_Contacts.docx</span>
                          </li>
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.button
              onClick={() => router.push("/event-summary")}
              className="bg-[#DFFF60] text-[#1a1a2e] px-8 py-3 rounded-full font-bold font-horizon flex items-center gap-2 transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(223, 255, 96, 0.4)",
                backgroundColor: "#EEFF9D",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 10px rgba(223, 255, 96, 0.2)",
                  "0 0 20px rgba(223, 255, 96, 0.4)",
                  "0 0 10px rgba(223, 255, 96, 0.2)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                },
              }}
            >
              Continue to Event Summary
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

