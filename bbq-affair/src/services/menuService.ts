import { supabase } from '@/lib/supabase'
import { MenuCategory, MenuItem, CreateMenuItemInput, UpdateMenuItemInput } from '@/types/database'

export class MenuService {
  // Menu Categories
  static async getCategories(): Promise<MenuCategory[]> {
    const { data, error } = await supabase
      .from('menu_categories')
      .select('*')
      .order('display_order')

    if (error) throw error
    return data || []
  }

  static async createCategory(category: Omit<MenuCategory, 'id' | 'created_at' | 'updated_at'>): Promise<MenuCategory> {
    const { data, error } = await supabase
      .from('menu_categories')
      .insert(category)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updateCategory(id: string, updates: Partial<MenuCategory>): Promise<MenuCategory> {
    const { data, error } = await supabase
      .from('menu_categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
      .from('menu_categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Menu Items
  static async getMenuItems(): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:menu_categories(*)
      `)
      .eq('is_available', true)
      .order('display_order')

    if (error) throw error
    return data || []
  }

  static async getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:menu_categories(*)
      `)
      .eq('category_id', categoryId)
      .eq('is_available', true)
      .order('display_order')

    if (error) throw error
    return data || []
  }

  static async getAllMenuItems(): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:menu_categories(*)
      `)
      .order('display_order')

    if (error) throw error
    return data || []
  }

  static async getMenuItem(id: string): Promise<MenuItem | null> {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:menu_categories(*)
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }
    return data
  }

  static async createMenuItem(item: CreateMenuItemInput): Promise<MenuItem> {
    const { data, error } = await supabase
      .from('menu_items')
      .insert(item)
      .select(`
        *,
        category:menu_categories(*)
      `)
      .single()

    if (error) throw error
    return data
  }

  static async updateMenuItem(id: string, updates: UpdateMenuItemInput): Promise<MenuItem> {
    const { data, error } = await supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        category:menu_categories(*)
      `)
      .single()

    if (error) throw error
    return data
  }

  static async deleteMenuItem(id: string): Promise<void> {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  static async toggleMenuItemAvailability(id: string): Promise<MenuItem> {
    // First get the current availability status
    const { data: currentItem, error: fetchError } = await supabase
      .from('menu_items')
      .select('is_available')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Toggle the availability
    const { data, error } = await supabase
      .from('menu_items')
      .update({ is_available: !currentItem.is_available })
      .eq('id', id)
      .select(`
        *,
        category:menu_categories(*)
      `)
      .single()

    if (error) throw error
    return data
  }

  // Utility functions
  static async getMenuByCategories(): Promise<{ category: MenuCategory; items: MenuItem[] }[]> {
    const categories = await this.getCategories()
    const menuItems = await this.getMenuItems()

    return categories.map(category => ({
      category,
      items: menuItems.filter(item => item.category_id === category.id)
    }))
  }

  static async searchMenuItems(query: string): Promise<MenuItem[]> {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:menu_categories(*)
      `)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .eq('is_available', true)
      .order('display_order')

    if (error) throw error
    return data || []
  }

  static async updateDisplayOrder(items: { id: string; display_order: number }[]): Promise<void> {
    const updates = items.map(item => 
      supabase
        .from('menu_items')
        .update({ display_order: item.display_order })
        .eq('id', item.id)
    )

    await Promise.all(updates)
  }
} 