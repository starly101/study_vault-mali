# Screen Blueprints

**Generated:** Phase 8.0 Repository Reality Check  
**Purpose:** Map actual file paths to screen functions with component breakdowns  

---

## HOW TO READ THIS DOCUMENT

Each screen blueprint includes:
- **Actual File Path**: Where the screen lives in the repository
- **Primary Function**: What the screen does for users
- **Component Tree**: All components used (with compliance status)
- **Emoji Violations**: Count and location of structural emojis
- **Refactor Priority**: CRITICAL, HIGH, MEDIUM, LOW

---

## 1. PUBLIC SCREENS (Pre-Authentication)

### 1.1 Landing Page (Home)

**File Path:** `/workspace/apps/student/app/(public)/page.tsx`  
**Route:** `/`  
**Primary Function:** Convert visitors to registered users  

#### Component Breakdown
```
page.tsx (Landing)
├── Hero Section (inline)
│   ├── Headline
│   ├── Subheadline
│   └── CTA Buttons (Link components)
├── Stat Cards (inline)
│   ├── StatCard × 4
│   │   ├── Icon (emoji: 📚 🎯 🤖 🔥) ❌
│   │   ├── Value
│   │   └── Label
├── Features Grid (inline)
│   ├── FeatureCard × 4
│   │   ├── Icon (emoji: 🔥 🤖 📊 📦) ❌
│   │   ├── Title
│   │   └── Description
├── Hot Topics Section (inline)
│   ├── TopicCard (inline)
│   │   ├── Badge (emoji: 🔥) ❌
│   │   └── Content
└── Footer (inline)
    └── Copyright text (emoji: 🇵🇰) ⚠️ (cultural - keep?)
```

#### Emoji Violations: 8 structural + 2 cultural
- Line 94: 🇵🇰 (cultural - PRESERVE candidate)
- Line 125: 🔥 (structural - replace with `Flame`)
- Lines 135-138: 📚 🎯 🤖 🔥 (structural - replace)
- Lines 155-170: 🔥 🤖 📊 📦 (structural - replace)
- Line 227: 🇵🇰 (cultural - PRESERVE candidate)

#### Refactor Priority: **CRITICAL**
**Reason:** First impression screen, heavy emoji usage in structural elements

---

### 1.2 Search Page

**File Path:** `/workspace/apps/student/app/(public)/search/page.tsx`  
**Route:** `/search`  
**Primary Function:** Search results display  

#### Status: ⚠️ NEEDS REVIEW

---

### 1.3 Search Redirect Page

**File Path:** `/workspace/apps/student/app/(dashboard)/search-redirect/page.tsx`  
**Route:** `/search-redirect`  
**Primary Function:** Redirect logic for search queries  

#### Emoji Violations: 0
#### Refactor Priority: **LOW**

---

## 2. AUTHENTICATION SCREENS

### 2.1 Login Page

**File Path:** `/workspace/apps/student/app/(auth)/login/page.tsx`  
**Route:** `/auth/login`  
**Primary Function:** User authentication  

#### Component: LoginForm.tsx
#### Status: ⚠️ NEEDS ACCESSIBILITY AUDIT

---

### 2.2 Signup Page

**File Path:** `/workspace/apps/student/app/(auth)/signup/page.tsx`  
**Route:** `/auth/signup`  
**Primary Function:** User registration  

#### Component: SignupForm.tsx
#### Status: ⚠️ NEEDS ACCESSIBILITY AUDIT

---

### 2.3 Forgot Password Page

**File Path:** `/workspace/apps/student/app/(auth)/forgot-password/page.tsx`  
**Route:** `/auth/forgot-password`  
**Primary Function:** Password recovery initiation  

#### Components: Card, CardHeader, CardTitle, CardDescription, CardContent, Button
#### Emoji Violations: 0
#### Refactor Priority: **NONE** (compliant)

---

### 2.4 Onboarding Page

**File Path:** `/workspace/apps/student/app/(auth)/onboarding/page.tsx`  
**Route:** `/auth/onboarding`  
**Primary Function:** New user setup flow  

#### Components: Card, Lucide Icons (GraduationCap, BookOpen, Globe, CheckCircle2)
#### Emoji Violations: 0
#### Refactor Priority: **NONE** (compliant)

---

## 3. DASHBOARD SCREENS (Post-Authentication)

### 3.1 Dashboard (Home)

**File Path:** `/workspace/apps/student/app/(dashboard)/dashboard/page.tsx`  
**Route:** `/dashboard`  
**Primary Function:** Learning hub, show continue learning, progress  

#### Component Breakdown
```
page.tsx (Dashboard)
├── DashboardSkeleton (inline)
├── EmptyState (inline) - Animated SVG Vault
├── ErrorState (inline)
├── BookCard (inline) - Uses inline SVG icons
├── BottomNav (inline) - MOBILE ONLY - Uses inline SVGs
└── LeftSidebar (inline) - DESKTOP ONLY - Uses inline SVGs
```

