// Mock users data
export const mockUsers = [
  {
    id: "user_001",
    email: "client@example.com",
    type: "client",
    verified: true,
    phone_verified: false,
    profile: {
      name: "John Doe",
      phone: "+27123456789",
      alternativePhone: "+27987654321",
      address: "123 Main St, Cape Town",
      profilePhoto: {
        url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        filename: "john_doe_profile.jpg",
        uploadedAt: "2024-02-01T10:00:00",
        fileSize: 234567
      }
    }
  },
  {
    id: "user_002",
    email: "rep@example.com",
    type: "rep",
    verified: true,
    phone_verified: true,
    profile: {
      name: "Jane Smith",
      phone: "+27987654321",
      alternativePhone: null,
      profilePhoto: {
        url: "https://images.unsplash.com/photo-1494790108755-2616b612b5b8?w=150&h=150&fit=crop&crop=face",
        filename: "jane_smith_profile.jpg",
        uploadedAt: "2024-01-15T14:30:00",
        fileSize: 187654
      },
      idVerified: true,
      rating: 4.5,
      completedJobs: 23
    }
  },
  {
    id: "user_003",
    email: "client2@example.com",
    type: "client",
    verified: true,
    phone_verified: true,
    profile: {
      name: "Sarah Johnson",
      phone: "+27812345678",
      alternativePhone: null,
      address: "789 Business Street, Johannesburg",
      profilePhoto: {
        url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        filename: "sarah_profile.jpg",
        uploadedAt: "2024-01-20T09:15:00",
        fileSize: 198765
      }
    }
  },
  {
    id: "user_004",
    email: "client3@example.com",
    type: "client",
    verified: true,
    phone_verified: false,
    profile: {
      name: "Michael Chen",
      phone: "+27723456789",
      alternativePhone: "+27834567890",
      address: "456 Corporate Ave, Cape Town",
      profilePhoto: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        filename: "michael_profile.jpg",
        uploadedAt: "2024-02-05T14:20:00",
        fileSize: 203456
      }
    }
  }
];

// Mock entities data
export const mockEntities = [
  {
    id: "entity_001",
    name: "ABC Company",
    address: "456 Business Park, Cape Town",
    phone: "+27214567890",
    email: "info@abccompany.co.za",
    type: "Private Company",
    registrationNumber: "2020/123456/07",
    cipcNumber: "2020/123456/07",
    csdNumber: "MAAA0123456",
    taxNumber: "9012345678",
    vatNumber: "4012345678",
    isDefault: true
  },
  {
    id: "entity_002",
    name: "XYZ Holdings",
    address: "789 Corporate Ave, Johannesburg",
    phone: "+27115551234",
    email: "contact@xyzholdings.co.za",
    type: "Holdings Company",
    registrationNumber: "2019/654321/07",
    cipcNumber: "2019/654321/07",
    csdNumber: null,
    taxNumber: "9087654321",
    vatNumber: null,
    isDefault: false
  },
  {
    id: "entity_003",
    name: "Johnson Industries",
    address: "321 Industrial Road, Port Elizabeth",
    phone: "+27415551234",
    email: "info@johnsonind.co.za",
    type: "Private Company",
    registrationNumber: "2021/789012/07",
    cipcNumber: "2021/789012/07",
    csdNumber: "MAAA0789012",
    taxNumber: "9012387654",
    vatNumber: "4012387654",
    isDefault: false
  },
  {
    id: "entity_004",
    name: "Chen Consulting",
    address: "654 Consulting Plaza, Sandton",
    phone: "+27115559876",
    email: "michael@chenconsult.co.za",
    type: "Professional Services",
    registrationNumber: "2022/456789/07",
    cipcNumber: "2022/456789/07",
    csdNumber: null,
    taxNumber: "9087651234",
    vatNumber: null,
    isDefault: false
  }
];

