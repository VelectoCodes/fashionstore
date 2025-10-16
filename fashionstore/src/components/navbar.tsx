'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, HeartIcon, ShoppingBagIcon, UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ThemeToggle } from './theme-toggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Lookbook', href: '/lookbook' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            FASHION<span className="text-purple-600">STORE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative transition-colors duration-200 font-medium ${
                    isActive
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <Link href="/wishlist" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <HeartIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <Link href="/profile" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <UserIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <ThemeToggle />
            <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <ShoppingBagIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex space-x-4">
                  <Link href="/wishlist" className="flex items-center text-gray-700 dark:text-gray-300">
                    <HeartIcon className="h-5 w-5 mr-2" />
                    Wishlist
                  </Link>
                  <Link href="/cart" className="flex items-center text-gray-700 dark:text-gray-300">
                    <ShoppingBagIcon className="h-5 w-5 mr-2" />
                    Cart
                  </Link>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative max-w-2xl mx-auto mt-32 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4 mb-6">
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for products, brands, or styles..."
                    className="flex-1 text-lg border-0 focus:ring-0 focus:outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        // Navigate to shop with search query
                        const searchTerm = e.currentTarget.value.trim()
                        if (searchTerm) {
                          router.push(`/shop?search=${encodeURIComponent(searchTerm)}`)
                          setIsSearchOpen(false)
                        }
                      }
                      if (e.key === 'Escape') {
                        setIsSearchOpen(false)
                      }
                    }}
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">POPULAR SEARCHES</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Leather Jacket',
                      'Designer Sneakers',
                      'Diamond Earrings',
                      'Cashmere Sweater',
                      'Silk Scarf'
                    ].map((term, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          router.push(`/shop?search=${encodeURIComponent(term)}`)
                          setIsSearchOpen(false)
                        }}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-400 transition-colors text-sm"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Keyboard Shortcuts */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Press Enter to search</span>
                    <span>⎋ to close</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