#### Emoji Violations: 0
#### Icon Issues: Uses inline SVG paths instead of Lucide
#### Refactor Priority: **HIGH**

---

### 3.2 Books Library

**File Path:** `/workspace/apps/student/app/(dashboard)/books/page.tsx`  
**Route:** `/books`  
**Primary Function:** Browse all available books  

#### Components: Card, Lucide Icons (BookOpen, Library)
#### Emoji Violations: 0
#### Refactor Priority: **NONE** (compliant)

---

### 3.3 Progress Tracking

**File Path:** `/workspace/apps/student/app/(dashboard)/progress/page.tsx`  
**Route:** `/progress`  
**Primary Function:** View learning analytics and progress  

#### Components: Card, Lucide Icons (Target, TrendingUp, Award, BrainCircuit)
#### Emoji Violations: 0
#### Refactor Priority: **NONE** (compliant)

---

### 3.4 My Vault

**File Path:** `/workspace/apps/student/app/(dashboard)/my-vault/page.tsx`  
**Route:** `/my-vault`  
**Primary Function:** Access saved/bookmarked content  

#### Components: Button, Card, Lucide Icons (BookOpen, Filter, Library)
#### Emoji Violations: 0
#### Refactor Priority: **NONE** (compliant)

---

### 3.5 Premium Upgrade

**File Path:** `/workspace/apps/student/app/(dashboard)/premium/page.tsx`  
**Route:** `/premium`  
**Primary Function:** Display pricing plans, convert to paid  

#### Components: Lucide Icons (CheckCircle, XCircle, CreditCard, Smartphone, Shield, Zap)
#### Emoji Violations: 1 structural (Line 307: 🔒)
#### Refactor Priority: **MEDIUM**

---

### 3.6 Billing History

**File Path:** `/workspace/apps/student/app/(dashboard)/billing/page.tsx`  
**Route:** `/billing`  
**Primary Function:** View payment history, manage subscription  

#### Emoji Violations: 1 decorative (Line 352: 🎉)
#### Refactor Priority: **LOW** (UX decision)

---

### 3.7 Quiz Page

**File Path:** `/workspace/apps/student/app/(dashboard)/quiz/[topicId]/page.tsx`  
**Route:** `/quiz/[topicId]`  
**Primary Function:** Quiz wrapper/launcher  

#### Status: ⚠️ NEEDS REVIEW

---

## 4. LEARNING CONTENT SCREENS

### 4.1 Dynamic Topic/Chapter/Subject Page

**File Path:** `/workspace/apps/student/app/(dashboard)/[boardSlug]/[programSlug]/[subjectSlug]/[[...slug]]/page.tsx`  
**Route:** `/[board]/[program]/[subject]/...`  
**Primary Function:** Main learning interface (reader, chapter view, topic view)  

#### Component: TopicReaderClient.tsx ❌ CRITICAL

#### Tab Navigation Emojis:
- Read tab: 📖 (Line 185)
- Practice tab: 📝 (Line 186)
- AI Explain tab: 🤖 (Line 187)
- Vault tab: 📚 (Line 188)

#### Content Section Emojis:
- Streak counter: 🔥 (Line 218)
- Key Terms: 📚 (Line 326)
- Practice Section: 📝 (Line 346)
- MCQ Label: 🎯 (Line 356)
- Completed checkmark: ✓ (Line 381)
- Exercises Label: ✍️ (Line 404)
- Mark as Complete: ✓ (Line 447)

#### Emoji Violations: 11 structural (HIGHEST in codebase)
#### Refactor Priority: **CRITICAL**

---

### 4.2 Alternative Topic Reader

**File Path:** `/workspace/apps/student/components/reader/TopicLevelReader.tsx`  
**Route:** Used within dynamic route  
**Primary Function:** Alternative topic viewing experience  

#### Emoji Violations: 1 structural (Line 217: 📚)
#### Refactor Priority: **HIGH**

---

## 5. ERROR HANDLING SCREENS

### 5.1 Global Error Boundary

**File Path:** `/workspace/apps/student/app/global-error.tsx`  
**Route:** Catches all unhandled errors  
**Primary Function:** Graceful error handling  

#### Components: Button, Card (all variants), Lucide Icons (AlertCircle, RefreshCw, WifiOff, ServerCrash, Bug)
#### Emoji Violations: 0
#### Refactor Priority: **NONE** (exemplary compliance)

---

### 5.2 Local Error Boundary

**File Path:** `/workspace/apps/student/app/error.tsx`  
**Route:** Catches errors in segments  
**Primary Function:** Segment-level error handling  

