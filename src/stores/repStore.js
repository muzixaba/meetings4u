import { create } from 'zustand';
import { mockJobs, mockQuotes, mockAssignments, mockEarnings, mockRepProfile } from '../data/mockData';

export const useRepStore = create((set, get) => ({
  // State
  availableJobs: mockJobs.filter(job => job.status === 'open'),
  myQuotes: mockQuotes.filter(quote => quote.repId === 'user_002'),
  myAssignments: mockAssignments.filter(assignment => assignment.repId === 'user_002'),
  profile: mockRepProfile,
  earnings: mockEarnings,
  filters: {
    meetingType: null,
    dateRange: null,
    distance: 50,
    minFee: null,
    location: null
  },
  loading: false,
  error: null,

  // Actions
  setAvailableJobs: (jobs) => set({ availableJobs: jobs }),

  setMyQuotes: (quotes) => set({ myQuotes: quotes }),

  addQuote: (quoteData) => {
    const newQuote = {
      id: "quote_" + Date.now(),
      repId: "user_002", // Current rep
      status: "pending",
      quotedAt: new Date().toISOString(),
      validUntil: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 hours from now
      ...quoteData
    };

    set((state) => ({
      myQuotes: [newQuote, ...state.myQuotes]
    }));

    return newQuote;
  },

  updateQuote: (quoteId, updates) => set((state) => ({
    myQuotes: state.myQuotes.map(quote =>
      quote.id === quoteId ? { ...quote, ...updates } : quote
    )
  })),

  withdrawQuote: (quoteId) => {
    const { updateQuote } = get();
    updateQuote(quoteId, { status: 'withdrawn' });
  },

  setMyAssignments: (assignments) => set({ myAssignments: assignments }),

  updateAssignment: (assignmentId, updates) => set((state) => ({
    myAssignments: state.myAssignments.map(assignment =>
      assignment.id === assignmentId ? { ...assignment, ...updates } : assignment
    )
  })),

  completeAssignment: (assignmentId, completionReport) => {
    const { updateAssignment } = get();
    updateAssignment(assignmentId, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      completionReport
    });
  },

  updateProfile: (updates) => set((state) => ({
    profile: { ...state.profile, ...updates }
  })),

  updateFilters: (filterUpdates) => set((state) => ({
    filters: { ...state.filters, ...filterUpdates }
  })),

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Computed selectors
  getFilteredJobs: () => {
    const { availableJobs, filters } = get();
    return availableJobs.filter(job => {
      // Apply filtering logic based on filters
      if (filters.meetingType && job.meetingType !== filters.meetingType) return false;
      if (filters.minFee) {
        // Extract minimum fee from budget string like "R150-R300"
        const minBudget = parseInt(job.budget.split('-')[0].replace('R', ''));
        if (minBudget < filters.minFee) return false;
      }
      // Add more filter logic as needed (location, date range, etc.)
      return true;
    });
  },

  getQuotesByStatus: (status) => {
    return get().myQuotes.filter(quote => quote.status === status);
  },

  getAssignmentsByStatus: (status) => {
    return get().myAssignments.filter(assignment => assignment.status === status);
  },

  getEarningsThisMonth: () => {
    const { earnings } = get();
    return earnings.thisMonth;
  },

  getTotalEarnings: () => {
    const { earnings } = get();
    return earnings.totalEarnings;
  },

  getBalance: () => {
    const { earnings } = get();
    return earnings.balance;
  },

  getPendingPayments: () => {
    const { earnings } = get();
    return earnings.pendingPayments;
  },

  // Statistics
  getCompletionRate: () => {
    const { profile } = get();
    const completed = profile.statistics.completedJobs;
    const total = profile.statistics.totalJobs;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  },

  getRating: () => {
    const { profile } = get();
    return profile.statistics.rating;
  },

  // Mock API calls (replace with real API calls later)
  fetchAvailableJobs: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const jobs = mockJobs.filter(job => job.status === 'open');
      set({ availableJobs: jobs, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  submitQuote: async (jobId, quoteData) => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { addQuote } = get();
      const newQuote = addQuote({
        jobId,
        ...quoteData
      });

      set({ loading: false });
      return newQuote;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));