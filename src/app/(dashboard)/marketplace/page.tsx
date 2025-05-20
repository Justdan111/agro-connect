"use client"

import { useState } from "react"
import { ShoppingCart, Filter, Search, Star, TrendingUp, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ProductCard } from "@/components/marketplace/product-card"
import Link from "next/link"
import { useCart, CartItem } from "@/context/cartContext"
import { useUser } from "@/context/userContext"
import marketplaceData, { getFeaturedProducts, getProductsByCategory } from "@/data/market-place-data"


export default function MarketplacePage() {
  const { addItem, totalItems } = useCart()
  const { user } = useUser()
  const [products, setProducts] = useState(marketplaceData.products)
  const [featuredProducts, setFeaturedProducts] = useState(getFeaturedProducts())
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sellerFilter, setSellerFilter] = useState<string>("all")
  const [sortOption, setSortOption] = useState<string>("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showOrganic, setShowOrganic] = useState<boolean>(false)

  // Filter products based on search, category, price, seller, and organic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesSeller = sellerFilter === "all" || product.seller.id === sellerFilter
    const matchesOrganic = !showOrganic || product.isOrganic

    return matchesSearch && matchesCategory && matchesPrice && matchesSeller && matchesOrganic
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
      default:
        return b.featured ? 1 : -1
    }
  })

  // Add product to cart
  const handleAddToCart = (product: any, quantity: number) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      seller: product.seller.name,
    }

    addItem(cartItem)
  }

  // Update category filter
  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category)
    if (category !== "all") {
      const categoryProducts = getProductsByCategory(category)
      setProducts(categoryProducts)
    } else {
      setProducts(marketplaceData.products)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <p className="text-lg text-muted-foreground">
        Buy and sell agricultural products directly from farmers.</p>
        </div>
        <div className="flex items-center space-x-2">
          {user?.role === "farmer" && (
            <Link href="/marketplace/create-listing">
              <Button variant="default">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Listing
              </Button>
            </Link>
          )}
          <Link href="/cart">
            <Button variant="outline" className="relative">
              <ShoppingCart className="mr-2 h-4 w-4" />
              My Cart
              {totalItems > 0 && <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">{totalItems}</Badge>}
            </Button>
          </Link>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search products or sellers"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {marketplaceData.categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="price-range">Price Range</Label>
                <span className="text-sm text-muted-foreground">
                ₦{priceRange[0]} - ₦{priceRange[1]}
                </span>
              </div>
              <Slider
                id="price-range"
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="py-4"
              />
            </div>

            {/* Seller Filter */}
            <div className="space-y-2">
              <Label htmlFor="seller">Seller</Label>
              <Select value={sellerFilter} onValueChange={setSellerFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select seller" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sellers</SelectItem>
                  {marketplaceData.sellers.map((seller) => (
                    <SelectItem key={seller.id} value={seller.id}>
                      {seller.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Organic Filter */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="organic"
                checked={showOrganic}
                onChange={(e) => setShowOrganic(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="organic">Organic Products Only</Label>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <Label htmlFor="rating">Minimum Rating</Label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className="flex items-center justify-center h-8 w-8 rounded-full border border-gray-300 hover:bg-gray-100"
                  >
                    <Star className={`h-4 w-4 ${rating <= 4 ? "text-yellow-400" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Filters Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("all")
                setPriceRange([0, 1000])
                setSellerFilter("all")
                setShowOrganic(false)
                setProducts(marketplaceData.products)
              }}
            >
              Reset Filters
            </Button>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Showing {sortedProducts.length} products</p>
            <div className="flex items-center space-x-2">
              <Label htmlFor="sort" className="text-sm">
                Sort by:
              </Label>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
              <Tabs>
              <TabsList>
                <TabsTrigger value="grid" onClick={() => setViewMode("grid")}>
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list" onClick={() => setViewMode("list")}>
                  List
                </TabsTrigger>
              </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Products Display */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} viewMode={viewMode} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-lg text-gray-500">No products found matching your criteria.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm("")
                    setCategoryFilter("all")
                    setPriceRange([0, 1000])
                    setSellerFilter("all")
                    setShowOrganic(false)
                    setProducts(marketplaceData.products)
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
