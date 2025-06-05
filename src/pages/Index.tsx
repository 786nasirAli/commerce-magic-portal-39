
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ImageCarousel from '@/components/ImageCarousel';
import VideoCarousel from '@/components/VideoCarousel';
import CategoryGrid from '@/components/CategoryGrid';
import FestivalBanner from '@/components/FestivalBanner';
import { Button } from '@/components/ui/button';
import { initializeProducts, getProducts } from '@/data/sampleData';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [products, setProducts] = React.useState(getProducts());

  useEffect(() => {
    initializeProducts();
    setProducts(getProducts());
  }, []);

  const featuredProducts = products.slice(0, 8);
  const onSaleProducts = products.filter(p => p.isOnSale).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <Header />
      
      {/* Festival Offers Banner */}
      <FestivalBanner />
      
      {/* Hero Image Carousel */}
      <section className="relative">
        <ImageCarousel />
      </section>

      {/* Brand Introduction */}
      <section className="py-12 bg-gradient-to-r from-pink-100 to-rose-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            BAREEHA'S ASSEMBLE
          </h1>
          <p className="text-xl text-gray-700 mb-8">Fashion meets the elegance</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/on-sale">
              <Button size="lg" variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50">
                View Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Shop by Category</h2>
            <p className="text-gray-600">Discover our elegant collections</p>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* Video Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Experience BAREEHA'S ASSEMBLE</h2>
            <p className="text-gray-600">Watch our latest collections come to life</p>
          </div>
          <VideoCarousel />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cash on Delivery</h3>
              <p className="text-gray-600">Pay when you receive your order</p>
            </div>
            <div className="text-center">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Premium quality products assured</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Customer support around the clock</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600">Discover our most elegant pieces</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/shop">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* On Sale Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-pink-700">✨ Special Offers</h2>
            <p className="text-gray-600">Limited time deals you don't want to miss</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {onSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/on-sale">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                View All Sales
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">💖 New Arrivals</h2>
            <p className="text-gray-600">Check out our latest elegant additions</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/new-arrival">
              <Button size="lg" variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50">
                View All New Items
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-rose-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Elegant, Stay Updated</h2>
          <p className="text-pink-100 mb-8">Subscribe to get special offers and elegant updates</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-pink-600 hover:bg-pink-50">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              BAREEHA'S ASSEMBLE
            </h3>
            <p className="text-gray-400">Fashion meets the elegance</p>
          </div>
          <p className="text-gray-400">&copy; 2024 BAREEHA'S ASSEMBLE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
