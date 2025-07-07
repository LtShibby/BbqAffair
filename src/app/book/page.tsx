'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { WhatsAppButton, WhatsAppMessages } from '@/components/WhatsAppButton'
import { CalendarIcon, Clock, Users, MapPin, Phone, Mail, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react'
import { format, addDays, isToday, isTomorrow } from 'date-fns'

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', 
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
]

const packageOptions = [
  {
    id: 'basic',
    name: 'Basic BBQ Package',
    description: 'Perfect for small gatherings',
    price: 25,
    includes: ['Choice of 2 proteins', 'Basic sides', 'Beverages', 'Setup & cleanup'],
    minGuests: 10,
    maxGuests: 30
  },
  {
    id: 'premium',
    name: 'Premium BBQ Package',
    description: 'Our most popular option',
    price: 35,
    includes: ['Choice of 3 proteins', 'Premium sides', 'Beverages', 'Dessert', 'Setup & cleanup', 'Dedicated chef'],
    minGuests: 20,
    maxGuests: 60
  },
  {
    id: 'deluxe',
    name: 'Deluxe BBQ Package',
    description: 'Ultimate BBQ experience',
    price: 50,
    includes: ['All proteins available', 'Full sides selection', 'Premium beverages', 'Desserts', 'Setup & cleanup', 'Dedicated chef & server'],
    minGuests: 30,
    maxGuests: 100
  }
]

