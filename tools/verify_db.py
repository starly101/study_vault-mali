#!/usr/bin/env python3
"""
Lightweight MongoDB data integrity verification script.
Checks the relationship between books, chapters, and topics collections.
"""

import os
import sys
from urllib.parse import quote_plus

# Check if pymongo is available
try:
    from pymongo import MongoClient
    from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
    HAS_PYMONGO = True
except ImportError:
    HAS_PYMONGO = False

def verify_db_structure(mongo_uri: str):
    """Verify the database structure and relationships."""
    
    print("=" * 70)
    print("MONGODB DATA INTEGRITY VERIFICATION")
    print("=" * 70)
    
    if not HAS_PYMONGO:
        print("\n[ERROR] pymongo library not installed.")
        print("This script requires pymongo to connect to MongoDB.")
        print("However, we can still analyze the Mongoose models statically.")
        return analyze_models_statically()
    
    try:
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        # Test connection
        client.admin.command('ping')
        print(f"\n[OK] Connected to MongoDB successfully")
        
        db = client.get_default_database()
        print(f"[OK] Using database: {db.name}")
        
        # List all collections
        collections = db.list_collection_names()
        print(f"\n[Collections found]: {collections}")
        
        # Check for expected collections
        expected_collections = ['books', 'chapters', 'topics', 'programs', 'boards']
        missing = [c for c in expected_collections if c not in collections]
        if missing:
            print(f"[WARNING] Missing expected collections: {missing}")
        
        # Analyze books collection
        print("\n" + "-" * 70)
        print("BOOKS COLLECTION ANALYSIS")
        print("-" * 70)
        
        books = db.books
        book_count = books.count_documents({})
        print(f"Total books: {book_count}")
        
        if book_count > 0:
            # Get a sample book
            sample_book = books.find_one({}, {'title': 1, 'slug': 1, 'subject_slug': 1, 
                                               'program_id': 1, 'board_id': 1, 
                                               'is_live': 1, 'total_chapters': 1})
            print(f"\nSample book:")
            print(f"  _id: {sample_book.get('_id')}")
            print(f"  title: {sample_book.get('title')}")
            print(f"  slug: {sample_book.get('slug')}")
            print(f"  subject_slug: {sample_book.get('subject_slug')}")
            print(f"  program_id: {sample_book.get('program_id')} (type: {type(sample_book.get('program_id')).__name__})")
            print(f"  board_id: {sample_book.get('board_id')} (type: {type(sample_book.get('board_id')).__name__})")
            print(f"  is_live: {sample_book.get('is_live')}")
            print(f"  total_chapters: {sample_book.get('total_chapters')}")
            
            book_id = sample_book['_id']
            
            # Analyze chapters collection
            print("\n" + "-" * 70)
            print("CHAPTERS COLLECTION ANALYSIS")
            print("-" * 70)
            
            chapters = db.chapters
            chapter_count = chapters.count_documents({})
            print(f"Total chapters: {chapter_count}")
            
            # Check chapters linked to this book
            chapters_for_book = list(chapters.find({'book_id': book_id}))
            print(f"Chapters linked to sample book (book_id={book_id}): {len(chapters_for_book)}")
            
            if chapters_for_book:
                print("\nSample chapters for this book:")
                for ch in chapters_for_book[:5]:
                    print(f"  - _id: {ch.get('_id')}")
                    print(f"    title: {ch.get('title')}")
                    print(f"    slug: {ch.get('slug')}")
                    print(f"    chapter_number: {ch.get('chapter_number')}")
                    print(f"    book_id: {ch.get('book_id')} (type: {type(ch.get('book_id')).__name__})")
                    print(f"    is_live: {ch.get('is_live')}")
                    print(f"    display_order: {ch.get('display_order')}")
                    print()
                
                # Check field names in first chapter
                first_chapter = chapters_for_book[0]
                print(f"Field names in chapter document: {list(first_chapter.keys())}")
                
                # Analyze topics collection
                print("\n" + "-" * 70)
                print("TOPICS COLLECTION ANALYSIS")
                print("-" * 70)
                
                topics = db.topics
                topic_count = topics.count_documents({})
                print(f"Total topics: {topic_count}")
                
                # Check topics linked to first chapter
                if chapters_for_book:
                    first_chapter_id = chapters_for_book[0]['_id']
                    topics_for_chapter = list(topics.find({'chapter_id': first_chapter_id}))
                    print(f"Topics linked to first chapter (chapter_id={first_chapter_id}): {len(topics_for_chapter)}")
                    
                    if topics_for_chapter:
                        print("\nSample topics for this chapter:")
                        for topic in topics_for_chapter[:5]:
                            print(f"  - _id: {topic.get('_id')}")
                            print(f"    title: {topic.get('title')}")
                            print(f"    slug: {topic.get('slug')}")
                            print(f"    chapter_id: {topic.get('chapter_id')} (type: {type(topic.get('chapter_id')).__name__})")
                            print(f"    book_id: {topic.get('book_id')} (type: {type(topic.get('book_id')).__name__})")
                            print(f"    display_order: {topic.get('display_order')}")
                            print(f"    is_live: {topic.get('is_live')}")
                            print()
                        
                        # Check field names in first topic
                        first_topic = topics_for_chapter[0]
                        print(f"Field names in topic document: {list(first_topic.keys())}")
            
            # Check for casing mismatches
            print("\n" + "-" * 70)
            print("FIELD CASING ANALYSIS")
            print("-" * 70)
            
            # Check if any documents use snake_case vs camelCase
            if chapters_for_book:
                chapter_fields = set()
                for ch in chapters_for_book:
                    chapter_fields.update(ch.keys())
                print(f"Chapter fields found: {sorted(chapter_fields)}")
                
                # Check for common mismatches
                potential_mismatches = {
                    'book_id': ['bookId', 'bookID'],
                    'chapter_id': ['chapterId', 'chapterID'],
                    'program_id': ['programId', 'programID'],
                    'board_id': ['boardId', 'boardID'],
                    'display_order': ['displayOrder'],
                    'chapter_number': ['chapterNumber'],
                    'is_live': ['isLive'],
                }
                
                for expected, alternatives in potential_mismatches.items():
                    if expected not in chapter_fields:
                        for alt in alternatives:
                            if alt in chapter_fields:
                                print(f"[WARNING] Found '{alt}' instead of expected '{expected}'")
            
            if topics_for_chapter:
                topic_fields = set()
                for topic in topics_for_chapter:
                    topic_fields.update(topic.keys())
                print(f"\nTopic fields found: {sorted(topic_fields)}")
                
                # Check for common mismatches
                for expected, alternatives in potential_mismatches.items():
                    if expected not in topic_fields:
                        for alt in alternatives:
                            if alt in topic_fields:
                                print(f"[WARNING] Found '{alt}' instead of expected '{expected}'")
        
        print("\n" + "=" * 70)
        print("VERIFICATION COMPLETE")
        print("=" * 70)
        
    except ConnectionFailure as e:
        print(f"\n[ERROR] Failed to connect to MongoDB: {e}")
        print("Please check your MongoDB connection string.")
    except ServerSelectionTimeoutError as e:
        print(f"\n[ERROR] MongoDB server selection timeout: {e}")
        print("The MongoDB server may not be running or accessible.")
    except Exception as e:
        print(f"\n[ERROR] Unexpected error: {e}")
    finally:
        if HAS_PYMONGO:
            try:
                client.close()
            except:
                pass


