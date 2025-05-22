import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Box, Calendar, ShoppingCart } from "lucide-react"

interface InventorySummaryProps {
  totalItems: number
  totalValue: number
  lowStock: number
  criticalStock: number
  expiringThisWeek: number
}

export function InventorySummary({
  totalItems,
  totalValue,
  lowStock,
  criticalStock,
  expiringThisWeek,
}: InventorySummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-col justify-center items-center">
          <Box className="h-8 w-8 text-gray-500 mb-2" />
          <p className="text-sm text-gray-500">Total Items</p>
          <p className="text-2xl font-bold">{totalItems}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col justify-center items-center">
          <ShoppingCart className="h-8 w-8 text-gray-500 mb-2" />
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col justify-center items-center">
          <AlertCircle className="h-8 w-8 text-yellow-500 mb-2" />
          <p className="text-sm text-gray-500">Low Stock</p>
          <p className="text-2xl font-bold">{lowStock}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col justify-center items-center">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-sm text-gray-500">Critical Stock</p>
          <p className="text-2xl font-bold">{criticalStock}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col justify-center items-center">
          <Calendar className="h-8 w-8 text-blue-500 mb-2" />
          <p className="text-sm text-gray-500">Expiring Soon</p>
          <p className="text-2xl font-bold">{expiringThisWeek}</p>
        </CardContent>
      </Card>
    </div>
  )
}
