'use client';

import { LoadingDisplay } from '@/components/general/loading';
import { useRequireAuth } from '@/lib/auth/hooks';

export default function DashboardPage() {
  const { authReady } = useRequireAuth();

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
