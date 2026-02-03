import { create } from 'zustand';

interface Avatar {
  id: number;
  name: string;
  level: number;
  experience: number;
  health: number;
  power: number;
  defense: number;
  speed: number;
  mintedAt: number;
  isStaked: boolean;
}

interface WalletState {
  userAddress: string | null;
  avatars: Avatar[];
  selectedAvatar: Avatar | null;
  totalXP: number;
  gamesPlayed: number;
  isConnected: boolean;

  setUserAddress: (address: string | null) => void;
  setAvatars: (avatars: Avatar[]) => void;
  addAvatar: (avatar: Avatar) => void;
  setSelectedAvatar: (avatar: Avatar | null) => void;
  updateAvatar: (avatar: Avatar) => void;
  setTotalXP: (xp: number) => void;
  setGamesPlayed: (count: number) => void;
  setIsConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  userAddress: null,
  avatars: [],
  selectedAvatar: null,
  totalXP: 0,
  gamesPlayed: 0,
  isConnected: false,

  setUserAddress: (address) => set({ userAddress: address }),
  setAvatars: (avatars) => set({ avatars }),
  addAvatar: (avatar) =>
    set((state) => ({ avatars: [...state.avatars, avatar] })),
  setSelectedAvatar: (avatar) => set({ selectedAvatar: avatar }),
  updateAvatar: (updatedAvatar) =>
    set((state) => ({
      avatars: state.avatars.map((a) =>
        a.id === updatedAvatar.id ? updatedAvatar : a
      ),
      selectedAvatar:
        state.selectedAvatar?.id === updatedAvatar.id
          ? updatedAvatar
          : state.selectedAvatar,
    })),
  setTotalXP: (xp) => set({ totalXP: xp }),
  setGamesPlayed: (count) => set({ gamesPlayed: count }),
  setIsConnected: (connected) => set({ isConnected: connected }),
  reset: () =>
    set({
      userAddress: null,
      avatars: [],
      selectedAvatar: null,
      totalXP: 0,
      gamesPlayed: 0,
      isConnected: false,
    }),
}));
