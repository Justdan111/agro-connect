import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Truck, Clock } from "lucide-react"

interface Shipment {
  id: string
  cargo: string
  quantity: string
  pickup: string
  destination: string
  status: string
  progress: number
  distance: string
  estimatedArrival: string
}

interface ShipmentCardProps {
  shipment: Shipment
}

export function ShipmentCard({ shipment }: ShipmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Loading":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{shipment.cargo}</h3>
            <p className="text-sm text-muted-foreground">{shipment.id}</p>
          </div>
          <Badge variant="outline" className={getStatusColor(shipment.status)}>
            {shipment.status}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{shipment.quantity}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{shipment.pickup}</p>
              <p className="text-xs text-muted-foreground">→ {shipment.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">ETA: {new Date(shipment.estimatedArrival).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{shipment.progress}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-agro-primary rounded-full transition-all"
              style={{ width: `${shipment.progress}%` }}
            ></div>
          </div>
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          Update Status
        </Button>
      </CardContent>
    </Card>
  )
}
