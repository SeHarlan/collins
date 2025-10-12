'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserData } from '../db/schemas/user.schema';
import { CLIENT_PATHWAYS } from '@/constants/clientPathways';
import { useWallets } from '@privy-io/react-auth/solana';

export const useAuth = () => {
  const { authenticated, ready, user: authUser, login, logout } = usePrivy();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (authUser) {
      //TODO will fetch from db with privy id
      setUser({
        privyId: authUser.id,
        email: authUser.email?.address,
       
      });
    }
  }, [ authUser ]);


  return {
    isAuthenticated: authenticated,
    authReady: ready,
    user,
    login,
    logout,
  }
}

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
}
