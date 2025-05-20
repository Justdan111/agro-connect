"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import Link from "next/link"
import { useCart } from "@/context/cartContext"
import { toast } from "sonner"

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart()
  
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
        toast.success("Order Placed Successfully", {
          description: `Your order of ${totalItems} items has been placed.`
        })
        clearCart()
        setIsCheckingOut(false)
      }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <Card className="text-center p-8">
          <CardContent className="pt-6 flex flex-col items-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added any products to your cart yet.</p>
            <Link href="/marketplace">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <Link href="/marketplace">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <div className="flex p-4">
                <div className="w-24 h-24 mr-4">
                  <Image
                    src={item.image || '/placeholder.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                    width={96}
                    height={96}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Seller: {item.seller}</p>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout} disabled={isCheckingOut}>
                {isCheckingOut ? "Processing..." : "Checkout"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
