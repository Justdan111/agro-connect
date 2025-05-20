"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useUser } from "./userContext"

// Types for the messaging system
export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderRole: string
  content: string
  timestamp: Date
  read: boolean
}

export interface Conversation {
  id: string
  participants: {
    id: string
    name: string
    role: string
    avatar?: string
  }[]
  lastMessage?: {
    content: string
    timestamp: Date
    senderId: string
  }
  unreadCount: number
}

interface MessagingContextType {
  conversations: Conversation[]
  activeConversation: Conversation | null
  messages: Message[]
  setActiveConversation: (conversation: Conversation | null) => void
  sendMessage: (content: string) => void
  markAsRead: (conversationId: string) => void
  startNewConversation: (participants: { id: string; name: string; role: string; avatar?: string }[]) => void
  searchUsers: (query: string) => Promise<{ id: string; name: string; role: string; avatar?: string }[]>
  totalUnread: number
}

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participants: [
      { id: "user-1", name: "John Farmer", role: "farmer" },
      { id: "user-2", name: "FastHaul Logistics", role: "transporter", avatar: "/images/chat.avif?height=40&width=40" },
    ],
    lastMessage: {
      content: "I'll need to transport 5 tons of corn next week. Are you available?",
      timestamp: new Date("2025-05-19T14:30:00Z"),
      senderId: "user-1",
    },
    unreadCount: 0,
  },
  {
    id: "conv2",
    participants: [
      { id: "user-1", name: "John Farmer", role: "farmer" },
      { id: "user-3", name: "AgriCorp Inc.", role: "buyer", avatar: "/images/chat.avif?height=40&width=40" },
    ],
    lastMessage: {
      content: "We're interested in purchasing your wheat harvest. Can we discuss pricing?",
      timestamp: new Date("2025-05-18T09:15:00Z"),
      senderId: "user-3",
    },
    unreadCount: 2,
  },
  {
    id: "conv3",
    participants: [
      { id: "user-1", name: "John Farmer", role: "farmer" },
      { id: "user-4", name: "FarmTech Support", role: "admin", avatar: "/images/chat.avif?height=40&width=40" },
    ],
    lastMessage: {
      content: "Your soil sensor data shows unusual readings. Would you like assistance troubleshooting?",
      timestamp: new Date("2025-05-17T16:45:00Z"),
      senderId: "user-4",
    },
    unreadCount: 1,
  },
]

// Mock data for messages
const mockMessages: Record<string, Message[]> = {
  conv1: [
    {
      id: "msg1",
      conversationId: "conv1",
      senderId: "user-1",
      senderName: "John Farmer",
      senderRole: "farmer",
      content: "Hello, I'll need to transport 5 tons of corn next week. Are you available?",
      timestamp: new Date("2025-05-19T14:30:00Z"),
      read: true,
    },
    {
      id: "msg2",
      conversationId: "conv1",
      senderId: "user-2",
      senderName: "FastHaul Logistics",
      senderRole: "transporter",
      content: "Hi John, yes we have availability next week. What day were you thinking?",
      timestamp: new Date("2025-05-19T14:35:00Z"),
      read: true,
    },
    {
      id: "msg3",
      conversationId: "conv1",
      senderId: "user-1",
      senderName: "John Farmer",
      senderRole: "farmer",
      content: "I was thinking Wednesday or Thursday would work best for me.",
      timestamp: new Date("2025-05-19T14:40:00Z"),
      read: true,
    },
    {
      id: "msg4",
      conversationId: "conv1",
      senderId: "user-2",
      senderName: "FastHaul Logistics",
      senderRole: "transporter",
      content: "Thursday works for us. What's the pickup location and destination?",
      timestamp: new Date("2025-05-19T14:45:00Z"),
      read: true,
    },
  ],
  conv2: [
    {
      id: "msg5",
      conversationId: "conv2",
      senderId: "user-3",
      senderName: "AgriCorp Inc.",
      senderRole: "buyer",
      content: "Hello John, we're interested in purchasing your wheat harvest. Can we discuss pricing?",
      timestamp: new Date("2025-05-18T09:15:00Z"),
      read: false,
    },
    {
      id: "msg6",
      conversationId: "conv2",
      senderId: "user-1",
      senderName: "John Farmer",
      senderRole: "farmer",
      content: "Hi AgriCorp, I'd be happy to discuss. I'm expecting about 20 tons of wheat this season.",
      timestamp: new Date("2025-05-18T09:30:00Z"),
      read: true,
    },
    {
      id: "msg7",
      conversationId: "conv2",
      senderId: "user-3",
      senderName: "AgriCorp Inc.",
      senderRole: "buyer",
      content: "That sounds good. Our current offer is $210 per ton. Would that work for you?",
      timestamp: new Date("2025-05-18T09:45:00Z"),
      read: false,
    },
  ],
  conv3: [
    {
      id: "msg8",
      conversationId: "conv3",
      senderId: "user-4",
      senderName: "FarmTech Support",
      senderRole: "admin",
      content: "Your soil sensor data shows unusual readings. Would you like assistance troubleshooting?",
      timestamp: new Date("2025-05-17T16:45:00Z"),
      read: false,
    },
  ],
}

