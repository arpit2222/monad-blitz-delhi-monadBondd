"use client";

import { useState, useEffect } from 'react';
import { PriceBoard } from './PriceBoard';
import { QuickStats } from './QuickStats';
import { ArbitrageForm } from './ArbitrageForm';
import { ResultsDisplay } from './ResultsDisplay';
import { ComparisonChart } from './ComparisonChart';
import { RecentArbitrages } from './RecentArbitrages';
import { MEVComparison } from './MEVComparison';
import ErrorBoundary from '../ErrorBoundary';
import { handleError, safeFetch, AppError } from '@/lib/errorHandler';

// Define types for market data
type MarketStatus = 'EXECUTABLE' | 'UNAVAILABLE';

interface MarketInfo {
  name: string;
  price: number;
  liquidity: string;
}

interface MarketData {
  marketA: MarketInfo;
  marketB: MarketInfo;
  spread: number;
  profitPerBond: number;
  status: MarketStatus;
}

// Define stats type
interface StatsProps {
  totalArbitrages: number;
  totalProfit: number;
  mevProtected: number;
  avgExecutionTime: string;
}

// Mock data
const marketData: MarketData = {
  marketA: {
    name: 'Market A',
    price: 98.50,
    liquidity: 'High',
  },
  marketB: {
    name: 'Market B',
    price: 99.25,
    liquidity: 'Medium',
  },
  spread: 0.75,
  profitPerBond: 0.65,
  status: 'EXECUTABLE',
};



// Wrapped components with error boundaries
  const SafePriceBoard = () => (
  <ErrorBoundary>
    <PriceBoard
      marketA={marketData.marketA}
      marketB={marketData.marketB}
      spread={marketData.spread}
      profitPerBond={marketData.profitPerBond}
      status={marketData.status}
    />
  </ErrorBoundary>
);

const SafeComparisonChart = () => (
  <ErrorBoundary>
    <ComparisonChart />
  </ErrorBoundary>
);

const SafeRecentArbitrages = ({ onViewDetails }: { onViewDetails: (id: string) => void }) => (
  <ErrorBoundary>
    <RecentArbitrages onViewDetails={onViewDetails} />
  </ErrorBoundary>
);

const SafeMEVComparison = () => (
  <ErrorBoundary>
    <MEVComparison />
  </ErrorBoundary>
);

type TransactionResult = {
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  executionTime: number;
  amountBought: number;
  buyPrice: number;
  amountSold: number;
  sellPrice: number;
  totalProfit: number;
  mevExtracted: number;
  transactionHash: string;
  timestamp: number;
};

