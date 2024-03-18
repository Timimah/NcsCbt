import { create } from 'zustand';

export const useAdminStore = create((set, get) => ({
  admin: [],
  adminIsLoggedIn: false,
  loggedInAdmin: null,
  subscriptions: [],
  quizzes: [],

  init: () => {
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      const parsedAdminData = JSON.parse(adminData);
      set((state) => ({ ...state, admin: parsedAdminData, loggedInAdmin: parsedAdminData[0] }));
    } else {
      const Name = "Admin";
      const dAdminEmail = 'admin@gmail.com';
      const dAdminPassword = 'admin123';
      const PhoneNumber = ""
  
      // Add the default admin object
      const admin = [{ name: Name, adminEmail: dAdminEmail, adminPassword: dAdminPassword, phoneNumber: PhoneNumber }];
      set((state) => ({ ...state, admin: admin, loggedInAdmin: null }));
  
      // Store the default admin data in local storage
      localStorage.setItem('adminData', JSON.stringify(admin));
    }
  },

  createAdmin: (adminData) => {
    const newAdmin = [...get().admin, { ...adminData }];
    set((state) => ({ ...state, admin: newAdmin }));
    localStorage.setItem('adminData', JSON.stringify(newAdmin));
  },

  loginAdmin: (adminLoginData) => {
    const { adminEmail, adminPassword } = adminLoginData;
    const admin = get().admin.find((a) => a.adminEmail === adminEmail && a.adminPassword === adminPassword);
    if (admin) {
      set((state) => ({ ...state, adminIsLoggedIn: true, loggedInAdmin: admin }));
      return true;
    }
    return false;
  },

  logoutAdmin: () => {
    set((state) => ({ ...state, adminIsLoggedIn: false, loggedInAdmin: null }));
  },
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

    materials: [],
  addMaterial: (material) =>
    set((state) => ({ materials: [...state.materials, material] })),

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

useAdminStore.getState().init();