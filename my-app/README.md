# EGC Instructor Dashboard

A pixel-accurate recreation of the EGC Instructor Dashboard — an Arabic (RTL) assignment and
peer-review management system for course instructors, built with React 18 and Create React App.

## Features

- **Overview** — welcome summary, top-level stat cards, an earnings trend chart, quick-access cards
  for every section, and a recent-assignments list.
- **Assignments list** — stat cards (late / graded / in review / total), filters, search, pagination,
  and full CRUD actions (create, edit, delete, view).
- **Assignment detail** — assignment info card, attached files, and two tabs:
  - **Peer Review** — reviewer/owner pairs, ratings, and status (reviewed / pending / reviewing).
  - **Received submissions** — student submissions, grades, and status.
- **Add / Edit assignment** — full validated form (title, description, course, lesson, total grade,
  resubmission count, due date, peer-review toggle) plus file upload zones for task & solution files.
- **Grading page** — score entry (validated against total grade) and comment box for a submission.
- **Peer review page** — reviewer ↔ owner card, star rating, and written feedback.
- **Courses** — stat cards, status/search filters, a responsive course-card grid (image, category,
  price, rating, lesson/student counts), edit/delete actions, and pagination.
- **Students** — stat cards, status/search filters, a detailed student table (avatar, course,
  progress bar, join date, status) with a student-detail modal.
- **Profits** — stat cards, a monthly earnings area chart (Recharts), and a transactions table
  (completed / pending / refunded).
- **Certificates** — stat cards, status/search filters, and a certificates table with
  issue/download/send actions.
- **Profile** — tabbed page (Personal info / Security / Notifications) with an editable avatar,
  full profile form, password update form, and notification toggles.
- Responsive sidebar/topbar layout, toast notifications, and modals (delete confirmation, student
  details).

## Tech Stack

- React 18 + Create React App (JavaScript, no TypeScript)
- React Router DOM v6
- Axios (API service layer, ready to be wired to a real backend)
- CSS Modules (no CSS framework, fully custom design system in `src/styles/variables.css`)
- React Icons (Feather icon set)
- Framer Motion (modal & toast animations)
- Recharts (earnings charts on Overview & Profits)
- Context API for global state (`src/context/AppContext.js`)

## Getting Started

```bash
npm install
npm start
```

The app runs at `http://localhost:3000`.

To create a production build:

```bash
npm run build
```

## Project Structure

```
src/
├── assets/            # images, icons, fonts
├── components/         # reusable UI building blocks (Navbar, Sidebar, Badge, Button, Table...)
├── pages/              # route-level pages
├── layouts/            # DashboardLayout (sidebar + topbar shell)
├── context/            # AppContext (global state via Context API)
├── data/               # mock data simulating API responses
├── hooks/               # custom hooks (useDebounce...)
├── services/           # axios instance / API layer
├── routes/             # AppRoutes.jsx - centralized route definitions
├── utils/              # formatting helpers
└── styles/             # design tokens & global CSS reset
```

## Notes

- All data is currently mocked in `src/data/mockData.js`. Swap the calls in `AppContext.js` with
  real requests through `src/services/api.js` once a backend is available.
- The interface is fully RTL (`dir="rtl"`) and uses the Cairo Arabic typeface.
