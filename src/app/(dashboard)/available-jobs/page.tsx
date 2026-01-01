"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Package } from "lucide-react"
import { JobCard } from "@/components/transporter/job-card"
import { JobFilters } from "@/components/transporter/job-filters"
import { JobStats } from "@/components/transporter/job-stats"

// Dummy data for available jobs
const availableJobs = [
  {
    id: "JOB-2001",
    cargo: "Corn",
    quantity: "5 tons",
    pickup: "Green Acres Farm",
    pickupDate: "2025-05-18",
    destination: "AgriCorp Processing",
    distance: "120 km",
    estimatedPayment: "$450",
    priority: "High",
    status: "Available",
    pickupLocation: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "JOB-2002",
    cargo: "Wheat",
    quantity: "3 tons",
    pickup: "Wheatfield Farms",
    pickupDate: "2025-05-20",
    destination: "Grain Storage Facility",
    distance: "85 km",
    estimatedPayment: "$320",
    priority: "Medium",
    status: "Available",
    pickupLocation: { lat: 40.758, lng: -73.9855 },
  },
  {
    id: "JOB-2003",
    cargo: "Vegetables",
    quantity: "2 tons",
    pickup: "Fresh Produce Co.",
    pickupDate: "2025-05-19",
    destination: "FoodMart Distribution",
    distance: "65 km",
    estimatedPayment: "$280",
    priority: "High",
    status: "Available",
    pickupLocation: { lat: 40.7489, lng: -73.968 },
  },
  {
    id: "JOB-2004",
    cargo: "Rice",
    quantity: "4 tons",
    pickup: "Delta Rice Farms",
    pickupDate: "2025-05-21",
    destination: "Rice Processing Plant",
    distance: "150 km",
    estimatedPayment: "$600",
    priority: "Medium",
    status: "Available",
    pickupLocation: { lat: 40.6892, lng: -74.0445 },
  },
  {
    id: "JOB-2005",
    cargo: "Dairy Products",
    quantity: "3 tons",
    pickup: "Happy Dairy Farm",
    pickupDate: "2025-05-17",
    destination: "Dairy Distribution Hub",
    distance: "95 km",
    estimatedPayment: "$500",
    priority: "High",
    status: "Available",
    pickupLocation: { lat: 40.7614, lng: -73.9776 },
  },
]

export default function AvailableJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [distanceRange, setDistanceRange] = useState("all")

  const filteredJobs = availableJobs.filter((job) => {
    const matchesSearch =
      job.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.destination.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPriority = priorityFilter === "all" || job.priority === priorityFilter

    const distance = Number.parseInt(job.distance)
    const matchesDistance =
      distanceRange === "all" ||
      (distanceRange === "short" && distance <= 100) ||
      (distanceRange === "medium" && distance > 100 && distance <= 200) ||
      (distanceRange === "long" && distance > 200)

    return matchesSearch && matchesPriority && matchesDistance
  })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Available Jobs</h1>
        <p className="text-muted-foreground">Find and accept new transportation jobs</p>
      </div>

      <JobStats jobs={availableJobs} />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by cargo, location..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <JobFilters
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            distanceRange={distanceRange}
            setDistanceRange={setDistanceRange}
          />
        </div>

        <div className="grid gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No jobs found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
