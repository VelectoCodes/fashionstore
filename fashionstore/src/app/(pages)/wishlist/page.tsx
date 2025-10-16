'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { HeartIcon, ShoppingBagIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { mockProducts } from '@/data/mockData'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'

// Wishlist Item Component
function WishlistItem({ product, onRemove }: { product: Product; onRemove: (id: string) => void }) {
  const handleAddToCart = () => {
    // Save to cart functionality
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const cartItem = {
      id: Date.now().toString(),
      productId: product.id,
      product,
      quantity: 1,
      size: product.size[0],
      color: product.color
    }
    cart.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart!')
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0] || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
            Sale
          </div>
        )}
        <button
          onClick={() => onRemove(product.id)}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1">
          <div className="flex items-center text-sm text-gray-900 dark:text-white">
            <HeartSolidIcon className="h-4 w-4 text-red-500 mr-1" />
            Saved
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {product.name}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 capitalize ml-2">
            {product.category}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <span>⭐ {product.rating}</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-full transition-colors duration-200 flex items-center justify-center text-sm"
          >
            <ShoppingBagIcon className="h-4 w-4 mr-2" />
            Add to Cart
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-full transition-colors duration-200 flex items-center justify-center text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    const products = mockProducts.filter(product => savedWishlist.includes(product.id))
    setWishlistItems(products)
  }, [])

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId)
    const productIds = updatedWishlist.map(item => item.id)
    localStorage.setItem('wishlist', JSON.stringify(productIds))
    setWishlistItems(updatedWishlist)
  }

  const clearWishlist = () => {
    localStorage.setItem('wishlist', JSON.stringify([]))
    setWishlistItems([])
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/shop"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div className="flex items-center space-x-2">
              <HeartSolidIcon className="h-6 w-6 text-red-500" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Wishlist
              </h1>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 ml-11">
            {wishlistItems.length === 0
              ? "Your wishlist is empty. Start exploring and save your favorite items!"
              : `You have ${wishlistItems.length} item${wishlistItems.length === 1 ? '' : 's'} in your wishlist`
            }
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex justify-between items-center mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <span className="text-gray-700 dark:text-gray-300">
              {wishlistItems.length} item{wishlistItems.length === 1 ? '' : 's'} saved
            </span>
            <button
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Wishlist Grid */}
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="mb-6">
              <HeartIcon className="h-24 w-24 text-gray-300 dark:text-gray-600 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Start exploring our collection and save your favorite items for later.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              <span className="mr-2">🛍️</span>
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {wishlistItems.map((product) => (
                <WishlistItem
                  key={product.id}
                  product={product}
                  onRemove={removeFromWishlist}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Continue Shopping */}
        {wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/shop"
              className="inline-flex items-center bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all duration-200 group"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2 rotate-180 group-hover:translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
