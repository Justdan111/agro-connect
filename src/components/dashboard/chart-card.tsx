import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { ResponsiveContainer } from "recharts"
import type { ReactElement, JSXElementConstructor } from "react"

interface ChartCardProps {
  title: string
  description: string
  config: Record<string, { label: string; color: string }>
  children: ReactElement<unknown, string | JSXElementConstructor<unknown>>
}

export function ChartCard({ title, description, config, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ChartContainer config={config} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
