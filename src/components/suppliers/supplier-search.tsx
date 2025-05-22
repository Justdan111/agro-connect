"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Filter, Search } from "lucide-react"

interface SupplierSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function SupplierSearch({ searchTerm, onSearchChange }: SupplierSearchProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search suppliers or products..."
          className="pl-8 w-full sm:w-[300px]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          Location
        </Button>
        <Button variant="outline" size="sm">
          Specialties
        </Button>
      </div>
    </div>
  )
}
