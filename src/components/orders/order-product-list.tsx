import { Product } from "@/types/orders"
import Image from "next/image"


interface OrderProductListProps {
  products: Product[]
}

export function OrderProductList({ products }: OrderProductListProps) {
  return (
    <div className="border-t pt-4">
      <h4 className="font-medium mb-2">Products</h4>
      <div className="space-y-3">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-md overflow-hidden border">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">{product.quantity}</p>
            </div>
            <p className="font-medium">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
