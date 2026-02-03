'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Heart, Zap, Shield } from 'lucide-react';

interface BattleGameProps {
  avatarName: string;
  avatarHealth: number;
  avatarPower: number;
  avatarDefense: number;
  onGameEnd: (score: number, xpEarned: number) => void;
}

interface Enemy {
  name: string;
  health: number;
  maxHealth: number;
  power: number;
  defense: number;
  damage: number;
}

export function BattleGame({
  avatarName,
  avatarHealth,
  avatarPower,
  avatarDefense,
  onGameEnd,
}: BattleGameProps) {
  const [playerHealth, setPlayerHealth] = useState(avatarHealth);
  const [maxPlayerHealth] = useState(avatarHealth);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [turn, setTurn] = useState(0);
  const [log, setLog] = useState<string[]>(['Battle started!']);

  const [enemy, setEnemy] = useState<Enemy>({
    name: 'Shadow Beast',
    health: 100,
    maxHealth: 100,
    power: 45,
    defense: 30,
    damage: 0,
  });

  const addLog = (message: string) => {
    setLog(prev => [...prev.slice(-9), message]);
  };

  const calculateDamage = (attacker: number, defender: number, targetDefense: number) => {
    const baseDamage = Math.max(1, attacker - targetDefense / 2);
    const variance = Math.random() * 0.2 - 0.1;
    return Math.round(baseDamage * (1 + variance));
  };

  const handleAttack = () => {
    if (gameOver) return;

    const damage = calculateDamage(avatarPower, enemy.power, enemy.defense);
    const newEnemyHealth = Math.max(0, enemy.health - damage);

    addLog(`${avatarName} attacks for ${damage} damage!`);
    setScore(prev => prev + damage);

    if (newEnemyHealth <= 0) {
      setEnemy(prev => ({ ...prev, health: 0 }));
      setWon(true);
      setGameOver(true);
      return;
    }

    setEnemy(prev => ({ ...prev, health: newEnemyHealth }));

    // Enemy counter-attack after a short delay
    setTimeout(() => {
      const enemyDamage = calculateDamage(enemy.power, avatarPower, avatarDefense);
      const newPlayerHealth = Math.max(0, playerHealth - enemyDamage);

      addLog(`${enemy.name} attacks for ${enemyDamage} damage!`);

      if (newPlayerHealth <= 0) {
        setPlayerHealth(0);
        setGameOver(true);
        return;
      }

      setPlayerHealth(newPlayerHealth);
      setTurn(prev => prev + 1);
    }, 500);
  };

  const handleDefend = () => {
    if (gameOver) return;

    const damage = calculateDamage(enemy.power, avatarPower * 1.5, avatarDefense);
    const newPlayerHealth = Math.max(0, playerHealth - Math.round(damage * 0.5));

    addLog(`${avatarName} takes a defensive stance!`);
    addLog(`${enemy.name} deals ${Math.round(damage * 0.5)} damage (reduced)!`);

    if (newPlayerHealth <= 0) {
      setPlayerHealth(0);
      setGameOver(true);
      return;
    }

    setPlayerHealth(newPlayerHealth);
    setScore(prev => prev + 10);
    setTurn(prev => prev + 1);
  };

  const handleSpecialAttack = () => {
    if (gameOver) return;

    const damage = Math.round(avatarPower * 1.5);
    const newEnemyHealth = Math.max(0, enemy.health - damage);

    addLog(`${avatarName} uses a special attack for ${damage} damage!`);
    setScore(prev => prev + damage * 2);

    if (newEnemyHealth <= 0) {
      setEnemy(prev => ({ ...prev, health: 0 }));
      setWon(true);
      setGameOver(true);
      return;
    }

    setEnemy(prev => ({ ...prev, health: newEnemyHealth }));

    // Enemy counter with reduced damage
    setTimeout(() => {
      const enemyDamage = calculateDamage(enemy.power, avatarPower, avatarDefense);
      const newPlayerHealth = Math.max(0, playerHealth - Math.round(enemyDamage * 0.3));

      addLog(`${enemy.name} counterattacks for ${Math.round(enemyDamage * 0.3)} damage!`);

      if (newPlayerHealth <= 0) {
        setPlayerHealth(0);
        setGameOver(true);
        return;
      }

      setPlayerHealth(newPlayerHealth);
      setTurn(prev => prev + 1);
    }, 500);
  };

  const xpEarned = Math.round(score / 2);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Battle Arena */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle>Battle Arena</CardTitle>
          <CardDescription>Turn {turn}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Player */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{avatarName}</h3>
              <Badge variant="outline">{playerHealth} / {maxPlayerHealth} HP</Badge>
            </div>
            <Progress
              value={(playerHealth / maxPlayerHealth) * 100}
              className="h-3"
            />
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                {avatarPower} Power
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-500" />
                {avatarDefense} Defense
              </div>
            </div>
          </div>

          <div className="text-center text-muted-foreground">vs</div>

          {/* Enemy */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{enemy.name}</h3>
              <Badge variant="outline">{enemy.health} / {enemy.maxHealth} HP</Badge>
            </div>
            <Progress
              value={(enemy.health / enemy.maxHealth) * 100}
              className="h-3"
            />
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                {enemy.power} Power
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-500" />
                {enemy.defense} Defense
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Battle Log */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Battle Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-background/50 rounded-lg p-4 h-40 overflow-y-auto space-y-2">
            {log.map((line, i) => (
              <p key={i} className="text-sm text-muted-foreground">
                {line}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Score</p>
            <p className="text-2xl font-bold text-primary">{score}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">XP Earned</p>
            <p className="text-2xl font-bold text-accent">{xpEarned}</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions or Result */}
      {gameOver ? (
        <Card className={`border-border/50 backdrop-blur ${won ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
          <CardContent className="pt-6 text-center space-y-4">
            <div className="space-y-2">
              <h3 className={`text-2xl font-bold ${won ? 'text-green-600' : 'text-red-600'}`}>
                {won ? 'Victory!' : 'Defeat!'}
              </h3>
              <p className="text-muted-foreground">
                {won ? 'You defeated the Shadow Beast!' : 'You were defeated in battle'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-lg">
                <span className="font-semibold text-primary">{xpEarned} XP</span> earned
              </p>
              <p className="text-sm text-muted-foreground">
                Final Score: {score}
              </p>
            </div>

            <Button
              onClick={() => onGameEnd(score, xpEarned)}
              className="w-full"
            >
              Finish Game
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex gap-3">
          <Button
            onClick={handleAttack}
            className="flex-1"
            size="lg"
            variant="default"
          >
            Attack
          </Button>
          <Button
            onClick={handleDefend}
            className="flex-1 bg-transparent"
            size="lg"
            variant="outline"
          >
            Defend
          </Button>
          <Button
            onClick={handleSpecialAttack}
            className="flex-1"
            size="lg"
            variant="secondary"
          >
            Special
          </Button>
        </div>
      )}
    </div>
  );
}
