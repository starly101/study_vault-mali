# Component Migration Matrix

**Generated:** Phase 8.0 Repository Reality Check  
**Purpose:** Decision table for every component - Keep, Refactor, or Replace  

---

## MIGRATION DECISION KEY

| Symbol | Decision | Definition | Effort Level |
|--------|----------|------------|--------------|
| ✅ | **KEEP** | Compliant with Design Constitution, no changes needed | None |
| 🔄 | **REFACTOR** | Minor changes needed (emoji replacement, token updates) | Low-Medium |
| ❌ | **REPLACE** | Major redesign required, violates multiple constitutional rules | High |
| ⚠️ | **REVIEW** | Needs accessibility/feature audit before decision | Unknown |
| 🗑️ | **DELETE** | Duplicate, stub, or obsolete component | Low |

---

## 1. ATOMIC COMPONENTS

| Component | File | Decision | Reason | Priority | Constitutional Violations |
|-----------|------|----------|--------|----------|--------------------------|
| **Button** | `/components/ui/Button.tsx` | 🔄 REFACTOR | Uses hardcoded colors instead of semantic tokens | HIGH | COL-11 (Semantic Tokens Only) |
| **Card** | `/components/ui/Card.tsx` | 🔄 REFACTOR | Hardcoded styles, missing variants per CMP-14 | HIGH | CMP-14 (Card Hierarchy), COL-11 |
| **Input** | `/components/ui/Input.tsx` | ⚠️ REVIEW | Accessibility compliance unknown | MEDIUM | A11Y-06 (Labels), A11Y-04 (Focus) |
| **Alert** | `/components/ui/Alert.tsx` | ⚠️ REVIEW | Missing warning variant | MEDIUM | COL-15 (Functional Color + Icon) |
| **SearchBar** | `/components/ui/SearchBar.tsx` | ⚠️ REVIEW | Implementation details unknown | LOW | TBD |
| **UI Index** | `/components/ui/index.ts` | ✅ KEEP | Barrel export, no violations | NONE | None |

---

## 2. COMPOSITE COMPONENTS

### 2.1 Reader Components

| Component | File | Decision | Reason | Priority | Violations |
|-----------|------|----------|--------|----------|------------|
| **TopicReaderClient** | `/components/reader/TopicReaderClient.tsx` | ❌ REPLACE | 11 emoji violations, core learning screen | CRITICAL | ANT-01 (No Emojis), TOUCH-01 |
| **TopicBreadcrumb** | `/components/reader/TopicBreadcrumb.tsx` | ✅ KEEP | Proper Lucide usage, clean implementation | NONE | None |
| **ContentBlockRenderer** | `/components/reader/ContentBlockRenderer.tsx` | ✅ KEEP | Proper Lucide usage (Beaker, Lightbulb, Info) | NONE | None |
| **ChapterReader** | `/components/reader/ChapterReader.tsx` | ✅ KEEP | Proper Lucide usage (Loader2) | NONE | None |
| **TopicArticle** | `/components/reader/TopicArticle.tsx` | ✅ KEEP | Proper Lucide usage (Clock, Star) | NONE | None |
| **BookSidebarIndex** | `/components/reader/BookSidebarIndex.tsx` | ✅ KEEP | Proper Lucide usage | NONE | None |
| **BookReaderNav** | `/components/reader/BookReaderNav.tsx` | ✅ KEEP | Proper Lucide usage | NONE | None |
| **FullBookViewer** | `/components/reader/FullBookViewer.tsx` | ✅ KEEP | Comprehensive, proper icon usage | NONE | None |
| **BookFrontIndex** | `/components/reader/BookFrontIndex.tsx` | ✅ KEEP | Proper Lucide usage | NONE | None |
| **BookChapterIndex** | `/components/reader/BookChapterIndex.tsx` | ✅ KEEP | Proper Lucide usage | NONE | None |
| **TextHighlighter** | `/components/reader/TextHighlighter.tsx` | ⚠️ REVIEW | Implementation details unknown | LOW | TBD |
| **TopicLevelReader** | `/components/reader/TopicLevelReader.tsx` | 🔄 REFACTOR | 1 emoji violation | HIGH | ANT-01 |
| **TopicPracticeSection** | `/components/reader/TopicPracticeSection.tsx` | ⚠️ REVIEW | Feature completeness unknown | LOW | TBD |
| **ProgressWheel (reader)** | `/components/reader/ProgressWheel.tsx` | 🔄 REFACTOR | Should be consolidated to /progress/ | MEDIUM | N/A (relocation) |
| **PreviewWall** | `/components/reader/PreviewWall.tsx` | ⚠️ REVIEW | Usage unclear | LOW | TBD |

