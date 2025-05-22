"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, Search, Settings } from "lucide-react"

interface InventorySearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function InventorySearch({ searchTerm, onSearchChange }: InventorySearchProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search inventory..."
          className="pl-8 w-full sm:w-[250px]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Columns
        </Button>
      </div>
    </div>
  )
}
