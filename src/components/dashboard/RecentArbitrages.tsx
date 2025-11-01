import { ArrowUpRight, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ArbitrageStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

type Arbitrage = {
  id: string;
  timestamp: number;
  profit: number;
  executionTime: number;
  status: ArbitrageStatus;
  transactionHash: string;
};

const statusIcons = {
  COMPLETED: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  PENDING: <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />,
  FAILED: <XCircle className="h-4 w-4 text-red-500" />,
};

const statusLabels = {
  COMPLETED: 'Completed',
  PENDING: 'Pending',
  FAILED: 'Failed',
};

const formatTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} ${interval === 1 ? 'year' : 'years'} ago`;
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} ${interval === 1 ? 'month' : 'months'} ago`;
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} ${interval === 1 ? 'day' : 'days'} ago`;
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} ${interval === 1 ? 'hour' : 'hours'} ago`;
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} ${interval === 1 ? 'minute' : 'minutes'} ago`;
  
  return 'Just now';
};

type RecentArbitragesProps = {
  arbitrages: Arbitrage[];
  onViewDetails: (id: string) => void;
};

export function RecentArbitrages({ 
  arbitrages = [], 
  onViewDetails 
}: Partial<RecentArbitragesProps>) {
  // Mock data if none provided
  const mockArbitrages: Arbitrage[] = [
    {
      id: '1',
      timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
      profit: 65.42,
      executionTime: 0.18,
      status: 'COMPLETED',
      transactionHash: '0x123...abc',
    },
    {
      id: '2',
      timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
      profit: 42.18,
      executionTime: 0.21,
      status: 'COMPLETED',
      transactionHash: '0x456...def',
    },
    {
      id: '3',
      timestamp: Date.now() - 1000 * 60 * 120, // 2 hours ago
      profit: 0,
      executionTime: 4.5,
      status: 'FAILED',
      transactionHash: '0x789...ghi',
    },
    {
      id: '4',
      timestamp: Date.now() - 1000 * 60 * 180, // 3 hours ago
      profit: 28.75,
      executionTime: 0.19,
      status: 'COMPLETED',
      transactionHash: '0xabc...jkl',
    },
    {
      id: '5',
      timestamp: Date.now() - 1000 * 60 * 300, // 5 hours ago
      profit: 0,
      executionTime: 0,
      status: 'PENDING',
      transactionHash: '0xdef...mno',
    },
  ];

  const displayArbitrages = arbitrages.length > 0 ? arbitrages : mockArbitrages;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Arbitrages</CardTitle>
        <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
          View All
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayArbitrages.map((arbitrage) => (
            <div 
              key={arbitrage.id} 
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => onViewDetails?.(arbitrage.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  {statusIcons[arbitrage.status]}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">${arbitrage.profit.toFixed(2)}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(arbitrage.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{arbitrage.executionTime > 0 ? `${arbitrage.executionTime}s` : '--'}</span>
                    <span className="mx-1">•</span>
                    <span>{statusLabels[arbitrage.status]}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {displayArbitrages.length === 0 && (
            <div className="py-6 text-center text-muted-foreground">
              No recent arbitrage transactions
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