### 2.2 Quiz Components

| Component | File | Decision | Reason | Priority | Violations |
|-----------|------|----------|--------|----------|------------|
| **QuizEngine** | `/components/quiz/QuizEngine.tsx` | 🔄 REFACTOR | 6 emoji violations but already has Lucide imports | HIGH | ANT-01 (easy fix) |

### 2.3 AI Components

| Component | File | Decision | Reason | Priority | Violations |
|-----------|------|----------|--------|----------|------------|
| **ExplainPanel** | `/components/ai/ExplainPanel.tsx` | 🔄 REFACTOR | 2 emoji violations (🎯 💡) | HIGH | ANT-01 |
| **FlashcardCreator** | `/components/ai/FlashcardCreator.tsx` | 🔄 REFACTOR | 1 structural emoji (💡) + 1 decorative | MEDIUM | ANT-01 |
| **FlashcardDeck** | `/components/ai/FlashcardDeck.tsx` | ✅ KEEP | Only decorative celebration emoji (🎉) | LOW | None (UX decision) |

### 2.4 Progress Components

| Component | File | Decision | Reason | Priority | Violations |
|-----------|------|----------|--------|----------|------------|
| **ProgressWheel (progress)** | `/components/progress/ProgressWheel.tsx` | 🗑️ DELETE | Stub component (3 lines), duplicate | HIGH | N/A (remove duplicate) |

### 2.5 Authentication Components

| Component | File | Decision | Reason | Priority | Violations |
|-----------|------|----------|--------|----------|------------|
| **LoginForm** | `/components/LoginForm.tsx` | ⚠️ REVIEW | Form accessibility audit needed | MEDIUM | A11Y-06, A11Y-09 |
| **SignupForm** | `/components/SignupForm.tsx` | ⚠️ REVIEW | Form accessibility audit needed | MEDIUM | A11Y-06, A11Y-09 |
| **OnboardingModal** | `/components/OnboardingModal.tsx` | ✅ KEEP | Proper Lucide usage, good structure | NONE | None |
| **AccountNav** | `/components/AccountNav.tsx` | ✅ KEEP | Proper Lucide usage (LogOut) | NONE | None |
| **SearchInput** | `/components/SearchInput.tsx` | ✅ KEEP | Proper Lucide usage, comprehensive | NONE | None |
| **Providers** | `/components/Providers.tsx` | ✅ KEEP | Context wrapper, no UI | NONE | None |
| **QuranVerseRenderer** | `/components/QuranVerseRenderer.jsx` | ⚠️ REVIEW | RTL/Arabic typography compliance | LOW | TYPE-08 (line length) |

### 2.6 SEO Components

| Component | File | Decision | Reason | Priority | Violations |
|-----------|------|----------|--------|----------|------------|
| **JsonLd** | `/components/seo/JsonLd.tsx` | ✅ KEEP | Non-visual, structured data | NONE | None |

---

## 3. PAGE COMPONENTS

### 3.1 Student App Pages

