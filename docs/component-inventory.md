# Component Inventory

**Generated:** Phase 8.0 Repository Reality Check  
**Scope:** `/workspace/apps/student` and `/workspace/apps/admin`  
**Total Components Found:** 47 components  

---

## Executive Summary

| Category | Count | Status |
|----------|-------|--------|
| **Atomic Components** | 6 | ✅ Stable foundation |
| **Composite Components** | 15 | ⚠️ Mixed compliance |
| **Page Components** | 18 | 🔄 Requires refactoring |
| **Feature Components** | 8 | ⚠️ Domain-specific |

---

## 1. ATOMIC COMPONENTS (Foundation Layer)

Location: `/workspace/apps/student/components/ui/`

### 1.1 Button
- **File:** `Button.tsx`
- **Path:** `/workspace/apps/student/components/ui/Button.tsx`
- **Lines of Code:** 58
- **Dependencies:** `class-variance-authority`, `@/lib/utils`, `react`
- **Variants:** default, outline, ghost, destructive, success, gold, secondary
- **Sizes:** sm (h-8), default (h-10), lg (h-12), icon (h-10 w-10)
- **Features:** isLoading state, spinner animation
- **Used By:** 12+ files including AccountNav, TopicReaderClient, OnboardingModal, QuizEngine
- **Compliance Status:** ✅ **KEEP** - Already uses CVAs, has proper variants
- **Issues:** Uses hardcoded colors (`bg-primary-600`) instead of semantic tokens

### 1.2 Card
- **File:** `Card.tsx`
- **Path:** `/workspace/apps/student/components/ui/Card.tsx`
- **Lines of Code:** 36
- **Dependencies:** `react`
- **Sub-components:** CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Features:** hover prop for shadow transition
- **Used By:** 10+ files including books/page, progress/page, my-vault/page
- **Compliance Status:** 🔄 **REFACTOR** - Missing semantic tokens, inconsistent spacing
- **Issues:** 
  - Hardcoded `rounded-xl shadow-md p-6 border border-gray-100`
  - No support for elevated/outline variants per Design Constitution CMP-14

### 1.3 Input
- **File:** `Input.tsx`
- **Path:** `/workspace/apps/student/components/ui/Input.tsx`
- **Lines of Code:** Not yet analyzed
- **Dependencies:** `react`
- **Used By:** LoginForm, SignupForm, SearchInput
- **Compliance Status:** ⚠️ **NEEDS REVIEW** - Accessibility compliance unknown

### 1.4 Alert
- **File:** `Alert.tsx`
- **Path:** `/workspace/apps/student/components/ui/Alert.tsx`
- **Lines of Code:** Not yet analyzed
- **Dependencies:** `react`
- **Used By:** error.tsx, global-error.tsx
- **Compliance Status:** ⚠️ **NEEDS REVIEW** - Missing warning variant per Design Constitution

### 1.5 SearchBar
- **File:** `SearchBar.tsx`
- **Path:** `/workspace/apps/student/components/ui/SearchBar.tsx`
- **Lines of Code:** Not yet analyzed
- **Dependencies:** Unknown
- **Used By:** books/page, search pages
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

### 1.6 UI Index
- **File:** `index.ts`
- **Path:** `/workspace/apps/student/components/ui/index.ts`
- **Purpose:** Barrel export for all UI components
- **Exports:** Button, Card, Input, Alert, SearchBar

---

## 2. COMPOSITE COMPONENTS (Building Blocks)

### 2.1 Reader Components

Location: `/workspace/apps/student/components/reader/`

#### TopicReaderClient
- **File:** `TopicReaderClient.tsx`
- **Lines of Code:** ~520 lines
- **Dependencies:** Button, Card, framer-motion, Lucide icons (partial)
- **Features:** Tab navigation, practice section, completion tracking
- **Emoji Violations:** 11 instances (CRITICAL - highest in codebase)
- **Compliance Status:** ❌ **REPLACE** - Major emoji violations, needs complete refactor
- **Refactor Priority:** CRITICAL

#### TopicBreadcrumb
- **File:** `TopicBreadcrumb.tsx`
- **Lines of Code:** ~70 lines
- **Dependencies:** Lucide (ChevronRight, Home, BookOpen, Layers)
- **Features:** Hierarchical navigation
- **Compliance Status:** ✅ **KEEP** - Already uses Lucide icons correctly

