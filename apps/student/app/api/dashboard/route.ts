import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@studyvault/lib/auth/getAuthUser';
import connectDB from '@studyvault/db/connect';
import Book from '@studyvault/db/models/Book';
import UserProgress from '@studyvault/db/models/UserProgress';

/**
 * GET /api/dashboard
 * Returns dashboard data for authenticated users
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Fetch live books for the dashboard
    const books = await Book.find({ is_live: true })
      .select('title subject subject_slug program_name board edition_year metadata')
      .lean();

    // Fetch user progress
    const progress = await UserProgress.find({ 
      user_id: user.id 
    })
      .sort({ updated_at: -1 })
      .limit(5)
      .lean();
    
    const recentProgress = progress.map((p: any) => ({
      chapterId: p.chapter_id,
      topicId: p.topic_id,
      xpEarned: p.xp_earned || 0,
      completed: p.mastered || p.completed || false,
      updatedAt: p.updated_at,
    }));

    const totalXP = progress.reduce((sum: number, p: any) => sum + (p.xp_earned || 0), 0);
    const masteredCount = progress.filter((p: any) => p.mastered || p.completed).length;

    return NextResponse.json({
      success: true,
      data: {
        books,
        recentProgress,
        totalXP,
        masteredCount,
      },
    });
  } catch (error) {
    console.error('[Dashboard API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
