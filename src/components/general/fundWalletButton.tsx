import { useFundWallet } from '@privy-io/react-auth/solana';
import { useAuth } from '@/lib/auth/hooks';
import { Button } from '../ui/button';

import { WalletIcon } from 'lucide-react';
import { useEmbeddedWallet } from '@/lib/api/wallets/hooks';

export const FundWalletButton = () => {
  const { fundWallet } = useFundWallet();
  const { embeddedWallet } = useEmbeddedWallet();

  const handleFundWallet = () => {
    if (!embeddedWallet) return;
    fundWallet(embeddedWallet);
  };

  return (
    <Button variant="secondary" onClick={handleFundWallet}>
      Fund Wallet <WalletIcon />
    </Button>
  );
};
