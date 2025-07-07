'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { WhatsAppMessages } from '@/components/WhatsAppButton'

export function FloatingWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Show the button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = '6588911844' // Singapore BBQ Affair number
    const message = encodeURIComponent(WhatsAppMessages.general)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  if (!isVisible) return null

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Expanded Chat Box */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 mb-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-green-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">BBQ Affair</h3>
                    <p className="text-xs text-green-100">Usually replies instantly</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white hover:text-green-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="bg-gray-100 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-800">
                    Hi there! 👋<br />
                    How can we help you with your BBQ catering needs?
                  </p>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200"
                  >
                    <span className="text-sm font-medium text-green-800">💬 Start Chat</span>
                    <p className="text-xs text-green-600 mt-1">Get instant quotes and answers</p>
                  </button>
                  
                  <button
                    onClick={() => {
                      const phoneNumber = '6588911844'
                      const message = encodeURIComponent(WhatsAppMessages.booking)
                      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
                    }}
                    className="w-full text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors border border-orange-200"
                  >
                    <span className="text-sm font-medium text-orange-800">📅 Book Event</span>
                    <p className="text-xs text-orange-600 mt-1">Quick booking assistance</p>
                  </button>
                  
                  <button
                    onClick={() => {
                      const phoneNumber = '6588911844'
                      const message = encodeURIComponent(WhatsAppMessages.menu)
                      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
                    }}
                    className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                  >
                    <span className="text-sm font-medium text-blue-800">🍖 Menu Info</span>
                    <p className="text-xs text-blue-600 mt-1">Learn about our dishes</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Floating Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          >
            {isExpanded ? (
              <X className="h-6 w-6" />
            ) : (
              <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
            )}
            
            {/* Pulse Animation */}
            {!isExpanded && (
              <div className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-75"></div>
            )}
            
            {/* Online Status Dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            </div>
          </button>

          {/* Tooltip */}
          {!isExpanded && (
            <div className="absolute bottom-16 right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Chat with us on WhatsApp
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  )
} 