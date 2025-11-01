'use client';

import { CustomConnectButton } from './wallet/CustomConnectButton';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="text-xl font-bold">Monad Bond</div>
      <CustomConnectButton />
    </nav>
  );
}