// Mock user data for search
const mockUsers = [
  { id: "user-2", name: "FastHaul Logistics", role: "transporter", avatar: "/images/chat.avif?height=40&width=40" },
  { id: "user-3", name: "AgriCorp Inc.", role: "buyer", avatar: "/images/chat.avif?height=40&width=40" },
  { id: "user-4", name: "FarmTech Support", role: "admin", avatar:"/images/chat.avif?height=40&width=40" },
  { id: "user-5", name: "Green Valley Farms", role: "farmer", avatar: "/images/chat.avif?height=40&width=40" },
  { id: "user-6", name: "Harvest Buyers Co.", role: "buyer", avatar: "/images/chat.avif?height=40&width=40" },
  { id: "user-7", name: "QuickShip Transport", role: "transporter", avatar: "/images/chat.avif?height=40&width=40" },
  { id: "user-8", name: "Organic Produce Inc.", role: "buyer", avatar: "/images/chat.avif?height=40&width=40" },
  { id: "user-9", name: "Farm Equipment Rentals", role: "supplier", avatar: "/images/chat.avif?height=40&width=40" },
]

const MessagingContext = createContext<MessagingContextType | undefined>(undefined)

export function MessagingProvider({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [totalUnread, setTotalUnread] = useState(0)

  // Load conversations when user changes
  useEffect(() => {
    if (user) {
      // In a real app, this would fetch conversations from an API
      setConversations(mockConversations)

      // Calculate total unread messages
      const unreadCount = mockConversations.reduce((total, conv) => total + conv.unreadCount, 0)
      setTotalUnread(unreadCount)
    } else {
      setConversations([])
      setActiveConversation(null)
      setMessages([])
      setTotalUnread(0)
    }
  }, [user])

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversation) {
      // In a real app, this would fetch messages from an API
      setMessages(mockMessages[activeConversation.id] || [])
    } else {
      setMessages([])
    }
  }, [activeConversation])

  // Send a new message
  const sendMessage = (content: string) => {
    if (!activeConversation || !user) return

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      conversationId: activeConversation.id,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      content,
      timestamp: new Date(),
      read: true,
    }

    // Update messages
    setMessages((prev) => [...prev, newMessage])

    // Update conversation with last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversation.id
          ? {
              ...conv,
              lastMessage: {
                content,
                timestamp: new Date(),
                senderId: user.id,
              },
            }
          : conv,
      ),
    )
  }

  // Mark conversation as read
  const markAsRead = (conversationId: string) => {
    // Update messages
    setMessages((prev) =>
      prev.map((msg) => (msg.conversationId === conversationId && !msg.read ? { ...msg, read: true } : msg)),
    )

    // Update conversation unread count
    setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv)))

    // Recalculate total unread
    setTotalUnread((prev) => {
      const conversationUnreadCount = conversations.find((c) => c.id === conversationId)?.unreadCount || 0
      return Math.max(0, prev - conversationUnreadCount)
    })
  }

  // Start a new conversation
  const startNewConversation = (participants: { id: string; name: string; role: string; avatar?: string }[]) => {
    if (!user) return

    // Make sure the current user is included in participants
    const allParticipants = [
      { id: user.id, name: user.name, role: user.role, avatar: user.avatar },
      ...participants.filter((p) => p.id !== user.id),
    ]

    // Check if conversation already exists with these participants
    const participantIds = allParticipants.map((p) => p.id).sort()
    const existingConversation = conversations.find((conv) => {
      const convParticipantIds = conv.participants.map((p) => p.id).sort()
      return JSON.stringify(convParticipantIds) === JSON.stringify(participantIds)
    })

    if (existingConversation) {
      setActiveConversation(existingConversation)
      return
    }

    // Create new conversation
    const newConversation: Conversation = {
      id: `conv${Date.now()}`,
      participants: allParticipants,
      unreadCount: 0,
    }

    // Update conversations
    setConversations((prev) => [...prev, newConversation])
    setActiveConversation(newConversation)
  }

  // Search users
  const searchUsers = async (query: string) => {
    // In a real app, this would search users via an API
    return new Promise<typeof mockUsers>((resolve) => {
      setTimeout(() => {
        const results = mockUsers.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()) && u.id !== user?.id)
        resolve(results)
      }, 500)
    })
  }

  return (
    <MessagingContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        setActiveConversation,
        sendMessage,
        markAsRead,
        startNewConversation,
        searchUsers,
        totalUnread,
      }}
    >
      {children}
    </MessagingContext.Provider>
  )
}

export function useMessaging() {
  const context = useContext(MessagingContext)
  if (context === undefined) {
    throw new Error("useMessaging must be used within a MessagingProvider")
  }
  return context
}
