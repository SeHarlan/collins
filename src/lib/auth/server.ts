import { headers } from 'next/headers';
import { UserRepository } from '@/lib/db/repositories/user.repository';
import { UserDocument } from '@/lib/db/models/user.model';

export interface AuthUser {
  id: string;
  privyId: string;
  email?: string;
  walletAddress?: string;
}

/**
 * Get the authenticated user from the request
 * This is a stub implementation - in production, this would verify
 * the Privy JWT token and extract user information
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const headersList = headers();
    const authorization = headersList.get('authorization');

    if (!authorization?.startsWith('Bearer ')) {
      return null;
    }

    // TODO: In production, verify the JWT token with Privy
    // For now, we'll use a stub implementation
    const token = authorization.substring(7);

    // Stub: Extract user ID from token (in reality, decode JWT)
    // For demo purposes, we'll accept a base64 encoded JSON
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
      if (!decoded.privyId) {
        return null;
      }

      return {
        id: decoded.id || decoded.privyId,
        privyId: decoded.privyId,
        email: decoded.email,
      };
    } catch {
      return null;
    }
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

/**
 * Require authentication for an API route
 * Returns the authenticated user or throws an error
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getAuthUser();

  if (!user) {
    throw new Error('Authentication required');
  }

  return user;
}

/**
 * Get or create a user in the database based on auth info
 */
export async function getOrCreateDbUser(
  authUser: AuthUser,
): Promise<UserDocument> {
  return UserRepository.findOrCreate(authUser.privyId, {
    email: authUser.email,
  });
}