export default function BookEventPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Event Details
    date: undefined as Date | undefined,
    time: '',
    guestCount: '',
    packageType: '',
    
    // Venue Details
    venueType: '',
    address: '',
    
    // Contact Details
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  })

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const getDateDisplay = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'MMM dd, yyyy')
  }

  const getEstimatedTotal = () => {
    const selectedPackage = packageOptions.find(pkg => pkg.id === formData.packageType)
    const guests = parseInt(formData.guestCount) || 0
    if (!selectedPackage || guests === 0) return 0
    return selectedPackage.price * guests
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const isStepValid = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return formData.date && formData.time && formData.guestCount && formData.packageType
      case 2:
        return formData.venueType && formData.address
      case 3:
        return formData.name && formData.email && formData.phone
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/menu">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Menu
              </Link>
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your BBQ Event</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let's plan your perfect BBQ experience. Our team will handle everything!
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-4">
              {[
                { number: 1, title: 'Event Details' },
                { number: 2, title: 'Venue' },
                { number: 3, title: 'Contact' },
                { number: 4, title: 'Confirmation' }
              ].map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium
                    ${step >= stepItem.number 
                      ? 'bg-orange-600 border-orange-600 text-white' 
                      : 'border-gray-300 text-gray-500'
                    }
                  `}>
                    {stepItem.number}
                  </div>
                  <span className={`ml-2 text-sm ${step >= stepItem.number ? 'text-orange-600 font-medium' : 'text-gray-500'}`}>
                    {stepItem.title}
                  </span>
                  {index < 3 && (
                    <div className={`w-8 h-0.5 mx-4 ${step > stepItem.number ? 'bg-orange-600' : 'bg-gray-300'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Event Details */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>When and what type of BBQ experience are you looking for?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>Event Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? getDateDisplay(formData.date) : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => updateFormData('date', date)}
                          disabled={(date) => date < addDays(new Date(), 1)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selection */}
                  <div className="space-y-2">
                    <Label>Event Time</Label>
                    <Select value={formData.time} onValueChange={(value) => updateFormData('time', value)}>
                      <SelectTrigger>
                        <Clock className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Guest Count */}
                <div className="space-y-2">
                  <Label>Number of Guests</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      min="10"
                      max="100"
                      placeholder="e.g., 25"
                      value={formData.guestCount}
                      onChange={(e) => updateFormData('guestCount', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Package Selection */}
                <div className="space-y-4">
                  <Label>Choose Your Package</Label>
                  <div className="grid gap-4">
                    {packageOptions.map(pkg => {
                      const guests = parseInt(formData.guestCount) || 0
                      const isEligible = guests >= pkg.minGuests && guests <= pkg.maxGuests
                      const isSelected = formData.packageType === pkg.id
                      
                      return (
                        <div
                          key={pkg.id}
                          className={`
                            border rounded-lg p-4 cursor-pointer transition-all
                            ${isSelected ? 'border-orange-600 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}
                            ${!isEligible && guests > 0 ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                          onClick={() => isEligible && updateFormData('packageType', pkg.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{pkg.name}</h3>
                              <p className="text-gray-600 text-sm">{pkg.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {pkg.minGuests}-{pkg.maxGuests} guests
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-orange-600">S${pkg.price}</p>
                              <p className="text-xs text-gray-500">per person</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {pkg.includes.map((item, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                          {!isEligible && guests > 0 && (
                            <p className="text-red-500 text-sm mt-2">
                              Not available for {guests} guests
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Estimated Total */}
                {getEstimatedTotal() > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Estimated Total:</span>
                      <span className="text-2xl font-bold text-orange-600">
                        S${getEstimatedTotal().toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      For {formData.guestCount} guests • Final pricing may vary based on menu selections
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Venue Details */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Venue Details</CardTitle>
                <CardDescription>Where will your BBQ event take place?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Venue Type</Label>
                  <Select value={formData.venueType} onValueChange={(value) => updateFormData('venueType', value)}>
                    <SelectTrigger>
                      <MapPin className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select venue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home/Residential</SelectItem>
                      <SelectItem value="office">Office/Corporate</SelectItem>
                      <SelectItem value="park">Park/Outdoor Space</SelectItem>
                      <SelectItem value="venue">Event Venue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Full Address</Label>
                  <Textarea
                    placeholder="Please provide the complete address including postal code..."
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Venue Requirements</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Access to power supply for grilling equipment</li>
                    <li>• Adequate outdoor space for BBQ setup</li>
                    <li>• Parking available for our catering van</li>
                    <li>• Water source nearby for cleanup</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How can we reach you to confirm your booking?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="+65 9123 4567"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Special Requests or Dietary Requirements</Label>
                  <Textarea
                    placeholder="Any special requests, dietary restrictions, or additional information..."
                    value={formData.specialRequests}
                    onChange={(e) => updateFormData('specialRequests', e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Please review your booking details before confirming</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Event Summary */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Event Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span>{formData.date ? getDateDisplay(formData.date) : 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span>{formData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span>{formData.guestCount} people</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package:</span>
                        <span>{packageOptions.find(pkg => pkg.id === formData.packageType)?.name}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg pt-4">Venue</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="capitalize">{formData.venueType}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Address:</span>
                        <p className="mt-1">{formData.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact & Pricing */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Contact Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span>{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span>{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span>{formData.email}</span>
                      </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Estimated Pricing</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Package cost:</span>
                          <span>S${getEstimatedTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST (8%):</span>
                          <span>S${(getEstimatedTotal() * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold">
                          <span>Total Estimate:</span>
                          <span>S${(getEstimatedTotal() * 1.08).toFixed(2)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        *Final pricing will be confirmed after menu customization
                      </p>
                    </div>
                  </div>
                </div>

                {formData.specialRequests && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Special Requests</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{formData.specialRequests}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {step < 4 ? (
              <Button
                onClick={nextStep}
                disabled={!isStepValid(step)}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <div className="space-x-4">
                <WhatsAppButton 
                  variant="outline"
                  message={WhatsAppMessages.quote(
                    parseInt(formData.guestCount) || 0, 
                    formData.date ? format(formData.date, 'MMM dd, yyyy') : undefined,
                    packageOptions.find(pkg => pkg.id === formData.packageType)?.name
                  )}
                >
                  Chat on WhatsApp
                </WhatsAppButton>
                <Button size="lg">
                  Confirm Booking
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 