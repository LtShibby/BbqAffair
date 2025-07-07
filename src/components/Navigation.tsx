'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, LogOut } from 'lucide-react'

export function Navigation() {
  const { user, signOut } = useAuth()
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

            {isAdminRoute && user && (
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
                  href="/admin/schedule"
                  className={`transition-colors ${
                    pathname === '/admin/schedule'
                      ? 'text-orange-600 font-medium'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  Schedule
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!isAdminRoute && (
              <Button asChild>
                <Link href="/book">Book Event</Link>
              </Button>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              isAdminRoute && (
                <Button asChild variant="outline">
                  <Link href="/auth/login">Login</Link>
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 