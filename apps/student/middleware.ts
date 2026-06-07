import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import connectDB from '@studyvault/db/connect'
import User from '@studyvault/db/models/User'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/verify-otp',
    '/search',
    '/api/auth',
    '/api/health',
    '/api/books',
    '/api/topics/public',
    '/_next/static',
    '/_next/image',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml'
  ]

  // Routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/(dashboard)',
    '/my-vault',
    '/billing',
    '/premium',
    '/progress',
    '/quiz',
    '/books',
    '/chapters',
    '/topics'
  ]

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route + '/')
  )

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // If it's a protected route, check authentication
  if (isProtectedRoute) {
    try {
      // Try to get NextAuth token first
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      })

      // If no NextAuth token, try custom JWT token
      if (!token) {
        const cookieStore = await req.cookies
        const customToken = cookieStore.get('sv_token')?.value
        
        if (!customToken) {
          // No token found, redirect to login
          const loginUrl = new URL('/login', req.url)
          loginUrl.searchParams.set('callbackUrl', pathname)
          return NextResponse.redirect(loginUrl)
        }

        // Verify custom JWT token
        try {
          await connectDB()
          const jwt = require('jsonwebtoken')
          const decoded = jwt.verify(customToken, process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET)
          
          if (!decoded.userId && !decoded.sub && !decoded.id) {
            throw new Error('Invalid token')
          }
          
          // Get user from database
          const userId = decoded.userId || decoded.sub || decoded.id
          const user = await User.findById(userId).select('-password_hash -otp -password_reset_token').lean()
          
          if (!user) {
            throw new Error('User not found')
          }
          
          // User is authenticated, allow access
          return NextResponse.next()
        } catch (error) {
          // Token validation failed, redirect to login
          const loginUrl = new URL('/login', req.url)
          loginUrl.searchParams.set('callbackUrl', pathname)
          return NextResponse.redirect(loginUrl)
        }
      }

      // NextAuth token exists, verify user exists
      if (token.email) {
        await connectDB()
        const user = await User.findOne({ 
          email: token.email.toLowerCase() 
        }).select('-password_hash -otp -password_reset_token').lean()
        
        if (!user) {
          // User not found, redirect to login
          const loginUrl = new URL('/login', req.url)
          loginUrl.searchParams.set('callbackUrl', pathname)
          return NextResponse.redirect(loginUrl)
        }
      }

      // User is authenticated, allow access
      return NextResponse.next()
    } catch (error) {
      console.error('Middleware error:', error)
      // Redirect to login on any error
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // For all other routes, allow access
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}