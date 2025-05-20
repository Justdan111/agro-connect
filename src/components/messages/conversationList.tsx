"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Search, Users } from "lucide-react"
import { Conversation } from "@/context/messageContext"

interface ConversationsListProps {
  conversations: Conversation[]
  activeConversation: Conversation | null
  user: { id: string; name: string } | null
  onSelectConversation: (conversation: Conversation) => void
  onNewMessage: () => void
}

export default function ConversationsList({
  conversations,
  activeConversation,
  user,
  onSelectConversation,
  onNewMessage,
}: ConversationsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredConversations, setFilteredConversations] = useState(conversations)

  // Update filtered conversations when dependencies change
  useEffect(() => {
    const filtered = conversations.filter((conversation) => {
      if (!searchQuery) return true
      return conversation.participants.some(
        (participant) =>
          participant.id !== user?.id && participant.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    })
    setFilteredConversations(filtered)
  }, [conversations, searchQuery, user?.id])

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

  const renderConversationItem = (conversation: Conversation) => (
    <button
      key={conversation.id}
      className={`w-full flex items-start gap-3 p-3 rounded-lg text-left ${
        activeConversation?.id === conversation.id ? "bg-muted" : "hover:bg-muted/50"
      }`}
      onClick={() => onSelectConversation(conversation)}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={getConversationAvatar(conversation) || ""} />
        <AvatarFallback>
          {getOtherParticipants(conversation).length > 1 ? (
            <Users className="h-5 w-5" />
          ) : (
            getInitials(getConversationName(conversation))
          )}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium truncate">{getConversationName(conversation)}</p>
          {conversation.lastMessage && (
            <p className="text-xs text-muted-foreground">
              {formatTime(conversation.lastMessage.timestamp)}
            </p>
          )}
        </div>
        {conversation.lastMessage && (
          <p className="text-sm text-muted-foreground truncate">
            {conversation.lastMessage.senderId === user?.id ? <span>You: </span> : null}
            {conversation.lastMessage.content}
          </p>
        )}
      </div>
      {conversation.unreadCount > 0 && (
        <Badge className="ml-auto bg-agro-primary">{conversation.unreadCount}</Badge>
      )}
    </button>
  )

  return (
    <div className={`w-full md:w-80 border-r ${activeConversation ? "hidden md:block" : "block"}`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Messages</h2>
          <Button size="sm" variant="ghost" onClick={onNewMessage}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">New message</span>
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="p-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-16rem)]">
          <TabsContent value="all" className="mt-4 space-y-1">
            {filteredConversations.length > 0 ? (
              filteredConversations.map(renderConversationItem)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery ? "No conversations found" : "No conversations yet"}
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="mt-4 space-y-1">
            {filteredConversations.filter((c) => c.unreadCount > 0).length > 0 ? (
              filteredConversations
                .filter((c) => c.unreadCount > 0)
                .map(renderConversationItem)
            ) : (
              <div className="text-center py-8 text-muted-foreground">No unread messages</div>
            )}
          </TabsContent>

          <TabsContent value="groups" className="mt-4 space-y-1">
            {filteredConversations.filter((c) => getOtherParticipants(c).length > 1).length > 0 ? (
              filteredConversations
                .filter((c) => getOtherParticipants(c).length > 1)
                .map(renderConversationItem)
            ) : (
              <div className="text-center py-8 text-muted-foreground">No group conversations</div>
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}