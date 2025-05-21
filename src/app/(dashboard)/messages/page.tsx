"use client"

import { useState, useEffect, useRef } from "react"
import { useUser } from "@/context/userContext"
import { useMessaging } from "@/context/messageContext"
import ConversationsList from "@/components/messages/conversationList"
import ChatArea from "@/components/messages/chatArea"
import NewMessageDialog from "@/components/messages/newMessageDialog"

export default function MessagesPage() {
  const { user } = useUser()
  const {
    conversations,
    activeConversation,
    messages,
    setActiveConversation,
    sendMessage,
    markAsRead,
    startNewConversation,
    searchUsers,
  } = useMessaging()

  const [newMessageOpen, setNewMessageOpen] = useState(false)
  // Add a mounting state to prevent effects from running during initial render
  const isMounted = useRef(false)

  // Mark conversation as read when activeConversation changes
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    
    if (activeConversation?.id) {
      markAsRead(activeConversation.id)
    }
  }, [activeConversation?.id, markAsRead])

  // Handle sending a message
  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      sendMessage(message)
    }
  }

  // Handle starting a new conversation
  const handleStartConversation = (users: { id: string; name: string; role: string; avatar?: string }[]) => {
    startNewConversation(users)
    setNewMessageOpen(false)
  }

  // Handle going back to conversation list (mobile)
  const handleBackToList = () => {
    setActiveConversation(null)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex flex-col md:flex-row h-full">
        {/* Conversations Sidebar */}
        <ConversationsList
          conversations={conversations}
          activeConversation={activeConversation}
          user={user}
          onSelectConversation={setActiveConversation}
          onNewMessage={() => setNewMessageOpen(true)}
        />

        {/* Chat Area */}
        <ChatArea
          activeConversation={activeConversation}
          messages={messages}
          user={user}
          onSendMessage={handleSendMessage}
          onBackToList={handleBackToList}
          onNewMessage={() => setNewMessageOpen(true)}
        />
      </div>

      {/* New Message Dialog */}
      <NewMessageDialog
        open={newMessageOpen}
        onOpenChange={setNewMessageOpen}
        onStartConversation={handleStartConversation}
        onSearchUsers={searchUsers}
      />
    </div>
  )
}