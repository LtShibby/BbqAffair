'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const pathname = usePathname()

  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-orange-600">
              BBQ Affair
            </Link>
            
            {!isAdminRoute && (
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/menu"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Menu
                </Link>
                <Link
                  href="/gallery"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Gallery
                </Link>
                <Link
                  href="/reviews"
                  className="text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Reviews
                </Link>
              </div>
            )}

            {isAdminRoute && (
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/admin"
                  className={`transition-colors ${
                    pathname === '/admin'
                      ? 'text-orange-600 font-medium'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/orders"
                  className={`transition-colors ${
                    pathname === '/admin/orders'
                      ? 'text-orange-600 font-medium'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  Orders
                </Link>
                <Link
                  href="/admin/menu"
                  className={`transition-colors ${
                    pathname === '/admin/menu'
                      ? 'text-orange-600 font-medium'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  Menu Manager
                </Link>
                <Link
                  href="/admin/analytics"
                  className={`transition-colors ${
                    pathname === '/admin/analytics'
                      ? 'text-orange-600 font-medium'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  Analytics
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link href="/book">Book Event</Link>
            </Button>
            
            {!isAdminRoute && (
              <Button asChild variant="outline">
                <Link href="/admin">Demo Admin</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 