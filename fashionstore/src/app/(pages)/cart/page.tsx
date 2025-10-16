'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '@/lib/utils'
import { CartItem } from '@/types'

function CartItemComponent({
  item,
  onQuantityChange,
  onRemove
}: {
  item: CartItem
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={item.product.images[0] || '/placeholder-product.jpg'}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
          {item.product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Brand: {item.product.brand}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Size: {item.size} • Color: {item.color}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
          <button
            onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))}
            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 select-none font-medium">
            {item.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(item.quantity + 1)}
            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Price */}
        <div className="text-right min-w-[80px]">
          <p className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(item.product.price * item.quantity)}
          </p>
          {item.quantity > 1 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatPrice(item.product.price)} each
            </p>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  )
}

function OrderSummary({
  subtotal,
  shipping,
  tax,
  total
}: {
  subtotal: number
  shipping: number
  tax: number
  total: number
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Order Summary
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-700" />

        <div className="flex justify-between text-xl font-semibold text-gray-900 dark:text-white">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl mt-6 transition-colors duration-200 flex items-center justify-center">
        Proceed to Checkout
        <ArrowRightIcon className="h-5 w-5 ml-2" />
      </button>
    </div>
  )
}

function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto">
          Looks like you haven't added any items to your cart yet.
          Start shopping to fill it up!
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          Start Shopping
          <ArrowRightIcon className="h-5 w-5 ml-2" />
        </Link>
      </motion.div>
    </div>
  )
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const cartData = localStorage.getItem('cart')
    if (cartData) {
      try {
        const items = JSON.parse(cartData)
        setCartItems(items)
      } catch (error) {
        console.error('Error loading cart data:', error)
      }
    }
  }, [])

  // Save cart items to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const shipping = subtotal >= 100 ? 0 : 10 // Free shipping over $100
  const tax = Math.round(subtotal * 0.08 * 100) / 100 // 8% tax
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Shopping Cart</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Add items to your cart to see them here
            </p>
          </div>
          <EmptyCart />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Shopping Cart</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
              />
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors font-semibold"
          >
            <ArrowRightIcon className="h-5 w-5 mr-2 rotate-180" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
