# M4U Frontend Requirements - MVP

## Technology Stack
- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Date/Time**: date-fns
- **Maps**: Leaflet/React-Leaflet for location display
- **Deployment**: Vercel

## Project Structure
```
src/
├── components/
│   ├── ui/           # shadcn components
│   ├── layouts/      # Layout components
│   ├── forms/        # Form components
│   └── shared/       # Shared components
├── pages/
│   ├── auth/         # Authentication pages
│   ├── client/       # Client pages
│   ├── rep/          # Rep pages
│   └── public/       # Public pages
├── stores/           # Zustand state stores
├── hooks/            # Custom hooks
├── utils/            # Utility functions
├── services/         # API service functions
├── config/           # Configuration files
├── data/             # Mock JSON data
└── types/            # TypeScript interfaces

```

## API Integration Strategy

### Environment Configuration
- **Development**: Mock API at `http://localhost:3001/api/v1`
- **Production**: Supabase REST API
- **Authentication**: JWT tokens with refresh capability
- **Storage**: localStorage for tokens and user preferences
- **HTTP Client**: Axios with interceptors for auth and error handling

### Authentication Flow
**JWT Token Structure:**
```javascript
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer",
  "user": {
    "id": "user_001",
    "email": "client@example.com",
    "type": "client",
    "verified": true,
    "phone_verified": false
  }
}
```

### Core API Endpoints

#### Authentication Endpoints

**POST /auth/signup**
```javascript
// Request
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "phone": "+27123456789",
  "alternativePhone": "+27987654321", // optional
  "userType": "client", // "client" | "rep" | "both"
  "name": "John Doe",
  "profilePhoto": "base64_or_file_reference" // optional
}

// Success Response (201)
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": "user_001",
      "email": "user@example.com",
      "type": "client",
      "verified": false,
      "phone_verified": false,
      "profile": {
        "name": "John Doe",
        "phone": "+27123456789",
        "alternativePhone": "+27987654321",
        "profilePhoto": {
          "url": "/uploads/profiles/user_001/profile.jpg"
        }
      }
    },
    "requiresVerification": true
  }
}
```

**POST /auth/login**
```javascript
// Request
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

// Success Response (200)
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600,
    "user": {
      "id": "user_001",
      "email": "user@example.com",
      "type": "client",
      "verified": true,
      "phone_verified": false,
      "profile": {
        "name": "John Doe",
        "phone": "+27123456789"
      }
    }
  }
}
```

**POST /auth/verify-phone**
```javascript
// Request
{
  "phone": "+27123456789", // which phone to verify
  "method": "sms" // "sms" | "whatsapp"
}

// Success Response (200)
{
  "success": true,
  "message": "Verification code sent",
  "data": {
    "codeLength": 6,
    "expiresIn": 300,
    "method": "sms"
  }
}
```

**POST /auth/verify-phone/confirm**
```javascript
// Request
{
  "phone": "+27123456789",
  "code": "123456"
}

// Success Response (200)
{
  "success": true,
  "message": "Phone verified successfully",
  "data": {
    "phone_verified": true,
    "verified_phone": "+27123456789"
  }
}
```

#### User Profile Endpoints

**GET /users/me**
```javascript
// Headers: Authorization: Bearer {access_token}

// Success Response (200)
{
  "success": true,
  "data": {
    "id": "user_001",
    "email": "user@example.com",
    "type": "client",
    "verified": true,
    "phone_verified": false,
    "profile": {
      "name": "John Doe",
      "phone": "+27123456789",
      "alternativePhone": "+27987654321",
      "address": "123 Main St, Cape Town",
      "profilePhoto": {
        "url": "/uploads/profiles/user_001/profile.jpg"
      }
    }
  }
}
```

#### Entity Management Endpoints

**GET /entities**
```javascript
// Headers: Authorization: Bearer {access_token}

// Success Response (200)
{
  "success": true,
  "data": [
    {
      "id": "entity_001",
      "name": "ABC Company",
      "type": "Private Company",
      "phone": "+27214567890",
      "email": "info@abccompany.co.za",
      "address": "456 Business Park, Cape Town",
      "registrationNumber": "2020/123456/07",
      "isDefault": true
    }
  ]
}
```

**POST /entities**
```javascript
// Request
{
  "name": "New Company Ltd",
  "type": "Private Company",
  "phone": "+27115551234",
  "email": "info@newcompany.co.za",
  "address": "789 Corporate Ave, Johannesburg",
  "registrationNumber": "2024/789012/07",
  "isDefault": false
}

// Success Response (201)
{
  "success": true,
  "message": "Entity created successfully",
  "data": {
    "id": "entity_003",
    "name": "New Company Ltd",
    "type": "Private Company"
    // ... rest of entity data
  }
}
```

#### Jobs Endpoints

