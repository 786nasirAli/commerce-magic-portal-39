
-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS to categories table
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read categories (for public category pages)
CREATE POLICY "Anyone can view categories" 
  ON public.categories 
  FOR SELECT 
  USING (true);

-- Only authenticated users (admins) can modify categories
CREATE POLICY "Only authenticated users can manage categories" 
  ON public.categories 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create products table with category relationship
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  brand TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  description TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  is_new BOOLEAN DEFAULT false,
  is_on_sale BOOLEAN DEFAULT false,
  discount INTEGER,
  rating DECIMAL(3,2) DEFAULT 4.5,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS to products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read products (for public product pages)
CREATE POLICY "Anyone can view products" 
  ON public.products 
  FOR SELECT 
  USING (true);

-- Only authenticated users (admins) can modify products
CREATE POLICY "Only authenticated users can manage products" 
  ON public.products 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert default categories
INSERT INTO public.categories (name, slug, description, image) VALUES
('Jewelry', 'jewelry', 'Elegant necklaces, earrings & more', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop'),
('Bags', 'bags', 'Luxury handbags & accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop'),
('Clothes', 'clothes', 'Fashion-forward clothing', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop'),
('Shoes', 'shoes', 'Elegant footwear collection', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop'),
('Women', 'women', 'Curated for women', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop'),
('Men', 'men', 'Sophisticated menswear', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'),
('Girls & Boys', 'girls-boys', 'Trendy teen fashion', 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop'),
('Kids', 'kids', 'Adorable kids collection', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop');

-- Function to auto-generate slug from name
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(trim(input_text), '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug when inserting/updating categories
CREATE OR REPLACE FUNCTION set_category_slug()
RETURNS TRIGGER AS $$
BEGIN
  NEW.slug = generate_slug(NEW.name);
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER category_slug_trigger
  BEFORE INSERT OR UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION set_category_slug();
