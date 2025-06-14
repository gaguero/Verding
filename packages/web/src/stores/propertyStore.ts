import create from 'zustand';

interface Property {
  id: string;
  name: string;
  location: string;
  // Add other property fields as needed
}

interface PropertyState {
  currentProperty: Property | null;
  isLoading: boolean;
  error: string | null;
  setCurrentProperty: (property: Property) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePropertyStore = create<PropertyState>(set => ({
  currentProperty: null,
  isLoading: false,
  error: null,
  setCurrentProperty: property => set({ currentProperty: property }),
  setLoading: loading => set({ isLoading: loading }),
  setError: error => set({ error: error }),
}));
