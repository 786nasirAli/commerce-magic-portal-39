
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Cart from './Cart';

const Header: React.FC = () => {
  const location = useLocation();
  const { getTotalItems, toggleCart } = useCart();
  const { isAdmin, logout } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/on-sale', label: 'On Sale' },
    { path: '/brand', label: 'Brands' },
    { path: '/new-arrival', label: 'New Arrivals' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            ShopZone
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-700 hover:text-primary transition-colors ${
                  location.pathname === item.path ? 'text-primary font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={`text-gray-700 hover:text-primary transition-colors ${
                  location.pathname === '/admin' ? 'text-primary font-semibold' : ''
                }`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            )}
            
            <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-5 h-5 text-gray-700" />
            </Link>

            <button
              onClick={toggleCart}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      <Cart />
    </header>
  );
};

export default Header;
