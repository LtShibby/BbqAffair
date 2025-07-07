'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { WhatsAppButton, WhatsAppMessages } from '@/components/WhatsAppButton'
import { ChevronLeft, ChevronRight, Calendar, Users, MapPin } from 'lucide-react'

// Mock gallery data
const galleryImages = [
  {
    id: '1',
    title: 'Corporate Team Building BBQ',
    description: 'Amazing team building event for 50 employees at Marina Bay',
    imageUrl: '🏢',
    category: 'Corporate Events',
    guestCount: 50,
    location: 'Marina Bay Sands',
    date: '2024-06-15',
    tags: ['Corporate', 'Team Building', 'Outdoor']
  },
  {
    id: '2',
    title: 'Wedding Reception BBQ',
    description: 'Beautiful wedding celebration with premium BBQ selection',
    imageUrl: '💒',
    category: 'Weddings',
    guestCount: 80,
    location: 'Sentosa Beach',
    date: '2024-06-01',
    tags: ['Wedding', 'Beach', 'Premium']
  },
  {
    id: '3',
    title: 'Birthday Party Celebration',
    description: 'Fun birthday bash with delicious BBQ and great atmosphere',
    imageUrl: '🎂',
    category: 'Private Parties',
    guestCount: 25,
    location: 'Private Residence',
    date: '2024-05-20',
    tags: ['Birthday', 'Family', 'Garden']
  },
  {
    id: '4',
    title: 'Graduation BBQ Party',
    description: 'Celebrating academic achievements with friends and family',
    imageUrl: '🎓',
    category: 'Private Parties',
    guestCount: 35,
    location: 'East Coast Park',
    date: '2024-05-10',
    tags: ['Graduation', 'Friends', 'Park']
  },
  {
    id: '5',
    title: 'Company Annual Dinner',
    description: 'Exclusive annual dinner with premium BBQ buffet setup',
    imageUrl: '🏆',
    category: 'Corporate Events',
    guestCount: 120,
    location: 'Gardens by the Bay',
    date: '2024-04-25',
    tags: ['Corporate', 'Annual', 'Premium', 'Large Scale']
  },
  {
    id: '6',
    title: 'Family Reunion BBQ',
    description: 'Multi-generational family gathering with traditional BBQ',
    imageUrl: '👨‍👩‍👧‍👦',
    category: 'Family Events',
    guestCount: 45,
    location: 'Pasir Ris Park',
    date: '2024-04-15',
    tags: ['Family', 'Reunion', 'Traditional']
  },
  {
    id: '7',
    title: 'Product Launch Event',
    description: 'Tech startup product launch with modern BBQ presentation',
    imageUrl: '🚀',
    category: 'Corporate Events',
    guestCount: 60,
    location: 'Marina One',
    date: '2024-03-30',
    tags: ['Launch', 'Tech', 'Modern']
  },
  {
    id: '8',
    title: 'School Fundraising BBQ',
    description: 'Community fundraising event with affordable BBQ packages',
    imageUrl: '🏫',
    category: 'Community Events',
    guestCount: 200,
    location: 'School Courtyard',
    date: '2024-03-15',
    tags: ['School', 'Fundraising', 'Community']
  },
  {
    id: '9',
    title: 'Housewarming BBQ',
    description: 'Welcoming friends to a new home with backyard BBQ',
    imageUrl: '🏠',
    category: 'Private Parties',
    guestCount: 30,
    location: 'Private Residence',
    date: '2024-03-01',
    tags: ['Housewarming', 'Backyard', 'Intimate']
  }
]

const categories = ['All Events', 'Corporate Events', 'Weddings', 'Private Parties', 'Family Events', 'Community Events']

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Events')
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredImages = selectedCategory === 'All Events' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openLightbox = (image: typeof galleryImages[0], index: number) => {
    setSelectedImage(image)
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    const prevIndex = lightboxIndex > 0 ? lightboxIndex - 1 : filteredImages.length - 1
    setLightboxIndex(prevIndex)
    setSelectedImage(filteredImages[prevIndex])
  }

  const goToNext = () => {
    const nextIndex = lightboxIndex < filteredImages.length - 1 ? lightboxIndex + 1 : 0
    setLightboxIndex(nextIndex)
    setSelectedImage(filteredImages[nextIndex])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a look at some of our recent BBQ events and celebrations. 
              Every event is unique, and we&apos;re proud to be part of your special moments.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No events found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
                onClick={() => openLightbox(image, index)}
              >
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative h-64 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center overflow-hidden">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {image.imageUrl}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to view details
                      </span>
                    </div>
                    
                    {/* Category Badge */}
                    <Badge className="absolute top-3 left-3 bg-orange-600">
                      {image.category}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {image.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{image.guestCount} guests</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{image.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(image.date).toLocaleDateString('en-SG')}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-4">
                      {image.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Track Record</h2>
            <p className="text-gray-600">Numbers that speak for our experience and quality</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">200+</div>
              <div className="text-gray-600">Events Catered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">15,000+</div>
              <div className="text-gray-600">Guests Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Repeat Customers</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create Your Own BBQ Story?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Every event tells a unique story. Let us help you create unforgettable memories 
            with our premium BBQ catering services.
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

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedImage && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-xl">{selectedImage.title}</DialogTitle>
                    <DialogDescription className="mt-1">
                      {selectedImage.description}
                    </DialogDescription>
                  </div>
                  <Badge>{selectedImage.category}</Badge>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Large Image Display */}
                <div className="relative h-96 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                  <div className="text-8xl">{selectedImage.imageUrl}</div>
                  
                  {/* Navigation Arrows */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {lightboxIndex + 1} of {filteredImages.length}
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Event Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <span><strong>Guests:</strong> {selectedImage.guestCount} people</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span><strong>Location:</strong> {selectedImage.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span><strong>Date:</strong> {new Date(selectedImage.date).toLocaleDateString('en-SG')}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Event Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    Love what you see? Let's plan your perfect BBQ event!
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button>
                      Book Similar Event
                    </Button>
                    <WhatsAppButton 
                      variant="outline"
                      message={`Hi BBQ Affair! I saw your ${selectedImage.title} in the gallery and I'm interested in booking a similar ${selectedImage.category} for ${selectedImage.guestCount} guests. Could you help me with the details?`}
                    >
                      WhatsApp Us
                    </WhatsAppButton>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 