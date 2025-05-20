"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Check,
  Clock,
  MoreVertical,
  PaperclipIcon,
  Plus,
  Send,
  Smile,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Conversation } from "@/context/messageContext"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  read: boolean
}

interface ChatAreaProps {
  activeConversation: Conversation | null
  messages: Message[]
  user: { id: string; name: string } | null
  onSendMessage: (message: string) => void
  onBackToList: () => void
  onNewMessage: () => void
}

export default function ChatArea({
  activeConversation,
  messages,
  user,
  onSendMessage,
  onBackToList,
  onNewMessage,
}: ChatAreaProps) {
  const [messageInput, setMessageInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle sending a message
  const handleSendMessage = useCallback(() => {
    if (!messageInput.trim()) return

    onSendMessage(messageInput.trim())
    setMessageInput("")
  }, [messageInput, onSendMessage])

  // Handle key press in message input
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }, [handleSendMessage])

  // Get other participants in a conversation (excluding current user)
  const getOtherParticipants = useCallback((conversation: Conversation) => {
    return conversation.participants.filter((p) => p.id !== user?.id)
  }, [user?.id])

  // Format timestamp
  const formatTime = useCallback((date: Date) => {
    const now = new Date()
    const messageDate = new Date(date)

    // If message is from today, show time
    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // If message is from this week, show day of week
    const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays < 7) {
      return messageDate.toLocaleDateString([], { weekday: "short" })
    }

    // Otherwise show date
    return messageDate.toLocaleDateString([], { month: "short", day: "numeric" })
  }, [])

  // Get conversation name (for group chats or individual chats)
  const getConversationName = useCallback((conversation: Conversation) => {
    const otherParticipants = getOtherParticipants(conversation)

    if (otherParticipants.length === 0) {
      return "No participants"
    }

    if (otherParticipants.length === 1) {
      return otherParticipants[0].name
    }

    return `${otherParticipants[0].name} and ${otherParticipants.length - 1} others`
  }, [getOtherParticipants])

  // Get avatar for conversation
  const getConversationAvatar = useCallback((conversation: Conversation) => {
    const otherParticipants = getOtherParticipants(conversation)

    if (otherParticipants.length === 0) {
      return null
    }

    return otherParticipants[0].avatar
  }, [getOtherParticipants])

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "farmer":
        return "bg-green-100 text-green-800 border-green-300"
      case "buyer":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "transporter":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  if (!activeConversation) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center text-center p-4">
        <div>
          <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium">Select a conversation</h3>
          <p className="text-muted-foreground mt-1 mb-4">Choose a conversation from the list or start a new one</p>
          <Button onClick={onNewMessage}>
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex-1 flex flex-col ${activeConversation ? "block" : "hidden md:block"}`}>
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onBackToList}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={getConversationAvatar(activeConversation) || ""} />
            <AvatarFallback>
              {getOtherParticipants(activeConversation).length > 1 ? (
                <Users className="h-5 w-5" />
              ) : (
                getInitials(getConversationName(activeConversation))
              )}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{getConversationName(activeConversation)}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getOtherParticipants(activeConversation).map((participant, index) => (
                <span key={participant.id}>
                  {index > 0 && ", "}
                  <Badge
                    variant="outline"
                    className={`text-[10px] py-0 px-1 ${getRoleBadgeColor(participant.role)}`}
                  >
                    {participant.role}
                  </Badge>
                </span>
              ))}
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Conversation</DropdownMenuLabel>
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete Conversation</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message, index) => {
              const isCurrentUser = message.senderId === user?.id
              const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId

              return (
                <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-end gap-2 max-w-[80%]`}
                  >
                    {!isCurrentUser && showAvatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{getInitials(message.senderName)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-8" />
                    )}
                    <div
                      className={`rounded-lg p-3 ${isCurrentUser ? "bg-agro-primary text-white" : "bg-muted"}`}
                    >
                      {!isCurrentUser && showAvatar && (
                        <p className="text-xs font-medium mb-1">{message.senderName}</p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={`flex items-center gap-1 mt-1 text-xs ${
                          isCurrentUser ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        <span>{formatTime(message.timestamp)}</span>
                        {isCurrentUser &&
                          (message.read ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="h-full flex items-center justify-center text-center p-4">
              <div>
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Start a conversation</h3>
                <p className="text-sm text-muted-foreground mt-1">Send a message to start chatting</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <div className="relative flex-1">
            <Input
              placeholder="Type a message..."
              className="pr-10 py-6"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button
            size="icon"
            className="rounded-full h-10 w-10 bg-agro-primary hover:bg-agro-primary/90"
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}