"use client"

import type React from "react"

import { useState } from "react"
import { Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogForm } from "@/components/ui/dialog-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/ui/image-upload"
import { toast } from "sonner"


interface Crop {
  id: string
  name: string
  type: string
  plantingDate: string
  harvestDate: string
  status: string
  quantity: number
  unit: string
  image?: string
}

interface CropActionsProps {
  crop: Crop
  onUpdate: (updatedCrop: Crop) => void
  onDelete: (id: string) => void
  
}

export function CropActions({ crop, onUpdate, onDelete }: CropActionsProps) {
 
  const [viewCrop, setViewCrop] = useState<Crop | null>(null)
  const [editCrop, setEditCrop] = useState<Crop | null>(null)

  const handleUpdateCrop = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editCrop) return;
  
    const formData = new FormData(e.currentTarget);

    const updatedCrop: Crop = {
      ...editCrop,
      name: formData.get("cropName") as string,
      type: formData.get("cropType") as string,
      plantingDate: formData.get("plantingDate") as string,
      harvestDate: formData.get("harvestDate") as string,
      status: formData.get("status") as string,
      quantity: Number(formData.get("quantity")),
      unit: formData.get("unit") as string,
    }

    onUpdate(updatedCrop)
    setEditCrop(null)
    toast.success("Crop Updated", {
      description: `${updatedCrop.name} has been updated successfully.`
    })
  }

  const handleDeleteCrop = () => {
    onDelete(crop.id)
    toast.success("Crop Deleted", {
      description: "The crop has been deleted successfully."
    })
  }

  return (
    <div className="flex justify-end space-x-2">
      {/* View Crop Dialog */}
      <DialogForm
        title="Crop Details"
        trigger={
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        }
        isOpen={!!viewCrop && viewCrop.id === crop.id}
        onOpenChange={(open) => !open && setViewCrop(null)}
        submitLabel="Close"
        onSubmit={(e) => {
          e.preventDefault()
          setViewCrop(null)
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          {crop.image && (
            <div className="col-span-2 flex justify-center">
              <img
                src={crop.image || "/placeholder.svg"}
                alt={crop.name}
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
          <div>
            <p className="font-semibold">Name:</p>
            <p>{crop.name}</p>
          </div>
          <div>
            <p className="font-semibold">Type:</p>
            <p>{crop.type}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <p>{crop.status}</p>
          </div>
          <div>
            <p className="font-semibold">Quantity:</p>
            <p>
              {crop.quantity} {crop.unit}
            </p>
          </div>
          <div>
            <p className="font-semibold">Planting Date:</p>
            <p>{crop.plantingDate}</p>
          </div>
          <div>
            <p className="font-semibold">Harvest Date:</p>
            <p>{crop.harvestDate}</p>
          </div>
        </div>
      </DialogForm>

      {/* Edit Crop Dialog */}
      <DialogForm
        title="Edit Crop"
        trigger={
          <Button variant="ghost" size="icon" onClick={() => setEditCrop(crop)}>
            <Edit className="h-4 w-4" />
          </Button>
        }
        isOpen={!!editCrop && editCrop.id === crop.id}
        onOpenChange={(open) => !open && setEditCrop(null)}
        onSubmit={handleUpdateCrop}
      >
        {editCrop && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cropName">Crop Name</Label>
              <Input id="cropName" name="cropName" defaultValue={editCrop.name} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type</Label>
              <Select name="cropType" defaultValue={editCrop.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetable">Vegetable</SelectItem>
                  <SelectItem value="fruit">Fruit</SelectItem>
                  <SelectItem value="grain">Grain</SelectItem>
                  <SelectItem value="legume">Legume</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="plantingDate">Planting Date</Label>
              <Input id="plantingDate" name="plantingDate" type="date" defaultValue={editCrop.plantingDate} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="harvestDate">Expected Harvest Date</Label>
              <Input id="harvestDate" name="harvestDate" type="date" defaultValue={editCrop.harvestDate} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={editCrop.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planted">Planted</SelectItem>
                  <SelectItem value="growing">Growing</SelectItem>
                  <SelectItem value="ready">Ready for Harvest</SelectItem>
                  <SelectItem value="harvested">Harvested</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex space-x-2">
                <Input id="quantity" name="quantity" type="number" min="0" defaultValue={editCrop.quantity} required />
                <Select name="unit" defaultValue={editCrop.unit}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="ton">ton</SelectItem>
                    <SelectItem value="pieces">pieces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="cropImage">Crop Image</Label>
              <ImageUpload defaultImage={editCrop.image} />
            </div>
          </div>
        )}
      </DialogForm>

      {/* Delete Button */}
      <Button variant="ghost" size="icon" onClick={handleDeleteCrop}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
