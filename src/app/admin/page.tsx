'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Star,
  ChefHat,
  ArrowUpRight
} from 'lucide-react'

// Mock data for dashboard
const dashboardStats = {
  totalRevenue: 45250.00,
  revenueGrowth: 12.5,
  totalOrders: 156,
  ordersGrowth: 8.3,
  totalCustomers: 89,
  customersGrowth: 15.2,
  averageOrderValue: 290.06,
  avgOrderGrowth: 4.1
}

const recentOrders = [
  {
    id: 'ORD-001',
    customerName: 'Sarah Lim',
    eventDate: '2024-07-15',
    eventTime: '6:00 PM',
    guestCount: 50,
    location: 'Marina Bay Sands',
    total: 1250.00,
    status: 'confirmed',
    paymentStatus: 'paid',
    eventType: 'Corporate Event',
    phone: '+65 9123 4567'
  },
  {
    id: 'ORD-002',
    customerName: 'David Wong',
    eventDate: '2024-07-18',
    eventTime: '7:00 PM',
    guestCount: 80,
    location: 'Sentosa Beach',
    total: 2400.00,
    status: 'pending',
    paymentStatus: 'pending',
    eventType: 'Wedding',
    phone: '+65 9234 5678'
  },
  {
    id: 'ORD-003',
    customerName: 'Michelle Tan',
    eventDate: '2024-07-12',
    eventTime: '2:00 PM',
    guestCount: 25,
    location: 'Private Residence',
    total: 625.00,
    status: 'preparing',
    paymentStatus: 'paid',
    eventType: 'Birthday Party',
    phone: '+65 9345 6789'
  },
  {
    id: 'ORD-004',
    customerName: 'Ahmad Rahman',
    eventDate: '2024-07-10',
    eventTime: '12:00 PM',
    guestCount: 35,
    location: 'East Coast Park',
    total: 875.00,
    status: 'completed',
    paymentStatus: 'paid',
    eventType: 'Family Gathering',
    phone: '+65 9456 7890'
  },
  {
    id: 'ORD-005',
    customerName: 'Jennifer Lee',
    eventDate: '2024-07-20',
    eventTime: '6:30 PM',
    guestCount: 120,
    location: 'Gardens by the Bay',
    total: 3600.00,
    status: 'confirmed',
    paymentStatus: 'paid',
    eventType: 'Corporate Event',
    phone: '+65 9567 8901'
  }
]

const popularMenuItems = [
  { name: 'Premium Beef Ribeye', orders: 45, revenue: 2025.00 },
  { name: 'BBQ Chicken Wings', orders: 38, revenue: 1064.00 },
  { name: 'Grilled Prawns', orders: 32, revenue: 1216.00 },
  { name: 'Pork Ribs', orders: 29, revenue: 1218.00 },
  { name: 'Grilled Salmon', orders: 22, revenue: 1056.00 }
]

const todaysSchedule = [
  {
    id: 'SCH-001',
    orderId: 'ORD-003',
    customerName: 'Michelle Tan',
    time: '2:00 PM',
    guestCount: 25,
    location: 'Private Residence',
    chef: 'Chef Marcus',
    status: 'in-progress'
  },
  {
    id: 'SCH-002',
    orderId: 'ORD-006',
    customerName: 'Robert Chen',
    time: '6:00 PM',
    guestCount: 40,
    location: 'Pasir Ris Park',
    chef: 'Chef Sarah',
    status: 'upcoming'
  }
]

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your BBQ Affair business overview.</p>
          
          {/* Period Selector */}
          <div className="flex gap-2 mt-4">
            {['7d', '30d', '90d'].map(period => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period === '7d' ? 'Last 7 days' : period === '30d' ? 'Last 30 days' : 'Last 90 days'}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">S${dashboardStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{dashboardStats.revenueGrowth}%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{dashboardStats.ordersGrowth}%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{dashboardStats.customersGrowth}%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">S${dashboardStats.averageOrderValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{dashboardStats.avgOrderGrowth}%</span> from last period
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest bookings and their status</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/orders">
                      View All <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-orange-100 text-orange-600">
                            {order.customerName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{order.customerName}</p>
                            <Badge variant="outline" className="text-xs">
                              {order.id}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(order.eventDate).toLocaleDateString('en-SG')} at {order.eventTime}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {order.guestCount} guests
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                              {order.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">S${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{order.eventType}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todaysSchedule.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No events scheduled for today</p>
                ) : (
                  <div className="space-y-4">
                    {todaysSchedule.map(event => (
                      <div key={event.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{event.time}</span>
                          <Badge className={event.status === 'in-progress' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {event.status}
                          </Badge>
                        </div>
                        <p className="font-medium">{event.customerName}</p>
                        <p className="text-sm text-gray-600">{event.guestCount} guests</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <ChefHat className="h-3 w-3 mr-1" />
                          {event.chef}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Popular Menu Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Popular Items
                </CardTitle>
                <CardDescription>Top performing menu items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularMenuItems.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">{item.orders} orders</p>
                        </div>
                      </div>
                      <p className="font-bold text-sm">S${item.revenue.toFixed(0)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/admin/orders">
                      <Calendar className="h-4 w-4 mr-2" />
                      View All Orders
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/admin/menu">
                      <ChefHat className="h-4 w-4 mr-2" />
                      Manage Menu
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/admin/schedule">
                      <Users className="h-4 w-4 mr-2" />
                      Staff Schedule
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Completed Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">142</div>
              <p className="text-sm text-gray-600">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">8</div>
              <p className="text-sm text-gray-600">Awaiting confirmation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-orange-600" />
                Customer Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">4.9</div>
              <p className="text-sm text-gray-600">Average rating</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 