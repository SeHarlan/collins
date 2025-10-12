'use client';

import { Provider } from 'jotai';
import { ReactNode } from 'react';

interface AtomProviderProps {
  children: ReactNode;
}

export function AtomProvider({ children }: AtomProviderProps) {
  return <Provider>{children}</Provider>;
}
