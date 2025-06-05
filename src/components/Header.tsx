
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getProducts } from '@/data/sampleData';
import { Product } from '@/contexts/CartContext';
import Cart from './Cart';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems, toggleCart } = useCart();
  const { isAdmin, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', emoji: '🏠' },
    { path: '/shop', label: 'Shop', emoji: '🛍️' },
    { path: '/on-sale', label: 'On Sale', emoji: '🏷️' },
    { path: '/brand', label: 'Brands', emoji: '🏆' },
    { path: '/new-arrival', label: 'New Arrivals', emoji: '✨' },
  ];

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const products = getProducts();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearchResultClick = (product: Product) => {
    setSearchQuery('');
    setShowSearchResults(false);
    navigate('/shop');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Updated for BAREEHA'S ASSEMBLE */}
          <Link to="/" className="flex flex-col items-start">
            <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              BAREEHA'S ASSEMBLE
            </span>
            <span className="text-xs text-gray-500 italic">fashion meets the elegance</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors font-medium ${
                  location.pathname === item.path ? 'text-pink-600 border-b-2 border-pink-600 pb-1' : ''
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors font-medium ${
                  location.pathname === '/admin' ? 'text-pink-600 border-b-2 border-pink-600 pb-1' : ''
                }`}
              >
                <span>⚙️</span>
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Enhanced Search Bar - Updated styling */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery && setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                  className="pl-10 pr-4 py-2 rounded-full border-2 border-pink-200 focus:border-pink-500 transition-colors"
                />
              </div>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-xs text-gray-500 mb-2 px-2">Search Results</div>
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSearchResultClick(product)}
                        className="w-full flex items-center space-x-3 p-2 hover:bg-pink-50 rounded-lg transition-colors text-left"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.brand} • ${product.price}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={logout} className="hidden md:flex border-pink-500 text-pink-600 hover:bg-pink-50">
                Logout
              </Button>
            )}
            
            <Link 
              to="/admin" 
              className="p-2 hover:bg-pink-50 rounded-full transition-colors"
              title="Admin Panel"
            >
              <User className="w-5 h-5 text-gray-700" />
            </Link>

            <button
              onClick={toggleCart}
              className="relative p-2 hover:bg-pink-50 rounded-full transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-pink-50 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-pink-200">
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-pink-200 focus:border-pink-500"
                  />
                </div>
              </form>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-600' 
                      : 'text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  <span>{item.emoji}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                    location.pathname === '/admin' 
                      ? 'bg-pink-50 text-pink-600 border-l-4 border-pink-600' 
                      : 'text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  <span>⚙️</span>
                  <span className="font-medium">Admin</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
      <Cart />
    </header>
  );
};

export default Header;
