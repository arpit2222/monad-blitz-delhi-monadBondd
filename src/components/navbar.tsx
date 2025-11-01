'use client';

import { WalletConnect } from './wallet/WalletConnect';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="text-xl font-bold">Monad Bond</div>
      <WalletConnect />
    </nav>
  );
}
