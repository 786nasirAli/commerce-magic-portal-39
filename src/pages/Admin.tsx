
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Settings, 
  Image as ImageIcon,
  FolderOpen,
  Database
} from 'lucide-react';
import ProductManager from '@/components/admin/ProductManager';
import CategoryManager from '@/components/admin/CategoryManager';
import MediaManager from '@/components/admin/MediaManager';
import DatabaseProductManager from '@/components/admin/DatabaseProductManager';
import DatabaseCategoryManager from '@/components/admin/DatabaseCategoryManager';
import { getProducts } from '@/data/sampleData';

const Admin = () => {
  const [products, setProducts] = useState(getProducts());

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🛍️ Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your eCommerce store with powerful admin controls
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900">{products.length}</p>
                </div>
                <Package className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-3xl font-bold text-gray-900">8</p>
                </div>
                <FolderOpen className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900">1,234</p>
                </div>
                <Users className="h-12 w-12 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">$12.3K</p>
                </div>
                <TrendingUp className="h-12 w-12 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="products-db" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-6">
            <TabsTrigger value="products-db" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Products (DB)
            </TabsTrigger>
            <TabsTrigger value="categories-db" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Categories (DB)
            </TabsTrigger>
            <TabsTrigger value="products-local" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products (Local)
            </TabsTrigger>
            <TabsTrigger value="categories-local" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Categories (Local)
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products-db">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Database Product Management
                  <Badge variant="secondary">Connected to Supabase</Badge>
                </CardTitle>
                <CardDescription>
                  Manage products with full database persistence, category relationships, and dynamic routing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DatabaseProductManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories-db">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Database Category Management
                  <Badge variant="secondary">Connected to Supabase</Badge>
                </CardTitle>
                <CardDescription>
                  Create, edit, and manage categories with automatic slug generation and page routing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DatabaseCategoryManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products-local">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Local Product Management
                  <Badge variant="outline">Local Storage</Badge>
                </CardTitle>
                <CardDescription>
                  Legacy product management system using local storage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductManager products={products} setProducts={setProducts} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories-local">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5" />
                  Local Category Management
                  <Badge variant="outline">Local Storage</Badge>
                </CardTitle>
                <CardDescription>
                  Legacy category management system for local development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Image Management
                </CardTitle>
                <CardDescription>
                  Upload and manage images for homepage sliders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MediaManager type="images" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Video Management
                </CardTitle>
                <CardDescription>
                  Upload and manage videos for homepage sliders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MediaManager type="videos" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
