// Types
export interface Product {
    id: string
    name: string
    description?: string
    price: number
    originalPrice?: number
    unit: string
    category: string
    image?: string
    seller: Seller
    available: number
    rating: number
    reviews?: Review[]
    featured: boolean
    isOrganic: boolean
    listedDate: string
    shippingTime?: string
    tags?: string[]
  }
  
  export interface Category {
    id: string
    name: string
    description?: string
    icon?: string
  }
  
  export interface Seller {
    id: string
    name: string
    location: string
    rating: number
    verified: boolean
    joinDate: string
    productCount: number
    specialization?: string
    image?: string
  }
  
  export interface Review {
    id: string
    userId: string
    userName: string
    rating: number
    comment: string
    date: string
  }
  
  export interface Collection {
    id: string
    name: string
    description: string
    productIds: string[]
  }
  
  // Categories
  const categories: Category[] = [
    { id: "vegetables", name: "Vegetables", description: "Fresh vegetables from local farms" },
    { id: "fruits", name: "Fruits", description: "Seasonal and exotic fruits" },
    { id: "grains", name: "Grains", description: "Wheat, rice, corn, and other grains" },
    { id: "dairy", name: "Dairy", description: "Milk, cheese, and other dairy products" },
    { id: "livestock", name: "Livestock", description: "Live animals and animal products" },
    { id: "seeds", name: "Seeds", description: "Seeds for planting" },
    { id: "fertilizers", name: "Fertilizers", description: "Organic and chemical fertilizers" },
    { id: "equipment", name: "Equipment", description: "Farming tools and equipment" },
    { id: "organic", name: "Organic Products", description: "Certified organic products" },
  ]
  
  // Sellers
  const sellers: Seller[] = [
    {
      id: "seller1",
      name: "Green Valley Farm",
      location: "California",
      rating: 4.8,
      verified: true,
      joinDate: "2020-03-15",
      productCount: 24,
      specialization: "Organic Vegetables",
      image: "/images/avatar.webp?height=100&width=100",
    },
    {
      id: "seller2",
      name: "Sunshine Orchards",
      location: "Florida",
      rating: 4.6,
      verified: true,
      joinDate: "2019-07-22",
      productCount: 18,
      specialization: "Citrus Fruits",
      image: "/images/transporter.webp?height=100&width=100",
    },
    {
      id: "seller3",
      name: "Heartland Grains",
      location: "Iowa",
      rating: 4.5,
      verified: true,
      joinDate: "2021-01-10",
      productCount: 12,
      specialization: "Organic Grains",
      image: "/images/chat.avif?height=100&width=100",
    },
    {
      id: "seller4",
      name: "Mountain Dairy Co-op",
      location: "Vermont",
      rating: 4.7,
      verified: true,
      joinDate: "2018-11-05",
      productCount: 15,
      specialization: "Artisanal Dairy",
      image: "/images/avatar.webp?height=100&width=100",
    },
    {
      id: "seller5",
      name: "Prairie Livestock",
      location: "Texas",
      rating: 4.3,
      verified: true,
      joinDate: "2020-09-18",
      productCount: 8,
      specialization: "Grass-fed Livestock",
      image: "/images/chat.avif?height=100&width=100",
    },
    {
      id: "seller6",
      name: "Farm Equipment Supply",
      location: "Ohio",
      rating: 4.4,
      verified: true,
      joinDate: "2019-04-30",
      productCount: 32,
      specialization: "Farming Equipment",
      image: "/images/transporter.webp?height=100&width=100",
    },
  ]
  
  // Products
  const products: Product[] = [
    {
      id: "prod1",
      name: "Organic Tomatoes",
      description: "Vine-ripened organic tomatoes grown without pesticides. Perfect for salads and cooking.",
      price: 3.99,
      unit: "kg",
      category: "vegetables",
      image: "/images/farm.jpeg?height=300&width=300",
      seller: sellers[0],
      available: 50,
      rating: 4.7,
      reviews: [
        {
          id: "rev1",
          userId: "user1",
          userName: "John D.",
          rating: 5,
          comment: "These tomatoes are incredibly fresh and flavorful!",
          date: "2023-04-15",
        },
        {
          id: "rev2",
          userId: "user2",
          userName: "Sarah M.",
          rating: 4,
          comment: "Good quality, but a few were bruised.",
          date: "2023-04-10",
        },
      ],
      featured: true,
      isOrganic: true,
      listedDate: "2023-04-01",
      shippingTime: "1-2 days",
      tags: ["organic", "fresh", "local"],
    },
    {
      id: "prod2",
      name: "Premium Wheat Flour",
      description: "High-protein wheat flour, perfect for bread making and pastries.",
      price: 2.49,
      unit: "kg",
      category: "grains",
      image: "/images/wheat.webp?height=300&width=300",
      seller: sellers[2],
      available: 200,
      rating: 4.5,
      reviews: [
        {
          id: "rev3",
          userId: "user3",
          userName: "Michael B.",
          rating: 5,
          comment: "Makes excellent bread! Will buy again.",
          date: "2023-03-28",
        },
      ],
      featured: false,
      isOrganic: false,
      listedDate: "2023-03-15",
      shippingTime: "2-3 days",
    },
    {
      id: "prod3",
      name: "Fresh Strawberries",
      description: "Sweet, juicy strawberries picked at peak ripeness.",
      price: 4.99,
      originalPrice: 5.99,
      unit: "basket",
      category: "fruits",
      image: "/images/strawberries.jpg?height=300&width=300",
      seller: sellers[1],
      available: 30,
      rating: 4.8,
      reviews: [],
      featured: true,
      isOrganic: true,
      listedDate: "2023-04-05",
      shippingTime: "1 day",
      tags: ["seasonal", "organic"],
    },
    {
      id: "prod4",
      name: "Fresh Soybeans",
      description: "High-protein soybeans, ideal for oil production and animal feed.",
      price: 8.99,
      unit: "kg",
      category: "legumes",
      image: "/images/soyabeans.jpg?height=200&width=200",
      seller: sellers[3],
      available: 15,
      rating: 4.9,
      reviews: [],
      featured: true,
      isOrganic: true,
      listedDate: "2023-03-20",
      shippingTime: "2 days",
      tags: ["artisanal", "gourmet"],
    },
    {
      id: "prod5",
      name: "Grass-fed Beef",
      description: "Premium cuts from grass-fed, pasture-raised cattle. No hormones or antibiotics.",
      price: 12.99,
      unit: "lb",
      category: "livestock",
      image: "/images/beef.jpg?height=300&width=300",
      seller: sellers[4],
      available: 20,
      rating: 4.7,
      reviews: [],
      featured: false,
      isOrganic: true,
      listedDate: "2023-03-25",
      shippingTime: "1-2 days",
      tags: ["grass-fed", "sustainable"],
    },
    {
      id: "prod6",
      name: "Organic Carrot Seeds",
      description: "Heirloom carrot seeds for organic gardening. High germination rate.",
      price: 3.49,
      unit: "packet",
      category: "seeds",
      image: "/images/carrot.webp?height=300&width=300",
      seller: sellers[0],
      available: 100,
      rating: 4.6,
      reviews: [],
      featured: false,
      isOrganic: true,
      listedDate: "2023-02-15",
      tags: ["heirloom", "organic"],
    },
    {
      id: "prod7",
      name: "Organic Compost",
      description: "Rich, organic compost made from plant materials. Perfect for enriching garden soil.",
      price: 7.99,
      unit: "bag",
      category: "fertilizers",
      image: "/images/organic.jpeg?height=300&width=300",
      seller: sellers[0],
      available: 40,
      rating: 4.5,
      reviews: [],
      featured: false,
      isOrganic: true,
      listedDate: "2023-03-10",
      shippingTime: "3-5 days",
    },
    {
      id: "prod8",
      name: "Premium Quality Corn",
      description: "Freshly harvested sweet corn, perfect for direct consumption or processing.",
      price: 19.99,
      originalPrice: 24.99,
      unit: "kg",
      category: "grains",
      image: "/images/corn.webp?height=200&width=200",
      seller: sellers[2],
      available: 25,
      rating: 4.4,
      reviews: [],
      featured: true,
      isOrganic: true,
      listedDate: "2023-02-28",
      shippingTime: "2-4 days",
    },
    {
      id: "prod9",
      name: "Organic Apples",
      description: "Crisp, sweet organic apples grown without synthetic pesticides.",
      price: 4.49,
      unit: "kg",
      category: "fruits",
      image: "/images/apple.jpeg?height=300&width=300",
      seller: sellers[1],
      available: 60,
      rating: 4.6,
      reviews: [],
      featured: true,
      isOrganic: true,
      listedDate: "2023-04-02",
      shippingTime: "1-2 days",
      tags: ["organic", "fresh"],
    },
    {
      id: "prod10",
      name: "Brown Rice",
      description: "Whole grain brown rice, rich in fiber and nutrients.",
      price: 3.29,
      unit: "kg",
      category: "grains",
      image: "/images/rice.jpeg?height=300&width=300",
      seller: sellers[2],
      available: 150,
      rating: 4.3,
      reviews: [],
      featured: false,
      isOrganic: true,
      listedDate: "2023-03-18",
      shippingTime: "2-3 days",
    },
    {
      id: "prod11",
      name: "Fresh Spinach",
      description: "Tender, dark green spinach leaves. Rich in iron and vitamins.",
      price: 2.99,
      unit: "bunch",
      category: "vegetables",
      image: "/images/spinach.jpeg?height=300&width=300",
      seller: sellers[0],
      available: 40,
      rating: 4.5,
      reviews: [],
      featured: false,
      isOrganic: true,
      listedDate: "2023-04-03",
      shippingTime: "1 day",
      tags: ["organic", "fresh"],
    },
    {
      id: "prod12",
      name: "Raw Honey",
      description: "Unfiltered, pure honey from local wildflowers.",
      price: 9.99,
      unit: "jar",
      category: "organic",
      image: "/images/honey.jpg?height=300&width=300",
      seller: sellers[3],
      available: 30,
      rating: 4.9,
      reviews: [],
      featured: true,
      isOrganic: true,
      listedDate: "2023-03-22",
      shippingTime: "2-3 days",
      tags: ["raw", "local"],
    },
    {
      id: "prod13",
      name: "Free-range Eggs",
      description: "Farm-fresh eggs from free-range chickens. Rich, orange yolks.",
      price: 5.49,
      unit: "dozen",
      category: "dairy",
      image: "/images/egg.webp?height=300&width=300",
      seller: sellers[4],
      available: 25,
      rating: 4.7,
      reviews: [],
      featured: false,
      isOrganic: true,
      listedDate: "2023-04-04",
      shippingTime: "1-2 days",
      tags: ["free-range", "fresh"],
    },
    {
      id: "prod14",
      name: "Pruning Shears",
      description: "Professional-grade pruning shears with titanium-coated blades.",
      price: 24.99,
      originalPrice: 29.99,
      unit: "piece",
      category: "equipment",
      image: "/images/shears.jpg?height=300&width=300",
      seller: sellers[5],
      available: 15,
      rating: 4.6,
      reviews: [],
      featured: false,
      isOrganic: false,
      listedDate: "2023-03-12",
      shippingTime: "2-4 days",
    },
    {
      id: "prod15",
      name: "Organic Potatoes",
      description: "Versatile, all-purpose organic potatoes. Great for roasting, mashing, or frying.",
      price: 2.79,
      unit: "kg",
      category: "vegetables",
      image: "/images/potato.jpg?height=300&width=300",
      seller: sellers[0],
      available: 80,
      rating: 4.4,
      reviews: [],
      featured: false,
      isOrganic: true,
      listedDate: "2023-03-30",
      shippingTime: "1-2 days",
      tags: ["organic", "staple"],
    },
    {
      id: "prod16",
      name: "Heirloom Tomato Seeds",
      description: "Mixed variety of colorful heirloom tomato seeds. Unique flavors and appearances.",
      price: 4.99,
      unit: "packet",
      category: "seeds",
      image: "/images/seed.jpg?height=300&width=300",
      seller: sellers[0],
      available: 50,
      rating: 4.8,
      reviews: [],
      featured: false,
      isOrganic: true,
      listedDate: "2023-02-20",
      tags: ["heirloom", "organic"],
    },
    {
      id: "prod17",
      name: "Organic Blueberries",
      description: "Sweet, plump organic blueberries. High in antioxidants.",
      price: 6.99,
      unit: "pint",
      category: "fruits",
      image: "/images/blueberry.webp?height=300&width=300",
      seller: sellers[1],
      available: 20,
      rating: 4.7,
      reviews: [],
      featured: true,
      isOrganic: true,
      listedDate: "2023-04-06",
      shippingTime: "1 day",
      tags: ["organic", "superfood"],
    },
    {
      id: "prod18",
      name: "Artisanal Butter",
      description: "Small-batch cultured butter made from grass-fed cow's milk.",
      price: 7.49,
      unit: "8oz",
      category: "dairy",
      image: "/images/butter.jpg?height=300&width=300",
      seller: sellers[3],
      available: 15,
      rating: 4.9,
      reviews: [],
      featured: false,
      isOrganic: true,
      listedDate: "2023-03-25",
      shippingTime: "2 days",
      tags: ["artisanal", "grass-fed"],
    },
    {
      id: "prod19",
      name: "Organic Chicken Feed",
      description: "Balanced, organic feed for laying hens. No GMOs or artificial additives.",
      price: 19.99,
      unit: "bag",
      category: "livestock",
      image: "/images/feed.jpg?height=300&width=300",
      seller: sellers[4],
      available: 30,
      rating: 4.5,
      reviews: [],
      featured: false,
      isOrganic: true,
      listedDate: "2023-03-15",
      shippingTime: "2-3 days",
      tags: ["organic", "non-GMO"],
    },
    {
      id: "prod20",
      name: "Garden Irrigation Kit",
      description: "Complete drip irrigation system for efficient garden watering.",
      price: 49.99,
      originalPrice: 59.99,
      unit: "kit",
      category: "equipment",
      image: "/images/kit.webp?height=300&width=300",
      seller: sellers[5],
      available: 10,
      rating: 4.6,
      reviews: [],
      featured: true,
      isOrganic: false,
      listedDate: "2023-03-05",
      shippingTime: "3-5 days",
    },
  ]
  
  // Collections
  const collections = [
    {
      id: "seasonal",
      name: "Seasonal Favorites",
      description: "The best products currently in season",
      productIds: ["prod3", "prod9", "prod17", "prod11"],
    },
    {
      id: "organic-essentials",
      name: "Organic Essentials",
      description: "Must-have organic products for your home",
      productIds: ["prod1", "prod12", "prod15", "prod13"],
    },
    {
      id: "farm-equipment",
      name: "Essential Farm Equipment",
      description: "Tools every farmer needs",
      productIds: ["prod8", "prod14", "prod20"],
    },
  ]
  
  // Special offers
  const specialOffers = [
    {
      id: "offer1",
      productId: "prod3",
      discount: 20,
      endDate: "2023-05-15",
    },
    {
      id: "offer2",
      productId: "prod8",
      discount: 15,
      endDate: "2023-05-10",
    },
    {
      id: "offer3",
      productId: "prod14",
      discount: 20,
      endDate: "2023-05-20",
    },
    {
      id: "offer4",
      productId: "prod20",
      discount: 15,
      endDate: "2023-05-25",
    },
  ]
  
  // Recently viewed products (simulated user history)
  const recentlyViewed = ["prod12", "prod4", "prod17", "prod20"]
  
  // Shopping cart (simulated)
  const cart = [
    {
      productId: "prod1",
      quantity: 2,
    },
    {
      productId: "prod12",
      quantity: 1,
    },
  ]
  
  // Saved for later (simulated)
  const savedForLater = ["prod9", "prod20"]
  
  // Helper functions
  export function getProductsByCategory(categoryId: string): Product[] {
    return products.filter((product) => product.category === categoryId)
  }
  
  export function getProductsBySeller(sellerId: string): Product[] {
    return products.filter((product) => product.seller.id === sellerId)
  }
  
  export function getFeaturedProducts(): Product[] {
    return products.filter((product) => product.featured)
  }
  
  export function getProductsOnSale(): Product[] {
    return products.filter((product) => product.originalPrice !== undefined)
  }
  
  export function getProductById(productId: string): Product | undefined {
    return products.find((product) => product.id === productId)
  }
  
  export function getProductReviews(productId: string): Review[] {
    const product = getProductById(productId)
    return product?.reviews || []
  }
  
  export function getSellerById(sellerId: string): Seller | undefined {
    return sellers.find((seller) => seller.id === sellerId)
  }
  
  export function getCollectionProducts(collectionId: string): Product[] {
    const collection = collections.find((c) => c.id === collectionId)
    if (!collection) return []
  
    return collection.productIds
      .map((id) => getProductById(id))
      .filter((product): product is Product => product !== undefined)
  }
  
  // Export all data
  export const marketplaceData = {
    products,
    categories,
    sellers,
    collections,
    specialOffers,
    recentlyViewed,
    cart,
    savedForLater,
  }
  
  export default marketplaceData
  