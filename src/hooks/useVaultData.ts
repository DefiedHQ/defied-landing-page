'use client';

import { useReadContract, useReadContracts } from 'wagmi';
import { formatEther } from 'viem';
import { DIAMOND_HANDS_VAULT_ADDRESS, DIAMOND_HANDS_VAULT_ABI } from '@/config/contract';

const WSTETH_ADDRESS = '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0' as const;

const WSTETH_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: '_stETHAmount', type: 'uint256' }],
    name: 'getWstETHByStETH',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stEthPerToken',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const vaultContract = {
  address: DIAMOND_HANDS_VAULT_ADDRESS,
  abi: DIAMOND_HANDS_VAULT_ABI,
} as const;

export function useVaultData() {
  const { data, isLoading, refetch } = useReadContracts({
    contracts: [
      { ...vaultContract, functionName: 'allTimeHigh' },
      { ...vaultContract, functionName: 'allTimeHighReached' },
      { ...vaultContract, functionName: 'getETHPrice' },
      { ...vaultContract, functionName: 'earlyExitFeeBps' },
      { ...vaultContract, functionName: 'wstETHdeposited' },
      { address: WSTETH_ADDRESS, abi: WSTETH_ABI, functionName: 'stEthPerToken' },
    ],
  });

  const allTimeHighRaw = data?.[0]?.result as bigint | undefined;
  const athReached = data?.[1]?.result as boolean | undefined;
  const priceData = data?.[2]?.result as [bigint, bigint] | undefined;
  const earlyExitFeeBps = data?.[3]?.result as bigint | undefined;
  const totalWstETH = data?.[4]?.result as bigint | undefined;
  const stEthPerTokenRaw = data?.[5]?.result as bigint | undefined;

  // Chainlink uses 8 decimals
  const allTimeHighTarget = allTimeHighRaw ? Number(allTimeHighRaw) / 1e8 : 4953.73;
  const currentPrice = priceData?.[0] ? Number(priceData[0]) / 1e8 : undefined;
  const priceUpdatedAt = priceData?.[1] ? Number(priceData[1]) : undefined;
  const percentToATH = currentPrice ? ((allTimeHighTarget - currentPrice) / allTimeHighTarget) * 100 : undefined;
  const feePercent = earlyExitFeeBps ? Number(earlyExitFeeBps) / 100 : 10;

  // stEthPerToken is how much stETH 1 wstETH is worth (18 decimals)
  // wstETH amount = ETH amount / (stEthPerToken / 1e18)
  const stEthPerToken = stEthPerTokenRaw ? Number(stEthPerTokenRaw) / 1e18 : undefined;

  return {
    allTimeHighTarget,
    athReached: athReached ?? false,
    currentPrice,
    priceUpdatedAt,
    percentToATH: percentToATH && percentToATH > 0 ? percentToATH : 0,
    feePercent,
    totalWstETH: totalWstETH ? formatEther(totalWstETH) : '0',
    stEthPerToken,
    isLoading,
    refetch,
  };
}

export function useUserBalance(address: `0x${string}` | undefined) {
  const { data, isLoading, refetch } = useReadContract({
    address: DIAMOND_HANDS_VAULT_ADDRESS,
    abi: DIAMOND_HANDS_VAULT_ABI,
    functionName: 'wstETHbalance',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  return {
    wstETHBalance: data ? formatEther(data as bigint) : '0',
    wstETHBalanceRaw: data as bigint | undefined,
    isLoading,
    refetch,
  };
}
