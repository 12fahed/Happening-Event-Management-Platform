"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Star, Clock, Users, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import type { JSX } from "react"


const departmentDetails = {
  Marketing: {
    icon: "marketing",
    description: "Promotion, advertising, and audience engagement",
    primaryColor: "#DFFF60",
    secondaryColor: "#2a2a11",
    connections: ["Design", "Social Media"],
    tasks: ["Create promotional materials", "Manage social media campaigns", "Coordinate with influencers"],
    teamSize: "4-6 people",
    timeline: "8 weeks before event",
    budget: "$2,500 - $5,000",
    progress: 35,
    dependencies: [
      { department: "Design", description: "Needs branding assets and visual identity" },
      { department: "Social Media", description: "Coordinates on campaign messaging" },
    ],
  },
  Design: {
    icon: "design",
    description: "Visual identity, graphics, and branding",
    primaryColor: "#FF6B6B",
    secondaryColor: "#2a1111",
    connections: ["Marketing", "Technical"],
    tasks: ["Design event logo and branding", "Create signage and banners", "Develop digital assets"],
    teamSize: "3-4 people",
    timeline: "10 weeks before event",
    budget: "$1,500 - $3,000",
    progress: 42,
    dependencies: [
      { department: "Marketing", description: "Provides brand guidelines and requirements" },
      { department: "Technical", description: "Coordinates on digital asset specifications" },
    ],
  },
  "Social Media": {
    icon: "social",
    description: "Online presence and community management",
    primaryColor: "#4ECDC4",
    secondaryColor: "#112a28",
    connections: ["Marketing", "Entertainment"],
    tasks: ["Create content calendar", "Manage event hashtags", "Live posting during event"],
    teamSize: "2-3 people",
    timeline: "Ongoing",
    budget: "$1,000 - $2,500",
    progress: 28,
    dependencies: [
      { department: "Marketing", description: "Aligns on messaging and campaign strategy" },
      { department: "Entertainment", description: "Coordinates on performer announcements" },
    ],
  },
  Logistics: {
    icon: "logistics",
    description: "Venue setup, equipment, and transportation",
    primaryColor: "#FFD166",
    secondaryColor: "#2a2511",
    connections: ["Technical", "Security"],
    tasks: ["Coordinate venue logistics", "Arrange transportation", "Manage equipment setup"],
    teamSize: "5-8 people",
    timeline: "4 weeks before event",
    budget: "$5,000 - $10,000",
    progress: 15,
    dependencies: [
      { department: "Technical", description: "Coordinates on equipment requirements" },
      { department: "Security", description: "Aligns on venue access and safety protocols" },
    ],
  },
  Security: {
    icon: "security",
    description: "Safety measures and crowd management",
    primaryColor: "#A569BD",
    secondaryColor: "#2a112a",
    connections: ["Logistics"],
    tasks: ["Develop security plan", "Hire security personnel", "Implement safety protocols"],
    teamSize: "6-10 people",
    timeline: "2 weeks before event",
    budget: "$3,000 - $6,000",
    progress: 10,
    dependencies: [
      { department: "Logistics", description: "Coordinates on venue layout and access points" },
    ],
  },
  Technical: {
    icon: "technical",
    description: "AV equipment, lighting, and technical needs",
    primaryColor: "#6B66FF",
    secondaryColor: "#11112a",
    connections: ["Logistics", "Design"],
    tasks: ["Setup sound systems", "Manage lighting equipment", "Technical troubleshooting"],
    teamSize: "4-6 people",
    timeline: "1 week before event",
    budget: "$4,000 - $8,000",
    progress: 20,
    dependencies: [
      { department: "Logistics", description: "Provides venue specifications and power requirements" },
      { department: "Design", description: "Coordinates on visual presentation requirements" },
    ],
  },
  Catering: {
    icon: "catering",
    description: "Food and beverage services",
    primaryColor: "#48C9B0",
    secondaryColor: "#112a25",
    connections: ["Logistics"],
    tasks: ["Plan menu", "Coordinate with vendors", "Manage food service"],
    teamSize: "3-5 people",
    timeline: "3 weeks before event",
    budget: "$2,500 - $5,000",
    progress: 18,
    dependencies: [
      { department: "Logistics", description: "Coordinates on serving areas and timing" },
    ],
  },
  Entertainment: {
    icon: "entertainment",
    description: "Performers, activities, and guest experience",
    primaryColor: "#E74C3C",
    secondaryColor: "#2a1111",
    connections: ["Social Media", "Technical"],
    tasks: ["Book performers", "Plan activities", "Coordinate guest experience"],
    teamSize: "3-4 people",
    timeline: "6 weeks before event",
    budget: "$3,000 - $7,000",
    progress: 25,
    dependencies: [
      { department: "Social Media", description: "Coordinates on performer announcements" },
      { department: "Technical", description: "Coordinates on performance requirements" },
    ],
  },
}

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