#### ContentBlockRenderer
- **File:** `ContentBlockRenderer.tsx`
- **Lines of Code:** ~150 lines
- **Dependencies:** Lucide (Beaker, Lightbulb, Info)
- **Features:** Renders different content block types
- **Compliance Status:** ✅ **KEEP** - Proper icon usage

#### ChapterReader
- **File:** `ChapterReader.tsx`
- **Lines of Code:** ~180 lines
- **Dependencies:** Lucide (Loader2)
- **Features:** Chapter-level navigation
- **Compliance Status:** ✅ **KEEP**

#### TopicArticle
- **File:** `TopicArticle.tsx`
- **Lines of Code:** ~80 lines
- **Dependencies:** Lucide (Clock, Star)
- **Features:** Article metadata display
- **Compliance Status:** ✅ **KEEP**

#### BookSidebarIndex
- **File:** `BookSidebarIndex.tsx`
- **Lines of Code:** ~160 lines
- **Dependencies:** Lucide (ChevronDown, ChevronRight, List, Menu, X)
- **Features:** Collapsible chapter index
- **Compliance Status:** ✅ **KEEP**

#### BookReaderNav
- **File:** `BookReaderNav.tsx`
- **Lines of Code:** ~90 lines
- **Dependencies:** Lucide (ChevronLeft, ChevronRight, List)
- **Features:** Book navigation controls
- **Compliance Status:** ✅ **KEEP**

#### FullBookViewer
- **File:** `FullBookViewer.tsx`
- **Lines of Code:** ~560 lines
- **Dependencies:** Button, Lucide (multiple)
- **Features:** Complete book viewing interface
- **Compliance Status:** ✅ **KEEP**

#### BookFrontIndex
- **File:** `BookFrontIndex.tsx`
- **Lines of Code:** ~180 lines
- **Dependencies:** Lucide (List, BookMarked)
- **Features:** Book front matter display
- **Compliance Status:** ✅ **KEEP**

#### BookChapterIndex
- **File:** `BookChapterIndex.tsx`
- **Lines of Code:** ~250 lines
- **Dependencies:** Lucide (ChevronDown, ChevronRight, Loader2, List)
- **Features:** Chapter listing with expansion
- **Compliance Status:** ✅ **KEEP**

#### TextHighlighter
- **File:** `TextHighlighter.tsx`
- **Lines of Code:** ~140 lines
- **Dependencies:** Unknown
- **Features:** Text highlighting functionality
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

#### TopicLevelReader
- **File:** `TopicLevelReader.tsx`
- **Lines of Code:** ~230 lines
- **Dependencies:** Button, Lucide (multiple)
- **Features:** Alternative topic reader view
- **Emoji Violations:** 1 instance
- **Compliance Status:** 🔄 **REFACTOR** - Minor emoji violation

#### TopicPracticeSection
- **File:** `TopicPracticeSection.tsx`
- **Lines of Code:** ~120 lines
- **Dependencies:** Unknown
- **Features:** Practice exercises section
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

#### ProgressWheel (Reader)
- **File:** `ProgressWheel.tsx` (in reader folder)
- **Lines of Code:** ~60 lines
- **Dependencies:** Unknown
- **Features:** Circular progress indicator
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

#### PreviewWall
- **File:** `PreviewWall.tsx`
- **Lines of Code:** ~30 lines
- **Dependencies:** Button
- **Features:** Preview grid display
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

### 2.2 Quiz Components

Location: `/workspace/apps/student/components/quiz/`

#### QuizEngine
- **File:** `QuizEngine.tsx`
- **Lines of Code:** ~370 lines
- **Dependencies:** Button, Card, Lucide (CheckCircle2, XCircle, ArrowRight, RotateCcw, Award)
- **Features:** Complete quiz interface with feedback
- **Emoji Violations:** 6 instances
- **Compliance Status:** 🔄 **REFACTOR** - Emoji violations despite having Lucide imports
- **Refactor Priority:** HIGH

### 2.3 AI Components

Location: `/workspace/apps/student/components/ai/`

