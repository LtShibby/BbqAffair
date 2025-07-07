'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  Save,
  Upload,
  Eye,
  Star,
  DollarSign,
  Package
} from 'lucide-react'

// Mock menu data
const menuCategories = [
  { id: '1', name: 'Premium Proteins', description: 'Our finest quality meats', displayOrder: 1, isActive: true },
  { id: '2', name: 'Poultry & Seafood', description: 'Fresh chicken and seafood options', displayOrder: 2, isActive: true },
  { id: '3', name: 'Sides & Salads', description: 'Delicious accompaniments', displayOrder: 3, isActive: true },
  { id: '4', name: 'Beverages', description: 'Refreshing drinks', displayOrder: 4, isActive: true },
  { id: '5', name: 'Desserts', description: 'Sweet endings', displayOrder: 5, isActive: true }
]

const menuItems = [
  {
    id: '1',
    name: 'Premium Beef Ribeye',
    description: 'Tender, marbled ribeye steak grilled to perfection with our signature BBQ rub',
    price: 60.00,
    categoryId: '1',
    isActive: true,
    isPopular: true,
    isVegetarian: false,
    isHalal: true,
    allergens: ['None'],
    preparationTime: 15,
    servingSize: '200g per portion',
    nutritionInfo: '350 calories, 28g protein, 25g fat',
    imageUrl: '🥩',
    stockLevel: 50,
    minimumOrder: 1,
    tags: ['premium', 'halal', 'protein']
  },
  {
    id: '2',
    name: 'BBQ Chicken Wings',
    description: 'Juicy chicken wings marinated in our secret sauce and grilled to crispy perfection',
    price: 28.00,
    categoryId: '2',
    isActive: true,
    isPopular: true,
    isVegetarian: false,
    isHalal: true,
    allergens: ['Soy'],
    preparationTime: 12,
    servingSize: '6 pieces per portion',
    nutritionInfo: '280 calories, 22g protein, 18g fat',
    imageUrl: '🍗',
    stockLevel: 100,
    minimumOrder: 2,
    tags: ['popular', 'halal', 'wings']
  },
  {
    id: '3',
    name: 'Grilled Prawns',
    description: 'Fresh tiger prawns seasoned with herbs and grilled with garlic butter',
    price: 48.00,
    categoryId: '2',
    isActive: true,
    isPopular: false,
    isVegetarian: false,
    isHalal: false,
    allergens: ['Shellfish'],
    preparationTime: 8,
    servingSize: '250g per portion',
    nutritionInfo: '180 calories, 35g protein, 4g fat',
    imageUrl: '🦐',
    stockLevel: 30,
    minimumOrder: 1,
    tags: ['seafood', 'premium']
  },
  {
    id: '4',
    name: 'Classic Coleslaw',
    description: 'Crisp cabbage and carrots in our house-made creamy dressing',
    price: 12.00,
    categoryId: '3',
    isActive: true,
    isPopular: false,
    isVegetarian: true,
    isHalal: true,
    allergens: ['Eggs', 'Dairy'],
    preparationTime: 5,
    servingSize: '150g per portion',
    nutritionInfo: '120 calories, 2g protein, 8g fat',
    imageUrl: '🥗',
    stockLevel: 200,
    minimumOrder: 5,
    tags: ['vegetarian', 'side', 'fresh']
  },
  {
    id: '5',
    name: 'BBQ Pork Ribs',
    description: 'Fall-off-the-bone pork ribs slow-cooked and finished on the grill',
    price: 42.00,
    categoryId: '1',
    isActive: true,
    isPopular: true,
    isVegetarian: false,
    isHalal: false,
    allergens: ['None'],
    preparationTime: 20,
    servingSize: '300g per portion',
    nutritionInfo: '420 calories, 30g protein, 32g fat',
    imageUrl: '🍖',
    stockLevel: 25,
    minimumOrder: 1,
    tags: ['popular', 'pork', 'slow-cooked']
  },
  {
    id: '6',
    name: 'Grilled Corn',
    description: 'Sweet corn on the cob brushed with herb butter and spices',
    price: 12.00,
    categoryId: '3',
    isActive: true,
    isPopular: false,
    isVegetarian: true,
    isHalal: true,
    allergens: ['Dairy'],
    preparationTime: 10,
    servingSize: '1 cob per portion',
    nutritionInfo: '150 calories, 5g protein, 6g fat',
    imageUrl: '🌽',
    stockLevel: 80,
    minimumOrder: 10,
    tags: ['vegetarian', 'halal', 'grilled']
  }
]