**GET /jobs**
```javascript
// Headers: Authorization: Bearer {access_token}
// Query params: ?status=open&entity_id=entity_001&page=1&limit=10

// Success Response (200)
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "job_001",
        "status": "open",
        "meetingType": "tender_briefing",
        "dateTime": "2024-02-15T10:00:00Z",
        "location": {
          "address": "456 Government Ave, Pretoria",
          "coordinates": [-25.7479, 28.2293]
        },
        "entity": {
          "id": "entity_001",
          "name": "ABC Company"
        },
        "budget": "R150-R300",
        "quotesCount": 3
      }
    ],
    "pagination": {
      "current": 1,
      "total": 5,
      "pages": 1,
      "limit": 10
    }
  }
}
```

**POST /jobs**
```javascript
// Request
{
  "selectedEntityId": "entity_001",
  "meetingType": "tender_briefing",
  "dateTime": "2024-02-15T10:00:00Z",
  "location": {
    "address": "456 Government Ave, Pretoria",
    "coordinates": [-25.7479, 28.2293]
  },
  "requirements": {
    "attire": "formal",
    "ppe": false,
    "tasks": ["sign_register", "ask_questions"]
  },
  "additionalNotes": "Please arrive 15 minutes early",
  "attachments": ["file_id_1", "file_id_2"]
}

// Success Response (201)
{
  "success": true,
  "message": "Job posted successfully",
  "data": {
    "id": "job_003",
    "status": "open"
    // ... rest of job data
  }
}
```

#### Quote Endpoints

**POST /jobs/:jobId/quotes**
```javascript
// Request
{
  "amount": 250.00,
  "currency": "ZAR",
  "transportation": {
    "method": "own_transport",
    "details": "Own vehicle - Toyota Corolla"
  },
  "estimatedArrival": {
    "time": "09:45:00",
    "travelDuration": "45 minutes",
    "departureTime": "09:00:00"
  },
  "specialConsiderations": [
    "Security clearance experience",
    "Familiar with venue"
  ],
  "additionalNotes": "Experience with government briefings",
  "validUntil": "2024-02-14T23:59:59"
}

// Success Response (201)
{
  "success": true,
  "message": "Quote submitted successfully",
  "data": {
    "id": "quote_003",
    "status": "pending"
    // ... rest of quote data
  }
}
```

**GET /quotes**
```javascript
// Headers: Authorization: Bearer {access_token}
// Query params: ?status=pending&page=1&limit=10

// Success Response (200)
{
  "success": true,
  "data": {
    "quotes": [
      {
        "id": "quote_001",
        "jobId": "job_001",
        "amount": 250.00,
        "currency": "ZAR",
        "status": "pending",
        "transportation": {
          "method": "own_transport",
          "details": "Own vehicle - Toyota Corolla"
        },
        "job": {
          "meetingType": "tender_briefing",
          "dateTime": "2024-02-15T10:00:00Z",
          "location": {
            "address": "456 Government Ave, Pretoria"
          }
        }
      }
    ],
    "pagination": {
      "current": 1,
      "total": 12,
      "pages": 2,
      "limit": 10
    }
  }
}
```

#### File Upload Endpoints

**POST /uploads/profile**
```javascript
// FormData with file
// Headers: Authorization: Bearer {access_token}
// Content-Type: multipart/form-data

// Success Response (200)
{
  "success": true,
  "data": {
    "fileId": "file_001",
    "url": "/uploads/profiles/user_001/profile.jpg",
    "filename": "profile.jpg",
    "fileSize": 234567
  }
}
```

**POST /uploads/job-attachments**
```javascript
// FormData with multiple files
// Headers: Authorization: Bearer {access_token}
// Content-Type: multipart/form-data

// Success Response (200)
{
  "success": true,
  "data": [
    {
      "fileId": "file_002",
      "url": "/uploads/jobs/attachments/site_map.pdf",
      "filename": "site_map.pdf",
      "originalName": "Government Building Site Map.pdf",
      "fileSize": 2458000,
      "fileType": "application/pdf"
    }
  ]
}
```

### Error Response Format

**Standard Error Response:**
```javascript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": ["Email is required"],
      "password": ["Password must be at least 8 characters"]
    }
  }
}
```

**Common Error Codes:**
- `VALIDATION_ERROR` (400) - Input validation failed
- `UNAUTHORIZED` (401) - Invalid or expired token
- `FORBIDDEN` (403) - Insufficient permissions
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT` (409) - Resource already exists
- `RATE_LIMITED` (429) - Too many requests
- `INTERNAL_ERROR` (500) - Server error

### HTTP Client Setup

**API Client Configuration:**
```javascript
// utils/apiClient.js
import axios from 'axios';
import { API_CONFIG } from '../config/api';

