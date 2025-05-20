"use client"

import { useState } from "react"
import { Eye, ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogForm } from "@/components/ui/dialog-form"
import { toast } from "sonner"


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

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  seller: string
}

interface ProductActionsProps {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
  viewMode?: "grid" | "list"
}

export function ProductActions({ product, onAddToCart, viewMode = "grid" }: ProductActionsProps) {
  const [viewProduct, setViewProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = (product: Product, quantity: number) => {
    onAddToCart(product, quantity)
    toast(`${quantity} ${product.name} added to your cart.`)
  }

  return (
    <>
      {viewMode === "grid" ? (
        <div className="flex justify-between">
          <Button variant="outline" size="sm" onClick={() => setViewProduct(product)}>
            <Eye className="mr-2 h-4 w-4" />
            Details
          </Button>
          <Button size="sm" onClick={() => handleAddToCart(product, 1)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      ) : (
        <div className="flex justify-end mt-4 space-x-2">
          <Button variant="outline" size="sm" onClick={() => setViewProduct(product)}>
            <Eye className="mr-2 h-4 w-4" />
            Details
          </Button>
          <Button size="sm" onClick={() => handleAddToCart(product, 1)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      )}

      {/* Product Details Dialog */}
      <DialogForm
        title={viewProduct?.name || "Product Details"}
        trigger={<></>} // Empty trigger as we're controlling it programmatically
        isOpen={!!viewProduct && viewProduct.id === product.id}
        onOpenChange={(open) => !open && setViewProduct(null)}
        submitLabel="Close"
        onSubmit={(e) => {
          e.preventDefault()
          setViewProduct(null)
          setQuantity(1)
        }}
      >
        {viewProduct && (
          <div className="space-y-4">
            <div className="aspect-video relative overflow-hidden rounded-md">
              <img
                src={viewProduct.image || "/placeholder.svg?height=300&width=600"}
                alt={viewProduct.name}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Category:</p>
                <p>{viewProduct.category}</p>
              </div>
              <div>
                <p className="font-semibold">Price:</p>
                <p>
                  ${viewProduct.price}/{viewProduct.unit}
                </p>
              </div>
              <div>
                <p className="font-semibold">Seller:</p>
                <p>{viewProduct.seller}</p>
              </div>
              <div>
                <p className="font-semibold">Location:</p>
                <p>{viewProduct.location}</p>
              </div>
              <div>
                <p className="font-semibold">Available:</p>
                <p>
                  {viewProduct.available} {viewProduct.unit}
                </p>
              </div>
            </div>

            <div>
              <p className="font-semibold">Description:</p>
              <p>{viewProduct.description || "No description available."}</p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(viewProduct.available, quantity + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => {
                    handleAddToCart(viewProduct, quantity)
                    setViewProduct(null)
                    setQuantity(1)
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogForm>
    </>
  )
}
