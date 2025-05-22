import type { Supplier } from "@/types/supplier"
import { SupplierCard } from "./supplier-card"

interface SupplierListProps {
  suppliers: Supplier[]
}

export function SupplierList({ suppliers }: SupplierListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {suppliers.map((supplier) => (
        <SupplierCard key={supplier.id} supplier={supplier} />
      ))}
    </div>
  )
}
