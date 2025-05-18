"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Calendar, Clock, DollarSign, MapPin, Package, RefreshCw, Truck } from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

// Dummy data for charts
const earningsData = [
  { month: "Jan", earnings: 3200, target: 3000 },
  { month: "Feb", earnings: 3400, target: 3000 },
  { month: "Mar", earnings: 2900, target: 3000 },
  { month: "Apr", earnings: 3100, target: 3000 },
  { month: "May", earnings: 3500, target: 3000 },
  { month: "Jun", earnings: 3300, target: 3000 },
  { month: "Jul", earnings: 3600, target: 3000 },
  { month: "Aug", earnings: 3200, target: 3000 },
  { month: "Sep", earnings: 3400, target: 3000 },
  { month: "Oct", earnings: 3700, target: 3000 },
  { month: "Nov", earnings: 3500, target: 3000 },
  { month: "Dec", earnings: 3800, target: 3000 },
]

const jobTypeData = [
  { name: "Grain Transport", value: 45 },
  { name: "Produce Delivery", value: 25 },
  { name: "Livestock", value: 15 },
  { name: "Equipment", value: 10 },
  { name: "Other", value: 5 },
]

const upcomingJobs = [
  {
    id: 1,
    cargo: "Corn",
    date: "2025-05-18",
    pickup: "Green Acres Farm",
    destination: "AgriCorp Processing",
    distance: "120 km",
  },
  {
    id: 2,
    cargo: "Wheat",
    date: "2025-05-20",
    pickup: "Wheatfield Farms",
    destination: "Grain Storage Facility",
    distance: "85 km",
  },
  {
    id: 3,
    cargo: "Vegetables",
    date: "2025-05-22",
    pickup: "Fresh Produce Co.",
    destination: "FoodMart Distribution",
    distance: "65 km",
  },
]

const activeJobs = [
  {
    id: "JOB-001",
    cargo: "Corn",
    quantity: "5 tons",
    pickup: "Green Acres Farm",
    destination: "AgriCorp Processing",
    status: "In Transit",
    progress: 65,
  },
  {
    id: "JOB-002",
    cargo: "Wheat",
    quantity: "3 tons",
    pickup: "Wheatfield Farms",
    destination: "Grain Storage Facility",
    status: "Loading",
    progress: 25,
  },
]

export default function TransporterDashboard() {
  const [timeRange, setTimeRange] = useState("yearly")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transporter Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your logistics operations.</p>
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
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦280,650.75</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 in transit, 1 loading</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Jobs</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next job in 2 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distance Covered</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250 km</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earnings" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="jobs">Job Types</TabsTrigger>
            <TabsTrigger value="active">Active Jobs</TabsTrigger>
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
        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Track your earnings against targets</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  earnings: {
                    label: "Actual Earnings",
                    color: "hsl(var(--chart-1))",
                  },
                  target: {
                    label: "Target",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="earnings"
                      stroke="var(--color-earnings)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="var(--color-target)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Type Distribution</CardTitle>
              <CardDescription>Breakdown of your transport jobs by type</CardDescription>
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
                  <BarChart data={jobTypeData}>
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
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Jobs</CardTitle>
              <CardDescription>Currently active transport jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {activeJobs.map((job) => (
                  <div key={job.id} className="flex flex-col">
                    <div className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {job.cargo} ({job.quantity})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {job.pickup} → {job.destination}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            job.status === "In Transit"
                              ? "bg-blue-100 text-blue-800 border-blue-300"
                              : "bg-yellow-100 text-yellow-800 border-yellow-300"
                          }
                        >
                          {job.status}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="sr-only">View job</span>
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-agro-primary rounded-full"
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
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
            <CardTitle>Upcoming Jobs</CardTitle>
            <CardDescription>Your scheduled transport jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {upcomingJobs.map((job) => (
                <div key={job.id} className="flex items-center">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-agro-accent">
                    <Calendar className="h-5 w-5 text-agro-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{job.cargo}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.pickup} → {job.destination}
                    </p>
                  </div>
                  <div className="ml-auto text-sm">
                    {new Date(job.date).toLocaleDateString()} • {job.distance}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common logistics operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Truck className="mr-2 h-4 w-4" />
                Find Available Jobs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                Update Job Status
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                Update Location
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
