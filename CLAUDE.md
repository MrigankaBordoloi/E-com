# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vaastra is a full-stack luxury e-commerce platform for traditional Assamese sarees. It has a React frontend and Node.js/Express backend with MySQL via Sequelize ORM.

## Commands

### Frontend (`/frontend`)
```bash
npm run dev        # Dev server on localhost:5173
npm run build      # Production build
npm run lint       # ESLint check
npm run preview    # Preview production build
```

### Backend (`/backend`)
```bash
npm run dev        # Dev server on localhost:5000 (nodemon)
npm start          # Production start
node src/utils/seeder.js   # Seed the database
```

## Architecture

### Frontend
- **React 19 + Vite 7** SPA with React Router 7 for client-side routing
- **State:** Context API only — `AuthContext` (JWT + user), `CartContext` (dual localStorage/backend sync), `ToastContext` (notifications)
- **API calls:** All go through `src/utils/api.js`, which auto-injects the JWT header from localStorage
- **Route protection:** `ProtectedRoute` component wraps authenticated pages
- **Animations:** Framer Motion for page transitions/interactions

### Backend
- **Express 5** REST API with JWT authentication middleware
- **Sequelize 6** ORM against MySQL — models in `src/models/`
- **Routes:** `/api/auth`, `/api/products`, `/api/cart`, `/api/orders`, `/api/admin`
- **Auth flow:** bcryptjs for hashing, JWT signed with `JWT_SECRET`, token returned on login/register
- **Payment:** Razorpay integration in order routes

### Database Models
`User`, `Product`, `Category`, `Cart`, `CartItem`, `Order`, `OrderItem`

### Backend Environment Variables (`.env`)
```
DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
JWT_SECRET
FRONTEND_URL=http://localhost:5173
RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
NODE_ENV=development
```

## Design System

Brand colors and motifs are central to the product identity:
- **Muga Gold:** `#D2B48C`
- **Pat White:** `#FDF5E6`
- **Gamosa Red:** `#B22222`
- **Spacing unit:** 8px base grid
- Traditional Assamese motifs: Kinkhap (lion), Gos (tree), Jaapi (hat)

## Common Pitfalls

- **CORS:** Backend allows only `FRONTEND_URL`; keep in sync when changing ports
- **Auth expiry:** JWT tokens in localStorage are not auto-refreshed — expired tokens cause silent failures in context
- **Cart sync:** CartContext writes to both localStorage and backend; stale context after login can cause cart desync — re-fetch on auth state change
- **Sequelize logging:** Enabled in dev mode (`config/database.js`) — disable for cleaner logs when needed

## Workflow Orchestration
## 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)

- If something goes sideways, STOP and re-plan immediately

- Use plan mode for verification steps, not just building

- Write detailed specs upfront to reduce ambiguity

## 2. Subagent Strategy
- Use subagents liberally to keep main context window clean

- Offload research, exploration, and parallel analysis to subagents

- For complex problems, throw more compute at it via subagents

- One task per subagent for focused execution

## 3. Self-Improvement Loop
- After ANY correction from the user: update tasks/lessons.md with the pattern

- Write rules for yourself that prevent the same mistake

- Ruthlessly iterate on these lessons until mistake rate drops

- Review lessons at session start for relevant project

## 4. Verification Before Done
- Never mark a task complete without proving it works

- Diff behavior between main and your changes when relevant

- Ask yourself: "Would a staff engineer approve this?"

- Run tests, check logs, demonstrate correctness

## 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"

- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"

- Skip this for simple, obvious fixes -- don't over-engineer

- Challenge your own work before presenting it

## 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding

- Point at logs, errors, failing tests -- then resolve them

- Zero context switching required from the user

- Go fix failing CI tests without being told how

## Task Management
1.Plan First: Write plan to tasks/todo.md with checkable items

2.Verify Plan: Check in before starting implementation

3.Track Progress: Mark items complete as you go

4.Explain Changes: High-level summary at each step

5.Document Results: Add review section to tasks/todo.md

6.Capture Lessons: Update tasks/lessons.md after corrections

## Core Principles
- Simplicity First: Make every change as simple as possible. Impact minimal code.

- No Laziness: Find root causes. No temporary fixes. Senior developer standards.

- Minimal Impact: Only touch what's necessary. No side effects with new bugs.