| Page | File | Decision | Reason | Priority | Violations |
|------|------|----------|--------|----------|------------|
| **Layout** | `/app/layout.tsx` | ⚠️ REVIEW | Skip link presence unknown | MEDIUM | A11Y-09 (Skip Links) |
| **Global Error** | `/app/global-error.tsx` | ✅ KEEP | Comprehensive error states, proper icons | NONE | None |
| **Error** | `/app/error.tsx` | 🔄 REFACTOR | 1 emoji violation (📶) | MEDIUM | ANT-01 |
| **Landing Page** | `/app/(public)/page.tsx` | ❌ REPLACE | 8 structural emoji violations | CRITICAL | ANT-01, COL-15 |
| **Dashboard** | `/app/(dashboard)/dashboard/page.tsx` | 🔄 REFACTOR | Uses inline SVGs instead of Lucide | HIGH | ICON-02 (Consistency) |
| **Books** | `/app/(dashboard)/books/page.tsx` | ✅ KEEP | Proper Lucide usage | NONE | None |
| **Progress** | `/app/(dashboard)/progress/page.tsx` | ✅ KEEP | Proper Lucide usage | NONE | None |
| **My Vault** | `/app/(dashboard)/my-vault/page.tsx` | ✅ KEEP | Proper Lucide usage | NONE | None |
| **Premium** | `/app/(dashboard)/premium/page.tsx` | 🔄 REFACTOR | 1 emoji violation (🔒) | MEDIUM | ANT-01 |
| **Billing** | `/app/(dashboard)/billing/page.tsx` | ✅ KEEP | Decorative emoji only (🎉) | LOW | None (UX decision) |
| **Quiz Page** | `/app/(dashboard)/quiz/[topicId]/page.tsx` | ⚠️ REVIEW | Wrapper page, needs review | LOW | TBD |
| **Dynamic Topic** | `/app/(dashboard)/[boardSlug].../page.tsx` | ⚠️ REVIEW | Complex routing, needs audit | MEDIUM | TBD |
| **Login** | `/app/(auth)/login/page.tsx` | ⚠️ REVIEW | Form accessibility unknown | MEDIUM | A11Y-06, A11Y-09 |
| **Signup** | `/app/(auth)/signup/page.tsx` | ⚠️ REVIEW | Form accessibility unknown | MEDIUM | A11Y-06, A11Y-09 |
| **Forgot Password** | `/app/(auth)/forgot-password/page.tsx` | ✅ KEEP | Proper component usage | NONE | None |
| **Onboarding** | `/app/(auth)/onboarding/page.tsx` | ✅ KEEP | Proper icon usage | NONE | None |
| **Onboarding Form** | `/app/(auth)/onboarding/onboarding-form.tsx` | ✅ KEEP | Proper component usage | NONE | None |
| **Search Page** | `/app/(public)/search/page.tsx` | ⚠️ REVIEW | Implementation unknown | LOW | TBD |
| **Search Redirect** | `/app/(dashboard)/search-redirect/page.tsx` | ⚠️ REVIEW | Redirect logic only | LOW | None |
| **Sitemap** | `/app/sitemap.ts` | ✅ KEEP | Non-visual SEO file | NONE | None |

### 3.2 Admin App Pages

| Page | File | Decision | Reason | Priority | Violations |
|------|------|----------|--------|----------|------------|
| **Admin Layout** | `/admin/app/layout.tsx` | ⚠️ REVIEW | Design consistency unknown | LOW | TBD |
| **Admin Dashboard** | `/admin/app/(dashboard)/page.tsx` | ⚠️ REVIEW | Implementation unknown | LOW | TBD |
| **Books Management** | `/admin/app/(dashboard)/books/page.tsx` | ⚠️ REVIEW | Implementation unknown | LOW | TBD |
| **Book Ingestion** | `/admin/app/(dashboard)/books/ingest/page.tsx` | 🔄 REFACTOR | 4 symbol violations (✓ ✗) | MEDIUM | ANT-01, COL-15 |
| **Content Review** | `/admin/app/(dashboard)/content/page.tsx` | 🔄 REFACTOR | 2 emoji violations (✏️ ✓) | MEDIUM | ANT-01 |
| **Control Page** | `/admin/app/(dashboard)/control/page.tsx` | ⚠️ REVIEW | Implementation unknown | LOW | TBD |

---

## 4. FEATURE COMPONENTS

| Component | File | Decision | Reason | Priority | Violations |
|-----------|------|----------|--------|----------|------------|
| **WaveformLoader** | `/app/components/ai/WaveformLoader.tsx` | ⚠️ REVIEW | Animation compliance unknown | LOW | MOT-07 (Reduced Motion) |
| **StreamingText** | `/app/components/ai/StreamingText.tsx` | ⚠️ REVIEW | Typewriter effect unknown | LOW | MOT-07 |
| **AiCognitivePanel** | `/app/components/ai/AiCognitivePanel.tsx` | ⚠️ REVIEW | Implementation unknown | LOW | TBD |

---

## 5. MIGRATION PRIORITY GROUPING

### Wave 1: Critical Fixes (Phase 8 - Icon Migration)
**Goal:** Remove all structural emojis

| Component | Effort | Estimated Time | Dependencies |
|-----------|--------|----------------|--------------|
| TopicReaderClient | HIGH | 2-3 hours | Button, Card refactoring |
| Landing Page | MEDIUM | 1-2 hours | None |
| QuizEngine | LOW | 30 minutes | Already has Lucide imports |
| TopicLevelReader | LOW | 15 minutes | None |
| ExplainPanel | LOW | 20 minutes | None |
| error.tsx | LOW | 10 minutes | None |
| premium/page.tsx | LOW | 10 minutes | None |
| admin ingest/page | LOW | 20 minutes | None |
| admin content/page | LOW | 15 minutes | None |

