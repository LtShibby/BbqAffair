'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { WhatsAppButton, WhatsAppMessages } from '@/components/WhatsAppButton'
import { Plus, Minus, ShoppingCart, Search, Filter } from 'lucide-react'

// Mock data for demonstration
const mockCategories = [
  { id: '1', name: 'BBQ Proteins', description: 'Premium grilled meats and seafood' },
  { id: '2', name: 'Sides & Salads', description: 'Fresh accompaniments and vegetables' },
  { id: '3', name: 'Beverages', description: 'Refreshing drinks for your event' },
  { id: '4', name: 'Desserts', description: 'Sweet endings to your BBQ feast' },
]

const mockMenuItems = [
  // BBQ Proteins
  {
    id: '1',
    categoryId: '1',
    name: 'Premium Beef Ribeye',
    description: 'Tender ribeye steaks grilled to perfection with our signature seasoning',
    price: 45.00,
    image: '🥩',
    isAvailable: true,
  },
  {
    id: '2',
    categoryId: '1',
    name: 'BBQ Chicken Wings',
    description: 'Marinated chicken wings with signature BBQ sauce',
    price: 28.00,
    image: '🍗',
    isAvailable: true,
  },
  {
    id: '3',
    categoryId: '1',
    name: 'Grilled Prawns',
    description: 'Fresh prawns with garlic herb seasoning',
    price: 38.00,
    image: '🦐',
    isAvailable: true,
  },
  {
    id: '4',
    categoryId: '1',
    name: 'Pork Ribs',
    description: 'Slow-cooked pork ribs with smoky BBQ glaze',
    price: 42.00,
    image: '🍖',
    isAvailable: true,
  },
  {
    id: '5',
    categoryId: '1',
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with lemon herb butter',
    price: 48.00,
    image: '🐟',
    isAvailable: false,
  },
  // Sides & Salads
  {
    id: '6',
    categoryId: '2',
    name: 'Coleslaw',
    description: 'Crispy fresh vegetable salad with tangy dressing',
    price: 12.00,
    image: '🥗',
    isAvailable: true,
  },
  {
    id: '7',
    categoryId: '2',
    name: 'Grilled Corn',
    description: 'Sweet corn with herb butter and parmesan',
    price: 8.00,
    image: '🌽',
    isAvailable: true,
  },
  {
    id: '8',
    categoryId: '2',
    name: 'Potato Salad',
    description: 'Creamy potato salad with herbs and spices',
    price: 15.00,
    image: '🥔',
    isAvailable: true,
  },
  // Beverages
  {
    id: '9',
    categoryId: '3',
    name: 'Soft Drinks',
    description: 'Assorted carbonated beverages (Coke, Sprite, Orange)',
    price: 3.00,
    image: '🥤',
    isAvailable: true,
  },
  {
    id: '10',
    categoryId: '3',
    name: 'Fresh Juice',
    description: 'Local fruit juices (Orange, Apple, Watermelon)',
    price: 5.00,
    image: '🧃',
    isAvailable: true,
  },
  // Desserts
  {
    id: '11',
    categoryId: '4',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie with vanilla ice cream',
    price: 8.00,
    image: '🍰',
    isAvailable: true,
  },
  {
    id: '12',
    categoryId: '4',
    name: 'Fruit Platter',
    description: 'Seasonal fresh fruits beautifully arranged',
    price: 25.00,
    image: '🍓',
    isAvailable: true,
  },
]

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id)
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === itemId)
      if (existing && existing.quantity > 1) {
        return prev.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      }
      return prev.filter(cartItem => cartItem.id !== itemId)
    })
  }

  const getCartQuantity = (itemId: string) => {
    return cart.find(item => item.id === itemId)?.quantity || 0
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const filteredItems = mockMenuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const groupedItems = mockCategories.map(category => ({
    category,
    items: filteredItems.filter(item => item.categoryId === category.id)
  })).filter(group => group.items.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our premium BBQ selections, made with the finest ingredients and grilled to perfection
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="whitespace-nowrap"
              >
                All Items
              </Button>
              {mockCategories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu Items */}
          <div className="flex-1">
            {selectedCategory === 'all' ? (
              // Show by categories
              groupedItems.map(({ category, items }) => (
                <div key={category.id} className="mb-12">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {items.map(item => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        quantity={getCartQuantity(item.id)}
                        onAdd={() => addToCart(item)}
                        onRemove={() => removeFromCart(item.id)}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Show filtered items
              <div className="grid md:grid-cols-2 gap-6">
                {filteredItems.map(item => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    quantity={getCartQuantity(item.id)}
                    onAdd={() => addToCart(item)}
                    onRemove={() => removeFromCart(item.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          {cart.length > 0 && (
            <div className="lg:w-80">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Your Order ({cart.reduce((total, item) => total + item.quantity, 0)} items)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">S${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>S${getCartTotal().toFixed(2)}</span>
                    </div>
                    <Button className="w-full mt-4" size="lg">
                      Proceed to Booking
                    </Button>
                    <WhatsAppButton 
                      variant="outline" 
                      className="w-full mt-2"
                      message={`Hi BBQ Affair! I'd like to order:\n\n${cart.map(item => `${item.quantity}x ${item.name} - S$${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nTotal: S$${getCartTotal().toFixed(2)}\n\nCould you help me proceed with the booking?`}
                    >
                      Send Order via WhatsApp
                    </WhatsAppButton>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function MenuItemCard({ 
  item, 
  quantity, 
  onAdd, 
  onRemove 
}: { 
  item: any
  quantity: number
  onAdd: () => void
  onRemove: () => void
}) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="text-4xl">{item.image}</div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
              <div className="text-right">
                <p className="text-xl font-bold text-orange-600">S${item.price.toFixed(2)}</p>
                {!item.isAvailable && (
                  <Badge variant="secondary" className="mt-1">Unavailable</Badge>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            
            {item.isAvailable ? (
              quantity > 0 ? (
                <div className="flex items-center gap-3">
                  <Button size="sm" variant="outline" onClick={onRemove}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-medium">{quantity}</span>
                  <Button size="sm" variant="outline" onClick={onAdd}>
                    <Plus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm text-gray-600 ml-2">
                    S${(item.price * quantity).toFixed(2)}
                  </span>
                </div>
              ) : (
                <Button onClick={onAdd} size="sm">
                  <Plus className="h-3 w-3 mr-1" />
                  Add to Order
                </Button>
              )
            ) : (
              <Button disabled size="sm" variant="secondary">
                Currently Unavailable
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 