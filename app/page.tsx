'use client';

import { useWallet } from '@/hooks/use-wallet';
import { useWalletStore } from '@/lib/store/wallet-store';
import { MintPage } from '@/components/pages/mint-page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Gamepad2, ShoppingCart, Trophy, Sparkles, Wallet } from 'lucide-react';

export default function Home() {
  const { isConnected } = useWallet();
  const { avatars } = useWalletStore();

  if (isConnected && avatars.length === 0) {
    return <MintPage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/30 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold hidden sm:block">Avatar Legends</h1>
          </div>
          <Button variant="outline" size="sm" className="bg-transparent gap-2">
            <Wallet className="w-4 h-4" />
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 sm:py-28">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 mx-auto block w-fit gap-2">
            <Zap className="w-3 h-3" />
            Web3 Gaming Revolution
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-balance mb-6">
            Create, Battle & Trade <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">NFT Avatars</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Mint your unique avatar, battle in mini-games, and trade on the marketplace. Build your gaming empire in the Web3 ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {!isConnected ? (
              <Button size="lg" className="gap-2 text-base">
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </Button>
            ) : (
              <>
                <Button size="lg" className="gap-2 text-base">
                  <Sparkles className="w-5 h-5" />
                  Create Avatar
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-base bg-transparent">
                  <ShoppingCart className="w-5 h-5" />
                  Explore Marketplace
                </Button>
              </>
            )}
          </div>

          {/* Feature Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {[
              {
                icon: Sparkles,
                title: 'Create',
                description: 'Customize and mint your unique avatar NFT',
              },
              {
                icon: Gamepad2,
                title: 'Play',
                description: 'Battle in mini-games and earn XP rewards',
              },
              {
                icon: ShoppingCart,
                title: 'Trade',
                description: 'Buy and sell avatars on the marketplace',
              },
              {
                icon: Trophy,
                title: 'Compete',
                description: 'Climb the leaderboards and prove your skill',
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="border-border/50 bg-card/30 backdrop-blur hover:bg-card/50 transition-colors">
                  <CardContent className="pt-6 text-center">
                    <Icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-border/50 bg-card/20 backdrop-blur py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { number: '50K+', label: 'Avatars Minted' },
              { number: '25K+', label: 'Active Players' },
              { number: '$2.5M', label: 'Trading Volume' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-border/50 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-6">
            Ready to Join the Adventure?
          </h2>
          <p className="text-lg text-muted-foreground text-balance mb-8">
            Start creating, playing, and trading today. Your avatar awaits.
          </p>
          <Button size="lg" className="gap-2 text-base">
            {!isConnected ? (
              <>
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Create Your First Avatar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>Avatar Legends © 2026. Built with Web3 technology.</p>
        </div>
      </footer>
    </div>
  );
}
