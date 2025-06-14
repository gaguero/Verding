import create from 'zustand';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export const useAuthStore = create<AuthState>(set => ({
  token: localStorage.getItem('authToken'),
  user: null, // Initially, no user is loaded
  isAuthenticated: !!localStorage.getItem('authToken'),
  login: (token, user) => {
    localStorage.setItem('authToken', token);
    set({ token, user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
