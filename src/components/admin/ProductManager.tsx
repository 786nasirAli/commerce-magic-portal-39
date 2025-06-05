
import React, { useState, useRef } from 'react';
import { Product } from '@/contexts/CartContext';
import { getBrands, getCategories, saveProducts } from '@/data/sampleData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Upload, X } from 'lucide-react';

interface ProductManagerProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductManager: React.FC<ProductManagerProps> = ({ products, setProducts }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    brand: '',
    category: '',
    description: '',
    stock: '',
    isNew: false,
    isOnSale: false,
    discount: '',
    rating: '4.5',
    image: ''
  });

  // Categories including all 8 requested categories
  const allCategories = [
    'jewelry', 'bags', 'clothes', 'shoes', 
    'women', 'men', 'girls-boys', 'kids'
  ];

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
      originalPrice: '',
      brand: '',
      category: '',
      description: '',
      stock: '',
      isNew: false,
      isOnSale: false,
      discount: '',
      rating: '4.5',
      image: ''
    });
    setEditingProduct(null);
    setUploadedImages([]);
  };

  const handleAddProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.brand || !productForm.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: productForm.name,
      price: parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined,
      brand: productForm.brand,
      category: productForm.category,
      description: productForm.description,
      stock: parseInt(productForm.stock),
      isNew: productForm.isNew,
      isOnSale: productForm.isOnSale,
      discount: productForm.discount ? parseInt(productForm.discount) : undefined,
      rating: parseFloat(productForm.rating),
      image: productForm.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setIsDialogOpen(false);
    resetForm();

    toast({
      title: "Product added successfully!",
      description: `${newProduct.name} has been added to your store.`,
    });
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;

    if (!productForm.name || !productForm.price || !productForm.brand || !productForm.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const updatedProduct: Product = {
      ...editingProduct,
      name: productForm.name,
      price: parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : undefined,
      brand: productForm.brand,
      category: productForm.category,
      description: productForm.description,
      stock: parseInt(productForm.stock),
      isNew: productForm.isNew,
      isOnSale: productForm.isOnSale,
      discount: productForm.discount ? parseInt(productForm.discount) : undefined,
      rating: parseFloat(productForm.rating),
      image: productForm.image
    };

    const updatedProducts = products.map(p => p.id === editingProduct.id ? updatedProduct : p);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setIsDialogOpen(false);
    resetForm();

    toast({
      title: "Product updated successfully!",
      description: `${updatedProduct.name} has been updated.`,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      saveProducts(updatedProducts);

      toast({
        title: "Product deleted",
        description: "Product has been removed from your store.",
      });
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      brand: product.brand,
      category: product.category,
      description: product.description,
      stock: product.stock.toString(),
      isNew: product.isNew,
      isOnSale: product.isOnSale,
      discount: product.discount?.toString() || '',
      rating: product.rating.toString(),
      image: product.image
    });
    setUploadedImages(product.image ? [product.image] : []);
    setIsDialogOpen(true);
  };

  // Filter products by category for better organization
  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase()).length;
  };

  return (
    <div className="space-y-6">
      {/* Category-wise Product Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allCategories.map((category) => (
          <Card key={category} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-brand-pink mb-1">
                {getProductsByCategory(category)}
              </div>
              <div className="text-sm text-gray-600 capitalize">{category}</div>
            </CardContent>
          </Card>
        ))}
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
                    {getBrands().map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={productForm.category}
                  onValueChange={(value) => setProductForm(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories.map((category) => (
                      <SelectItem key={category} value={category} className="capitalize">
                        {category.replace('-', ' & ')}
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
                <Label htmlFor="originalPrice">Original Price ($)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  value={productForm.originalPrice}
                  onChange={(e) => setProductForm(prev => ({ ...prev, originalPrice: e.target.value }))}
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
                    checked={productForm.isNew}
                    onChange={(e) => setProductForm(prev => ({ ...prev, isNew: e.target.checked }))}
                    className="rounded border-gray-300"
                  />
                  <span>🆕 New Arrival</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.isOnSale}
                    onChange={(e) => setProductForm(prev => ({ ...prev, isOnSale: e.target.checked }))}
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
              <Button onClick={editingProduct ? handleEditProduct : handleAddProduct}>
                {editingProduct ? '💾 Update Product' : '✨ Add Product'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>📦 Product Inventory</CardTitle>
          <CardDescription>
            Manage your complete product catalog across all 8 categories
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
                        src={product.image}
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
                      <span className="bg-brand-light text-brand-dark px-2 py-1 rounded-full text-xs font-medium capitalize">
                        {product.category.replace('-', ' & ')}
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
                        {product.originalPrice && (
                          <div>
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
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
                        {product.isNew && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                            🆕 New
                          </span>
                        )}
                        {product.isOnSale && (
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

export default ProductManager;
