import { Badge } from "@/components/ui/badge"

export type PaymentStatus = 'paid' | 'pending' | 'refunded';

interface PaymentStatusBadgeProps {
  status: PaymentStatus
}

// Payment status badge color mapping
const paymentStatusColors = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  refunded: "bg-purple-100 text-purple-800",
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  return <Badge className={paymentStatusColors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
}
