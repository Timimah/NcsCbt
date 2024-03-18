import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  users: [],
  isLoggedIn: false,
  loggedInUser: null,
  subscriptions: [],
  quizzes: [],

  init: () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      set((state) => ({ ...state, users: JSON.parse(userData), loggedInUser: null }));
    } else {
      set((state) => ({ ...state, loggedInUser: null }));
    }
  },

  createUser: (userData) => {
    const newUsers = [...get().users, { ...userData }];
    set((state) => ({ ...state, users: newUsers }));
    localStorage.setItem('userData', JSON.stringify(newUsers));
  },

  loginUser: (loginData) => {
    const { examineeId, password } = loginData;
    const user = get().users.find((user) => user.id === examineeId && user.password === password);
    if (user) {
      set((state) => ({ ...state, isLoggedIn: true, loggedInUser: user }));
      return true;
    }
    return false;
  },

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
useUserStore.getState().init();