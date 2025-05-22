import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ShoppingBag, Truck } from "lucide-react"
import { OrderStatus, OrderStatusBadge } from "./order-status-badge"
import { Order } from "@/types/orders"
import { OrderProductList } from "./order-product-list"


interface OrderDetailsProps {
  order: Order
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
        <CardDescription>
          {order.id} • {order.date}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gray-500" />
            <span>{order.items} items</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-gray-500" />
            <OrderStatusBadge status={order.status as OrderStatus} />
          </div>
        </div>

        <OrderProductList products={order.products} />

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Subtotal</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Invoice
        </Button>
        <Button>Track Order</Button>
      </CardFooter>
    </Card>
  )
}
