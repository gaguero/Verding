// Shared utility functions for Verding platform

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

import { randomBytes } from 'crypto';

export const generateId = (): string => {
  // Option 1: Cryptographically secure with more entropy
  return randomBytes(16).toString('hex');

  // Option 2: UUID v4 (requires uuid package)
  // import { v4 as uuidv4 } from 'uuid';
  // return uuidv4();
};
