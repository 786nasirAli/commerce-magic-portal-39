
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { getProducts, getBrands } from '@/data/sampleData';
import { Product } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

const Brand = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const allProducts = getProducts();
    const allBrands = getBrands();
    setProducts(allProducts);
    setBrands(allBrands);
    setSelectedBrand(allBrands[0] || '');
  }, []);

  const filteredProducts = selectedBrand 
    ? products.filter(product => product.brand === selectedBrand)
    : products;

  const getBrandStats = (brandName: string) => {
    const brandProducts = products.filter(p => p.brand === brandName);
    return {
      total: brandProducts.length,
      onSale: brandProducts.filter(p => p.isOnSale).length,
      avgPrice: brandProducts.reduce((sum, p) => sum + p.price, 0) / brandProducts.length,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Shop by Brand</h1>
          <p className="text-gray-600">Explore products from your favorite brands</p>
        </div>

        {/* Brand Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Select a Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands.map((brand) => {
              const stats = getBrandStats(brand);
              return (
                <Button
                  key={brand}
                  variant={selectedBrand === brand ? "default" : "outline"}
                  onClick={() => setSelectedBrand(brand)}
                  className="h-auto p-4 flex flex-col items-center"
                >
                  <div className="font-semibold">{brand}</div>
                  <div className="text-xs opacity-75">
                    {stats.total} products
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Selected Brand Info */}
        {selectedBrand && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{selectedBrand}</h2>
                <p className="text-gray-600">Premium brand products</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {getBrandStats(selectedBrand).total}
                </div>
                <div className="text-gray-600">Total Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {getBrandStats(selectedBrand).onSale}
                </div>
                <div className="text-gray-600">On Sale</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  ${getBrandStats(selectedBrand).avgPrice.toFixed(0)}
                </div>
                <div className="text-gray-600">Avg. Price</div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found for this brand.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brand;
