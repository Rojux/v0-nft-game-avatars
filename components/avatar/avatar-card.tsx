'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical, Zap, Heart, Shield, Medal as Zeta } from 'lucide-react';

interface AvatarCardProps {
  id: number;
  name: string;
  level: number;
  experience: number;
  health: number;
  power: number;
  defense: number;
  speed: number;
  isStaked: boolean;
  onSelect?: () => void;
  onStake?: () => void;
  onUnstake?: () => void;
  onSell?: () => void;
}

export function AvatarCard({
  id,
  name,
  level,
  experience,
  health,
  power,
  defense,
  speed,
  isStaked,
  onSelect,
  onStake,
  onUnstake,
  onSell,
}: AvatarCardProps) {
  const maxXP = 1000;
  const xpPercent = (experience / maxXP) * 100;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/70 transition-all hover:shadow-lg overflow-hidden group">
      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>Level {level}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onSelect}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {isStaked && (
          <Badge className="w-fit mt-2" variant="secondary">
            Staked
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Avatar ID */}
        <div className="text-xs text-muted-foreground font-mono">
          ID: #{id.toString().padStart(6, '0')}
        </div>

        {/* Experience Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-foreground">Experience</label>
            <span className="text-xs text-muted-foreground">
              {experience}/{maxXP}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-xs font-medium">Health</span>
            </div>
            <p className="text-sm font-bold text-foreground">{health}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-medium">Power</span>
            </div>
            <p className="text-sm font-bold text-foreground">{power}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium">Defense</span>
            </div>
            <p className="text-sm font-bold text-foreground">{defense}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zeta className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-medium">Speed</span>
            </div>
            <p className="text-sm font-bold text-foreground">{speed}</p>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onSelect}
          variant="outline"
          className="w-full bg-transparent"
          size="sm"
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}
