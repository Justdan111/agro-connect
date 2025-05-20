"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Calendar, ChevronRight, Leaf, RefreshCw, Search, Sprout } from "lucide-react"
import { AddCropForm, CropData } from "@/components/farm/add-crop-form"
import { AddTaskForm, TaskData } from "@/components/farm/add-task-form"
import { useState } from "react"

// Import the form components


// Initial dummy data for crops
const initialCrops = [
  {
    id: 1,
    name: "Corn",
    variety: "Sweet Corn",
    field: "Field A",
    plantedDate: "2025-03-15",
    harvestDate: "2025-06-15",
    status: "Growing",
    progress: 65,
    healthStatus: "Good",
    type: "grain",
    quantity: 1000,
    unit: "kg",
  },
  {
    id: 2,
    name: "Wheat",
    variety: "Hard Red Winter",
    field: "Field B",
    plantedDate: "2025-02-20",
    harvestDate: "2025-06-28",
    status: "Growing",
    progress: 75,
    healthStatus: "Warning",
    type: "grain",
    quantity: 800,
    unit: "kg",
  },
  {
    id: 3,
    name: "Soybeans",
    variety: "Round-Up Ready",
    field: "Field C",
    plantedDate: "2025-04-05",
    harvestDate: "2025-07-10",
    status: "Growing",
    progress: 45,
    healthStatus: "Good",
    type: "legume",
    quantity: 600,
    unit: "kg",
  },
  {
    id: 4,
    name: "Rice",
    variety: "Long Grain",
    field: "Field D",
    plantedDate: "2025-04-10",
    harvestDate: "2025-08-15",
    status: "Growing",
    progress: 40,
    healthStatus: "Good",
    type: "grain",
    quantity: 1200,
    unit: "kg",
  },
]

// Initial dummy data for tasks
const initialTasks = [
  {
    id: 1,
    title: "Apply fertilizer to Field A",
    description: "Apply nitrogen-rich fertilizer to corn crop",
    crop: "Corn",
    dueDate: "2025-05-20",
    status: "Pending",
    priority: "High",
    assignedTo: "John Smith",
  },
  {
    id: 2,
    title: "Inspect Field B for pests",
    description: "Check wheat crop for aphids and other pests",
    crop: "Wheat",
    dueDate: "2025-05-18",
    status: "Completed",
    priority: "Medium",
    assignedTo: "Jane Doe",
  },
  {
    id: 3,
    title: "Irrigation maintenance",
    description: "Check and repair irrigation systems",
    crop: "All",
    dueDate: "2025-05-25",
    status: "Pending",
    priority: "Medium",
    assignedTo: "Mike Johnson",
  },
  {
    id: 4,
    title: "Prepare harvesting equipment",
    description: "Service and prepare combine harvester",
    crop: "Corn",
    dueDate: "2025-06-01",
    status: "Pending",
    priority: "Low",
    assignedTo: "Tom Wilson",
  },
]

export default function FarmManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [crops, setCrops] = useState(initialCrops)
  const [tasks, setTasks] = useState(initialTasks)

  const filteredCrops = crops.filter(
    (crop) =>
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.field.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCrop = (cropData: CropData) => {
    const newCrop = {
      ...cropData,
      id: crops.length > 0 ? Math.max(...crops.map(c => c.id)) + 1 : 1,
    }
    setCrops([...crops, newCrop])
  }

  const handleAddTask = (taskData: TaskData) => {
    const newTask = {
      ...taskData,
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    }
    setTasks([...tasks, newTask])
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farm Management</h1>
          <p className="text-muted-foreground">Manage your crops, tasks, and farm resources.</p>
        </div>
        <div className="flex items-center gap-2">
          <AddCropForm onSubmit={handleAddCrop} />
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh data</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="crops" className="space-y-4">
        <TabsList>
          <TabsTrigger value="crops">Crops</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="crops" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCrops.map((crop) => (
              <Card key={crop.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{crop.name}</CardTitle>
                      <CardDescription>{crop.variety}</CardDescription>
                    </div>
                    {crop.healthStatus === "Warning" && (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Attention Needed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{crop.field}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Planted:</span>
                      <span>{new Date(crop.plantedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Expected Harvest:</span>
                      <span>{new Date(crop.harvestDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span>{crop.quantity} {crop.unit}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span>Growth Progress</span>
                        <span>{crop.progress}%</span>
                      </div>
                      <Progress value={crop.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                All
              </Button>
              <Button variant="outline" size="sm">
                Pending
              </Button>
              <Button variant="outline" size="sm">
                Completed
              </Button>
            </div>
            <AddTaskForm onSubmit={handleAddTask} crops={crops.map(crop => ({ id: crop.id.toString(), name: crop.name }))} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Farm Tasks</CardTitle>
              <CardDescription>Manage and track your farm tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.crop}</TableCell>
                      <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            task.priority === "High"
                              ? "bg-red-100 text-red-800 border-red-300"
                              : task.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                                : "bg-green-100 text-green-800 border-green-300"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            task.status === "Completed"
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-blue-100 text-blue-800 border-blue-300"
                          }
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Farm Calendar</CardTitle>
              <CardDescription>View and manage your farm schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-96 items-center justify-center border rounded-md p-4">
                <div className="text-center">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Farm Calendar</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    View your planting, harvesting, and task schedule in a calendar view.
                  </p>
                  <Button className="mt-4" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Crop Health Monitoring</CardTitle>
            <CardDescription>AI-powered insights for your crops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">Potential Pest Issue Detected</h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI system has detected potential aphid infestation in your wheat crop (Field B). Early
                    intervention is recommended.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm">Get Treatment Recommendations</Button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Sprout className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">Optimal Growth Conditions</h4>
                  <p className="text-sm text-muted-foreground">
                    Your corn crop is showing excellent growth patterns. Current conditions are optimal for development
                    at this stage.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline">
                      View Growth Analysis
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Activities</CardTitle>
            <CardDescription>Your scheduled farm activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.filter(task => task.status === "Pending").slice(0, 4).map((task) => (
                <div key={task.id} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Leaf className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(task.dueDate).toLocaleDateString()} • {task.crop}
                    </p>
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