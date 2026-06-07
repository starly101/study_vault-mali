import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from './options';
import { verifyToken } from './jwt';
import connectDB from '@studyvault/db/connect';
import User from '@studyvault/db/models/User';

/**
 * Unified authentication utility for StudyVault Onyx
 * Returns consistent user object or null if not authenticated
 * Works in both API routes and server components
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  board?: string;
  grade?: string;
  class?: string;
  onboardingComplete?: boolean;
}

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    // Primary: Try NextAuth session first
    const session = await getServerSession(authOptions);
    if (session?.user?.id) {
      return {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.name || '',
        role: session.user.role || 'student',
        board: session.user.board,
        grade: session.user.grade,
        class: session.user.class,
        onboardingComplete: session.user.onboardingComplete,
      };
    }

    // Fallback: Try sv_token cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('sv_token')?.value;
    
    if (token) {
      const decoded = verifyToken(token);
      await connectDB();
      const user = await User.findById(decoded.userId)
        .select('-password_hash -otp -password_reset_token')
        .lean();
      
      if (user) {
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          board: user.board || user.student_profile?.board,
          grade: user.grade || user.student_profile?.grade,
          class: user.class || user.student_profile?.class,
          onboardingComplete: Boolean(user.onboardingComplete || user.student_profile?.onboarding_completed),
        };
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Require authentication - throws 401 response if not authenticated
 * Use in API route handlers
 */
export async function requireAuthUser(): Promise<AuthUser> {
  const user = await getAuthUser();
  if (!user) {
    throw Response.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  return user;
}
