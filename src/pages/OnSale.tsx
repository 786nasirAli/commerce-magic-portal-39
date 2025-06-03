
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/data/sampleData';
import { Product } from '@/contexts/CartContext';

const OnSale = () => {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);

  useEffect(() => {
    const products = getProducts();
    const onSaleProducts = products.filter(product => product.isOnSale);
    setSaleProducts(onSaleProducts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">🔥 Hot Deals & Sales</h1>
            <p className="text-xl mb-4">Save big on your favorite products!</p>
            <p className="text-red-100">Limited time offers - don't miss out!</p>
          </div>
        </div>

        {/* Sale Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {saleProducts.length}
            </div>
            <div className="text-gray-600">Products on Sale</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              Up to {Math.max(...saleProducts.map(p => p.discount || 0))}%
            </div>
            <div className="text-gray-600">Maximum Discount</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              ${saleProducts.reduce((total, product) => {
                const savings = (product.originalPrice || product.price) - product.price;
                return total + savings;
              }, 0).toFixed(0)}
            </div>
            <div className="text-gray-600">Total Savings Available</div>
          </div>
        </div>

        {/* Products Grid */}
        {saleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold mb-4">No Sales Currently Active</h2>
            <p className="text-gray-600">Check back soon for amazing deals!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnSale;
