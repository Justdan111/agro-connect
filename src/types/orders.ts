export interface Product {
    name: string
    quantity: string
    price: number
    image: string
  }
  
  export interface Order {
    id: string
    date: string
    total: number
    items: number
    status: string
    supplier: string
    paymentStatus: string
    products: Product[]
  }
  