"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CanvasAnimationProps {
  isActive: boolean
  isSpeaking?: boolean
  onClick: () => void
  disabled?: boolean
}

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  color: string
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

const CanvasAnimation: React.FC<CanvasAnimationProps> = ({
  isActive,
  isSpeaking = false,
  onClick,
  disabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // Colors for the gradient
  const colors = {
    active: ["#4ade80", "#22c55e", "#16a34a"],
    inactive: ["#a3e635", "#84cc16", "#65a30d"],
    speaking: ["#4ade80", "#22c55e", "#16a34a", "#15803d"],
  }

  // Create initial particles
  useEffect(() => {
    const initialParticles: Particle[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors.inactive[Math.floor(Math.random() * colors.inactive.length)],
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    setParticles(initialParticles)
  }, [dimensions])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const container = canvas.parentElement
        if (container) {
          const { width, height } = container.getBoundingClientRect()
          setDimensions({ width, height })
          canvas.width = width
          canvas.height = height
        }
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Add ripple effect
  const addRipple = (x: number, y: number, color: string) => {
    const newRipple: Ripple = {
      x,
      y,
      radius: 0,
      maxRadius: 100,
      opacity: 0.7,
      color,
    }

    setRipples((prevRipples) => [...prevRipples, newRipple])
  }

  // Automatically add ripples when speaking
  useEffect(() => {
    if (isActive && isSpeaking) {
      const interval = setInterval(() => {
        const centerX = dimensions.width / 2
        const centerY = dimensions.height / 2
        const randomOffset = Math.random() * 30
        const angle = Math.random() * Math.PI * 2
        const x = centerX + Math.cos(angle) * randomOffset
        const y = centerY + Math.sin(angle) * randomOffset
        const color = colors.speaking[Math.floor(Math.random() * colors.speaking.length)]
        addRipple(x, y, color)
      }, 800)

      return () => clearInterval(interval)
    }
  }, [isActive, isSpeaking, dimensions])

  // Add periodic ripples when active
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const centerX = dimensions.width / 2
        const centerY = dimensions.height / 2
        const color = colors.active[Math.floor(Math.random() * colors.active.length)]
        addRipple(centerX, centerY, color)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isActive, dimensions])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw water effect background
      drawWaterEffect(ctx, canvas.width, canvas.height)

      // Update and draw particles
      const updatedParticles = particles.map((particle) => {
        // Update position
        particle.x += particle.speedX * (isActive ? 1.5 : 1)
        particle.y += particle.speedY * (isActive ? 1.5 : 1)

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        return particle
      })

      setParticles(updatedParticles)

      // Update and draw ripples
      const updatedRipples = ripples
        .map((ripple) => {
          ripple.radius += 1
          ripple.opacity -= 0.01

          if (ripple.opacity > 0) {
            ctx.beginPath()
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
            ctx.strokeStyle = `${ripple.color}${Math.floor(ripple.opacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 2
            ctx.stroke()
            return ripple
          }
          return null
        })
        .filter((ripple): ripple is Ripple => ripple !== null)

      setRipples(updatedRipples)

      // Draw center circle
      drawCenterCircle(ctx, canvas.width / 2, canvas.height / 2)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isActive, isSpeaking, particles, ripples, dimensions, isHovering, mousePosition])

  // Draw water effect
  const drawWaterEffect = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.4

    // Create gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, radius)

    // Set gradient colors based on state
    const colorSet = isActive ? (isSpeaking ? colors.speaking : colors.active) : colors.inactive

    gradient.addColorStop(0, `${colorSet[0]}99`)
    gradient.addColorStop(0.4, `${colorSet[1]}77`)
    gradient.addColorStop(0.7, `${colorSet[2]}55`)
    gradient.addColorStop(1, "transparent")

    // Draw main circle with gradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    // Add wave effect
    const time = Date.now() * 0.001
    const waveRadius = radius * 0.8

    ctx.beginPath()
    for (let i = 0; i < Math.PI * 2; i += 0.1) {
      const waveAmplitude = isActive ? 8 : 4
      const wavePeriod = isActive ? 10 : 20
      const x = centerX + Math.cos(i) * (waveRadius + Math.sin(i * wavePeriod + time) * waveAmplitude)
      const y = centerY + Math.sin(i) * (waveRadius + Math.sin(i * wavePeriod + time) * waveAmplitude)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.closePath()
    ctx.fillStyle = `${colorSet[0]}33`
    ctx.fill()
  }

  // Draw center circle with button
  const drawCenterCircle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const radius = 30

    // Draw outer glow
    ctx.beginPath()
    ctx.arc(x, y, radius + 5, 0, Math.PI * 2)
    const glowGradient = ctx.createRadialGradient(x, y, radius - 5, x, y, radius + 10)
    glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
    glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
    ctx.fillStyle = glowGradient
    ctx.fill()

    // Draw button circle
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fill()

    // Draw icon
    ctx.fillStyle = "white"
    ctx.font = "bold 12px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(isActive ? "STOP" : "START", x, y)
  }

  // Mouse interaction handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })

    // Check if mouse is over center button
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))

    if (distance < 30) {
      setIsHovering(true)
    } else {
      setIsHovering(false)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if click is on center button
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))

    if (distance < 30 && !disabled) {
      onClick()

      // Add ripple effect on click
      const colorSet = isActive ? colors.active : colors.inactive
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const color = colorSet[Math.floor(Math.random() * colorSet.length)]
          addRipple(centerX, centerY, color)
        }, i * 100)
      }
    } else {
      // Add ripple at click position
      const colorSet = isActive ? colors.active : colors.inactive
      const color = colorSet[Math.floor(Math.random() * colorSet.length)]
      addRipple(x, y, color)
    }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className={`cursor-pointer ${disabled ? "opacity-70" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <Button
          variant="outline"
          size="sm"
          className={`rounded-full bg-black text-white border-none h-12 w-12 flex items-center justify-center opacity-0`}
          disabled={disabled}
        >
          {isActive ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}

export default CanvasAnimation

