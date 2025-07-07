-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create menu categories table
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create menu items table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  guest_count INTEGER NOT NULL,
  venue_address TEXT NOT NULL,
  special_notes TEXT,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('stripe', 'paynow')),
  stripe_payment_intent_id VARCHAR(200),
  paynow_receipt_url TEXT,
  order_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'preparing', 'completed', 'cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery images table
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  image_url TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create staff schedule table
CREATE TABLE staff_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('chef', 'assistant', 'server')),
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX idx_menu_items_is_available ON menu_items(is_available);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_event_date ON orders(event_date);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_menu_item_id ON order_items(menu_item_id);
CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_is_approved ON reviews(is_approved);
CREATE INDEX idx_staff_schedule_user_id ON staff_schedule(user_id);
CREATE INDEX idx_staff_schedule_order_id ON staff_schedule(order_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_menu_categories_updated_at BEFORE UPDATE ON menu_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_staff_schedule_updated_at BEFORE UPDATE ON staff_schedule FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_schedule ENABLE ROW LEVEL SECURITY;

-- Public read access for menu categories and items
CREATE POLICY "Menu categories are viewable by everyone" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "Menu items are viewable by everyone" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Gallery images are viewable by everyone" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Approved reviews are viewable by everyone" ON reviews FOR SELECT USING (is_approved = true);

-- Admin policies (for authenticated users - adjust based on your admin setup)
CREATE POLICY "Admin can manage menu categories" ON menu_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage menu items" ON menu_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage gallery images" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage all reviews" ON reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage order items" ON order_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can manage staff schedule" ON staff_schedule FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can view customers" ON customers FOR SELECT USING (auth.role() = 'authenticated');

-- Customer policies (for order creation)
CREATE POLICY "Customers can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Customers can create order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Customers can create customer records" ON customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Customers can create reviews" ON reviews FOR INSERT WITH CHECK (true);

-- Insert default menu categories
INSERT INTO menu_categories (name, description, display_order) VALUES
('BBQ Proteins', 'Premium grilled meats and seafood', 1),
('Sides & Salads', 'Fresh accompaniments and vegetables', 2),
('Beverages', 'Refreshing drinks for your event', 3),
('Desserts', 'Sweet endings to your BBQ feast', 4);

-- Insert sample menu items
INSERT INTO menu_items (category_id, name, description, price, display_order) VALUES
((SELECT id FROM menu_categories WHERE name = 'BBQ Proteins'), 'Premium Beef Ribeye', 'Tender ribeye steaks grilled to perfection', 45.00, 1),
((SELECT id FROM menu_categories WHERE name = 'BBQ Proteins'), 'BBQ Chicken Wings', 'Marinated chicken wings with signature BBQ sauce', 28.00, 2),
((SELECT id FROM menu_categories WHERE name = 'BBQ Proteins'), 'Grilled Prawns', 'Fresh prawns with garlic herb seasoning', 38.00, 3),
((SELECT id FROM menu_categories WHERE name = 'BBQ Proteins'), 'Pork Ribs', 'Slow-cooked pork ribs with smoky BBQ glaze', 42.00, 4),
((SELECT id FROM menu_categories WHERE name = 'Sides & Salads'), 'Coleslaw', 'Crispy fresh vegetable salad', 12.00, 1),
((SELECT id FROM menu_categories WHERE name = 'Sides & Salads'), 'Grilled Corn', 'Sweet corn with herb butter', 8.00, 2),
((SELECT id FROM menu_categories WHERE name = 'Sides & Salads'), 'Potato Salad', 'Creamy potato salad with herbs', 15.00, 3),
((SELECT id FROM menu_categories WHERE name = 'Beverages'), 'Soft Drinks', 'Assorted carbonated beverages', 3.00, 1),
((SELECT id FROM menu_categories WHERE name = 'Beverages'), 'Fresh Juice', 'Local fruit juices', 5.00, 2),
((SELECT id FROM menu_categories WHERE name = 'Desserts'), 'Chocolate Brownie', 'Rich chocolate brownie with ice cream', 8.00, 1); 