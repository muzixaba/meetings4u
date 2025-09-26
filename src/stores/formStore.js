import { create } from 'zustand';

export const useFormStore = create((set, get) => ({
  // Job Posting Form
  jobForm: {
    currentStep: 1,
    data: {
      selectedEntityId: null,
      meetingType: '',
      dateTime: null,
      location: {
        address: '',
        coordinates: null
      },
      requirements: {
        attire: 'formal',
        ppe: false,
        tasks: [],
        documents: []
      },
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
      transportation: {
        method: '',
        details: ''
      },
      estimatedArrival: {
        time: '',
        travelDuration: '',
        departureTime: ''
      },
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

  updateJobFormRequirements: (requirements) => set((state) => ({
    jobForm: {
      ...state.jobForm,
      data: {
        ...state.jobForm.data,
        requirements: { ...state.jobForm.data.requirements, ...requirements }
      }
    }
  })),

  addJobFormAttachment: (attachment) => set((state) => ({
    jobForm: {
      ...state.jobForm,
      data: {
        ...state.jobForm.data,
        attachments: [...state.jobForm.data.attachments, attachment]
      }
    }
  })),

  removeJobFormAttachment: (attachmentId) => set((state) => ({
    jobForm: {
      ...state.jobForm,
      data: {
        ...state.jobForm.data,
        attachments: state.jobForm.data.attachments.filter(a => a.id !== attachmentId)
      }
    }
  })),

  resetJobForm: () => set({
    jobForm: {
      currentStep: 1,
      data: {
        selectedEntityId: null,
        meetingType: '',
        dateTime: null,
        location: {
          address: '',
          coordinates: null
        },
        requirements: {
          attire: 'formal',
          ppe: false,
          tasks: [],
          documents: []
        },
        attachments: [],
        additionalNotes: ''
      }
    }
  }),

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

  updateQuoteTransportation: (transportation) => set((state) => ({
    quoteForm: {
      ...state.quoteForm,
      data: {
        ...state.quoteForm.data,
        transportation: { ...state.quoteForm.data.transportation, ...transportation }
      }
    }
  })),

  updateQuoteArrival: (arrival) => set((state) => ({
    quoteForm: {
      ...state.quoteForm,
      data: {
        ...state.quoteForm.data,
        estimatedArrival: { ...state.quoteForm.data.estimatedArrival, ...arrival }
      }
    }
  })),

  addSpecialConsideration: (consideration) => set((state) => ({
    quoteForm: {
      ...state.quoteForm,
      data: {
        ...state.quoteForm.data,
        specialConsiderations: [...state.quoteForm.data.specialConsiderations, consideration]
      }
    }
  })),

  removeSpecialConsideration: (consideration) => set((state) => ({
    quoteForm: {
      ...state.quoteForm,
      data: {
        ...state.quoteForm.data,
        specialConsiderations: state.quoteForm.data.specialConsiderations.filter(c => c !== consideration)
      }
    }
  })),

  resetQuoteForm: () => set({
    quoteForm: {
      jobId: null,
      data: {
        amount: null,
        currency: 'ZAR',
        transportation: {
          method: '',
          details: ''
        },
        estimatedArrival: {
          time: '',
          travelDuration: '',
          departureTime: ''
        },
        specialConsiderations: [],
        additionalNotes: '',
        validUntil: null
      }
    }
  }),

  // Validation helpers
  validateJobFormStep: (step) => {
    const { jobForm } = get();
    const data = jobForm.data;

    switch (step) {
      case 1:
        return data.selectedEntityId && data.meetingType && data.dateTime && data.location.address;
      case 2:
        return data.requirements.tasks.length > 0;
      case 3:
        return true; // Attachments are optional
      case 4:
        return true; // Additional notes are optional
      default:
        return true;
    }
  }
}));