#### Components: Button, Lucide Icons (AlertCircle, RefreshCw, Home, WifiOff, ServerCrash)
#### Emoji Violations: 1 structural (Line 136: 📶)
#### Refactor Priority: **MEDIUM** (easy fix - already imports WifiOff)

---

## 6. ADMIN SCREENS

### 6.1 Admin Dashboard

**File Path:** `/workspace/apps/admin/app/(dashboard)/page.tsx`  
**Route:** `/admin`  
**Status: ⚠️ NEEDS REVIEW**

---

### 6.2 Books Management

**File Path:** `/workspace/apps/admin/app/(dashboard)/books/page.tsx`  
**Route:** `/admin/books`  
**Status: ⚠️ NEEDS REVIEW**

---

### 6.3 Book Ingestion

**File Path:** `/workspace/apps/admin/app/(dashboard)/books/ingest/page.tsx`  
**Route:** `/admin/books/ingest`  
**Primary Function:** Upload and process new books  

#### Emoji/Symbol Violations: 4 instances
- Lines 289-290: ✓ ✗ (log styling)
- Line 306: ✓ (success indicator)
- Line 337: ✗ (error indicator)

#### Refactor Priority: **MEDIUM**

---

### 6.4 Content Review

**File Path:** `/workspace/apps/admin/app/(dashboard)/content/page.tsx`  
**Route:** `/admin/content`  
**Primary Function:** Approve/reject content updates  

#### Emoji Violations: 2 structural
- Line 327: ✏️ (Modified badge)
- Line 328: ✓ (Unchanged badge)

#### Refactor Priority: **MEDIUM**

---

### 6.5 Control Panel

**File Path:** `/workspace/apps/admin/app/(dashboard)/control/page.tsx`  
**Route:** `/admin/control`  
**Status: ⚠️ NEEDS REVIEW**

---

## 7. SUMMARY BY PRIORITY

### CRITICAL Priority (Fix Immediately)
| Screen | File | Violations | Reason |
|--------|------|------------|--------|
| Topic Reader (Main) | TopicReaderClient.tsx | 11 | Core learning experience |
| Landing Page | (public)/page.tsx | 8 | First impression |

### HIGH Priority (Fix in Wave 1)
| Screen | File | Violations | Reason |
|--------|------|------------|--------|
| Dashboard | (dashboard)/dashboard/page.tsx | 0 (SVG issue) | Most visited |
| Topic Reader (Alt) | TopicLevelReader.tsx | 1 | Alternative learning path |

### MEDIUM Priority (Fix in Wave 2)
| Screen | File | Violations | Reason |
|--------|------|------------|--------|
| Error (Local) | error.tsx | 1 | Easy fix |
| Premium | premium/page.tsx | 1 | Conversion page |
| Book Ingestion | admin/books/ingest/page.tsx | 4 | Admin workflow |
| Content Review | admin/content/page.tsx | 2 | Admin workflow |

### LOW Priority (Evaluate/Fix Later)
| Screen | File | Violations | Reason |
|--------|------|------------|--------|
| Billing | billing/page.tsx | 1 (decorative) | UX decision |
| Search Redirect | search-redirect/page.tsx | 0 | No changes needed |

### NEEDS REVIEW (Audit Required)
| Screen | File |
|--------|------|
| Search | (public)/search/page.tsx |
| Login | (auth)/login/page.tsx |
| Signup | (auth)/signup/page.tsx |
| Quiz | (dashboard)/quiz/[topicId]/page.tsx |
| Admin Dashboard | admin/(dashboard)/page.tsx |
| Admin Books | admin/books/page.tsx |
| Admin Control | admin/control/page.tsx |

---

## 8. ROUTE STRUCTURE SUMMARY

```
/                          → Landing (❌)
/auth/login                → Login (⚠️)
/auth/signup               → Signup (⚠️)
/auth/forgot-password      → Forgot Password (✅)
/auth/onboarding           → Onboarding (✅)
/dashboard                 → Dashboard (🔄)
/books                     → Books Library (✅)
/progress                  → Progress Tracking (✅)
/my-vault                  → My Vault (✅)
/premium                   → Premium Upgrade (🔄)
/billing                   → Billing History (✅)
/quiz/[id]                 → Quiz (⚠️)
/[board]/[program]/[subject]/... → Learning Content (❌)
/search                    → Search (⚠️)
/admin                     → Admin Dashboard (⚠️)
/admin/books               → Books Management (⚠️)
/admin/books/ingest        → Book Ingestion (🔄)
/admin/content             → Content Review (🔄)
/admin/control             → Control Panel (⚠️)
```

**Total Screens Mapped:** 20  
**Compliant (✅):** 7 (35%)  
**Needs Refactoring (🔄/❌):** 7 (35%)  
**Needs Review (⚠️):** 6 (30%)

---

**Next Step:** Use this blueprint to prioritize Phase 8 (Icon Migration) work starting with CRITICAL screens.
