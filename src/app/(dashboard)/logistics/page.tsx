"use client"

import { CardDescription } from "@/components/ui/card"

import { useState } from "react"
import { Plus, Truck, Calendar, MapPin, Search, Filter, Package, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { NewShipmentDialog } from "@/components/logistics/new-shipment-dialog"
import { AddTransporterDialog } from "@/components/logistics/add-transporter-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dummy data for shipments
const shipments = [
  {
    id: "SHP-001",
    product: "Corn",
    quantity: "5 tons",
    pickup: "Green Acres Farm",
    destination: "FoodCorp Processing",
    status: "In Transit",
    transporter: "FastHaul Logistics",
    departureDate: "2025-05-15",
    estimatedArrival: "2025-05-16",
    distance: "120 km",
  },
  {
    id: "SHP-002",
    product: "Wheat",
    quantity: "3 tons",
    pickup: "Wheatfield Farms",
    destination: "Grain Storage Facility",
    status: "Scheduled",
    transporter: "AgriTrans",
    departureDate: "2025-05-18",
    estimatedArrival: "2025-05-19",
    distance: "85 km",
  },
  {
    id: "SHP-003",
    product: "Soybeans",
    quantity: "4 tons",
    pickup: "SoyGrow Farms",
    destination: "OilPress Inc.",
    status: "Delivered",
    transporter: "FastHaul Logistics",
    departureDate: "2025-05-10",
    estimatedArrival: "2025-05-11",
    distance: "95 km",
  },
  {
    id: "SHP-004",
    product: "Rice",
    quantity: "2 tons",
    pickup: "Delta Rice Farms",
    destination: "Rice Processing Plant",
    status: "Cancelled",
    transporter: "AgriTrans",
    departureDate: "2025-05-12",
    estimatedArrival: "2025-05-13",
    distance: "150 km",
  },
]

// Dummy data for transporters
const transporters = [
  {
    id: 1,
    name: "FastHaul Logistics",
    rating: 4.8,
    reviews: 56,
    vehicleTypes: ["Truck", "Van", "Refrigerated"],
    serviceArea: "150 km radius",
    image: "/images/transporter.webp?height=100&width=100",
  },
  {
    id: 2,
    name: "AgriTrans",
    rating: 4.6,
    reviews: 42,
    vehicleTypes: ["Truck", "Trailer"],
    serviceArea: "200 km radius",
    image: "/images/transporter.webp?height=100&width=100",
  },
  {
    id: 3,
    name: "FarmFreight",
    rating: 4.9,
    reviews: 38,
    vehicleTypes: ["Truck", "Refrigerated", "Specialized"],
    serviceArea: "100 km radius",
    image: "/images/transporter.webp?height=100&width=100",
  },
]

export default function LogisticsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter] = useState<string>("all")


  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.transporter.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || shipment.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logistics</h1>
          <p className="text-muted-foreground">Manage your shipments and transportation needs.</p>
        </div>
        <div className="flex items-center gap-2">
          <NewShipmentDialog />
        </div>
      </div>

      <Tabs defaultValue="shipments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="transporters">Transporters</TabsTrigger>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
        </TabsList>
        <TabsContent value="shipments" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shipments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => console.log("Filter by status")}>
                <Filter className="h-4 w-4" />
                <span className="sr-only">More filters</span>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Shipments</CardTitle>
              <CardDescription>View and manage your product shipments</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Transporter</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.id}</TableCell>
                      <TableCell>
                        {shipment.product} ({shipment.quantity})
                      </TableCell>
                      <TableCell>{shipment.pickup}</TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell>{shipment.transporter}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            shipment.status === "Delivered"
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : shipment.status === "In Transit"
                                ? "bg-blue-100 text-blue-800 border border-blue-300"
                                : shipment.status === "Scheduled"
                                  ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                  : "bg-red-100 text-red-800 border border-red-300"
                          }`}
                        >
                          {shipment.status}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(shipment.departureDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transporters" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transporters..." className="pl-8" />
            </div>
            <AddTransporterDialog />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transporters.map((transporter) => (
              <Card key={transporter.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={transporter.image || "/placeholder.svg"}
                      alt={transporter.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{transporter.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{transporter.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{transporter.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <Truck className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Vehicle Types</p>
                        <p className="text-sm text-muted-foreground">{transporter.vehicleTypes.join(", ")}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Service Area</p>
                        <p className="text-sm text-muted-foreground">{transporter.serviceArea}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1" onClick={() => console.log("Contact Transporter")}>
                      Contact
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => console.log("View Transporter Details")}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Shipment Tracking</CardTitle>
              <CardDescription>Track your shipments in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[400px] border rounded-md p-4">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Shipment Tracking Map</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select a shipment to view its real-time location and status.
                  </p>
                  <div className="mt-4 flex gap-2 justify-center">
                    {/* Select component goes here */}
                    <Button variant="outline" onClick={() => console.log("Track Shipment")}>
                      Track
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Pickups</CardTitle>
            <CardDescription>Scheduled pickups for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shipments
                .filter((shipment) => shipment.status === "Scheduled")
                .map((shipment) => (
                  <div key={shipment.id} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-agro-accent">
                      <Calendar className="h-5 w-5 text-agro-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {shipment.product} ({shipment.quantity})
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(shipment.departureDate).toLocaleDateString()} • {shipment.pickup}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>In Transit</CardTitle>
            <CardDescription>Currently moving shipments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shipments
                .filter((shipment) => shipment.status === "In Transit")
                .map((shipment) => (
                  <div key={shipment.id} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Truck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {shipment.product} ({shipment.quantity})
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ETA: {new Date(shipment.estimatedArrival).toLocaleDateString()} • {shipment.destination}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common logistics operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => console.log("Create New Shipment")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Shipment
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => console.log("Find Transporters")}
              >
                <Truck className="mr-2 h-4 w-4" />
                Find Transporters
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => console.log("Manage Inventory")}
              >
                <Package className="mr-2 h-4 w-4" />
                Manage Inventory
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => console.log("View Delivery History")}
              >
                <Clock className="mr-2 h-4 w-4" />
                View Delivery History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
