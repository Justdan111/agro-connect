export interface InventoryItem {
    id: string
    name: string
    category: string
    quantity: number
    unit: string
    stockLevel: string
    supplier: string
    lastRestocked: string
    expiryDate: string
    price: number
    location: string
    image: string
  }
  
  export interface InventorySummary {
    totalItems: number
    totalValue: number
    lowStock: number
    criticalStock: number
    expiringThisWeek: number
  }
  