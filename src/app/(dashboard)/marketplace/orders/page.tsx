"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OrderList } from "@/components/orders/order-list"
import { OrderDetails } from "@/components/orders/order-details"
import type { Order } from "@/types/orders"

// Dummy data for orders
const orders = [
  {
    id: "ORD-2023-1001",
    date: "2023-05-15",
    total: 1250.0,
    items: 5,
    status: "delivered",
    supplier: "Green Valley Farms",
    paymentStatus: "paid",
    products: [
      { name: "Organic Tomatoes", quantity: "10 kg", price: 150.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Fresh Lettuce", quantity: "5 kg", price: 100.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Carrots", quantity: "20 kg", price: 200.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Potatoes", quantity: "50 kg", price: 500.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Onions", quantity: "30 kg", price: 300.0, image: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: "ORD-2023-1002",
    date: "2023-05-20",
    total: 3200.0,
    items: 3,
    status: "in-transit",
    supplier: "Sunshine Organics",
    paymentStatus: "paid",
    products: [
      { name: "Organic Apples", quantity: "40 kg", price: 1200.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Organic Bananas", quantity: "30 kg", price: 900.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Organic Oranges", quantity: "35 kg", price: 1100.0, image: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: "ORD-2023-1003",
    date: "2023-05-25",
    total: 5000.0,
    items: 2,
    status: "processing",
    supplier: "Harvest Moon Co-op",
    paymentStatus: "pending",
    products: [
      { name: "Premium Rice", quantity: "100 kg", price: 3000.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Wheat Flour", quantity: "100 kg", price: 2000.0, image: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: "ORD-2023-1004",
    date: "2023-05-28",
    total: 1800.0,
    items: 4,
    status: "cancelled",
    supplier: "Green Valley Farms",
    paymentStatus: "refunded",
    products: [
      { name: "Bell Peppers", quantity: "15 kg", price: 450.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Cucumbers", quantity: "20 kg", price: 400.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Zucchini", quantity: "15 kg", price: 375.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Eggplant", quantity: "25 kg", price: 575.0, image: "/placeholder.svg?height=50&width=50" },
    ],
  },
  {
    id: "ORD-2023-1005",
    date: "2023-06-01",
    total: 4500.0,
    items: 3,
    status: "delivered",
    supplier: "Sunshine Organics",
    paymentStatus: "paid",
    products: [
      { name: "Organic Strawberries", quantity: "25 kg", price: 1750.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Organic Blueberries", quantity: "15 kg", price: 1500.0, image: "/placeholder.svg?height=50&width=50" },
      { name: "Organic Raspberries", quantity: "12.5 kg", price: 1250.0, image: "/placeholder.svg?height=50&width=50" },
    ],
  },
]

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order>(orders[0])
  const router = useRouter()

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Orders</h1>
          <p className="text-gray-500">View and manage your purchase orders</p>
        </div>
        <Button onClick={() => router.push("/marketplace")}>Continue Shopping</Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Orders List */}
        <div className="w-full lg:w-2/3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Order History</CardTitle>
              <CardDescription>Showing {orders.length} orders from the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderList orders={orders} selectedOrderId={selectedOrder.id} onSelectOrder={setSelectedOrder} />
            </CardContent>
          </Card>
        </div>

        {/* Order Details */}
        <div className="w-full lg:w-1/3">
          <OrderDetails order={selectedOrder} />
        </div>
      </div>
    </div>
  )
}
