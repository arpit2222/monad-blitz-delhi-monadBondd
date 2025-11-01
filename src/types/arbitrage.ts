export type ArbitrageStatus = 'pending' | 'completed' | 'failed' | 'reverted';

export interface ArbitrageTransaction {
  id: string;
  timestamp: Date;
  usdcIn: number;
  bondsReceived: number;
  usdcOut: number;
  profit: number;
  executionTime: number; // in seconds
  gasUsed: number;
  transactionHash: string;
  blockNumber: number;
  status: ArbitrageStatus;
  fromMarket: string;
  toMarket: string;
  profitPercentage: number;
}

export interface ArbitrageHistoryFilters {
  status?: ArbitrageStatus;
  startDate?: Date;
  endDate?: Date;
  minProfit?: number;
  maxProfit?: number;
  sortBy?: 'date' | 'profit' | 'executionTime';
  sortOrder?: 'asc' | 'desc';
}
