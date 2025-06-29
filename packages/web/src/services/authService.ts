import { API_BASE_URL } from '@verding/shared/config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function loginUser(credentials: LoginCredentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to login');
  }

  return response.json();
}

export async function registerUser(userInfo: RegisterInfo) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to register');
  }

  return response.json();
}
