import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { database, security } from '../config/index.js';
import { AuthProvider, OAuthProvider } from './types.js';

// Supabase client instance
let supabaseClient: SupabaseClient<any, 'public', any> | null = null;
let serviceRoleClient: SupabaseClient<any, 'public', any> | null = null;

/**
 * Initialize Supabase client with anon key
 */
export function getSupabaseClient(): SupabaseClient<any, 'public', any> {
  if (!supabaseClient) {
    supabaseClient = createClient(
      database.url,
      database.anonKey,
      {
        auth: {
          autoRefreshToken: database.autoRefreshToken,
          persistSession: database.persistSession,
          detectSessionInUrl: database.detectSessionInUrl,
        },
        db: {
          schema: 'public',
        },
      }
    ) as SupabaseClient<any, 'public', any>;
  }
  return supabaseClient!;
}

/**
 * Initialize Supabase client with service role key (admin access)
 */
export function getServiceRoleClient(): SupabaseClient<any, 'public', any> {
  if (!serviceRoleClient) {
    serviceRoleClient = createClient(
      database.url,
      database.serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
        db: {
          schema: 'public',
        },
      }
    ) as SupabaseClient<any, 'public', any>;
  }
  return serviceRoleClient!;
}

/**
 * Authentication providers configuration
 */
export const authProviders: Record<string, AuthProvider> = {
  email: {
    name: 'email',
    enabled: true,
    config: {
      // Email/password authentication is always enabled
      allowSignup: true,
      emailConfirmation: true,
      passwordMinLength: 8,
    },
  },
  google: {
    name: 'google',
    enabled: false, // Will be enabled when OAuth credentials are configured
    config: {
      scopes: ['email', 'profile'],
    },
  } as OAuthProvider,
  github: {
    name: 'github',
    enabled: false, // Will be enabled when OAuth credentials are configured
    config: {
      scopes: ['user:email'],
    },
  } as OAuthProvider,
  microsoft: {
    name: 'microsoft',
    enabled: false, // Will be enabled when OAuth credentials are configured
    config: {
      scopes: ['openid', 'email', 'profile'],
    },
  } as OAuthProvider,
};

/**
 * Configure OAuth provider
 */
export function configureOAuthProvider(
  providerName: string,
  clientId: string,
  clientSecret: string,
  redirectUrl?: string
): void {
  const provider = authProviders[providerName];
  if (!provider) {
    throw new Error(`Unknown provider: ${providerName}`);
  }

  const oauthProvider = provider as OAuthProvider;
  oauthProvider.client_id = clientId;
  oauthProvider.client_secret = clientSecret;
  oauthProvider.redirect_url = redirectUrl || `${process.env.WEB_BASE_URL}/auth/callback`;
  oauthProvider.enabled = true;

  console.log(`OAuth provider ${providerName} configured successfully`);
}

/**
 * Get enabled authentication providers
 */
export function getEnabledProviders(): AuthProvider[] {
  return Object.values(authProviders).filter(provider => provider.enabled);
}

/**
 * Check if a specific provider is enabled
 */
export function isProviderEnabled(providerName: string): boolean {
  const provider = authProviders[providerName];
  return provider ? provider.enabled : false;
}

/**
 * Initialize authentication providers based on environment variables
 */
export function initializeAuthProviders(): void {
  console.log('Initializing authentication providers...');

  // Configure OAuth providers if credentials are available
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (googleClientId && googleClientSecret) {
    configureOAuthProvider('google', googleClientId, googleClientSecret);
  }

  const githubClientId = process.env.GITHUB_CLIENT_ID;
  const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (githubClientId && githubClientSecret) {
    configureOAuthProvider('github', githubClientId, githubClientSecret);
  }

  const microsoftClientId = process.env.MICROSOFT_CLIENT_ID;
  const microsoftClientSecret = process.env.MICROSOFT_CLIENT_SECRET;
  if (microsoftClientId && microsoftClientSecret) {
    configureOAuthProvider('microsoft', microsoftClientId, microsoftClientSecret);
  }

  const enabledProviders = getEnabledProviders();
  console.log(`Enabled authentication providers: ${enabledProviders.map(p => p.name).join(', ')}`);
}

/**
 * Validate authentication provider configuration
 */
export function validateProviderConfiguration(): void {
  // Ensure at least email provider is available
  if (!isProviderEnabled('email')) {
    throw new Error('Email authentication provider must be enabled');
  }

  // Validate Supabase configuration
  if (!database.url || !database.anonKey) {
    throw new Error('Supabase configuration is incomplete');
  }

  // Validate JWT secret for token operations
  if (!security.secret || security.secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }

  console.log('Authentication provider configuration validated successfully');
}

 
