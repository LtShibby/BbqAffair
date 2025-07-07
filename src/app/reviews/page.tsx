'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { WhatsAppButton, WhatsAppMessages } from '@/components/WhatsAppButton'
import { Star, ThumbsUp, Calendar, Users, MapPin, Quote } from 'lucide-react'

// Mock reviews data
const reviewsData = [
  {
    id: '1',
    customerName: 'Sarah Lim',
    rating: 5,
    date: '2024-06-20',
    eventType: 'Corporate Event',
    guestCount: 50,
    location: 'Marina Bay Sands',
    comment: 'BBQ Affair made our company retreat absolutely amazing! The food was incredible and the service was top-notch. Our team is still talking about how delicious the beef ribeye was. Professional setup, friendly staff, and everything was cleaned up perfectly. Will definitely book again for our next corporate event!',
    verified: true,
    helpful: 12,
    images: ['🥩', '🍗']
  },
  {
    id: '2',
    customerName: 'David Wong',
    rating: 5,
    date: '2024-06-15',
    eventType: 'Wedding',
    guestCount: 80,
    location: 'Sentosa Beach',
    comment: 'Perfect for our wedding reception! The BBQ buffet was a hit with all our guests. The chefs were professional and the food quality exceeded our expectations. Many guests asked for the contact details because they want to book BBQ Affair for their own events. Highly recommended!',
    verified: true,
    helpful: 18,
    images: ['💒', '🎂']
  },
  {
    id: '3',
    customerName: 'Michelle Tan',
    rating: 5,
    date: '2024-06-10',
    eventType: 'Birthday Party',
    guestCount: 25,
    location: 'Private Residence',
    comment: 'Professional, punctual, and the BBQ was restaurant quality! The prawns were fresh and perfectly grilled. The team arrived on time, set everything up efficiently, and the cleanup was thorough. My guests loved the coleslaw and corn sides too. Worth every penny!',
    verified: true,
    helpful: 8,
    images: ['🦐', '🌽']
  },
  {
    id: '4',
    customerName: 'Ahmad Rahman',
    rating: 4,
    date: '2024-06-05',
    eventType: 'Family Gathering',
    guestCount: 35,
    location: 'East Coast Park',
    comment: 'Great experience overall! The chicken wings were amazing and the pork ribs were tender. Only minor feedback is that we wished there were more vegetarian options, but the sides were delicious. The team was friendly and accommodating. Would book again!',
    verified: true,
    helpful: 6,
    images: ['🍗', '🍖']
  },
  {
    id: '5',
    customerName: 'Jennifer Lee',
    rating: 5,
    date: '2024-05-28',
    eventType: 'Corporate Event',
    guestCount: 120,
    location: 'Gardens by the Bay',
    comment: 'Exceptional service for our annual company dinner! Managing 120 guests is no easy task, but BBQ Affair handled it flawlessly. Multiple grilling stations, consistent food quality, and the staff was incredibly organized. The dessert platter was a beautiful touch. Highly professional team!',
    verified: true,
    helpful: 15,
    images: ['🏆', '🍓']
  },
  {
    id: '6',
    customerName: 'Robert Lim',
    rating: 5,
    date: '2024-05-22',
    eventType: 'Housewarming',
    guestCount: 30,
    location: 'Private Residence',
    comment: 'Perfect for our housewarming party! The salmon was cooked to perfection and the variety of sides complemented the mains beautifully. Guests were impressed with the quality and presentation. The team was respectful of our new home and left everything spotless.',
    verified: true,
    helpful: 9,
    images: ['🐟', '🏠']
  },
  {
    id: '7',
    customerName: 'Priya Sharma',
    rating: 4,
    date: '2024-05-18',
    eventType: 'Graduation Party',
    guestCount: 40,
    location: 'Community Center',
    comment: 'Good value for money and tasty food! The BBQ chicken was the highlight. Service was prompt and the team was friendly. The only thing was that the grilled corn could have been a bit more charred for my taste, but overall a great experience for celebrating my daughter\'s graduation.',
    verified: true,
    helpful: 7,
    images: ['🎓', '🍗']
  },
  {
    id: '8',
    customerName: 'Kevin Tan',
    rating: 5,
    date: '2024-05-12',
    eventType: 'Team Building',
    guestCount: 60,
    location: 'Marina One',
    comment: 'Excellent coordination for our team building event! The variety of proteins was impressive and accommodated different dietary preferences. The setup was professional and the team worked efficiently around our activities. Food stayed warm throughout the event. Fantastic job!',
    verified: true,
    helpful: 11,
    images: ['🚀', '🥩']
  }
]

