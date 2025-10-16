import { Product, Category, Brand, BlogPost, Lookbook, StyleRecommendation } from '@/types'

export const categories: Category[] = [
  {
    id: '1',
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop&auto=format',
    slug: 'clothing'
  },
  {
    id: '2',
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&auto=format',
    slug: 'jewelry'
  },
  {
    id: '3',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop&auto=format',
    slug: 'accessories'
  },
  {
    id: '4',
    name: 'Shoes',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop&auto=format',
    slug: 'shoes'
  },
  {
    id: '5',
    name: 'Bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format',
    slug: 'bags'
  },
  {
    id: '6',
    name: 'Watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&auto=format',
    slug: 'watches'
  }
]

export const brands: Brand[] = [
  {
    id: '1',
    name: 'Urban Luxe',
    image: '/globe.svg',
    description: 'Contemporary luxury fashion for the modern elite',
    slug: 'urban-luxe'
  },
  {
    id: '2',
    name: 'Street Couture',
    image: '/file.svg',
    description: 'Where streetwear meets high fashion',
    slug: 'street-couture'
  },
  {
    id: '3',
    name: 'Elite Style',
    image: '/next.svg',
    description: 'Exclusive fashion for distinguished taste',
    slug: 'elite-style'
  }
]

export const mockProducts: Product[] = [
  // Clothing Collection
  {
    id: '1',
    name: 'Premium Leather Jacket',
    description: 'Crafted from the finest Italian leather with a modern streetwear twist',
    price: 1299,
    originalPrice: 1599,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551028729-ca67d7fe90f0?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1554200876-907f9286c2a1?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Clothing',
    brand: 'Urban Luxe',
    material: 'Leather',
    color: 'Black',
    size: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Alex Chen',
        rating: 5,
        comment: 'Absolutely stunning jacket! The quality is beyond expectations.',
        date: '2024-01-15',
        verified: true
      }
    ],
    tags: ['luxury', 'streetwear', 'leather'],
    slug: 'premium-leather-jacket'
  },
  {
    id: '6',
    name: 'Cashmere Turtleneck Sweater',
    description: 'Sustainable cashmere blend turtleneck with subtle texture detail',
    price: 449,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Clothing',
    brand: 'Elite Style',
    material: 'Cashmere',
    color: 'Navy',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: [],
    tags: ['cashmere', 'winter', 'luxury'],
    slug: 'cashmere-turtleneck-sweater'
  },
  {
    id: '7',
    name: 'Oversized Denim Jacket',
    description: 'Classic oversized denim with deliberate distressing and premium hardware',
    price: 299,
    originalPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Clothing',
    brand: 'Street Couture',
    material: 'Denim',
    color: 'Blue',
    size: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: [],
    tags: ['denim', 'oversized', 'streetwear'],
    slug: 'oversized-denim-jacket'
  },
  {
    id: '8',
    name: 'Merino Wool Coat',
    description: 'Ultra-lightweight merino wool coat with sophisticated tailoring',
    price: 899,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Clothing',
    brand: 'Urban Luxe',
    material: 'Merino Wool',
    color: 'Charcoal',
    size: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: [],
    tags: ['wool', 'coat', 'luxury'],
    slug: 'merino-wool-coat'
  },

  // Jewelry Collection
  {
    id: '2',
    name: 'Gold Chain Necklace',
    description: 'Handcrafted gold vermeil chain with diamond accents',
    price: 899,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Jewelry',
    brand: 'Elite Style',
    material: 'Gold',
    color: 'Gold',
    size: [' One Size'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: [],
    tags: ['jewelry', 'luxury', 'gold'],
    slug: 'gold-chain-necklace'
  },
  {
    id: '5',
    name: 'Diamond Stud Earrings',
    description: 'Sparkling diamond stud earrings in elegant platinum setting',
    price: 2199,
    images: [
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Jewelry',
    brand: 'Elite Style',
    material: 'Platinum',
    color: 'Silver',
    size: [' One Size'],
    inStock: true,
    featured: true,
    rating: 5.0,
    reviews: [],
    tags: ['diamonds', 'luxury', 'jewelry'],
    slug: 'diamond-earrings'
  },
  {
    id: '9',
    name: 'Rose Gold Layered Necklace',
    description: 'Layered rose gold chains with delicate pearl pendant',
    price: 649,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1596944999499-eed1ba38add2?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Jewelry',
    brand: 'Urban Luxe',
    material: 'Rose Gold',
    color: 'Rose Gold',
    size: [' One Size'],
    inStock: true,
    featured: false,
    rating: 4.8,
    reviews: [],
    tags: ['rose-gold', 'necklace', 'layered'],
    slug: 'rose-gold-layered-necklace'
  },
  {
    id: '10',
    name: 'Minimalist Bracelet Set',
    description: 'Stackable gold and silver bangles for everyday elegance',
    price: 399,
    originalPrice: 499,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Jewelry',
    brand: 'Street Couture',
    material: 'Gold Plated',
    color: 'Mixed',
    size: [' One Size'],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: [],
    tags: ['bracelets', 'minimalist', 'stackable'],
    slug: 'minimalist-bracelet-set'
  },

  // Shoes Collection
  {
    id: '3',
    name: 'Designer Sneakers',
    description: 'Limited edition sneakers featuring premium materials and innovative design',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1580501178144-47a8ca33f86?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Shoes',
    brand: 'Street Couture',
    material: 'Canvas',
    color: 'White',
    size: ['7', '8', '9', '10', '11'],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: [],
    tags: ['sneakers', 'limited-edition', 'designer'],
    slug: 'designer-sneakers'
  },
  {
    id: '11',
    name: 'Leather Chelsea Boots',
    description: 'Handcrafted leather Chelsea boots with elastic sides and stacked heel',
    price: 699,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Shoes',
    brand: 'Urban Luxe',
    material: 'Leather',
    color: 'Brown',
    size: ['6', '7', '8', '9', '10'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: [],
    tags: ['boots', 'chelsea', 'leather'],
    slug: 'leather-chelsea-boots'
  },
  {
    id: '12',
    name: 'Embellished Heeled Sandals',
    description: 'Crystal-embellished heeled sandals with ankle strap detail',
    price: 349,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Shoes',
    brand: 'Elite Style',
    material: 'Faux Leather',
    color: 'Nude',
    size: ['6', '7', '8', '9', '10'],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: [],
    tags: ['sandals', 'embellished', 'heels'],
    slug: 'embellished-heeled-sandals'
  },

  // Accessories Collection
  {
    id: '4',
    name: 'Silk Scarf',
    description: 'Luxurious silk scarf with hand-painted patterns',
    price: 199,
    images: [
      'https://images.unsplash.com/photo-1615704732030-c8a6f7a1356f?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1584081786021-3b6b7026b06b?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1300400427103-e9b5f6b827e9?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Accessories',
    brand: 'Urban Luxe',
    material: 'Silk',
    color: 'Multi-Color',
    size: [' One Size'],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: [],
    tags: ['silk', 'accessory', 'hand-painted'],
    slug: 'silk-scarf'
  },
  {
    id: '13',
    name: 'Designer Sunglasses',
    description: 'Aviator sunglasses with gold tone frames and polarized lenses',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1526115175693-cc056b063acc?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Accessories',
    brand: 'Elite Style',
    material: 'Metal',
    color: 'Gold',
    size: [' One Size'],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: [],
    tags: ['sunglasses', 'designer', 'aviator'],
    slug: 'designer-sunglasses'
  },
  {
    id: '14',
    name: 'Leather Gloves',
    description: 'Soft lambskin leather gloves with quilted palm detail',
    price: 159,
    originalPrice: 199,
    images: [
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1614203543174-4f5c9e2bce09?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1554454949-0cca25664ed2?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Accessories',
    brand: 'Street Couture',
    material: 'Lambskin',
    color: 'Black',
    size: ['S', 'M', 'L'],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: [],
    tags: ['gloves', 'leather', 'winter'],
    slug: 'leather-gloves'
  },

  // Bags Collection
  {
    id: '15',
    name: 'Structured Leather Tote',
    description: 'Italian leather tote with gold hardware and double handles',
    price: 899,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Bags',
    brand: 'Elite Style',
    material: 'Leather',
    color: 'Black',
    size: [' One Size'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: [],
    tags: ['tote', 'leather', 'structured'],
    slug: 'structured-leather-tote'
  },
  {
    id: '16',
    name: 'Canvas Weekend Bag',
    description: 'Durable canvas weekend bag with leather trim and spacious interior',
    price: 249,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Bags',
    brand: 'Street Couture',
    material: 'Canvas',
    color: 'Tan',
    size: [' One Size'],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: [],
    tags: ['weekend-bag', 'canvas', 'leather-trim'],
    slug: 'canvas-weekend-bag'
  },
  {
    id: '17',
    name: 'Crossbody Bag',
    description: 'Chain strap crossbody with quilted detail and magnetic closure',
    price: 179,
    originalPrice: 229,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Bags',
    brand: 'Urban Luxe',
    material: 'PU Leather',
    color: 'Burgundy',
    size: [' One Size'],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviews: [],
    tags: ['crossbody', 'chain-strap', 'quilted'],
    slug: 'crossbody-bag'
  },

  // Watches Collection
  {
    id: '18',
    name: 'Minimalist Watch',
    description: 'Swiss-made minimalist watch with leather band and date complication',
    price: 599,
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Watches',
    brand: 'Elite Style',
    material: 'Stainless Steel',
    color: 'Silver',
    size: [' One Size'],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: [],
    tags: ['minimalist', 'swiss-made', 'leather-band'],
    slug: 'minimalist-watch'
  },
  {
    id: '19',
    name: 'Vintage Style Watch',
    description: 'Retro-inspired watch with dial decoration and classic leather strap',
    price: 349,
    originalPrice: 449,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Watches',
    brand: 'Urban Luxe',
    material: 'Stainless Steel',
    color: 'Gold',
    size: [' One Size'],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: [],
    tags: ['vintage', 'retro', 'leather-strap'],
    slug: 'vintage-style-watch'
  },
  {
    id: '20',
    name: 'Sports Chronograph',
    description: 'Professional chronograph watch with tachymetric bezel and water resistance',
    price: 699,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=800&fit=crop&auto=format'
    ],
    category: 'Watches',
    brand: 'Street Couture',
    material: 'Titanium',
    color: 'Black',
    size: [' One Size'],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: [],
    tags: ['chronograph', 'sports', 'water-resistant'],
    slug: 'sports-chronograph'
  }
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Mixing Luxury Streetwear: A Complete Guide',
    excerpt: 'Learn how to balance high-end fashion with street-style elements for the ultimate sophisticated urban look...',
    content: 'Full blog content here...',
    author: 'Fashion Insider',
    category: 'Style Guide',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop&auto=format',
    tags: ['fashion', 'streetwear', 'luxury'],
    date: '2024-01-20',
    readTime: 5,
    slug: 'mixing-luxury-streetwear-guide'
  },
  {
    id: '2',
    title: 'Jewelry Trends 2024',
    excerpt: 'Discover the hottest jewelry trends for this season including sustainable stones and layered silhouettes...',
    content: 'Full blog content here...',
    author: 'Trend Reporter',
    category: 'Trends',
    image: 'https://images.unsplash.com/photo-1596944999499-eed1ba38add2?w=800&h=600&fit=crop&auto=format',
    tags: ['jewelry', 'trends', '2024'],
    date: '2024-01-18',
    readTime: 4,
    slug: 'jewelry-trends-2024'
  },
  {
    id: '3',
    title: 'Sustainable Fashion: The Future of Luxury',
    excerpt: 'How eco-conscious brands are revolutionizing premium fashion with sustainable materials and ethical production...',
    content: 'Full blog content here...',
    author: 'Sustainability Expert',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop&auto=format',
    tags: ['sustainability', 'luxury', 'eco-friendly'],
    date: '2024-01-15',
    readTime: 7,
    slug: 'sustainable-fashion-future-luxury'
  }
]

export const lookbooks: Lookbook[] = [
  {
    id: '1',
    title: 'Urban Elegance',
    description: 'Contemporary streetwear with a touch of luxury sophistication - leather jackets, designer sneakers, and minimalist watches',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=900&fit=crop&auto=format',
    products: mockProducts.slice(0, 4),
    date: '2024-01-25',
    slug: 'urban-elegance'
  },
  {
    id: '2',
    title: 'Golden Glamour',
    description: 'Shimmering gold pieces perfect for the modern sophisticated look - jewelry, accessories, and statement pieces',
    image: 'https://images.unsplash.com/photo-1596944999499-eed1ba38add2?w=1200&h=900&fit=crop&auto=format',
    products: [mockProducts[1], mockProducts[4], mockProducts[8], mockProducts[17]],
    date: '2024-01-22',
    slug: 'golden-glamour'
  },
  {
    id: '3',
    title: 'Winter Essentials',
    description: 'Luxurious winter pieces combining comfort and style - wool coats, leather gloves, and artisanal bags',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=900&fit=crop&auto=format',
    products: [mockProducts[7], mockProducts[13], mockProducts[14], mockProducts[15]],
    date: '2024-01-10',
    slug: 'winter-essentials'
  }
]

export const styleRecommendations: StyleRecommendation[] = [
  {
    id: '1',
    title: 'Minimalist Luxury',
    description: 'Clean lines and premium materials for timeless elegance - perfect for the discerning professional',
    products: [mockProducts[0], mockProducts[4], mockProducts[17]],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&auto=format'
  },
  {
    id: '2',
    title: 'Street Fashionista',
    description: 'Bold pieces perfect for urban explorers - where luxury meets street culture',
    products: [mockProducts[2], mockProducts[6], mockProducts[10]],
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop&auto=format'
  },
  {
    id: '3',
    title: 'Evening Elegance',
    description: 'Sophisticated pieces for evening outings and special occasions',
    products: [mockProducts[1], mockProducts[9], mockProducts[11]],
    image: 'https://images.unsplash.com/photo-1596944999499-eed1ba38add2?w=600&h=400&fit=crop&auto=format'
  }
]

// Color schemes for luxury streetwear
export const colorPalettes = {
  primary: ['#1a1a1a', '#ffffff', '#8b5cf6'],
  accent: ['#f59e0b', '#ef4444', '#06b6d4'],
  neutral: ['#374151', '#6b7280', '#9ca3af']
}

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
export const materials = ['Leather', 'Cotton', 'Silk', 'Gold', 'Diamond', 'Canvas', 'Wool']
export const colors = ['Black', 'White', 'Gold', 'Silver', 'Brown', 'Navy', 'Red', 'Multi-Color']
