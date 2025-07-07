// Mock data for demo purposes
interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  created_at: string
}

interface Order {
  id: string
  customer_id: string
  event_date: string
  event_time: string
  guest_count: number
  location: string
  special_requests?: string
  total_amount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled'
  created_at: string
  updated_at: string
}

interface OrderItem {
  id: string
  order_id: string
  menu_item_id: string
  quantity: number
  unit_price: number
  total_price: number
}

// Mock storage
const mockCustomers: Customer[] = []
const mockOrders: Order[] = []
const mockOrderItems: OrderItem[] = []

// Simulate async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface CreateOrderData {
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
  eventDetails: {
    date: string
    time: string
    guestCount: number
    location: string
    specialRequests?: string
  }
  items: Array<{
    menuItemId: string
    quantity: number
    unitPrice: number
  }>
}

export async function createOrder(orderData: CreateOrderData): Promise<Order> {
  await delay(500);
  
  // Create or find customer
  let customer = mockCustomers.find(c => c.email === orderData.customerInfo.email);
  if (!customer) {
    customer = {
      id: Date.now().toString(),
      name: orderData.customerInfo.name,
      email: orderData.customerInfo.email,
      phone: orderData.customerInfo.phone,
      address: orderData.customerInfo.address,
      created_at: new Date().toISOString(),
    };
    mockCustomers.push(customer);
  }

  // Calculate total
  const totalAmount = orderData.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  // Create order
  const order: Order = {
    id: Date.now().toString(),
    customer_id: customer.id,
    event_date: orderData.eventDetails.date,
    event_time: orderData.eventDetails.time,
    guest_count: orderData.eventDetails.guestCount,
    location: orderData.eventDetails.location,
    special_requests: orderData.eventDetails.specialRequests,
    total_amount: totalAmount,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockOrders.push(order);

  // Create order items
  for (const item of orderData.items) {
    const orderItem: OrderItem = {
      id: Date.now().toString() + Math.random(),
      order_id: order.id,
      menu_item_id: item.menuItemId,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.unitPrice * item.quantity,
    };
    mockOrderItems.push(orderItem);
  }

  return order;
}

export async function getOrders(status?: string): Promise<Order[]> {
  await delay(300);
  if (status) {
    return mockOrders.filter(order => order.status === status);
  }
  return [...mockOrders];
}

export async function getOrderById(id: string): Promise<Order | null> {
  await delay(300);
  return mockOrders.find(order => order.id === id) || null;
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
  await delay(300);
  const index = mockOrders.findIndex(order => order.id === id);
  if (index === -1) return null;

  mockOrders[index] = {
    ...mockOrders[index],
    status,
    updated_at: new Date().toISOString(),
  };
  return mockOrders[index];
}

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  await delay(300);
  return mockOrderItems.filter(item => item.order_id === orderId);
}

export async function getOrderStats() {
  await delay(300);
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const thisMonthOrders = mockOrders.filter(order => new Date(order.created_at) >= thisMonth);
  
  return {
    totalOrders: mockOrders.length,
    pendingOrders: mockOrders.filter(order => order.status === 'pending').length,
    thisMonthOrders: thisMonthOrders.length,
    thisMonthRevenue: thisMonthOrders.reduce((sum, order) => sum + order.total_amount, 0),
    totalRevenue: mockOrders.reduce((sum, order) => sum + order.total_amount, 0),
  };
}

export async function getRecentOrders(limit: number = 5): Promise<Order[]> {
  await delay(300);
  return mockOrders
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

export async function deleteOrder(id: string): Promise<boolean> {
  await delay(300);
  const orderIndex = mockOrders.findIndex(order => order.id === id);
  if (orderIndex === -1) return false;

  // Remove order items
  const itemIndexes = mockOrderItems
    .map((item, index) => item.order_id === id ? index : -1)
    .filter(index => index !== -1)
    .reverse(); // Remove from end to avoid index shifting

  itemIndexes.forEach(index => mockOrderItems.splice(index, 1));

  // Remove order
  mockOrders.splice(orderIndex, 1);
  return true;
} 