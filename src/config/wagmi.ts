import { createConfig } from '@privy-io/wagmi';
import { mainnet } from 'viem/chains';
import { http } from 'wagmi';

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_RPC_URL || 'https://cloudflare-eth.com'),
  },
});
