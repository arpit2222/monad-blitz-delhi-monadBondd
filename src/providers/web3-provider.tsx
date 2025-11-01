'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultConfig, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { monadTestnet } from '@/config/chains';

// Get the project ID from environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// Create the config using RainbowKit's getDefaultConfig
const config = getDefaultConfig({
  appName: 'MonadBond',
  projectId,
  chains: [monadTestnet, mainnet],
  ssr: true,
});

// Create a client for React Query
const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen">{children}</div>;
  }

  const theme = resolvedTheme === 'dark' 
    ? darkTheme({
        accentColor: '#F97316',
        accentColorForeground: 'white',
        borderRadius: 'medium',
        fontStack: 'system',
        overlayBlur: 'small',
      })
    : lightTheme({
        accentColor: '#F97316',
        accentColorForeground: 'white',
        borderRadius: 'medium',
        fontStack: 'system',
        overlayBlur: 'small',
      });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={theme}
          modalSize="compact"
          appInfo={{
            appName: 'MonadBond',
            learnMoreUrl: 'https://monad.xyz',
          }}
          initialChain={monadTestnet}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export { ConnectButton } from '@rainbow-me/rainbowkit';
