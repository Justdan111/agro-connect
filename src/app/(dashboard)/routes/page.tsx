"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin } from "lucide-react"
import { RouteOptimizer } from "@/components/transporter/route-optimizer"
import { RouteSummary } from "@/components/transporter/route-summary"
import { RouteHistory } from "@/components/transporter/route-history"

// Dummy route data
const currentRoutes = [
  {
    id: "ROUTE-001",
    name: "Morning Pickup Route",
    stops: [
      { order: 1, location: "Green Acres Farm", type: "pickup", time: "08:00" },
      { order: 2, location: "AgriCorp Processing", type: "delivery", time: "10:30" },
    ],
    distance: "120 km",
    estimatedTime: "2.5 hours",
    vehicles: 1,
    status: "Active",
  },
  {
    id: "ROUTE-002",
    name: "Afternoon Route",
    stops: [
      { order: 1, location: "Wheatfield Farms", type: "pickup", time: "14:00" },
      { order: 2, location: "Grain Storage Facility", type: "delivery", time: "15:30" },
    ],
    distance: "85 km",
    estimatedTime: "1.5 hours",
    vehicles: 1,
    status: "Planned",
  },
]

const routeHistory = [
  {
    date: "2025-05-14",
    distance: "245 km",
    deliveries: 3,
    duration: "4 hours 30 min",
    efficiency: "92%",
  },
  {
    date: "2025-05-13",
    distance: "198 km",
    deliveries: 2,
    duration: "3 hours 45 min",
    efficiency: "88%",
  },
  {
    date: "2025-05-12",
    distance: "312 km",
    deliveries: 4,
    duration: "5 hours 30 min",
    efficiency: "95%",
  },
]

export default function RoutePlanningPage() {
  const [selectedRoute, setSelectedRoute] = useState(currentRoutes[0])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Route Planning</h1>
        <p className="text-muted-foreground">Optimize and manage your delivery routes</p>
      </div>

      <RouteSummary routes={currentRoutes} />

      <Tabs defaultValue="planner" className="space-y-4">
        <TabsList>
          <TabsTrigger value="planner">Route Planner</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="planner" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <RouteOptimizer routes={currentRoutes} selectedRoute={selectedRoute} />
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Route Details</CardTitle>
                  <CardDescription>Selected route information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedRoute && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Name</p>
                        <p className="text-sm font-semibold">{selectedRoute.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Distance</p>
                        <p className="text-sm font-semibold">{selectedRoute.distance}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Estimated Time</p>
                        <p className="text-sm font-semibold">{selectedRoute.estimatedTime}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Stops</p>
                        <p className="text-sm font-semibold">{selectedRoute.stops.length} locations</p>
                      </div>
                      <Button className="w-full">Start Route</Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Map</CardTitle>
              <CardDescription>Visual representation of your delivery route</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[500px] border rounded-md bg-slate-50">
                <MapPin className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Map Integration Coming Soon</h3>
                <p className="text-sm text-muted-foreground">Route map visualization will be available here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <RouteHistory history={routeHistory} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
