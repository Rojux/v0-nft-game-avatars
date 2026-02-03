'use client';

import { useState } from 'react';
import { useWallet } from '@/hooks/use-wallet';
import { useWalletStore } from '@/lib/store/wallet-store';
import { AvatarCard } from '@/components/avatar/avatar-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Plus, Trophy, Zap, X } from 'lucide-react';

export function DashboardPage() {
  const { isConnected, address } = useWallet();
  const { avatars, selectedAvatar, setSelectedAvatar, totalXP, gamesPlayed } = useWalletStore();
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'staked'>('all');
  const [showDetails, setShowDetails] = useState(false);

  const filteredAvatars = avatars.filter(avatar => {
    if (selectedTab === 'active') return !avatar.isStaked;
    if (selectedTab === 'staked') return avatar.isStaked;
    return true;
  });

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
                  Connect to view and manage your avatars
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Your Collection</h1>
              <p className="text-muted-foreground mt-2">
                Manage and view your NFT avatars
              </p>
            </div>
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              <Plus className="w-5 h-5" />
              Create New Avatar
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Total Avatars
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{avatars.length}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {avatars.filter(a => a.isStaked).length} staked
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Total XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalXP.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {gamesPlayed} games played
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Wallet Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-mono text-primary truncate">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Connected & Active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Avatars Grid */}
        {avatars.length === 0 ? (
          <Card className="border-border/50 bg-card/50 backdrop-blur border-2 border-dashed">
            <CardContent className="pt-12 text-center pb-12">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">No Avatars Yet</h3>
                <p className="text-muted-foreground">
                  Create your first avatar NFT to get started
                </p>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Avatar
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
              <TabsList className="grid w-full grid-cols-3 bg-muted mb-8">
                <TabsTrigger value="all">
                  All ({avatars.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active ({avatars.filter(a => !a.isStaked).length})
                </TabsTrigger>
                <TabsTrigger value="staked">
                  Staked ({avatars.filter(a => a.isStaked).length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAvatars.map(avatar => (
                    <AvatarCard
                      key={avatar.id}
                      {...avatar}
                      onSelect={() => {
                        setSelectedAvatar(avatar);
                        setShowDetails(true);
                      }}
                      onStake={() => {
                        console.log('Staking avatar', avatar.id);
                      }}
                      onUnstake={() => {
                        console.log('Unstaking avatar', avatar.id);
                      }}
                      onSell={() => {
                        console.log('Selling avatar', avatar.id);
                      }}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="active" className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAvatars.map(avatar => (
                    <AvatarCard
                      key={avatar.id}
                      {...avatar}
                      onSelect={() => {
                        setSelectedAvatar(avatar);
                        setShowDetails(true);
                      }}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="staked" className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAvatars.map(avatar => (
                    <AvatarCard
                      key={avatar.id}
                      {...avatar}
                      onSelect={() => {
                        setSelectedAvatar(avatar);
                        setShowDetails(true);
                      }}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

      {/* Avatar Details Modal */}
      {showDetails && selectedAvatar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="border-border/50 bg-card/95 backdrop-blur w-full max-w-2xl">
            <CardHeader className="flex flex-row items-start justify-between pb-4 border-b border-border/50">
              <div>
                <CardTitle className="text-2xl">{selectedAvatar.name}</CardTitle>
                <CardDescription>
                  Level {selectedAvatar.level} • ID #{selectedAvatar.id.toString().padStart(6, '0')}
                </CardDescription>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Health</p>
                  <p className="text-2xl font-bold">{selectedAvatar.health}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Power</p>
                  <p className="text-2xl font-bold">{selectedAvatar.power}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Defense</p>
                  <p className="text-2xl font-bold">{selectedAvatar.defense}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Speed</p>
                  <p className="text-2xl font-bold">{selectedAvatar.speed}</p>
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold">Experience</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedAvatar.experience}/1000
                  </p>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${(selectedAvatar.experience / 1000) * 100}%` }}
                  />
                </div>
              </div>

              {/* Status */}
              {selectedAvatar.isStaked && (
                <Badge variant="secondary" className="w-fit">
                  Currently Staked
                </Badge>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Play Games
                </Button>
                <Button className="flex-1">
                  {selectedAvatar.isStaked ? 'Unstake' : 'Stake'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
