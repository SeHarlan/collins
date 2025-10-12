import type { Metadata } from 'next';
import {
  Cactus_Classical_Serif,
  Chocolate_Classical_Sans,
} from 'next/font/google';
import { PrivyProvider } from '@/components/providers/privyProvider';
import { QueryProvider } from '@/components/providers/queryProvider';
import { AtomProvider } from '@/components/providers/atomProvider';
import { cn } from '@/lib/utils/ui-utils';
import { NavBar } from '@/components/navigation/navBar';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const cactusClassicalSerif = Cactus_Classical_Serif({
  variable: '--font-cactus-serif',
  subsets: ['latin'],
  weight: ['400'],
});
const chocolateClassicalSans = Chocolate_Classical_Sans({
  variable: '--font-chocolate-sans',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Collins.finance - Non-Custodial Crypto Portfolio',
  description: 'Track and manage your crypto assets in one place',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          cactusClassicalSerif.variable,
          chocolateClassicalSans.variable,
        )}
      >
        <AtomProvider>
          <PrivyProvider>
            <QueryProvider>
              <NavBar />
              {children}
              <Toaster />
            </QueryProvider>
          </PrivyProvider>
        </AtomProvider>
      </body>
    </html>
  );
}
