# NFT Game Avatars

A full-stack Web3 gaming platform where players can create, battle, and trade unique NFT avatars. Built with modern web technologies and blockchain integration.

## Features

### Avatar System
- **Avatar Creation**: Customize and mint unique NFT avatars with traits including class (Warrior, Mage, Rogue), appearance, and accessories
- **Avatar Management**: View, manage, and track your avatar collection
- **Level & Progression**: Earn XP through gameplay to level up avatars and unlock new abilities

### Mini-Games
- **Battle Arena**: Epic turn-based battles against challenging opponents
- **Monster Quest**: Quest-based gameplay with dungeon exploration
- **Dice Duel**: Luck-based mini-game for high-risk/high-reward plays
- **XP Rewards**: Earn experience points and rewards from each game

### Marketplace
- **Trading System**: Buy and sell avatar NFTs on the decentralized marketplace
- **Listing Management**: Create listings, make offers, and track your sales
- **Price Discovery**: Real-time price filtering and sorting capabilities
- **Volume Tracking**: See total trading volume and floor prices

### Wallet Integration
- **MetaMask Support**: Seamless wallet connection with RainbowKit
- **Multi-Chain**: Support for Ethereum, Polygon, Arbitrum, Optimism, Base, and Sepolia
- **Secure Authentication**: Non-custodial wallet-based authentication

## Tech Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **React 19.2**: UI library with latest features
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling
- **shadcn/ui**: Component library
- **Zustand**: State management

### Web3
- **Wagmi**: React hooks for Ethereum
- **RainbowKit**: Wallet connection UI
- **Ethers.js**: Ethereum JavaScript library
- **Solidity**: Smart contracts for NFT and marketplace

### Backend (Smart Contracts)
- **ERC-721**: NFT standard implementation
- **OpenZeppelin**: Battle-tested contract libraries
- **Marketplace**: Decentralized trading system
- **Game Controller**: Mini-games orchestration

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with Web3 provider
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles with theme tokens
│   └── middleware.ts       # App middleware
├── components/
│   ├── avatar/             # Avatar components
│   │   ├── avatar-preview.tsx
│   │   ├── avatar-customizer.tsx
│   │   └── avatar-card.tsx
│   ├── games/              # Mini-games components
│   │   ├── game-card.tsx
│   │   ├── battle-game.tsx
│   │   └── games-page.tsx
│   ├── marketplace/        # Marketplace components
│   │   ├── listing-card.tsx
│   │   └── marketplace-page.tsx
│   ├── pages/              # Full page components
│   │   ├── mint-page.tsx
│   │   ├── dashboard-page.tsx
│   │   └── marketplace-page.tsx
│   ├── layout/             # Layout components
│   │   └── navbar.tsx
│   ├── providers/          # Context providers
│   │   └── web3-provider.tsx
│   └── ui/                 # Shadcn UI components
├── lib/
│   ├── web3-config.ts      # Web3 configuration
│   ├── avatar-generator.ts # Avatar trait generation
│   └── store/
│       └── wallet-store.ts # Zustand store
├── hooks/
│   ├── use-wallet.ts       # Wallet hook
│   └── use-mobile.ts       # Mobile detection
├── contracts/
│   ├── AvatarNFT.sol       # ERC-721 NFT contract
│   ├── Marketplace.sol     # Marketplace contract
│   └── GameController.sol  # Game logic contract
└── public/                 # Static assets
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MetaMask or compatible Web3 wallet
- For blockchain deployment: Hardhat or Truffle

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd nft-game-avatars
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

Get your WalletConnect project ID from [https://cloud.walletconnect.com](https://cloud.walletconnect.com)

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contracts

### AvatarNFT Contract
- Mint new avatars with customizable traits
- Track avatar stats (health, power, defense, speed)
- Experience and leveling system
- Staking functionality

### Marketplace Contract
- List avatars for sale
- Accept offers from buyers
- Automatic fee calculation
- Secure payment handling

### GameController Contract
- Track game sessions
- Award XP based on performance
- Leaderboard management
- Player statistics

## Deployment

### Smart Contracts
1. Configure Hardhat with your testnet/mainnet settings
2. Deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

3. Update contract addresses in `lib/web3-config.ts`

### Frontend
1. Deploy to Vercel:
```bash
vercel deploy
```

2. Or deploy to your preferred hosting:
```bash
npm run build
npm start
```

## Features in Development

- Advanced mini-games (Quest system, Dice Duel)
- Avatar merging and breeding
- Seasonal competitions
- DAO governance
- Cross-chain support
- Mobile app
- Real-time multiplayer battles

## API Reference

### Avatar Store (Zustand)
```typescript
// Get state
const { avatars, selectedAvatar, totalXP } = useWalletStore();

// Update state
const { addAvatar, updateAvatar, setSelectedAvatar } = useWalletStore();
```

### Wallet Hook
```typescript
// Use wallet connection
const { address, isConnected, disconnect } = useWallet();
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
- Discord: [Join community](https://discord.gg/your-invite)

## Roadmap

- Q1 2026: Beta launch with core features
- Q2 2026: Mobile app and cross-chain support
- Q3 2026: DAO governance implementation
- Q4 2026: Advanced gameplay mechanics

---

**Built with** ✨ by the Avatar Legends team
