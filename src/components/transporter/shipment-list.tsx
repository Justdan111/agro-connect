import { ShipmentCard } from "./shipment-card"
import { Card, CardContent } from "@/components/ui/card"
import { Package } from "lucide-react"

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

interface ShipmentListProps {
  shipments: Shipment[]
}

export function ShipmentList({ shipments }: ShipmentListProps) {
  if (shipments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No shipments found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {shipments.map((shipment) => (
        <ShipmentCard key={shipment.id} shipment={shipment} />
      ))}
    </div>
  )
}
