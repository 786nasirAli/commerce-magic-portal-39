
import { Product } from '../contexts/CartContext';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 999,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip.',
    stock: 25,
    isNew: true,
    isOnSale: true,
    discount: 17,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Powerful laptop with M2 chip and all-day battery life.',
    stock: 15,
    isNew: false,
    isOnSale: false,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Nike Air Max 270',
    price: 120,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    brand: 'Nike',
    category: 'Shoes',
    description: 'Comfortable running shoes with Air Max technology.',
    stock: 50,
    isNew: false,
    isOnSale: true,
    discount: 20,
    rating: 4.6,
  },
  {
    id: '4',
    name: 'Adidas Ultraboost 22',
    price: 180,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
    brand: 'Adidas',
    category: 'Shoes',
    description: 'Premium running shoes with responsive Boost cushioning.',
    stock: 30,
    isNew: true,
    isOnSale: false,
    rating: 4.7,
  },
  {
    id: '5',
    name: 'Samsung Galaxy S24',
    price: 799,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
    brand: 'Samsung',
    category: 'Electronics',
    description: 'Flagship Android phone with AI-powered camera.',
    stock: 40,
    isNew: true,
    isOnSale: true,
    discount: 11,
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5',
    price: 349,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    brand: 'Sony',
    category: 'Electronics',
    description: 'Premium noise-canceling wireless headphones.',
    stock: 20,
    isNew: false,
    isOnSale: true,
    discount: 13,
    rating: 4.8,
  },
  {
    id: '7',
    name: 'Levi\'s 501 Jeans',
    price: 89,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    brand: 'Levi\'s',
    category: 'Clothing',
    description: 'Classic straight-fit jeans in premium denim.',
    stock: 100,
    isNew: false,
    isOnSale: false,
    rating: 4.4,
  },
  {
    id: '8',
    name: 'North Face Jacket',
    price: 159,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    brand: 'The North Face',
    category: 'Clothing',
    description: 'Waterproof outdoor jacket for all weather conditions.',
    stock: 35,
    isNew: true,
    isOnSale: true,
    discount: 20,
    rating: 4.6,
  },
  {
    id: '9',
    name: 'Apple Watch Series 9',
    price: 399,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Advanced smartwatch with health monitoring features.',
    stock: 45,
    isNew: true,
    isOnSale: false,
    rating: 4.7,
  },
  {
    id: '10',
    name: 'Canon EOS R5',
    price: 2499,
    originalPrice: 2899,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
    brand: 'Canon',
    category: 'Electronics',
    description: 'Professional mirrorless camera with 8K video recording.',
    stock: 8,
    isNew: false,
    isOnSale: true,
    discount: 14,
    rating: 4.9,
  },
  {
    id: '11',
    name: 'Nike Dunk Low',
    price: 110,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    brand: 'Nike',
    category: 'Shoes',
    description: 'Classic basketball-inspired sneakers.',
    stock: 75,
    isNew: true,
    isOnSale: false,
    rating: 4.5,
  },
  {
    id: '12',
    name: 'Patagonia Fleece',
    price: 129,
    originalPrice: 149,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
    brand: 'Patagonia',
    category: 'Clothing',
    description: 'Sustainable fleece jacket made from recycled materials.',
    stock: 60,
    isNew: false,
    isOnSale: true,
    discount: 13,
    rating: 4.3,
  },
  {
    id: '13',
    name: 'iPad Pro 12.9"',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Professional tablet with M2 chip and Liquid Retina display.',
    stock: 20,
    isNew: true,
    isOnSale: false,
    rating: 4.8,
  },
  {
    id: '14',
    name: 'Vans Old Skool',
    price: 65,
    originalPrice: 75,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop',
    brand: 'Vans',
    category: 'Shoes',
    description: 'Classic skate shoes with iconic side stripe.',
    stock: 90,
    isNew: false,
    isOnSale: true,
    discount: 13,
    rating: 4.4,
  },
  {
    id: '15',
    name: 'Champion Hoodie',
    price: 49,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    brand: 'Champion',
    category: 'Clothing',
    description: 'Comfortable cotton hoodie with classic logo.',
    stock: 120,
    isNew: false,
    isOnSale: false,
    rating: 4.2,
  },
  {
    id: '16',
    name: 'AirPods Pro 2',
    price: 249,
    originalPrice: 279,
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop',
    brand: 'Apple',
    category: 'Electronics',
    description: 'Wireless earbuds with active noise cancellation.',
    stock: 55,
    isNew: true,
    isOnSale: true,
    discount: 11,
    rating: 4.6,
  },
  {
    id: '17',
    name: 'Converse Chuck Taylor',
    price: 55,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop',
    brand: 'Converse',
    category: 'Shoes',
    description: 'Timeless high-top canvas sneakers.',
    stock: 85,
    isNew: false,
    isOnSale: false,
    rating: 4.3,
  },
  {
    id: '18',
    name: 'PlayStation 5',
    price: 499,
    originalPrice: 559,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop',
    brand: 'Sony',
    category: 'Electronics',
    description: 'Next-gen gaming console with 4K gaming capabilities.',
    stock: 12,
    isNew: true,
    isOnSale: true,
    discount: 11,
    rating: 4.9,
  },
  {
    id: '19',
    name: 'Ray-Ban Aviators',
    price: 159,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
    brand: 'Ray-Ban',
    category: 'Accessories',
    description: 'Classic aviator sunglasses with UV protection.',
    stock: 70,
    isNew: false,
    isOnSale: false,
    rating: 4.5,
  },
  {
    id: '20',
    name: 'Yeti Tumbler',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&h=400&fit=crop',
    brand: 'Yeti',
    category: 'Accessories',
    description: 'Insulated stainless steel tumbler that keeps drinks cold.',
    stock: 200,
    isNew: false,
    isOnSale: true,
    discount: 22,
    rating: 4.7,
  }
];

export const getBrands = (): string[] => {
  return Array.from(new Set(sampleProducts.map(product => product.brand))).sort();
};

export const getCategories = (): string[] => {
  return Array.from(new Set(sampleProducts.map(product => product.category))).sort();
};

export const initializeProducts = (): void => {
  const existingProducts = localStorage.getItem('products');
  if (!existingProducts) {
    localStorage.setItem('products', JSON.stringify(sampleProducts));
  }
};

export const getProducts = (): Product[] => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : sampleProducts;
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem('products', JSON.stringify(products));
};
