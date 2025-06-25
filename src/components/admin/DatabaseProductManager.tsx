
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload, X } from 'lucide-react';
import { productService, Product } from '@/services/productService';
import { categoryService, Category } from '@/services/categoryService';

const DatabaseProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    original_price: '',
    brand: '',
    category_id: '',
    description: '',
    stock: '',
    is_new: false,
    is_on_sale: false,
    discount: '',
    rating: '4.5',
    image: ''
  });

  const brands = ['Gucci', 'Prada', 'Louis Vuitton', 'Chanel', 'Hermès', 'Dior', 'Versace', 'Balenciaga'];

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        categoryService.getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            setUploadedImages(prev => [...prev, imageUrl]);
            if (!productForm.image) {
              setProductForm(prev => ({ ...prev, image: imageUrl }));
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const selectImage = (imageUrl: string) => {
    setProductForm(prev => ({ ...prev, image: imageUrl }));
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      price: '',
      original_price: '',
      brand: '',
      category_id: '',
      description: '',
      stock: '',
      is_new: false,
      is_on_sale: false,
      discount: '',
      rating: '4.5',
      image: ''
    });
    setEditingProduct(null);
    setUploadedImages([]);
  };

  const handleSaveProduct = async () => {
    if (!productForm.name || !productForm.price || !productForm.brand || !productForm.category_id) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const productData = {
        name: productForm.name,
        price: parseFloat(productForm.price),
        original_price: productForm.original_price ? parseFloat(productForm.original_price) : undefined,
        brand: productForm.brand,
        category_id: productForm.category_id,
        description: productForm.description,
        stock: parseInt(productForm.stock) || 0,
        is_new: productForm.is_new,
        is_on_sale: productForm.is_on_sale,
        discount: productForm.discount ? parseInt(productForm.discount) : undefined,
        rating: parseFloat(productForm.rating),
        image: productForm.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'
      };

      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productData);
        toast({
          title: "Product updated!",
          description: `${productForm.name} has been updated successfully.`,
        });
      } else {
        await productService.createProduct(productData);
        toast({
          title: "Product added!",
          description: `${productForm.name} has been added successfully.`,
        });
      }

      await loadData();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        await loadData();
        toast({
          title: "Product deleted",
          description: "Product has been removed successfully.",
        });
      } catch (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "Error",
          description: "Failed to delete product",
          variant: "destructive",
        });
      }
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      original_price: product.original_price?.toString() || '',
      brand: product.brand,
      category_id: product.category_id || '',
      description: product.description || '',
      stock: product.stock.toString(),
      is_new: product.is_new,
      is_on_sale: product.is_on_sale,
      discount: product.discount?.toString() || '',
      rating: product.rating.toString(),
      image: product.image || ''
    });
    setUploadedImages(product.image ? [product.image] : []);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const productCount = products.filter(p => p.category_id === category.id).length;
          return (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-brand-pink mb-1">
                  {productCount}
                </div>
                <div className="text-sm text-gray-600">{category.name}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Product Button */}
      <div className="mb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-brand-pink hover:bg-brand-rose">
              <Plus className="w-4 h-4 mr-2" />
              ✨ Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
              </DialogTitle>
            </DialogHeader>
            
            {/* Image Upload Section */}
            <div className="mb-6">
              <Label className="text-base font-semibold">📷 Product Images</Label>
              <div className="mt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-4"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Images
                </Button>
                
                {/* Image Preview Grid */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {uploadedImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Product ${index + 1}`}
                          className={`w-full h-24 object-cover rounded-lg cursor-pointer border-2 ${
                            productForm.image === imageUrl ? 'border-blue-500' : 'border-gray-200'
                          }`}
                          onClick={() => selectImage(imageUrl)}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {productForm.image === imageUrl && (
                          <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={productForm.name}
                  onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand *</Label>
                <Select
                  value={productForm.brand}
                  onValueChange={(value) => setProductForm(prev => ({ ...prev, brand: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={productForm.category_id}
                  onValueChange={(value) => setProductForm(prev => ({ ...prev, category_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="original_price">Original Price ($)</Label>
                <Input
                  id="original_price"
                  type="number"
                  step="0.01"
                  value={productForm.original_price}
                  onChange={(e) => setProductForm(prev => ({ ...prev, original_price: e.target.value }))}
                  placeholder="Leave empty if no discount"
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm(prev => ({ ...prev, stock: e.target.value }))}
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={productForm.discount}
                  onChange={(e) => setProductForm(prev => ({ ...prev, discount: e.target.value }))}
                  placeholder="Leave empty if no discount"
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={productForm.rating}
                  onChange={(e) => setProductForm(prev => ({ ...prev, rating: e.target.value }))}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter product description"
                />
              </div>
              <div className="md:col-span-2 flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.is_new}
                    onChange={(e) => setProductForm(prev => ({ ...prev, is_new: e.target.checked }))}
                    className="rounded border-gray-300"
                  />
                  <span>🆕 New Arrival</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.is_on_sale}
                    onChange={(e) => setProductForm(prev => ({ ...prev, is_on_sale: e.target.checked }))}
                    className="rounded border-gray-300"
                  />
                  <span>🏷️ On Sale</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProduct}>
                {editingProduct ? '💾 Update Product' : '✨ Add Product'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>📦 Product Inventory (Database)</CardTitle>
          <CardDescription>
            Manage your complete product catalog with database persistence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 font-semibold">Image</th>
                  <th className="text-left p-3 font-semibold">Product Details</th>
                  <th className="text-left p-3 font-semibold">Category</th>
                  <th className="text-left p-3 font-semibold">Brand</th>
                  <th className="text-left p-3 font-semibold">Pricing</th>
                  <th className="text-left p-3 font-semibold">Stock</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <img
                        src={product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">⭐ {product.rating}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-brand-light text-brand-dark px-2 py-1 rounded-full text-xs font-medium">
                        {product.category?.name || 'No Category'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {product.brand}
                      </span>
                    </td>
                    <td className="p-3">
                      <div>
                        <span className="font-semibold text-green-600">${product.price}</span>
                        {product.original_price && (
                          <div>
                            <span className="text-sm text-gray-500 line-through">
                              ${product.original_price}
                            </span>
                            <span className="text-xs text-red-600 ml-1">
                              -{product.discount}%
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.stock > 10 ? 'bg-green-100 text-green-700' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col space-y-1">
                        {product.is_new && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            🆕 New
                          </span>
                        )}
                        {product.is_on_sale && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            🏷️ Sale
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(product)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseProductManager;
