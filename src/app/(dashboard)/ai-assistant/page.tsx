"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Brain, Camera, Leaf, Loader2, Mic, PlusCircle, Send, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AgroConnect AI Assistant. How can I help you with your farming operations today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on the soil analysis and current weather patterns, I recommend applying nitrogen fertilizer at a rate of 150 kg/ha to your corn fields.",
        "Your wheat crop appears to be showing signs of rust disease. I recommend applying a fungicide treatment within the next 48 hours.",
        "According to market trends, corn prices are expected to increase by 5% in the next month. Consider holding your harvest if storage conditions permit.",
        "The weather forecast indicates a high probability of frost next week. Consider harvesting sensitive crops earlier than planned.",
        "Based on your crop rotation history, I recommend planting legumes in Field B next season to improve soil nitrogen content.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">Get AI-powered insights and recommendations for your farm.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Conversation
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>AI Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="chat">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="space-y-4 pt-4">
                <Button variant="outline" className="w-full justify-start">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Crop Advisor
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Leaf className="mr-2 h-4 w-4" />
                  Disease Detector
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Brain className="mr-2 h-4 w-4" />
                  Market Analyst
                </Button>
              </TabsContent>
              <TabsContent value="tools" className="space-y-4 pt-4">
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="mr-2 h-4 w-4" />
                  Crop Scanner
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Pest Identifier
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mic className="mr-2 h-4 w-4" />
                  Voice Assistant
                </Button>
              </TabsContent>
            </Tabs>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent Conversations</h3>
              <div className="space-y-2">
                {["Corn disease identification", "Fertilizer recommendations", "Weather impact analysis"].map(
                  (title, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start text-sm">
                      {title}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Ask questions about farming, get crop recommendations, and more.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <div className="h-[500px] overflow-y-auto pr-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/images/chat.avif" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-4 max-w-[80%] ${
                      message.role === "assistant"
                        ? "bg-muted text-foreground"
                        : "bg-agro-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage src="/images/chat.avif" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="mb-4 flex justify-start">
                  <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/images/chat.avif" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-4 bg-muted">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center space-x-2">
              <Button variant="outline" size="icon">
                <Camera className="h-4 w-4" />
                <span className="sr-only">Attach image</span>
              </Button>
              <Button variant="outline" size="icon">
                <Mic className="h-4 w-4" />
                <span className="sr-only">Voice input</span>
              </Button>
              <div className="relative flex-1">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pr-10"
                />
                <Button
                  size="icon"
                  className="absolute right-0 top-0 h-full rounded-l-none"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Disease Detection</CardTitle>
            <CardDescription>Upload images of your crops for AI analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6">
              <Camera className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground text-center mb-4">
                Drag and drop an image here, or click to browse
              </p>
              <Button>Upload Image</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Crop Recommendations</CardTitle>
            <CardDescription>Get personalized crop recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-agro-accent">
                  <Leaf className="h-5 w-5 text-agro-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Corn (Field A)</h3>
                  <p className="text-xs text-muted-foreground">Optimal planting time: Late April</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-agro-accent">
                  <Leaf className="h-5 w-5 text-agro-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Soybeans (Field B)</h3>
                  <p className="text-xs text-muted-foreground">Optimal planting time: Early May</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View All Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weather Insights</CardTitle>
            <CardDescription>AI-powered weather analysis for your farm</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src="/images/sunny.webp?height=40&width=40" width={40} height={40} alt="Weather icon" />
                  <div>
                    <h3 className="text-sm font-medium">Today</h3>
                    <p className="text-xs text-muted-foreground">Sunny, 24°C</p>
                  </div>
                </div>
                <p className="text-sm">Ideal for spraying</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src="/images/cloudy.png?height=40&width=40" width={40} height={40} alt="Weather icon" />
                  <div>
                    <h3 className="text-sm font-medium">Tomorrow</h3>
                    <p className="text-xs text-muted-foreground">Partly Cloudy, 22°C</p>
                  </div>
                </div>
                <p className="text-sm">Good for fieldwork</p>
              </div>
              <Link href={"weather"} >
              <Button variant="outline" className="w-full">
                View 7-Day Forecast
              </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
