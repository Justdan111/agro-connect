import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TransactionsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-20 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
      </div>

      <Card>
        <CardContent className="p-6 h-64">
          <Skeleton className="w-full h-full" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="mb-4">
                <Skeleton className="h-10 w-full mb-2" />
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
