export interface MenuCategory {
  id: string
  name: string
  description: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_available: boolean
  display_order: number
  created_at: string
  updated_at: string
  category?: MenuCategory
}

export interface Customer {
  id: string
  email: string
  phone: string
  name: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  customer_id: string
  event_date: string
  event_time: string
  guest_count: number
  venue_address: string
  special_notes: string | null
  subtotal: number
  tax_amount: number
  total_amount: number
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: 'stripe' | 'paynow'
  stripe_payment_intent_id: string | null
  paynow_receipt_url: string | null
  order_status: 'pending' | 'confirmed' | 'preparing' | 'completed' | 'cancelled'
  admin_notes: string | null
  created_at: string
  updated_at: string
  customer?: Customer
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  menu_item_id: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  menu_item?: MenuItem
}

export interface GalleryImage {
  id: string
  title: string
  description: string | null
  image_url: string
  display_order: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  customer_id: string
  order_id: string | null
  rating: number
  comment: string | null
  image_url: string | null
  is_approved: boolean
  created_at: string
  updated_at: string
  customer?: Customer
}

export interface StaffSchedule {
  id: string
  user_id: string
  order_id: string
  role: 'chef' | 'assistant' | 'server'
  assigned_at: string
  notes: string | null
  created_at: string
  updated_at: string
}

// Utility types for forms and API responses
export type CreateMenuItemInput = Omit<MenuItem, 'id' | 'created_at' | 'updated_at' | 'category'>
export type UpdateMenuItemInput = Partial<CreateMenuItemInput>

export type CreateOrderInput = Omit<Order, 'id' | 'created_at' | 'updated_at' | 'customer' | 'order_items'>
export type UpdateOrderInput = Partial<CreateOrderInput>

export type CreateCustomerInput = Omit<Customer, 'id' | 'created_at' | 'updated_at'>

export type CreateReviewInput = Omit<Review, 'id' | 'created_at' | 'updated_at' | 'customer' | 'is_approved'> 