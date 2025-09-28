import { create } from 'zustand';
import { mockNotifications } from '../data/mockData';

export const useUIStore = create((set, get) => ({
  // State
  modals: {
    entityForm: { open: false, entityId: null, mode: 'create' },
    jobDetails: { open: false, jobId: null },
    quoteDetails: { open: false, quoteId: null },
    phoneVerification: { open: false, phone: null },
    paymentModal: { open: false, quoteId: null }
  },

  notifications: mockNotifications,

  loading: {
    global: false,
    jobs: false,
    quotes: false,
    entities: false,
    auth: false
  },

  sidePanel: {
    open: false,
    collapsed: false
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
      id: "notif_" + Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    }]
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),

  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    )
  })),

  markAllNotificationsAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),

  setLoading: (key, isLoading) => set((state) => ({
    loading: { ...state.loading, [key]: isLoading }
  })),

  toggleSidePanel: () => set((state) => ({
    sidePanel: { ...state.sidePanel, open: !state.sidePanel.open }
  })),

  setSidePanelOpen: (open) => set((state) => ({
    sidePanel: { ...state.sidePanel, open }
  })),

  setSidePanelCollapsed: (collapsed) => set((state) => ({
    sidePanel: { ...state.sidePanel, collapsed }
  })),

  // Computed getters
  getUnreadNotificationsCount: () => {
    return get().notifications.filter(n => !n.read).length;
  }
}));