// Mock jobs data
export const mockJobs = [
  {
    id: "job_001",
    clientId: "user_001",
    selectedEntityId: "entity_001",
    status: "open",
    meetingType: "tender_briefing",
    location: {
      address: "456 Government Ave, Pretoria",
      coordinates: [-25.7479, 28.2293]
    },
    dateTime: "2024-12-15T10:00:00",
    budget: "R150-R300",
    requirements: {
      attire: "formal",
      ppe: false,
      tasks: ["sign_register", "ask_questions"],
      documents: ["briefing_doc.pdf"]
    },
    additionalNotes: "Please arrive 15 minutes early for security clearance. Parking is available in basement level B2.",
    attachments: [
      {
        id: "attachment_001",
        fileName: "site_map.pdf",
        originalName: "Government Building Site Map.pdf",
        fileSize: 2458000,
        fileType: "application/pdf",
        uploadedAt: "2024-02-10T14:30:00",
        downloadUrl: "/uploads/jobs/job_001/site_map.pdf"
      }
    ],
    createdAt: "2024-02-10T09:00:00"
  },
  {
    id: "job_002",
    clientId: "user_001",
    selectedEntityId: "entity_001",
    status: "in_progress",
    meetingType: "site_inspection",
    location: {
      address: "123 Construction Site, Durban",
      coordinates: [-29.8587, 31.0218]
    },
    dateTime: "2024-12-20T14:00:00",
    budget: "R200-R400",
    requirements: {
      attire: "smart_casual",
      ppe: true,
      tasks: ["sign_register", "take_photos", "ask_questions"],
      documents: []
    },
    additionalNotes: "Safety boots and hard hat required. Report on site progress needed.",
    attachments: [],
    createdAt: "2024-02-08T11:00:00"
  },
  {
    id: "job_003",
    clientId: "user_001",
    selectedEntityId: "entity_002",
    status: "completed",
    meetingType: "community_meeting",
    location: {
      address: "Community Hall, Soweto",
      coordinates: [-26.2678, 27.8580]
    },
    dateTime: "2024-12-18T14:00:00",
    budget: "R150-R250",
    requirements: {
      attire: "smart_casual",
      ppe: false,
      tasks: ["sign_register", "engage_discussions", "ask_questions"],
      documents: ["community_agenda.pdf"]
    },
    additionalNotes: "Community meeting about local development project. Friendly environment.",
    attachments: [],
    createdAt: "2024-09-15T09:00:00"
  },
  {
    id: "job_004",
    clientId: "user_003",
    selectedEntityId: "entity_003",
    status: "open",
    meetingType: "site_inspection",
    location: {
      address: "456 Industrial Park, Port Elizabeth",
      coordinates: [-33.9608, 25.6022]
    },
    dateTime: "2024-12-30T09:00:00",
    budget: "R300-R500",
    requirements: {
      attire: "formal",
      ppe: true,
      tasks: ["sign_register", "take_photos", "ask_questions", "document_inspection"],
      documents: ["safety_checklist.pdf", "inspection_form.pdf"]
    },
    additionalNotes: "Industrial site inspection. Must have safety certification. Hard hat, safety boots, and high-vis vest required.",
    attachments: [
      {
        id: "attachment_003",
        fileName: "site_layout.pdf",
        originalName: "Industrial Site Layout.pdf",
        fileSize: 1850000,
        fileType: "application/pdf",
        uploadedAt: "2024-09-22T11:00:00",
        downloadUrl: "/uploads/jobs/job_004/site_layout.pdf"
      }
    ],
    createdAt: "2024-09-22T10:00:00"
  },
  {
    id: "job_005",
    clientId: "user_003",
    selectedEntityId: "entity_003",
    status: "open",
    meetingType: "tender_briefing",
    location: {
      address: "Municipal Offices, Bloemfontein",
      coordinates: [-29.0852, 26.1596]
    },
    dateTime: "2025-01-05T10:30:00",
    budget: "R250-R350",
    requirements: {
      attire: "formal",
      ppe: false,
      tasks: ["sign_register", "ask_questions", "collect_documents"],
      documents: ["tender_brief.pdf"]
    },
    additionalNotes: "Municipal tender briefing for road construction project. Arrive 15 minutes early for security clearance.",
    attachments: [],
    createdAt: "2024-09-25T14:30:00"
  },
  {
    id: "job_006",
    clientId: "user_004",
    selectedEntityId: "entity_004",
    status: "open",
    meetingType: "other",
    location: {
      address: "Conference Center, Sandton",
      coordinates: [-26.1076, 28.0567]
    },
    dateTime: "2025-01-08T13:00:00",
    budget: "R200-R300",
    requirements: {
      attire: "formal",
      ppe: false,
      tasks: ["sign_register", "take_notes", "networking"],
      documents: []
    },
    additionalNotes: "Annual industry conference. Network with key players and take detailed notes on presentations.",
    attachments: [],
    createdAt: "2024-09-24T16:00:00"
  }
];

