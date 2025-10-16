export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  brand: string
  material: string
  color: string
  size: string[]
  inStock: boolean
  featured: boolean
  rating: number
  reviews: Review[]
  tags: string[]
  slug: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  size: string
  color: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isLoggedIn: boolean
  wishlist: string[]
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark'
  currency: string
  language: string
}

export interface Category {
  id: string
  name: string
  image: string
  slug: string
}

export interface Brand {
  id: string
  name: string
  image: string
  description: string
  slug: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  image: string
  tags: string[]
  date: string
  readTime: number
  slug: string
}

export interface Lookbook {
  id: string
  title: string
  description: string
  image: string
  products: Product[]
  date: string
  slug: string
}

export interface FilterOptions {
  category: string[]
  brand: string[]
  priceRange: [number, number]
  color: string[]
  size: string[]
  material: string[]
  rating: number
}

export interface SearchParams {
  query: string
  category?: string
  minPrice?: number
  maxPrice?: number
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
}

export interface StyleRecommendation {
  id: string
  title: string
  description: string
  products: Product[]
  image: string
}