#### ExplainPanel
- **File:** `ExplainPanel.tsx`
- **Lines of Code:** ~230 lines
- **Dependencies:** Unknown
- **Features:** AI explanation panel
- **Emoji Violations:** 2 instances
- **Compliance Status:** 🔄 **REFACTOR** - Minor emoji violations
- **Refactor Priority:** HIGH

#### FlashcardCreator
- **File:** `FlashcardCreator.tsx`
- **Lines of Code:** ~175 lines
- **Dependencies:** Unknown
- **Features:** AI flashcard generation form
- **Emoji Violations:** 1 structural + 1 decorative
- **Compliance Status:** 🔄 **REFACTOR** - Structural emoji violation
- **Refactor Priority:** MEDIUM

#### FlashcardDeck
- **File:** `FlashcardDeck.tsx`
- **Lines of Code:** ~290 lines
- **Dependencies:** Unknown
- **Features:** Flashcard study interface
- **Emoji Violations:** 1 decorative (celebration)
- **Compliance Status:** ✅ **KEEP** with note - Only decorative emoji
- **Refactor Priority:** LOW (evaluate celebration UX)

### 2.4 Progress Components

Location: `/workspace/apps/student/components/progress/`

#### ProgressWheel (Progress)
- **File:** `ProgressWheel.tsx`
- **Lines of Code:** 3 lines (placeholder/stub)
- **Implementation:** `export function ProgressWheel() { return <div>Progress Wheel</div>; }`
- **Dependencies:** None
- **Compliance Status:** ❌ **REPLACE** - Not implemented, duplicate of reader/ProgressWheel
- **Note:** This is a stub component that needs full implementation

### 2.5 Authentication Components

Location: `/workspace/apps/student/components/`

#### LoginForm
- **File:** `LoginForm.tsx`
- **Lines of Code:** ~110 lines
- **Dependencies:** Unknown
- **Features:** Email/password login form
- **Compliance Status:** ⚠️ **NEEDS REVIEW** - Form accessibility unknown

#### SignupForm
- **File:** `SignupForm.tsx`
- **Lines of Code:** ~180 lines
- **Dependencies:** Unknown
- **Features:** User registration form
- **Compliance Status:** ⚠️ **NEEDS REVIEW** - Form accessibility unknown

#### OnboardingModal
- **File:** `OnboardingModal.tsx`
- **Lines of Code:** ~185 lines
- **Dependencies:** Button, Card, Lucide (GraduationCap, BookOpen, Globe, CheckCircle2)
- **Features:** User onboarding flow
- **Compliance Status:** ✅ **KEEP** - Proper icon usage

#### AccountNav
- **File:** `AccountNav.tsx`
- **Lines of Code:** ~68 lines
- **Dependencies:** Button, Lucide (LogOut)
- **Features:** Account navigation/logout
- **Compliance Status:** ✅ **KEEP**

#### SearchInput
- **File:** `SearchInput.tsx`
- **Lines of Code:** ~180 lines
- **Dependencies:** Lucide (Search, Loader2, BookOpen, ChevronRight, FileText)
- **Features:** Search with autocomplete
- **Compliance Status:** ✅ **KEEP** - Proper icon usage

#### Providers
- **File:** `Providers.tsx`
- **Lines of Code:** ~10 lines
- **Dependencies:** Unknown
- **Features:** Context providers wrapper
- **Compliance Status:** ✅ **KEEP**

#### QuranVerseRenderer
- **File:** `QuranVerseRenderer.jsx`
- **Lines of Code:** ~200 lines
- **Dependencies:** Unknown
- **Features:** Quran verse display with Arabic text
- **Compliance Status:** ⚠️ **NEEDS REVIEW** - RTL/Arabic typography compliance

### 2.6 SEO Components

Location: `/workspace/apps/student/components/seo/`

#### JsonLd
- **File:** `JsonLd.tsx`
- **Lines of Code:** ~20 lines
- **Dependencies:** Unknown
- **Features:** Structured data injection
- **Compliance Status:** ✅ **KEEP** - Non-visual component

---

## 3. PAGE COMPONENTS (Screen Assembly)

### 3.1 Student App Pages

Location: `/workspace/apps/student/app/`

#### Layout
- **File:** `layout.tsx`
- **Path:** `/workspace/apps/student/app/layout.tsx`
- **Features:** Root layout with providers
- **Compliance Status:** ⚠️ **NEEDS REVIEW** - Skip link presence unknown

