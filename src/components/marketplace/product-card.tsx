"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star, Truck, Clock, Leaf, TrendingDown, Award } from "lucide-react"

interface ProductCardProps {
  product: any
  onAddToCart: (product: any, quantity: number) => void
  viewMode: "grid" | "list"
}

export function ProductCard({ product, onAddToCart, viewMode }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number.parseInt(e.target.value))
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  // Calculate discount percentage if there's a sale
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/4 h-48">
            <Image
              src={product.image || "/placeholder.svg?height=200&width=200"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isOrganic && (
              <Badge className="absolute top-2 left-2 bg-green-600">
                <Leaf className="h-3 w-3 mr-1" /> Organic
              </Badge>
            )}
            {product.featured && (
              <Badge className="absolute top-2 right-2 bg-amber-500">
                <Award className="h-3 w-3 mr-1" /> Featured
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="absolute bottom-2 left-2 bg-red-600">
                <TrendingDown className="h-3 w-3 mr-1" /> {discountPercentage}% OFF
              </Badge>
            )}
          </div>
          <div className="flex-1 p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Sold by <span className="font-medium">{product.seller.name}</span>
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={isWishlisted ? "text-red-500" : ""}
                onClick={toggleWishlist}
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm ml-1">({product.reviews?.length || 0})</span>
            </div>

            <p className="mt-2 text-sm line-clamp-2">{product.description}</p>

            <div className="flex items-center mt-2 space-x-4 text-sm">
              <div className="flex items-center">
                <Truck className="h-4 w-4 mr-1 text-gray-500" />
                <span>{product.seller.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                <span>Ships in {product.shippingTime || "2-3 days"}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-baseline">
                <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-sm line-through text-gray-500">${product.originalPrice.toFixed(2)}</span>
                )}
                <span className="ml-2 text-sm text-gray-500">/ {product.unit}</span>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <Button onClick={() => onAddToCart(product, quantity)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative pt-[100%]">
        <Image
          src={product.image || "/placeholder.svg?height=200&width=200"}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.isOrganic && (
          <Badge className="absolute top-2 left-2 bg-green-600">
            <Leaf className="h-3 w-3 mr-1" /> Organic
          </Badge>
        )}
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-amber-500">
            <Award className="h-3 w-3 mr-1" /> Featured
          </Badge>
        )}
        {discountPercentage > 0 && (
          <Badge className="absolute bottom-2 left-2 bg-red-600">
            <TrendingDown className="h-3 w-3 mr-1" /> {discountPercentage}% OFF
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-white/80 ${isWishlisted ? "text-red-500" : ""}`}
          onClick={toggleWishlist}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold line-clamp-1">{product.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">{product.seller.name}</p>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs ml-1">({product.reviews?.length || 0})</span>
        </div>
        <div className="mt-2 flex items-baseline">
          <span className="text-lg font-bold">₦{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="ml-2 text-xs line-through text-gray-500">₦{product.originalPrice.toFixed(2)}</span>
          )}
          <span className="ml-1 text-xs text-gray-500">/ {product.unit}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{product.description || "No description available."}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center w-full space-x-2">
          <select
            value={quantity}
            onChange={handleQuantityChange}
            className="h-9 w-16 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <Button className="flex-1" onClick={() => onAddToCart(product, quantity)}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
