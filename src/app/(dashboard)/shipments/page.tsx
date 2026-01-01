"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { ShipmentStats } from "@/components/transporter/shipment-stats"
import { ShipmentList } from "@/components/transporter/shipment-list"

// Dummy data for transporter's shipments
const transporterShipments = [
  {
    id: "TRN-001",
    cargo: "Corn",
    quantity: "5 tons",
    pickup: "Green Acres Farm",
    pickupDate: "2025-05-15",
    destination: "AgriCorp Processing",
    estimatedArrival: "2025-05-16",
    distance: "120 km",
    status: "In Transit",
    progress: 65,
    driver: "John Smith",
    vehicle: "Truck - ABC 123",
    acceptedDate: "2025-05-15",
  },
  {
    id: "TRN-002",
    cargo: "Wheat",
    quantity: "3 tons",
    pickup: "Wheatfield Farms",
    pickupDate: "2025-05-18",
    destination: "Grain Storage Facility",
    estimatedArrival: "2025-05-19",
    distance: "85 km",
    status: "Loading",
    progress: 25,
    driver: "Jane Doe",
    vehicle: "Truck - XYZ 789",
    acceptedDate: "2025-05-17",
  },
  {
    id: "TRN-003",
    cargo: "Vegetables",
    quantity: "2 tons",
    pickup: "Fresh Produce Co.",
    pickupDate: "2025-05-12",
    destination: "FoodMart Distribution",
    estimatedArrival: "2025-05-12",
    distance: "65 km",
    status: "Delivered",
    progress: 100,
    driver: "Mike Johnson",
    vehicle: "Van - DEF 456",
    acceptedDate: "2025-05-12",
  },
  {
    id: "TRN-004",
    cargo: "Dairy Products",
    quantity: "3 tons",
    pickup: "Happy Dairy Farm",
    pickupDate: "2025-05-10",
    destination: "Dairy Distribution Hub",
    estimatedArrival: "2025-05-10",
    distance: "95 km",
    status: "Delivered",
    progress: 100,
    driver: "John Smith",
    vehicle: "Refrigerated - GHI 101",
    acceptedDate: "2025-05-10",
  },
]

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredShipments = transporterShipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || shipment.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Shipments</h1>
          <p className="text-muted-foreground">Track and manage your assigned shipments</p>
        </div>
      </div>

      <ShipmentStats shipments={transporterShipments} />

      <div className="flex flex-col gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shipments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="loading" onClick={() => setStatusFilter("loading")}>
              Loading
            </TabsTrigger>
            <TabsTrigger value="in transit" onClick={() => setStatusFilter("in transit")}>
              In Transit
            </TabsTrigger>
            <TabsTrigger value="delivered" onClick={() => setStatusFilter("delivered")}>
              Delivered
            </TabsTrigger>
          </TabsList>

          <TabsContent value={statusFilter} className="space-y-4">
            <ShipmentList shipments={filteredShipments} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
