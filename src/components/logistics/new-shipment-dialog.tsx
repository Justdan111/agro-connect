"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogForm } from "@/components/ui/dialog-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Dummy data for transporters
const transporters = [
  { id: "1", name: "FastHaul Logistics" },
  { id: "2", name: "AgriTrans" },
  { id: "3", name: "FarmFreight" },
]

export function NewShipmentDialog() {
  const [product, setProduct] = useState("")
  const [quantity, setQuantity] = useState("")
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [transporter, setTransporter] = useState("")
  const [departureDate, setDepartureDate] = useState<Date>()
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your API
    console.log({
      product,
      quantity,
      pickup,
      destination,
      transporter,
      departureDate,
      notes,
    })

    // Reset form
    setProduct("")
    setQuantity("")
    setPickup("")
    setDestination("")
    setTransporter("")
    setDepartureDate(undefined)
    setNotes("")
  }

  return (
    <DialogForm
      title="Create New Shipment"
      description="Enter the details for your new shipment."
      trigger={
        <Button>
          <span className="sr-only md:not-sr-only md:ml-2">New Shipment</span>
        </Button>
      }
      onSubmit={handleSubmit}
      submitLabel="Create Shipment"
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product" className="text-right">
            Product
          </Label>
          <Input
            id="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Quantity
          </Label>
          <Input
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="col-span-3"
            placeholder="e.g., 5 tons"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="pickup" className="text-right">
            Pickup Location
          </Label>
          <Input
            id="pickup"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="destination" className="text-right">
            Destination
          </Label>
          <Input
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="transporter" className="text-right">
            Transporter
          </Label>
          <Select value={transporter} onValueChange={setTransporter}>
            <SelectTrigger id="transporter" className="col-span-3">
              <SelectValue placeholder="Select a transporter" />
            </SelectTrigger>
            <SelectContent>
              {transporters.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="departureDate" className="text-right">
            Departure Date
          </Label>
          <div className="col-span-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !departureDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="col-span-3"
            placeholder="Any special instructions or requirements"
          />
        </div>
      </div>
    </DialogForm>
  )
}
