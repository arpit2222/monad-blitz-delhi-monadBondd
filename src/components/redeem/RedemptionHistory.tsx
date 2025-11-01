"use client";

import { ExternalLink } from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Redemption {
  id: string;
  date: Date;
  mbsAmount: number;
  bondsReceived: number;
  yieldEarned: number;
  transactionHash: string;
}

interface RedemptionHistoryProps {
  redemptions: Redemption[];
  className?: string;
}

export function RedemptionHistory({ redemptions, className = '' }: RedemptionHistoryProps) {
  if (redemptions.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Redemption History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">No redemption history found</p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Redemption History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">MBS Amount</TableHead>
              <TableHead className="text-right">Bonds Received</TableHead>
              <TableHead className="text-right">Yield Earned</TableHead>
              <TableHead className="text-right">Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {redemptions.map((redemption) => (
              <TableRow key={redemption.id}>
                <TableCell className="font-medium">
                  <div className="text-sm">{formatDate(redemption.date)}</div>
                </TableCell>
                <TableCell className="text-right">
                  {redemption.mbsAmount.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {redemption.bondsReceived.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </TableCell>
                <TableCell 
                  className={`text-right ${redemption.yieldEarned > 0 ? 'text-green-600' : ''}`}
                >
                  {redemption.yieldEarned > 0 ? '+' : ''}
                  {redemption.yieldEarned.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <a 
                    href={`https://etherscan.io/tx/${redemption.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center justify-end"
                  >
                    <span className="hidden md:inline">View</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Mock data for the component
export const mockRedemptions: Redemption[] = [
  {
    id: '1',
    date: new Date('2025-10-28T14:30:00'),
    mbsAmount: 500,
    bondsReceived: 502.35,
    yieldEarned: 2.35,
    transactionHash: '0x1234...5678'
  },
  {
    id: '2',
    date: new Date('2025-09-15T09:15:00'),
    mbsAmount: 250,
    bondsReceived: 251.75,
    yieldEarned: 1.75,
    transactionHash: '0xabcd...ef01'
  },
  {
    id: '3',
    date: new Date('2025-08-01T16:45:00'),
    mbsAmount: 1000,
    bondsReceived: 1004.20,
    yieldEarned: 4.20,
    transactionHash: '0x5678...9012'
  }
];