export default function SelectedDepartments() {
  const router = useRouter()
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })  
  const [hoveredDept, setHoveredDept] = useState<string | null>(null)

  

  useEffect(() => {
    const storedDepts = localStorage.getItem("selectedDepartments")
    if (storedDepts) {
      const depts = JSON.parse(storedDepts)
      setSelectedDepartments(depts)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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

  const navigateToDepartmentDetail = (department: string) => {
    localStorage.setItem("currentDepartment", department)
    router.push(`/department-detail`)
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white relative overflow-hidden">
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
            className="text-4xl md:text-6xl font-bold mb-2 text-center relative"
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
            className="text-xl text-zinc-400 text-center max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Department Coordination & Dependencies
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-[#232342] rounded-2xl p-8 shadow-xl mb-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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

          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={() => router.push("/departments")}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              whileHover={{ x: -5, color: "#DFFF60" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowLeft size={20} />
              <span>Next</span>
            </motion.button>
            <h2 className="text-3xl font-bold text-center relative">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Department List
              </motion.span>
            </h2>
            <div className="w-[100px]"></div>
          </div>

          <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
            {selectedDepartments.map((dept, index) => {
              const details = departmentDetails[dept as keyof typeof departmentDetails]
              if (!details) return null

              return (
                <motion.div
                  key={dept}
                  variants={item}
                  className="bg-[#1a1a2e] rounded-xl p-6 border border-zinc-800"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: `0 0 20px ${details.primaryColor}30`,
                    borderColor: details.primaryColor,
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <div className="flex items-start gap-3 mb-4">
                        <motion.div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: details.primaryColor,
                            color: details.secondaryColor,
                          }}
                          animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: [
                              `0 0 0px ${details.primaryColor}40`,
                              `0 0 10px ${details.primaryColor}80`,
                              `0 0 0px ${details.primaryColor}40`,
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            delay: index * 0.2,
                          }}
                        >
                          <div className="text-[#1a1a2e] w-7 h-7">{departmentIcons[details.icon]}</div>
                        </motion.div>

                        <div>
                          <h3 className="text-xl font-bold" style={{ color: details.primaryColor }}>
                            {dept}
                          </h3>
                          <p className="text-zinc-400 text-sm">{details.description}</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-zinc-300">
                          <Users className="w-4 h-4 text-[#DFFF60]" />
                          <span>Team Size: {details.teamSize}</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-300">
                          <Clock className="w-4 h-4 text-[#DFFF60]" />
                          <span>Timeline: {details.timeline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-300">
                          <MapPin className="w-4 h-4 text-[#DFFF60]" />
                          <span>Budget: {details.budget}</span>
                        </div>
                      </div>

                      <motion.button
                        className="mt-4 text-sm font-medium flex items-center gap-1"
                        style={{ color: details.primaryColor }}
                        whileHover={{ x: 5 }}
                        onClick={() => navigateToDepartmentDetail(dept)}
                      >
                        <span>View Department Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div className="w-full md:w-2/3">
                      <h4 className="text-lg font-bold mb-3 text-white">Dependencies & Connections</h4>

                      <div className="space-y-4">
                        {details.dependencies.map((dependency, i) => (
                          <motion.div
                            key={i}
                            className="bg-[#232342] p-4 rounded-lg border border-zinc-800"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            whileHover={{
                              borderColor: departmentDetails[dependency.department as keyof typeof departmentDetails]?.primaryColor || "#DFFF60",
                              backgroundColor: "#2a2a4a",
                            }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: departmentDetails[dependency.department as keyof typeof departmentDetails]?.primaryColor || "#DFFF60",
                                }}
                              ></div>
                              <h5 className="font-medium text-white">{dependency.department}</h5>
                            </div>
                            <p className="text-zinc-400 text-sm pl-5">{dependency.description}</p>
                          </motion.div>
                        ))}

                        {details.connections
                          .filter((conn) => !details.dependencies.some((dep) => dep.department === conn))
                          .map((connection, i) => (
                            <motion.div
                              key={`conn-${i}`}
                              className="bg-[#232342] p-4 rounded-lg border border-zinc-800"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              whileHover={{
                                borderColor: departmentDetails[connection as keyof typeof departmentDetails]?.primaryColor || "#DFFF60",
                                backgroundColor: "#2a2a4a",
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor: departmentDetails[connection as keyof typeof departmentDetails]?.primaryColor || "#DFFF60",
                                  }}
                                ></div>
                                <h5 className="font-medium text-white">{connection}</h5>
                                <span className="text-zinc-500 text-xs">(Connected)</span>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.button
            onClick={() => router.push("http://127.0.0.1:8010")}
            className="bg-[#DFFF60] text-[#1a1a2e] px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all"
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
            Plan Ahead
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}