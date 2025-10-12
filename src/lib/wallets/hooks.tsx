import { useWallets } from '@privy-io/react-auth/solana';

export const useEmbeddedWallet = () => {
  const { wallets, ready } = useWallets();
  const wallet = wallets.find(
    (wallet) => wallet.standardWallet.name === 'Privy',
  );

  return { embeddedWallet: wallet, walletReady: ready };
};
