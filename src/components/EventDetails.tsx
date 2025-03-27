"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight, Sparkles, Star } from "lucide-react"
import EventForm from "@/components/EventForm"
import { useRouter } from "next/navigation"

// Expanded keyword list with at least 60 options
const eventCategories = {
  "Event Type": [
    "Conference",
    "Concert",
    "Wedding",
    "Festival",
    "Sports",
    "Exhibition",
    "Gala",
    "Seminar",
    "Workshop",
    "Retreat",
    "Award Show",
    "Product Launch",
    "Networking",
    "Charity",
    "Trade Show",
  ],
  "Event Theme & Vibe": [
    "Casual",
    "Formal",
    "Entertainment",
    "Cultural",
    "Tech",
    "Luxury",
    "Minimalist",
    "Retro",
    "Futuristic",
    "Bohemian",
    "Tropical",
    "Vintage",
    "Industrial",
    "Rustic",
    "Glamorous",
  ],
  "Interactive Elements": [
    "Workshops",
    "Performances",
    "Networking",
    "Live Demos",
    "Q&A Sessions",
    "Breakout Groups",
    "Interactive Displays",
    "Virtual Reality",
    "Photo Booths",
    "Live Streaming",
    "Gamification",
    "Hands-on Activities",
    "Collaborative Art",
    "Live Polling",
    "Social Media Walls",
  ],
  "Audience & Scale": [
    "VIP",
    "Large-Scale",
    "International",
    "Private",
    "Ticketed",
    "Invitation Only",
    "Corporate",
    "Family-Friendly",
    "Industry-Specific",
    "Community",
    "Educational",
    "Media",
    "Influencers",
    "Executives",
    "General Public",
  ],
  "Funding & Sponsorship": [
    "Corporate",
    "Self-Funded",
    "Crowdfunded",
    "Venture Backed",
    "Non-Profit",
    "Government Funded",
    "Angel Investors",
    "Ticket Sales",
    "Membership Fees",
    "Donations",
    "Grants",
    "Partnerships",
    "Merchandise",
    "Advertising",
    "Premium Experiences",
  ],
}

// Flatten all keywords into a single array
const allKeywords = Object.values(eventCategories).flat()

export default function EventDetails() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [showForm, setShowForm] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const toggleKeyword = (keyword: string) => {
    setSelected((prev) => (prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]))
  }

  const handleContinue = (formData: any) => {
    console.log("Selected keywords:", selected)
    console.log("Form data:", formData)
    router.push("/departments")
  }

  return (
    <div className="bg-[#1E2132] min-h-screen w-full">
      <div className="container mx-auto px-4 py-16 max-w-6xl relative">
        {/* Floating particles */}
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
              HAPPENIN
            </motion.span>
            <span className="text-white">G</span>

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
          className="bg-[#2A2D45] rounded-2xl p-8 mb-12 shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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

          <h2 className="text-3xl font-horizon font-bold mb-8 text-center relative">
            <motion.span
              className="inline-block text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              What&apos;s Your Event Like?
            </motion.span>
            <motion.div
              className="absolute -top-6 -right-6 text-[#DFFF60]"
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </h2>

          <motion.div
            className="flex flex-wrap gap-3 justify-center mb-10"
            layout
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
          >
            {allKeywords.map((keyword, index) => {
              const isSelected = selected.includes(keyword)
              return (
                <motion.button
                  key={keyword}
                  onClick={() => toggleKeyword(keyword)}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.02 * index,
                    layout: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 0.5,
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: isSelected ? "0 0 15px rgba(223, 255, 96, 0.5)" : "0 0 10px rgba(255, 255, 255, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    inline-flex items-center px-4 py-2 rounded-full text-base font-medium font-montserrat
                    whitespace-nowrap overflow-hidden ring-1 ring-inset transition-all duration-300
                    ${
                      isSelected
                        ? "text-[#1a1a2e] bg-[#DFFF60] ring-[#EEFF9D] shadow-[0_0_10px_rgba(223,255,96,0.3)]"
                        : "text-zinc-300 bg-[rgba(39,39,42,0.5)] ring-[hsla(0,0%,100%,0.06)] hover:bg-[rgba(39,39,42,0.8)]"
                    }
                  `}
                >
                  <motion.div
                    className="relative flex items-center"
                    animate={{
                      width: isSelected ? "auto" : "100%",
                      paddingRight: isSelected ? "1.5rem" : "0",
                    }}
                    transition={{
                      ease: [0.175, 0.885, 0.32, 1.275],
                      duration: 0.3,
                    }}
                  >
                    <span>{keyword}</span>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                            mass: 0.5,
                          }}
                          className="absolute right-0"
                        >
                          <motion.div
                            className="w-4 h-4 rounded-full bg-[#1a1a2e] flex items-center justify-center"
                            animate={{
                              boxShadow: [
                                "0 0 0px rgba(223, 255, 96, 0.3)",
                                "0 0 10px rgba(223, 255, 96, 0.5)",
                                "0 0 0px rgba(223, 255, 96, 0.3)",
                              ],
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Check className="w-3 h-3 text-[#DFFF60]" strokeWidth={2} />
                          </motion.div>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.button>
              )
            })}
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              onClick={() => setShowForm(true)}
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
              Continue to Details
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <EventForm onSubmit={handleContinue} selectedKeywords={selected} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}