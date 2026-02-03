'use client';

import { useState, useMemo } from 'react';
import { ListingCard } from '@/components/marketplace/listing-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { TrendingUp, Search, Filter } from 'lucide-react';

// Mock marketplace data
const MOCK_LISTINGS = [
  {
    id: 1001,
    name: 'Flame Dragon',
    seller: '0x1234567890123456789012345678901234567890',
    price: 2.5,
    level: 15,
    power: 95,
    defense: 70,
    speed: 65,
  },
  {
    id: 1002,
    name: 'Shadow Knight',
    seller: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    price: 1.8,
    level: 12,
    power: 85,
    defense: 90,
    speed: 50,
  },
  {
    id: 1003,
    name: 'Crystal Sage',
    seller: '0xfedcbafedcbafedcbafedcbafedcbafedcbafed',
    price: 3.2,
    level: 18,
    power: 110,
    defense: 60,
    speed: 75,
  },
  {
    id: 1004,
    name: 'Storm Runner',
    seller: '0x0000000000000000000000000000000000000001',
    price: 1.5,
    level: 10,
    power: 70,
    defense: 55,
    speed: 95,
  },
  {
    id: 1005,
    name: 'Iron Golem',
    seller: '0x0000000000000000000000000000000000000002',
    price: 2.1,
    level: 14,
    power: 80,
    defense: 100,
    speed: 40,
  },
  {
    id: 1006,
    name: 'Mystic Phoenix',
    seller: '0x0000000000000000000000000000000000000003',
    price: 4.5,
    level: 20,
    power: 120,
    defense: 75,
    speed: 80,
  },
];

type SortBy = 'recent' | 'price-low' | 'price-high' | 'level';

export function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('recent');
  const [minLevel, setMinLevel] = useState('1');
  const [maxPrice, setMaxPrice] = useState('10');

  const filteredAndSortedListings = useMemo(() => {
    let filtered = MOCK_LISTINGS.filter(listing => {
      const matchesSearch =
        listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.seller.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel = listing.level >= parseInt(minLevel);
      const matchesPrice = listing.price <= parseFloat(maxPrice);

      return matchesSearch && matchesLevel && matchesPrice;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'level':
        filtered.sort((a, b) => b.level - a.level);
        break;
      case 'recent':
      default:
        break;
    }

    return filtered;
  }, [searchTerm, sortBy, minLevel, maxPrice]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Avatar Marketplace</h1>
              <p className="text-muted-foreground mt-2">
                Discover and trade unique avatar NFTs
              </p>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="border-border/50 bg-card/40 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground">Total Listings</div>
                  <div className="text-2xl font-bold mt-1">{MOCK_LISTINGS.length}</div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/40 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground">Total Volume</div>
                  <div className="text-2xl font-bold mt-1">
                    {(MOCK_LISTINGS.reduce((sum, l) => sum + l.price, 0)).toFixed(1)} ETH
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/40 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground">Floor Price</div>
                  <div className="text-2xl font-bold mt-1">
                    {Math.min(...MOCK_LISTINGS.map(l => l.price)).toFixed(2)} ETH
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="border-b border-border/50 bg-card/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or seller..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input/50"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
                  <SelectTrigger className="bg-input/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recent Listings</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="level">Highest Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Min Level
                </label>
                <Input
                  type="number"
                  min="1"
                  max="50"
                  value={minLevel}
                  onChange={(e) => setMinLevel(e.target.value)}
                  className="bg-input/50"
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Max Price (ETH)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="bg-input/50"
                />
              </div>

              <Button
                variant="outline"
                className="self-end bg-transparent"
                onClick={() => {
                  setSearchTerm('');
                  setSortBy('recent');
                  setMinLevel('1');
                  setMaxPrice('10');
                }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredAndSortedListings.length === 0 ? (
          <Card className="border-border/50 bg-card/50 backdrop-blur border-2 border-dashed">
            <CardContent className="pt-12 text-center pb-12">
              <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Listings Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to find what you're looking for
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  Showing {filteredAndSortedListings.length} Avatar{filteredAndSortedListings.length !== 1 ? 's' : ''}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Filtered from {MOCK_LISTINGS.length} total listings
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  {...listing}
                  onBuy={() => {
                    console.log('Buying avatar', listing.id);
                  }}
                  onViewDetails={() => {
                    console.log('Viewing details for', listing.id);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
