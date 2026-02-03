import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'NFT Game Avatars',
  projectId: 'YOUR_PROJECT_ID', // Get this from https://cloud.walletconnect.com
  chains: [mainnet, polygon, arbitrum, optimism, base, sepolia],
  ssr: true,
});

// Contract addresses (replace with deployed addresses)
export const CONTRACTS = {
  AVATAR_NFT: '0x0000000000000000000000000000000000000000',
  MARKETPLACE: '0x0000000000000000000000000000000000000000',
  GAME_CONTROLLER: '0x0000000000000000000000000000000000000000',
};

// ABI for Avatar NFT contract
export const AVATAR_NFT_ABI = [
  {
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_class', type: 'uint256' },
    ],
    name: 'mintAvatar',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: '_tokenId', type: 'uint256' }],
    name: 'getAvatar',
    outputs: [
      { name: 'name', type: 'string' },
      { name: 'level', type: 'uint256' },
      { name: 'experience', type: 'uint256' },
      { name: 'health', type: 'uint256' },
      { name: 'power', type: 'uint256' },
      { name: 'defense', type: 'uint256' },
      { name: 'speed', type: 'uint256' },
      { name: 'mintedAt', type: 'uint256' },
      { name: 'isStaked', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: '_user', type: 'address' }],
    name: 'getUserAvatars',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'to', type: 'address' },
      { indexed: true, name: 'tokenId', type: 'uint256' },
      { indexed: false, name: 'name', type: 'string' },
    ],
    name: 'AvatarMinted',
    type: 'event',
  },
] as const;
