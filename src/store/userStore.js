import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set, get) => ({
  isLoggedIn: false,
  loggedInUser: "",
  userIsUser: false,
  userIsAdmin: false,
  quizActive: false,
  loggedInUserEmail: "",
  loggedInUserId: "",
  loggedInUserRank: "",
  loggedInUserPhoneNumber: "",
  subscriptions: [],
  users: [],
  checkedInUsers: [],
  admin: [],
  materials: [],
  userMaterials: [],
  questions: [],
  examQuestions: [],
  userImage: null,

  setIsLoggedIn: (arg) => set({ isLoggedIn: arg }),

  setUserIsUser: (arg) => set({ userIsUser: arg }),

  setUserIsAdmin: (arg) => set({ userIsAdmin: arg }),

  setQuizActive: (arg) => set({ quizActive: arg }),

  setLoggedInUser: (user) => set({ loggedInUser: user }),

  setLoggedInUserEmail: (user) => set({ loggedInUserEmail: user }),

  setLoggedInUserId: (user) => set({ loggedInUserId: user }),

  setLoggedInUserRank: (user) => set({ loggedInUserRank: user }),

  setLoggedInUserPhoneNumber: (user) => set({ loggedInUserPhoneNumber: user }),

  setUsers: (users) => set({ users: users }),

  setCheckedInUsers: (users) => set({ checkedInUsers: users }),

  setAdmin: (admin) => set({ admin: admin }),

  setMaterials: (materials) => set({ materials: materials }),

  setUserMaterials: (userMaterials) => set({ userMaterials: userMaterials }),

  setQuestions: (questions) => set({ questions: questions }),

  setExamQuestions: (examQuestions) => set({ examQuestions: examQuestions }),

  setUserImage: (image) => set({ userImage: image }),

  logoutUser: () => {
    set((state) => ({ ...state, isLoggedIn: false, loggedInUser: null }));
  },

  setSubscription: (subscriptionData) => {
    set((state) => ({
      ...state,
      subscriptions: [...state.subscriptions, subscriptionData],
    }));
  },

  cancelSubscription: (subscriptionId) => {
    set((state) => ({
      ...state,
      subscriptions: state.subscriptions.filter(
        (subscription) => subscription.id !== subscriptionId,
      ),
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
  },
}));

// Initialize the store
// useUserStore.getState().init();
