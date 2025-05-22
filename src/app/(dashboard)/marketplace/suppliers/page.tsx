"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SupplierSearch } from "@/components/suppliers/supplier-search"
import { SupplierList } from "@/components/suppliers/supplier-list"

// Dummy data for suppliers
const suppliers = [
  {
    id: 1,
    name: "Green Valley Farms",
    image: "/placeholder.svg?height=100&width=100",
    location: "Sacramento, CA",
    rating: 4.8,
    reviews: 124,
    verified: true,
    specialties: ["Organic Vegetables", "Fruits", "Herbs"],
    description:
      "Family-owned farm specializing in organic produce with sustainable farming practices. Serving restaurants and retailers for over 15 years.",
    products: 42,
    deliveryTime: "1-2 days",
    minOrder: "$100",
    featured: true,
  },
  {
    id: 2,
    name: "Sunshine Organics",
    image: "/placeholder.svg?height=100&width=100",
    location: "Fresno, CA",
    rating: 4.7,
    reviews: 98,
    verified: true,
    specialties: ["Organic Fruits", "Berries", "Citrus"],
    description:
      "Certified organic fruit grower with focus on seasonal varieties and heirloom fruits. Known for exceptional quality and flavor.",
    products: 28,
    deliveryTime: "2-3 days",
    minOrder: "$150",
    featured: true,
  },
  {
    id: 3,
    name: "Harvest Moon Co-op",
    image: "/placeholder.svg?height=100&width=100",
    location: "Davis, CA",
    rating: 4.5,
    reviews: 76,
    verified: true,
    specialties: ["Grains", "Legumes", "Flour"],
    description:
      "Farmer cooperative specializing in sustainably grown grains and legumes. Supporting small-scale farmers across Northern California.",
    products: 35,
    deliveryTime: "3-4 days",
    minOrder: "$200",
    featured: false,
  },
  {
    id: 4,
    name: "Valley Fresh Dairy",
    image: "/placeholder.svg?height=100&width=100",
    location: "Modesto, CA",
    rating: 4.9,
    reviews: 112,
    verified: true,
    specialties: ["Milk", "Cheese", "Yogurt"],
    description:
      "Family dairy farm producing high-quality milk and artisanal cheeses from grass-fed cows. Award-winning products with traditional methods.",
    products: 22,
    deliveryTime: "1-2 days",
    minOrder: "$75",
    featured: true,
  },
  {
    id: 5,
    name: "Sierra Cattle Ranch",
    image: "/placeholder.svg?height=100&width=100",
    location: "Auburn, CA",
    rating: 4.6,
    reviews: 89,
    verified: true,
    specialties: ["Grass-fed Beef", "Free-range Poultry"],
    description:
      "Ethical ranch raising grass-fed cattle and free-range poultry with focus on animal welfare and environmental stewardship.",
    products: 18,
    deliveryTime: "2-3 days",
    minOrder: "$250",
    featured: false,
  },
  {
    id: 6,
    name: "Pacific Coast Seafood",
    image: "/placeholder.svg?height=100&width=100",
    location: "Half Moon Bay, CA",
    rating: 4.7,
    reviews: 65,
    verified: true,
    specialties: ["Sustainable Seafood", "Shellfish"],
    description:
      "Sustainable seafood supplier working directly with local fishermen to provide the freshest catch with responsible fishing practices.",
    products: 32,
    deliveryTime: "1 day",
    minOrder: "$200",
    featured: false,
  },
]

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter suppliers based on search term and active tab
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))

    if (activeTab === "featured") {
      return matchesSearch && supplier.featured
    } else if (activeTab === "verified") {
      return matchesSearch && supplier.verified
    }

    return matchesSearch
  })

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Suppliers</h1>
          <p className="text-gray-500">Find and connect with trusted agricultural suppliers</p>
        </div>
      </div>

      {/* Search and filter */}
      <SupplierSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Suppliers</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <SupplierList suppliers={filteredSuppliers} />
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <SupplierList suppliers={filteredSuppliers} />
        </TabsContent>

        <TabsContent value="verified" className="mt-6">
          <SupplierList suppliers={filteredSuppliers} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
