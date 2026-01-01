import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Package, DollarSign, Calendar } from "lucide-react"

interface Job {
  id: string
  cargo: string
  quantity: string
  pickup: string
  pickupDate: string
  destination: string
  distance: string
  estimatedPayment: string
  priority: string
  status: string
  pickupLocation: { lat: number; lng: number }
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-green-100 text-green-800 border-green-300"
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{job.cargo}</h3>
            <p className="text-sm text-muted-foreground">{job.id}</p>
          </div>
          <Badge variant="outline" className={getPriorityColor(job.priority)}>
            {job.priority} Priority
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-start gap-3">
            <Package className="h-4 w-4 mt-1 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Quantity</p>
              <p className="text-sm font-medium">{job.quantity}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Pickup Date</p>
              <p className="text-sm font-medium">{new Date(job.pickupDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Pickup → Destination</p>
              <p className="text-sm font-medium">{job.pickup}</p>
              <p className="text-xs text-muted-foreground">→ {job.destination}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Distance:</span>
            <span className="text-sm font-medium">{job.distance}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-lg font-semibold">{job.estimatedPayment}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">Accept Job</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