const apiClient = axios.create({
  baseURL: API_CONFIG[process.env.NODE_ENV].baseURL,
  timeout: API_CONFIG[process.env.NODE_ENV].timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or redirect to login
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);
```

**Service Layer Example:**
```javascript
// services/authService.js
import apiClient from '../utils/apiClient';

export const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      if (response.success) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        return response.data;
      }
    } catch (error) {
      throw new Error(error.error?.message || 'Login failed');
    }
  },

  async verifyPhone(phone, method = 'sms') {
    const response = await apiClient.post('/auth/verify-phone', {
      phone,
      method,
    });
    return response.data;
  },

  async confirmPhoneVerification(phone, code) {
    const response = await apiClient.post('/auth/verify-phone/confirm', {
      phone,
      code,
    });
    return response.data;
  }
};
```

## Mock Data Structure

### Users
```json
{
  "users": [
    {
      "id": "user_001",
      "email": "client@example.com",
      "type": "client",
      "verified": true,
      "phone_verified": false,
      "profile": {
        "name": "John Doe",
        "phone": "+27123456789",
        "alternativePhone": "+27987654321",
        "address": "123 Main St, Cape Town",
        "profilePhoto": {
          "url": "/uploads/profiles/user_001/profile.jpg",
          "filename": "john_doe_profile.jpg",
          "uploadedAt": "2024-02-01T10:00:00",
          "fileSize": 234567
        },
        "entities": [
          {
            "id": "entity_001",
            "name": "ABC Company",
            "address": "456 Business Park, Cape Town",
            "phone": "+27214567890",
            "email": "info@abccompany.co.za",
            "type": "Private Company",
            "registrationNumber": "2020/123456/07",
            "cipcNumber": "2020/123456/07",
            "csdNumber": "MAAA0123456",
            "taxNumber": "9012345678",
            "vatNumber": "4012345678",
            "isDefault": true
          },
          {
            "id": "entity_002",
            "name": "XYZ Holdings",
            "address": "789 Corporate Ave, Johannesburg",
            "phone": "+27115551234",
            "email": "contact@xyzholdings.co.za",
            "type": "Holdings Company",
            "registrationNumber": "2019/654321/07",
            "cipcNumber": "2019/654321/07",
            "csdNumber": null,
            "taxNumber": "9087654321",
            "vatNumber": null,
            "isDefault": false
          }
        ]
      }
    },
    {
      "id": "user_002",
      "email": "rep@example.com",
      "type": "rep",
      "verified": true,
      "phone_verified": true,
      "profile": {
        "name": "Jane Smith",
        "phone": "+27987654321",
        "alternativePhone": null,
        "profilePhoto": {
          "url": "/uploads/profiles/user_002/profile.jpg",
          "filename": "jane_smith_profile.jpg",
          "uploadedAt": "2024-01-15T14:30:00",
          "fileSize": 187654
        },
        "idVerified": true,
        "rating": 4.5,
        "completedJobs": 23
      }
    }
  ]
}
```

### Jobs
```json
{
  "jobs": [
    {
      "id": "job_001",
      "clientId": "user_001",
      "selectedEntityId": "entity_001",
      "status": "open",
      "meetingType": "tender_briefing",
      "location": {
        "address": "456 Government Ave, Pretoria",
        "coordinates": [-25.7479, 28.2293]
      },
      "dateTime": "2024-02-15T10:00:00",
      "budget": "R150-R300",
      "requirements": {
        "attire": "formal",
        "ppe": false,
        "tasks": ["sign_register", "ask_questions"],
        "documents": ["briefing_doc.pdf"]
      },
      "additionalNotes": "Please arrive 15 minutes early for security clearance. Parking is available in basement level B2.",
      "attachments": [
        {
          "id": "attachment_001",
          "fileName": "site_map.pdf",
          "originalName": "Government Building Site Map.pdf",
          "fileSize": 2458000,
          "fileType": "application/pdf",
          "uploadedAt": "2024-02-10T14:30:00",
          "downloadUrl": "/uploads/jobs/job_001/site_map.pdf"
        },
        {
          "id": "attachment_002",
          "fileName": "parking_instructions.jpg",
          "originalName": "Parking Instructions.jpg",
          "fileSize": 567890,
          "fileType": "image/jpeg",
          "uploadedAt": "2024-02-10T14:32:00",
          "downloadUrl": "/uploads/jobs/job_001/parking_instructions.jpg"
        }
      ],
      "quotes": [
        {
          "id": "quote_001",
          "repId": "user_002",
          "jobId": "job_001",
          "amount": 250.00,
          "currency": "ZAR",
          "transportation": {
            "method": "own_transport",
            "details": "Own vehicle - Toyota Corolla"
          },
          "estimatedArrival": {
            "time": "09:45:00",
            "travelDuration": "45 minutes",
            "departureTime": "09:00:00"
          },
          "availability": {
            "confirmed": true,
            "alternativeDate": null
          },
          "additionalNotes": "I have experience with government tender briefings and am familiar with the Pretoria area. I will arrive early to handle security clearance.",
          "quotedAt": "2024-02-12T16:45:00",
          "validUntil": "2024-02-14T23:59:59",
          "status": "pending",
          "specialConsiderations": [
            "Security clearance experience",
            "Familiar with venue",
            "Formal attire available"
          ]
        }
      ]
    }
  ]
}
```

## Zustand State Management Architecture

### Store Organization
```
src/stores/
├── authStore.js          # Authentication & user state
├── entitiesStore.js      # Client entities management
├── jobsStore.js          # Jobs & quotes (client perspective)
├── repStore.js           # Rep-specific state (jobs, quotes, assignments)
├── formStore.js          # Multi-step form states
├── uiStore.js            # UI state (modals, loading, notifications)
└── index.js              # Store exports & utilities
```

### Core Stores Implementation

#### 1. Authentication Store (`authStore.js`)
Manages user authentication, profile data, and session persistence:

```javascript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: (userData) => set({
        user: userData.user,
        accessToken: userData.access_token,
        refreshToken: userData.refresh_token,
        isAuthenticated: true
      }),

      logout: () => set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false
      }),

      updateUser: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      })),

      updatePhoneVerification: (phone, verified) => set((state) => ({
        user: {
          ...state.user,
          phone_verified: verified,
          verified_phone: verified ? phone : null
        }
      }))
    }),
    { name: 'auth-storage' }
  )
)
```

#### 2. Entities Store (`entitiesStore.js`)
Handles client entity management with filtering capabilities:

```javascript
const useEntitiesStore = create((set, get) => ({
  // State
  entities: [],
  selectedEntity: null,
  loading: false,
  error: null,

  // Actions
  setEntities: (entities) => {
    const defaultEntity = entities.find(e => e.isDefault) || entities[0]
    set({
      entities,
      selectedEntity: defaultEntity,
      loading: false
    })
  },

  selectEntity: (entityId) => {
    const entity = get().entities.find(e => e.id === entityId)
    set({ selectedEntity: entity })
  },

  addEntity: (entity) => set((state) => ({
    entities: [...state.entities, entity]
  })),

  updateEntity: (entityId, updates) => set((state) => ({
    entities: state.entities.map(e =>
      e.id === entityId ? { ...e, ...updates } : e
    ),
    selectedEntity: state.selectedEntity?.id === entityId
      ? { ...state.selectedEntity, ...updates }
      : state.selectedEntity
  })),

  setDefault: (entityId) => set((state) => ({
    entities: state.entities.map(e => ({
      ...e,
      isDefault: e.id === entityId
    }))
  }))
}))
```

#### 3. Jobs Store (`jobsStore.js`)
Manages client job posting, quotes, and job lifecycle:

```javascript
const useJobsStore = create((set, get) => ({
  // State
  jobs: [],
  currentJob: null,
  quotes: {}, // { [jobId]: Quote[] }
  loading: false,
  error: null,

  // Actions
  setJobs: (jobs) => set({ jobs, loading: false }),

  addJob: (job) => set((state) => ({
    jobs: [job, ...state.jobs]
  })),

  updateJob: (jobId, updates) => set((state) => ({
    jobs: state.jobs.map(job =>
      job.id === jobId ? { ...job, ...updates } : job
    ),
    currentJob: state.currentJob?.id === jobId
      ? { ...state.currentJob, ...updates }
      : state.currentJob
  })),

  setQuotesForJob: (jobId, quotes) => set((state) => ({
    quotes: {
      ...state.quotes,
      [jobId]: quotes
    }
  })),

  addQuoteToJob: (jobId, quote) => set((state) => ({
    quotes: {
      ...state.quotes,
      [jobId]: [...(state.quotes[jobId] || []), quote]
    }
  })),

  // Computed selectors
  getJobsForEntity: (entityId) => {
    return get().jobs.filter(job => job.selectedEntityId === entityId)
  },

  getQuotesForJob: (jobId) => {
    return get().quotes[jobId] || []
  }
}))
```

#### 4. Rep Store (`repStore.js`)
Handles rep-specific functionality: available jobs, quotes, assignments:

```javascript
const useRepStore = create((set, get) => ({
  // State
  availableJobs: [],
  myQuotes: [],
  myAssignments: [],
  profile: null,
  earnings: { balance: 0, transactions: [] },
  filters: {
    meetingType: null,
    dateRange: null,
    distance: 50,
    minFee: null
  },

  // Actions
  setAvailableJobs: (jobs) => set({ availableJobs: jobs }),

  setMyQuotes: (quotes) => set({ myQuotes: quotes }),

  addQuote: (quote) => set((state) => ({
    myQuotes: [quote, ...state.myQuotes]
  })),

  updateQuote: (quoteId, updates) => set((state) => ({
    myQuotes: state.myQuotes.map(quote =>
      quote.id === quoteId ? { ...quote, ...updates } : quote
    )
  })),

  setMyAssignments: (assignments) => set({ myAssignments: assignments }),

  updateFilters: (filterUpdates) => set((state) => ({
    filters: { ...state.filters, ...filterUpdates }
  })),

  // Computed selectors
  getFilteredJobs: () => {
    const { availableJobs, filters } = get()
    return availableJobs.filter(job => {
      // Apply filtering logic based on filters
      if (filters.meetingType && job.meetingType !== filters.meetingType) return false
      // Add more filter logic as needed
      return true
    })
  }
}))
```

#### 5. Form Store (`formStore.js`)
Manages complex multi-step forms (job posting, quote submission):

```javascript
const useFormStore = create((set, get) => ({
  // Job Posting Form
  jobForm: {
    currentStep: 1,
    data: {
      selectedEntityId: null,
      meetingType: '',
      dateTime: null,
      location: null,
      requirements: {},
      documents: [],
      attachments: [],
      additionalNotes: ''
    }
  },

  // Quote Form
  quoteForm: {
    jobId: null,
    data: {
      amount: null,
      currency: 'ZAR',
      transportation: {},
      estimatedArrival: {},
      specialConsiderations: [],
      additionalNotes: '',
      validUntil: null
    }
  },

  // Job Form Actions
  setJobFormStep: (step) => set((state) => ({
    jobForm: { ...state.jobForm, currentStep: step }
  })),

  updateJobFormData: (updates) => set((state) => ({
    jobForm: {
      ...state.jobForm,
      data: { ...state.jobForm.data, ...updates }
    }
  })),

  resetJobForm: () => set((state) => ({
    jobForm: {
      currentStep: 1,
      data: {
        selectedEntityId: null,
        meetingType: '',
        dateTime: null,
        location: null,
        requirements: {},
        documents: [],
        attachments: [],
        additionalNotes: ''
      }
    }
  })),

  // Quote Form Actions
  initQuoteForm: (jobId) => set((state) => ({
    quoteForm: { ...state.quoteForm, jobId }
  })),

  updateQuoteFormData: (updates) => set((state) => ({
    quoteForm: {
      ...state.quoteForm,
      data: { ...state.quoteForm.data, ...updates }
    }
  })),

  resetQuoteForm: () => set((state) => ({
    quoteForm: {
      jobId: null,
      data: {
        amount: null,
        currency: 'ZAR',
        transportation: {},
        estimatedArrival: {},
        specialConsiderations: [],
        additionalNotes: '',
        validUntil: null
      }
    }
  }))
}))
```

#### 6. UI Store (`uiStore.js`)
Handles global UI state, modals, notifications, and loading states:

```javascript
const useUIStore = create((set, get) => ({
  // State
  modals: {
    entityForm: { open: false, entityId: null, mode: 'create' },
    jobDetails: { open: false, jobId: null },
    quoteDetails: { open: false, quoteId: null },
    phoneVerification: { open: false, phone: null }
  },

  notifications: [],
  loading: {
    global: false,
    jobs: false,
    quotes: false,
    entities: false
  },

  // Actions
  openModal: (modalName, props = {}) => set((state) => ({
    modals: {
      ...state.modals,
      [modalName]: { ...state.modals[modalName], open: true, ...props }
    }
  })),

  closeModal: (modalName) => set((state) => ({
    modals: {
      ...state.modals,
      [modalName]: { ...state.modals[modalName], open: false }
    }
  })),

  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, {
      id: Date.now(),
      timestamp: new Date(),
      ...notification
    }]
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),

  setLoading: (key, isLoading) => set((state) => ({
    loading: { ...state.loading, [key]: isLoading }
  }))
}))
```

### API Integration Pattern

```javascript
// services/api.js - Enhanced with Zustand integration
import { useAuthStore, useUIStore } from '../stores'
import apiClient from '../utils/apiClient'

