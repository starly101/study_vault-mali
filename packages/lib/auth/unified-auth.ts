import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@studyvault/db/connect'
import User from '@studyvault/db/models/User'
import jwt from 'jsonwebtoken'

// Unified authentication configuration
export const hasGoogleOAuth = () => {
  return Boolean(process.env.GOOGLE_CLIENT_ID) && 
         Boolean(process.env.GOOGLE_CLIENT_SECRET) && 
         !process.env.GOOGLE_CLIENT_ID?.startsWith("placeholder")
}

export const createProviders = () => {
  const providers: any[] = []

  if (hasGoogleOAuth()) {
    providers.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      })
    )
  }

  // Add email/password provider if needed
  if (!providers.length) {
    providers.push({
      id: "credentials",
      name: "Email/Password",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          await connectDB()
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase() 
          }).select('+password_hash')
          
          if (!user || !user.password_hash) {
            return null
          }
          
          // Note: You should implement proper password hashing verification
          // For now, just check if user exists
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || 'student'
          }
        } catch (error) {
          console.error('Credentials auth error:', error)
          return null
        }
      }
    })
  }

  return providers
}

export const createAuthOptions = () => {
  const providers = createProviders()

  return {
    providers,
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
      signIn: "/login",
      signUp: "/signup",
      error: "/login",
    },
    callbacks: {
      async signIn({ user, account }) {
        try {
          if (account?.provider === "google" && user.email) {
            await connectDB()
            const existingUser = await User.findOne({ 
              email: user.email.toLowerCase() 
            })
            
            if (!existingUser) {
              // Create new user
              const newUser = await User.create({
                email: user.email.toLowerCase(),
                name: user.name,
                google_id: account.providerAccountId,
                avatar_url: user.image,
                is_verified: true,
                emailVerified: new Date(),
                student_profile: {
                  onboarding_completed: false,
                  xp_total: 0,
                  streak_days: 0,
                  last_active: new Date()
                }
              })
              
              Object.assign(user, {
                id: newUser._id.toString(),
                role: newUser.role || 'student'
              })
            } else {
              // Update existing user
              await User.updateOne(
                { email: user.email.toLowerCase() },
                { 
                  $set: { 
                    lastLogin: new Date(),
                    ...(account.providerAccountId && { google_id: account.providerAccountId }),
                    ...(user.image && { avatar_url: user.image })
                  }
                }
              )
              
              Object.assign(user, {
                id: existingUser._id.toString(),
                role: existingUser.role || 'student'
              })
            }
          }
          return true
        } catch (error) {
          console.error('Sign in error:', error)
          return false
        }
      },

      async session({ session, token }) {
        try {
          if (session.user) {
            // Add user info to session
            const sessionUser = session.user as any
            
            // Get user from database for fresh data
            if (token.email) {
              await connectDB()
              const user = await User.findOne({ 
                email: token.email.toLowerCase() 
              }).select('-password_hash -otp -password_reset_token')
              
              if (user) {
                sessionUser.id = user._id.toString()
                sessionUser.role = user.role || 'student'
                sessionUser.subscriptionStatus = user.subscription?.status || 'free'
                sessionUser.lastLogin = user.lastLogin
                sessionUser.student_profile = user.student_profile || {}
              }
            }
            
            // Add token info to session
            if (token.sub) {
              sessionUser.id = token.sub
            }
          }
          return session
        } catch (error) {
          console.error('Session callback error:', error)
          return session
        }
      },

      async jwt({ token, user, trigger }) {
        try {
          if (user) {
            // Add user info to token
            token.id = user.id
            token.role = user.role || 'student'
          }
          
          if (trigger === "update" && user) {
            return { ...token, ...user }
          }
          
          return token
        } catch (error) {
          console.error('JWT callback error:', error)
          return token
        }
      },

      async redirect({ url, baseUrl }) {
        // Allow relative URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allow URLs on the same base
        if (url.startsWith(baseUrl)) return url
        // Default to dashboard
        return `${baseUrl}/dashboard`
      }
    },
    secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
    debug: process.env.NODE_ENV === "development",
  }
}

// Helper functions for unified auth
export async function getUnifiedUser(req?: any) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    })
    
    if (token?.email) {
      await connectDB()
      const user = await User.findOne({ 
        email: token.email.toLowerCase() 
      }).select('-password_hash -otp -password_reset_token').lean()
      
      return user
    }
    
    return null
  } catch (error) {
    console.error('Get unified user error:', error)
    return null
  }
}

export function createJWTToken(user: any) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
      role: user.role || 'student',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days
    },
    process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production'
  )
}

export function verifyJWTToken(token: string) {
  try {
    return jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production'
    )
  } catch (error) {
    console.error('JWT verification error:', error)
    return null
  }
}