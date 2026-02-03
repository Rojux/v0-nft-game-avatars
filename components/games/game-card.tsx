'use client';

import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Users } from 'lucide-react';

interface GameCardProps {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  maxXP: number;
  players: number;
  icon: React.ReactNode;
  onPlay: () => void;
}

export function GameCard({
  name,
  description,
  difficulty,
  maxXP,
  players,
  icon,
  onPlay,
}: GameCardProps) {
  const difficultyColor = {
    easy: 'bg-green-500/20 text-green-700',
    medium: 'bg-yellow-500/20 text-yellow-700',
    hard: 'bg-red-500/20 text-red-700',
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/70 transition-all hover:shadow-lg overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/20 text-primary">
              {icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={`${difficultyColor[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Zap className="w-3 h-3" />
            {maxXP} XP
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          {players} players in the last hour
        </div>

        <Button onClick={onPlay} className="w-full gap-2">
          <Zap className="w-4 h-4" />
          Play Now
        </Button>
      </CardContent>
    </Card>
  );
}
