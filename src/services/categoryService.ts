

import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

// Use Supabase's generated insert type which properly handles auto-generated fields
type CategoryInsert = Database['public']['Tables']['categories']['Insert'];

export const categoryService = {
  // Get all categories
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  // Create new category
  async createCategory(category: { name: string; description?: string; image?: string }): Promise<Category> {
    // Create the insert object with a temporary slug that will be overwritten by the database trigger
    const insertData: CategoryInsert = {
      name: category.name,
      description: category.description,
      image: category.image,
      slug: 'temp-slug' // This will be overwritten by the database trigger
    };

    const { data, error } = await supabase
      .from('categories')
      .insert(insertData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update category
  async updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete category
  async deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

