/**
 * Script to mark all existing books, chapters, and topics as live
 * Run this once to fix content visibility for previously ingested books
 */

import connectDB from '@studyvault/db/connect';
import BookModel from '@studyvault/db/models/Book';
import ChapterModel from '@studyvault/db/models/Chapter';
import TopicModel from '@studyvault/db/models/Topic';

async function markAllContentAsLive() {
  try {
    await connectDB();
    console.log('Connected to database');

    // Update all books with ingestion_status 'complete' to is_live: true
    const booksResult = await BookModel.updateMany(
      { ingestion_status: 'complete', is_live: false },
      { $set: { is_live: true } }
    );
    console.log(`Updated ${booksResult.modifiedCount} books to is_live: true`);

    // Update all chapters to is_live: true
    const chaptersResult = await ChapterModel.updateMany(
      { is_live: false },
      { $set: { is_live: true } }
    );
    console.log(`Updated ${chaptersResult.modifiedCount} chapters to is_live: true`);

    // Update all topics to is_live: true and workflow_status: 'live'
    const topicsResult = await TopicModel.updateMany(
      { 
        $or: [
          { is_live: false },
          { workflow_status: { $ne: 'live' } }
        ]
      },
      { $set: { is_live: true, workflow_status: 'live' } }
    );
    console.log(`Updated ${topicsResult.modifiedCount} topics to is_live: true and workflow_status: 'live'`);

    console.log('\n✅ All content has been marked as live!');
    console.log('Books modified:', booksResult.modifiedCount);
    console.log('Chapters modified:', chaptersResult.modifiedCount);
    console.log('Topics modified:', topicsResult.modifiedCount);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating content:', error);
    process.exit(1);
  }
}

markAllContentAsLive();
