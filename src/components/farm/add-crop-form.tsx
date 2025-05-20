import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export interface CropData {
  name: string;
  variety: string;
  type: string;
  plantedDate: string;
  harvestDate: string;
  status: string;
  quantity: number;
  unit: string;
  field: string;
  progress: number;
  healthStatus: string;
}

export function AddCropForm({ onSubmit }: { onSubmit: (cropData: CropData) => void }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    cropName: '',
    variety: '',
    cropType: 'vegetable',
    field: '',
    plantingDate: '',
    harvestDate: '',
    status: 'growing',
    quantity: '',
    unit: 'kg'
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    if (!formData.cropName || !formData.plantingDate || !formData.harvestDate || !formData.quantity) {
      alert('Please fill in all required fields')
      return
    }

    const cropData = {
      name: formData.cropName,
      variety: formData.variety || 'Standard',
      type: formData.cropType,
      plantedDate: formData.plantingDate,
      harvestDate: formData.harvestDate,
      status: formData.status,
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      field: formData.field || 'New Field',
      progress: 0,
      healthStatus: 'Good',
    }
    
    onSubmit(cropData)
    setOpen(false)
    
    // Reset form
    setFormData({
      cropName: '',
      variety: '',
      cropType: 'vegetable',
      field: '',
      plantingDate: '',
      harvestDate: '',
      status: 'growing',
      quantity: '',
      unit: 'kg'
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Crop
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Crop</DialogTitle>
          <DialogDescription>Enter the details of your new crop.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cropName">Crop Name *</Label>
              <Input 
                id="cropName" 
                value={formData.cropName}
                onChange={(e) => handleInputChange('cropName', e.target.value)}
                placeholder="e.g., Corn"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="variety">Variety</Label>
              <Input 
                id="variety" 
                value={formData.variety}
                onChange={(e) => handleInputChange('variety', e.target.value)}
                placeholder="e.g., Sweet Corn" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type</Label>
              <Select 
                value={formData.cropType} 
                onValueChange={(value) => handleInputChange('cropType', value)}
              >
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
              <Label htmlFor="field">Field</Label>
              <Input 
                id="field" 
                value={formData.field}
                onChange={(e) => handleInputChange('field', e.target.value)}
                placeholder="e.g., Field A" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plantingDate">Planting Date *</Label>
              <Input 
                id="plantingDate" 
                type="date" 
                value={formData.plantingDate}
                onChange={(e) => handleInputChange('plantingDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="harvestDate">Expected Harvest Date *</Label>
              <Input 
                id="harvestDate" 
                type="date" 
                value={formData.harvestDate}
                onChange={(e) => handleInputChange('harvestDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleInputChange('status', value)}
              >
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
              <Label htmlFor="quantity">Quantity *</Label>
              <div className="flex space-x-2">
                <Input 
                  id="quantity" 
                  type="number" 
                  min="0" 
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="Enter amount"
                />
                <Select 
                  value={formData.unit} 
                  onValueChange={(value) => handleInputChange('unit', value)}
                >
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
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Add Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}