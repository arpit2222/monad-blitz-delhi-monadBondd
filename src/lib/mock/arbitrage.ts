import { ArbitrageTransaction } from '@/types/arbitrage';

const STATUSES: ArbitrageTransaction['status'][] = ['completed', 'completed', 'completed', 'failed', 'pending', 'reverted'];
const MARKETS = ['Uniswap', 'Sushiswap', 'Balancer', 'Curve', '1inch'];

const getRandomStatus = (): ArbitrageTransaction['status'] => {
  return STATUSES[Math.floor(Math.random() * STATUSES.length)];
};

const getRandomMarket = (exclude?: string): string => {
  const availableMarkets = exclude ? MARKETS.filter(m => m !== exclude) : MARKETS;
  return availableMarkets[Math.floor(Math.random() * availableMarkets.length)];
};

export const generateMockArbitrage = (id: number): ArbitrageTransaction => {
  const fromMarket = getRandomMarket();
  const toMarket = getRandomMarket(fromMarket);
  const usdcIn = Math.floor(Math.random() * 10000) + 1000; // $1,000 - $11,000
  const profit = Math.floor(Math.random() * 1000) + 50; // $50 - $1,050
  const profitPercentage = Math.random() * 5 + 0.5; // 0.5% - 5.5%
  const usdcOut = usdcIn + profit;
  const bondsReceived = usdcIn * (1 + profitPercentage / 100);
  const executionTime = Math.random() * 5 + 0.5; // 0.5 - 5.5 seconds
  const gasUsed = Math.floor(Math.random() * 200000) + 100000; // 100,000 - 300,000 gas
  const status = getRandomStatus();
  
  return {
    id: `ARB-${1000 + id}`,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)), // Last 30 days
    usdcIn,
    bondsReceived,
    usdcOut,
    profit,
    profitPercentage,
    executionTime,
    gasUsed,
    transactionHash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
    blockNumber: 15000000 + Math.floor(Math.random() * 1000000),
    status,
    fromMarket,
    toMarket
  };
};

export const mockArbitrageHistory: ArbitrageTransaction[] = Array.from({ length: 25 }, (_, i) => generateMockArbitrage(i));
