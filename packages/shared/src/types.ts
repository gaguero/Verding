// Shared TypeScript types for Verding platform

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Property {
  id: string;
  name: string;
  ownerId: string;
}
