
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/data/sampleData';
import { Product } from '@/contexts/CartContext';
import { Sparkles } from 'lucide-react';

const NewArrival = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products = getProducts();
    const newArrivals = products.filter(product => product.isNew);
    setNewProducts(newArrivals);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg p-8 mb-8">
          <div className="text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">✨ New Arrivals</h1>
            <p className="text-xl mb-4">Discover the latest additions to our collection</p>
            <p className="text-purple-100">Fresh products just for you!</p>
          </div>
        </div>

        {/* New Arrivals Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {newProducts.length}
            </div>
            <div className="text-gray-600">New Products</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {newProducts.filter(p => p.isOnSale).length}
            </div>
            <div className="text-gray-600">New Items on Sale</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {new Set(newProducts.map(p => p.brand)).size}
            </div>
            <div className="text-gray-600">Brands Featured</div>
          </div>
        </div>

        {/* Categories of New Products */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">New Arrivals by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from(new Set(newProducts.map(p => p.category))).map((category) => {
              const categoryCount = newProducts.filter(p => p.category === category).length;
              return (
                <div key={category} className="text-center p-4 border rounded-lg">
                  <div className="font-semibold">{category}</div>
                  <div className="text-sm text-gray-600">{categoryCount} new items</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {newProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-4">No New Arrivals Yet</h2>
            <p className="text-gray-600">Check back soon for the latest products!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrival;
