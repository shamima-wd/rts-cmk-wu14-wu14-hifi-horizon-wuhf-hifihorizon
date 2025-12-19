import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      accounts: [],
      currentUser: null,

      // Actions
      signup: (userData) => {
        const { accounts } = get();

        // Check if email already exists
        if (accounts.some((account) => account.email === userData.email)) {
          return { success: false, message: "Email already registered" };
        }

        // Create new account
        const newAccount = {
          ...userData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        };

        // Add to accounts
        set({ accounts: [...accounts, newAccount] });

        return { success: true, message: "Account created successfully!" };
      },

      login: (email, password) => {
        const { accounts } = get();

        // Find matching account
        const account = accounts.find(
          (acc) => acc.email === email && acc.password === password
        );

        if (!account) {
          return { success: false, message: "Invalid email or password" };
        }

        // Set current user (without password)
        const { password: _, ...userInfo } = account;
        set({ currentUser: userInfo });

        return { success: true, message: "Login successful!" };
      },

      logout: () => {
        set({ currentUser: null });
      },

      isAuthenticated: () => {
        return get().currentUser !== null;
      },

      updateUser: (updatedData) => {
        const { accounts, currentUser } = get();
        if (!currentUser)
          return { success: false, message: "No user logged in" };

        // Update in accounts array
        const updatedAccounts = accounts.map((acc) =>
          acc.id === currentUser.id ? { ...acc, ...updatedData } : acc
        );

        // Update current user
        const updatedUser = { ...currentUser, ...updatedData };

        set({ accounts: updatedAccounts, currentUser: updatedUser });
        return { success: true, message: "Profile updated successfully" };
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialPersist: (state) => ({
        accounts: state.accounts,
        currentUser: state.currentUser,
      }),
    }
  )
);
