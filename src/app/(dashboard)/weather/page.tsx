"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import {
  AlertTriangle,
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Droplets,
  RefreshCw,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip,} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { toast } from "sonner"

// Mock weather data
const currentWeather = {
  location: "Green Acres Farm",
  temperature: 24,
  condition: "Sunny",
  humidity: 45,
  windSpeed: 8,
  precipitation: 0,
  pressure: 1012,
  visibility: 10,
  uvIndex: 6,
  lastUpdated: "2025-05-20T10:30:00Z",
}

const forecastData = [
  { day: "Today", date: "May 20", high: 24, low: 14, condition: "Sunny", humidity: 45, precipitation: 0, icon: Sun },
  {
    day: "Tomorrow",
    date: "May 21",
    high: 22,
    low: 13,
    condition: "Partly Cloudy",
    humidity: 50,
    precipitation: 10,
    icon: Cloud,
  },
  {
    day: "Wednesday",
    date: "May 22",
    high: 20,
    low: 12,
    condition: "Cloudy",
    humidity: 65,
    precipitation: 30,
    icon: Cloud,
  },
  {
    day: "Thursday",
    date: "May 23",
    high: 19,
    low: 11,
    condition: "Light Rain",
    humidity: 75,
    precipitation: 60,
    icon: CloudRain,
  },
  {
    day: "Friday",
    date: "May 24",
    high: 18,
    low: 10,
    condition: "Rain",
    humidity: 80,
    precipitation: 80,
    icon: CloudRain,
  },
  {
    day: "Saturday",
    date: "May 25",
    high: 20,
    low: 12,
    condition: "Partly Cloudy",
    humidity: 70,
    precipitation: 20,
    icon: Cloud,
  },
  { day: "Sunday", date: "May 26", high: 22, low: 13, condition: "Sunny", humidity: 55, precipitation: 0, icon: Sun },
]

const temperatureData = [
  { time: "12 AM", temp: 15 },
  { time: "3 AM", temp: 14 },
  { time: "6 AM", temp: 13 },
  { time: "9 AM", temp: 18 },
  { time: "12 PM", temp: 22 },
  { time: "3 PM", temp: 24 },
  { time: "6 PM", temp: 21 },
  { time: "9 PM", temp: 18 },
  { time: "12 AM", temp: 16 },
]

const precipitationData = [
  { month: "Jan", rainfall: 45, average: 50 },
  { month: "Feb", rainfall: 60, average: 55 },
  { month: "Mar", rainfall: 75, average: 70 },
  { month: "Apr", rainfall: 80, average: 75 },
  { month: "May", rainfall: 65, average: 60 },
  { month: "Jun", rainfall: 50, average: 45 },
  { month: "Jul", rainfall: 40, average: 35 },
  { month: "Aug", rainfall: 35, average: 30 },
  { month: "Sep", rainfall: 45, average: 40 },
  { month: "Oct", rainfall: 55, average: 50 },
  { month: "Nov", rainfall: 65, average: 60 },
  { month: "Dec", rainfall: 70, average: 65 },
]

const alerts = [
  {
    id: 1,
    type: "Frost Warning",
    description: "Temperatures expected to drop below freezing overnight. Protect sensitive crops.",
    severity: "high",
    date: "2025-05-23T00:00:00Z",
  },
  {
    id: 2,
    type: "Heavy Rain",
    description: "Heavy rainfall expected (30-40mm). Potential for localized flooding in low-lying areas.",
    severity: "medium",
    date: "2025-05-24T12:00:00Z",
  },
  {
    id: 3,
    type: "Wind Advisory",
    description: "Strong winds (40-50 km/h) expected. Secure loose equipment and structures.",
    severity: "medium",
    date: "2025-05-25T08:00:00Z",
  },
]

