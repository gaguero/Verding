import { Router, Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';
import { database, security } from '../config/index.js';
import { asyncHandler, AuthenticationError, ConflictError } from '../middleware/errorHandler.js';
import { optionalAuth } from '../auth/middleware.js';
import { logger } from '../utils/logger.js';
import { AuthError, AuthErrorType } from '../auth/types.js';

const router = Router();

// Initialize Supabase client
const supabase = createClient(database.url, database.anonKey);

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  companyName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Helper function to generate JWT tokens
const generateTokens = (userId: string, email: string, role?: string) => {
  const payload = {
    sub: userId,
    email,
    role,
  };

  const accessToken = jwt.sign(payload, security.secret, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(payload, security.secret, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};

// Helper function to hash password
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

// Helper function to verify password
const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * @route POST /api/v1/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  // Validate request body
  const validatedData = registerSchema.parse(req.body);
  const { email, password, firstName, lastName, companyName } = validatedData;

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    throw new ConflictError('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user in database
  const { data: newUser, error } = await supabase
    .from('users')
    .insert({
      email,
      password_hash: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      company_name: companyName,
      role: 'user',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select('id, email, first_name, last_name, role')
    .single();

  if (error) {
    logger.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(newUser.id, newUser.email, newUser.role);

  // Store refresh token in database
  await supabase
    .from('refresh_tokens')
    .insert({
      user_id: newUser.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    });

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      role: newUser.role,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  });
}));

/**
 * @route POST /api/v1/auth/login
 * @desc Login user
 * @access Public
 */
router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  // Validate request body
  const validatedData = loginSchema.parse(req.body);
  const { email, password } = validatedData;

  // Find user by email
  const { data: user, error } = await supabase
    .from('users')
    .select('id, email, password_hash, first_name, last_name, role, current_property_id')
    .eq('email', email)
    .single();

  if (error || !user) {
    throw new AuthError(
      AuthErrorType.INVALID_CREDENTIALS,
      'Invalid email or password',
      401
    );
  }

  // Verify password
  const isPasswordValid = await verifyPassword(password, user.password_hash);
  if (!isPasswordValid) {
    throw new AuthError(
      AuthErrorType.INVALID_CREDENTIALS,
      'Invalid email or password',
      401
    );
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);

  // Store refresh token in database
  await supabase
    .from('refresh_tokens')
    .insert({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });

  // Update last login
  await supabase
    .from('users')
    .update({ last_login_at: new Date().toISOString() })
    .eq('id', user.id);

  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      currentPropertyId: user.current_property_id,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  });
}));

/**
 * @route POST /api/v1/auth/refresh
 * @desc Refresh access token
 * @access Public
 */
router.post('/refresh', asyncHandler(async (req: Request, res: Response) => {
  // Validate request body
  const validatedData = refreshTokenSchema.parse(req.body);
  const { refreshToken } = validatedData;

  // Verify refresh token
  let decoded: any;
  try {
    decoded = jwt.verify(refreshToken, security.secret);
  } catch (error) {
    throw new AuthenticationError('Invalid or expired refresh token');
  }

  // Check if refresh token exists in database
  const { data: tokenRecord, error } = await supabase
    .from('refresh_tokens')
    .select('id, user_id, expires_at')
    .eq('token', refreshToken)
    .eq('user_id', decoded.sub)
    .single();

  if (error || !tokenRecord) {
    throw new AuthenticationError('Invalid refresh token');
  }

  // Check if token is expired
  if (new Date(tokenRecord.expires_at) < new Date()) {
    // Clean up expired token
    await supabase
      .from('refresh_tokens')
      .delete()
      .eq('id', tokenRecord.id);
    
    throw new AuthenticationError('Refresh token expired');
  }

  // Get user data
  const { data: user } = await supabase
    .from('users')
    .select('id, email, role')
    .eq('id', tokenRecord.user_id)
    .single();

  if (!user) {
    throw new AuthenticationError('User not found');
  }

  // Generate new tokens
  const { accessToken, refreshToken: newRefreshToken } = generateTokens(
    user.id,
    user.email,
    user.role
  );

  // Update refresh token in database
  await supabase
    .from('refresh_tokens')
    .update({
      token: newRefreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    })
    .eq('id', tokenRecord.id);

  res.json({
    message: 'Token refreshed successfully',
    tokens: {
      accessToken,
      refreshToken: newRefreshToken,
    },
  });
}));

/**
 * @route POST /api/v1/auth/logout
 * @desc Logout user (invalidate refresh token)
 * @access Private
 */
router.post('/logout', optionalAuth, asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    // Remove refresh token from database
    await supabase
      .from('refresh_tokens')
      .delete()
      .eq('token', refreshToken);
  }

  res.json({
    message: 'Logout successful',
  });
}));

/**
 * @route GET /api/v1/auth/me
 * @desc Get current user profile
 * @access Private
 */
router.get('/me', optionalAuth, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AuthenticationError('Authentication required');
  }

  // Get full user data
  const { data: user, error } = await supabase
    .from('users')
    .select(`
      id,
      email,
      first_name,
      last_name,
      role,
      company_name,
      current_property_id,
      created_at,
      user_properties (
        property_id,
        role,
        properties (
          id,
          name,
          location
        )
      )
    `)
    .eq('id', req.user.id)
    .single();

  if (error || !user) {
    throw new AuthenticationError('User not found');
  }

  res.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      companyName: user.company_name,
      currentPropertyId: user.current_property_id,
      createdAt: user.created_at,
      properties: user.user_properties?.map((up: any) => ({
        id: up.property_id,
        name: up.properties?.name,
        location: up.properties?.location,
        role: up.role,
      })) || [],
    },
  });
}));

/**
 * @route PUT /api/v1/auth/profile
 * @desc Update user profile
 * @access Private
 */
router.put('/profile', optionalAuth, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AuthenticationError('Authentication required');
  }

  const updateSchema = z.object({
    firstName: z.string().min(1, 'First name is required').optional(),
    lastName: z.string().min(1, 'Last name is required').optional(),
    companyName: z.string().optional(),
  }).partial(); // Allow partial updates

  const validatedData = updateSchema.parse(req.body);

  const { data: updatedUser, error } = await supabase
    .from('users')
    .update({
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      company_name: validatedData.companyName,
      updated_at: new Date().toISOString(),
    })
    .eq('id', req.user.id)
    .select('id, email, first_name, last_name, company_name')
    .single();

  if (error || !updatedUser) {
    logger.error('Error updating user profile:', error);
    throw new Error('Failed to update profile');
  }

  res.json({
    message: 'Profile updated successfully',
    user: {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.first_name,
      lastName: updatedUser.last_name,
      companyName: updatedUser.company_name,
    },
  });
}));

// TODO: Implement password reset and email verification routes

export default router; 
