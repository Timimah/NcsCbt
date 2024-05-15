import { create } from "zustand";
import axios from "axios";
import { results } from "../components/user/results";

export const useUserStore = create((set, get) => ({
  isLoggedIn: false,
  loggedInUser: "",
  userIsUser: false,
  userIsAdmin: false,
  quizActive: false,
  userIsSubscribed: false,
  loggedInUserEmail: "",
  loggedInUserId: "",
  loggedInUserRank: "",
  loggedInUserPhoneNumber: "",
  subscribers: [],
  results: [],
  users: [],
  checkedInUsers: [],
  admin: [],
  materials: [],
  userMaterials: [],
  userResults: [],
  questions: [],
  examQuestions: [],
  userImage: null,

  setIsLoggedIn: (arg) => set({ isLoggedIn: arg }),

  setUserIsUser: (arg) => set({ userIsUser: arg }),

  setUserIsAdmin: (arg) => set({ userIsAdmin: arg }),

  setQuizActive: (arg) => set({ quizActive: arg }),

  setUserIsSubscribed: (arg) => set({ userIsSubscribed: arg }),

  setLoggedInUser: (user) => set({ loggedInUser: user }),

  setLoggedInUserEmail: (user) => set({ loggedInUserEmail: user }),

  setLoggedInUserId: (user) => set({ loggedInUserId: user }),

  setLoggedInUserRank: (user) => set({ loggedInUserRank: user }),

  setLoggedInUserPhoneNumber: (user) => set({ loggedInUserPhoneNumber: user }),

  setSubscribers: (subscribers) => set({ subscribers: subscribers }),

  setResults: (results) => set({ results: results }),

  setUsers: (users) => set({ users: users }),

  setCheckedInUsers: (users) => set({ checkedInUsers: users }),

  setAdmin: (admin) => set({ admin: admin }),

  setMaterials: (materials) => set({ materials: materials }),

  setUserMaterials: (userMaterials) => set({ userMaterials: userMaterials }),

  setUserResults: (userResults) => set({ userResults: userResults }),

  setQuestions: (questions) => set({ questions: questions }),

  setExamQuestions: (examQuestions) => set({ examQuestions: examQuestions }),

  setUserImage: (image) => set({ userImage: image }),

  logoutUser: () => {
    set((state) => ({ ...state, isLoggedIn: false, loggedInUser: null }));
  },
}));