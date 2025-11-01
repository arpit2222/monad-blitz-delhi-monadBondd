import { ArbitrageTransaction, ArbitrageHistoryFilters } from '@/types/arbitrage';

export const filterArbitrageHistory = (
  data: ArbitrageTransaction[], 
  filters: ArbitrageHistoryFilters
): ArbitrageTransaction[] => {
  return data.filter(item => {
    // Filter by status
    if (filters.status && item.status !== filters.status) return false;
    
    // Filter by date range
    if (filters.startDate && item.timestamp < filters.startDate) return false;
    if (filters.endDate) {
      const endOfDay = new Date(filters.endDate);
      endOfDay.setHours(23, 59, 59, 999);
      if (item.timestamp > endOfDay) return false;
    }
    
    // Filter by profit range
    if (filters.minProfit !== undefined && item.profit < filters.minProfit) return false;
    if (filters.maxProfit !== undefined && item.profit > filters.maxProfit) return false;
    
    return true;
  });
};

export const sortArbitrageHistory = (
  data: ArbitrageTransaction[], 
  sortBy: string = 'date', 
  sortOrder: 'asc' | 'desc' = 'desc'
): ArbitrageTransaction[] => {
  return [...data].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = a.timestamp.getTime() - b.timestamp.getTime();
        break;
      case 'profit':
        comparison = a.profit - b.profit;
        break;
      case 'executionTime':
        comparison = a.executionTime - b.executionTime;
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatTime = (seconds: number): string => {
  if (seconds < 1) {
    return `${Math.round(seconds * 1000)}ms`;
  }
  return `${seconds.toFixed(2)}s`;
};

export const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    case 'reverted':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
