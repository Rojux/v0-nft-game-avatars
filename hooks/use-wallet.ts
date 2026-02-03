'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useEffect } from 'react';
import { useWalletStore } from '@/lib/store/wallet-store';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const {
    setUserAddress,
    setIsConnected,
    reset,
  } = useWalletStore();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
      setIsConnected(true);
    } else {
      setIsConnected(false);
      setUserAddress(null);
    }
  }, [isConnected, address, setUserAddress, setIsConnected]);

  const disconnectWallet = () => {
    disconnect();
    reset();
  };

  return {
    address,
    isConnected,
    disconnect: disconnectWallet,
  };
}
