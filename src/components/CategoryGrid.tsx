
import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  image: string;
  icon: string;
  description: string;
  path: string;
  gradient: string;
}

const CategoryGrid: React.FC = () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Jewelry',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
      icon: '💍',
      description: 'Elegant necklaces, earrings & more',
      path: '/shop?category=jewelry',
      gradient: 'from-pink-400 to-rose-400'
    },
    {
      id: '2',
      name: 'Bags',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      icon: '👜',
      description: 'Luxury handbags & accessories',
      path: '/shop?category=bags',
      gradient: 'from-rose-400 to-pink-400'
    },
    {
      id: '3',
      name: 'Clothes',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop',
      icon: '👗',
      description: 'Fashion-forward clothing',
      path: '/shop?category=clothes',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: '4',
      name: 'Shoes',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
      icon: '👠',
      description: 'Elegant footwear collection',
      path: '/shop?category=shoes',
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      id: '5',
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
      icon: '👩',
      description: 'Curated for women',
      path: '/shop?gender=women',
      gradient: 'from-pink-400 to-purple-400'
    },
    {
      id: '6',
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      icon: '👨',
      description: 'Sophisticated menswear',
      path: '/shop?gender=men',
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      id: '7',
      name: 'Girls & Boys',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop',
      icon: '👧👦',
      description: 'Trendy teen fashion',
      path: '/shop?age=teen',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      id: '8',
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
      icon: '🧒',
      description: 'Adorable kids collection',
      path: '/shop?age=kids',
      gradient: 'from-yellow-400 to-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={category.path}
          className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          {/* Background Image */}
          <div className="relative h-32 md:h-40 overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
            
            {/* Icon */}
            <div className="absolute top-3 right-3 text-2xl bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center">
              {category.icon}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {category.description}
            </p>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-300 rounded-2xl transition-all duration-300" />
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
