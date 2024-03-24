import { create } from 'zustand';
import axios from 'axios'

const SESSION_EXPIRATION_TIME = 3600000; // 1 hour in milliseconds
const API_BASE_URL = 'https://ncs-cbt-api.onrender.com';

export const useAdminStore = create((set, get) => ({
  admin: [],
  adminIsLoggedIn: false,
  loggedInAdmin: null,
  subscriptions: [],
  quizzes: [],
  materials: [],
  questions: [],

  setAdminIsLoggedIn:
  set((arg) => ({adminIsLoggedIn: arg})),
  // init: async () => {
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/admin/register`);
  //     const adminData = response.data;
  //     console.log(adminData);
  //     set((state) => ({ ...state, admin: adminData, loggedInAdmin: adminData[0] }));
  //   } catch (error) {
  //     console.error('Error fetching admin data:', error);
  //   }
  // },

  // createAdmin: async (adminData) => {
  //   console.log(adminData);
  //   try{
  //     const response = await axios.post(`${API_BASE_URL}/admin/register`, adminData);
  //   const admin = response.data;
  //   console.log(admin);
  //   set((state) => ({ ...state, admin: admin, loggedInAdmin: admin }));
  //   return true;
  //   }
  //   catch (error) {
  //     console.error('Error creating admin:', error);
  //     return false;
  //   }


    
    // try {
    //   const response = await axios.post(`${API_BASE_URL}/admin/register`, adminData);
    //   const newAdmin = response.data;
    //   console.log(newAdmin);
    //   const updatedAdminList = [...get().admin, newAdmin];
    //   set((state) => ({ ...state, admin: updatedAdminList }));
    // } catch (error) {
    //   console.error('Error creating admin:', error);
    // }
  // },

  // loginAdmin: async (adminLoginData) => {
  //   const { adminEmail, adminPassword } = adminLoginData;
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/admin/login`, { email: adminEmail, password: adminPassword });
  //     const loggedInAdmin = response.data;
  //     if (loggedInAdmin) {
  //       console.log(loggedInAdmin);
  //       set((state) => ({ ...state, adminIsLoggedIn: true, loggedInAdmin }));
  //       return true;

  //       // const sessionExpiration = new Date().getTime() + SESSION_EXPIRATION_TIME;
  //       // localStorage.setItem('adminSession', JSON.stringify({ loggedInAdmin, sessionExpiration }));
  //       // set((state) => ({ ...state, adminIsLoggedIn: true, loggedInAdmin }));
  //       // return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error('Error logging in admin:', error);
  //     return false;
  //   }
  // },

  // logoutAdmin: () => {
  //   localStorage.removeItem('adminSession');
  //   set((state) => ({ ...state, adminIsLoggedIn: false, loggedInAdmin: null }));
  // },

  checkAdminSession: () => {
    const sessionData = localStorage.getItem('adminSession');
    if (sessionData) {
      const { admin, sessionExpiration } = JSON.parse(sessionData);
      const currentTime = new Date().getTime();
      if (currentTime < sessionExpiration) {
        set((state) => ({ ...state, adminIsLoggedIn: true, loggedInAdmin: admin }));
      } else {
        localStorage.removeItem('adminSession');
      }
    }
  },

  addMaterial: (material) =>
    set((state) => ({ materials: [...state.materials, material] })),

  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, ...question] })),
  // Actions
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
  updateQuiz: (updatedQuiz) =>
    set((state) => ({
      quizzes: state.quizzes.map((quiz) =>
        quiz.id === updatedQuiz.id ? updatedQuiz : quiz
      ),
    })),
  removeQuiz: (quizId) =>
    set((state) => ({
      quizzes: state.quizzes.filter((quiz) => quiz.id !== quizId),
    })),

  // Other admin-related state and actions
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
}));

// useAdminStore.getState();