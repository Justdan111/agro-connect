import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, MapPin, DollarSign, Package } from "lucide-react"

interface Job {
  id: string
  distance: string
  estimatedPayment: string
}

interface JobStatsProps {
  jobs: Job[]
}

export function JobStats({ jobs }: JobStatsProps) {
  const totalDistance = jobs.reduce((sum, job) => sum + Number.parseInt(job.distance), 0)
  const totalEarnings = jobs.reduce((sum, job) => {
    const amount = Number.parseInt(job.estimatedPayment.replace("$", ""))
    return sum + amount
  }, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available Jobs</p>
              <p className="text-2xl font-bold">{jobs.length}</p>
            </div>
            <Package className="h-8 w-8 text-muted-foreground" />
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
              <p className="text-sm text-muted-foreground">Avg. Payment</p>
              <p className="text-2xl font-bold">${Math.round(totalEarnings / jobs.length)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <p className="text-2xl font-bold">${totalEarnings}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
