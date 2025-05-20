import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export interface TaskData {
  title: string;
  description: string;
  crop: string;
  dueDate: string;
  status: string;
  priority: string;
  assignedTo: string;
}

export function AddTaskForm({ onSubmit, crops = [] }: { onSubmit: (task: TaskData) => void, crops: { id: string; name: string; }[] }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    taskTitle: '',
    description: '',
    crop: 'All',
    dueDate: '',
    taskStatus: 'Pending',
    priority: 'Medium',
    assignedTo: ''
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    if (!formData.taskTitle || !formData.dueDate) {
      alert('Please fill in all required fields')
      return
    }

    const taskData = {
      title: formData.taskTitle,
      description: formData.description,
      crop: formData.crop,
      dueDate: formData.dueDate,
      status: formData.taskStatus,
      priority: formData.priority,
      assignedTo: formData.assignedTo,
    }
    
    onSubmit(taskData)
    setOpen(false)
    
    // Reset form
    setFormData({
      taskTitle: '',
      description: '',
      crop: 'All',
      dueDate: '',
      taskStatus: 'Pending',
      priority: 'Medium',
      assignedTo: ''
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Enter the details of your new farm task.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="taskTitle">Task Title *</Label>
              <Input 
                id="taskTitle" 
                value={formData.taskTitle}
                onChange={(e) => handleInputChange('taskTitle', e.target.value)}
                placeholder="Enter task title"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                rows={3} 
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter task description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop">Related Crop</Label>
              <Select 
                value={formData.crop} 
                onValueChange={(value) => handleInputChange('crop', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Crops</SelectItem>
                  {crops.map((crop) => (
                    <SelectItem key={crop.id} value={crop.name}>
                      {crop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input 
                id="dueDate" 
                type="date" 
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taskStatus">Status</Label>
              <Select 
                value={formData.taskStatus} 
                onValueChange={(value) => handleInputChange('taskStatus', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => handleInputChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Input 
                id="assignedTo" 
                value={formData.assignedTo}
                onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                placeholder="Enter name (optional)" 
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}