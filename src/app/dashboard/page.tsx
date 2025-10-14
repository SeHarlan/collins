'use client';

import { CLIENT_PATHWAYS } from '@/constants/clientPathways';
import { LoadingDisplay } from '@/components/general/loading';
import { useRequireAuth } from '@/lib/auth/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { authUser,authReady } = useRequireAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!user) return;
    
  //   // TODO: if !user.portfolios.length {
  //   router.push(CLIENT_PATHWAYS.ONBOARDING);
  //   }
  // }, [authReady, user]);

  if (!authReady) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <LoadingDisplay />
      </div>
    );
  }
  return <div>Dashboard</div>;
}
