"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"
import { InventorySummary } from "@/components/inventory/inventory-summary"
import { InventorySearch } from "@/components/inventory/inventory-search"
import { InventoryTable } from "@/components/inventory/inventory-table"
import type { InventoryItem } from "@/types/inventory"

// Dummy data for inventory items
const inventoryItems: InventoryItem[] = [
  {
    id: "INV-001",
    name: "Organic Tomatoes",
    category: "Vegetables",
    quantity: 250,
    unit: "kg",
    stockLevel: "high", 
    supplier: "Green Valley Farms",
    lastRestocked: "2023-05-10",
    expiryDate: "2023-05-25",
    price: 3.5,
    location: "Warehouse A, Section 3",
    image: "/images/tomato.jpeg?height=40&width=40",
  },
  {
    id: "INV-002",
    name: "Premium Rice",
    category: "Grains",
    quantity: 500,
    unit: "kg",
    stockLevel: "high",
    supplier: "Harvest Moon Co-op",
    lastRestocked: "2023-05-05",
    expiryDate: "2023-11-05",
    price: 2.25,
    location: "Warehouse B, Section 1",
    image: "/images/rice.jpeg?height=40&width=40",
  },
  {
    id: "INV-003",
    name: "Fresh Lettuce",
    category: "Vegetables",
    quantity: 75,
    unit: "kg",
    stockLevel: "medium",
    supplier: "Green Valley Farms",
    lastRestocked: "2023-05-12",
    expiryDate: "2023-05-20",
    price: 2.0,
    location: "Warehouse A, Section 2",
    image: "/images/spinach.jpeg?height=40&width=40",
  },
  {
    id: "INV-004",
    name: "Organic Apples",
    category: "Fruits",
    quantity: 120,
    unit: "kg",
    stockLevel: "medium",
    supplier: "Sunshine Organics",
    lastRestocked: "2023-05-08",
    expiryDate: "2023-05-28",
    price: 4.5,
    location: "Warehouse A, Section 5",
    image: "/images/apple.jpeg?height=40&width=40",
  },
  {
    id: "INV-005",
    name: "Wheat Flour",
    category: "Grains",
    quantity: 350,
    unit: "kg",
    stockLevel: "high",
    supplier: "Harvest Moon Co-op",
    lastRestocked: "2023-05-03",
    expiryDate: "2023-10-03",
    price: 1.75,
    location: "Warehouse B, Section 2",
    image: "/images/wheat.webp?height=40&width=40",
  },
  {
    id: "INV-006",
    name: "Organic Milk",
    category: "Dairy",
    quantity: 50,
    unit: "L",
    stockLevel: "low",
    supplier: "Valley Fresh Dairy",
    lastRestocked: "2023-05-14",
    expiryDate: "2023-05-21",
    price: 3.25,
    location: "Warehouse C, Section 1",
    image: "/images/milk.jpg?height=40&width=40",
  },
  {
    id: "INV-007",
    name: "Grass-fed Beef",
    category: "Meat",
    quantity: 25,
    unit: "kg",
    stockLevel: "critical",
    supplier: "Sierra Cattle Ranch",
    lastRestocked: "2023-05-07",
    expiryDate: "2023-05-22",
    price: 12.5,
    location: "Warehouse C, Section 3",
    image: "/images/beef.jpg?height=40&width=40",
  },
  {
    id: "INV-008",
    name: "Organic Carrots",
    category: "Vegetables",
    quantity: 180,
    unit: "kg",
    stockLevel: "high",
    supplier: "Green Valley Farms",
    lastRestocked: "2023-05-11",
    expiryDate: "2023-06-01",
    price: 2.2,
    location: "Warehouse A, Section 3",
    image: "/images/carrot.webp?height=40&width=40",
  },
  {
    id: "INV-009",
    name: "Organic Eggs",
    category: "Poultry",
    quantity: 40,
    unit: "dozen",
    stockLevel: "low",
    supplier: "Sierra Cattle Ranch",
    lastRestocked: "2023-05-13",
    expiryDate: "2023-05-27",
    price: 5.75,
    location: "Warehouse C, Section 2",
    image: "/images/egg.webp?height=40&width=40",
  },
  {
    id: "INV-010",
    name: "Fresh Salmon",
    category: "Seafood",
    quantity: 15,
    unit: "kg",
    stockLevel: "critical",
    supplier: "Pacific Coast Seafood",
    lastRestocked: "2023-05-15",
    expiryDate: "2023-05-19",
    price: 18.5,
    location: "Warehouse C, Section 4",
    image: "/images/beef.jpg?height=40&width=40",
  },
]

// Inventory summary data
const inventorySummary = {
  totalItems: inventoryItems.length,
  totalValue: inventoryItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
  lowStock: inventoryItems.filter((item) => item.stockLevel === "low").length,
  criticalStock: inventoryItems.filter((item) => item.stockLevel === "critical").length,
  expiringThisWeek: inventoryItems.filter((item) => {
    const expiryDate = new Date(item.expiryDate)
    const today = new Date()
    const nextWeek = new Date()
    nextWeek.setDate(today.getDate() + 7)
    return expiryDate >= today && expiryDate <= nextWeek
  }).length,
}

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter inventory items
  const filteredItems = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <p className="text-gray-500">Track and manage your product inventory</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Inventory Summary Cards */}
      <InventorySummary
        totalItems={inventorySummary.totalItems}
        totalValue={inventorySummary.totalValue}
        lowStock={inventorySummary.lowStock}
        criticalStock={inventorySummary.criticalStock}
        expiringThisWeek={inventorySummary.expiringThisWeek}
      />

      {/* Inventory Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <CardTitle>Inventory Items</CardTitle>
            <InventorySearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
        </CardHeader>
        <CardContent>
          <InventoryTable items={filteredItems} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredItems.length} of {inventoryItems.length} items
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
