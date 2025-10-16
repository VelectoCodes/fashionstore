/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'www.istockphoto.com'],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
