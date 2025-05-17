"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DollarSign, Leaf, Package, RefreshCw, ShoppingCart } from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { ChartCard } from "@/components/dashboard/chart-card"


import { CalendarItem } from "./calender-item"
import { ListItem } from "./list-item"
import { StatCard } from "./stats-card"
import { revenueData, cropData, recentOrders, upcomingHarvests, weatherForecast } from "@/data/dashboard-data"

export default function FarmerDashboard() {
  const [timeRange, setTimeRange] = useState("yearly")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your farm's performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh data</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$45,231.89" description="+20.1% from last month" icon={DollarSign} />
        <StatCard title="Active Crops" value="5" description="2 harvesting soon" icon={Leaf} />
        <StatCard title="Pending Orders" value="12" description="3 require action" icon={ShoppingCart} />
        <StatCard title="Inventory Value" value="$12,234.00" description="15 tons in storage" icon={Package} />
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <TabsContent value="revenue" className="space-y-4">
          <ChartCard
            title="Revenue Overview"
            description="Compare your revenue with previous periods"
            config={{
              revenue: {
                label: "This Year",
                color: "hsl(var(--chart-1))",
              },
              lastYear: {
                label: "Last Year",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="lastYear" stroke="var(--color-lastYear)" strokeWidth={2} />
            </LineChart>
          </ChartCard>
        </TabsContent>
        <TabsContent value="crops" className="space-y-4">
          <ChartCard
            title="Crop Distribution"
            description="Breakdown of your current crop allocation"
            config={{
              value: {
                label: "Percentage",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <BarChart data={cropData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="value" fill="var(--color-value)" />
            </BarChart>
          </ChartCard>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Recent orders and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentOrders.map((order) => (
                  <ListItem
                    key={order.id}
                    title={order.buyer}
                    subtitle={`${order.crop} - ${order.quantity}`}
                    status={order.status}
                    statusColor={
                      order.status === "Delivered"
                        ? "text-green-500"
                        : order.status === "In Transit"
                          ? "text-blue-500"
                          : "text-yellow-500"
                    }
                    onClick={() => console.log(`View order ${order.id}`)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Harvests</CardTitle>
            <CardDescription>Monitor your upcoming harvests and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {upcomingHarvests.map((harvest) => (
                <CalendarItem
                  key={harvest.id}
                  title={harvest.crop}
                  subtitle={`${harvest.area} - ${new Date(harvest.date).toLocaleDateString()}`}
                  status={harvest.status}
                  statusColor={harvest.status === "On Track" ? "text-green-500" : "text-yellow-500"}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Weather Forecast</CardTitle>
            <CardDescription>7-day forecast for your farm location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weatherForecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="w-24">
                    <p className="text-sm font-medium">{day.day}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{day.condition}</span>
                  </div>
                  <div className="text-sm">{day.temp}</div>
                  <div className="text-sm text-muted-foreground">{day.humidity}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
