import create from 'zustand';

interface AuthState {
  token: string | null;
  user: any | null; // Replace 'any' with a proper user type
  isAuthenticated: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
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