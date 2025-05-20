"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Check, Loader2, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  role: string
  avatar?: string
}

interface NewMessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onStartConversation: (users: User[]) => void
  onSearchUsers: (query: string) => Promise<User[]>
}

export default function NewMessageDialog({
  open,
  onOpenChange,
  onStartConversation,
  onSearchUsers,
}: NewMessageDialogProps) {
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  // Handle searching for users to start a new conversation
  const handleUserSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const results = await onSearchUsers(query)
      setSearchResults(results)
    } catch (error) {
      console.error("Error searching users:", error)
      toast.error("Search Error", {
        description: "Failed to search for users. Please try again."
      })
    } finally {
      setIsSearching(false)
    }
  }, [onSearchUsers])

  // Handle selecting a user to start a conversation with
  const handleSelectUser = useCallback((user: User) => {
    setSelectedUsers(prev => {
      // Check if user is already selected
      if (prev.some((u) => u.id === user.id)) {
        return prev.filter((u) => u.id !== user.id)
      } else {
        return [...prev, user]
      }
    })
  }, [])

  // Handle starting a new conversation
  const handleStartConversation = useCallback(() => {
    if (selectedUsers.length === 0) {
      toast.error("No Users Selected", {
        description: "Please select at least one user to start a conversation with.",
      })
      return
    }

    onStartConversation(selectedUsers)
    onOpenChange(false)
    setSelectedUsers([])
  }, [selectedUsers, onStartConversation, onOpenChange])

  // Handle dialog close
  const handleClose = () => {
    onOpenChange(false)
    setSelectedUsers([])
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>Start a new conversation with users on AgroConnect.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedUsers.map((user) => (
              <Badge key={user.id} variant="secondary" className="flex items-center gap-1">
                {user.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search users..." onValueChange={handleUserSearch} />
            <CommandList>
              <CommandEmpty>
                {isSearching ? (
                  <div className="py-6 text-center text-sm">
                    <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
                    Searching...
                  </div>
                ) : (
                  "No users found."
                )}
              </CommandEmpty>
              <CommandGroup heading="Users">
                {searchResults.map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => handleSelectUser(user)}
                    className="flex items-center gap-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || ""} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p>{user.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                    </div>
                    <div className="flex h-4 w-4 items-center justify-center rounded-sm border">
                      {selectedUsers.some((u) => u.id === user.id) && <Check className="h-3 w-3" />}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleStartConversation} disabled={selectedUsers.length === 0}>
            Start Conversation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}