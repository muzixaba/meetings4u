import { create } from 'zustand';
import { mockJobs, mockQuotes } from '../data/mockData';

export const useJobsStore = create((set, get) => ({
  // State
  jobs: mockJobs,
  currentJob: null,
  quotes: {
    job_001: mockQuotes.filter(q => q.jobId === 'job_001'),
    job_002: []
  },
  loading: false,
  error: null,

  // Actions
  setJobs: (jobs) => set({ jobs, loading: false }),

  addJob: (jobData) => {
    const newJob = {
      id: "job_" + Date.now(),
      clientId: "user_001", // Current user
      status: "open",
      createdAt: new Date().toISOString(),
      ...jobData
    };

    set((state) => ({
      jobs: [newJob, ...state.jobs]
    }));

    return newJob;
  },

  updateJob: (jobId, updates) => set((state) => ({
    jobs: state.jobs.map(job =>
      job.id === jobId ? { ...job, ...updates } : job
    ),
    currentJob: state.currentJob?.id === jobId
      ? { ...state.currentJob, ...updates }
      : state.currentJob
  })),

  setCurrentJob: (job) => set({ currentJob: job }),

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

  acceptQuote: (quoteId) => {
    const { quotes, updateJob } = get();

    // Find the quote and job
    let targetQuote = null;
    let targetJobId = null;

    Object.entries(quotes).forEach(([jobId, jobQuotes]) => {
      const quote = jobQuotes.find(q => q.id === quoteId);
      if (quote) {
        targetQuote = quote;
        targetJobId = jobId;
      }
    });

    if (targetQuote && targetJobId) {
      // Update all quotes for this job to rejected except the accepted one
      const updatedQuotes = quotes[targetJobId].map(q => ({
        ...q,
        status: q.id === quoteId ? 'accepted' : 'rejected'
      }));

      // Update job status
      updateJob(targetJobId, { status: 'in_progress' });

      set((state) => ({
        quotes: {
          ...state.quotes,
          [targetJobId]: updatedQuotes
        }
      }));

      return targetQuote;
    }
  },

  // Computed selectors
  getJobsForEntity: (entityId) => {
    return get().jobs.filter(job => job.selectedEntityId === entityId);
  },

  getQuotesForJob: (jobId) => {
    return get().quotes[jobId] || [];
  },

  getJobsByStatus: (status) => {
    return get().jobs.filter(job => job.status === status);
  }
}));