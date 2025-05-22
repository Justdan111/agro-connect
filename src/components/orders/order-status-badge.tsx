import { Badge } from "@/components/ui/badge"

export type OrderStatus = 'delivered' | 'in-transit' | 'processing' | 'cancelled';

export interface OrderStatusBadgeProps {
    status: OrderStatus
}

// Status badge color mapping
const statusColors = {
  delivered: "bg-green-100 text-green-800",
  "in-transit": "bg-blue-100 text-blue-800",
  processing: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return <Badge className={statusColors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
}
