import { PrivyClient } from '@privy-io/node';
import { NextRequest } from 'next/server';
import { API_MESSAGES } from '@/constants/apiMessages';



// Initialize Privy client with verification key for better performance
const privy = new PrivyClient({
  appId: process.env.PRIVY_APP_ID!,
  appSecret: process.env.PRIVY_APP_SECRET!,
  // Add your verification key from the dashboard for better performance
  // jwtVerificationKey: process.env.PRIVY_JWT_VERIFICATION_KEY,
});

/**
 * Get the authenticated user from the request by validating the Privy JWT token
 */
export async function getAuthId(req: NextRequest): Promise<string | null> {
  try {
    const accessToken = req.headers.get('authorization')?.replace('Bearer ', '');

    if (!accessToken) {
      throw new Error('Token not found');
    }

    // Use Privy's built-in verification method
    const verifiedToken = await privy.utils().auth().verifyAuthToken(accessToken);
    console.log("🚀 ~ getAuthId ~ verifiedToken:", verifiedToken)
    
    if (!verifiedToken) {
      throw new Error('Token not verified');
    }

    return verifiedToken.user_id
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

/**
 * Require authentication for an API route
 * Returns the authenticated id or throws an error
 */
export async function getRequiredAuthId(req: NextRequest): Promise<string> {
  const authId = await getAuthId(req);

  if (!authId) {
    throw new Error(API_MESSAGES.AUTH_REQUIRED_ERROR);
  }

  return authId;
}