export default function MenuManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null)
  const [isAddingItem, setIsAddingItem] = useState(false)

  // Form states
  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    isActive: true,
    isPopular: false,
    isVegetarian: false,
    isHalal: false,
    allergens: '',
    preparationTime: '',
    servingSize: '',
    nutritionInfo: '',
    stockLevel: '',
    minimumOrder: '',
    tags: ''
  })

  const filteredItems = menuItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory
      return matchesSearch && matchesCategory
    })

  const resetItemForm = () => {
    setItemForm({
      name: '',
      description: '',
      price: '',
      categoryId: '',
      isActive: true,
      isPopular: false,
      isVegetarian: false,
      isHalal: false,
      allergens: '',
      preparationTime: '',
      servingSize: '',
      nutritionInfo: '',
      stockLevel: '',
      minimumOrder: '',
      tags: ''
    })
  }

  const openAddItem = () => {
    resetItemForm()
    setIsAddingItem(true)
  }

  const openEditItem = (item: typeof menuItems[0]) => {
    setItemForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      categoryId: item.categoryId,
      isActive: item.isActive,
      isPopular: item.isPopular,
      isVegetarian: item.isVegetarian,
      isHalal: item.isHalal,
      allergens: item.allergens.join(', '),
      preparationTime: item.preparationTime.toString(),
      servingSize: item.servingSize,
      nutritionInfo: item.nutritionInfo,
      stockLevel: item.stockLevel.toString(),
      minimumOrder: item.minimumOrder.toString(),
      tags: item.tags.join(', ')
    })
    setSelectedItem(item)
    setIsAddingItem(true)
  }

  const saveItem = () => {
    // In a real app, this would make an API call
    console.log('Saving item:', itemForm)
    setIsAddingItem(false)
    setSelectedItem(null)
    resetItemForm()
  }

  const deleteItem = (itemId: string) => {
    // In a real app, this would make an API call
    console.log('Deleting item:', itemId)
  }

  const getCategoryName = (categoryId: string) => {
    return menuCategories.find(cat => cat.id === categoryId)?.name || 'Unknown Category'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
              <p className="text-gray-600">Manage your BBQ menu items and categories</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import Menu
              </Button>
              <Button onClick={openAddItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </div>
          </div>
        </div>

        {/* Menu Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold">{menuItems.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Items</p>
                  <p className="text-2xl font-bold text-green-600">
                    {menuItems.filter(item => item.isActive).length}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Popular Items</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {menuItems.filter(item => item.isPopular).length}
                  </p>
                </div>
                <Star className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Price</p>
                  <p className="text-2xl font-bold text-purple-600">
                    S${(menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length).toFixed(0)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Management */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Menu Categories
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuCategories.map(category => (
                <div key={category.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{category.name}</h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={category.isActive ? 'default' : 'secondary'}>
                      {category.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {menuItems.filter(item => item.categoryId === category.id).length} items
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {menuCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Menu Items ({filteredItems.length})</CardTitle>
            <CardDescription>Manage your BBQ menu offerings</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No menu items found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                    {/* Item Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{item.imageUrl}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-600">{getCategoryName(item.categoryId)}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEditItem(item)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)}>
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    {/* Item Details */}
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{item.description}</p>

                    {/* Price & Status */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-orange-600">S${item.price.toFixed(2)}</span>
                      <div className="flex gap-1">
                        <Badge variant={item.isActive ? 'default' : 'secondary'}>
                          {item.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        {item.isPopular && (
                          <Badge variant="outline" className="border-orange-200 text-orange-600">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Dietary Info */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.isVegetarian && <Badge variant="secondary">Vegetarian</Badge>}
                      {item.isHalal && <Badge variant="secondary">Halal</Badge>}
                      {item.allergens.length > 0 && item.allergens[0] !== 'None' && (
                        <Badge variant="outline" className="text-xs">
                          Contains: {item.allergens.join(', ')}
                        </Badge>
                      )}
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Stock Level:</span>
                        <span className={item.stockLevel < 20 ? 'text-red-600 font-medium' : ''}>{item.stockLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prep Time:</span>
                        <span>{item.preparationTime} mins</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Serving Size:</span>
                        <span>{item.servingSize}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Item Modal */}
        <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </DialogTitle>
              <DialogDescription>
                {selectedItem ? 'Update the menu item details below.' : 'Add a new item to your BBQ menu.'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Basic Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                      id="name"
                      value={itemForm.name}
                      onChange={(e) => setItemForm({...itemForm, name: e.target.value})}
                      placeholder="e.g., Premium Beef Ribeye"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (S$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={itemForm.price}
                      onChange={(e) => setItemForm({...itemForm, price: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={itemForm.description}
                    onChange={(e) => setItemForm({...itemForm, description: e.target.value})}
                    placeholder="Describe the menu item..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={itemForm.categoryId} onValueChange={(value) => setItemForm({...itemForm, categoryId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {menuCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dietary & Properties */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Properties</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isActive"
                      checked={itemForm.isActive}
                      onCheckedChange={(checked) => setItemForm({...itemForm, isActive: checked as boolean})}
                    />
                    <Label htmlFor="isActive">Active (visible to customers)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isPopular"
                      checked={itemForm.isPopular}
                      onCheckedChange={(checked) => setItemForm({...itemForm, isPopular: checked as boolean})}
                    />
                    <Label htmlFor="isPopular">Mark as popular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isVegetarian"
                      checked={itemForm.isVegetarian}
                      onCheckedChange={(checked) => setItemForm({...itemForm, isVegetarian: checked as boolean})}
                    />
                    <Label htmlFor="isVegetarian">Vegetarian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isHalal"
                      checked={itemForm.isHalal}
                      onCheckedChange={(checked) => setItemForm({...itemForm, isHalal: checked as boolean})}
                    />
                    <Label htmlFor="isHalal">Halal certified</Label>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Additional Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preparationTime">Preparation Time (minutes)</Label>
                    <Input
                      id="preparationTime"
                      type="number"
                      value={itemForm.preparationTime}
                      onChange={(e) => setItemForm({...itemForm, preparationTime: e.target.value})}
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stockLevel">Stock Level</Label>
                    <Input
                      id="stockLevel"
                      type="number"
                      value={itemForm.stockLevel}
                      onChange={(e) => setItemForm({...itemForm, stockLevel: e.target.value})}
                      placeholder="50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="servingSize">Serving Size</Label>
                    <Input
                      id="servingSize"
                      value={itemForm.servingSize}
                      onChange={(e) => setItemForm({...itemForm, servingSize: e.target.value})}
                      placeholder="e.g., 200g per portion"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minimumOrder">Minimum Order Quantity</Label>
                    <Input
                      id="minimumOrder"
                      type="number"
                      value={itemForm.minimumOrder}
                      onChange={(e) => setItemForm({...itemForm, minimumOrder: e.target.value})}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="allergens">Allergens (comma-separated)</Label>
                  <Input
                    id="allergens"
                    value={itemForm.allergens}
                    onChange={(e) => setItemForm({...itemForm, allergens: e.target.value})}
                    placeholder="e.g., Dairy, Nuts, Soy"
                  />
                </div>

                <div>
                  <Label htmlFor="nutritionInfo">Nutrition Information</Label>
                  <Input
                    id="nutritionInfo"
                    value={itemForm.nutritionInfo}
                    onChange={(e) => setItemForm({...itemForm, nutritionInfo: e.target.value})}
                    placeholder="e.g., 350 calories, 28g protein, 25g fat"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={itemForm.tags}
                    onChange={(e) => setItemForm({...itemForm, tags: e.target.value})}
                    placeholder="e.g., premium, halal, protein"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                Cancel
              </Button>
              <Button onClick={saveItem}>
                <Save className="h-4 w-4 mr-2" />
                {selectedItem ? 'Update Item' : 'Add Item'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 