"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogForm } from "@/components/ui/dialog-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export function AddTransporterDialog() {
  const [name, setName] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [serviceArea, setServiceArea] = useState("")
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([])
  const [description, setDescription] = useState("")

  const handleVehicleTypeChange = (type: string) => {
    setVehicleTypes((current) => {
      if (current.includes(type)) {
        return current.filter((t) => t !== type)
      } else {
        return [...current, type]
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your API
    console.log({
      name,
      contactPerson,
      phone,
      email,
      serviceArea,
      vehicleTypes,
      description,
    })

    // Reset form
    setName("")
    setContactPerson("")
    setPhone("")
    setEmail("")
    setServiceArea("")
    setVehicleTypes([])
    setDescription("")
  }

  return (
    <DialogForm
      title="Add New Transporter"
      description="Enter the details for the new transporter."
      trigger={
        <Button>
          <span className="sr-only md:not-sr-only md:ml-2">Add Transporter</span>
        </Button>
      }
      onSubmit={handleSubmit}
      submitLabel="Add Transporter"
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Company Name
          </Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="contactPerson" className="text-right">
            Contact Person
          </Label>
          <Input
            id="contactPerson"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="serviceArea" className="text-right">
            Service Area
          </Label>
          <Input
            id="serviceArea"
            value={serviceArea}
            onChange={(e) => setServiceArea(e.target.value)}
            className="col-span-3"
            placeholder="e.g., 150 km radius from City X"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label className="text-right pt-2">Vehicle Types</Label>
          <div className="col-span-3 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="truck"
                checked={vehicleTypes.includes("Truck")}
                onCheckedChange={() => handleVehicleTypeChange("Truck")}
              />
              <Label htmlFor="truck" className="font-normal">
                Truck
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="van"
                checked={vehicleTypes.includes("Van")}
                onCheckedChange={() => handleVehicleTypeChange("Van")}
              />
              <Label htmlFor="van" className="font-normal">
                Van
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="refrigerated"
                checked={vehicleTypes.includes("Refrigerated")}
                onCheckedChange={() => handleVehicleTypeChange("Refrigerated")}
              />
              <Label htmlFor="refrigerated" className="font-normal">
                Refrigerated
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trailer"
                checked={vehicleTypes.includes("Trailer")}
                onCheckedChange={() => handleVehicleTypeChange("Trailer")}
              />
              <Label htmlFor="trailer" className="font-normal">
                Trailer
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="specialized"
                checked={vehicleTypes.includes("Specialized")}
                onCheckedChange={() => handleVehicleTypeChange("Specialized")}
              />
              <Label htmlFor="specialized" className="font-normal">
                Specialized
              </Label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="col-span-3"
            placeholder="Additional information about the transporter"
          />
        </div>
      </div>
    </DialogForm>
  )
}