const ratingCounts = {
  5: 24,
  4: 6,
  3: 1,
  2: 0,
  1: 0
}

const totalReviews = Object.values(ratingCounts).reduce((sum, count) => sum + count, 0)
const averageRating = Object.entries(ratingCounts).reduce((sum, [rating, count]) => sum + (parseInt(rating) * count), 0) / totalReviews

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [filterEventType, setFilterEventType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'helpful'>('newest')

  const eventTypes = ['all', 'Corporate Event', 'Wedding', 'Birthday Party', 'Family Gathering', 'Team Building', 'Housewarming', 'Graduation Party']

  const filteredReviews = reviewsData
    .filter(review => filterRating ? review.rating === filterRating : true)
    .filter(review => filterEventType === 'all' ? true : review.eventType === filterEventType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'highest':
          return b.rating - a.rating
        case 'helpful':
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

  const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) => {
    const starSize = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${starSize} ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers are saying about their BBQ Affair experience. 
              Real reviews from real events.
            </p>
          </div>

          {/* Overall Rating Stats */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Average Rating */}
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                      <div className="text-5xl font-bold text-orange-600">
                        {averageRating.toFixed(1)}
                      </div>
                      <div>
                        <StarRating rating={Math.round(averageRating)} size="lg" />
                        <p className="text-sm text-gray-600 mt-1">
                          Based on {totalReviews} reviews
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge variant="secondary">96% Recommend</Badge>
                      <Badge variant="secondary">Verified Reviews</Badge>
                      <Badge variant="secondary">Recent Events</Badge>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => {
                      const count = ratingCounts[rating as keyof typeof ratingCounts]
                      const percentage = (count / totalReviews) * 100
                      return (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm w-6">{rating}</span>
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {/* Rating Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <div className="flex gap-2">
                    <Button
                      variant={filterRating === null ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilterRating(null)}
                    >
                      All
                    </Button>
                    {[5, 4, 3, 2, 1].map(rating => (
                      <Button
                        key={rating}
                        variant={filterRating === rating ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterRating(rating)}
                      >
                        {rating}★
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Event Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Type</label>
                  <div className="flex flex-wrap gap-2">
                    {eventTypes.map(type => (
                      <Button
                        key={type}
                        variant={filterEventType === type ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterEventType(type)}
                      >
                        {type === 'all' ? 'All Events' : type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'newest', label: 'Newest' },
                      { value: 'oldest', label: 'Oldest' },
                      { value: 'highest', label: 'Highest Rated' },
                      { value: 'helpful', label: 'Most Helpful' }
                    ].map(option => (
                      <Button
                        key={option.value}
                        variant={sortBy === option.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSortBy(option.value as 'newest' | 'oldest' | 'highest' | 'helpful')}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No reviews match your current filters.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterRating(null)
                    setFilterEventType('all')
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredReviews.map(review => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Customer Info */}
                    <div className="md:w-64 flex-shrink-0">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarFallback className="bg-orange-100 text-orange-600">
                            {review.customerName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{review.customerName}</h3>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <StarRating rating={review.rating} />
                            <span className="text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString('en-SG')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{review.eventType}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{review.guestCount} guests</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{review.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 h-6 w-6 text-gray-300" />
                        <p className="text-gray-700 leading-relaxed pl-4">
                          {review.comment}
                        </p>
                      </div>

                      {/* Review Images */}
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mt-4">
                          {review.images.map((image, index) => (
                            <div
                              key={index}
                              className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center text-2xl"
                            >
                              {image}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Helpful Button */}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                        <span className="text-sm text-gray-600">Was this review helpful?</span>
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Trust Our Reviews?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We believe in transparency and authentic feedback from our customers.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Badge className="h-6 w-6 text-green-600 bg-transparent" />
                  </div>
                  <h3 className="font-semibold mb-2">Verified Reviews</h3>
                  <p className="text-sm text-gray-600">
                    All reviews are from customers who have actually booked and experienced our services.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Recent Events</h3>
                  <p className="text-sm text-gray-600">
                    Reviews are collected within 7 days of each event to ensure fresh and accurate feedback.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <ThumbsUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">No Fake Reviews</h3>
                  <p className="text-sm text-gray-600">
                    We never pay for reviews or manipulate ratings. Every review represents genuine customer experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience BBQ Affair?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who have made their events memorable with our premium BBQ catering.
          </p>
          <Button size="lg" className="mr-4">
            Book Your Event
          </Button>
          <WhatsAppButton 
            variant="outline" 
            size="lg"
            message={WhatsAppMessages.general}
          >
            Chat with Us
          </WhatsAppButton>
        </div>
      </div>
    </div>
  )
} 