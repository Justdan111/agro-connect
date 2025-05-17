"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Badge, Filter, Grid3x3, Heart, List, MapPin, Plus, Search, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"


// Dummy data for marketplace listings
const listings = [
  {
    id: 1,
    title: "Premium Quality Corn",
    description: "Freshly harvested sweet corn, perfect for direct consumption or processing.",
    price: 350,
    unit: "per ton",
    quantity: "15 tons available",
    location: "Midwest Region",
    distance: "25 km",
    seller: "GreenFields Farm",
    rating: 4.8,
    reviews: 24,
    image: "/placeholder.svg?height=200&width=200",
    category: "Grains",
    organic: true,
    featured: true,
  },
  {
    id: 2,
    title: "Organic Wheat",
    description: "Certified organic wheat, grown without pesticides or synthetic fertilizers.",
    price: 420,
    unit: "per ton",
    quantity: "8 tons available",
    location: "Northern Plains",
    distance: "42 km",
    seller: "NatureCrops Co.",
    rating: 4.9,
    reviews: 36,
    image: "/placeholder.svg?height=200&width=200",
    category: "Grains",
    organic: true,
    featured: false,
  },
  {
    id: 3,
    title: "Fresh Soybeans",
    description: "High-protein soybeans, ideal for oil production and animal feed.",
    price: 380,
    unit: "per ton",
    quantity: "12 tons available",
    location: "Eastern Region",
    distance: "18 km",
    seller: "SoyGrow Farms",
    rating: 4.6,
    reviews: 19,
    image: "/placeholder.svg?height=200&width=200",
    category: "Legumes",
    organic: false,
    featured: false,
  },
  {
    id: 4,
    title: "Premium Rice",
    description: "High-quality long grain rice, perfect for various culinary applications.",
    price: 450,
    unit: "per ton",
    quantity: "10 tons available",
    location: "Southern Delta",
    distance: "65 km",
    seller: "Delta Rice Producers",
    rating: 4.7,
    reviews: 28,
    image: "/placeholder.svg?height=200&width=200",
    category: "Grains",
    organic: false,
    featured: true,
  },
  {
    id: 5,
    title: "Organic Vegetables Mix",
    description: "Assorted organic vegetables including tomatoes, cucumbers, and bell peppers.",
    price: 2.5,
    unit: "per kg",
    quantity: "500 kg available",
    location: "Western Coast",
    distance: "15 km",
    seller: "FreshVeg Gardens",
    rating: 4.9,
    reviews: 42,
    image: "/placeholder.svg?height=200&width=200",
    category: "Vegetables",
    organic: true,
    featured: true,
  },
  {
    id: 6,
    title: "Fresh Apples",
    description: "Crisp and juicy apples, perfect for direct consumption or processing.",
    price: 1.8,
    unit: "per kg",
    quantity: "800 kg available",
    location: "Northern Orchards",
    distance: "35 km",
    seller: "AppleGrove Farms",
    rating: 4.8,
    reviews: 31,
    image: "/placeholder.svg?height=200&width=200",
    category: "Fruits",
    organic: false,
    featured: false,
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [organicOnly, setOrganicOnly] = useState(false)

  const filteredListings = listings.filter((listing) => {
    // Search term filter
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.seller.toLowerCase().includes(searchTerm.toLowerCase())

    // Price range filter
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1]

    // Category filter
    const matchesCategory = categoryFilter === "all" || listing.category === categoryFilter

    // Organic filter
    const matchesOrganic = !organicOnly || listing.organic

    return matchesSearch && matchesPrice && matchesCategory && matchesOrganic
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Buy and sell agricultural products directly from farmers.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Listing
          </Button>
          <Button variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4" />
            My Cart (3)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Legumes">Legumes</SelectItem>
                  <SelectItem value="Dairy">Dairy</SelectItem>
                  <SelectItem value="Livestock">Livestock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range ($ per unit)</label>
              <div className="pt-4">
                <Slider defaultValue={[0, 500]} max={500} step={10} value={priceRange} onValueChange={setPriceRange} />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="organic"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-agro-primary focus:ring-agro-primary"
              />
              <label htmlFor="organic" className="text-sm font-medium">
                Organic Products Only
              </label>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="nearby">Within 50 km</SelectItem>
                  <SelectItem value="region">My Region</SelectItem>
                  <SelectItem value="country">My Country</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Nearest</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className={viewMode === "grid" ? "bg-muted" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={viewMode === "list" ? "bg-muted" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="recent">Recently Added</TabsTrigger>
              <TabsTrigger value="saved">Saved Items</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id} className="overflow-hidden">
                      <div className="relative">
                        <Image
                          src={listing.image || "/placeholder.svg"}
                          alt={listing.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 rounded-full hover:bg-white"
                        >
                          <Heart className="h-4 w-4 text-gray-600" />
                          <span className="sr-only">Add to favorites</span>
                        </Button>
                        {listing.organic && (
                          <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 border-green-300">
                            Organic
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{listing.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{listing.location}</span>
                          <span className="mx-1">•</span>
                          <span>{listing.distance}</span>
                        </div>
                        <div className="mt-2 flex items-center">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{listing.rating}</span>
                          </div>
                          <span className="mx-1 text-xs text-muted-foreground">({listing.reviews} reviews)</span>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div>
                            <span className="text-lg font-bold">${listing.price}</span>
                            <span className="text-sm text-muted-foreground"> {listing.unit}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{listing.quantity}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex gap-2">
                        <Button className="w-full" size="sm">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id}>
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-48 h-48">
                          <Image
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.title}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                          {listing.organic && (
                            <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 border-green-300">
                              Organic
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{listing.title}</h3>
                              <p className="text-sm text-muted-foreground">{listing.description}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <Heart className="h-4 w-4 text-gray-600" />
                              <span className="sr-only">Add to favorites</span>
                            </Button>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{listing.location}</span>
                            <span className="mx-1">•</span>
                            <span>{listing.distance}</span>
                          </div>
                          <div className="mt-2 flex items-center">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm font-medium">{listing.rating}</span>
                            </div>
                            <span className="mx-1 text-xs text-muted-foreground">({listing.reviews} reviews)</span>
                            <span className="mx-1">•</span>
                            <span className="text-sm text-muted-foreground">Seller: {listing.seller}</span>
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div>
                              <span className="text-lg font-bold">${listing.price}</span>
                              <span className="text-sm text-muted-foreground"> {listing.unit}</span>
                              <span className="ml-2 text-xs text-muted-foreground">{listing.quantity}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to Cart
                              </Button>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="featured">
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}
              >
                {filteredListings
                  .filter((listing) => listing.featured)
                  .map((listing) => (
                    <Card key={listing.id} className={viewMode === "list" ? "" : "overflow-hidden"}>
                      {/* Same card content as above, but only for featured listings */}
                      {/* This is simplified for brevity */}
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground">{listing.description}</p>
                        <div className="mt-4">
                          <span className="text-lg font-bold">${listing.price}</span>
                          <span className="text-sm text-muted-foreground"> {listing.unit}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full" size="sm">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="recent">
              <div className="flex items-center justify-center h-40 border rounded-md">
                <p className="text-muted-foreground">Recently added products will appear here.</p>
              </div>
            </TabsContent>
            <TabsContent value="saved">
              <div className="flex items-center justify-center h-40 border rounded-md">
                <p className="text-muted-foreground">Your saved items will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
