# EduSmartX — Smart Learning Analytics Platform

A mobile-first learning analytics platform built with Next.js 16, React 19, Tailwind CSS v4, and MariaDB. Designed from a [Figma design system](https://www.figma.com/design/gTWQREfgY711lXbapq8cra/ADBMS-UI-Design) with a teal color palette and 2px precision radius.

![Stack](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js) ![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react) ![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![MariaDB](https://img.shields.io/badge/MariaDB-latest-003545?logo=mariadb)

---

## Features

- **Student Dashboard** — Quick stats (average score, active courses, study hours), enrolled course progress, and a recent activity feed.
- **Course Catalog** — Searchable, filterable course grid with category pills.
- **Course Overview** — Hero section with progress bar, instructor sidebar, and tabbed content (lessons, quizzes, assignments).
- **Active Quiz** — Interactive quiz interface with option cards, answer checking, and prev/next navigation.
- **Smart Recommendations** — Bento-grid layout with AI-style suggestions, performance insights, and course timeline.
- **Performance Analytics** — Metric cards, trend charts, and subject breakdown bar charts (powered by Recharts).
- **Profile & Settings** — Editable account fields, notification preferences, and academic settings.
- **Admin Console** — Student tables, performance levels, courses, and recommendation management.
- **Responsive** — Mobile-first with a bottom tab bar; converts to a left sidebar on desktop (768 px+).

---

## Screens

| Route | Description |
|---|---|
| `/login` | Auth card with tabs, icon inputs, and social-login buttons |
| `/dashboard` | Stats, enrolled courses, activity feed |
| `/courses` | Search bar, category filter pills, course grid |
| `/courses/[id]` | Hero, progress, lessons/quizzes/assignments tabs |
| `/quiz/[id]` | Question, four option cards, bottom action bar |
| `/recommendations` | Bento grid, insights, course timeline |
| `/analytics` | Metrics, trend chart, subject breakdown |
| `/profile` | Avatar, editable fields, preferences |
| `/console` | Student/performance/course management tables |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI** | [React 19](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/) (base-nova), [Base UI](https://base-ui.com/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), [CVA](https://cva.style/), `tw-animate-css` |
| **Charts** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database** | [MariaDB](https://mariadb.org/) (raw SQL via `mariadb` driver) |
| **Auth** | Cookie-based sessions (hand-rolled, server-side) |
| **Runtime** | [Bun](https://bun.sh/) (package scripts) |

---

## Getting Started

### Prerequisites

- **Bun** ≥ 1.x
- **MariaDB** (or MySQL 8+)
- **Node.js** ≥ 20 (for fallback)

### 1. Clone and install

```bash
git clone <repo-url>
cd edusmartx
bun install
```

### 2. Set up the database

```bash
mysql -u root -p < scripts/init-db.sql
```

### 3. Configure environment

```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=edusmartx_db
```

### 4. Start the dev server

```bash
bun dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Seed accounts

| Role | Email | Password |
|---|---|---|
| Student | `oshada@edusmartx.com` | `password123` |
| Student | `isuri@edusmartx.com` | `password123` |
| Instructor | `pavani@edusmartx.com` | `password123` |
| Admin | `admin@edusmartx.com` | `admin123` |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, HTML shell)
│   ├── globals.css             # Design tokens (teal palette, 2px radius)
│   ├── (public)/               # Landing page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (auth)/                 # Authentication
│   │   ├── layout.tsx          # Full-page with bg graphics
│   │   └── login/
│   │       ├── page.tsx
│   │       └── AuthTabs.tsx
│   ├── (student)/              # Student portal (auth-guarded)
│   │   ├── layout.tsx          # TopAppBar + Sidebar + BottomNavBar
│   │   ├── dashboard/
│   │   ├── courses/
│   │   ├── quiz/
│   │   ├── analytics/
│   │   ├── recommendations/
│   │   └── profile/
│   └── (console)/              # Admin console (auth-guarded)
│       └── console/
├── components/
│   ├── shared/                 # TopAppBar, BottomNavBar, Sidebar
│   ├── student/                # Feature components (cards, charts, forms)
│   ├── auth/                   # LoginForm, SignUpForm (legacy)
│   ├── dashboard/              # Legacy dashboard components
│   ├── console/                # Admin console tables & forms
│   └── ui/                     # shadcn/ui primitives (button, card, input, etc.)
├── lib/
│   ├── db.ts                   # MariaDB connection pool
│   ├── queries.ts              # All SQL query functions
│   ├── auth.ts                 # Session management
│   ├── utils.ts                # cn() utility
│   └── actions/                # Server Actions (auth, console)
└── types/
    └── index.ts                # TypeScript interfaces
```

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#006a61` | Buttons, links, active states |
| `--background` | `#f8f9ff` | Page background |
| `--foreground` | `#0b1c30` | Body text |
| `--muted-foreground` | `#76777d` | Secondary text |
| `--border` | `#e2e8f0` | Card and input borders |
| `--radius` | `0.125rem` | All border radii |
| Font | Inter (Google Fonts) | Body and headings |

---

## Database Schema

```
Users ──────────────── Students ─────── Enrollment ─────── Courses ─────── Lessons
  │                       │                                     │
  │                       ├── Attempts ─── Quizzes              ├── course_categories
  │                       ├── Recommendations                   └── course_category_map
  │                       ├── student_activity_log
  │                       └── student_quiz_answers
  │
  └─────────────────── Instructors
```

Key tables: `Users`, `Students`, `Instructors`, `Courses`, `Lessons`, `Quizzes`, `Enrollment`, `Attempts`, `Recommendations`, `course_categories`, `quiz_questions`, `quiz_options`, `student_quiz_answers`, `student_activity_log`.

---

## Available Scripts

```bash
bun dev          # Start development server (Turbopack)
bun run build    # Production build
bun start        # Start production server
bun run lint     # Run ESLint
```

## License

Private — EduSmartX project.
