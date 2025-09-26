import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers } from '../data/mockData';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: (email, password) => {
        set({ isLoading: true });

        // Mock authentication
        setTimeout(() => {
          const user = mockUsers.find(u => u.email === email);
          if (user && password === "password123") {
            const mockTokens = {
              access_token: "mock_access_token_" + user.id,
              refresh_token: "mock_refresh_token_" + user.id,
              expires_in: 3600
            };

            set({
              user: user,
              accessToken: mockTokens.access_token,
              refreshToken: mockTokens.refresh_token,
              isAuthenticated: true,
              isLoading: false
            });

            return { success: true, data: { user, ...mockTokens } };
          } else {
            set({ isLoading: false });
            throw new Error("Invalid credentials");
          }
        }, 1000);
      },

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
      })),

      // Mock signup
      signup: (userData) => {
        set({ isLoading: true });

        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const existingUser = mockUsers.find(u => u.email === userData.email);
            if (existingUser) {
              set({ isLoading: false });
              reject(new Error("User already exists"));
            } else {
              const newUser = {
                id: "user_" + Date.now(),
                email: userData.email,
                type: userData.userType,
                verified: false,
                phone_verified: false,
                profile: {
                  name: userData.name,
                  phone: userData.phone,
                  alternativePhone: userData.alternativePhone || null,
                  profilePhoto: userData.profilePhoto || null
                }
              };

              set({ isLoading: false });
              resolve({ success: true, data: { user: newUser } });
            }
          }, 1000);
        });
      },

      // Mock phone verification
      verifyPhone: (phone, method) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              data: {
                codeLength: 6,
                expiresIn: 300,
                method: method
              }
            });
          }, 500);
        });
      },

      confirmPhoneVerification: (phone, code) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (code === "123456") {
              const { updatePhoneVerification } = get();
              updatePhoneVerification(phone, true);
              resolve({
                success: true,
                data: {
                  phone_verified: true,
                  verified_phone: phone
                }
              });
            } else {
              reject(new Error("Invalid verification code"));
            }
          }, 500);
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);