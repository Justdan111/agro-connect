import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface RouteHistoryItem {
  date: string
  distance: string
  deliveries: number
  duration: string
  efficiency: string
}

interface RouteHistoryProps {
  history: RouteHistoryItem[]
}

export function RouteHistory({ history }: RouteHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Route History</CardTitle>
        <CardDescription>Your past route performance and statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Deliveries</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Efficiency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{new Date(item.date).toLocaleDateString()}</TableCell>
                <TableCell>{item.distance}</TableCell>
                <TableCell>{item.deliveries}</TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      Number.parseFloat(item.efficiency) >= 90
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-blue-100 text-blue-800 border-blue-300"
                    }
                  >
                    {item.efficiency}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
