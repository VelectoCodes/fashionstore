'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Squares2X2Icon, ListBulletIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { mockProducts, categories, brands } from '@/data/mockData'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'

// Filter State Type
interface FilterState {
  category: string[]
  brand: string[]
  priceRange: [number, number]
  inStock: boolean
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
}

// Filter Sidebar Component
function FilterSidebar({ filters, onFilterChange, isOpen, onClose }: {
  filters: FilterState
  onFilterChange: (newFilters: Partial<FilterState>) => void
  isOpen: boolean
  onClose: () => void
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const shouldShow = isOpen || (isClient && window.innerWidth >= 1024)

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className={`lg:relative lg:block lg:z-0 ${isOpen ? 'fixed z-50' : 'hidden'}`}
        >
          {/* Backdrop for mobile */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/50 lg:hidden z-10"
              onClick={onClose}
            />
          )}

          <div className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-80 h-full lg:h-auto lg:min-h-screen p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Categories Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category.name)}
                      onChange={(e) => {
                        const newCategories = e.target.checked
                          ? [...filters.category, category.name]
                          : filters.category.filter(c => c !== category.name)
                        onFilterChange({ category: newCategories })
                      }}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 capitalize">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Brand</h4>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.brand.includes(brand.name)}
                      onChange={(e) => {
                        const newBrands = e.target.checked
                          ? [...filters.brand, brand.name]
                          : filters.brand.filter(b => b !== brand.name)
                        onFilterChange({ brand: newBrands })
                      }}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      {brand.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                </div>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="100"
                  value={filters.priceRange[1]}
                  onChange={(e) => onFilterChange({
                    priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none thumb:bg-purple-600"
                />
              </div>
            </div>

            {/* Stock Filter */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => onFilterChange({ inStock: e.target.checked })}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  In Stock Only
                </span>
              </label>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => onFilterChange({
                category: [],
                brand: [],
                priceRange: [0, 3000],
                inStock: false
              })}
              className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Product Card Component
function ProductCard({ product, view }: { product: Product; view: string }) {
  if (view === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="group cursor-pointer"
      >
        <Link href={`/product/${product.slug}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
            <div className="flex space-x-6">
              <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={product.images[0] || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {product.rating} ⭐
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group cursor-pointer"
    >
      <Link href={`/product/${product.slug}`}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={product.images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                Sale
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {product.rating} ⭐
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {product.category}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    brand: [],
    priceRange: [0, 3000],
    inStock: false,
    sortBy: 'popular'
  })
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and sort products
  useEffect(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category)
      const matchesBrand = filters.brand.length === 0 || filters.brand.includes(product.brand)
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const matchesStock = !filters.inStock || product.inStock

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesStock
    })

    // Sort products
    filtered = filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return new Date(b.id).getTime() - new Date(a.id).getTime()
        default:
          return 0
      }
    })

    setProducts(filtered)
  }, [filters, searchQuery])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Shop</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover unique pieces from our curated collection
          </p>
        </div>

        {/* Search and Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />

            {/* Filters Mobile Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <FunnelIcon className="h-5 w-5" />
              <span className="text-sm">Filters</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-md ${view === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
              >
                <Squares2X2Icon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-md ${view === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
              >
                <ListBulletIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 lg:pl-8">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                {products.length} {products.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            {/* Product Grid */}
            <motion.div
              layout
              className={`grid gap-6 ${
                view === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} view={view} />
              ))}
            </motion.div>

            {/* No Results */}
            {products.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      category: [],
                      brand: [],
                      priceRange: [0, 3000],
                      inStock: false,
                      sortBy: 'popular'
                    })
                    setSearchQuery('')
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
