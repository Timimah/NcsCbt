import create from 'zustand';

export const useAdminStore = create((set) => ({
  // Admin state
  quizzes: [],

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