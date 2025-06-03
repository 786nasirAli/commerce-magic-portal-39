
import React, { useState } from 'react';
import { ShoppingCart, Star, Eye, Heart } from 'lucide-react';
import { Product } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "🛒 Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product);
    toast({
      title: "🚀 Buying now!",
      description: `${product.name} added to cart. Redirecting to checkout...`,
    });
    // In a real app, this would redirect to checkout
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "💔 Removed from wishlist" : "❤️ Added to wishlist",
      description: isWishlisted 
        ? `${product.name} removed from your wishlist.`
        : `${product.name} added to your wishlist.`,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { text: 'Out of Stock', color: 'text-red-600' };
    if (product.stock < 5) return { text: `Only ${product.stock} left!`, color: 'text-orange-600' };
    if (product.stock < 10) return { text: `${product.stock} in stock`, color: 'text-yellow-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  };

  const stockStatus = getStockStatus();

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              🆕 NEW
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              🏷️ -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button - Shows on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 text-gray-800 hover:bg-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </div>
        )}
      </div>
      
      <div className="p-5">
        {/* Brand */}
        <div className="mb-2">
          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
            {product.brand}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>
        
        {/* Pricing */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <div className={`text-sm font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </div>
        </div>

        {/* Savings Display */}
        {product.originalPrice && (
          <div className="mb-3 p-2 bg-green-50 rounded-lg">
            <span className="text-green-700 text-sm font-medium">
              💰 You save ${(product.originalPrice - product.price).toFixed(2)}!
            </span>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
            variant={product.stock === 0 ? "secondary" : "default"}
          >
            {product.stock === 0 ? '😔 Out of Stock' : '🚀 Buy Now'}
          </Button>
          
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            variant="outline"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>

        {/* Free Shipping Notice */}
        {product.price > 50 && (
          <div className="mt-3 text-center">
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              🚚 Free Shipping
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
