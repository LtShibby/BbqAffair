'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WhatsAppButton, WhatsAppMessages } from '@/components/WhatsAppButton'
import { Flame, Users, Calendar, Star, Phone, MessageCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Premium BBQ Catering in Singapore
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Unforgettable BBQ
              <span className="block text-orange-600">Experiences</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we bring the sizzle and flavor 
              to your special events. Professional chefs, premium ingredients, memorable moments.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/menu">
                <Flame className="mr-2 h-5 w-5" />
                Explore Menu
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/book">
                <Calendar className="mr-2 h-5 w-5" />
                Book Event
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BBQ Affair?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're not just caterers – we're experience creators who bring restaurant-quality BBQ to your doorstep.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Premium Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Fresh, locally-sourced ingredients and expert grilling techniques 
                ensure every bite is perfection.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Professional Service</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our experienced team handles everything from setup to cleanup, 
                so you can focus on your guests.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Flexible Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Easy online booking with customizable packages to fit your event size and budget.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Items Preview */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Crowd Favorites</h2>
            <p className="text-gray-600">
              Some of our most loved BBQ dishes that keep customers coming back for more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Premium Beef Ribeye', price: 'S$45', image: '🥩' },
              { name: 'BBQ Chicken Wings', price: 'S$28', image: '🍗' },
              { name: 'Grilled Prawns', price: 'S$38', image: '🦐' },
              { name: 'Pork Ribs', price: 'S$42', image: '🍖' },
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{item.image}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-orange-600 font-bold">{item.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Fire Up Your Event?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get in touch with us today and let's make your BBQ dreams come true. 
            Instant quotes, flexible scheduling, and unforgettable flavors await!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/book">
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
              </Link>
            </Button>
            <WhatsAppButton 
              variant="outline" 
              size="lg" 
              message={WhatsAppMessages.general}
              className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
            >
              WhatsApp Us
            </WhatsAppButton>
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-600 ml-2">4.9/5 from 200+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Lim",
                review: "BBQ Affair made our company retreat absolutely amazing! The food was incredible and the service was top-notch.",
                rating: 5
              },
              {
                name: "David Wong",
                review: "Perfect for our wedding reception. Guests are still talking about how delicious everything was!",
                rating: 5
              },
              {
                name: "Michelle Tan",
                review: "Professional, punctual, and the BBQ was restaurant quality. Will definitely book again!",
                rating: 5
              }
            ].map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{review.review}"</p>
                  <p className="font-semibold text-gray-900">- {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/reviews">Read All Reviews</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
