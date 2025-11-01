"use client";

import Link from 'next/link';
import { Github, Twitter, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type FooterLink = {
  name: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
};

const footerLinks: FooterLink[] = [
  { name: 'Documentation', href: '#', icon: <BookOpen className="h-4 w-4" />, external: true },
  { name: 'GitHub', href: 'https://github.com/yourusername/monad-bond', icon: <Github className="h-4 w-4" />, external: true },
  { name: 'Twitter', href: 'https://twitter.com/yourhandle', icon: <Twitter className="h-4 w-4" />, external: true },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const version = '1.0.0'; // This could come from package.json in a real app

  return (
    <footer className="border-t bg-background/50">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                MonadBond
              </span>
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                v{version}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              The most efficient way to earn yield on your crypto assets with MEV protection.
            </p>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-muted-foreground">Monad Testnet - Live</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/deposit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Deposit
                </Link>
              </li>
              <li>
                <Link href="/redeem" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Redeem
                </Link>
              </li>
              <li>
                <Link href="/arbitrage" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Arbitrage
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Community</h3>
            <div className="flex space-x-4">
              {footerLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MonadBond. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