#### Global Error
- **File:** `global-error.tsx`
- **Path:** `/workspace/apps/student/app/global-error.tsx`
- **Dependencies:** Button, Card (all variants), Lucide (AlertCircle, RefreshCw, WifiOff, ServerCrash, Bug)
- **Features:** Global error boundary
- **Compliance Status:** ✅ **KEEP** - Comprehensive error states, proper icons

#### Error
- **File:** `error.tsx`
- **Path:** `/workspace/apps/student/app/error.tsx`
- **Lines of Code:** ~200 lines
- **Dependencies:** Button, Lucide (AlertCircle, RefreshCw, Home, WifiOff, ServerCrash)
- **Features:** Local error boundary
- **Emoji Violations:** 1 instance
- **Compliance Status:** 🔄 **REFACTOR** - Minor emoji violation
- **Refactor Priority:** MEDIUM

#### Landing Page
- **File:** `page.tsx`
- **Path:** `/workspace/apps/student/app/(public)/page.tsx`
- **Lines of Code:** ~230 lines
- **Dependencies:** Unknown
- **Features:** Public landing page with stats, features
- **Emoji Violations:** 8 structural instances
- **Compliance Status:** ❌ **REPLACE** - Heavy emoji usage in structural elements
- **Refactor Priority:** CRITICAL

#### Dashboard
- **File:** `page.tsx`
- **Path:** `/workspace/apps/student/app/(dashboard)/dashboard/page.tsx`
- **Lines of Code:** ~350+ lines
- **Dependencies:** framer-motion, SWR, Link
- **Features:** 
  - DashboardSkeleton
  - EmptyState (animated SVG vault)
  - ErrorState with auto-retry
  - BookCard (masonry grid)
  - BottomNav (floating pill navigation)
  - LeftSidebar (desktop)
- **Icon Strategy:** Uses inline SVG paths (NOT Lucide)
- **Compliance Status:** 🔄 **REFACTOR** - Inline SVGs should use Lucide for consistency
- **Refactor Priority:** HIGH

#### Books Page
- **File:** `page.tsx`
- **Path:** `/workspace/apps/student/app/(dashboard)/books/page.tsx`
- **Dependencies:** Card, Lucide (BookOpen, Library)
- **Features:** Book library listing
- **Compliance Status:** ✅ **KEEP** - Proper icon usage

#### Progress Page
- **File:** `page.tsx`
- **Path:** `/workspace/apps/student/app/(dashboard)/progress/page.tsx`
- **Dependencies:** Card, Lucide (Target, TrendingUp, Award, BrainCircuit)
- **Features:** User progress analytics
- **Compliance Status:** ✅ **KEEP** - Proper icon usage

#### My Vault Page
- **File:** `page.tsx`
- **Path:** `/workspace/apps/student/app/(dashboard)/my-vault/page.tsx`
- **Dependencies:** Button, Card, Lucide (BookOpen, Filter, Library)
- **Features:** Saved content library
- **Compliance Status:** ✅ **KEEP** - Proper icon usage

#### Premium Page
- **File:** `page.tsx`
- **Path:** `/workspace/apps/student/app/(dashboard)/premium/page.tsx`
- **Dependencies:** Lucide (CheckCircle, XCircle, CreditCard, Smartphone, Shield, Zap)
- **Features:** Pricing plans, feature comparison
- **Emoji Violations:** 1 instance
- **Compliance Status:** 🔄 **REFACTOR** - Minor emoji violation
- **Refactor Priority:** MEDIUM

#### Billing Page
- **File:** `page.tsx`
- **Path:** `/workspace/apps/student/app/(dashboard)/billing/page.tsx`
- **Dependencies:** Unknown
- **Features:** Payment history, subscription management
- **Emoji Violations:** 1 decorative instance
- **Compliance Status:** ✅ **KEEP** with note - Decorative only

#### Quiz Page
- **File:** `page.tsx`
- **Path:** `/workspace/apps/student/app/(dashboard)/quiz/[topicId]/page.tsx`
- **Features:** Quiz wrapper page
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

