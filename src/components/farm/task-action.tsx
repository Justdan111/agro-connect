"use client"

import type React from "react"

import { useState } from "react"
import { Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogForm } from "@/components/ui/dialog-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"


interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  status: string
  priority: string
  assignedTo?: string
}

interface TaskActionsProps {
  task: Task
  onUpdate: (updatedTask: Task) => void
  onDelete: (id: string) => void
}

export function TaskActions({ task, onUpdate, onDelete }: TaskActionsProps) {
  
  const [viewTask, setViewTask] = useState<Task | null>(null)
  const [editTask, setEditTask] = useState<Task | null>(null)

  const handleUpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editTask) return

    const formData = new FormData(e.currentTarget)

    const updatedTask: Task = {
      ...editTask,
      title: formData.get("taskTitle") as string,
      description: formData.get("description") as string,
      dueDate: formData.get("dueDate") as string,
      status: formData.get("taskStatus") as string,
      priority: formData.get("priority") as string,
      assignedTo: formData.get("assignedTo") as string,
    }

    onUpdate(updatedTask)
    setEditTask(null)
    toast({
      title: "Task Updated",
      description: `${updatedTask.title} has been updated successfully.`,
    })
  }

  const handleDeleteTask = () => {
    onDelete(task.id)
    toast({
      title: "Task Deleted",
      description: "The task has been deleted successfully.",
    })
  }

  return (
    <div className="flex justify-end space-x-2">
      {/* View Task Dialog */}
      <DialogForm
        title="Task Details"
        trigger={
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        }
        isOpen={!!viewTask && viewTask.id === task.id}
        onOpenChange={(open) => !open && setViewTask(null)}
        submitLabel="Close"
        onSubmit={(e) => {
          e.preventDefault()
          setViewTask(null)
        }}
      >
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Title:</p>
            <p>{task.title}</p>
          </div>
          <div>
            <p className="font-semibold">Description:</p>
            <p>{task.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Due Date:</p>
              <p>{task.dueDate}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p>{task.status}</p>
            </div>
            <div>
              <p className="font-semibold">Priority:</p>
              <p>{task.priority}</p>
            </div>
            <div>
              <p className="font-semibold">Assigned To:</p>
              <p>{task.assignedTo || "Unassigned"}</p>
            </div>
          </div>
        </div>
      </DialogForm>

      {/* Edit Task Dialog */}
      <DialogForm
        title="Edit Task"
        trigger={
          <Button variant="ghost" size="icon" onClick={() => setEditTask(task)}>
            <Edit className="h-4 w-4" />
          </Button>
        }
        isOpen={!!editTask && editTask.id === task.id}
        onOpenChange={(open) => !open && setEditTask(null)}
        onSubmit={handleUpdateTask}
      >
        {editTask && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="taskTitle">Task Title</Label>
              <Input id="taskTitle" name="taskTitle" defaultValue={editTask.title} required />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={3} defaultValue={editTask.description} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" name="dueDate" type="date" defaultValue={editTask.dueDate} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taskStatus">Status</Label>
              <Select name="taskStatus" defaultValue={editTask.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" defaultValue={editTask.priority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To</Label>
              <Input id="assignedTo" name="assignedTo" defaultValue={editTask.assignedTo} placeholder="Optional" />
            </div>
          </div>
        )}
      </DialogForm>

      {/* Delete Button */}
      <Button variant="ghost" size="icon" onClick={handleDeleteTask}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
