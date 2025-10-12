'use client';

import { useAuth } from '@/lib/auth/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingDisplay } from '@/components/general/loading';
import { CLIENT_PATHWAYS } from '@/constants/clientPathways';
import { LoginButton } from '@/components/general/loginButton';

export default function LoginPage() {
  const { isAuthenticated, authReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && authReady) {
      router.push(CLIENT_PATHWAYS.DASHBOARD);
    }
  }, [isAuthenticated, authReady]);

  if (!authReady) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <LoadingDisplay />
      </div>
    );
  }

  return (
    <div className="bg-muted flex min-h-screen items-center justify-center">
      <Card className="w-screen-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl">
            Welcome to Collins
          </CardTitle>
          <CardDescription>
            Track and manage your crypto portfolio in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginButton className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
