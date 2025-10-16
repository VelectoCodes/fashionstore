'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, EyeIcon } from '@heroicons/react/24/outline'
import { lookbooks, mockProducts, categories } from '@/data/mockData'

function LookbookCard({ lookbook }: { lookbook: typeof lookbooks[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <Link href={`/lookbook/${lookbook.slug}`}>
        <div className="relative rounded-2xl overflow-hidden">
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            <Image
              src={lookbook.image}
              alt={lookbook.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{lookbook.title}</h3>
                <p className="text-gray-200 mb-4 max-w-md">{lookbook.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <EyeIcon className="h-5 w-5" />
                    <span className="text-sm">View Collection</span>
                  </div>
                  <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function ProductPreview({ products }: { products: typeof mockProducts }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {products.slice(0, 6).map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group cursor-pointer"
        >
          <Link href={`/product/${product.slug}`}>
            <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                {product.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ${product.price}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

function CategoryShowcase() {
  const featuredCategories = categories.slice(0, 4)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover curated collections across our premium fashion categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/shop?category=${category.slug}`}>
                <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200 opacity-90 group-hover:opacity-100 transition-opacity">
                      Explore Collection →
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LookbookPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=1080&fit=crop&auto=format"
          alt="Fashion Lookbook"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Fashion
            <span className="block text-purple-300">Lookbooks</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Curated collections that inspire and define modern luxury fashion
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
          >
            Explore Collections
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </motion.div>
        </div>
      </section>

      {/* Lookbooks Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Curated Collections
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Each lookbook tells a unique story through carefully selected pieces that blend style and sophistication
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {lookbooks.map((lookbook, index) => (
              <motion.div
                key={lookbook.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <LookbookCard lookbook={lookbook} />

                {/* Product Preview */}
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Featured Pieces
                  </h3>
                  <ProductPreview products={lookbook.products} />

                  <Link
                    href={`/shop`}
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold group"
                  >
                    Shop This Look
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoryShowcase />

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Style Your Way
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Find inspiration and build your unique aesthetic with our curated fashion collections
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Shopping
              </Link>
              <Link
                href="/blog"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Style Guides
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
