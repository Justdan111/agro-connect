// Dummy data for charts
export const revenueData = [
  { month: "Jan", revenue: 4000, lastYear: 2400 },
  { month: "Feb", revenue: 3000, lastYear: 1398 },
  { month: "Mar", revenue: 2000, lastYear: 9800 },
  { month: "Apr", revenue: 2780, lastYear: 3908 },
  { month: "May", revenue: 1890, lastYear: 4800 },
  { month: "Jun", revenue: 2390, lastYear: 3800 },
  { month: "Jul", revenue: 3490, lastYear: 4300 },
  { month: "Aug", revenue: 4000, lastYear: 2400 },
  { month: "Sep", revenue: 3000, lastYear: 1398 },
  { month: "Oct", revenue: 2000, lastYear: 9800 },
  { month: "Nov", revenue: 2780, lastYear: 3908 },
  { month: "Dec", revenue: 1890, lastYear: 4800 },
]

export const cropData = [
  { name: "Corn", value: 35 },
  { name: "Wheat", value: 25 },
  { name: "Soybeans", value: 20 },
  { name: "Rice", value: 15 },
  { name: "Vegetables", value: 5 },
]

export const upcomingHarvests = [
  { id: 1, crop: "Corn", date: "2025-06-15", area: "Field A", status: "On Track" },
  { id: 2, crop: "Wheat", date: "2025-06-28", area: "Field B", status: "Delayed" },
  { id: 3, crop: "Soybeans", date: "2025-07-10", area: "Field C", status: "On Track" },
]

export const recentOrders = [
  { id: "ORD-001", buyer: "AgriCorp Inc.", crop: "Corn", quantity: "5 tons", status: "Delivered", date: "2025-05-10" },
  {
    id: "ORD-002",
    buyer: "FarmFresh Ltd.",
    crop: "Wheat",
    quantity: "3 tons",
    status: "In Transit",
    date: "2025-05-12",
  },
  {
    id: "ORD-003",
    buyer: "Green Foods",
    crop: "Soybeans",
    quantity: "2 tons",
    status: "Processing",
    date: "2025-05-15",
  },
]

// Buyer dashboard data
export const spendingData = [
  { month: "Jan", spending: 3200, budget: 4000 },
  { month: "Feb", spending: 4100, budget: 4000 },
  { month: "Mar", spending: 3800, budget: 4000 },
  { month: "Apr", spending: 3700, budget: 4000 },
  { month: "May", spending: 4200, budget: 4000 },
  { month: "Jun", spending: 3900, budget: 4000 },
  { month: "Jul", spending: 3600, budget: 4000 },
  { month: "Aug", spending: 3500, budget: 4000 },
  { month: "Sep", spending: 3800, budget: 4000 },
  { month: "Oct", spending: 4100, budget: 4000 },
  { month: "Nov", spending: 4300, budget: 4000 },
  { month: "Dec", spending: 3900, budget: 4000 },
]

export const categoryData = [
  { name: "Grains", value: 45 },
  { name: "Vegetables", value: 25 },
  { name: "Fruits", value: 15 },
  { name: "Dairy", value: 10 },
  { name: "Other", value: 5 },
]

export const upcomingDeliveries = [
  { id: 1, product: "Corn", date: "2025-05-20", quantity: "5 tons", status: "On Schedule" },
  { id: 2, product: "Wheat", date: "2025-05-25", quantity: "3 tons", status: "Delayed" },
  { id: 3, product: "Vegetables", date: "2025-05-18", quantity: "500 kg", status: "On Schedule" },
]

export const buyerRecentOrders = [
  {
    id: "ORD-001",
    seller: "Green Acres Farm",
    product: "Corn",
    quantity: "5 tons",
    status: "Processing",
    date: "2025-05-15",
  },
  {
    id: "ORD-002",
    seller: "Wheatfield Farms",
    product: "Wheat",
    quantity: "3 tons",
    status: "Confirmed",
    date: "2025-05-14",
  },
  {
    id: "ORD-003",
    seller: "Fresh Produce Co.",
    product: "Vegetables",
    quantity: "500 kg",
    status: "Shipped",
    date: "2025-05-12",
  },
]

export const marketTrends = [
  { product: "Corn", price: "$180/ton", trend: "+2.5%", status: "rising" },
  { product: "Wheat", price: "$210/ton", trend: "-1.2%", status: "falling" },
  { product: "Soybeans", price: "$390/ton", trend: "+0.8%", status: "rising" },
  { product: "Rice", price: "$420/ton", trend: "+3.1%", status: "rising" },
]

// Transporter dashboard data
export const earningsData = [
  { month: "Jan", earnings: 3200, target: 3000 },
  { month: "Feb", earnings: 3400, target: 3000 },
  { month: "Mar", earnings: 2900, target: 3000 },
  { month: "Apr", earnings: 3100, target: 3000 },
  { month: "May", earnings: 3500, target: 3000 },
  { month: "Jun", earnings: 3300, target: 3000 },
  { month: "Jul", earnings: 3600, target: 3000 },
  { month: "Aug", earnings: 3200, target: 3000 },
  { month: "Sep", earnings: 3400, target: 3000 },
  { month: "Oct", earnings: 3700, target: 3000 },
  { month: "Nov", earnings: 3500, target: 3000 },
  { month: "Dec", earnings: 3800, target: 3000 },
]

export const jobTypeData = [
  { name: "Grain Transport", value: 45 },
  { name: "Produce Delivery", value: 25 },
  { name: "Livestock", value: 15 },
  { name: "Equipment", value: 10 },
  { name: "Other", value: 5 },
]

export const upcomingJobs = [
  {
    id: 1,
    cargo: "Corn",
    date: "2025-05-18",
    pickup: "Green Acres Farm",
    destination: "AgriCorp Processing",
    distance: "120 km",
  },
  {
    id: 2,
    cargo: "Wheat",
    date: "2025-05-20",
    pickup: "Wheatfield Farms",
    destination: "Grain Storage Facility",
    distance: "85 km",
  },
  {
    id: 3,
    cargo: "Vegetables",
    date: "2025-05-22",
    pickup: "Fresh Produce Co.",
    destination: "FoodMart Distribution",
    distance: "65 km",
  },
]

export const activeJobs = [
  {
    id: "JOB-001",
    cargo: "Corn",
    quantity: "5 tons",
    pickup: "Green Acres Farm",
    destination: "AgriCorp Processing",
    status: "In Transit",
    progress: 65,
  },
  {
    id: "JOB-002",
    cargo: "Wheat",
    quantity: "3 tons",
    pickup: "Wheatfield Farms",
    destination: "Grain Storage Facility",
    status: "Loading",
    progress: 25,
  },
]

export const weatherForecast = [
  { day: "Today", temp: "24°C", condition: "Sunny", humidity: "45%" },
  { day: "Tomorrow", temp: "22°C", condition: "Partly Cloudy", humidity: "50%" },
  { day: "Wednesday", temp: "20°C", condition: "Cloudy", humidity: "65%" },
  { day: "Thursday", temp: "19°C", condition: "Light Rain", humidity: "75%" },
]

// Farm management dashboard data
export const farmData = {
  crops: cropData,
  harvests: upcomingHarvests,
  orders: recentOrders,
  revenue: revenueData,
}
