import { create } from 'zustand';
import axios from 'axios'

export const useUserStore = create((set, get) => ({
  // users: [],
  isLoggedIn: false,
  loggedInUser: "",
  userIsUser: false,
  userIsAdmin: false,
  loggedInUserEmail: "",
  loggedInUserId: "",
  loggedInUserRank: "",
  loggedInUserPhoneNumber: "",
  subscriptions: [],
  quizzes: [],

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
  // init: () => {
  //   const userData = localStorage.getItem('userData');
  //   if (userData) {
  //     set((state) => ({ ...state, users: JSON.parse(userData), loggedInUser: null }));
  //   } else {
  //     set((state) => ({ ...state, loggedInUser: null }));
  //   }
  // },

  // createUser: async (userData) => {
  //   try {
  //     const response = await axios.post('https://ncs-cbt-api.onrender.com/users/register', userData);

  //     if (response.data.success) {
  //       // User created successfully
  //       console.log('User created successfully:', response.data);
  //     } else {
  //       // User creation failed
  //       console.error('User creation failed:', response.data.error);
  //     }
  //   } catch (error) {
  //     console.error('User creation error:', error);
  //   }
  // },

  // loginUser: async (loginData) => {
  //   try {
  //     const response = await axios.post('https://ncs-cbt-api.onrender.com/users/login', loginData);

  //     if (response.data.success) {
  //       // Login successful
  //       const user = response.data.user;
  //       set((state) => ({ ...state, isLoggedIn: true, loggedInUser: user }));
  //       return true;
  //     } else {
  //       // Login failed
  //       console.error('Login failed:', response.data.error);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     return false;
  //   }
  // },

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