// Mock quotes data
export const mockQuotes = [
  {
    id: "quote_001",
    repId: "user_002",
    jobId: "job_001",
    amount: 250.00,
    currency: "ZAR",
    transportation: {
      method: "own_transport",
      details: "Own vehicle - Toyota Corolla"
    },
    estimatedArrival: {
      time: "09:45:00",
      travelDuration: "45 minutes",
      departureTime: "09:00:00"
    },
    availability: {
      confirmed: true,
      alternativeDate: null
    },
    additionalNotes: "I have experience with government tender briefings and am familiar with the Pretoria area. I will arrive early to handle security clearance.",
    quotedAt: "2024-02-12T16:45:00",
    validUntil: "2024-12-14T23:59:59",
    status: "pending",
    specialConsiderations: [
      "Security clearance experience",
      "Familiar with venue",
      "Formal attire available"
    ]
  },
  {
    id: "quote_002",
    repId: "user_002",
    jobId: "job_001",
    amount: 280.00,
    currency: "ZAR",
    transportation: {
      method: "public_transport",
      details: "Gautrain to Pretoria"
    },
    estimatedArrival: {
      time: "09:30:00",
      travelDuration: "90 minutes",
      departureTime: "08:00:00"
    },
    availability: {
      confirmed: true,
      alternativeDate: null
    },
    additionalNotes: "Public transport option with earlier arrival. Very familiar with government processes.",
    quotedAt: "2024-02-13T08:15:00",
    validUntil: "2024-12-14T23:59:59",
    status: "pending",
    specialConsiderations: [
      "Government meeting experience",
      "Early arrival guaranteed"
    ]
  },
  {
    id: "quote_003",
    repId: "user_002",
    jobId: "job_003",
    amount: 180.00,
    currency: "ZAR",
    transportation: {
      method: "own_transport",
      details: "Own vehicle - Honda Civic"
    },
    estimatedArrival: {
      time: "13:45:00",
      travelDuration: "30 minutes",
      departureTime: "13:15:00"
    },
    availability: {
      confirmed: true,
      alternativeDate: null
    },
    additionalNotes: "Local meeting, very familiar with the area. Can arrive earlier if needed.",
    quotedAt: "2024-09-20T10:30:00",
    validUntil: "2024-12-25T23:59:59",
    status: "accepted",
    specialConsiderations: [
      "Local area expert",
      "Flexible timing"
    ]
  },
  {
    id: "quote_004",
    repId: "user_002",
    jobId: "job_004",
    amount: 320.00,
    currency: "ZAR",
    transportation: {
      method: "own_transport",
      details: "Own vehicle - Toyota Corolla"
    },
    estimatedArrival: {
      time: "08:45:00",
      travelDuration: "60 minutes",
      departureTime: "07:45:00"
    },
    availability: {
      confirmed: true,
      alternativeDate: null
    },
    additionalNotes: "Construction site experience, own PPE equipment available.",
    quotedAt: "2024-09-22T14:20:00",
    validUntil: "2024-12-28T23:59:59",
    status: "rejected",
    specialConsiderations: [
      "PPE equipment available",
      "Construction experience",
      "Safety certified"
    ]
  }
];

// Mock notifications
export const mockNotifications = [
  {
    id: "notif_001",
    type: "info",
    message: "New quote received for your tender briefing meeting",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false
  },
  {
    id: "notif_002",
    type: "success",
    message: "Phone verification completed successfully",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true
  }
];

// Meeting types
export const meetingTypes = [
  { value: 'tender_briefing', label: 'Tender Briefing' },
  { value: 'site_inspection', label: 'Site Inspection' },
  { value: 'community_meeting', label: 'Community Meeting' },
  { value: 'other', label: 'Other' }
];

// Entity types
export const entityTypes = [
  { value: 'private_company', label: 'Private Company' },
  { value: 'holdings_company', label: 'Holdings Company' },
  { value: 'ngo', label: 'NGO' },
  { value: 'government', label: 'Government' },
  { value: 'other', label: 'Other' }
];

// Attire options
export const attireOptions = [
  { value: 'formal', label: 'Formal' },
  { value: 'smart_casual', label: 'Smart Casual' },
  { value: 'casual', label: 'Casual' }
];

// Transportation methods
export const transportationMethods = [
  { value: 'own_transport', label: 'Own Transport' },
  { value: 'public_transport', label: 'Public Transport' },
  { value: 'ehailing', label: 'E-hailing (Uber/Bolt)' },
  { value: 'walk', label: 'Walk to Venue' },
  { value: 'other', label: 'Other' }
];

