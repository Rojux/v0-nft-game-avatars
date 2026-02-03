'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ListingCardProps {
  id: number;
  name: string;
  seller: string;
  price: number;
  level: number;
  power: number;
  defense: number;
  speed: number;
  image?: string;
  onBuy?: () => void;
  onViewDetails?: () => void;
}

export function ListingCard({
  id,
  name,
  seller,
  price,
  level,
  power,
  defense,
  speed,
  onBuy,
  onViewDetails,
}: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur hover:bg-card/70 transition-all hover:shadow-lg overflow-hidden group">
      <CardContent className="p-0">
        {/* Image Placeholder */}
        <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary/30">#{id}</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 p-2 bg-background/80 hover:bg-background rounded-lg transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{name}</h3>
                <p className="text-xs text-muted-foreground font-mono mt-1">
                  Level {level}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                NFT #{id.toString().padStart(6, '0')}
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Power</p>
              <p className="text-sm font-bold text-foreground">{power}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Defense</p>
              <p className="text-sm font-bold text-foreground">{defense}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Speed</p>
              <p className="text-sm font-bold text-foreground">{speed}</p>
            </div>
          </div>

          {/* Price */}
          <div className="border-t border-border/50 pt-3">
            <p className="text-xs text-muted-foreground mb-1">Listed Price</p>
            <p className="text-lg font-bold text-primary">{price.toFixed(2)} ETH</p>
            <p className="text-xs text-muted-foreground mt-1">
              by {seller.slice(0, 6)}...{seller.slice(-4)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={onViewDetails}
              variant="outline"
              className="flex-1 bg-transparent"
              size="sm"
            >
              Details
            </Button>
            <Button
              onClick={onBuy}
              className="flex-1 gap-2"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
