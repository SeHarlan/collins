'use client';

import { PrivyInterface, usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { CLIENT_PATHWAYS } from '@/constants/clientPathways';
import { apiClient } from '@/lib/api/utils/client';
import { AuthUser } from './types';

const emailFromAccount = (account: Object) => {
  if(typeof account !== 'object') return undefined;
  if ("email" in account && !!account.email && typeof account.email === 'string') return account.email;
  return undefined;
};

const getEmailFromPrivyUser = (privyUser: PrivyInterface['user']) => {
  if(privyUser.email && typeof privyUser.email === 'string') return emailFromAccount(privyUser.email);
  const account = privyUser.linkedAccounts.find(emailFromAccount);
  return emailFromAccount(account);
};
export const useAuth = () => {
  const { authenticated, ready, user, login, logout, getAccessToken } = usePrivy();
  const authUser: AuthUser | null = ready ? {
    privyId: user.id,
    email: getEmailFromPrivyUser(user),
  } : null;

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const interceptorIdRef = useRef<number | null>(null);

  // Get access token when user is authenticated
  useEffect(() => {
    const fetchAccessToken = async () => {
      if (authenticated && authUser) {
        try {
          const token = await getAccessToken();
          setAccessToken(token);
        } catch (error) {
          console.error('Failed to get access token:', error);
          setAccessToken(null);
        }
      } else {
        setAccessToken(null);
      }
    };

    fetchAccessToken();
  }, [authenticated, authUser, getAccessToken]);

  // Set up axios interceptor for auth headers
  useEffect(() => {
    // Clean up previous interceptor if it exists
    if (interceptorIdRef.current !== null) {
      apiClient.interceptors.request.eject(interceptorIdRef.current);
    }

    // Add new request interceptor
    const interceptorId = apiClient.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        } else {
          // Remove auth header if no token
          delete config.headers['Authorization'];
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    interceptorIdRef.current = interceptorId;

    // Cleanup function
    return () => {
      if (interceptorIdRef.current !== null) {
        apiClient.interceptors.request.eject(interceptorIdRef.current);
        interceptorIdRef.current = null;
      }
    };
  }, [accessToken]);

  return {
    isAuthenticated: authenticated,
    authReady: ready,
    authUser,
    accessToken,
    login,
    logout,
  };
};

export const useRequireAuth = () => {
  const authProps = useAuth();
  const { isAuthenticated, authReady } = authProps;
  const router = useRouter();

  useEffect(() => {
    if (authReady && !isAuthenticated) {
      router.push(CLIENT_PATHWAYS.LOGIN);
    }
  }, [authReady, isAuthenticated, router]);

  return authProps;
};
