import create from 'zustand';

export const useUserStore = create((set) => ({
  // User state
  user: null,
  isLoggedIn: false,

  // Actions
  setUser: (userData) => set({ user: userData, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),

  // Other user-related state and actions
  quizzes: [],
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
  removeQuiz: (quizId) =>
    set((state) => ({
      quizzes: state.quizzes.filter((quiz) => quiz.id !== quizId),
    })),
}));