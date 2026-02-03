'use client';

import { useState } from 'react';
import { useWallet } from '@/hooks/use-wallet';
import { useWalletStore } from '@/lib/store/wallet-store';
import { AvatarTraits } from '@/lib/avatar-generator';
import { AvatarCustomizer } from '@/components/avatar/avatar-customizer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Wallet } from 'lucide-react';

export function MintPage() {
  const { address, isConnected } = useWallet();
  const { addAvatar } = useWalletStore();
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMintAvatar = async (traits: AvatarTraits, name: string) => {
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    setIsMinting(true);
    setError(null);

    try {
      // Simulate minting (replace with actual contract call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add avatar to store (mock data)
      const newAvatar = {
        id: Math.floor(Math.random() * 10000),
        name: name,
        level: 1,
        experience: 0,
        health: 100,
        power: 50,
        defense: 30,
        speed: 40,
        mintedAt: Date.now(),
        isStaked: false,
      };

      addAvatar(newAvatar);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mint avatar');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Create Your Avatar</h1>
          <p className="text-muted-foreground mt-2">Mint your unique NFT avatar and start your gaming journey</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isConnected ? (
          <Card className="border-border/50 bg-card/50 backdrop-blur border-2 border-dashed">
            <CardContent className="pt-8">
              <div className="text-center space-y-6">
                <AlertCircle className="w-16 h-16 mx-auto text-accent" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
                  <p className="text-muted-foreground mb-6">
                    Connect a Web3 wallet to mint and own your avatar NFT
                  </p>
                </div>
                <Button size="lg" className="gap-2">
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Connected Info */}
            <Card className="border-border/50 bg-card/50 backdrop-blur border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Connected Wallet</p>
                    <p className="font-mono text-sm font-semibold text-primary mt-1">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Mint Price</p>
                    <p className="text-2xl font-bold text-primary">0.1 ETH</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Alert */}
            {error && (
              <Card className="border-destructive/50 bg-destructive/10 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-destructive">Error</h3>
                      <p className="text-sm text-destructive/80 mt-1">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Avatar Customizer */}
            <AvatarCustomizer
              onConfirm={handleMintAvatar}
              isLoading={isMinting}
            />

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Warrior</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Strong and resilient</p>
                  <p>High health & power</p>
                  <p>Perfect for combat</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Mage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Master of magic</p>
                  <p>High power & speed</p>
                  <p>Spell casting expert</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Rogue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>Swift and cunning</p>
                  <p>High speed & stealth</p>
                  <p>Master of evasion</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
