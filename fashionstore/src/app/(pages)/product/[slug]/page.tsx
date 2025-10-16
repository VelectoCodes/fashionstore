'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { StarIcon, HeartIcon, ShoppingBagIcon, TruckIcon, ShieldCheckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { mockProducts } from '@/data/mockData'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'

function ProductImageGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={images[selectedImage] || '/placeholder-product.jpg'}
          alt="Product"
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square w-20 rounded-lg overflow-hidden border-2 ${
                selectedImage === index
                  ? 'border-purple-500'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <Image
                src={image || '/placeholder-product.jpg'}
                alt={`Product ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star}>
          {star <= rating ? (
            <StarSolidIcon className="h-4 w-4 text-yellow-400" />
          ) : (
            <StarIcon className="h-4 w-4 text-gray-300" />
          )}
        </div>
      ))}
    </div>
  )
}

function SizeSelector({ sizes, selectedSize, onSizeChange }: {
  sizes: string[]
  selectedSize: string
  onSizeChange: (size: string) => void
}) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 dark:text-white">Size</h4>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-4 py-2 border rounded-lg font-medium text-sm transition-colors ${
              selectedSize === size
                ? 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

function ReviewList({ reviews }: { reviews: Product['reviews'] }) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
        >
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center font-medium text-white text-sm">
              {review.userName.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {review.userName}
                </span>
                {review.verified && (
                  <div className="text-xs text-green-600 dark:text-green-400 flex items-center">
                    <ShieldCheckIcon className="h-3 w-3 mr-1" />
                    Verified
                  </div>
                )}
              </div>
              <ReviewStars rating={review.rating} />
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {review.comment}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const product = mockProducts.find(p => p.slug === slug)

  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    // Here you would typically dispatch to a cart context or state management
    alert(`Added ${quantity} x ${product.name} (${selectedSize}) to cart!`)

    // For now, we'll just store in localStorage
    const cartItem = {
      id: Date.now().toString(),
      productId: product.id,
      product,
      quantity,
      size: selectedSize,
      color: product.color
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-purple-600">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-purple-600">Shop</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery images={product.images} />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                <ReviewStars rating={product.rating} />
                <span>({product.reviews.length} reviews)</span>
                <span>•</span>
                <span className="capitalize">{product.category}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <SizeSelector
              sizes={product.size}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-gray-900 dark:text-white">Quantity:</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-center min-w-[3rem] select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 flex items-center justify-center"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full border-2 transition-colors duration-200 ${
                    isWishlisted
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                  }`}
                >
                  <HeartIcon className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Product Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <TruckIcon className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Free Shipping</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <ShieldCheckIcon className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Secure Checkout</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">100% secure payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'reviews', label: `Reviews (${product.reviews.length})` },
                { id: 'shipping', label: 'Shipping & Returns' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[200px]">
            {activeTab === 'description' && (
              <div className="max-w-4xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Specifications</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li><strong>Brand:</strong> {product.brand}</li>
                      <li><strong>Material:</strong> {product.material}</li>
                      <li><strong>Color:</strong> {product.color}</li>
                      <li><strong>Sizes:</strong> {product.size.join(', ')}</li>
                      <li><strong>Category:</strong> {product.category}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">About This Item</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && product.reviews.length > 0 && (
              <div className="max-w-4xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h3>
                <ReviewList reviews={product.reviews} />
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-4xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shipping & Returns</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Shipping Information</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>✓ Free standard shipping on orders over $100</li>
                      <li>✓ Express shipping available ($15)</li>
                      <li>✓ International shipping available</li>
                      <li>✓ Orders typically ship within 1-2 business days</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Returns</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>✓ 30-day return window</li>
                      <li>✓ Free return shipping</li>
                      <li>✓ Items must be in original condition</li>
                      <li>✓ Refund processed within 5-7 business days</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Shop */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/shop"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors group"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  )
}
