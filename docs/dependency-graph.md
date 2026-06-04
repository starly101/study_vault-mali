# Dependency Graph

**Generated:** Phase 8.0 Repository Reality Check  
**Scope:** `/workspace/apps/student` primary application  

---

## 1. CORE UI COMPONENT DEPENDENCIES

### Button Component Tree
```
Button (/components/ui/Button.tsx)
├── Dependencies:
│   ├── class-variance-authority (cva)
│   ├── @/lib/utils (cn function)
│   └── react (forwardRef)
├── Used By:
│   ├── AccountNav.tsx
│   ├── TopicReaderClient.tsx
│   ├── FullBookViewer.tsx
│   ├── TopicLevelReader.tsx
│   ├── PreviewWall.tsx
│   ├── OnboardingModal.tsx
│   ├── QuizEngine.tsx
│   ├── global-error.tsx
│   ├── my-vault/page.tsx
│   ├── error.tsx
│   ├── (auth)/forgot-password/page.tsx
│   └── (auth)/onboarding/onboarding-form.tsx
└── Variants Used:
    ├── default (primary actions)
    ├── outline (secondary actions)
    ├── ghost (subtle actions)
    ├── destructive (danger actions)
    ├── success (confirmation)
    ├── gold (premium features)
    └── secondary (alternative)
```

### Card Component Tree
```
Card (/components/ui/Card.tsx)
├── Sub-components:
│   ├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   ├── CardContent
│   └── CardFooter
├── Dependencies:
│   └── react (forwardRef)
├── Used By:
│   ├── TopicReaderClient.tsx
│   ├── OnboardingModal.tsx
│   ├── QuizEngine.tsx
│   ├── (dashboard)/books/page.tsx
│   ├── (dashboard)/progress/page.tsx
│   ├── (dashboard)/my-vault/page.tsx
│   ├── (dashboard)/premium/page.tsx
│   ├── (auth)/forgot-password/page.tsx
│   ├── error.tsx
│   └── global-error.tsx
└── Issues:
    ├── Hardcoded styles (rounded-xl shadow-md p-6)
    ├── Missing semantic tokens
    └── No elevated/outline variants
```

---

## 2. PAGE DEPENDENCY CHAINS

### Dashboard Page Chain
```
/dashboard/page.tsx
├── Direct Dependencies:
│   ├── framer-motion (motion, AnimatePresence, LayoutGroup)
│   ├── swr (useSWR)
│   ├── next/link
│   ├── next/navigation (useRouter)
│   └── react (hooks)
├── Child Components:
│   ├── DashboardSkeleton (inline)
│   ├── EmptyState (inline)
│   │   └── Animated SVG Vault (inline)
│   ├── ErrorState (inline)
│   ├── BookCard (inline)
│   │   └── Uses inline SVG icons
│   ├── BottomNav (inline)
│   │   └── Uses inline SVG paths for icons
│   └── LeftSidebar (inline)
│       └── Uses inline SVG paths for icons
├── API Calls:
│   └── GET /api/dashboard
└── Refactor Needs:
    ├── Replace inline SVGs with Lucide icons
    ├── Extract child components to separate files
    └── Add semantic token support
```

### Topic Reader Chain (CRITICAL)
```
[boardSlug]/[programSlug]/[subjectSlug]/[[...slug]]/page.tsx
└── TopicReaderClient.tsx (MAIN READER)
    ├── Dependencies:
    │   ├── @/components/ui/Button ❌ (emoji violations)
    │   ├── @/components/ui/Card ❌ (emoji violations)
    │   ├── framer-motion
    │   └── Lucide (partial - should use more)
    ├── Child Components Used:
    │   ├── TopicBreadcrumb ✅ (proper Lucide usage)
    │   ├── ContentBlockRenderer ✅ (proper Lucide usage)
    │   ├── TopicPracticeSection ⚠️ (needs review)
    │   └── TopicArticle ✅ (proper Lucide usage)
    ├── Emoji Violations:
    │   ├── Tabs: 📖 📝 🤖 📚 (4 instances)
    │   ├── Gamification: 🔥 (1 instance)
    │   ├── Sections: 📚 📝 🎯 ✍️ (4 instances)
    │   └── Actions: ✓ (2 instances)
    └── Refactor Priority: CRITICAL
```

### Quiz Flow Chain
```
/quiz/[topicId]/page.tsx
└── QuizEngine.tsx (/components/quiz/QuizEngine.tsx)
    ├── Dependencies:
    │   ├── @/components/ui/Button ✅
    │   ├── @/components/ui/Card ✅
    │   └── Lucide React ✅ (CheckCircle2, XCircle, ArrowRight, RotateCcw, Award)
    ├── Features:
    │   ├── Question rendering
    │   ├── Option selection
    │   ├── Immediate feedback
    │   ├── Score calculation
    │   └── Explanation display
    ├── Emoji Violations:
    │   ├── Score badges: 🌟 👍 📚 (3 instances)
    │   ├── Feedback: ✓ ✗ 💡 (6 instances across file)
    │   └── Note: Already imports Lucide equivalents!
    └── Refactor Priority: HIGH (easy fix - already has imports)
```