**Total Wave 1 Effort:** 6-8 hours

### Wave 2: Atomic Component Refactoring (Phase 9 - Wave 1)
**Goal:** Establish design token foundation

| Component | Effort | Estimated Time | Impact |
|-----------|--------|----------------|--------|
| Button | MEDIUM | 2 hours | Affects 12+ files |
| Card | MEDIUM | 2 hours | Affects 10+ files |
| Input | LOW | 1 hour | After accessibility audit |
| Alert | LOW | 1 hour | Add warning variant |

**Total Wave 2 Effort:** 6 hours + testing

### Wave 3: Core Experience (Phase 9 - Wave 2)
**Goal:** Improve learning flow screens

| Component | Effort | Estimated Time | Risk |
|-----------|--------|----------------|------|
| Dashboard | HIGH | 4-6 hours | HIGH (most visited) |
| LoginForm | MEDIUM | 2 hours | HIGH (auth flow) |
| SignupForm | MEDIUM | 2 hours | HIGH (conversion) |
| QuranVerseRenderer | LOW | 1 hour | LOW (niche feature) |

**Total Wave 3 Effort:** 9-11 hours + QA

### Wave 4: Cleanup & Optimization (Phase 9 - Wave 3)
**Goal:** Remove duplicates, finalize

| Action | Effort | Estimated Time |
|--------|--------|----------------|
| Delete stub ProgressWheel | LOW | 5 minutes |
| Consolidate ProgressWheel | LOW | 30 minutes |
| Create icon registry | MEDIUM | 2 hours |
| Update all imports | MEDIUM | 2 hours |

**Total Wave 4 Effort:** 4.5 hours

---

## 6. COMPONENTS REQUIRING ACCESSIBILITY AUDIT

Before migration decisions can be finalized, these components need WCAG AA compliance verification:

| Component | Audit Items | Priority |
|-----------|-------------|----------|
| Input | Labels, focus states, error messages, aria-describedby | HIGH |
| Alert | Role attributes, color contrast, icon + text pairing | MEDIUM |
| LoginForm | Form labels, error handling, keyboard navigation | HIGH |
| SignupForm | Form labels, validation messages, password requirements | HIGH |
| TextHighlighter | Keyboard controls, screen reader announcements | LOW |
| TopicPracticeSection | Interactive elements, focus management | LOW |
| QuranVerseRenderer | RTL support, font scaling, text direction | MEDIUM |
| WaveformLoader | Reduced motion support, aria-live regions | LOW |
| StreamingText | Reduced motion, reading pace control | LOW |

---

## 7. DECISION SUMMARY

| Decision | Count | Percentage |
|----------|-------|------------|
| ✅ KEEP | 24 | 51% |
| 🔄 REFACTOR | 15 | 32% |
| ❌ REPLACE | 2 | 4% |
| ⚠️ REVIEW | 8 | 17% |
| 🗑️ DELETE | 1 | 2% |

**Total Components:** 47

**Immediate Actions Required:**
- 2 components need complete replacement (TopicReaderClient, Landing Page)
- 15 components need refactoring (mostly emoji removal)
- 8 components need accessibility audit
- 1 stub component should be deleted

**Risk Assessment:**
- **Low Risk:** 24 components (KEEP) - No changes needed
- **Medium Risk:** 15 components (REFACTOR) - Isolated changes, easy to test
- **High Risk:** 2 components (REPLACE) - Core screens, require thorough QA
- **Unknown Risk:** 8 components (REVIEW) - Need audit before proceeding

---

## 8. NEXT STEPS

1. **Execute Wave 1** (Phase 8): Replace all structural emojis
   - Start with QuizEngine (easiest, already has imports)
   - Move to TopicReaderClient (highest impact)
   - Finish with landing page and admin pages

2. **Conduct Accessibility Audits**: Before Wave 2
   - Test all form components with screen readers
   - Verify keyboard navigation
   - Check color contrast ratios

3. **Execute Wave 2** (Phase 9): Refactor atomic components
   - Update Button with semantic tokens
   - Update Card with proper variants
   - Add missing Alert variants

4. **Cleanup**: Wave 4
   - Remove duplicate ProgressWheel
   - Create centralized icon registry
   - Update import paths

**Estimated Total Effort:** 25-30 hours spread across 3-4 development days