export const createApiService = (storeName) => {
  const setLoading = (loading) =>
    useUIStore.getState().setLoading(storeName, loading)

  const showNotification = (notification) =>
    useUIStore.getState().addNotification(notification)

  return {
    async fetchWithStore(endpoint, storeAction, errorMessage) {
      setLoading(true)
      try {
        const response = await apiClient.get(endpoint)
        if (response.success) {
          storeAction(response.data)
          return response.data
        }
      } catch (error) {
        showNotification({
          type: 'error',
          message: errorMessage || 'An error occurred',
          details: error.message
        })
        throw error
      } finally {
        setLoading(false)
      }
    }
  }
}

// Usage in services
export const jobService = {
  ...createApiService('jobs'),

  async fetchJobs() {
    const { setJobs } = useJobsStore.getState()
    return this.fetchWithStore('/jobs', setJobs, 'Failed to fetch jobs')
  },

  async postJob(jobData) {
    const { addJob } = useJobsStore.getState()
    const { resetJobForm } = useFormStore.getState()

    try {
      const response = await apiClient.post('/jobs', jobData)
      if (response.success) {
        addJob(response.data)
        resetJobForm()
        useUIStore.getState().addNotification({
          type: 'success',
          message: 'Job posted successfully!'
        })
        return response.data
      }
    } catch (error) {
      useUIStore.getState().addNotification({
        type: 'error',
        message: 'Failed to post job',
        details: error.message
      })
      throw error
    }
  }
}
```

### Component Integration Examples

```javascript
// components/client/JobPostingWizard.jsx
import { useFormStore, useEntitiesStore } from '../../stores'