---

## 3. FEATURE MODULE DEPENDENCIES

### AI Features Module
```
AI Components (/components/ai/)
├── ExplainPanel.tsx
│   ├── Dependencies: Unknown (needs analysis)
│   ├── Features: AI explanation display
│   ├── Emoji Violations: 🎯 💡 (2 instances)
│   └── Used By: TopicReaderClient, TopicLevelReader
├── FlashcardCreator.tsx
│   ├── Dependencies: Unknown (needs analysis)
│   ├── Features: Flashcard generation form
│   ├── Emoji Violations: 💡 🎉 (1 structural, 1 decorative)
│   └── Used By: TopicReaderClient
└── FlashcardDeck.tsx
    ├── Dependencies: Unknown (needs analysis)
    ├── Features: Flashcard study interface
    ├── Emoji Violations: 🎉 (1 decorative)
    └── Used By: Standalone + linked from reader
```

### Reader Module
```
Reader Components (/components/reader/)
├── TopicReaderClient.tsx ❌ (CRITICAL - 11 emoji violations)
├── TopicLevelReader.tsx 🔄 (1 emoji violation)
├── TopicBreadcrumb ✅
├── ContentBlockRenderer ✅
├── ChapterReader ✅
├── TopicArticle ✅
├── BookSidebarIndex ✅
├── BookReaderNav ✅
├── FullBookViewer ✅
├── BookFrontIndex ✅
├── BookChapterIndex ✅
├── TextHighlighter ⚠️ (needs review)
├── TopicPracticeSection ⚠️ (needs review)
├── ProgressWheel ⚠️ (needs review)
└── PreviewWall ⚠️ (needs review)

Dependency Pattern:
- Most reader components are well-structured with proper Lucide usage
- TopicReaderClient is the outlier with heavy emoji usage
- TopicLevelReader is a simpler alternative reader with minor violation
```

---

## 4. AUTHENTICATION FLOW DEPENDENCIES

```
Auth Flow
├── /auth/login/page.tsx
│   └── LoginForm.tsx
│       ├── Dependencies: Unknown (needs review)
│       └── Accessibility: ⚠️ Needs audit
├── /auth/signup/page.tsx
│   └── SignupForm.tsx
│       ├── Dependencies: Unknown (needs review)
│       └── Accessibility: ⚠️ Needs audit
├── /auth/forgot-password/page.tsx
│   ├── Dependencies: Button, Card
│   └── Status: ✅ Proper component usage
└── /auth/onboarding/page.tsx
    └── onboarding-form.tsx
        ├── Dependencies: Button, Card, Lucide ✅
        └── Status: ✅ Proper icon usage
```

---

## 5. NAVIGATION ARCHITECTURE (CURRENT)

### Mobile Navigation (BottomNav - Dashboard)
```
BottomNav Component (inline in dashboard/page.tsx)
├── Implementation: Inline SVG paths
├── Items (4):
│   ├── Home → /dashboard
│   ├── Books → /books
│   ├── Vault → /my-vault
│   └── Profile → /profile
├── Issues:
│   ├── Uses inline SVG instead of Lucide
│   ├── Only 4 items (Design Constitution allows 5)
│   └── Floating pill design (non-standard)
└── Refactor Need: Replace with Lucide icons, add Search tab
```

### Desktop Navigation (LeftSidebar - Dashboard)
```
LeftSidebar Component (inline in dashboard/page.tsx)
├── Implementation: Inline SVG paths
├── Items (4):
│   ├── Dashboard → /dashboard
│   ├── Books → /books
│   ├── My Vault → /my-vault
│   └── Progress → /progress
├── Issues:
│   ├── Uses inline SVG instead of Lucide
│   └── Inconsistent with mobile nav items
└── Refactor Need: Unify with mobile nav, use Lucide
```

---

## 6. DUPLICATE COMPONENT ANALYSIS

### ProgressWheel (DUPLICATE)
```
Instance A: /components/reader/ProgressWheel.tsx
├── Lines: ~60
├── Implementation: Full SVG circular progress
├── Used By: Reader components
└── Status: Implemented

Instance B: /components/progress/ProgressWheel.tsx
├── Lines: 3
├── Implementation: export function ProgressWheel() { return <div>Progress Wheel</div>; }
├── Used By: Unknown (stub)
└── Status: STUB - Not implemented

Recommendation:
1. Delete Instance B (stub)
2. Move Instance A to /components/progress/ProgressWheel.tsx
3. Update all imports to use new path
```

