"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowLeftToLine, ArrowRightToLine, Wallet, BarChart3, TrendingUp, ArrowDownUp, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
  { name: 'Deposit', href: '/deposit', icon: <ArrowDownUp className="h-5 w-5" /> },
  { name: 'Redeem', href: '/redeem', icon: <TrendingUp className="h-5 w-5" /> },
  { name: 'Arbitrage', href: '/arbitrage', icon: <BarChart3 className="h-5 w-5" /> },
  { name: 'Analytics', href: '/analytics', icon: <LayoutDashboard className="h-5 w-5" /> },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse on mobile
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [pathname, isMobile]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen z-30 flex flex-col border-r bg-background transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64',
        isMobile && (isCollapsed ? '-translate-x-full' : 'translate-x-0')
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center justify-between h-16 px-4 border-b',
        isCollapsed ? 'px-0 justify-center' : 'px-4'
      )}>
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              MonadBond
            </span>
          </Link>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-8 w-8',
            isCollapsed && 'mx-auto'
          )}
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <ArrowRightToLine className="h-4 w-4" />
          ) : (
            <ArrowLeftToLine className="h-4 w-4" />
          )}
          <span className="sr-only">
            {isCollapsed ? 'Expand' : 'Collapse'} sidebar
          </span>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground',
                  isCollapsed ? 'justify-center' : 'justify-start'
                )}
              >
                <span className={cn(isCollapsed ? 'mr-0' : 'mr-3')}>
                  {item.icon}
                </span>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Wallet Connect */}
      <div className={cn(
        'p-3 border-t',
        isCollapsed ? 'px-2' : 'px-3'
      )}>
        <Button
          variant="outline"
          size={isCollapsed ? 'icon' : 'default'}
          className={cn(
            'w-full',
            isCollapsed ? 'h-10 w-10' : 'h-10'
          )}
        >
          <Wallet className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Connect Wallet</span>}
        </Button>
        
        {!isCollapsed && (
          <div className="mt-3 flex items-center text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <span>Monad Testnet</span>
          </div>
        )}
      </div>
    </aside>
  );
}
