import { create } from 'zustand';
import axios from 'axios'

export const useUserStore = create((set, get) => ({
  isLoggedIn: false,
  loggedInUser: "",
  userIsUser: false,
  userIsAdmin: false,
  loggedInUserEmail: "",
  loggedInUserId: "",
  loggedInUserRank: "",
  loggedInUserPhoneNumber: "",
  subscriptions: [],
  users: [],
  materials: [],

  setIsLoggedIn:
    (arg) => set({ isLoggedIn: arg }),

  setUserIsUser:
    (arg) => set({ userIsUser: arg }),

  setUserIsAdmin:
    (arg) => set({ userIsAdmin: arg }),

  setLoggedInUser: (user) =>
    set({ loggedInUser: user }),

  setLoggedInUserEmail: (user) =>
    set({ loggedInUserEmail: user }),

  setLoggedInUserId: (user) =>
    set({ loggedInUserId: user }),

  setLoggedInUserRank: (user) =>
    set({ loggedInUserRank: user }),

  setLoggedInUserPhoneNumber: (user) =>
    set({ loggedInUserPhoneNumber: user }),

    setUsers: (users) =>
    set({ users: users}),
    
    setMaterials: (materials) =>
    set({ materials: materials}),

  logoutUser: () => {
    set((state) => ({ ...state, isLoggedIn: false, loggedInUser: null }));
  },

  setSubscription: (subscriptionData) => {
    set((state) => ({ ...state, subscriptions: [...state.subscriptions, subscriptionData] }));
  },

  cancelSubscription: (subscriptionId) => {
    set((state) => ({
      ...state,
      subscriptions: state.subscriptions.filter((subscription) => subscription.id !== subscriptionId),
    }));
  },

  addQuiz: (quiz) => {
    set((state) => ({ ...state, quizzes: [...state.quizzes, quiz] }));
  },

  removeQuiz: (quizId) => {
    set((state) => ({
      ...state,
      quizzes: state.quizzes.filter((quiz) => quiz.id !== quizId),
    }));
  }
}));

// Initialize the store
// useUserStore.getState().init();