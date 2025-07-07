import { supabase } from '@/lib/supabase'
import { Order, OrderItem, Customer, CreateOrderInput, CreateCustomerInput } from '@/types/database'

export interface OrderWithDetails extends Order {
  customer: Customer
  order_items: (OrderItem & {
    menu_item: {
      id: string
      name: string
      price: number
    }
  })[]
}

export interface CreateOrderData {
  customer: CreateCustomerInput
  order: Omit<CreateOrderInput, 'customer_id'>
  items: Array<{
    menu_item_id: string
    quantity: number
    unit_price: number
  }>
}

export class OrderService {
  // Order Management
  static async createOrder(orderData: CreateOrderData): Promise<OrderWithDetails> {
    const { customer: customerData, order: orderInput, items } = orderData

    // Start a transaction by creating customer first
    let customer: Customer

    // Check if customer exists
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('*')
      .eq('email', customerData.email)
      .single()

    if (existingCustomer) {
      customer = existingCustomer
    } else {
      // Create new customer
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert(customerData)
        .select()
        .single()

      if (customerError) throw customerError
      customer = newCustomer
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0)
    const taxAmount = subtotal * 0.08 // 8% GST for Singapore
    const totalAmount = subtotal + taxAmount

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        ...orderInput,
        customer_id: customer.id,
        subtotal,
        tax_amount: taxAmount,
        total_amount: totalAmount,
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity,
    }))

    const { data: createdItems, error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select(`
        *,
        menu_item:menu_items(id, name, price)
      `)

    if (itemsError) throw itemsError

    return {
      ...order,
      customer,
      order_items: createdItems,
    }
  }

  static async getOrders(filters?: {
    startDate?: string
    endDate?: string
    status?: string
    customerId?: string
  }): Promise<OrderWithDetails[]> {
    let query = supabase
      .from('orders')
      .select(`
        *,
        customer:customers(*),
        order_items(
          *,
          menu_item:menu_items(id, name, price)
        )
      `)

    if (filters?.startDate) {
      query = query.gte('event_date', filters.startDate)
    }

    if (filters?.endDate) {
      query = query.lte('event_date', filters.endDate)
    }

    if (filters?.status) {
      query = query.eq('order_status', filters.status)
    }

    if (filters?.customerId) {
      query = query.eq('customer_id', filters.customerId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  static async getOrder(id: string): Promise<OrderWithDetails | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customer:customers(*),
        order_items(
          *,
          menu_item:menu_items(id, name, price, description, image_url)
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }

    return data
  }

  static async updateOrderStatus(id: string, status: Order['order_status'], adminNotes?: string): Promise<Order> {
    const updates: Partial<Order> = { order_status: status }
    if (adminNotes !== undefined) {
      updates.admin_notes = adminNotes
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async updatePaymentStatus(
    id: string, 
    paymentStatus: Order['payment_status'],
    stripePaymentIntentId?: string,
    paynowReceiptUrl?: string
  ): Promise<Order> {
    const updates: Partial<Order> = { payment_status: paymentStatus }
    
    if (stripePaymentIntentId) {
      updates.stripe_payment_intent_id = stripePaymentIntentId
    }
    
    if (paynowReceiptUrl) {
      updates.paynow_receipt_url = paynowReceiptUrl
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async deleteOrder(id: string): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  // Analytics and Reporting
  static async getOrdersAnalytics(filters?: {
    startDate?: string
    endDate?: string
  }) {
    let query = supabase
      .from('orders')
      .select('total_amount, payment_status, order_status, event_date, created_at')

    if (filters?.startDate) {
      query = query.gte('event_date', filters.startDate)
    }

    if (filters?.endDate) {
      query = query.lte('event_date', filters.endDate)
    }

    const { data, error } = await query

    if (error) throw error

    const orders = data || []
    
    return {
      totalOrders: orders.length,
      totalRevenue: orders
        .filter(order => order.payment_status === 'paid')
        .reduce((sum, order) => sum + order.total_amount, 0),
      pendingOrders: orders.filter(order => order.order_status === 'pending').length,
      completedOrders: orders.filter(order => order.order_status === 'completed').length,
      paidOrders: orders.filter(order => order.payment_status === 'paid').length,
      averageOrderValue: orders.length > 0 
        ? orders.reduce((sum, order) => sum + order.total_amount, 0) / orders.length 
        : 0,
    }
  }

  static async getPopularMenuItems(limit = 10) {
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        menu_item_id,
        quantity,
        menu_item:menu_items(name)
      `)

    if (error) throw error

    interface ItemStat {
      menu_item_id: string
      name: string
      total_quantity: number
      order_count: number
    }

    const itemStats = (data || []).reduce((acc, item) => {
      const id = item.menu_item_id
      const menuItem = item.menu_item as { name?: string } | null
      if (!acc[id]) {
        acc[id] = {
          menu_item_id: id,
          name: menuItem?.name || 'Unknown',
          total_quantity: 0,
          order_count: 0,
        }
      }
      acc[id].total_quantity += item.quantity
      acc[id].order_count += 1
      return acc
    }, {} as Record<string, ItemStat>)

    return Object.values(itemStats)
      .sort((a: ItemStat, b: ItemStat) => b.total_quantity - a.total_quantity)
      .slice(0, limit)
  }

  // Customer Management
  static async getCustomers(): Promise<Customer[]> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }

  static async getCustomer(id: string): Promise<Customer | null> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }

    return data
  }

  static async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Export functionality
  static async exportOrders(filters?: {
    startDate?: string
    endDate?: string
    status?: string
  }) {
    const orders = await this.getOrders(filters)
    
    // Convert to CSV format
    const csvHeaders = [
      'Order ID',
      'Customer Name',
      'Customer Email',
      'Event Date',
      'Event Time',
      'Guest Count',
      'Venue',
      'Total Amount',
      'Payment Status',
      'Order Status',
      'Created At'
    ]

    const csvRows = orders.map(order => [
      order.id,
      order.customer.name,
      order.customer.email,
      order.event_date,
      order.event_time,
      order.guest_count,
      order.venue_address,
      order.total_amount,
      order.payment_status,
      order.order_status,
      new Date(order.created_at).toLocaleDateString()
    ])

    return {
      headers: csvHeaders,
      rows: csvRows,
      filename: `orders_export_${new Date().toISOString().split('T')[0]}.csv`
    }
  }
} 