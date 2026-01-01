import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Truck, CheckCircle, Clock } from "lucide-react"

interface Shipment {
  id: string
  status: string
}

interface ShipmentStatsProps {
  shipments: Shipment[]
}

export function ShipmentStats({ shipments }: ShipmentStatsProps) {
  const inTransit = shipments.filter((s) => s.status === "In Transit").length
  const loading = shipments.filter((s) => s.status === "Loading").length
  const delivered = shipments.filter((s) => s.status === "Delivered").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Shipments</p>
              <p className="text-2xl font-bold">{shipments.length}</p>
            </div>
            <Truck className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Transit</p>
              <p className="text-2xl font-bold">{inTransit}</p>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Loading</p>
              <p className="text-2xl font-bold">{loading}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Delivered</p>
              <p className="text-2xl font-bold">{delivered}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
