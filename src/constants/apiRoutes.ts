/**
 * API route constants for the application
 * Centralized location for all server endpoints
 */

export const API_ROUTES = {
  // Assessment endpoints
  ASSESSMENTS: '/api/assessments',
  
  // User endpoints
  USERS: '/api/users',
  
  // Portfolio endpoints
  PORTFOLIOS: '/api/portfolios',
  
  // Asset endpoints
  ASSETS: '/api/assets',
} as const;

/**
 * Query keys for TanStack Query
 * Used for caching and invalidation
 */
export const QUERY_KEYS = {
  // Assessment queries
  ASSESSMENTS: ['assessments'] as const,
  ASSESSMENT: (id: string) => ['assessments', id] as const,
  
  // User queries
  USERS: ['users'] as const,
  USER: (id: string) => ['users', id] as const,
  
  // Portfolio queries
  PORTFOLIOS: ['portfolios'] as const,
  PORTFOLIO: (id: string) => ['portfolios', id] as const,
  
  // Asset queries
  ASSETS: ['assets'] as const,
  ASSET: (id: string) => ['assets', id] as const,
} as const;
