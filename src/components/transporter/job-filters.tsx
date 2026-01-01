"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface JobFiltersProps {
  priorityFilter: string
  setPriorityFilter: (value: string) => void
  distanceRange: string
  setDistanceRange: (value: string) => void
}

export function JobFilters({ priorityFilter, setPriorityFilter, distanceRange, setDistanceRange }: JobFiltersProps) {
  return (
    <div className="flex gap-2">
      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>
      <Select value={distanceRange} onValueChange={setDistanceRange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Distance" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Distances</SelectItem>
          <SelectItem value="short">Short (≤100 km)</SelectItem>
          <SelectItem value="medium">Medium (100-200 km)</SelectItem>
          <SelectItem value="long">Long (200+ km)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
