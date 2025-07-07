// Mock data for demo purposes
const mockMenuItems = [
  {
    id: '1',
    name: 'Premium Beef Ribeye',
    description: 'Tender, marbled ribeye steak grilled to perfection',
    price: 45.00,
    category: 'beef',
    image_url: '🥩',
    dietary_info: ['gluten-free'],
    available: true,
    prep_time: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'BBQ Chicken Wings',
    description: 'Crispy wings with our signature BBQ sauce',
    price: 28.00,
    category: 'chicken',
    image_url: '🍗',
    dietary_info: ['gluten-free'],
    available: true,
    prep_time: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Grilled Prawns',
    description: 'Fresh prawns with garlic and herbs',
    price: 38.00,
    category: 'seafood',
    image_url: '🦐',
    dietary_info: ['gluten-free', 'dairy-free'],
    available: true,
    prep_time: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Pork Ribs',
    description: 'Fall-off-the-bone ribs with smoky BBQ glaze',
    price: 42.00,
    category: 'pork',
    image_url: '🍖',
    dietary_info: [],
    available: true,
    prep_time: 20,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Grilled Vegetables',
    description: 'Seasonal vegetables with herb marinade',
    price: 18.00,
    category: 'vegetarian',
    image_url: '🥬',
    dietary_info: ['vegetarian', 'vegan', 'gluten-free'],
    available: true,
    prep_time: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  dietary_info: string[]
  available: boolean
  prep_time: number
  created_at: string
  updated_at: string
}

// Simulate async operations with setTimeout
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getMenuItems(): Promise<MenuItem[]> {
  await delay(300); // Simulate network delay
  return [...mockMenuItems];
}

export async function getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
  await delay(300);
  return mockMenuItems.filter(item => item.category === category);
}

export async function createMenuItem(item: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>): Promise<MenuItem> {
  await delay(300);
  const newItem: MenuItem = {
    ...item,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockMenuItems.push(newItem);
  return newItem;
}

export async function updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> {
  await delay(300);
  const index = mockMenuItems.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  mockMenuItems[index] = {
    ...mockMenuItems[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return mockMenuItems[index];
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  await delay(300);
  const index = mockMenuItems.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  mockMenuItems.splice(index, 1);
  return true;
}

export async function getMenuItem(id: string): Promise<MenuItem | null> {
  await delay(300);
  return mockMenuItems.find(item => item.id === id) || null;
}

export async function searchMenuItems(searchTerm: string): Promise<MenuItem[]> {
  await delay(300);
  const term = searchTerm.toLowerCase();
  return mockMenuItems.filter(item => 
    item.name.toLowerCase().includes(term) ||
    item.description.toLowerCase().includes(term) ||
    item.category.toLowerCase().includes(term)
  );
}

export async function getCategories(): Promise<string[]> {
  await delay(300);
  const categories = [...new Set(mockMenuItems.map(item => item.category))];
  return categories;
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  await delay(300);
  return mockMenuItems.find(item => item.id === id) || null;
}

export async function updateMenuItemAvailability(id: string, available: boolean): Promise<MenuItem | null> {
  await delay(300);
  const index = mockMenuItems.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  mockMenuItems[index] = {
    ...mockMenuItems[index],
    available,
    updated_at: new Date().toISOString(),
  };
  return mockMenuItems[index];
}

export async function getFeaturedItems(): Promise<MenuItem[]> {
  await delay(300);
  // Return first 4 items as featured
  return mockMenuItems.slice(0, 4);
}

export async function getMenuStats() {
  await delay(300);
  return {
    totalItems: mockMenuItems.length,
    availableItems: mockMenuItems.filter(item => item.available).length,
    categories: [...new Set(mockMenuItems.map(item => item.category))].length,
    averagePrice: mockMenuItems.reduce((sum, item) => sum + item.price, 0) / mockMenuItems.length,
  };
} 