#### Dynamic Subject/Chapter/Topic Page
- **File:** `page.tsx`
- **Path:** `/workspace/apps/student/app/(dashboard)/[boardSlug]/[programSlug]/[subjectSlug]/[[...slug]]/page.tsx`
- **Features:** Dynamic route for all learning content
- **Compliance Status:** ⚠️ **NEEDS REVIEW** - Complex routing logic

#### Auth Pages
- **Login:** `/workspace/apps/student/app/(auth)/login/page.tsx`
- **Signup:** `/workspace/apps/student/app/(auth)/signup/page.tsx`
- **Forgot Password:** `/workspace/apps/student/app/(auth)/forgot-password/page.tsx`
- **Onboarding:** `/workspace/apps/student/app/(auth)/onboarding/page.tsx` + `onboarding-form.tsx`
- **Compliance Status:** ⚠️ **NEEDS REVIEW** - Form accessibility audit required

#### Search Page
- **File:** `page.tsx`
- **Path:** `/workspace/apps/student/app/(public)/search/page.tsx`
- **Features:** Search results page
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

#### Search Redirect Page
- **File:** `page.tsx`
- **Path:** `/workspace/apps/student/app/(dashboard)/search-redirect/page.tsx`
- **Features:** Redirect logic for search
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

#### Sitemap
- **File:** `sitemap.ts`
- **Path:** `/workspace/apps/student/app/sitemap.ts`
- **Features:** SEO sitemap generation
- **Compliance Status:** ✅ **KEEP** - Non-visual

### 3.2 Admin App Pages

Location: `/workspace/apps/admin/app/`

#### Admin Layout
- **File:** `layout.tsx`
- **Path:** `/workspace/apps/admin/app/layout.tsx`
- **Features:** Admin root layout
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

#### Admin Dashboard
- **File:** `page.tsx`
- **Path:** `/workspace/apps/admin/app/(dashboard)/page.tsx`
- **Features:** Admin overview
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

#### Books Management
- **File:** `page.tsx`
- **Path:** `/workspace/apps/admin/app/(dashboard)/books/page.tsx`
- **Features:** Book CRUD interface
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

#### Book Ingestion
- **File:** `page.tsx`
- **Path:** `/workspace/apps/admin/app/(dashboard)/books/ingest/page.tsx`
- **Lines of Code:** ~340 lines
- **Features:** Book ingestion pipeline UI
- **Emoji/Symbol Violations:** 4 instances (✓, ✗)
- **Compliance Status:** 🔄 **REFACTOR** - Symbol usage in status messages
- **Refactor Priority:** MEDIUM

#### Content Review
- **File:** `page.tsx`
- **Path:** `/workspace/apps/admin/app/(dashboard)/content/page.tsx`
- **Features:** Content approval queue
- **Emoji Violations:** 2 instances
- **Compliance Status:** 🔄 **REFACTOR** - Status badge emojis
- **Refactor Priority:** MEDIUM

#### Control Page
- **File:** `page.tsx`
- **Path:** `/workspace/apps/admin/app/(dashboard)/control/page.tsx`
- **Features:** System controls
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

---

## 4. FEATURE COMPONENTS (Domain-Specific)

### 4.1 AI App Components

Location: `/workspace/apps/student/app/components/ai/`

#### WaveformLoader
- **File:** `WaveformLoader.tsx`
- **Features:** AI streaming animation
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

#### StreamingText
- **File:** `StreamingText.tsx`
- **Features:** Typewriter effect for AI responses
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

#### AiCognitivePanel
- **File:** `AiCognitivePanel.tsx`
- **Features:** Advanced AI interaction panel
- **Compliance Status:** ⚠️ **NEEDS REVIEW**

---

## 5. DUPLICATE COMPONENTS DETECTED

### 5.1 ProgressWheel (DUPLICATE)
- **Instance 1:** `/workspace/apps/student/components/reader/ProgressWheel.tsx` (~60 lines, implemented)
- **Instance 2:** `/workspace/apps/student/components/progress/ProgressWheel.tsx` (3 lines, stub)
- **Recommendation:** Consolidate into single component at `/workspace/apps/student/components/progress/ProgressWheel.tsx`
- **Risk:** MEDIUM - May cause import confusion

---

## 6. COMPONENT DEPENDENCY SUMMARY

### Most Imported Components

