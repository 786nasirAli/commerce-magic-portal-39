
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getProducts, saveProducts, getBrands, getCategories } from '@/data/sampleData';
import { Product } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload, Image as ImageIcon, X, Video, Settings } from 'lucide-react';
import Header from '@/components/Header';
import CategoryManager from '@/components/admin/CategoryManager';
import MediaManager from '@/components/admin/MediaManager';
import ProductManager from '@/components/admin/ProductManager';

const Admin = () => {
  const { isAdmin, isLoggedIn, login } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginForm.username, loginForm.password);
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard!",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Use admin/admin123",
        variant: "destructive",
      });
    }
  };

  if (!isLoggedIn || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>🔐 Admin Login</CardTitle>
                <CardDescription>
                  Please log in to access the admin dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="admin"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="admin123"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    🚀 Login to Dashboard
                  </Button>
                </form>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Demo Credentials:</strong><br />
                    Username: admin<br />
                    Password: admin123
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-brand-pink to-brand-rose bg-clip-text text-transparent">
            🎛️ BAREEHA'S ASSEMBLE Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage your e-commerce store with ease</p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {products.length}
              </div>
              <div className="text-gray-600">Total Products</div>
              <div className="text-xs text-green-600 mt-1">
                Active inventory
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {products.filter(p => p.isOnSale).length}
              </div>
              <div className="text-gray-600">On Sale</div>
              <div className="text-xs text-red-600 mt-1">
                Discounted items
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {products.filter(p => p.isNew).length}
              </div>
              <div className="text-gray-600">New Arrivals</div>
              <div className="text-xs text-purple-600 mt-1">
                Latest additions
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {products.filter(p => p.stock < 10).length}
              </div>
              <div className="text-gray-600">Low Stock</div>
              <div className="text-xs text-orange-600 mt-1">
                Needs restocking
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Images</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductManager products={products} setProducts={setProducts} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>

          <TabsContent value="images">
            <MediaManager type="images" />
          </TabsContent>

          <TabsContent value="videos">
            <MediaManager type="videos" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
