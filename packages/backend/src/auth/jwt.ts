import jwt from 'jsonwebtoken';
import { security } from '../config/index.js';
import { AuthError, AuthErrorType, UserPermissions } from './types.js';
import { StringValue } from 'ms';

// JWT payload interface
export interface JWTPayload {
  sub: string; // User ID
  email: string;
  role?: string;
  property_id?: string;
  permissions?: UserPermissions;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

// Token configuration
const TOKEN_CONFIG = {
  issuer: 'verding-backend',
  audience: 'verding-app',
  accessTokenExpiry: '15m', // 15 minutes
  refreshTokenExpiry: '7d', // 7 days
  algorithm: 'HS256' as const,
};

/**
 * Generate access token with user information
 */
export function generateAccessToken(
  userId: string,
  email: string,
  role?: string,
  propertyId?: string,
  permissions?: UserPermissions
): string {
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
    sub: userId,
    email,
    role,
    property_id: propertyId,
    permissions,
    iss: TOKEN_CONFIG.issuer,
    aud: TOKEN_CONFIG.audience,
  };

  const options: jwt.SignOptions = {
    expiresIn: TOKEN_CONFIG.accessTokenExpiry as StringValue,
    algorithm: TOKEN_CONFIG.algorithm,
  };
  return jwt.sign(payload, security.secret, options);
}

/**
 * Generate refresh token
 */
export function generateRefreshToken(userId: string, email: string): string {
  const payload = {
    sub: userId,
    email,
    type: 'refresh',
    iss: TOKEN_CONFIG.issuer,
    aud: TOKEN_CONFIG.audience,
  };

  const options: jwt.SignOptions = {
    expiresIn: TOKEN_CONFIG.refreshTokenExpiry as StringValue,
    algorithm: TOKEN_CONFIG.algorithm,
  };
  return jwt.sign(payload, security.secret, options);
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, security.secret, {
      issuer: TOKEN_CONFIG.issuer,
      audience: TOKEN_CONFIG.audience,
      algorithms: [TOKEN_CONFIG.algorithm],
    }) as JWTPayload;

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthError(
        AuthErrorType.TOKEN_EXPIRED,
        'Token has expired',
        401
      );
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthError(
        AuthErrorType.INVALID_TOKEN,
        'Invalid token',
        401
      );
    } else {
      throw new AuthError(
        AuthErrorType.INVALID_TOKEN,
        'Token verification failed',
        401
      );
    }
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): { sub: string; email: string } {
  try {
    const decoded = jwt.verify(token, security.secret, {
      issuer: TOKEN_CONFIG.issuer,
      audience: TOKEN_CONFIG.audience,
      algorithms: [TOKEN_CONFIG.algorithm],
    }) as any;

    if (decoded.type !== 'refresh') {
      throw new AuthError(
        AuthErrorType.INVALID_TOKEN,
        'Invalid refresh token',
        401
      );
    }

    return {
      sub: decoded.sub,
      email: decoded.email,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthError(
        AuthErrorType.TOKEN_EXPIRED,
        'Refresh token has expired',
        401
      );
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthError(
        AuthErrorType.INVALID_TOKEN,
        'Invalid refresh token',
        401
      );
    } else {
      throw new AuthError(
        AuthErrorType.INVALID_TOKEN,
        'Refresh token verification failed',
        401
      );
    }
  }
}

/**
 * Extract token from Authorization header
 */
export function extractBearerToken(authHeader?: string): string | null {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

/**
 * Check if token is expired (without throwing)
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

/**
 * Get token expiration time
 */
export function getTokenExpiration(token: string): Date | null {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) {
      return null;
    }

    return new Date(decoded.exp * 1000);
  } catch {
    return null;
  }
}

/**
 * Decode token without verification (for debugging)
 */
export function decodeTokenUnsafe(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Generate token pair (access + refresh)
 */
export function generateTokenPair(
  userId: string,
  email: string,
  role?: string,
  propertyId?: string,
  permissions?: UserPermissions
): { accessToken: string; refreshToken: string; expiresAt: Date } {
  const accessToken = generateAccessToken(userId, email, role, propertyId, permissions);
  const refreshToken = generateRefreshToken(userId, email);
  const expiresAt = getTokenExpiration(accessToken) || new Date(Date.now() + 15 * 60 * 1000);

  return {
    accessToken,
    refreshToken,
    expiresAt,
  };
}

/**
 * Validate JWT configuration
 */
export function validateJWTConfiguration(): void {
  if (!security.secret) {
    throw new Error('JWT_SECRET is required for token operations');
  }

  if (security.secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }

  console.log('JWT configuration validated successfully');
}

/**
 * Get token configuration for client use
 */
export function getTokenConfig() {
  return {
    accessTokenExpiry: TOKEN_CONFIG.accessTokenExpiry,
    refreshTokenExpiry: TOKEN_CONFIG.refreshTokenExpiry,
    issuer: TOKEN_CONFIG.issuer,
    audience: TOKEN_CONFIG.audience,
  };
} 
