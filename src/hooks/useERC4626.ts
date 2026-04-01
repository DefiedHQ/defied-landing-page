'use client';

import { useReadContract, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';
import { ERC20_ABI, ERC4626_ABI } from '@/config/erc4626';

const ZERO = '0x0000000000000000000000000000000000000000' as const;

export function useERC4626UserData(
  userAddress: `0x${string}` | undefined,
  vaultAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
  assetDecimals: number,
) {
  const { data: sharesRaw, refetch: refetchShares } = useReadContract({
    address: vaultAddress,
    abi: ERC4626_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress },
  });

  const shares = sharesRaw as bigint | undefined;

  const { data: assetValueRaw } = useReadContract({
    address: vaultAddress,
    abi: ERC4626_ABI,
    functionName: 'convertToAssets',
    args: shares && shares > 0n ? [shares] : undefined,
    query: { enabled: !!shares && shares > 0n },
  });

  const { data: allowanceRaw, refetch: refetchAllowance } = useReadContracts({
    contracts: [
      {
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: userAddress ? [userAddress, vaultAddress] : [ZERO, vaultAddress],
      },
    ],
    query: { enabled: !!userAddress },
  });

  return {
    shares: shares ?? 0n,
    assetValue: assetValueRaw ? formatUnits(assetValueRaw as bigint, assetDecimals) : '0',
    allowance: (allowanceRaw?.[0]?.result as bigint | undefined) ?? 0n,
    refetchShares,
    refetchAllowance,
  };
}
