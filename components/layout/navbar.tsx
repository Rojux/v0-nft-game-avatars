'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@/hooks/use-wallet';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X, Gamepad2, ShoppingCart, LayoutDashboard, TrendingUp } from 'lucide-react';

export function Navbar() {
  const { isConnected } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      requiresConnection: true,
    },
    {
      label: 'Marketplace',
      href: '/marketplace',
      icon: ShoppingCart,
      requiresConnection: false,
    },
    {
      label: 'Games',
      href: '/games',
      icon: Gamepad2,
      requiresConnection: true,
    },
    {
      label: 'Leaderboard',
      href: '/leaderboard',
      icon: TrendingUp,
      requiresConnection: false,
    },
  ];

  const visibleNavItems = navItems.filter(
    item => !item.requiresConnection || isConnected
  );

  return (
    <nav className="border-b border-border/50 bg-card/30 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold hidden sm:inline">Avatar Legends</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {visibleNavItems.map(item => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Wallet Button */}
            <Button variant="outline" size="sm" className="bg-transparent">
              {isConnected ? 'Connected' : 'Connect Wallet'}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border/50">
            {visibleNavItems.map(item => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
