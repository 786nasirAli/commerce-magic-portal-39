
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
      path: '/jewelry',
      gradient: 'from-pink-400 to-rose-400'
    },
    {
      id: '2',
      name: 'Bags',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      icon: '👜',
      description: 'Luxury handbags & accessories',
      path: '/bags',
      gradient: 'from-rose-400 to-pink-400'
    },
    {
      id: '3',
      name: 'Clothes',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop',
      icon: '👗',
      description: 'Fashion-forward clothing',
      path: '/clothes',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: '4',
      name: 'Shoes',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
      icon: '👠',
      description: 'Elegant footwear collection',
      path: '/shoes',
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      id: '5',
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
      icon: '👩',
      description: 'Curated for women',
      path: '/women',
      gradient: 'from-pink-400 to-purple-400'
    },
    {
      id: '6',
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      icon: '👨',
      description: 'Sophisticated menswear',
      path: '/men',
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      id: '7',
      name: 'Girls & Boys',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop',
      icon: '👧👦',
      description: 'Trendy teen fashion',
      path: '/girls-boys',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      id: '8',
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
      icon: '🧒',
      description: 'Adorable kids collection',
      path: '/kids',
      gradient: 'from-yellow-400 to-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={category.path}
          className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 touch-manipulation"
        >
          {/* Background Image */}
          <div className="relative h-28 sm:h-32 md:h-40 overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
            
            {/* Icon */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 text-lg sm:text-2xl bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              {category.icon}
            </div>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4">
            <h3 className="font-bold text-sm sm:text-lg text-gray-900 mb-1 group-hover:text-pink-600 transition-colors leading-tight">
              {category.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-300 rounded-2xl transition-all duration-300" />
          
          {/* Mobile Touch Feedback */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-active:opacity-100 transition-opacity duration-150 md:hidden" />
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
