'use client';

import { useState } from 'react';
import { useWallet } from '@/hooks/use-wallet';
import { useWalletStore } from '@/lib/store/wallet-store';
import { GameCard } from '@/components/games/game-card';
import { BattleGame } from '@/components/games/battle-game';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Sword, Zap, Dice6, TrendingUp } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type GameType = 'battle' | 'quest' | 'dice' | null;

const GAMES = [
  {
    id: 'battle',
    name: 'Battle Arena',
    description: 'Fight epic battles against challenging opponents',
    difficulty: 'medium' as const,
    maxXP: 500,
    players: 2450,
    icon: <Sword className="w-6 h-6" />,
  },
  {
    id: 'quest',
    name: 'Monster Quest',
    description: 'Complete quests and defeat monsters',
    difficulty: 'easy' as const,
    maxXP: 300,
    players: 1890,
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: 'dice',
    name: 'Dice Duel',
    description: 'Test your luck with dice rolls and card draws',
    difficulty: 'hard' as const,
    maxXP: 800,
    players: 3120,
    icon: <Dice6 className="w-6 h-6" />,
  },
];

export function GamesPage() {
  const { isConnected } = useWallet();
  const { selectedAvatar, setTotalXP, setGamesPlayed } = useWalletStore();
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const [isGameDialogOpen, setIsGameDialogOpen] = useState(false);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur border-2 border-dashed max-w-md w-full">
          <CardContent className="pt-8">
            <div className="text-center space-y-6">
              <AlertCircle className="w-16 h-16 mx-auto text-accent" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
                <p className="text-muted-foreground">
                  Connect to play games and earn rewards
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedAvatar) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur border-2 border-dashed max-w-md w-full">
          <CardContent className="pt-8">
            <div className="text-center space-y-6">
              <Zap className="w-16 h-16 mx-auto text-accent" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Select an Avatar</h2>
                <p className="text-muted-foreground">
                  Choose an avatar to play games
                </p>
              </div>
              <Button>Go to Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleGameEnd = (score: number, xpEarned: number) => {
    setTotalXP(prev => prev + xpEarned);
    setGamesPlayed(prev => prev + 1);
    setIsGameDialogOpen(false);
    setActiveGame(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Mini-Games</h1>
              <p className="text-muted-foreground mt-2">
                Play games with {selectedAvatar.name} to earn XP and rewards
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Playing as</p>
                <p className="font-semibold text-foreground">{selectedAvatar.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="font-semibold text-foreground">{selectedAvatar.level}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Health</p>
                <p className="font-semibold text-foreground">{selectedAvatar.health}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {GAMES.map(game => (
            <GameCard
              key={game.id}
              {...game}
              onPlay={() => {
                setActiveGame(game.id as GameType);
                setIsGameDialogOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="border-t border-border/50 bg-card/20 backdrop-blur py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Top Players</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { rank: 1, name: 'ShadowX', level: 42, xp: 125500 },
              { rank: 2, name: 'PhoenixRise', level: 39, xp: 118200 },
              { rank: 3, name: 'IceStorm', level: 37, xp: 110800 },
            ].map(player => (
              <Card key={player.rank} className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-primary">#{player.rank}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{player.name}</p>
                      <p className="text-sm text-muted-foreground">Level {player.level}</p>
                      <p className="text-sm font-mono text-accent mt-1">{player.xp.toLocaleString()} XP</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Game Dialog */}
      <Dialog open={isGameDialogOpen} onOpenChange={setIsGameDialogOpen}>
        <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {activeGame === 'battle' && 'Battle Arena'}
              {activeGame === 'quest' && 'Monster Quest'}
              {activeGame === 'dice' && 'Dice Duel'}
            </DialogTitle>
            <DialogDescription>
              Play as {selectedAvatar.name}
            </DialogDescription>
          </DialogHeader>

          {activeGame === 'battle' && selectedAvatar && (
            <BattleGame
              avatarName={selectedAvatar.name}
              avatarHealth={selectedAvatar.health}
              avatarPower={selectedAvatar.power}
              avatarDefense={selectedAvatar.defense}
              onGameEnd={handleGameEnd}
            />
          )}

          {activeGame === 'quest' && (
            <div className="py-8 text-center">
              <Zap className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Monster Quest game coming soon...</p>
            </div>
          )}

          {activeGame === 'dice' && (
            <div className="py-8 text-center">
              <Dice6 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Dice Duel game coming soon...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