export default function Dashboard() {
  // Initial stats
  const initialStats: StatsProps = {
    totalArbitrages: 24,
    totalProfit: 1450.75,
    mevProtected: 3200.50,
    avgExecutionTime: '1.2s',
  };

  // Stats state for dynamic updates
  const [currentStats, setCurrentStats] = useState<StatsProps>(initialStats);
  
  // Wrapped components with error boundaries
  const SafePriceBoard = () => (
    <ErrorBoundary>
      <PriceBoard
        marketA={marketData.marketA}
        marketB={marketData.marketB}
        spread={marketData.spread}
        profitPerBond={marketData.profitPerBond}
        status={marketData.status}
      />
    </ErrorBoundary>
  );
  
    const SafeQuickStats = () => (
    <ErrorBoundary>
      <QuickStats
        totalArbitrages={currentStats.totalArbitrages}
        totalProfit={currentStats.totalProfit}
        mevProtected={currentStats.mevProtected}
        avgExecutionTime={currentStats.avgExecutionTime}
      />
    </ErrorBoundary>
  );
  
  const SafeComparisonChart = () => (
    <ErrorBoundary>
      <ComparisonChart />
    </ErrorBoundary>
  );
  
  const SafeRecentArbitrages = ({ onViewDetails }: { onViewDetails: (id: string) => void }) => (
    <ErrorBoundary>
      <RecentArbitrages onViewDetails={onViewDetails} />
    </ErrorBoundary>
  );
  
  const SafeMEVComparison = () => (
    <ErrorBoundary>
      <MEVComparison />
    </ErrorBoundary>
  );

  // Update stats periodically (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would fetch updated stats from the API
      setCurrentStats(prev => ({
        ...prev,
        totalArbitrages: prev.totalArbitrages + Math.floor(Math.random() * 3),
        totalProfit: parseFloat((prev.totalProfit + Math.random() * 100).toFixed(2)),
        mevProtected: parseFloat((prev.mevProtected + Math.random() * 50).toFixed(2)),
      }));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Mock data - in a real app, this would come from your API or state management
  const marketData = {
    marketA: {
      name: 'Market A',
      price: 98.50,
      liquidity: '$1.2M',
    },
    marketB: {
      name: 'Market B',
      price: 99.10,
      liquidity: '$890K',
    },
    spread: 0.6,
    profitPerBond: 0.60,
    status: 'EXECUTABLE' as const,
  };

  const stats = {
    totalArbitrages: 24,
    totalProfit: 1450.75,
    mevProtected: 3200.50,
    avgExecutionTime: '1.2s',
  };

  const [isExecuting, setIsExecuting] = useState(false);
  const [marketState, setMarketState] = useState<MarketData>(marketData);
  const [transactionResult, setTransactionResult] = useState<TransactionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleExecuteArbitrage = async (amount: number) => {
    if (isExecuting) return;
    
    setIsExecuting(true);
    setError(null);
    setSuccess(null);
    
    try {
      // In a real app, this would be an actual API call
      // const response = await safeFetch<TransactionResult>('/api/execute-arbitrage', {
      //   method: 'POST',
      //   body: JSON.stringify({ amount }),
      // });
      // 
      // if ('error' in response) {
      //   throw response.error;
      // }
      // 
      // setTransactionResult(response.data);
      // setSuccess('Arbitrage executed successfully!');
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random failure (10% chance)
      if (Math.random() < 0.1) {
        throw new AppError('Transaction failed due to network congestion', 'TRANSACTION_FAILED');
      }
      
      const mockResult: TransactionResult = {
        status: 'COMPLETED',
        executionTime: 0.18,
        amountBought: amount,
        buyPrice: 98.50,
        amountSold: amount,
        sellPrice: 99.10,
        totalProfit: amount * 0.6,
        mevExtracted: 0,
        transactionHash: '0x' + Math.random().toString(16).substring(2, 66),
        timestamp: Date.now(),
      };
      
      setTransactionResult(mockResult);
      setSuccess('Arbitrage executed successfully!');
    } catch (error) {
      const appError = handleError(error, 'Arbitrage Execution');
      setError(appError instanceof Error ? appError.message : 'An unexpected error occurred');
      
      // Log detailed error for debugging
      console.error('Arbitrage execution error:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    // Could add a toast notification here
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="space-y-6">
        <SafeQuickStats />
        
        <div className="grid gap-6 md:grid-cols-2">
          <SafePriceBoard />
          
          <div className="space-y-6">
            <ArbitrageForm
              onSubmit={handleExecuteArbitrage}
              isExecuting={isExecuting}
              error={error}
              success={success}
            />
            
            {transactionResult && (
              <ResultsDisplay
                result={transactionResult}
                onCopyHash={handleCopyHash}
                explorerUrl="https://etherscan.io"
              />
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <SafeComparisonChart />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <SafeRecentArbitrages 
          onViewDetails={(id) => {
            console.log('Viewing details for arbitrage:', id);
            // In a real app, this would navigate to a details page or show a modal
          }} 
        />
        <div className="space-y-6">
          <ArbitrageForm
            onSubmit={handleExecuteArbitrage}
            isExecuting={isExecuting}
            error={error}
            success={success}
          />
          
          {transactionResult && (
            <ResultsDisplay
              result={transactionResult}
              onCopyHash={handleCopyHash}
              explorerUrl="https://etherscan.io"
            />
          )}
        </div>
      </div>

      <SafeMEVComparison />
    </div>
  );
}
