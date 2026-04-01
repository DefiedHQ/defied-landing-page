'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { DIAMOND_HANDS_VAULT_ADDRESS, DIAMOND_HANDS_VAULT_ABI } from '@/config/contract';

export function useDeposit() {
  const { data: hash, writeContract, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const deposit = (ethAmount: string) => {
    if (!ethAmount || parseFloat(ethAmount) <= 0) return;
    writeContract({
      address: DIAMOND_HANDS_VAULT_ADDRESS,
      abi: DIAMOND_HANDS_VAULT_ABI,
      functionName: 'deposit',
      value: parseEther(ethAmount),
    });
  };

  return { deposit, isPending, isConfirming, isSuccess, error, hash, reset };
}

export function useWithdraw() {
  const { data: hash, writeContract, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const withdraw = () => {
    writeContract({
      address: DIAMOND_HANDS_VAULT_ADDRESS,
      abi: DIAMOND_HANDS_VAULT_ABI,
      functionName: 'withdraw',
    });
  };

  return { withdraw, isPending, isConfirming, isSuccess, error, hash, reset };
}

export function useNotifyATH() {
  const { data: hash, writeContract, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const notifyATH = () => {
    writeContract({
      address: DIAMOND_HANDS_VAULT_ADDRESS,
      abi: DIAMOND_HANDS_VAULT_ABI,
      functionName: 'notifyAllTimeHigh',
    });
  };

  return { notifyATH, isPending, isConfirming, isSuccess, error, hash, reset };
}