// Mock rep assignments
export const mockAssignments = [
  {
    id: "assignment_001",
    repId: "user_002",
    jobId: "job_003",
    quoteId: "quote_003",
    status: "completed",
    amount: 180.00,
    currency: "ZAR",
    assignedAt: "2024-09-20T11:00:00",
    completedAt: "2024-12-18T16:30:00",
    clientId: "user_001",
    transportation: "Own vehicle - Honda Civic",
    meetingDetails: {
      type: "Community Meeting",
      dateTime: "2024-12-18T14:00:00",
      location: "Community Hall, Soweto",
      duration: "2 hours"
    },
    completionReport: {
      arrived: true,
      arrivalTime: "13:45:00",
      tasksCompleted: ["sign_register", "engage_discussions", "ask_questions"],
      photos: ["meeting_photo_1.jpg", "attendance_register.jpg"],
      notes: "Successfully attended community meeting. Good engagement from residents about development project. No major concerns raised.",
      documentsCollected: ["meeting_minutes.pdf"]
    }
  },
  {
    id: "assignment_002",
    repId: "user_002",
    jobId: "job_002",
    quoteId: "quote_005",
    status: "in_progress",
    amount: 350.00,
    currency: "ZAR",
    assignedAt: "2024-12-15T10:30:00",
    completedAt: null,
    clientId: "user_001",
    transportation: "Own vehicle - Toyota Corolla",
    meetingDetails: {
      type: "Site Inspection",
      dateTime: "2024-12-20T14:00:00",
      location: "123 Construction Site, Durban",
      duration: "3 hours"
    },
    completionReport: null
  },
  {
    id: "assignment_003",
    repId: "user_002",
    jobId: "job_001",
    quoteId: "quote_001",
    status: "upcoming",
    amount: 250.00,
    currency: "ZAR",
    assignedAt: "2024-12-24T09:30:00",
    completedAt: null,
    clientId: "user_001",
    transportation: "Own vehicle - Toyota Corolla",
    meetingDetails: {
      type: "Tender Briefing",
      dateTime: "2025-01-15T10:00:00",
      location: "456 Government Ave, Pretoria",
      duration: "1.5 hours"
    },
    completionReport: null
  },
  {
    id: "assignment_004",
    repId: "user_002",
    jobId: "job_005",
    quoteId: "quote_006",
    status: "upcoming",
    amount: 300.00,
    currency: "ZAR",
    assignedAt: "2024-12-23T14:20:00",
    completedAt: null,
    clientId: "user_003",
    transportation: "Public transport - Taxi",
    meetingDetails: {
      type: "Tender Briefing",
      dateTime: "2025-01-05T10:30:00",
      location: "Municipal Offices, Bloemfontein",
      duration: "2 hours"
    },
    completionReport: null
  },
  {
    id: "assignment_005",
    repId: "user_002",
    jobId: "job_006",
    quoteId: "quote_007",
    status: "upcoming",
    amount: 275.00,
    currency: "ZAR",
    assignedAt: "2024-12-22T11:15:00",
    completedAt: null,
    clientId: "user_004",
    transportation: "E-hailing - Uber",
    meetingDetails: {
      type: "Conference",
      dateTime: "2025-01-08T13:00:00",
      location: "Conference Center, Sandton",
      duration: "4 hours"
    },
    completionReport: null
  },
  {
    id: "assignment_006",
    repId: "user_002",
    jobId: "job_007",
    quoteId: "quote_008",
    status: "completed",
    amount: 320.00,
    currency: "ZAR",
    assignedAt: "2024-11-15T08:45:00",
    completedAt: "2024-12-10T17:30:00",
    clientId: "user_003",
    transportation: "Own vehicle - Toyota Corolla",
    meetingDetails: {
      type: "Site Inspection",
      dateTime: "2024-12-10T09:00:00",
      location: "Industrial Complex, Johannesburg",
      duration: "6 hours"
    },
    completionReport: {
      arrived: true,
      arrivalTime: "08:45:00",
      tasksCompleted: ["sign_register", "take_photos", "document_inspection", "ask_questions"],
      photos: ["site_overview.jpg", "safety_equipment.jpg", "register_signature.jpg"],
      notes: "Comprehensive site inspection completed. All safety protocols followed. Equipment in good condition. Minor maintenance recommendations noted.",
      documentsCollected: ["inspection_checklist.pdf", "safety_report.pdf"]
    }
  },
  {
    id: "assignment_007",
    repId: "user_002",
    jobId: "job_008",
    quoteId: "quote_009",
    status: "completed",
    amount: 200.00,
    currency: "ZAR",
    assignedAt: "2024-11-20T10:00:00",
    completedAt: "2024-12-05T15:45:00",
    clientId: "user_001",
    transportation: "Public transport - Bus",
    meetingDetails: {
      type: "Community Meeting",
      dateTime: "2024-12-05T13:00:00",
      location: "Town Hall, Cape Town",
      duration: "2.5 hours"
    },
    completionReport: {
      arrived: true,
      arrivalTime: "12:50:00",
      tasksCompleted: ["sign_register", "engage_discussions", "take_notes"],
      photos: ["town_hall_meeting.jpg", "attendance_sheet.jpg"],
      notes: "Productive community meeting about local infrastructure improvements. Good turnout from residents. Several constructive suggestions made.",
      documentsCollected: ["meeting_agenda.pdf", "proposal_summary.pdf"]
    }
  },
  {
    id: "assignment_008",
    repId: "user_002",
    jobId: "job_009",
    quoteId: "quote_010",
    status: "in_progress",
    amount: 280.00,
    currency: "ZAR",
    assignedAt: "2024-12-20T16:30:00",
    completedAt: null,
    clientId: "user_004",
    transportation: "Own vehicle - Toyota Corolla",
    meetingDetails: {
      type: "Site Inspection",
      dateTime: "2024-12-28T11:00:00",
      location: "Commercial Property, Durban",
      duration: "3 hours"
    },
    completionReport: null
  }
];

