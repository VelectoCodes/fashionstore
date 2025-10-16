'use client'

import Link from 'next/link'


export default function Footer() {
  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '/shop?filter=new' },
      { name: 'Best Sellers', href: '/shop?filter=bestsellers' },
      { name: 'Sale', href: '/shop?filter=sale' },
      { name: 'All Products', href: '/shop' },
    ],
    categories: [
      { name: 'Clothing', href: '/shop?category=clothing' },
      { name: 'Jewelry', href: '/shop?category=jewelry' },
      { name: 'Accessories', href: '/shop?category=accessories' },
      { name: 'Shoes', href: '/shop?category=shoes' },
    ],
    support: [
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Contact Us', href: '/contact' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Careers', href: '/careers' },
    ],
  }

  const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'Twitter', href: '#' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 pb-8 border-b border-gray-800">
          <div>
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get special offers, free giveaways, and early access to new styles.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md font-medium transition-colors duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-800 pt-8">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <Link href="/" className="text-2xl font-bold text-white">
              FASHION<span className="text-purple-400">STORE</span>
            </Link>
            <p className="text-gray-400 text-sm mt-2">
              © 2024 FashionStore. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.name}
                </a>
              ))}
            </div>

            {/* Payment Icons Placeholder */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm ml-6">
              <span className="px-2 py-1 bg-gray-800 rounded">Visa</span>
              <span className="px-2 py-1 bg-gray-800 rounded">MC</span>
              <span className="px-2 py-1 bg-gray-800 rounded">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
