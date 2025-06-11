/**
 * Shared constants for the Verding platform
 */

// API Configuration
export const API_CONFIG = {
  DEFAULT_TIMEOUT: 30000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const;

// Application Limits
export const LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_BATCH_SIZE: 100,
  MAX_PROPERTY_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
} as const;

// Design System Constants (aligned with UX/UI Style Guide)
export const DESIGN_SYSTEM = {
  // Base spacing unit (8dp system)
  SPACING: {
    MICRO: 4,
    SMALL: 8,
    DEFAULT: 16,
    MEDIUM: 24,
    LARGE: 32,
    XL: 48,
  },
  // Color palette
  COLORS: {
    PRIMARY_OFF_WHITE: '#F5F5F0',
    PRIMARY_EARTH_GREEN: '#2C5545',
    SECONDARY_SAGE: '#7A9B76',
    SECONDARY_CREAM: '#EAE7DC',
    ACCENT_TEAL: '#00A896',
    ACCENT_GOLD: '#D4AF37',
    SUCCESS_GREEN: '#4A7C59',
    ERROR_RED: '#A13D3D',
    WARNING_AMBER: '#CD853F',
    INFO_BLUE: '#5B7B9A',
    BACKGROUND_PAPER: '#FFFEF8',
  },
  // Component dimensions
  COMPONENTS: {
    BUTTON_HEIGHT: 52,
    INPUT_HEIGHT: 56,
    CORNER_RADIUS: {
      SMALL: 12,
      MEDIUM: 16,
      LARGE: 20,
      PILL: 26,
    },
    TOUCH_TARGET_MIN: 44,
  },
  // Responsive breakpoints
  BREAKPOINTS: {
    MOBILE: 320,
    TABLET: 600,
    DESKTOP: 1024,
  },
} as const;

// Microgreens specific constants
export const MICROGREENS = {
  GROWTH_STAGES: ['SEED', 'GERMINATION', 'COTYLEDON', 'TRUE_LEAF', 'HARVEST'] as const,
  DEFAULT_GROWING_DAYS: {
    ARUGULA: 7,
    BASIL: 12,
    BROCCOLI: 10,
    KALE: 8,
    PEA_SHOOTS: 10,
    RADISH: 6,
    SUNFLOWER: 10,
  },
  HARVEST_WINDOW_DAYS: 3,
} as const;

// Agent & NLP Constants
export const AGENT = {
  MAX_CONTEXT_LENGTH: 4000,
  DEFAULT_CONFIDENCE_THRESHOLD: 0.7,
  SUPPORTED_LANGUAGES: ['en', 'es', 'fr'] as const,
  INTENT_CATEGORIES: [
    'SOWING',
    'HARVEST',
    'ORDER',
    'CUSTOMER',
    'PROPERTY',
    'GENERAL',
  ] as const,
} as const;

// Status constants
export const STATUS = {
  TASK_STATUSES: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const,
  ORDER_STATUSES: ['DRAFT', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED', 'CANCELLED'] as const,
  BATCH_STATUSES: ['PLANNING', 'SOWN', 'GROWING', 'READY', 'HARVESTED'] as const,
} as const;

// Error codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
  UNKNOWN: 'UNKNOWN',
} as const;

// Export type utilities
export type GrowthStage = typeof MICROGREENS.GROWTH_STAGES[number];
export type TaskStatus = typeof STATUS.TASK_STATUSES[number];
export type OrderStatus = typeof STATUS.ORDER_STATUSES[number];
export type BatchStatus = typeof STATUS.BATCH_STATUSES[number];
export type IntentCategory = typeof AGENT.INTENT_CATEGORIES[number];
export type SupportedLanguage = typeof AGENT.SUPPORTED_LANGUAGES[number];
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]; 