export default function WeatherPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [alertSettings, setAlertSettings] = useState({
    frost: true,
    heavyRain: true,
    drought: false,
    heatWave: true,
    strongWind: true,
    hail: false,
    email: true,
    sms: true,
    push: false,
  })

  const refreshWeather = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Weather Data Updated", {
        description: "Latest weather information has been loaded."
      })
    }, 1500)
  }

  const saveAlertSettings = () => {
    toast.success("Alert Settings Saved", {
      description: "Your weather alert preferences have been updated."
    })
  }

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes("rain")) return <CloudRain className="h-8 w-8 text-blue-500" />
    if (conditionLower.includes("cloud")) return <Cloud className="h-8 w-8 text-gray-500" />
    if (conditionLower.includes("sun")) return <Sun className="h-8 w-8 text-yellow-500" />
    if (conditionLower.includes("snow")) return <CloudSnow className="h-8 w-8 text-blue-200" />
    if (conditionLower.includes("thunder") || conditionLower.includes("lightning"))
      return <CloudLightning className="h-8 w-8 text-purple-500" />
    if (conditionLower.includes("drizzle")) return <CloudDrizzle className="h-8 w-8 text-blue-400" />
    return <Cloud className="h-8 w-8 text-gray-500" />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Weather & Alerts</h1>
          <p className="text-muted-foreground">Monitor weather conditions and receive alerts for your farm location.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={refreshWeather} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh weather data</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="historical">Historical</TabsTrigger>
        </TabsList>

        {/* Current Weather Tab */}
        <TabsContent value="current" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Current Weather</CardTitle>
                <CardDescription>
                  {currentWeather.location} • Last updated: {new Date(currentWeather.lastUpdated).toLocaleTimeString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getWeatherIcon(currentWeather.condition)}
                    <div>
                      <div className="text-4xl font-bold">{currentWeather.temperature}°C</div>
                      <div className="text-muted-foreground">{currentWeather.condition}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium">Humidity</div>
                        <div>{currentWeather.humidity}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Wind</div>
                        <div>{currentWeather.windSpeed} km/h</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CloudRain className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="text-sm font-medium">Precipitation</div>
                        <div>{currentWeather.precipitation} mm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Temperature (24h)</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    temp: {
                      label: "Temperature",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="temp"
                        stroke="var(--color-temp)"
                        strokeWidth={2}
                        name="Temperature (°C)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agricultural Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Soil Temperature</div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-red-500" />
                        <span className="text-xl font-bold">18°C</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Optimal for most crops</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Soil Moisture</div>
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-xl font-bold">65%</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Good moisture level</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Growing Degree Days</div>
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-orange-500" />
                        <span className="text-xl font-bold">450</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Season: 1250 (target: 2500)</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">UV Index</div>
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-yellow-500" />
                        <span className="text-xl font-bold">6</span>
                      </div>
                      <div className="text-xs text-muted-foreground">High - Protection needed</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Farming Recommendations</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Sun className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <span>Good conditions for field work and harvesting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Droplets className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span>Irrigation not needed for the next 48 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <span>Frost warning for Thursday night - protect sensitive crops</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Forecast Tab */}
        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Forecast</CardTitle>
              <CardDescription>Weather forecast for your farm location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {forecastData.map((day, index) => {
                  const Icon = day.icon
                  return (
                    <Card key={index} className="border-none shadow-none">
                      <CardContent className="p-2 text-center">
                        <div className="font-medium">{day.day}</div>
                        <div className="text-xs text-muted-foreground mb-2">{day.date}</div>
                        <Icon
                          className={`mx-auto h-8 w-8 ${
                            day.condition.toLowerCase().includes("sun")
                              ? "text-yellow-500"
                              : day.condition.toLowerCase().includes("rain")
                                ? "text-blue-500"
                                : "text-gray-500"
                          }`}
                        />
                        <div className="mt-2 text-sm">{day.condition}</div>
                        <div className="mt-1">
                          <span className="font-medium">{day.high}°</span> / {day.low}°
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center">
                            <Droplets className="h-3 w-3 mr-1" />
                            {day.precipitation}%
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Precipitation Forecast</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    precipitation: {
                      label: "Precipitation",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="precipitation" fill="var(--color-precipitation)" name="Precipitation (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Temperature Forecast</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    high: {
                      label: "High",
                      color: "hsl(var(--chart-1))",
                    },
                    low: {
                      label: "Low",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="high"
                        stroke="var(--color-high)"
                        strokeWidth={2}
                        name="High (°C)"
                      />
                      <Line type="monotone" dataKey="low" stroke="var(--color-low)" strokeWidth={2} name="Low (°C)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Weather Alerts</CardTitle>
                  <CardDescription>Current weather warnings for your area</CardDescription>
                </CardHeader>
                <CardContent>
                  {alerts.length > 0 ? (
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div
                            className={`p-2 rounded-full ${
                              alert.severity === "high"
                                ? "bg-red-100"
                                : alert.severity === "medium"
                                  ? "bg-yellow-100"
                                  : "bg-blue-100"
                            }`}
                          >
                            <AlertTriangle
                              className={`h-5 w-5 ${
                                alert.severity === "high"
                                  ? "text-red-500"
                                  : alert.severity === "medium"
                                    ? "text-yellow-500"
                                    : "text-blue-500"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{alert.type}</h4>
                              <Badge
                                variant="outline"
                                className={
                                  alert.severity === "high"
                                    ? "bg-red-100 text-red-800 border-red-300"
                                    : alert.severity === "medium"
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                      : "bg-blue-100 text-blue-800 border-blue-300"
                                }
                              >
                                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm">{alert.description}</p>
                            <p className="mt-2 text-xs text-muted-foreground">
                              Effective: {new Date(alert.date).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Sun className="h-12 w-12 text-yellow-500 mb-4" />
                      <h3 className="text-lg font-medium">No Active Alerts</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        There are currently no weather alerts for your location.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Crop-Specific Alerts</CardTitle>
                  <CardDescription>Weather impacts on your registered crops</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Corn (Field A)</h4>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                          Attention Needed
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm">
                        The upcoming frost on Thursday may affect your corn crop. Consider protective measures.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Recommendations
                        </Button>
                        <Button size="sm">Take Action</Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Wheat (Field B)</h4>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                          Optimal Conditions
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm">
                        Current and forecasted conditions are favorable for your wheat crop.
                      </p>
                      <div className="mt-3">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Soybeans (Field C)</h4>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                          Information
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm">
                        Heavy rain expected on Friday may impact field drainage. Monitor soil moisture levels.
                      </p>
                      <div className="mt-3">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Settings</CardTitle>
                  <CardDescription>Customize your weather alert preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Alert Types</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="frost-alert" className="flex-1">
                            Frost Warning
                          </Label>
                          <Switch
                            id="frost-alert"
                            checked={alertSettings.frost}
                            onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, frost: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="rain-alert" className="flex-1">
                            Heavy Rain
                          </Label>
                          <Switch
                            id="rain-alert"
                            checked={alertSettings.heavyRain}
                            onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, heavyRain: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="drought-alert" className="flex-1">
                            Drought Conditions
                          </Label>
                          <Switch
                            id="drought-alert"
                            checked={alertSettings.drought}
                            onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, drought: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="heat-alert" className="flex-1">
                            Heat Wave
                          </Label>
                          <Switch
                            id="heat-alert"
                            checked={alertSettings.heatWave}
                            onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, heatWave: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="wind-alert" className="flex-1">
                            Strong Wind
                          </Label>
                          <Switch
                            id="wind-alert"
                            checked={alertSettings.strongWind}
                            onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, strongWind: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="hail-alert" className="flex-1">
                            Hail
                          </Label>
                          <Switch
                            id="hail-alert"
                            checked={alertSettings.hail}
                            onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, hail: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Notification Methods</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notif" className="flex-1">
                            Email Notifications
                          </Label>
                          <Switch
                            id="email-notif"
                            checked={alertSettings.email}
                            onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, email: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-notif" className="flex-1">
                            SMS Notifications
                          </Label>
                          <Switch
                            id="sms-notif"
                            checked={alertSettings.sms}
                            onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, sms: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-notif" className="flex-1">
                            Push Notifications
                          </Label>
                          <Switch
                            id="push-notif"
                            checked={alertSettings.push}
                            onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, push: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Alert Threshold</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="alert-severity">Minimum Severity</Label>
                          <Select defaultValue="all">
                            <SelectTrigger>
                              <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Alerts</SelectItem>
                              <SelectItem value="medium">Medium and High</SelectItem>
                              <SelectItem value="high">High Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="alert-distance">Alert Radius</Label>
                          <Select defaultValue="10">
                            <SelectTrigger>
                              <SelectValue placeholder="Select distance" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 km</SelectItem>
                              <SelectItem value="10">10 km</SelectItem>
                              <SelectItem value="25">25 km</SelectItem>
                              <SelectItem value="50">50 km</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={saveAlertSettings} className="w-full">
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "Drought Warning", date: "Apr 15, 2025", status: "Expired" },
                      { type: "Heat Wave", date: "Apr 10, 2025", status: "Expired" },
                      { type: "Strong Wind", date: "Mar 28, 2025", status: "Expired" },
                    ].map((alert, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-medium">{alert.type}</p>
                          <p className="text-xs text-muted-foreground">{alert.date}</p>
                        </div>
                        <Badge variant="outline" className="bg-gray-100">
                          {alert.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Historical Tab */}
        <TabsContent value="historical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historical Weather Data</CardTitle>
              <CardDescription>Compare current conditions with historical averages</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  rainfall: {
                    label: "This Year",
                    color: "hsl(var(--chart-4))",
                  },
                  average: {
                    label: "Historical Average",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={precipitationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="rainfall" fill="var(--color-rainfall)" name="Rainfall (mm)" />
                    <Bar dataKey="average" fill="var(--color-average)" name="Historical Average (mm)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Weather Patterns</CardTitle>
                <CardDescription>Long-term weather trends for your location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Temperature Trends</h4>
                    <p className="text-sm mt-1">
                      Average temperatures have increased by 1.2°C over the past decade, with more extreme heat events.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Precipitation Patterns</h4>
                    <p className="text-sm mt-1">
                      Annual rainfall has remained stable, but distribution has changed with more intense rain events
                      and longer dry periods.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Growing Season</h4>
                    <p className="text-sm mt-1">
                      The growing season has extended by approximately 7 days over the past decade, with earlier spring
                      warming.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Climate Projections</CardTitle>
                <CardDescription>Future climate scenarios for agricultural planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Time Horizon</Label>
                    <Select defaultValue="2030">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2030">2030</SelectItem>
                        <SelectItem value="2050">2050</SelectItem>
                        <SelectItem value="2070">2070</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">Projected Changes (by 2030)</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Thermometer className="h-4 w-4 text-red-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Temperature</p>
                          <p className="text-sm">+1.5°C to +2.5°C increase in average temperatures</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CloudRain className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Precipitation</p>
                          <p className="text-sm">5-15% increase in winter precipitation, 10-20% decrease in summer</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Extreme Events</p>
                          <p className="text-sm">
                            Increased frequency of heat waves, heavy rainfall, and drought periods
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Agricultural Implications</h4>
                    <ul className="space-y-2 text-sm">
                      <li>Consider heat-tolerant crop varieties</li>
                      <li>Improve water management and irrigation systems</li>
                      <li>Implement soil conservation practices</li>
                      <li>Diversify crop selection to reduce risk</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
