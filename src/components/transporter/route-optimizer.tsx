import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

interface Route {
  id: string
  name: string
  stops: Array<{
    order: number
    location: string
    type: string
    time: string
  }>
  distance: string
  estimatedTime: string
  vehicles: number
  status: string
}

interface RouteOptimizerProps {
  routes: Route[]
  selectedRoute: Route
}

export function RouteOptimizer({ routes, selectedRoute }: RouteOptimizerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Routes</CardTitle>
        <CardDescription>Select and optimize your delivery routes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="border rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold">{route.name}</h4>
                <p className="text-sm text-muted-foreground">{route.id}</p>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                {route.status}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="text-sm font-medium">{route.distance}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Est. Time</p>
                <p className="text-sm font-medium">{route.estimatedTime}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Stops</p>
                <p className="text-sm font-medium">{route.stops.length} locations</p>
              </div>
            </div>

            <div className="space-y-2">
              {route.stops.map((stop) => (
                <div key={stop.order} className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-xs font-medium">
                      {stop.order}
                    </span>
                  </div>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <span className="font-medium">{stop.location}</span>
                    <span className="text-muted-foreground ml-2">({stop.type})</span>
                  </div>
                  <span className="text-muted-foreground">{stop.time}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
