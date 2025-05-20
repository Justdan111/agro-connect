"use client"

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductActions } from "./product-actions"

interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  seller: string
  location: string
  available: number
  image?: string
  description?: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
  viewMode: "grid" | "list"
}

export function ProductCard({ product, onAddToCart, viewMode }: ProductCardProps) {
  if (viewMode === "grid") {
    return (
      <Card key={product.id} className="overflow-hidden">
        <div className="aspect-square relative">
          <img
            src={product.image || "/placeholder.svg?height=200&width=200"}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <div className="flex justify-between items-center">
            <Badge variant="outline">{product.category}</Badge>
            <span className="font-bold">
              ${product.price}/{product.unit}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Seller: {product.seller}</p>
        </CardHeader>
        <CardFooter className="p-4 pt-0">
          <ProductActions product={product} onAddToCart={onAddToCart} viewMode="grid" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card key={product.id}>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-48">
          <img
            src={product.image || "/placeholder.svg?height=200&width=200"}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{product.name}</h3>
              <Badge variant="outline" className="mt-1">
                {product.category}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">Seller: {product.seller}</p>
              <p className="text-sm text-muted-foreground">Location: {product.location}</p>
              <p className="text-sm mt-2">{product.description || "No description available."}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">
                ${product.price}/{product.unit}
              </p>
              <p className="text-sm text-muted-foreground">
                Available: {product.available} {product.unit}
              </p>
            </div>
          </div>
          <ProductActions product={product} onAddToCart={onAddToCart} viewMode="list" />
        </div>
      </div>
    </Card>
  )
}
