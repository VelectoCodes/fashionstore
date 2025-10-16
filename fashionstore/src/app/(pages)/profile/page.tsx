'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { UserIcon, ShoppingBagIcon, HeartIcon, CreditCardIcon, CogIcon, PencilIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '@/lib/utils'

// Mock user data
interface User {
  id: string
  name: string
  email: string
  avatar?: string
  phone?: string
  joinedDate: string
  isLoggedIn: boolean
  wishlist: string[]
  orders: Order[]
  addresses: Address[]
}

interface Order {
  id: string
  date: string
  status: 'pending' | 'delivered' | 'shipped' | 'cancelled'
  total: number
  items: number
}

interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

// Tab Components
function AccountOverview({ user }: { user: User }) {
  const stats = [
    { label: 'Total Orders', value: user.orders.length.toString(), icon: ShoppingBagIcon },
    { label: 'Items in Wishlist', value: user.wishlist.length.toString(), icon: HeartIcon },
    { label: 'Saved Addresses', value: user.addresses.length.toString(), icon: CogIcon },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <UserIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
            <p className="text-purple-100">Member since {new Date(user.joinedDate).getFullYear()}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <stat.icon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
        </div>
        <div className="p-6">
          {user.orders.length > 0 ? (
            <div className="space-y-4">
              {user.orders.slice(0, 3).map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Order #{order.id.slice(-6)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{formatPrice(order.total)}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div className="pt-4">
                <Link
                  href="#"
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
                >
                  View all orders →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingBagIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-4">No orders yet</p>
              <Link
                href="/shop"
                className="inline-flex items-center bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PersonalInfo({ user, onUpdateUser }: { user: User; onUpdateUser: (updatedUser: Partial<User>) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || ''
  })

  const handleSave = () => {
    onUpdateUser(formData)
    setIsEditing(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <PencilIcon className="h-4 w-4" />
            <span className="text-sm">{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <UserIcon className="h-10 w-10 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">{user.name}</h4>
            <p className="text-gray-600 dark:text-gray-300">Member since {new Date(user.joinedDate).getFullYear()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{user.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Add phone number"
              />
            ) : (
              <p className="text-gray-900 dark:text-white">{user.phone || 'Not provided'}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSave}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function Addresses({ addresses, onAddAddress }: {
  addresses: Address[]
  onAddAddress: (address: Address) => void
}) {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delivery Addresses</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm"
          >
            Add Address
          </button>
        </div>
      </div>
      <div className="p-6">
        {addresses.length === 0 ? (
          <div className="text-center py-8">
            <CreditCardIcon className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 mb-4">No addresses saved</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address, index) => (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize text-gray-900 dark:text-white">
                    {address.type} Address
                  </span>
                  {address.isDefault && (
                    <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 px-2 py-1 rounded-full text-xs font-medium">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                  <p>{address.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Sunday Benjamin',
    email: 'sundaybenjamin@gmail.com',
    phone: '+2347012401983',
    joinedDate: '2023-01-15',
    isLoggedIn: true,
    wishlist: [],
    orders: [
      { id: 'ORD001', date: '2024-01-15', status: 'delivered', total: 299, items: 2 },
      { id: 'ORD002', date: '2024-01-10', status: 'shipped', total: 499, items: 1 },
      { id: 'ORD003', date: '2023-12-20', status: 'delivered', total: 150, items: 1 }
    ],
    addresses: [
      {
        id: '1',
        type: 'home',
        street: '123 Fashion Street',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA',
        isDefault: true
      }
    ]
  })

  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: UserIcon },
    { id: 'info', label: 'Personal Info', icon: CogIcon },
    { id: 'addresses', label: 'Addresses', icon: CreditCardIcon }
  ]

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Account</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8">
          <div className="flex space-x-8 px-6 pt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 pb-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && <AccountOverview user={user} />}
          {activeTab === 'info' && (
            <PersonalInfo
              user={user}
              onUpdateUser={updateUser}
            />
          )}
          {activeTab === 'addresses' && (
            <Addresses
              addresses={user.addresses}
              onAddAddress={(address) => {
                setUser(prev => ({
                  ...prev,
                  addresses: [...prev.addresses, address]
                }))
              }}
            />
          )}
        </motion.div>

        {/* Sign Out */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}
