import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Transaction {
  id: string
  date: string
  amount: string
}

interface TransactionChartProps {
  transactions: Transaction[]
}

export function TransactionChart({ transactions }: TransactionChartProps) {
  // Group transactions by date
  const chartData = transactions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((txn) => ({
      date: new Date(txn.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      earnings: Number.parseInt(txn.amount.replace("$", "")),
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Trend</CardTitle>
        <CardDescription>Your earnings over time</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ChartContainer
          config={{
            earnings: {
              label: "Earnings",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="earnings" stroke="var(--color-earnings)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