export const JobPostingWizard = () => {
  const {
    jobForm,
    setJobFormStep,
    updateJobFormData,
    resetJobForm
  } = useFormStore()

  const { entities, selectedEntity } = useEntitiesStore()

  const handleNext = () => {
    if (jobForm.currentStep < 5) {
      setJobFormStep(jobForm.currentStep + 1)
    }
  }

  const handleEntitySelect = (entityId) => {
    updateJobFormData({ selectedEntityId: entityId })
  }

  // Component logic...
}

// components/rep/QuoteCard.jsx
import { useRepStore } from '../../stores'

export const QuoteCard = ({ quote }) => {
  const { updateQuote } = useRepStore()

  const handleWithdraw = async () => {
    try {
      await quoteService.withdrawQuote(quote.id)
      updateQuote(quote.id, { status: 'withdrawn' })
    } catch (error) {
      // Error handling
    }
  }

  // Component rendering...
}
```

### Store Persistence Strategy

- **Authentication**: Persisted to localStorage (tokens, user profile)
- **Entities**: Session-only (refreshed on login)
- **Forms**: Session-only with auto-save to localStorage for long forms
- **UI State**: Session-only (modals, notifications)
- **Job/Rep Data**: Session-only with smart caching

### Performance Optimizations

1. **Selective Subscriptions**: Components only subscribe to needed state slices
2. **Computed Selectors**: Memoized getters for filtered/derived data
3. **Optimistic Updates**: Immediate UI updates with rollback on API failure
4. **Batch Updates**: Group related state changes to prevent unnecessary re-renders

## Page Requirements

### 1. Authentication Pages

#### 1.1 Landing Page (`/`)
- Hero section with value proposition
- "Get Started as Client" and "Work as Rep" CTAs
- How it works section (3-step process)
- Pricing information (20% commission notice)
- Footer with links

#### 1.2 Sign Up (`/signup`)
- Account type selection (Client/Rep/Both)
- Email and password fields
- Phone number (required)
- Alternative phone number (optional)
- **Profile photo upload** (optional):
  - Drag & drop or click to upload
  - Accepted formats: JPG, PNG, WEBP
  - Maximum file size: 5MB
  - Image preview with crop/resize option
  - Default avatar if no photo uploaded
- Terms and conditions checkbox
- Link to login page
- Form validation with error messages

#### 1.3 Login (`/login`)
- Email and password fields
- "Remember me" checkbox
- Forgot password link
- Sign up link
- Error handling for invalid credentials

#### 1.4 Password Reset (`/reset-password`)
- Email input for reset link
- Confirmation message display
- Back to login link

#### 1.5 Phone Verification (`/verify-phone`)
- **Primary phone number** display (from profile)
- **Alternative phone number** display (if provided)
- Phone number selection (if alternative exists):
  - Radio buttons to select which number to verify
  - Option to verify both numbers separately
- Verification method selection:
  - SMS (default)
  - WhatsApp (if available)
- Send verification code button
- 6-digit code input field
- Resend code link (with countdown timer)
- Verification status messages
- Continue to dashboard button (after successful verification)
- Skip for now link (with warning about limitations)

### 2. Client Dashboard (`/client`)

#### 2.1 Dashboard Overview (`/client/dashboard`)
- Welcome message with user name, profile photo, and phone verification status
- Phone verification banner (if not verified):
  - Warning message about limitations
  - "Verify Phone" button
- Entity selector dropdown (shows current default entity)
- Active jobs summary cards (filtered by selected entity):
  - Open jobs count
  - Pending quotes
  - Jobs in progress
  - Completed jobs
- Recent activity feed (entity-filtered)
- Quick action buttons:
  - Post new job
  - View quotes
  - Messages
  - Manage entities

#### 2.2 Post Job (`/client/post-job`)
Multi-step form wizard:

**Step 1: Meeting Details**
- Meeting type dropdown (Tender Briefing, Site Inspection, Community Meeting, Other)
- Entity selection dropdown (required):
  - Shows client's available entities
  - Displays entity name and type
  - Defaults to client's default entity
  - "Manage Entities" link to entity management page
- Date and time picker
- Location address input with map preview
- Meeting agenda textarea

**Step 2: Requirements**
- Tasks checklist:
  - [ ] Sign attendance register
  - [ ] Ask specific questions
  - [ ] Engage in discussions
  - [ ] Take photos
  - [ ] Return documents
- Attire selection (Formal/Smart Casual/Casual)
- PPE requirements checkbox with type selection
- Special instructions textarea

**Step 3: Documents & Attachments**
- **Required Documents Upload** (drag & drop)
  - Documents that must be printed/signed at meeting
  - Documents list with:
    - File name
    - Size
    - Required to print checkbox
    - Remove button
- **Job Attachments Upload** (optional, drag & drop)
  - Additional files for rep reference (maps, photos, instructions, etc.)
  - Accepted file types: PDF, JPG, PNG, DOC, DOCX (max 10MB each)
  - Attachments list with:
    - File name and type icon
    - Size
    - Upload status
    - Remove button
  - Maximum 10 attachments per job

**Step 4: Additional Information**
- Additional notes textarea:
  - Special instructions for the rep
  - Parking information
  - Security requirements
  - Contact person details
  - Any other relevant information
- Character limit indicator (500 characters)

**Step 5: Review & Submit**
- Summary of all details including:
  - Selected entity information
  - Meeting details and requirements
  - Documents to be provided
  - Job attachments (if any)
  - Additional notes
- Edit buttons for each section
- Estimated budget display
- Submit button

#### 2.3 My Jobs (`/client/jobs`)
- Entity filter dropdown (default: All Entities)
- Filter tabs: All | Open | In Progress | Completed | Disputed
- Job cards displaying:
  - Job ID
  - Meeting type and date
  - Entity name (small badge)
  - Location
  - Status badge
  - Number of quotes received
  - Action buttons (View Details, View Quotes, Cancel)
- Pagination or infinite scroll

#### 2.4 Job Details (`/client/jobs/:id`)
- Full job information display including:
  - Selected entity details (name, type, address, phone, email, registration numbers)
  - Meeting details
  - Requirements
  - Additional notes section
- Documents section:
  - Required documents for printing/signing
  - Job attachments with download links
- Status timeline
- Quotes section:
  - **Quote Cards** displaying:
    - Rep profile preview (profile photo, name, rating, completed jobs)
    - **Quote amount in ZAR** (prominently displayed)
    - **Transportation details:**
      - Transportation method badge
      - Vehicle/transport details (if applicable)
      - Expected arrival time
      - Travel duration
    - **Special considerations** (if any):
      - Experience badges
      - Venue familiarity
      - Security clearance
    - Rep's additional notes
    - Quote validity period
    - Quote submission timestamp
    - Accept quote button
    - Contact rep button
    - View full quote details link
- Activity log

#### 2.5 Payment (`/client/payment/:quoteId`)
- **Quote Summary:**
  - Job details recap
  - Selected rep information
  - Quote amount (ZAR)
  - Transportation method and arrival details
  - Special considerations confirmed
- **Rep Details:**
  - Profile information (including profile photo)
  - Rating and experience
  - Contact information
- **Payment Breakdown:**
  - Rep service fee: R250.00
  - Platform fee (20%): R50.00
  - **Total: R300.00**
- **Transportation Confirmation:**
  - Expected arrival time display
  - Transportation method confirmation
- PayFast payment simulation
- Terms acceptance checkbox
- **Pay Now** button

#### 2.6 Entity Management (`/client/entities`)
- Entity list table/cards displaying:
  - Entity name and type
  - Phone number and email
  - Address
  - Registration numbers (CIPC, CSD when available)
  - Default entity badge
  - Actions (Edit, Delete, Set as Default)
- Add new entity button
- Entity form modal:
  - **Basic Information**
    - Entity name (required)
    - Entity type dropdown (Private Company, Holdings Company, NGO, Government, Other)
    - Phone number (required)
    - Email address (required)
    - Address (required)
  - **Registration Numbers** (all optional)
    - CIPC Registration Number
    - CSD Supplier Number
    - SARS Tax Number
    - VAT Registration Number
  - Set as default checkbox
- Delete confirmation dialog
- Minimum of 1 entity required (cannot delete all)

#### 2.7 Messages (`/client/messages`)
- Inbox layout with sidebar:
  - Conversation list
  - Unread indicator
  - Last message preview
- Message thread view:
  - Rep name and job reference
  - Message history
  - Input field with send button
  - Attachment support

### 3. Rep Dashboard (`/rep`)

#### 3.1 Dashboard Overview (`/rep/dashboard`)
- Welcome message with profile photo and verification status
- Earnings summary:
  - This month
  - Total earnings
  - Pending payments
- Available jobs in your area count
- Performance metrics:
  - Rating
  - Completed jobs
  - Response rate
- Quick actions:
  - Browse jobs
  - View my quotes
  - Update availability
  - View calendar

#### 3.2 Profile Setup (`/rep/profile`)
**Basic Information**
- Personal details form
- Contact information:
  - Primary phone number (required)
  - Alternative phone number (optional)
  - Email address
- **Profile photo upload**:
  - Current photo display (or default avatar)
  - Upload new photo button
  - Drag & drop or click to upload
  - Accepted formats: JPG, PNG, WEBP (max 5MB)
  - Image cropping/resizing tool
  - Remove photo option
- Phone verification status for both numbers (if applicable)
- Verify phone buttons for each number

**Verification**
- ID verification upload
- Proof of address (optional)
- Education certificates (optional)
- Professional certifications (optional)
- Verification status indicators

**Service Settings**
- Coverage area:
  - Home address input
  - Service radius slider (km)
  - Map preview of coverage area
- Transportation type selection
- Language proficiencies multi-select
- Availability calendar

#### 3.3 Browse Jobs (`/rep/jobs`)
- Map view / List view toggle
- Filter sidebar:
  - Meeting type
  - Date range
  - Distance from you
  - Minimum fee
- Job cards showing:
  - Meeting type and date
  - Location with distance
  - Basic requirements
  - Attachments count badge (if any)
  - Estimated fee range
  - Quote button
  - Save for later button

#### 3.4 Submit Quote (`/rep/quote/:jobId`)
- Job summary display including:
  - Meeting details
  - Requirements
  - Client attachments section with download links
- **Quote Details Form:**
  - Quote amount input (ZAR) with currency indicator
  - **Transportation Method** (required dropdown):
    - Own transport
    - Public transport (taxi/bus)
    - E-hailing (Uber/Bolt)
    - Walk to venue
    - Other (with text field)
  - Transportation details input (e.g., "Own vehicle - Honda Civic")
  - **Arrival Information:**
    - Expected arrival time picker
    - Travel duration estimate (auto-calculated or manual input)
    - Departure time (auto-calculated based on travel duration)
  - Availability confirmation for date checkbox
  - **Special Considerations** (optional checkboxes):
    - Experience with similar meetings
    - Familiar with venue/area
    - Security clearance experience
    - Formal attire available
    - Other relevant skills
  - Additional notes textarea (500 character limit)
  - Quote validity period (defaults to 48 hours)
- Submit quote button
- Terms reminder

#### 3.5 My Quotes (`/rep/quotes`)
- **Quote Status Tabs:** Pending | Accepted | Rejected | Expired
- **Quote Cards** displaying:
  - Job details summary (meeting type, date, location)
  - Client entity name and profile photo (if available)
  - **Your Quote:** R250.00 ZAR
  - **Transportation:** Own transport - Expected arrival 09:45
  - Quote status badge
  - Quote submission date
  - Quote validity period
  - **Actions based on status:**
    - Pending: Edit Quote, Withdraw Quote
    - Accepted: View Assignment, Contact Client
    - Rejected: View Feedback (if available), Resubmit (if allowed)
    - Expired: Resubmit Quote (if job still open)

#### 3.6 My Assignments (`/rep/assignments`)
- Tabs: Upcoming | In Progress | Completed
- Assignment cards:
  - Full job details
  - **Your accepted quote details:**
    - Quote amount: R250.00 ZAR
    - Transportation method and arrival time
    - Your quoted travel duration
  - Client entity name and contact details (after confirmation)
  - Additional notes from client
  - Required documents download section
  - Job attachments download section (if any)
  - Action buttons based on status:
    - Confirm attendance
    - Upload location proof
    - Submit completion report

#### 3.7 Job Execution (`/rep/execute/:jobId`)
**Pre-Meeting**
- **Your Quote Summary:**
  - Amount: R250.00 ZAR
  - Planned transportation: Own transport
  - Expected arrival: 09:45
  - Departure reminder: Leave by 09:00
- Checklist display
- Required documents download section
- Job attachments download section:
  - List of all client attachments
  - Download all as ZIP option
  - Individual file download links
  - File type icons and sizes
- Meeting details reminder
- Client entity contact information
- Additional notes from client (highlighted section)
- **Confirm departure** button (updates status to "En route")

**At Meeting**
- Location verification:
  - Get current location button
  - Map display
  - Confirm location button
- Quick reference to requirements

**Post-Meeting**
- Completion form:
  - Attendance confirmation
  - Photo uploads (if required)
  - Meeting notes textarea
  - Documents upload (if any)
  - Issues encountered textarea
- Submit completion button

#### 3.8 Earnings (`/rep/earnings`)
- Balance display
- Transaction history table:
  - Date
  - Job ID
  - Client
  - Amount
  - Status
- Withdrawal request button
- Payment method settings

### 4. Shared Components

#### 4.1 Navigation
**Client Navigation**
- Logo
- Dashboard
- Post Job
- My Jobs
- Entities
- Messages
- Profile (with profile photo and phone verification status indicator)

**Rep Navigation**
- Logo
- Dashboard
- Browse Jobs
- My Quotes
- My Assignments
- Earnings
- Profile (with profile photo and verification status indicators)