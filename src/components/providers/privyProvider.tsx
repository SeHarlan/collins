'use client';

import { PrivyProvider as PrivyProviderBase } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { createSolanaRpc, createSolanaRpcSubscriptions } from '@solana/kit';

const NEXT_PUBLIC_PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || '';
const NEXT_PUBLIC_PRIVY_CLIENT_ID =
  process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || '';
/**
 * Make sure to check if privy is ready to start before consuming its state
 *
 * const {ready, user} = usePrivy();
 * !ready ? loading... : user stuff
 */
export function PrivyProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProviderBase
      appId={NEXT_PUBLIC_PRIVY_APP_ID}
      clientId={NEXT_PUBLIC_PRIVY_CLIENT_ID}
      config={{
        appearance: {
          walletList: ['detected_solana_wallets', 'metamask'],
        },
        externalWallets: { solana: { connectors: toSolanaWalletConnectors() } },
        solana: {
          rpcs: {
            'solana:mainnet': {
              rpc: createSolanaRpc('https://api.mainnet-beta.solana.com'),
              rpcSubscriptions: createSolanaRpcSubscriptions(
                'wss://api.mainnet-beta.solana.com',
              ),
            },
            'solana:devnet': {
              rpc: createSolanaRpc('https://api.devnet.solana.com'),
              rpcSubscriptions: createSolanaRpcSubscriptions(
                'wss://api.devnet.solana.com',
              ),
            },
          },
        },
      }}
    >
      {children}
    </PrivyProviderBase>
  );
}