def analyze_models_statically():
    """Analyze Mongoose model files statically when pymongo is not available."""
    
    print("\n" + "=" * 70)
    print("STATIC MODEL ANALYSIS (pymongo not available)")
    print("=" * 70)
    
    models_dir = "/workspace/packages/db/models"
    
    if not os.path.exists(models_dir):
        print(f"\n[ERROR] Models directory not found: {models_dir}")
        return
    
    model_files = ['Book.js', 'Chapter.js', 'Topic.js']
    
    for model_file in model_files:
        model_path = os.path.join(models_dir, model_file)
        if os.path.exists(model_path):
            print(f"\n{'-' * 70}")
            print(f"Analyzing: {model_file}")
            print("-" * 70)
            
            with open(model_path, 'r') as f:
                content = f.read()
            
            # Extract field definitions
            import re
            
            # Find schema definition
            schema_match = re.search(r'new mongoose\.Schema\(\{([^}]+)\}', content, re.DOTALL)
            if schema_match:
                schema_content = schema_match.group(1)
                
                # Extract field names
                field_pattern = r'^\s*(\w+):\s*\{'
                fields = re.findall(field_pattern, schema_content, re.MULTILINE)
                
                # Also find reference fields
                ref_pattern = r"ref:\s*'(\w+)'"
                refs = re.findall(ref_pattern, schema_content)
                
                print(f"Fields defined: {fields}")
                print(f"References to other models: {refs}")
                
                # Check for specific important fields
                important_fields = ['book_id', 'chapter_id', 'program_id', 'board_id', 
                                   'display_order', 'is_live', 'slug']
                
                print("\nImportant field presence:")
                for field in important_fields:
                    present = field in fields
                    print(f"  {field}: {'✓' if present else '✗'}")
    
    print("\n" + "=" * 70)
    print("STATIC ANALYSIS COMPLETE")
    print("=" * 70)


if __name__ == "__main__":
    # Get MongoDB URI from environment or use default
    mongo_uri = os.environ.get('MONGODB_URI', '')
    
    if not mongo_uri:
        print("[INFO] No MONGODB_URI environment variable set.")
        print("Attempting static analysis of model files...")
        print()
        analyze_models_statically()
    else:
        verify_db_structure(mongo_uri)
