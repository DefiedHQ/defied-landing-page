'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ERC20_ABI, ERC4626_ABI } from '@/config/erc4626';

export function useERC4626Approve() {
  const { data: hash, writeContract, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const approve = (tokenAddress: `0x${string}`, vaultAddress: `0x${string}`, amount: bigint) => {
    writeContract({ address: tokenAddress, abi: ERC20_ABI, functionName: 'approve', args: [vaultAddress, amount] });
  };

  return { approve, isPending, isConfirming, isSuccess, error, reset };
}

export function useERC4626Deposit() {
  const { data: hash, writeContract, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const deposit = (vaultAddress: `0x${string}`, amount: bigint, receiver: `0x${string}`) => {
    writeContract({ address: vaultAddress, abi: ERC4626_ABI, functionName: 'deposit', args: [amount, receiver] });
  };

  return { deposit, isPending, isConfirming, isSuccess, error, reset };
}

export function useERC4626Redeem() {
  const { data: hash, writeContract, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const redeem = (vaultAddress: `0x${string}`, shares: bigint, receiver: `0x${string}`, owner: `0x${string}`) => {
    writeContract({ address: vaultAddress, abi: ERC4626_ABI, functionName: 'redeem', args: [shares, receiver, owner] });
  };

  return { redeem, isPending, isConfirming, isSuccess, error, reset };
}
