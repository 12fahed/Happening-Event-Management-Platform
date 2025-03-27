"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowLeft, Sparkles, Star, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const allDepartments = [
  {
    name: "Marketing",
    icon: "marketing",
    description: "Promotion, advertising, and audience engagement",
  },
  {
    name: "Design",
    icon: "design",
    description: "Visual identity, graphics, and branding",
  },
  {
    name: "Social Media",
    icon: "social",
    description: "Online presence and community management",
  },
  {
    name: "Logistics",
    icon: "logistics",
    description: "Venue setup, equipment, and transportation",
  },
  {
    name: "Security",
    icon: "security",
    description: "Safety measures and crowd management",
  },
  {
    name: "Technical",
    icon: "technical",
    description: "AV equipment, lighting, and technical needs",
  },
  {
    name: "Catering",
    icon: "catering",
    description: "Food and beverage services",
  },
  {
    name: "Entertainment",
    icon: "entertainment",
    description: "Performers, activities, and guest experience",
  },
]

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

export default function DepartmentsPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const toggleDepartment = (department: string) => {
    setSelected((prev) => 
      prev.includes(department) 
        ? prev.filter((d) => d !== department) 
        : [...prev, department]
    )
  }

  const handleContinue = () => {
    localStorage.setItem("selectedDepartments", JSON.stringify(selected))
    router.push("/selected-departments")
  }

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
      {[...Array(15)].map((_, i) => (
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
            Plan your perfect event with our interactive planner
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-[#232342] rounded-2xl p-8 shadow-xl mb-16 relative overflow-hidden"
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
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-montserrat"
              whileHover={{ x: -5, color: "#DFFF60" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowLeft size={20} />
              <span>Back to Event Details</span>
            </motion.button>
            <h2 className="text-3xl font-horizon font-bold text-center relative">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Departments You Will Be Needing
              </motion.span>
              <motion.div
                className="absolute -top-6 -right-6 text-[#DFFF60]"
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </h2>
            <div className="w-[100px]"></div>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {allDepartments.map((dept) => {
              const isSelected = selected.includes(dept.name)
              return (
                <motion.div
                  key={dept.name}
                  variants={item}
                  onClick={() => toggleDepartment(dept.name)}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: isSelected ? "0 0 25px rgba(223, 255, 96, 0.3)" : "0 0 15px rgba(255, 255, 255, 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative overflow-hidden rounded-xl p-6 cursor-pointer
                    transition-all duration-300 transform
                    ${
                      isSelected
                        ? "bg-gradient-to-br from-[#2a2a11] to-[#1f1f09] border-2 border-[#DFFF60] shadow-[0_0_15px_rgba(223,255,96,0.2)]"
                        : "bg-[#1a1a2e] border-2 border-zinc-800 hover:border-zinc-700"
                    }
                  `}
                >
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#DFFF60] opacity-5 blur-xl"
                    animate={{
                      scale: isSelected ? [1, 1.2, 1] : 1,
                      opacity: isSelected ? [0.05, 0.1, 0.05] : 0.05,
                    }}
                    transition={{
                      duration: 3,
                      repeat: isSelected ? Number.POSITIVE_INFINITY : 0,
                      repeatType: "reverse",
                    }}
                  />

                  <div className="flex items-start gap-4">
                    <motion.div
                      className={`text-3xl ${isSelected ? "text-[#DFFF60]" : "text-zinc-400"}`}
                      animate={{
                        rotate: isSelected ? [0, 5, 0, -5, 0] : 0,
                        scale: isSelected ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: isSelected ? 1 : 0,
                        repeatDelay: 0.2,
                      }}
                    >
                      {departmentIcons[dept.icon]}
                    </motion.div>

                    <div>
                      <h3 className={`text-xl font-horizon font-bold ${isSelected ? "text-[#DFFF60]" : "text-white"}`}>
                        {dept.name}
                      </h3>
                      <p className="text-zinc-400 mt-1 font-montserrat text-sm">{dept.description}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute top-3 right-3"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <motion.div
                          className="w-6 h-6 rounded-full bg-[#DFFF60] flex items-center justify-center"
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(223, 255, 96, 0.3)",
                              "0 0 10px rgba(223, 255, 96, 0.5)",
                              "0 0 0px rgba(223, 255, 96, 0.3)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Check className="w-4 h-4 text-[#1a1a2e]" strokeWidth={2} />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.button
              onClick={handleContinue}
              disabled={selected.length === 0}
              className={`bg-[#DFFF60] text-[#1a1a2e] px-8 py-3 rounded-full font-bold font-horizon flex items-center gap-2 transition-all ${
                selected.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={selected.length === 0 ? {} : {
                scale: 1.05,
                boxShadow: "0 0 20px rgba(223, 255, 96, 0.4)",
                backgroundColor: "#EEFF9D",
              }}
              whileTap={selected.length === 0 ? {} : { scale: 0.95 }}
              animate={{
                boxShadow: selected.length === 0 ? "none" : [
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
              Continue to Planning
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