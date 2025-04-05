"use client"

import { useEffect, useState } from "react"
import { useConversation } from "@11labs/react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import CanvasAnimation from "./canvas-animation"

const VoiceChat = () => {
  const [hasPermission, setHasPermission] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs")
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs")
    },
    onMessage: (message) => {
      console.log("Received message:", message)
    },
    onError: (error: string | Error) => {
      setErrorMessage(typeof error === "string" ? error : error.message)
      console.error("Error:", error)
    },
  })

  const { status, isSpeaking } = conversation

  useEffect(() => {
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true })
        setHasPermission(true)
      } catch (error) {
        setErrorMessage("Microphone access denied")
        console.error("Error accessing microphone:", error)
      }
    }

    requestMicPermission()
  }, [])

  const handleStartConversation = async () => {
    try {
      const conversationId = await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
      })
      console.log("Started conversation:", conversationId)
    } catch (error) {
      setErrorMessage("Failed to start conversation")
      console.error("Error starting conversation:", error)
    }
  }

  const handleEndConversation = async () => {
    try {
      await conversation.endSession()
    } catch (error) {
      setErrorMessage("Failed to end conversation")
      console.error("Error ending conversation:", error)
    }
  }

  const toggleMute = async () => {
    try {
      await conversation.setVolume({ volume: isMuted ? 1 : 0 })
      setIsMuted(!isMuted)
    } catch (error) {
      setErrorMessage("Failed to change volume")
      console.error("Error changing volume:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white p-6 flex flex-col">
      {/* Header with mute control */}
      <header className="flex justify-between items-center mb-8">
        {/* <h1 className="text-2xl font-bold text-[#4cc9f0]">EVENTX VOICE ASSISTANT</h1> */}
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleMute} 
          disabled={status !== "connected"}
          className="border-[#4cc9f0] text-[#4cc9f0] hover:bg-[#4cc9f0] hover:text-white"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </header>

      {/* Main content area */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {/* Canvas Animation - now larger */}
        <div className="relative w-full max-w-2xl h-96 mb-8">
          <CanvasAnimation
            isActive={status === "connected"}
            isSpeaking={isSpeaking}
            onClick={status === "connected" ? handleEndConversation : handleStartConversation}
            disabled={!hasPermission && status !== "connected"}
          />
        </div>

        {/* Status messages */}
        <div className="text-center mb-8 space-y-2">
          {status === "connected" && (
            <p className="text-xl text-[#4cc9f0]">
              {isSpeaking ? "Assistant is speaking..." : "Listening for your voice..."}
            </p>
          )}
          {errorMessage && <p className="text-red-400">{errorMessage}</p>}
          {!hasPermission && (
            <p className="text-yellow-400">Please allow microphone access to use voice chat</p>
          )}
        </div>

        {/* Control button */}
        <div className="w-full max-w-md">
          {status === "connected" ? (
            <Button
              onClick={handleEndConversation}
              className="w-full py-6 bg-red-600 hover:bg-red-700 text-lg"
            >
              <MicOff className="mr-2 h-5 w-5" />
              End Conversation
            </Button>
          ) : (
            <Button
              onClick={handleStartConversation}
              disabled={!hasPermission}
              className="w-full py-6 bg-[#4cc9f0] hover:bg-[#3aa8d8] text-lg"
            >
              <Mic className="mr-2 h-5 w-5" />
              Start Voice Assistant
            </Button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-400">
        Powered by EVENTX • {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default VoiceChat