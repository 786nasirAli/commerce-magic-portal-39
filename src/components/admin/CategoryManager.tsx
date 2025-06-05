
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Edit, Trash2, Upload, Plus, Smartphone, Monitor } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  image: string;
  icon: string;
  description: string;
  path: string;
  gradient: string;
}

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Jewelry',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
      icon: '💍',
      description: 'Elegant necklaces, earrings & more',
      path: '/shop?category=jewelry',
      gradient: 'from-pink-400 to-rose-400'
    },
    {
      id: '2',
      name: 'Bags',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      icon: '👜',
      description: 'Luxury handbags & accessories',
      path: '/shop?category=bags',
      gradient: 'from-rose-400 to-pink-400'
    },
    {
      id: '3',
      name: 'Clothes',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop',
      icon: '👗',
      description: 'Fashion-forward clothing',
      path: '/shop?category=clothes',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: '4',
      name: 'Shoes',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
      icon: '👠',
      description: 'Elegant footwear collection',
      path: '/shop?category=shoes',
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      id: '5',
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
      icon: '👩',
      description: 'Curated for women',
      path: '/shop?gender=women',
      gradient: 'from-pink-400 to-purple-400'
    },
    {
      id: '6',
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      icon: '👨',
      description: 'Sophisticated menswear',
      path: '/shop?gender=men',
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      id: '7',
      name: 'Girls & Boys',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop',
      icon: '👧👦',
      description: 'Trendy teen fashion',
      path: '/shop?age=teen',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      id: '8',
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
      icon: '🧒',
      description: 'Adorable kids collection',
      path: '/shop?age=kids',
      gradient: 'from-yellow-400 to-orange-400'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    icon: '',
    image: '',
    gradient: 'from-pink-400 to-rose-400'
  });

  const gradientOptions = [
    'from-pink-400 to-rose-400',
    'from-rose-400 to-pink-400', 
    'from-pink-500 to-rose-500',
    'from-purple-400 to-pink-400',
    'from-blue-400 to-purple-400',
    'from-green-400 to-blue-400',
    'from-yellow-400 to-orange-400',
    'from-gray-500 to-gray-600'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setCategoryForm(prev => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setCategoryForm({
      name: '',
      description: '',
      icon: '',
      image: '',
      gradient: 'from-pink-400 to-rose-400'
    });
    setEditingCategory(null);
  };

  const handleSaveCategory = () => {
    if (!categoryForm.name || !categoryForm.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingCategory) {
      const updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id 
          ? {
              ...cat,
              name: categoryForm.name,
              description: categoryForm.description,
              icon: categoryForm.icon,
              image: categoryForm.image || cat.image,
              gradient: categoryForm.gradient
            }
          : cat
      );
      setCategories(updatedCategories);
      toast({
        title: "Category updated!",
        description: `${categoryForm.name} has been updated successfully.`,
      });
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: categoryForm.name,
        description: categoryForm.description,
        icon: categoryForm.icon,
        image: categoryForm.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
        path: `/shop?category=${categoryForm.name.toLowerCase()}`,
        gradient: categoryForm.gradient
      };
      setCategories([...categories, newCategory]);
      toast({
        title: "Category added!",
        description: `${categoryForm.name} has been added successfully.`,
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description,
      icon: category.icon,
      image: category.image,
      gradient: category.gradient
    });
    setIsDialogOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
      toast({
        title: "Category deleted",
        description: "Category has been removed successfully.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            📂 Category Management
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="bg-brand-pink hover:bg-brand-rose">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Category Name *</Label>
                      <Input
                        id="name"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter category name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="icon">Icon Emoji</Label>
                      <Input
                        id="icon"
                        value={categoryForm.icon}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, icon: e.target.value }))}
                        placeholder="🛍️"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Input
                      id="description"
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter category description"
                      required
                    />
                  </div>

                  <div>
                    <Label>Category Thumbnail</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
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
                        Upload Image
                      </Button>
                      
                      {categoryForm.image && (
                        <img
                          src={categoryForm.image}
                          alt="Category preview"
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Gradient Color</Label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {gradientOptions.map((gradient, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setCategoryForm(prev => ({ ...prev, gradient }))}
                          className={`h-8 rounded bg-gradient-to-r ${gradient} border-2 ${
                            categoryForm.gradient === gradient ? 'border-black' : 'border-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveCategory}>
                    {editingCategory ? 'Update Category' : 'Add Category'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Manage your store categories and their appearance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile Preview Toggle */}
          <div className="mb-6">
            <Label>Preview Mode</Label>
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                variant={previewMode === 'mobile' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('mobile')}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
              <Button
                size="sm"
                variant={previewMode === 'desktop' ? 'default' : 'outline'}
                onClick={() => setPreviewMode('desktop')}
              >
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </Button>
            </div>
          </div>

          {/* Category Preview */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-4">Category Layout Preview</h3>
            <div className={`grid gap-4 ${previewMode === 'mobile' ? 'grid-cols-2' : 'grid-cols-4'}`}>
              {categories.slice(0, 4).map((category) => (
                <div
                  key={category.id}
                  className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative h-20 md:h-32 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80`} />
                    <div className="absolute top-2 right-2 text-lg bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
                      {category.icon}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Management Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-3 font-semibold">Preview</th>
                  <th className="text-left p-3 font-semibold">Category</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <div className="w-16 h-12 relative overflow-hidden rounded-lg">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80`} />
                        <div className="absolute top-1 right-1 text-xs">
                          {category.icon}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-sm text-gray-600">{category.description}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteCategory(category.id)}
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

export default CategoryManager;
