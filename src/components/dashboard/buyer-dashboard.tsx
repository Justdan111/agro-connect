"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Calendar, DollarSign, Package, RefreshCw, ShoppingCart, TrendingUp } from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

// Dummy data for charts
const spendingData = [
  { month: "Jan", spending: 3200, budget: 4000 },
  { month: "Feb", spending: 4100, budget: 4000 },
  { month: "Mar", spending: 3800, budget: 4000 },
  { month: "Apr", spending: 3700, budget: 4000 },
  { month: "May", spending: 4200, budget: 4000 },
  { month: "Jun", spending: 3900, budget: 4000 },
  { month: "Jul", spending: 3600, budget: 4000 },
  { month: "Aug", spending: 3500, budget: 4000 },
  { month: "Sep", spending: 3800, budget: 4000 },
  { month: "Oct", spending: 4100, budget: 4000 },
  { month: "Nov", spending: 4300, budget: 4000 },
  { month: "Dec", spending: 3900, budget: 4000 },
]

const categoryData = [
  { name: "Grains", value: 45 },
  { name: "Vegetables", value: 25 },
  { name: "Fruits", value: 15 },
  { name: "Dairy", value: 10 },
  { name: "Other", value: 5 },
]

const upcomingDeliveries = [
  { id: 1, product: "Corn", date: "2025-05-20", quantity: "5 tons", status: "On Schedule" },
  { id: 2, product: "Wheat", date: "2025-05-25", quantity: "3 tons", status: "Delayed" },
  { id: 3, product: "Vegetables", date: "2025-05-18", quantity: "500 kg", status: "On Schedule" },
]

const recentOrders = [
  {
    id: "ORD-001",
    seller: "Green Acres Farm",
    product: "Corn",
    quantity: "5 tons",
    status: "Processing",
    date: "2025-05-15",
  },
  {
    id: "ORD-002",
    seller: "Wheatfield Farms",
    product: "Wheat",
    quantity: "3 tons",
    status: "Confirmed",
    date: "2025-05-14",
  },
  {
    id: "ORD-003",
    seller: "Fresh Produce Co.",
    product: "Vegetables",
    quantity: "500 kg",
    status: "Shipped",
    date: "2025-05-12",
  },
]

export default function BuyerDashboard() {
  const [timeRange, setTimeRange] = useState("yearly")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your procurement activities.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh data</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦380,450.25</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 awaiting delivery</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deliveries</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">1 scheduled for today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">3 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="spending" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
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
        <TabsContent value="spending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending Overview</CardTitle>
              <CardDescription>Track your procurement spending against budget</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  spending: {
                    label: "Actual Spending",
                    color: "hsl(var(--chart-1))",
                  },
                  budget: {
                    label: "Budget",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="spending"
                      stroke="var(--color-spending)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="budget"
                      stroke="var(--color-budget)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Breakdown of your procurement by product category</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  value: {
                    label: "Percentage",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" fill="var(--color-value)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your recent purchase orders and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{order.seller}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.product} - {order.quantity}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : order.status === "Confirmed"
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-yellow-100 text-yellow-800 border-yellow-300"
                        }
                      >
                        {order.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">View order</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Deliveries</CardTitle>
            <CardDescription>Track your incoming product deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {upcomingDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-agro-accent">
                    <Calendar className="h-5 w-5 text-agro-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{delivery.product}</p>
                    <p className="text-sm text-muted-foreground">
                      {delivery.quantity} - {new Date(delivery.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`ml-auto text-xs ${
                      delivery.status === "On Schedule" ? "text-green-500" : "text-yellow-500"
                    }`}
                  >
                    {delivery.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
            <CardDescription>Current price trends for key commodities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { product: "Corn", price: "$180/ton", trend: "+2.5%", status: "rising" },
                { product: "Wheat", price: "$210/ton", trend: "-1.2%", status: "falling" },
                { product: "Soybeans", price: "$390/ton", trend: "+0.8%", status: "rising" },
                { product: "Rice", price: "$420/ton", trend: "+3.1%", status: "rising" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.product}</p>
                  </div>
                  <div className="text-sm">{item.price}</div>
                  <div className={`text-sm ${item.status === "rising" ? "text-green-500" : "text-red-500"}`}>
                    {item.trend}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