---

## 7. EXTERNAL DEPENDENCIES SUMMARY

### Production Dependencies (from package.json)
```json
{
  "class-variance-authority": "^0.7.1",     // Button variants
  "clsx": "^2.1.1",                         // Class name utility
  "framer-motion": "^12.38.0",              // Animations
  "lucide-react": "^1.16.0",                // Icon library ✅
  "next": "16.2.7",                         // Framework
  "react": "19.2.0",                        // UI library
  "react-dom": "19.2.0",                    // DOM renderer
  "swr": "^2.4.1"                           // Data fetching
}
```

### Key Observations:
1. **Lucide React is already installed** - No new dependencies needed for icon migration
2. **Framer Motion is heavily used** - Animation system already in place
3. **SWR for data fetching** - Consistent across pages
4. **Class Variance Authority** - Used for component variants (good pattern)

---

## 8. CRITICAL PATH ANALYSIS

### Most Critical Files for Refactoring

#### Path 1: Learning Flow (HIGHEST PRIORITY)
```
User Journey:
Dashboard → Subject → Chapter → Topic → Quiz

Files Involved:
1. /dashboard/page.tsx (inline SVGs)
2. [boardSlug].../page.tsx (dynamic route wrapper)
3. TopicReaderClient.tsx (11 emoji violations) ❌
4. QuizEngine.tsx (6 emoji violations) ❌

Impact: Core learning experience
Risk: HIGH - Most used user journey
```

#### Path 2: Discovery Flow (HIGH PRIORITY)
```
User Journey:
Landing → Search → Books → Topic

Files Involved:
1. /(public)/page.tsx (8 emoji violations) ❌
2. /(public)/search/page.tsx (needs review)
3. /books/page.tsx (✅ good)
4. TopicReaderClient.tsx (11 emoji violations) ❌

Impact: First impression + content discovery
Risk: HIGH - Conversion funnel
```

#### Path 3: Admin Flow (MEDIUM PRIORITY)
```
User Journey:
Admin Dashboard → Content Review → Approval

Files Involved:
1. /admin/(dashboard)/page.tsx (needs review)
2. /admin/(dashboard)/content/page.tsx (2 emoji violations)
3. /admin/(dashboard)/books/ingest/page.tsx (4 symbol violations)

Impact: Content operations
Risk: MEDIUM - Internal users only
```

---

## 9. IMPORT CONSOLIDATION OPPORTUNITIES

### Current State: Scattered Lucide Imports
```tsx
// TopicBreadcrumb.tsx
import { ChevronRight, Home, BookOpen, Layers } from 'lucide-react';

// QuizEngine.tsx
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';

// TopicReaderClient.tsx
// NO LUCIDE IMPORTS despite having 11 emoji violations!
```

### Recommended: Centralized Icon Registry
```tsx
// Create: /components/ui/icons/index.ts
export const AppIcons = {
  // Navigation
  home: Home,
  library: BookOpen,
  search: Search,
  vault: Bookmark,
  profile: User,
  
  // Learning
  read: BookOpen,
  practice: PenLine,
  quiz: Zap,
  flashcards: Layers,
  
  // AI
  explain: Sparkles,
  ai: Bot,
  
  // Status
  check: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  
  // Gamification
  streak: Flame,
  award: Trophy,
  star: Star,
};

// Usage:
import { AppIcon } from '@/components/ui/icons';
<AppIcon name="streak" />
```

**Benefits:**
1. Single source of truth for icon choices
2. Easy to swap icon library later
3. Enforces consistency
4. Reduces bundle size through tree-shaking
5. Makes emoji violations obvious during code review

---

## 10. REFACTOR IMPACT ASSESSMENT

### Low Risk Changes (Safe to Execute)
- Replace emojis in QuizEngine (already has Lucide imports)
- Replace emojis in ExplainPanel (isolated component)
- Fix stub ProgressWheel (delete or implement)
- Consolidate icon imports in existing Lucide-using files

### Medium Risk Changes (Test Required)
- TopicReaderClient refactor (core learning screen)
- Dashboard inline SVG replacement (complex component)
- Landing page icon replacement (conversion impact)

### High Risk Changes (Phased Rollout)
- Navigation architecture changes (affects all pages)
- Atomic component refactoring (Button, Card style changes)
- Form accessibility improvements (auth flow impact)

---

**Summary Statistics:**
- Total dependency chains mapped: 12
- Critical path files identified: 7
- Duplicate components found: 1 (ProgressWheel)
- Consolidation opportunities: 3 major areas
- Files already using Lucide correctly: 19
- Files needing icon migration: 9
