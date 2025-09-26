# Meetings4U (M4U)

## Background
This is a service that's used to connect people that want to be represented by others in a meeting.

## Technology Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **State Management**: Zustand
- **Form Validation**: React Hook Form + Zod
- **Icons**: Lucide React
- **Styling**: Custom theme with navy blue (#1e40af) and orange (#f97316) accent colors
- **Deployment**: Vercel (planned)
- **Backend**: Supabase (planned)
- **Email**: Resend (planned)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd meetings4u

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Server
The app runs on `http://localhost:3000`

## Demo Accounts

The application includes demo accounts for testing:

**Client Account:**
- Email: `client@example.com`
- Password: `password123`
- Features: Post jobs, manage entities, view quotes

**Representative Account:**
- Email: `rep@example.com`
- Password: `password123`
- Features: Browse jobs, submit quotes, manage assignments

## Current Implementation Status

### ✅ Completed Features
**Client Features:**
- **Authentication System**: Login, signup, phone verification
- **Client Dashboard**: Overview, stats, recent activity, quick actions
- **Job Management**: Job listing with filters, detailed job view with quotes
- **Entity Management**: Basic entity display and selection
- **Quote System**: Quote display with rep profiles, quote acceptance workflow

**Representative Features:**
- **Rep Dashboard**: Comprehensive dashboard with earnings, performance stats, available jobs
- **Job Browsing**: Advanced job filtering, search, and distance calculations
- **Quote Management**: Submit, track, edit, and withdraw quotes with detailed views
- **Assignment Tracking**: View active and completed assignments
- **Earnings Overview**: Balance, transactions, and payment tracking

**Technical Features:**
- **Responsive Design**: Mobile-friendly interface with consistent styling
- **State Management**: Zustand stores for auth, jobs, entities, reps, and UI
- **Mock Data**: Comprehensive dataset with 6+ jobs, multiple users, entities, quotes
- **Component System**: Reusable UI components with navy/orange theme

### 🚧 In Progress (Placeholder Pages)
- **Job Posting Wizard**: Multi-step form for posting jobs
- **Entity Management**: Full CRUD operations for client entities
- **Quote Submission**: Advanced quote submission forms with validation
- **Messaging System**: Client-rep communication
- **Payment Integration**: PayFast integration and payment processing
- **File Management**: Document upload and management system
- **Rep Profile**: Complete profile management and verification

### 🎨 Design System
- **Colors**: Navy blue primary (#1e40af), orange accent (#f97316)
- **Typography**: Inter font family
- **Style**: Flat design, no gradients
- **Components**: Custom UI components with consistent styling

## Definitions
Client - Person paying for someone else to attend meetings
Rep - An independant representative who'll represent the client on a once off basis
Quote - Amount quoted by Rep to a Client
Entity - The person or organisation being represented in the meeting

## How It Works
Clients fill a form on the platform that describes the meeting they need help with.
Once submitted, the platform emails the related info to reps who work that particular area where the meeting will be held.
Reps give quotes by opening the job card link and fill in how much they'd charge to attend the meeting.
Once a rep is done filling the quote, it's emailed back to the client.
Client accepts a specific quote by clicking on its link & pays through payfast
The winning rep is than notified of the payment and they are given the full details of the job.
The winning rep needs to confirm that they'll take the job.
If a Rep doesn't confirm in 12 hours, the job is cancelled for the Rep and the Client needs to pick a new rep for the job. If the the new rep's price is higher, the client will have to add funds. If lower, the change will be left as a balance on the platform.
Rep goes to the meeting & does the required activity and gets proof of it.
Rep must confirm that they're at the right location by uploading their location on platform
Rep uploads the required details and or docs to the platform after meeting is finished gives feedback to client.
The system will then notifify the client that the work has been done. They now need to approve it.
If the Client disputes the work, then the platform's dispute resolution process will be handled manually.
If a client doesn't respond in 2 days, the funds are automatically released.
Rep is paid, with system taking a 20% cut
Once the funds are released, the client is asked to rate the rep
The rep is also asked to rate the client.


## Types of Meetings to be supported
- Tender briefings (focus area)
- Site inspections
- Community meetings
- Other

## Estimated Costs
- R150 or more depending on the reps

## Business Model
Take % of funds paid by client

## Clients Requirements
### Meeting details
- Where is the meeting happening (Address)
- Meeting agenda
- To sign as who?
- Does rep need to ask or comment about anything?
- Required feedback after attending meeting?
- Any uploaded docs for rep to have
- Which docs must a rep print

### Required Meeting Tasks
 - Just sign attendance register
 - Ask specific questions
 - Engage in any shape or form
 - Wear specific clothing (formal or smart caual)
 - Protective Required (PPE)? What type e.g vest, boots, and hard hat
 - Required photos, if any
 - Anything to return or deliver to the client?

### Client Restricitons
- Reps can only be shown full client details after payment has been made.
- Before payment, reps will be shown a basic description of meeting (Area where it's happening, and requirements)
- Payments to be made only inside the platform
- Communication to also be made only inside the platform
- Can only accept a single quote for a specific meeting/job

## Reps Requirements
Define the following:
- Availability
- Skills or eduction
- Experience
- Number of meetings/briefings attended (since joining the platform)
- Areas they cover (Home address plus a specified number of kilometers)
- Transport type (private, public, ehailing)
- Language Proficiencies if multilingual

## Rep Restrictions
- Can only represent a single entity (person or business) per meeting
- No alcohol consumption on the day
- Respect dress requirements
- Reps can handle multiple jobs provied they only do a single meeting per day.

## Rep Verification
- Email verification
- Phone number verification
- ID verification (SA ID, Passport, or Driver's Licence)
- Proof of Address (optional)
- Educational Qualifications (optional)
- Professional Certifications (optional)


## Dispute Resolution
- The funds paid by client won't be released to the rep if there's a dispute.
- The platform's support team will decide how to resolve the dispute.
- Possible outcomes will be but not limited to:
    - Client keeps all of their funds as a balance on the plaform
    - Rep is paid a portion of the funds
    - Rep is paid all funds due to them after that platform has taken its commission.

## Required Forms
- Rep registration form
- Client registration form (Personal & Business Details)

## User Account Management
- Users can sign up a both Clients or Reps or just one
- Clients need to upload their personal & business info

## User Features
- Client dashboard
- Rep dashboard
- Payment gateway integration (PayFast)
- Client and Rep inboxes. Messages will be between each other and also from the platform
- Notifications: On the portal, email, and by SMS (optional)
- Area matching system: Client requests must only be shown to reps that cover the area where meeting will be held
- A ratings system (1 to 5 stars): For clients and reps to rate each other
- Location feature for reps to verify their location
- Camera feature for all users to take pictures & upload them to platform
- User profilte page for both clients and reps

## Admin Features
- Admin dashboard


## Future Roadmap
- Add OAuth login using Google

## Emails sent by platform

Transactional Emails
- Job notifications
- Quotes to clients
- Job completion
- Dispute notifications
- Rating requests
- Withdrawal requests

System Emails
- Welcome emails
- Email verivication
- Password resets
- Account updates
