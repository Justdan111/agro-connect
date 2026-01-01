import { Card, CardContent } from "@/components/ui/card"
import { Navigation, MapPin, Clock, Truck } from "lucide-react"

interface Route {
  id: string
  name: string
  distance: string
  estimatedTime: string
  vehicles: number
  status: string
}

interface RouteSummaryProps {
  routes: Route[]
}

export function RouteSummary({ routes }: RouteSummaryProps) {
  const activeRoutes = routes.filter((r) => r.status === "Active").length
  const totalDistance = routes.reduce((sum, r) => sum + Number.parseInt(r.distance), 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Routes</p>
              <p className="text-2xl font-bold">{routes.length}</p>
            </div>
            <Navigation className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Routes</p>
              <p className="text-2xl font-bold">{activeRoutes}</p>
            </div>
            <Truck className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Distance</p>
              <p className="text-2xl font-bold">{totalDistance} km</p>
            </div>
            <MapPin className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Route Time</p>
              <p className="text-2xl font-bold">3h 30m</p>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
