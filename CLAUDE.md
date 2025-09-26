# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Meetings4U (M4U) is a meeting representation service platform that connects clients who need someone to attend meetings on their behalf with independent representatives (reps) who provide this service.

**Key Business Concepts:**
- **Client**: Person/organization paying for meeting representation
- **Rep**: Independent representative who attends meetings for clients
- **Entity**: The specific person/organization being represented in the meeting
- **Quote**: Amount quoted by a rep to attend a specific meeting
- **Assignment**: Accepted quote with confirmed meeting details

**Business Flow:**
1. Clients post meeting requirements with entity details
2. Reps submit quotes for meetings in their coverage area
3. Clients accept quotes and pay through the platform (20% commission)
4. Reps attend meetings and submit completion reports
5. Clients approve work and reps get paid

## Technology Stack

**Frontend:**
- React 18+ with Vite
- Tailwind CSS + shadcn/ui components
- React Router v6 for navigation
- Zustand for state management
- React Hook Form + Zod for form validation
- Lucide React for icons
- date-fns for date handling
- Leaflet/React-Leaflet for maps
- Axios for HTTP client

**Backend & Services:**
- Supabase (database, authentication, file storage)
- Resend for transactional emails
- PayFast for payment processing

**Deployment:**
- Frontend: Vercel
- Database: Supabase hosted

## Development Commands

Since this is a Vite + React project, use these commands:

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript checks (if using TS)
npm test                 # Run tests (when test framework is added)
```

**Important:** Always run `npm run lint` and `npm run typecheck` before committing changes.

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn components (Button, Input, etc.)
│   ├── layouts/      # Layout components (Header, Sidebar, etc.)
│   ├── forms/        # Reusable form components
│   └── shared/       # Shared components across app
├── pages/
│   ├── auth/         # Authentication pages (Login, Signup, etc.)
│   ├── client/       # Client-specific pages (Dashboard, PostJob, etc.)
│   ├── rep/          # Rep-specific pages (Browse, Profile, etc.)
│   └── public/       # Public pages (Landing, About, etc.)
├── stores/           # Zustand state stores
│   ├── authStore.js          # Authentication & user state
│   ├── entitiesStore.js      # Client entities management
│   ├── jobsStore.js          # Jobs & quotes (client view)
│   ├── repStore.js           # Rep-specific state
│   ├── formStore.js          # Multi-step form states
│   └── uiStore.js            # UI state (modals, loading, notifications)
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── services/         # API service functions
├── config/           # Configuration files
├── data/             # Mock JSON data for development
└── types/            # TypeScript interfaces (if using TS)
```

## API Integration Strategy

**Environment Configuration:**
- Development: Mock API at `http://localhost:3001/api/v1`
- Production: Supabase REST API
- Authentication: JWT tokens stored in localStorage
- HTTP Client: Axios with interceptors for auth and error handling

**Key API Patterns:**
```javascript
// Authentication endpoints
POST /auth/signup
POST /auth/login
POST /auth/verify-phone
POST /auth/verify-phone/confirm

// Core business endpoints
GET /users/me
GET /entities
POST /entities
GET /jobs
POST /jobs
POST /jobs/:jobId/quotes
GET /quotes

// File uploads
POST /uploads/profile
POST /uploads/job-attachments
```

**Error Response Format:**
All API errors return standardized format:
```javascript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": { /* field-specific errors */ }
  }
}
```

## State Management Architecture

**Zustand Store Organization:**

**authStore.js** - User authentication and profile
- Manages login/logout, user profile data, token persistence
- Actions: `login()`, `logout()`, `updateUser()`, `updatePhoneVerification()`

**entitiesStore.js** - Client entity management
- Manages client's business entities (companies they represent)
- Actions: `setEntities()`, `selectEntity()`, `addEntity()`, `updateEntity()`, `setDefault()`

**jobsStore.js** - Job posting and management (client perspective)
- Manages job posting, quotes received, job status
- Actions: `setJobs()`, `addJob()`, `updateJob()`, `setQuotesForJob()`, `addQuoteToJob()`

**repStore.js** - Rep-specific functionality
- Manages available jobs, submitted quotes, assignments, earnings
- Actions: `setAvailableJobs()`, `addQuote()`, `updateQuote()`, `setMyAssignments()`

**formStore.js** - Multi-step form state
- Manages complex forms (job posting wizard, quote submission)
- Separate state for jobForm and quoteForm with step management

**uiStore.js** - Global UI state
- Manages modals, notifications, loading states
- Actions: `openModal()`, `closeModal()`, `addNotification()`, `setLoading()`

## Key Business Logic Implementation

### Entity Management
Clients must have at least one entity (company/organization) they represent. Each job is posted on behalf of a specific entity. Entity data includes:
- Basic info (name, type, contact details)
- Registration numbers (CIPC, CSD, Tax, VAT)
- Default entity selection for quick job posting

### Job Posting Workflow
5-step wizard process:
1. Meeting details (type, date, location, entity selection)
2. Requirements (tasks, attire, PPE, special instructions)
3. Documents & attachments (required docs for printing, reference files)
4. Additional information (detailed notes, parking info, etc.)
5. Review & submit

### Quote and Payment Process
1. Reps submit quotes with transportation details and arrival times
2. Clients review quotes with rep profiles and quote details
3. Payment through PayFast (total = quote amount + 20% platform fee)
4. Rep confirmation required within 12 hours
5. Job execution with location verification and completion reporting

### Phone Verification System
- Users can have primary and alternative phone numbers
- Verification via SMS or WhatsApp
- Separate verification process for each number
- Account limitations without verified phone number

## Development Guidelines

### Forms and Validation
- Use React Hook Form for all forms
- Implement Zod schemas for validation
- Show real-time validation feedback
- Handle API error responses in form error states

### File Uploads
- Profile photos: 5MB max, JPG/PNG/WEBP, with crop/resize
- Job attachments: 10MB max per file, 10 files max, ZIP download option
- Required documents: separate from attachments, marked for printing

### Authentication Flow
- JWT token management with refresh capability
- Automatic token refresh on 401 responses
- Redirect to login on authentication failure
- Persistent auth state across browser sessions

### Map Integration
- Use Leaflet/React-Leaflet for location display
- Rep coverage area visualization
- Job location mapping with distance calculations
- Location verification during job execution

### API Service Pattern
- Create service functions for each resource (authService, jobService, etc.)
- Use store integration for automatic state updates
- Implement optimistic updates with rollback on failure
- Centralized error handling with user notifications

### UI/UX Patterns
- Use shadcn/ui components consistently
- Implement loading states for all async operations
- Show proper error states with retry options
- Use modals for secondary actions (entity management, quote details)
- Implement proper mobile responsiveness