// Mock rep earnings
export const mockEarnings = {
  balance: 1240.50,
  totalEarnings: 4680.00,
  thisMonth: 530.00,
  pendingPayments: 350.00,
  transactions: [
    {
      id: "trans_001",
      type: "payment_received",
      amount: 180.00,
      description: "Community meeting - Job #job_003",
      date: "2024-12-19T09:00:00",
      status: "completed",
      jobId: "job_003"
    },
    {
      id: "trans_002",
      type: "payment_pending",
      amount: 350.00,
      description: "Site inspection - Job #job_002",
      date: "2024-12-20T16:00:00",
      status: "pending",
      jobId: "job_002"
    },
    {
      id: "trans_003",
      type: "payment_received",
      amount: 250.00,
      description: "Tender briefing - Job #job_007",
      date: "2024-12-10T10:30:00",
      status: "completed",
      jobId: "job_007"
    },
    {
      id: "trans_004",
      type: "withdrawal",
      amount: -800.00,
      description: "Bank transfer withdrawal",
      date: "2024-12-05T14:20:00",
      status: "completed"
    }
  ]
};

// Mock rep profile data
export const mockRepProfile = {
  id: "user_002",
  personalInfo: {
    name: "Jane Smith",
    email: "rep@example.com",
    phone: "+27987654321",
    alternativePhone: null,
    address: "456 Rep Street, Cape Town",
    idNumber: "8512155432083",
    profilePhoto: {
      url: "https://images.unsplash.com/photo-1494790108755-2616b612b5b8?w=150&h=150&fit=crop&crop=face"
    }
  },
  verification: {
    idVerified: true,
    phoneVerified: true,
    addressVerified: true,
    educationVerified: false,
    professionalCertsVerified: true
  },
  serviceSettings: {
    homeAddress: "456 Rep Street, Cape Town",
    serviceRadius: 50, // km
    transportationType: "own_transport",
    vehicleDetails: "Toyota Corolla, Silver, CA-123-456",
    languages: ["English", "Afrikaans", "isiXhosa"],
    specialSkills: ["Government meetings", "Construction sites", "Community engagement"]
  },
  statistics: {
    rating: 4.5,
    totalJobs: 23,
    completedJobs: 21,
    cancelledJobs: 2,
    responseRate: 95,
    onTimeRate: 98,
    clientSatisfaction: 4.6
  },
  availability: {
    workingHours: {
      monday: { available: true, start: "08:00", end: "17:00" },
      tuesday: { available: true, start: "08:00", end: "17:00" },
      wednesday: { available: true, start: "08:00", end: "17:00" },
      thursday: { available: true, start: "08:00", end: "17:00" },
      friday: { available: true, start: "08:00", end: "17:00" },
      saturday: { available: false, start: null, end: null },
      sunday: { available: false, start: null, end: null }
    },
    blockedDates: ["2024-12-25", "2024-12-26", "2025-01-01"]
  },
  bankingDetails: {
    bankName: "First National Bank",
    accountHolderName: "Jane Smith",
    accountNumber: "62********89",
    branchCode: "250655",
    accountType: "Cheque",
    verified: true,
    verifiedAt: "2024-01-20T10:30:00"
  }
};