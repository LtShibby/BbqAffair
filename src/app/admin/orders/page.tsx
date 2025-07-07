'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Search, 
  Download,
  ArrowLeft,
  Calendar, 
  Users, 
  MapPin,
  Phone,
  Mail,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react'

// Extended mock orders data
const ordersData = [
  {
    id: 'ORD-001',
    customerName: 'Sarah Lim',
    customerEmail: 'sarah.lim@company.com',
    customerPhone: '+65 9123 4567',
    eventDate: '2024-07-15',
    eventTime: '6:00 PM',
    guestCount: 50,
    location: 'Marina Bay Sands, Level 3 Conference Room',
    total: 1250.00,
    status: 'confirmed',
    paymentStatus: 'paid',
    eventType: 'Corporate Event',
    packageType: 'Premium BBQ Package',
    createdAt: '2024-06-20',
    specialRequests: 'Please provide vegetarian options for 5 guests. Need halal certification.',
    menuItems: [
      { name: 'Premium Beef Ribeye', quantity: 3, price: 180.00 },
      { name: 'BBQ Chicken Wings', quantity: 5, price: 140.00 },
      { name: 'Grilled Prawns', quantity: 2, price: 96.00 }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'David Wong',
    customerEmail: 'david.wong@email.com',
    customerPhone: '+65 9234 5678',
    eventDate: '2024-07-18',
    eventTime: '7:00 PM',
    guestCount: 80,
    location: 'Sentosa Beach, Siloso Beach Walk',
    total: 2400.00,
    status: 'pending',
    paymentStatus: 'pending',
    eventType: 'Wedding',
    packageType: 'Deluxe BBQ Package',
    createdAt: '2024-06-22',
    specialRequests: 'Wedding celebration setup needed. Please coordinate with wedding planner.',
    menuItems: [
      { name: 'Premium Beef Ribeye', quantity: 5, price: 300.00 },
      { name: 'Grilled Salmon', quantity: 4, price: 192.00 },
      { name: 'BBQ Pork Ribs', quantity: 3, price: 126.00 }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Michelle Tan',
    customerEmail: 'michelle.tan@gmail.com',
    customerPhone: '+65 9345 6789',
    eventDate: '2024-07-12',
    eventTime: '2:00 PM',
    guestCount: 25,
    location: '123 Orchard Road, Private Residence',
    total: 625.00,
    status: 'preparing',
    paymentStatus: 'paid',
    eventType: 'Birthday Party',
    packageType: 'Basic BBQ Package',
    createdAt: '2024-06-15',
    specialRequests: 'Birthday cake setup assistance needed.',
    menuItems: [
      { name: 'BBQ Chicken Wings', quantity: 4, price: 112.00 },
      { name: 'Grilled Prawns', quantity: 2, price: 96.00 }
    ]
  },
  {
    id: 'ORD-004',
    customerName: 'Ahmad Rahman',
    customerEmail: 'ahmad.rahman@email.com',
    customerPhone: '+65 9456 7890',
    eventDate: '2024-07-10',
    eventTime: '12:00 PM',
    guestCount: 35,
    location: 'East Coast Park, Area C',
    total: 875.00,
    status: 'completed',
    paymentStatus: 'paid',
    eventType: 'Family Gathering',
    packageType: 'Premium BBQ Package',
    createdAt: '2024-06-10',
    specialRequests: 'Family reunion - mix of elderly and children attending.',
    menuItems: [
      { name: 'BBQ Chicken Wings', quantity: 3, price: 84.00 },
      { name: 'BBQ Pork Ribs', quantity: 2, price: 84.00 },
      { name: 'Grilled Corn', quantity: 4, price: 48.00 }
    ]
  },
  {
    id: 'ORD-005',
    customerName: 'Jennifer Lee',
    customerEmail: 'jennifer.lee@corpmail.com',
    customerPhone: '+65 9567 8901',
    eventDate: '2024-07-20',
    eventTime: '6:30 PM',
    guestCount: 120,
    location: 'Gardens by the Bay, Supertree Grove',
    total: 3600.00,
    status: 'confirmed',
    paymentStatus: 'paid',
    eventType: 'Corporate Event',
    packageType: 'Deluxe BBQ Package',
    createdAt: '2024-06-25',
    specialRequests: 'Annual company dinner. Need professional presentation setup.',
    menuItems: [
      { name: 'Premium Beef Ribeye', quantity: 8, price: 480.00 },
      { name: 'Grilled Salmon', quantity: 6, price: 288.00 },
      { name: 'BBQ Chicken Wings', quantity: 10, price: 280.00 }
    ]
  },
  {
    id: 'ORD-006',
    customerName: 'Robert Chen',
    customerEmail: 'robert.chen@email.com',
    customerPhone: '+65 9678 9012',
    eventDate: '2024-07-25',
    eventTime: '5:00 PM',
    guestCount: 40,
    location: 'Pasir Ris Park, Playground Area',
    total: 1000.00,
    status: 'pending',
    paymentStatus: 'pending',
    eventType: 'Birthday Party',
    packageType: 'Premium BBQ Package',
    createdAt: '2024-07-01',
    specialRequests: 'Kids birthday party - need child-friendly setup.',
    menuItems: [
      { name: 'BBQ Chicken Wings', quantity: 6, price: 168.00 },
      { name: 'Grilled Corn', quantity: 5, price: 60.00 }
    ]
  }
]

export default function OrdersManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<typeof ordersData[0] | null>(null)

  const filteredOrders = ordersData
    .filter(order => {
      const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'preparing':
        return 'bg-orange-100 text-orange-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
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
              <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-gray-600">Manage all your BBQ catering orders and bookings</p>
            </div>
            
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by customer name, order ID, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                {['all', 'pending', 'confirmed', 'preparing', 'completed', 'cancelled'].map(status => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                  >
                    {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{ordersData.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {ordersData.filter(o => o.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {ordersData.filter(o => o.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-orange-600">
                    S${ordersData.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
            <CardDescription>
              {statusFilter === 'all' ? 'Showing all orders' : `Showing ${statusFilter} orders`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No orders found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map(order => (
                  <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      {/* Order Info */}
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-orange-100 text-orange-600">
                            {order.customerName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{order.customerName}</h3>
                            <Badge variant="outline" className="text-xs">{order.id}</Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(order.eventDate).toLocaleDateString('en-SG')} at {order.eventTime}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {order.guestCount} guests • {order.eventType}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {order.location}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                              Payment: {order.paymentStatus}
                            </Badge>
                            <Badge variant="secondary">{order.packageType}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Actions & Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 mb-2">
                          S${order.total.toFixed(2)}
                        </p>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          
                          {order.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Confirm
                            </Button>
                          )}
                          
                          {order.status === 'confirmed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'preparing')}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Start Prep
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details Modal */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    Order Details - {selectedOrder.id}
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>
                    Complete information for this BBQ catering order
                  </DialogDescription>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Name</label>
                        <p className="font-semibold">{selectedOrder.customerName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {selectedOrder.customerEmail}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone</label>
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          {selectedOrder.customerPhone}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Event Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Event Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Event Type</label>
                        <p className="font-semibold">{selectedOrder.eventType}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Date & Time</label>
                        <p className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(selectedOrder.eventDate).toLocaleDateString('en-SG')} at {selectedOrder.eventTime}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Guest Count</label>
                        <p className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {selectedOrder.guestCount} guests
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <p className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {selectedOrder.location}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Menu Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Menu Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedOrder.menuItems.map((item: { name: string; quantity: number; price: number }, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-bold">S${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                      <div className="flex justify-between items-center py-2 font-bold text-lg border-t-2">
                        <span>Total</span>
                        <span>S${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Special Requests */}
                {selectedOrder.specialRequests && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Special Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{selectedOrder.specialRequests}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Order
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Customer
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 