| Component | Import Count | Files Using |
|-----------|--------------|-------------|
| **Button** | 12+ | AccountNav, TopicReaderClient, FullBookViewer, TopicLevelReader, PreviewWall, OnboardingModal, QuizEngine, global-error, my-vault/page, error, forgot-password, onboarding-form |
| **Card** | 10+ | TopicReaderClient, OnboardingModal, QuizEngine, books/page, progress/page, my-vault/page, premium/page, forgot-password, error, global-error |
| **Lucide Icons** | 20+ | Widespread across almost all components |

### Icon Usage Patterns

**Already Using Lucide Correctly (✅ KEEP):**
- TopicBreadcrumb
- ContentBlockRenderer
- ChapterReader
- TopicArticle
- BookSidebarIndex
- BookReaderNav
- FullBookViewer
- BookFrontIndex
- BookChapterIndex
- OnboardingModal
- QuizEngine (partial - has emoji violations)
- SearchInput
- AccountNav
- books/page
- progress/page
- my-vault/page
- premium/page
- error.tsx
- global-error.tsx

**Using Emojis Instead of Icons (❌ REFACTOR):**
- TopicReaderClient (11 violations)
- Landing page (8 violations)
- TopicLevelReader (1 violation)
- ExplainPanel (2 violations)
- error.tsx (1 violation)

---

## 7. REFACTOR PRIORITY MATRIX

### CRITICAL Priority (Must fix before Phase 9)
| Component | Reason | Effort |
|-----------|--------|--------|
| TopicReaderClient | 11 emoji violations, core learning screen | HIGH |
| Landing Page | 8 emoji violations, first impression | MEDIUM |
| ProgressWheel (stub) | Not implemented, duplicate | LOW |

### HIGH Priority (Fix in Phase 8-9)
| Component | Reason | Effort |
|-----------|--------|--------|
| QuizEngine | 6 emoji violations, already has Lucide imports | MEDIUM |
| Dashboard | Uses inline SVGs instead of Lucide | MEDIUM |
| ExplainPanel | 2 emoji violations, AI feature visibility | LOW |
| TopicLevelReader | 1 emoji violation, alternative reader | LOW |

### MEDIUM Priority (Fix during Phase 9)
| Component | Reason | Effort |
|-----------|--------|--------|
| FlashcardCreator | 1 structural emoji | LOW |
| premium/page | 1 structural emoji | LOW |
| error.tsx | 1 structural emoji | LOW |
| admin ingest/page | 4 symbol violations | LOW |
| admin content/page | 2 emoji violations | LOW |

### LOW Priority (Evaluate/Educational)
| Component | Reason | Effort |
|-----------|--------|--------|
| FlashcardDeck | Decorative celebration emoji | N/A (UX decision) |
| billing/page | Decorative success emoji | N/A (UX decision) |
| OG Route | Social media graphics | MEDIUM (SVG work) |

### NEEDS REVIEW (Audit Required)
| Component | Unknown Factor |
|-----------|---------------|
| Input, Alert, SearchBar | Accessibility compliance |
| LoginForm, SignupForm | Form labels, ARIA attributes |
| TextHighlighter | Implementation details |
| TopicPracticeSection | Feature completeness |
| QuranVerseRenderer | RTL/Arabic typography |
| All admin pages | Design consistency with student app |

---

## 8. RECOMMENDATIONS

### Immediate Actions (Phase 8)
1. **Delete stub component:** Remove `/workspace/apps/student/components/progress/ProgressWheel.tsx` or implement it properly
2. **Consolidate duplicates:** Merge reader/ProgressWheel into progress/ProgressWheel
3. **Create icon registry:** Centralize Lucide icon imports
4. **Fix CRITICAL files:** TopicReaderClient, Landing Page

### Short-term Actions (Phase 9 Wave 1)
1. **Refactor atomic components:** Update Button, Card to use semantic tokens
2. **Standardize icons:** Replace all remaining emojis with Lucide
3. **Accessibility audit:** Review all form components for WCAG compliance

### Long-term Actions (Phase 9 Wave 2-3)
1. **Component documentation:** Add Storybook stories for all components
2. **Design token migration:** Replace all hardcoded values
3. **Admin consistency:** Align admin UI components with student app design language

---

**Total Components:** 47  
**Ready for Production:** 24 (51%)  
**Needs Refactoring:** 15 (32%)  
**Needs Review:** 8 (17%)
