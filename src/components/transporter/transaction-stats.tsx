import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react"

interface Transaction {
  id: string
  amount: string
  status: string
}

interface TransactionStatsProps {
  transactions: Transaction[]
}

export function TransactionStats({ transactions }: TransactionStatsProps) {
  const totalEarnings = transactions.reduce((sum, txn) => {
    const amount = Number.parseInt(txn.amount.replace("$", ""))
    return sum + amount
  }, 0)

  const completed = transactions.filter((t) => t.status === "Completed").length
  const pending = transactions.filter((t) => t.status === "Pending").length
  const avgTransaction = Math.round(totalEarnings / transactions.length)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <p className="text-2xl font-bold">${totalEarnings}</p>
            </div>
            <DollarSign className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">{completed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{pending}</p>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Transaction</p>
              <p className="text-2xl font-bold">${avgTransaction}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
