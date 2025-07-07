'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Users, 
  Calendar, 
  Star,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  MapPin,
  Phone
} from 'lucide-react'

// Mock analytics data
const analyticsData = {
  overview: {
    totalRevenue: 125750.00,
    revenueGrowth: 18.5,
    totalOrders: 248,
    ordersGrowth: 12.3,
    totalCustomers: 156,
    customersGrowth: 22.1,
    averageOrderValue: 507.06,
    avgOrderGrowth: 5.4,
    customerSatisfaction: 4.8,
    satisfactionGrowth: 2.1,
    conversionRate: 68.5,
    conversionGrowth: -3.2
  },
  monthlyRevenue: [
    { month: 'Jan', revenue: 8500, orders: 18 },
    { month: 'Feb', revenue: 9200, orders: 21 },
    { month: 'Mar', revenue: 11800, orders: 26 },
    { month: 'Apr', revenue: 14500, orders: 29 },
    { month: 'May', revenue: 16200, orders: 35 },
    { month: 'Jun', revenue: 18900, orders: 38 },
    { month: 'Jul', revenue: 21600, orders: 42 },
    { month: 'Aug', revenue: 19300, orders: 39 }
  ],
  topMenuItems: [
    { name: 'Premium Beef Ribeye', orders: 78, revenue: 4680.00, growth: 15.2 },
    { name: 'BBQ Chicken Wings', orders: 65, revenue: 1820.00, growth: 8.7 },
    { name: 'Grilled Prawns', orders: 52, revenue: 1976.00, growth: 22.1 },
    { name: 'BBQ Pork Ribs', orders: 48, revenue: 2016.00, growth: 12.3 },
    { name: 'Grilled Salmon', orders: 34, revenue: 1632.00, growth: -5.2 }
  ],
  customerSegments: [
    { segment: 'Corporate Events', count: 89, revenue: 54200.00, percentage: 43.1 },
    { segment: 'Private Parties', count: 72, revenue: 31400.00, percentage: 29.0 },
    { segment: 'Weddings', count: 28, revenue: 24800.00, percentage: 17.9 },
    { segment: 'Family Events', count: 35, revenue: 12100.00, percentage: 7.6 },
    { segment: 'Community Events', count: 24, revenue: 3250.00, percentage: 2.4 }
  ],
  locationAnalytics: [
    { area: 'Central Singapore', orders: 45, revenue: 23400.00 },
    { area: 'East Singapore', orders: 38, revenue: 19200.00 },
    { area: 'West Singapore', orders: 42, revenue: 21800.00 },
    { area: 'North Singapore', orders: 35, revenue: 17900.00 },
    { area: 'South Singapore', orders: 29, revenue: 15200.00 }
  ],
  peakTimes: [
    { timeSlot: '10:00 AM - 12:00 PM', orders: 18, percentage: 7.3 },
    { timeSlot: '12:00 PM - 2:00 PM', orders: 32, percentage: 12.9 },
    { timeSlot: '2:00 PM - 4:00 PM', orders: 28, percentage: 11.3 },
    { timeSlot: '4:00 PM - 6:00 PM', orders: 45, percentage: 18.1 },
    { timeSlot: '6:00 PM - 8:00 PM', orders: 78, percentage: 31.5 },
    { timeSlot: '8:00 PM - 10:00 PM', orders: 47, percentage: 18.9 }
  ],
  customerRetention: {
    newCustomers: 67,
    returningCustomers: 89,
    retentionRate: 57.1,
    averageLifetimeValue: 1245.50
  },
  seasonalTrends: [
    { month: 'Jan', corporateEvents: 12, privateParties: 8, weddings: 2 },
    { month: 'Feb', corporateEvents: 15, privateParties: 10, weddings: 3 },
    { month: 'Mar', corporateEvents: 18, privateParties: 12, weddings: 4 },
    { month: 'Apr', corporateEvents: 16, privateParties: 14, weddings: 6 },
    { month: 'May', corporateEvents: 14, privateParties: 16, weddings: 8 },
    { month: 'Jun', corporateEvents: 12, privateParties: 18, weddings: 12 },
    { month: 'Jul', corporateEvents: 10, privateParties: 20, weddings: 15 },
    { month: 'Aug', corporateEvents: 8, privateParties: 18, weddings: 10 }
  ]
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const formatCurrency = (amount: number) => `S$${amount.toLocaleString()}`
  const formatPercentage = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`

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
              <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
              <p className="text-gray-600">Comprehensive insights into your BBQ catering business</p>
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(analyticsData.overview.totalRevenue)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {analyticsData.overview.revenueGrowth > 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                )}
                <span className={analyticsData.overview.revenueGrowth > 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatPercentage(analyticsData.overview.revenueGrowth)}
                </span>
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalOrders}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">{formatPercentage(analyticsData.overview.ordersGrowth)}</span>
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.customerSatisfaction}/5</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">{formatPercentage(analyticsData.overview.satisfactionGrowth)}</span>
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(analyticsData.overview.averageOrderValue)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">{formatPercentage(analyticsData.overview.avgOrderGrowth)}</span>
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalCustomers}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">{formatPercentage(analyticsData.overview.customersGrowth)}</span>
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                <span className="text-red-600">{formatPercentage(analyticsData.overview.conversionGrowth)}</span>
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue Trends
              </CardTitle>
              <CardDescription>Monthly revenue and order counts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.monthlyRevenue.map((month, index) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="font-medium">{month.month}</span>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(month.revenue)}</div>
                        <div className="text-sm text-gray-600">{month.orders} orders</div>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${(month.revenue / 25000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Menu Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Top Performing Items
              </CardTitle>
              <CardDescription>Best-selling menu items and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topMenuItems.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold text-orange-600">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.orders} orders</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(item.revenue)}</div>
                      <div className={`text-sm ${item.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(item.growth)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Customer Segments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Customer Segments
              </CardTitle>
              <CardDescription>Revenue breakdown by event type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.customerSegments.map((segment, index) => (
                  <div key={segment.segment} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{segment.segment}</span>
                      <span className="text-sm text-gray-600">{segment.percentage}%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${segment.percentage}%` }}
                        />
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(segment.revenue)}</div>
                        <div className="text-sm text-gray-600">{segment.count} events</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Peak Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Peak Booking Times
              </CardTitle>
              <CardDescription>Most popular event time slots</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.peakTimes.map((timeSlot, index) => (
                  <div key={timeSlot.timeSlot} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{timeSlot.timeSlot}</span>
                      <span className="text-sm text-gray-600">{timeSlot.percentage}%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${timeSlot.percentage}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-600">{timeSlot.orders} orders</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Location Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Analytics
              </CardTitle>
              <CardDescription>Event distribution across Singapore</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.locationAnalytics.map((location, index) => (
                  <div key={location.area} className="flex items-center justify-between">
                    <span className="font-medium">{location.area}</span>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(location.revenue)}</div>
                      <div className="text-sm text-gray-600">{location.orders} orders</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Retention */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Retention
              </CardTitle>
              <CardDescription>Customer loyalty and lifetime value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{analyticsData.customerRetention.newCustomers}</div>
                    <div className="text-sm text-gray-600">New Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analyticsData.customerRetention.returningCustomers}</div>
                    <div className="text-sm text-gray-600">Returning Customers</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Retention Rate</span>
                    <span className="font-semibold">{analyticsData.customerRetention.retentionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Lifetime Value</span>
                    <span className="font-semibold">{formatCurrency(analyticsData.customerRetention.averageLifetimeValue)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seasonal Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Seasonal Trends
            </CardTitle>
            <CardDescription>Event type distribution throughout the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-8 gap-4 text-center text-sm font-medium text-gray-600">
                <div>Month</div>
                <div>Jan</div>
                <div>Feb</div>
                <div>Mar</div>
                <div>Apr</div>
                <div>May</div>
                <div>Jun</div>
                <div>Jul</div>
              </div>
              
              {['corporateEvents', 'privateParties', 'weddings'].map((eventType, index) => (
                <div key={eventType} className="grid grid-cols-8 gap-4 items-center">
                  <div className="font-medium capitalize">
                    {eventType.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  {analyticsData.seasonalTrends.map((month, monthIndex) => (
                    <div key={monthIndex} className="text-center">
                      <div className={`font-semibold ${index === 0 ? 'text-orange-600' : index === 1 ? 'text-blue-600' : 'text-purple-600'}`}>
                        {month[eventType as keyof typeof month]}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 