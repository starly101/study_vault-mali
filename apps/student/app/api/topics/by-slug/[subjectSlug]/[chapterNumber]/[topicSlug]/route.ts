import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@studyvault/db/connect';
import TopicModel from '@studyvault/db/models/Topic';
import ChapterModel from '@studyvault/db/models/Chapter';
import BookModel from '@studyvault/db/models/Book';
import BoardModel from '@studyvault/db/models/Board';
import ProgramModel from '@studyvault/db/models/Program';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subjectSlug: string; chapterNumber: string; topicSlug: string }> }
) {
  try {
    await connectDB();

    const { subjectSlug, chapterNumber, topicSlug } = await params;

    // Find book by subject slug
    const book = await BookModel.findOne({ 
      $or: [
        { subject_slug: subjectSlug },
        { slug: new RegExp(`^${subjectSlug}(?:-|$)`, 'i') },
        { subject: new RegExp(`^${subjectSlug.replace(/-/g, ' ')}$`, 'i') },
      ]
    })
      .populate('program_id', 'name slug')
      .populate('board_id', 'name short_code slug')
      .lean();

    if (!book) {
      return NextResponse.json({ success: false, error: 'Book not found' }, { status: 404 });
    }

    // Parse chapter number from the URL segment
    const chapterNum = parseInt(String(chapterNumber).replace(/^chapter-/i, ''), 10);
    
    // Find chapter by book_id and chapter number or slug
    const chapter = await ChapterModel.findOne({
      book_id: book._id,
      $or: [
        { slug: chapterNumber },
        { chapter_number: isNaN(chapterNum) ? undefined : chapterNum },
      ],
    }).lean();

    if (!chapter) {
      return NextResponse.json({ success: false, error: 'Chapter not found' }, { status: 404 });
    }

    // Find topic by slug, chapter_id, and book_id
    const topic = await TopicModel.findOne({
      slug: topicSlug,
      chapter_id: chapter._id,
      book_id: book._id,
    })
      .populate('chapter_id', 'title chapter_number slug')
      .populate('book_id', 'title subject subject_slug slug edition_year seo')
      .populate('program_id', 'name slug')
      .populate('board_id', 'name short_code slug')
      .lean();

    if (!topic) {
      return NextResponse.json({ success: false, error: 'Topic not found' }, { status: 404 });
    }

    const isPreview = request.nextUrl.searchParams.get('preview') === 'true';
    if (!topic.is_live && !isPreview) {
      return NextResponse.json({ success: false, error: 'Topic not published yet' }, { status: 403 });
    }

    // Fetch all chapters for navigation
    const chapters = await ChapterModel.find({ book_id: book._id })
      .sort({ display_order: 1, chapter_number: 1 })
      .select('_id title chapter_number chapter_number_display slug display_order')
      .lean();

    // Find previous topic
    let previousTopic = await TopicModel.findOne({
      chapter_id: chapter._id,
      display_order: { $lt: topic.display_order },
      is_live: true,
    })
      .sort({ display_order: -1 })
      .select('_id title slug display_order chapter_id')
      .lean();

    let prevTopicChapterSlug = chapter.slug;

    if (!previousTopic) {
      const prevChapter = [...chapters]
        .sort((a, b) => (b.display_order ?? b.chapter_number) - (a.display_order ?? a.chapter_number))
        .find((c) => (c.display_order ?? c.chapter_number) < (chapter.display_order ?? chapter.chapter_number));

      if (prevChapter) {
        previousTopic = await TopicModel.findOne({
          chapter_id: prevChapter._id,
          is_live: true,
        })
          .sort({ display_order: -1 })
          .select('_id title slug display_order chapter_id')
          .lean();
        if (previousTopic) {
          prevTopicChapterSlug = prevChapter.slug;
        }
      }
    }

    // Find next topic
    let nextTopic = await TopicModel.findOne({
      chapter_id: chapter._id,
      display_order: { $gt: topic.display_order },
      is_live: true,
    })
      .sort({ display_order: 1 })
      .select('_id title slug display_order chapter_id')
      .lean();

    let nextTopicChapterSlug = chapter.slug;

    if (!nextTopic) {
      const nextChapter = [...chapters]
        .sort((a, b) => (a.display_order ?? a.chapter_number) - (b.display_order ?? b.chapter_number))
        .find((c) => (c.display_order ?? c.chapter_number) > (chapter.display_order ?? chapter.chapter_number));

      if (nextChapter) {
        nextTopic = await TopicModel.findOne({
          chapter_id: nextChapter._id,
          is_live: true,
        })
          .sort({ display_order: 1 })
          .select('_id title slug display_order chapter_id')
          .lean();
        if (nextTopic) {
          nextTopicChapterSlug = nextChapter.slug;
        }
      }
    }

    // Helper to convert ObjectId to string safely
    const idString = (value: unknown): string => {
      if (!value) return '';
      if (typeof value === 'string') return value;
      if (typeof value === 'object' && value !== null && '_id' in value) {
        return String((value as { _id: unknown })._id);
      }
      return String(value);
    };

    return NextResponse.json({
      success: true,
      data: {
        topic: {
          ...topic,
          _id: idString(topic._id),
          chapter_id: topic.chapter_id ? {
            ...topic.chapter_id,
            _id: idString(topic.chapter_id._id),
          } : null,
          book_id: topic.book_id ? {
            ...topic.book_id,
            _id: idString(topic.book_id._id),
          } : null,
          program_id: topic.program_id ? {
            ...topic.program_id,
            _id: idString(topic.program_id._id),
          } : null,
        },
        previousTopic: previousTopic
          ? { 
              _id: idString(previousTopic._id), 
              title: previousTopic.title, 
              slug: previousTopic.slug,
              chapterSlug: prevTopicChapterSlug
            }
          : null,
        nextTopic: nextTopic
          ? { 
              _id: idString(nextTopic._id), 
              title: nextTopic.title, 
              slug: nextTopic.slug,
              chapterSlug: nextTopicChapterSlug
            }
          : null,
        book: {
          ...book,
          _id: idString(book._id),
          program_id: book.program_id ? {
            ...book.program_id,
            _id: idString(book.program_id._id),
          } : null,
          board_id: book.board_id ? {
            ...book.board_id,
            _id: idString(book.board_id._id),
          } : null,
        },
        program: book.program_id ? {
          ...book.program_id,
          _id: idString(book.program_id._id),
        } : null,
        chapter: {
          ...chapter,
          _id: idString(chapter._id),
          book_id: idString(chapter.book_id),
        },
        chapters: chapters.map((c: any) => ({
          ...c,
          _id: idString(c._id),
          book_id: idString(c.book_id),
        })),
      },
    });
  } catch (error) {
    console.error('Get topic by slug error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch topic',
      },
      { status: 500 }
    );
  }
}
